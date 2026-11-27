/* =========================================================================
   SECTIONS.JS  —  Every section of the page, in the order it appears.
   -------------------------------------------------------------------------
   The navigation tabs at the top are generated from this list automatically,
   so adding a section here also adds its nav tab. Reordering this list
   reorders the page. Deleting an entry removes the section entirely.

   Each section looks like:
     {
       id:     "projects",            // used for the #link. letters/dashes only
       nav:    "Projects",            // the nav tab label (keep it short)
       number: "02",                  // the small "SECTION 02" marker
       kicker: "HARDWARE DOSSIER",    // small orange text above the title
       title:  "Selected Projects",   // the big heading
       meta:   "05 FIELD & LAB BUILDS",  // small grey text on the right
       blocks: [ ... ]                // the content, see block types below
     }

   BLOCK TYPES you can use inside "blocks":
     cards        — a grid of cards. columns: 1, 2, 3 or 4.
     ledger       — the striped table used by Experience.
     publications — papers with a copyable BibTeX box.
     gallery      — a grid of photos.
     contact      — the contact links + message form.
     heading      — a small sub-label between blocks.
     html         — anything you want, written as raw HTML.

   CARD options (all optional except title):
     badge, badgeColor ("signal" | "scope" | "amber" | "ink" | "paper"),
     kicker, title, body, tags: [...], list: [{title, meta}],
     stamp, footer: {left, right}, image, imageAlt,
     span (how many columns the card takes), link {label, url}
   ========================================================================= */

