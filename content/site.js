/* =========================================================================
   SITE.JS  —  Your name, intro, photo, social links, contact & CV.
   -------------------------------------------------------------------------
   This is a plain settings file. Edit the text between the "quotes".
   Keep the quotes, colons and commas exactly where they are.
   See EDITING.md for a walkthrough.
   ========================================================================= */

window.SITE = {

  /* ---- Browser tab + search engines -------------------------------- */
  meta: {
    title: "Mikhael Sunil — Robotics & Autonomous Systems",
    description: "Portfolio of Mikhael Sunil — robotics developer working on decentralized control for aerial swarms, model-based and learning-based control for ground and aerial manipulators, and rehabilitation exoskeletons.",
    url: "https://mikhaelsunil.github.io/"
  },

  /* ---- Hero section (the top of the page) -------------------------- */
  /* Your real name. Used by the top-left brand mark, the CV pop-up and
     search engines — so leave it as your name. */
  name: "Mikhael Sunil",

  /* The big heading in the hero. Delete this line and the hero falls back
     to showing "name" above.
     Write {wave} anywhere in it to drop in the little waving smiley.
     Use &nbsp; to glue a word to the smiley so they never split across
     lines, and <br> to force a line break. */
  heroHeading: "Glad you wandered in&nbsp;{wave}<br>I'm Mikhael",

  /* The small dark badge above the heading. */
  kicker: "ABOUT ME",
  /* The hero deliberately has NO job-title line under your name.
     This tagline is still used by the CV pop-up and by search engines.
     Set showTaglineInHero to true if you ever want it back on the page. */
  tagline: "Robotics Developer — Aerial Swarms · Model-Based & Learned Control · Rehabilitation Robotics",
  showTaglineInHero: false,

  // HTML is allowed here. <strong> makes text bold.
  intro: "Just too obsessed on designing and building robots and seeing ideas actually come alive on real hardware. Most of my time goes into tinkering across the full stack,whether it’s experimenting with <strong class=\"font-bold text-ink\">model-based learning for ground and aerial manipulators</strong>, getting <strong class=\"font-bold text-ink\">aerial drone swarms</strong> to coordinate on their own, or engineering <strong class=\"font-bold text-ink\">wearable exoskeletons</strong> for rehabilitation. Those are just a few of the systems I enjoy taking from rough algorithms all the way into the real world.",

  /* ---- Your portrait ------------------------------------------------
     Put a photo in assets/img/ then write its path here, e.g.
         photo: "assets/img/portrait.jpg",
     Leave it as "" to show the illustrated placeholder instead.      */
  photo: "",
  photoAlt: "Portrait of Mikhael Sunil",

  /* ---- Hero buttons ------------------------------------------------
     "action": "cv"  opens the CV pop-up.
     "href":   "#projects"  jumps to a section, or use a full URL.   */
  buttons: [
    { label: "Download CV", action: "cv", style: "secondary" }
  ],

  /* ---- Fun extras: set to false to switch them off ------------------ */
  bootScreen: true,   // the spinning-drone loading screen
  armRobot: true,     // the cloth-folding robot arms, bottom right

  /* ---- Social / contact channels ----------------------------------- */
  social: [
    { label: "GitHub",    url: "https://github.com/MikhaelSunil",            display: "github.com/MikhaelSunil" },
    { label: "LinkedIn",  url: "https://www.linkedin.com/in/mikhael-sunil",  display: "linkedin.com/in/mikhael-sunil" },
    { label: "Instagram", url: "https://www.instagram.com/__.mikks.__/",     display: "@__.mikks.__" }
  ],

  /* ---- Contact section --------------------------------------------- */
  contact: {
    status: "● CHANNEL OPEN // ACCEPTING COLLABORATIONS",
    heading: "Send a Transmission",
    blurb: "Interested in aerial swarm research, autonomous navigation, wearable robotics, or R&D collaborations? Connect via the links below or dispatch a message directly.",

    /* To actually RECEIVE messages, pick ONE of these:
       1. email: "you@example.com"  — the form opens the sender's mail app.
       2. formEndpoint: "https://formspree.io/f/XXXXXX" — free, lands in
          your inbox. Sign up at formspree.io, create a form, paste the URL.
       Leave both as "" and the form just shows a thank-you message.   */
    email: "",
    formEndpoint: ""
  },

  /* ---- Footer ------------------------------------------------------- */
  footerNote: "MIKHAEL SUNIL — ROBOTICS HARDWARE MANUAL",

  /* =======================================================================
     THE 1-PAGE CV POP-UP
     Opens from the "CV" nav tab and the "Download CV" button.
     Set enabled: false to remove both.
     ======================================================================= */
  cv: {
    enabled: true,
    headerLines: [
      "github.com/MikhaelSunil",
      "linkedin.com/in/mikhael-sunil"
    ],

    /* Each block becomes a titled panel in the CV.
       type "entries" = bold heading + small grey line + paragraph.
       type "bullets" = a bulleted list.
       type "text"    = one block of text.                             */
    blocks: [
      {
        title: "Experience",
        type: "entries",
        half: true,
        items: [
          {
            heading: "Robotics Research Center",
            meta: "Autonomy & Control",
            body: "End-to-end autonomy pipelines, sensor fusion, motion planning, and sim-to-real policy transfer."
          },
          {
            heading: "Research Intern — MuSiC@IISERB, IISER Bhopal",
            meta: "May – Aug 2025 · Aerial Swarms",
            body: "Experimental benchmarking of binary-measurement consensus & formation control on Crazyflie 2.1 swarms using ROS 2 & Crazyswarm2."
          },
          {
            heading: "R&D & Open-Source Collaborations",
            meta: "BotNova Robotics · Mercedes-Benz · Bitcraze · IMRC Labs"
          }
        ]
      },
      {
        title: "Education & Credentials",
        type: "entries",
        half: true,
        items: [
          {
            heading: "B.Tech in Electronics & Communication Eng.",
            meta: "Rajagiri School of Engineering & Technology (2022 – 2026)",
            body: "Co-Lead & Student Secretary, ECE Dept Club; Core Organizer, CarbonX – Vegathon 42h Hackathon."
          },
          {
            heading: "ISWDP Semiconductor Program (L1: 94% & L2)",
            meta: "NPTEL Advanced Robotics Applications · MathWorks ML"
          }
        ]
      },
      {
        title: "Publications & Patents",
        type: "bullets",
        half: true,
        divider: true,
        items: [
          "<strong>Springer LNAI (2026):</strong> Experimental Benchmarking of Binary Measurement Based Consensus &amp; Formation Control for Aerial Swarms.",
          "<strong>ICAART 2026 (Marbella) &amp; ICC-11 (IISc):</strong> Experimental Evaluation of Multi-Agent Consensus Protocols Using Aerial Swarms.",
          "<strong>Patents Filed:</strong> PHYSIOBOT (202541109767) &amp; ANGLE AI (2541091821 A)."
        ]
      },
      {
        title: "Key Builds & Honors",
        type: "bullets",
        half: true,
        items: [
          "5th / 1500+ teams — MathWorks Minidrone Competition India 2025.",
          "Best Poster Award — Confluence 2.0 (RSET Kochi) for PHYSIOBOT.",
          "Winner — Heroes of Tomorrow 2020; State Winner — Ideate for India 2019.",
          "GeoScout 6WD SLAM Rover, SAC DRL TurtleBot3, Parrot Mambo Vision UAV."
        ]
      },
      {
        title: "Technical Stack",
        type: "text",
        divider: true,
        body: "ROS 2 · Crazyswarm2 · Probabilistic SLAM · Nav2 · SAC Deep RL · Gazebo / RViz · Docker · Crazyflie 2.1 · STM32 · Teensy 4.0 · ESP32 · FOC Drivers · 25:1 Cycloidal Drives · LiDAR · IMU · GPR · MATLAB / Simulink · Fusion 360"
      }
    ]
  }
};
