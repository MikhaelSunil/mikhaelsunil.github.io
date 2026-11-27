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

  /* The hero heading types itself out when the page loads:
       1. heroGreeting is typed, held for a moment, then dissolves
       2. heroHeading is typed in its place and stays
       3. the smiley arrives, waves once, and its hand fades away
     Set heroGreeting to "" to skip straight to the heading.
     Write {wave} in heroHeading to place the smiley. */
  heroGreeting: "Glad you wandered in",
  heroHeading: "I'm Mikhael",

  /* Pace of that sequence, in milliseconds. Bigger charMs = slower typing. */
  heroTiming: {
    startDelay: 300,   // pause before the first character
    charMs: 70,        // per character while typing
    dots: 3,           // dots that appear one by one after the greeting
    dotMs: 300,        // gap between those dots
    hold: 700,         // pause after the last dot, before the dissolve
    dissolve: 380      // length of the fade-out
  },

  /* The small dark badge above the heading. */
  kicker: "",   // leave empty: the hero is not the About section
  /* The hero deliberately has NO job-title line under your name.
     This tagline is still used by the CV pop-up and by search engines.
     Set showTaglineInHero to true if you ever want it back on the page. */
  tagline: "Robotics Developer — Aerial Swarms · Model-Based & Learned Control · Rehabilitation Robotics",
  showTaglineInHero: false,

  // HTML is allowed here. <strong> makes text bold.
  intro: "Just too obsessed on designing and building robots and seeing ideas actually come alive on real hardware. Most of my time goes into tinkering across the full stack,whether it’s experimenting with <strong class=\"font-bold text-ink\">model-based learning for ground and aerial manipulators</strong>, getting <strong class=\"font-bold text-ink\">aerial drone swarms</strong> to coordinate on their own, or engineering <strong class=\"font-bold text-ink\">wearable exoskeletons</strong> for rehabilitation. Those are just a few of the systems I enjoy taking from rough algorithms all the way into the real world.",

  /* ---- The photo band behind the hero -------------------------------
     These cross-fade behind the intro text at half opacity, each shown
     whole at the band's height. Add or remove lines freely; drop the file
     in assets/img/hero/ first. Order is the order they appear in.      */
  heroSlideshow: {
    intervalMs: 4500,   // how long each photograph is held
    images: [
      { src: "assets/img/hero/aerial-manipulator.webp" },
      { src: "assets/img/hero/icaart-talk-arena.webp" },
      { src: "assets/img/hero/exoskeleton-worn.webp" },
      { src: "assets/img/hero/mobile-manipulator.webp" },
      { src: "assets/img/hero/drone-hover-test.webp" },
      { src: "assets/img/hero/arm-gripper.webp" },
      { src: "assets/img/hero/rover-sim.webp" },
      { src: "assets/img/hero/icaart-talk-equations.webp" },
      { src: "assets/img/hero/fabrication.webp" },
      { src: "assets/img/hero/rover-chassis.webp" },
      { src: "assets/img/hero/rover-expo.webp" }
    ]
  },

  /* ---- Hero buttons ------------------------------------------------
     "action": "cv"  opens the CV pop-up.
     "href":   "#projects"  jumps to a section, or use a full URL.   */
  buttons: [
    { label: "Download CV", action: "cv", style: "secondary" }
  ],

  /* ---- Fun extras: set to false to switch them off ------------------ */
  bootScreen: true,   // the spinning-drone loading screen (not skippable)

  /* ---- Social / contact channels ----------------------------------- */
  social: [
    { label: "GitHub",    url: "https://github.com/MikhaelSunil",            display: "github.com/MikhaelSunil" },
    { label: "LinkedIn",  url: "https://www.linkedin.com/in/mikhael-sunil",  display: "linkedin.com/in/mikhael-sunil" },
    { label: "Email",     url: "",                                           display: "Send a message" }
    /* Add more and a round icon appears in the hero automatically.
       Icons exist for LinkedIn, GitHub, Instagram, YouTube and Email;
       anything else shows its first letter. Example:
    , { label: "YouTube", url: "https://youtube.com/@yourchannel", display: "@yourchannel" }

       The Email entry has no url on purpose: fill in contact.email below
       and it becomes a mailto link. Until then it jumps to the contact
       form instead. */
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
            heading: "Research Assistant — Robotics Research Center",
            meta: "May 2026 – Present · Aerial Manipulation",
            body: "Learning-based adaptive control for an aerial manipulator with a moving arm and changing payload. Validated in PX4 and Gazebo against the stock controller; hardware flight testing underway."
          },
          {
            heading: "Robotics Engineer — Botnova Robotics",
            meta: "Aug 2025 – May 2026 · Field Robotics",
            body: "Software and system architecture for Zerion, an autonomous solar-panel cleaning robot, for reliable navigation on inclined terrain. Embedded telemetry and communication pipelines."
          },
          {
            heading: "Project Developer — Mercedes-Benz Coastal Star",
            meta: "May – Nov 2025 · Computer Vision"
          },
          {
            heading: "Research Project Intern — IISER Bhopal",
            meta: "May – Jul 2025 · Aerial Swarms",
            body: "Benchmarked six consensus, containment and formation-control protocols on a five-drone Crazyflie 2.1 swarm — four on one bit per axis — in a Lighthouse-tracked arena on ROS 2. Accepted at ICAART 2026."
          },
          {
            heading: "Stack Contributor — Intelligent Multi-Robot Coordination Lab",
            meta: "May – Jul 2025 · Open Source",
            body: "A PoseStamped subscription service with pose and position getters for the Crazyflie ROS 2 API stack; backward compatible."
          },
          {
            heading: "Embedded Systems Intern — NeST Technologies",
            meta: "Jul 2024 · Embedded",
            body: "Embedded systems design across a range of microcontrollers; developed, programmed and tested solutions for real applications."
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
        body: "ROS 2 Jazzy · Gazebo Harmonic · Isaac Sim · PX4 · QGroundControl · Foxglove · Docker · Python · C++ · Embedded C · PyTorch · SAC Deep RL · Probabilistic SLAM · EKF & Sensor Fusion · Adaptive Control · FOC · Crazyflie 2.1 · Tarot · xArm 6 · CUAV X7 Pro · Jetson Orin Nano · STM32 · Teensy 4.0 · ESP32 · OptiTrack · Lighthouse · Dynamixel · LiDAR · IMU · GPR · Cycloidal Drives · MATLAB / Simulink · Fusion 360"
      }
    ]
  }
};