window.SECTIONS = [

  /* ===================================================================
     SECTION 01 — PROJECTS
     The cards themselves live in content/projects.js. The three marked
     featured show here; the button underneath goes to the showcase page
     at projects/, which lists them all.
     =================================================================== */
  {
    id: "projects",
    nav: "Projects",
    number: "01",
    kicker: "HARDWARE DOSSIER",
    title: "Projects & Research",
    meta: "SELECTED WORK",
    blocks: [
      { type: "featured-projects", moreLabel: "View all projects" }
    ]
  },

  /* ===================================================================
     SECTION 02 — EXPERIENCE
     =================================================================== */
  {
    id: "experience",
    nav: "Experience",
    number: "02",
    kicker: "ENGINEERING LOGBOOK",
    title: "Experience",
    meta: "7 ENTRIES // MOST RECENT FIRST",
    blocks: [
      {
        type: "ledger",
        headers: ["STATUS / LOG", "ROLE & INSTITUTION", "ENGINEERING RECORD"],
        rows: [
          {
            tag: "MAY 2026 — PRESENT",
            tagColor: "scope",
            log: "LOG #07 // AERIAL MANIPULATION",
            role: "Research Intern",
            org: "Robotics Research Center",
            orgColor: "signal",
            body: "Building a learning-based adaptive control framework for an aerial manipulator, so it can handle the shifting dynamics of a moving arm and a changing payload in real time. Validated in PX4 and Gazebo against the stock PX4 controller, including aggressive arm-swing stress tests. Hardware flight testing is underway."
          },
          {
            tag: "AUG 2025 — MAY 2026",
            tagColor: "amber",
            log: "LOG #06 // FIELD ROBOTICS",
            role: "Robotics Engineer",
            org: "Botnova Robotics · Internship",
            orgColor: "ink",
            body: "Software and system architecture for <strong class=\"text-ink\">Zerion</strong>, an autonomous solar-panel cleaning robot, for reliable navigation on inclined terrain. Built the embedded telemetry for live system monitoring and designed the communication pipelines behind it."
          },
          {
            tag: "MAY — NOV 2025",
            tagColor: "paper",
            log: "LOG #05 // COMPUTER VISION",
            role: "Project Developer",
            org: "Mercedes-Benz Coastal Star · Internship",
            orgColor: "ink",
            body: "Computer-vision project work."
          },
          {
            tag: "MAY — JUL 2025",
            tagColor: "amber",
            log: "LOG #04 // AERIAL SWARMS",
            role: "Research Project Intern",
            org: "IISER Bhopal",
            orgColor: "scope",
            body: "Benchmarked six consensus, containment and formation-control protocols on a five-drone Crazyflie 2.1 swarm — four of them on one bit per axis — against their own simulations, in a Lighthouse-tracked arena on ROS 2. Accepted at <strong class=\"text-ink\">ICAART 2026</strong>."
          },
          {
            tag: "MAY — JUL 2025",
            tagColor: "paper",
            log: "LOG #03 // OPEN SOURCE",
            role: "Stack Contributor",
            org: "Intelligent Multi-Robot Coordination Lab",
            orgColor: "signal",
            body: "Contributed a <code class=\"font-mono text-xs bg-paper px-1 border border-ink/30\">PoseStamped</code> subscription service, with pose and position getters, to the Crazyflie ROS 2 API stack. Gives downstream nodes a standard ROS 2 pose interface, makes planners and visualisers simpler to wire up, and brings pose to parity with how status is already exposed — backward compatible."
          },
          {
            tag: "JUL — AUG 2024",
            tagColor: "paper",
            log: "LOG #02 // EMBEDDED & IOT",
            role: "Embedded Systems Intern",
            org: "Acmegrade · Internship",
            orgColor: "ink",
            body: "An IoT irrigation system reporting to ThingSpeak, using live soil-moisture readings to cut water use. Integrated the sensors and microcontrollers behind the environmental monitoring and control loop."
          },
          {
            tag: "JUL 2024",
            tagColor: "paper",
            log: "LOG #01 // EMBEDDED",
            role: "Embedded Systems Intern",
            org: "NeST Technologies · Internship",
            orgColor: "ink",
            body: "Embedded systems design across a range of microcontrollers — developing, programming and testing solutions for real applications, and a lot of troubleshooting and optimisation along the way."
          }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 03 — TECH STACK
     The four domain cards live here for now. To list your actual stack
     (languages, frameworks, hardware, tools), there is a ready-made
     example further down this section, switched off behind a comment.
     =================================================================== */
  {
    id: "tech-stack",
    nav: "Tech Stack",
    number: "03",
    kicker: "TOOLS & DOMAINS",
    title: "Tech Stack",
    meta: "4 CORE DOMAINS",
    blocks: [
      {
        type: "cards",
        columns: 2,
        items: [
          {
            badge: "DOMAIN-01",
            badgeColor: "signal",
            kicker: "MANIPULATION & LEARNING",
            title: "Model-Based Learning & Manipulation",
            body: "Researching, testing, and deploying model-based learning and adaptive control algorithms for ground and aerial manipulators—bridging physical dynamics with data-driven generalization.",
            tags: ["Model-Based Learning", "Aerial & Ground Manipulators", "SAC Deep RL", "Sim-to-Real"]
          },
          {
            badge: "DOMAIN-02",
            badgeColor: "scope",
            kicker: "AERIAL SWARMS",
            title: "Multi-Agent Aerial Swarms",
            body: "Designing, benchmarking, and flying decentralized consensus, containment, and formation control algorithms on physical nano-drone swarms using minimal local feedback.",
            tags: ["Crazyflie 2.1", "ROS 2 Jazzy", "Binary feedback", "Distributed Control"]
          },
          {
            badge: "DOMAIN-03",
            badgeColor: "amber",
            kicker: "REHAB & MECHATRONICS",
            title: "Wearable Exoskeletons & Actuators",
            body: "Engineering portable rehabilitation exoskeletons combining custom 25:1 cycloidal gearboxes, cable-driven transmissions, closed-loop FOC motor control, and embedded firmware.",
            tags: ["Cycloidal Drives", "STM32 & FOC", "Magnetic Encoders", "Fusion 360"]
          },
          {
            badge: "DOMAIN-04",
            badgeColor: "ink",
            kicker: "AUTONOMY & EMBEDDED",
            title: "SLAM, Sensor Fusion & Embedded Vision",
            body: "Building GPS-denied autonomy stacks fusing LiDAR, IMU, GPR, and custom serial sensor networks alongside real-time UAV vision tracking and medical landmark AI.",
            tags: ["Probabilistic SLAM", "LiDAR · IMU · GPR", "Teensy 4.0 / ESP32", "MATLAB / Simulink"]
          }
        ]
      }

      /* ----------------------------------------------------------------
         READY TO FILL: a grouped list of your actual stack.
         Delete the comment marker line below, and the matching one at the
         end, to switch it on. Edit the tags to suit.
         ----------------------------------------------------------------
      ,
      { type: "heading", color: "signal", label: "FULL STACK" },
      {
        type: "cards",
        columns: 2,
        items: [
          { badge: "LANGUAGES", badgeColor: "ink",
            tags: ["C++", "Python", "MATLAB", "Embedded C"] },
          { badge: "FRAMEWORKS", badgeColor: "signal",
            tags: ["ROS 2", "Crazyswarm2", "Nav2", "PyTorch", "Gazebo"] },
          { badge: "HARDWARE", badgeColor: "amber",
            tags: ["STM32", "Teensy 4.0", "ESP32", "Jetson Nano", "Crazyflie 2.1"] },
          { badge: "TOOLS", badgeColor: "scope",
            tags: ["Docker", "Git", "Fusion 360", "Simulink", "RViz"] }
        ]
      }
         ---------------------------------------------------------------- */
    ]
  },

  /* ===================================================================
     SECTION 04 — EDUCATION
     =================================================================== */
  {
    id: "education",
    nav: "Education",
    number: "04",
    kicker: "ACADEMIC RECORD",
    title: "Education",
    meta: "DEGREE & TECHNICAL CERTIFICATIONS",
    blocks: [
      {
        type: "cards",
        columns: 2,
        items: [
          {
            badge: "2022 – 2026",
            badgeColor: "ink",
            kicker: "UNDERGRADUATE DEGREE",
            kickerColor: "scope",
            title: "B.Tech in Electronics & Communication Engineering",
            subtitle: "Rajagiri School of Engineering & Technology (RSET)",
            body: "Focused on robotics, embedded systems, control engineering, and autonomous navigation. Served as Co-Lead and Student Secretary of the ECE Department Club, and core organizer of the 42-hour <strong class=\"text-ink\">CarbonX – Vegathon</strong> hackathon in collaboration with C-DAC &amp; IEDC.",
            tags: ["Embedded Systems", "Control Theory", "Signal Processing", "ECE Club Co-Lead"]
          },
          {
            badge: "CREDENTIALS",
            badgeColor: "amber",
            kicker: "VERIFIED",
            list: [
              { title: "ISWDP Semiconductor Program — L1 (94%) & L2", meta: "India Semiconductor Workforce Dev. Program · 2025" },
              { title: "Advanced Robotics Applications", meta: "NPTEL · May 2025" },
              { title: "Machine Learning Onramp", meta: "MathWorks · Jul 2025" },
              { title: "VLSI Chip Design & Simulation (Electric EDA)", meta: "Coursera · Oct 2024" }
            ]
          }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 05 — RESEARCH, PATENTS & AWARDS
     This section stacks several blocks: papers, a sub-heading, patent
     cards, then award cards.
     =================================================================== */
  {
    id: "research",
    nav: "Research",
    number: "05",
    kicker: "PUBLICATIONS, PATENTS & HONORS",
    title: "Research, Patents & Awards",
    meta: "PEER-REVIEWED PAPERS, PATENTS & MILESTONES",
    blocks: [
      {
        type: "publications",
        items: [
          {
            key: "springer2026",
            badge: "SPRINGER LNAI",
            badgeColor: "signal",
            venue: "LECTURE NOTES IN ARTIFICIAL INTELLIGENCE — ACCEPTED",
            title: "Experimental Benchmarking of Binary Measurement Based Consensus and Formation Control Algorithms for Multi-Agent Aerial Swarms",
            authors: "Mikhael Sunil, Akshat Singh, Agniva Banerjee, Arijit Sen, and Sujit P B",
            body: "Comprehensive physical benchmarking of binary-measurement consensus and formation control laws on multi-agent aerial swarms, quantifying convergence, disturbance rejection, and scalability.",
            bibtex: "@incollection{sunil2026binary,\n  author    = {Mikhael Sunil and Akshat Singh and Agniva Banerjee and Arijit Sen and Sujit P B},\n  title     = {Experimental Benchmarking of Binary Measurement Based Consensus and Formation Control Algorithms for Multi-Agent Aerial Swarms},\n  booktitle = {Lecture Notes in Artificial Intelligence (LNAI)},\n  publisher = {Springer},\n  year      = {2026}\n}"
          },
          {
            key: "icaart2026",
            badge: "ICAART 2026 · ICC-11",
            badgeColor: "scope",
            venue: "MARBELLA, SPAIN (SCITEPRESS) & IISC BENGALURU",
            title: "Experimental Evaluation of Multi-Agent Consensus Protocols Using Aerial Swarms",
            authors: "Mikhael Sunil, Akshat Singh, Agniva Banerjee, Arijit Sen, and Sujit P B",
            body: "Presented at the 18th International Conference on Agents and Artificial Intelligence (ICAART 2026, Marbella, Spain) and as an experimental abstract at the 11th Indian Control Conference (ICC-11, IISc Bengaluru). Evaluates classic, fractional-order, double-integrator, and formation protocols on Crazyflie swarms.",
            bibtex: "@inproceedings{sunil2026consensus,\n  author    = {Mikhael Sunil and Akshat Singh and Agniva Banerjee and Arijit Sen and Sujit P B},\n  title     = {Experimental Evaluation of Multi-Agent Consensus Protocols Using Aerial Swarms},\n  booktitle = {Proceedings of the 18th International Conference on Agents and Artificial Intelligence (ICAART 2026)},\n  publisher = {SCITEPRESS},\n  address   = {Marbella, Spain},\n  year      = {2026}\n}"
          }
        ]
      },

      { type: "heading", label: "PATENTS FILED (02)" },

      {
        type: "cards",
        columns: 2,
        items: [
          {
            badge: "PATENT // NOV 11, 2025",
            badgeColor: "amber",
            kicker: "APP. 202541109767",
            kickerColor: "scope",
            title: "PHYSIOBOT — A Wearable Smart Rehabilitation System for Shoulder Mobility Assistance & Exercise Monitoring"
          },
          {
            badge: "PATENT // OCT 24, 2025",
            badgeColor: "amber",
            kicker: "APP. 2541091821 A",
            kickerColor: "scope",
            title: "ANGLE AI — Smart MPTA & LDFA Measurement Using Hybrid Landmark-Based Vision AI"
          }
        ]
      },

      { type: "heading", label: "HONORS & AWARDS (04)" },

      {
        type: "cards",
        columns: 4,
        items: [
          {
            stamp: "5TH / 1500+",
            badge: "AWD-01",
            badgeColor: "none",
            title: "MathWorks Minidrone Competition India 2025",
            subtitle: "MathWorks · Sep 2025",
            body: "Secured 5th position nationwide among 1500+ teams with autonomous vision-based Parrot Mambo flight control.",
            footer: { left: "NATIONAL FINALS", right: "✓" }
          },
          {
            stamp: "BEST POSTER",
            badge: "AWD-02",
            badgeColor: "none",
            title: "Best Poster Award — Confluence 2.0",
            subtitle: "RSET · PHYSIOBOT",
            subtitleColor: "scope",
            body: "Awarded Best Poster at the Mechanical Engineering Poster Expo for PHYSIOBOT adaptive multi-limb rehabilitation robotics.",
            footer: { left: "CONFLUENCE 2.0", right: "✓" }
          },
          {
            stamp: "WINNER // 2020",
            badge: "AWD-03",
            badgeColor: "none",
            title: "Winner — Heroes of Tomorrow 2020",
            subtitle: "BML Munjal University",
            subtitleStyle: "invert",
            body: "Won first place for designing and prototyping the Hybrid Sustainable Atmospheric Water Generator (AWG).",
            footer: { left: "BML MUNJAL", right: "✓" }
          },
          {
            stamp: "STATE WINNER",
            badge: "AWD-04",
            badgeColor: "none",
            title: "State-Level Winner & Finalist — Ideate for India",
            subtitle: "National Finalist · 2019",
            body: "Selected as State Winner and National Finalist for Automated Vehicle Accident Security & Non-Contact ECG Monitoring.",
            footer: { left: "IDEATE FOR INDIA", right: "✓" }
          }
        ]
      }
    ]
  },

  /* ===================================================================
     EXAMPLE — A PHOTO GALLERY SECTION
     This one is switched off. To switch it on, delete the comment
     marker line directly below the dashes, and the matching one at the
     end of the block, then drop your images into assets/img/.
     =================================================================== */
  /*
  {
    id: "gallery",
    nav: "Lab",
    number: "06",
    kicker: "FIELD PHOTOGRAPHY",
    title: "Lab & Field",
    meta: "BUILD LOG",
    blocks: [
      {
        type: "gallery",
        columns: 3,
        items: [
          { src: "assets/img/swarm-test.jpg",  caption: "Crazyflie swarm consensus test rig" },
          { src: "assets/img/physiobot.jpg",   caption: "PHYSIOBOT cycloidal actuator assembly" },
          { src: "assets/img/geoscout.jpg",    caption: "GeoScout rover field trial" }
        ]
      }
    ]
  },
  */

  /* ===================================================================
     SECTION 06 — CONTACT  (keep this last)
     =================================================================== */
  {
    id: "contact",
    nav: "Contact",
    number: "06",
    kicker: "DISPATCH & TRANSMISSION",
    title: "Contact",
    meta: "DIRECT CHANNELS",
    blocks: [
      { type: "contact" }
    ]
  }

];
