/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every word on this site comes from this file. It is transcribed from
 *  Abtahi's CV (CV.tex) and the READMEs of each project repository — nothing
 *  here is invented. To change any copy on the site, change it here; no
 *  component contains hardcoded prose.
 *
 *  Project cards are hand-written summaries, deliberately NOT raw README dumps.
 *  Edit `blurb` and `stat` freely — they are the two fields meant to be tuned.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const person = {
  name: "Abtahi Bin Jahangir Chowdhury",
  shortName: "Abtahi",
  role: "Data Analyst · ML Engineer",
  /**
   * Verbatim from the CV. Used for search-engine structured data (JSON-LD),
   * where the canonical wording belongs — NOT rendered on the page, because
   * `positioning` below already says the same thing in the hero.
   */
  summary:
    "Computer Science graduate and aspiring Data Analyst who turns raw, messy data into business-ready insight — from cleaning in PostgreSQL, through SQL and Python analysis, to Power BI dashboards that answer a real business question. Also builds and evaluates AI/ML systems.",

  /** Condensed hero line, drawn from the summary above. */
  positioning:
    "I turn raw, messy data into business-ready insight — from PostgreSQL cleaning through SQL and Python analysis to Power BI dashboards that answer a real business question.",

  /**
   * About section — a paraphrase, deliberately NOT a repeat of `positioning`.
   * A visitor reaches this roughly ten seconds after reading the hero, so it
   * adds specifics (where the work starts and ends, what sits alongside it)
   * rather than restating the same sentence in the same order.
   * Every fact here comes from the CV or a project README.
   */
  about: [
    "I'm a Computer Science graduate from BRAC University who ended up on the analyst side of the stack. Most of my work starts in PostgreSQL profiling a raw table, deciding what actually counts as a genuine record, and then analysing the data using SQL and Python — and ends in a Power BI model someone can read without me in the room.",
    "The AI/ML work runs alongside it rather than apart from it: a multi-task U-Net that segments and classifies breast ultrasound scans in one pass, and an undergraduate thesis benchmarking nine LLMs on Bangla summarization.",
  ],

  /**
   * The common thread. An earlier draft claimed the same "start from the
   * business question" framing covered the U-Net too — it doesn't; a tumour
   * segmentation model answers a clinical question, not a commercial one.
   * This version names what genuinely carries across all three domains: the
   * sequence, not the subject.
   */
  throughLine:
    "What carries across all of it is the order of operations, not the domain: pin down the question precisely, get the data honest before trusting it, and let the answer stand only as far as the evidence actually reaches. The question itself changes a lot which rental segments are worth signing, whether a tumour is benign or malignant, whether a metric is even measuring what it claims to but that sequence doesn't.",

  location: "Dhaka, Bangladesh",
} as const;

/**
 * Figures shown beside the About copy. Every number is traceable to the CV or
 * a project README — nothing here is rounded up or estimated.
 */
export const aboutMarks = [
  {
    value: "98,666",
    label: "orders modelled end-to-end in the Olist Power BI pipeline",
  },
  {
    value: "30,234 → 5,280",
    label:
      "raw NYC Airbnb listings cleaned down to genuine short-term rentals",
  },
  {
    value: "9",
    label: "LLMs benchmarked in the Bangla summarization thesis",
  },
  {
    value: "55+",
    label: "problems solved on LeetCode",
  },
] as const;

