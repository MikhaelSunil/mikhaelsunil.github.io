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
     SECTION 01 — ABOUT
     =================================================================== */
  {
    id: "about",
    nav: "About",
    number: "01",
    kicker: "CAPABILITY MATRIX",
    title: "About & What I Do",
    meta: "4 CORE ENGINEERING SUBSYSTEMS",
    blocks: [
      {
        type: "cards",
        columns: 2,
        items: [
          {
            badge: "SPEC-01",
            badgeColor: "signal",
            kicker: "AERIAL SWARMS",
            title: "Multi-Agent Aerial Swarms",
            body: "Experimental benchmarking and decentralized deployment of binary-measurement consensus, containment, and formation control algorithms on physical nano-drone swarms.",
            tags: ["Crazyflie 2.1", "ROS 2", "Crazyswarm2", "Binary Consensus", "Formation Control"]
          },
          {
            badge: "SPEC-02",
            badgeColor: "scope",
            kicker: "AUTONOMY & DRL",
            title: "Autonomous Navigation & Deep RL",
            body: "Resilient autonomy in GPS-denied and unstructured environments using probabilistic SLAM, Soft Actor-Critic (SAC) continuous control, and containerized sim-to-real pipelines.",
            tags: ["ROS 2", "Probabilistic SLAM", "SAC Deep RL", "Gazebo / RViz", "Docker"]
          },
          {
            badge: "SPEC-03",
            badgeColor: "amber",
            kicker: "MECHATRONICS",
            title: "Wearable & Mechatronic Systems",
            body: "High-torque-density hybrid actuation combining 25:1 cycloidal gearboxes with cable-driven transmissions, closed-loop FOC motor control, and embedded real-time firmware.",
            tags: ["Cycloidal Actuators", "STM32", "FOC Drivers", "Magnetic Encoders", "Fusion 360"]
          },
          {
            badge: "SPEC-04",
            badgeColor: "ink",
            kicker: "PERCEPTION & EMBEDDED",
            title: "Embedded Sensor Fusion & Vision",
            body: "Multi-sensor fusion across LiDAR, IMU, GPR, and custom CRC-checked serial networks alongside real-time UAV vision tracking and medical landmark segmentation AI.",
            tags: ["LiDAR + IMU + GPR", "Teensy 4.0 / ESP32", "MATLAB / Simulink", "Vision AI"]
          }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 02 — PROJECTS
     To add a photo to any project, drop the image in assets/img/ and add
        image: "assets/img/my-photo.jpg",
     to that project's card.
     =================================================================== */
  {
    id: "projects",
    nav: "Projects",
    number: "02",
    kicker: "HARDWARE DOSSIER",
    title: "Selected Projects",
    meta: "05 FIELD & LAB BUILDS",
    blocks: [
      {
        type: "cards",
        columns: 3,
        items: [
          {
            badge: "PRJ-01 // PATENT FILED",
            badgeColor: "signal",
            kicker: "AICTE IBIP · 202541109767",
            kickerColor: "scope",
            span: 2,
            title: "PHYSIOBOT — Wearable Upper-Limb Robotic Exoskeleton",
            body: "Portable rear-mounted rehabilitation exoskeleton for shoulder and elbow physiotherapy. Pairs custom 25:1 cycloidal gear actuators with cable-driven shoulder abduction/adduction transmission, STM32 embedded control, FOC drivers, and magnetic encoders—achieving smooth shoulder flexion up to 150°.",
            tags: ["25:1 Cycloidal Drive", "Cable-Driven", "STM32 & FOC", "Magnetic Encoders"]
          },
          {
            badge: "PRJ-02",
            badgeColor: "amber",
            kicker: "AERIAL SWARMS",
            title: "Distributed Containment-Consensus Control for Heterogeneous Drone Swarm",
            body: "Fully decentralized single- and double-integrator consensus on Crazyflie 2.1 nano-drones using only discretized binary relative position feedback (±1 per axis) with ROS 2 and Crazyswarm2.",
            tags: ["Crazyflie 2.1", "ROS 2", "Crazyswarm2"]
          },
          {
            badge: "PRJ-03",
            badgeColor: "scope",
            kicker: "FIELD ROBOTICS",
            title: "GeoScout — 6WD Autonomous Mine-Mapping Rover",
            body: "Six-wheel-drive GPS-denied exploration rover powered by Jetson Nano/RPi and Teensy 4.0, fusing 3D LiDAR, IMU, Ground-Penetrating Radar (GPR), and hazardous gas sensors for real-time ROS 2 SLAM.",
            tags: ["ROS 2 SLAM", "Jetson / Teensy 4.0", "LiDAR · GPR"]
          },
          {
            badge: "PRJ-04",
            badgeColor: "ink",
            kicker: "DEEP RL",
            title: "Deep RL (SAC) Mapless Autonomous Navigation",
            body: "Containerized Soft Actor-Critic (SAC) navigation stack replacing classical planners with continuous control and automatic entropy tuning on TurtleBot3 in ROS 2 Foxy and Gazebo Classic.",
            tags: ["SAC DRL", "ROS 2 Foxy", "Docker · TurtleBot3"]
          },
          {
            badge: "PRJ-05",
            badgeColor: "paper",
            kicker: "UAV VISION",
            title: "Vision-Based UAV Path Following & Landing",
            body: "Real-time image segmentation, centroid path prediction, yaw-rate correction, and autonomous landing-marker descent deployed on the Parrot Mambo minidrone via MATLAB/Simulink.",
            tags: ["MATLAB / Simulink", "Parrot Mambo", "Vision Control"]
          }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 03 — EXPERIENCE
     =================================================================== */
  {
    id: "experience",
    nav: "Experience",
    number: "03",
    kicker: "ENGINEERING LOGBOOK",
    title: "Experience",
    meta: "CHRONOLOGICAL SERVICE LEDGER",
    blocks: [
      {
        type: "ledger",
        headers: ["STATUS / LOG", "ROLE & INSTITUTION", "ENGINEERING RECORD"],
        rows: [
          {
            tag: "CURRENT",
            tagColor: "scope",
            log: "LOG #03 // AUTONOMY",
            role: "Robotics Researcher & Engineer",
            org: "Robotics Research Center",
            orgColor: "signal",
            body: "Designing and deploying end-to-end autonomy pipelines, focusing on multi-sensor fusion, real-time perception, optimization-based motion planning, and sim-to-real policy transfer."
          },
          {
            tag: "MAY – AUG 2025",
            tagColor: "amber",
            log: "LOG #02 // RESEARCH LAB",
            role: "Research Intern",
            org: "MuSiC@IISERB — IISER Bhopal",
            orgColor: "scope",
            body: "Conducted real-world experimental benchmarking of classic, fractional-order, double-integrator, and binary-measurement consensus algorithms on Crazyflie 2.1 aerial swarms with ROS 2 and <code class=\"font-mono text-xs bg-paper px-1 border border-ink/30\">crazyswarm2</code>."
          },
          {
            tag: "R&D & OSS",
            tagColor: "paper",
            log: "LOG #01 // COLLABORATIONS",
            role: "R&D Engineer & Open-Source Contributor",
            org: "BotNova Robotics · Mercedes-Benz · Bitcraze & IMRC Labs",
            orgColor: "ink",
            body: "Worked across industrial robotics R&D at BotNova Robotics and Mercedes-Benz, and collaborated with <strong class=\"text-ink\">Bitcraze</strong> and <strong class=\"text-ink\">IMRC Labs</strong> on open-source quadcopter swarm tooling."
          }
        ]
      }
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
            subtitle: "RSET Kochi · PHYSIOBOT",
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
