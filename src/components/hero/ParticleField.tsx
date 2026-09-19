"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import type { SceneTier } from "@/hooks/useEnvironment";

/* ═══════════════════════════════════════════════════════════════════════════
   Drifting violet / magenta particle + volumetric fog field.

   Everything animates on the GPU from a single `uTime` uniform — no per-frame
   JavaScript touches geometry, so the cost of the scene is essentially one
   draw call for the points plus three for the fog planes.
   ═══════════════════════════════════════════════════════════════════════════ */

const VIOLET = new THREE.Color("#9b30ff");
const MAGENTA = new THREE.Color("#e34fff");

/**
 * Small deterministic PRNG (mulberry32).
 *
 * The particle layout is built inside `useMemo`, and `useMemo` is a
 * performance hint rather than a guarantee — React may drop the cache and
 * recompute. With `Math.random()` that would silently rebuild the entire
 * field into a different arrangement mid-animation. Seeding makes the
 * generator pure: same seed, same field, every time.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPointScale;
  uniform vec2  uPointer;

  attribute float aSeed;
  attribute float aScale;

  varying float vSeed;
  varying float vFade;

  void main() {
    vSeed = aSeed;

    vec3 p = position;

    // Slow vertical drift, each particle on its own phase.
    float t = uTime * (0.055 + aSeed * 0.075);
    p.y += sin(t + aSeed * 22.0) * (1.1 + aSeed * 1.5);
    p.x += cos(t * 0.72 + aSeed * 17.0) * (0.85 + aSeed);

    // Gentle swirl about the Y axis — reads as slow volumetric rotation.
    float a = uTime * 0.014 + aSeed * 0.35;
    p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;

    // Scroll lag: the field travels a fraction of the page's scroll distance,
    // so it visibly trails the content moving over it (the classic depth cue).
    p.y += uScroll * 9.0;
    p.z += uScroll * 2.6;

    // Pointer parallax — deeper particles react more than near ones.
    float depth = smoothstep(-14.0, 6.0, p.z);
    p.x += uPointer.x * mix(2.6, 0.7, depth);
    p.y += -uPointer.y * mix(1.7, 0.45, depth);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Fade in from the far plane and out as particles pass the camera.
    vFade = smoothstep(-26.0, -14.0, mv.z) * (1.0 - smoothstep(-3.0, 1.0, mv.z));

    gl_PointSize = aScale * uPointScale * (1.0 / max(-mv.z, 0.1)) * 34.0;
    gl_Position = projectionMatrix * mv;
  }
`;

const particleFragment = /* glsl */ `
  precision mediump float;

  uniform vec3  uViolet;
  uniform vec3  uMagenta;
  uniform float uOpacity;
  uniform float uHueShift;

  varying float vSeed;
  varying float vFade;

  void main() {
    // Soft radial falloff — a glow, not a disc. No texture fetch needed.
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    alpha = pow(alpha, 2.6);

    // Core highlight keeps the brightest particles from looking like blobs.
    alpha += pow(smoothstep(0.16, 0.0, d), 3.0) * 0.55;

    float mixAmount = clamp(vSeed + uHueShift, 0.0, 1.0);
    vec3 color = mix(uViolet, uMagenta, mixAmount);

    gl_FragColor = vec4(color, alpha * uOpacity * vFade);
  }
`;

const fogVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fogFragment = /* glsl */ `
  precision mediump float;

  uniform vec3  uColor;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uSeed;

  varying vec2 vUv;

  // Cheap value noise — three octaves is plenty for soft smoke.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv - 0.5;

    // Radial mask so each plane reads as a soft cloud, never a rectangle.
    float radial = 1.0 - smoothstep(0.0, 0.5, length(uv));
    radial = pow(radial, 2.0);

    vec2 q = vUv * 2.6 + vec2(uSeed * 11.0);
    q += vec2(uTime * 0.012, uTime * -0.008);

    #ifdef CHEAP_FOG
      float n = noise(q);
    #else
      float n = noise(q) * 0.55 + noise(q * 2.3) * 0.3 + noise(q * 4.7) * 0.15;
    #endif

    float density = radial * smoothstep(0.25, 0.85, n);

    gl_FragColor = vec4(uColor, density * uOpacity);
  }
`;

