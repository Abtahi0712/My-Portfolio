import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import Path from "@/components/sections/Path";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* One continuous, scroll-linked light field behind the entire page. */}
      <Backdrop />

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Research />
        <Skills />
        <Path />
      </main>

      <Contact />
    </>
  );
}