export const contact = {
  email: "abtahichowdhury2000@gmail.com",
  phone: "+8801771369948",
  linkedin: "https://www.linkedin.com/in/abtahi0712",
  linkedinLabel: "linkedin.com/in/abtahi0712",
  github: "https://github.com/Abtahi0712",
  githubLabel: "github.com/Abtahi0712",
  leetcode: "https://leetcode.com/u/OB22Nmq3py/",
  leetcodeLabel: "leetcode.com/u/OB22Nmq3py",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#skills", label: "Skills" },
  { href: "#path", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  title: string;
  kind: "Data Analytics" | "AI / Machine Learning" | "Graphics";
  blurb: string;
  /** The single number or finding worth remembering. */
  stat: { value: string; label: string } | null;
  tags: readonly string[];
  repo: string;
};

export const projects: readonly Project[] = [
  {
    id: "olist",
    title: "Olist E-Commerce Sales Analytics",
    kind: "Data Analytics",
    blurb:
      "End-to-end pipeline on 98,666 Brazilian marketplace orders: raw CSVs loaded into PostgreSQL, reshaped into a reporting layer of SQL views, and modelled in Power BI as a nine-page dashboard on a DirectQuery composite model with 25 DAX measures.",
    stat: {
      value: "2.3 vs 4.2",
      label:
        "Average review score for late-delivered orders versus on-time — late delivery, not the product, drives the negative tail",
    },
    tags: ["PostgreSQL", "SQL", "Power BI", "DAX", "DirectQuery"],
    repo: "https://github.com/Abtahi0712/olist-sales-analytics-with-PowerBi",
  },
  {
    id: "airbnb",
    title: "NYC Airbnb Market Analysis",
    kind: "Data Analytics",
    blurb:
      "A SQL → Python → Power BI workflow answering which NYC neighbourhood × room-type segments a property management company should prioritise. Cleaned 30,234 raw listings down to 5,280 genuine short-term rentals, then answered five business questions with CTEs, window functions and CORR().",
    stat: {
      value: "$470/night",
      label:
        "Manhattan hotel rooms — the dataset's highest median price, and simultaneously its lowest-demand segment in every borough",
    },
    tags: ["PostgreSQL", "Python", "Power BI", "DAX"],
    repo: "https://github.com/Abtahi0712/NYC-Airbnb-Market-Analysis",
  },
  {
    id: "busi",
    title: "Breast Ultrasound Segmentation & Classification",
    kind: "AI / Machine Learning",
    blurb:
      "A multi-task deep learning system that localises a tumour and calls it benign or malignant in a single pass. One U-Net encoder is shared between a pixel-wise segmentation decoder and an image-level classification head, trained on the BUSI ultrasound dataset.",
    stat: {
      value: "2 heads, 1 encoder",
      label:
        "Combined Dice + binary cross-entropy segmentation loss and categorical cross-entropy classification loss, trained jointly as a weighted sum",
    },
    tags: ["Python", "TensorFlow", "U-Net", "OpenCV", "pandas"],
    repo: "https://github.com/Abtahi0712/Breast-Ultrasound-Image-Segmentation-Classification",
  },
  {
    id: "fuel",
    title: "Vehicle Fuel Consumption Prediction",
    kind: "AI / Machine Learning",
    blurb:
      "A three-class classifier sorting vehicles into low, medium and high annual fuel consumption from 34 years of US EPA fuel-economy data — cleaned from 38,113 raw records, class-balanced to 8,046, then benchmarked across KNN, SVM and Gaussian Naive Bayes.",
    stat: {
      value: "97.9%",
      label:
        "Test accuracy from the winning model, KNN (k = 3), at an F1-macro of 0.98 across all three classes",
    },
    tags: ["Python", "pandas", "Scikit-learn"],
    repo: "https://github.com/Abtahi0712/Vehicle-Fuel-Consumption-Prediction",
  },
  {
    id: "velocity",
    title: "Velocity Run",
    kind: "Graphics",
    blurb:
      "A 3D endless runner built on raw OpenGL transformations and hierarchical modelling — every object composed from cuboids, spheres and cylinders. A procedurally generated three-lane corridor recycles its floor tiles for an infinite track, while speed and spawn rate scale up the longer you survive.",
    stat: {
      value: "First ↔ third person",
      label:
        "Switchable camera, dynamic rotating-bar obstacles, a projectile system and timed power-up gems",
    },
    tags: ["Python", "PyOpenGL", "3D Graphics"],
    repo: "https://github.com/Abtahi0712/Velocity-Run",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */

export const research = {
  title: "Exploring Cross-Domain Bangla Text Summarization Using LLMs",
  context: "B.Sc. Thesis · BRAC University · January 2026",
  lead: "Evaluating nine large language models on zero-shot Bangla summarization across two very different domains — and finding that the metrics the field relies on quietly disagree with the summaries humans judge as faithful.",
  points: [
    {
      heading: "Role",
      text: "Owned data collection and preprocessing within a five-member NLP research team, spanning two domains: Prothom Alo news articles and the XL-Sum benchmark.",
    },
    {
      heading: "Evaluation framework",
      text: "Co-built a multi-layered evaluation stack — ROUGE and BLEU for lexical overlap, a blind LLM-as-a-Judge protocol, SBERT semantic similarity, and a hand-built error taxonomy.",
    },
    {
      heading: "Finding",
      text: "Lexical metrics scored near zero on summaries that were in fact faithful, exposing how poorly n-gram overlap transfers to Bangla. Encoder–decoder models BanglaT5 and mT5 outperformed the decoder-only LLMs.",
    },
  ],
  tags: [
    "Python",
    "Hugging Face Transformers",
    "SBERT",
    "LLM APIs",
    "ROUGE / BLEU",
  ],
} as const;

/* ─────────────────────────────────────────────────────────────────────────── */

export const skillGroups = [
  {
    label: "Databases & BI",
    items: [
      "PostgreSQL",
      "SQL (CTEs, joins, window functions)",
      "Power BI (DAX, DirectQuery)",
    ],
  },
  {
    label: "Programming",
    items: ["Python (pandas, NumPy, Scikit-learn)", "C / C++ (Basic)"],
  },
  {
    label: "AI & Data",
    items: [
      "Machine Learning",
      "NLP",
      "PyTorch",
      "TensorFlow",
      "Matplotlib",
      "Data Processing",
    ],
  },
  {
    label: "Tools & Version Control",
    items: ["Git / GitHub", "VS Code", "Google Colab", "LaTeX", "Excel", "Canva"],
  },
  {
    label: "Operating Systems",
    items: ["Windows", "Linux"],
  },
  {
    label: "Problem Solving",
    items: ["55+ problems solved on LeetCode"],
  },
] as const;

export const softSkillGroups = [
  {
    label: "Collaboration & Communication",
    items: [
      "Team collaboration",
      "Data storytelling",
      "Emotional intelligence",
    ],
  },
  {
    label: "Work Approach",
    items: [
      "Analytical & critical thinking",
      "Attention to detail",
      "Time management",
      "Self-directed learning",
    ],
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */

export const experience = {
  label: "Academic Research & Independent Projects",
  items: [
    "Led data collection and processing for a 5-member NLP research team (Bangla text summarization using LLMs).",
    "Prepared analytical reports and data summaries directly for individuals' own datasets, outside any organization.",
    "Designed promotional materials for product showcases on request.",
    "Study forex technical analysis; perform daily price-action analysis on the XAU/USD (gold) chart.",
    "Managed multiple independent requests and deadlines on my own, without a team or employer overseeing the work.",
  ],
} as const;

export const education = [
  {
    institution: "BRAC University",
    credential: "Bachelor of Science in Computer Science",
    result: "CGPA 3.5 / 4.00",
  },
  {
    institution: "Dhaka City College",
    credential: "Higher Secondary Certificate (HSC)",
    result: "GPA 4.67 / 5.00",
  },
  {
    institution: "Ideal School and College",
    credential: "Secondary School Certificate (SSC)",
    result: "GPA 5.00 / 5.00",
  },
] as const;
