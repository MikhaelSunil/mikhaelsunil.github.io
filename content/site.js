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
    description: "Personal portfolio of Mikhael Sunil — Robotics & Autonomous Systems Engineer specializing in ROS 2, aerial drone swarms, Deep RL, and mechatronics.",
    url: "https://mikhaelsunil.github.io/"
  },

  /* ---- Hero section (the top of the page) -------------------------- */
  name: "Mikhael Sunil",
  kicker: "HARDWARE MANUAL // VOL. 01",
  tagline: "Robotics & Autonomous Systems Engineer — ROS 2 · Aerial Swarms · Mechatronics",

  // HTML is allowed here. <strong> makes text bold.
  intro: "Robotics engineer at <strong class=\"font-bold text-ink\">Robotics Research Center</strong> and final-year B.Tech ECE student at <strong class=\"font-bold text-ink underline decoration-2 decoration-signal underline-offset-4\">Rajagiri School of Engineering &amp; Technology</strong>. I design and deploy end-to-end autonomy systems—from decentralized aerial drone swarms and deep reinforcement learning navigation to custom cycloidal-drive wearable exoskeletons.",

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
    { label: "View Projects", href: "#projects", style: "primary" },
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