type FieldProps = {
  count: number;
  scroll: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

function Particles({ count, scroll, pointerX, pointerY }: FieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);
    const random = mulberry32(0x9b30ff);

    for (let i = 0; i < count; i += 1) {
      const spreadX = 26;
      const spreadY = 20;
      positions[i * 3 + 0] = (random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (random() - 0.5) * spreadY;
      positions[i * 3 + 2] = -random() * 22 - 1;

      seeds[i] = random();
      // A few large, bright motes among many small ones.
      scales[i] =
        random() < 0.08 ? 2.2 + random() * 1.8 : 0.5 + random() * 0.9;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uViolet: { value: VIOLET },
      uMagenta: { value: MAGENTA },
      uOpacity: { value: 0.0 },
      uHueShift: { value: 0 },
      uPointScale: { value: 1 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = materialRef.current;
    if (!m) return;

    const u = m.uniforms;
    u.uTime.value += Math.min(delta, 0.1);

    const s = scroll.get();
    u.uScroll.value = s;
    // Drift violet → magenta as the hero scrolls away.
    u.uHueShift.value = s * 0.42;
    // Fade the whole field out rather than letting it sit behind later sections.
    const target = 0.92 * (1 - Math.min(s, 1) * 0.75);
    u.uOpacity.value += (target - u.uOpacity.value) * Math.min(delta * 2.2, 1);

    u.uPointer.value.set(pointerX.get(), pointerY.get());
    // Keep point sizes stable in CSS pixels across viewport heights.
    u.uPointScale.value = Math.min(size.height / 800, 1.35);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FogPlane({
  color,
  position,
  scale,
  opacity,
  seed,
  scroll,
  speed,
  cheap = false,
}: {
  color: THREE.Color;
  position: [number, number, number];
  scale: number;
  opacity: number;
  seed: number;
  scroll: MotionValue<number>;
  speed: number;
  cheap?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: color },
      uTime: { value: seed * 40 },
      uOpacity: { value: opacity },
      uSeed: { value: seed },
    }),
    [color, opacity, seed],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += Math.min(delta, 0.1);
    }
    if (ref.current) {
      // Each cloud lags the scroll by a different amount → layered depth.
      ref.current.position.y = position[1] + scroll.get() * speed;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale} frustumCulled={false}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={fogVertex}
        fragmentShader={fogFragment}
        defines={cheap ? { CHEAP_FOG: "" } : undefined}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Drives rendering on low-power devices at a fixed, lower frame rate.
 *
 * R3F renders on every animation frame under `frameloop="always"`, and
 * bailing out of `useFrame` early does NOT skip that render — it only skips
 * the uniform update, so the expensive part still runs 60 times a second.
 * Switching to `frameloop="demand"` and invalidating on a timer is what
 * actually halves the work.
 */
function DemandDriver({ fps, active }: { fps: number; active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    invalidate();
    const id = setInterval(invalidate, 1000 / fps);
    return () => clearInterval(id);
  }, [invalidate, fps, active]);

  return null;
}

export type ParticleFieldProps = {
  tier: Exclude<SceneTier, "off">;
  visible: boolean;
  scroll: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

export default function ParticleField({
  tier,
  visible,
  scroll,
  pointerX,
  pointerY,
}: ParticleFieldProps) {
  const full = tier === "full";
  const count = full ? 1400 : 420;

  return (
    <Canvas
      /* never  — hidden tab or hero scrolled away: zero work
         always — desktop with a GPU: smooth 60fps
         demand — low-power: rendered on a 30fps timer (see DemandDriver) */
      frameloop={!visible ? "never" : full ? "always" : "demand"}
      dpr={[1, full ? 2 : 1.5]}
      camera={{ position: [0, 0, 9], fov: 62, near: 0.1, far: 60 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: full ? "high-performance" : "low-power",
        stencil: false,
        depth: false,
      }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <FogPlane
        color={VIOLET}
        position={[-4.5, 1.5, -13]}
        scale={26}
        opacity={0.3}
        seed={0.17}
        scroll={scroll}
        speed={5.5}
        cheap={!full}
      />
      {/* Large additive quads are fill-rate heavy, so low-power devices get
          one cloud instead of three, with single-octave noise. */}
      {full && (
        <FogPlane
          color={MAGENTA}
          position={[5.2, -1.2, -9]}
          scale={20}
          opacity={0.2}
          seed={0.63}
          scroll={scroll}
          speed={8.5}
        />
      )}
      {full && (
        <FogPlane
          color={VIOLET}
          position={[0.5, -3.4, -6]}
          scale={16}
          opacity={0.14}
          seed={0.88}
          scroll={scroll}
          speed={12}
        />
      )}

      <Particles
        count={count}
        scroll={scroll}
        pointerX={pointerX}
        pointerY={pointerY}
      />

      {!full && <DemandDriver fps={30} active={visible} />}
    </Canvas>
  );
}
