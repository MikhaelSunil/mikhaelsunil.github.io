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
     Portrait on the left, the writing on the right. Swap the photo by
     dropping a new file in assets/img/ and changing `image` below.
     =================================================================== */
  {
    id: "about",
    nav: "About",
    number: "01",
    title: "About Me",
    meta: "THE SHORT VERSION",
    blocks: [
      {
        type: "about",
        image: "assets/img/about.webp",
        imageAlt: "Mikhael Sunil",
        tagLeft: "IISc",
        tagRight: "ICC25",
        body: [
          "I build robots and then make them work outside the simulator. That second part is most of the job, and it is the part I like: the gap between a control law that converges beautifully on a plot and the same law on real hardware, where the sensors are noisy, the loop runs late and the payload is not where the model thinks it is.",
          "Most of my work sits in three areas. <strong class=\"text-ink\">Aerial swarms</strong> — flying distributed consensus, containment and formation protocols on real nano-drones, including ones that run on a single bit of information per axis. <strong class=\"text-ink\">Model-based and learned control</strong> for ground and aerial manipulators, where the dynamics shift under you as an arm swings or a payload changes. And <strong class=\"text-ink\">rehabilitation exoskeletons</strong>, which is where I learned that a mechanism nobody can comfortably wear is not a working mechanism.",
          "I like the whole stack — the gearbox, the firmware, the estimator, the controller, the ROS graph — because the interesting failures usually live between two of those and not inside either one."
        ],
        facts: [
          { label: "Focus", value: "Aerial swarms · Manipulation" },
          { label: "Control", value: "Model-based & learned" },
          { label: "Hardware", value: "Built, flown, worn" }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 02 — PROJECTS
     The cards themselves live in content/projects.js. The three marked
     featured show here; the button underneath goes to the showcase page
     at projects/, which lists them all.
     =================================================================== */
  {
    id: "projects",
    nav: "Projects",
    number: "02",
    kicker: "HARDWARE DOSSIER",
    title: "Projects & Research",
    meta: "SELECTED WORK",
    blocks: [
      { type: "featured-projects", moreLabel: "View all projects" }
    ]
  },

  /* ===================================================================
     SECTION 03 — EXPERIENCE
     A rail of dated entries. Each row: tag (the dates), org, role and a
     `points` list. No log numbers, no column headers.

     Each row shows a mark beside the organisation. `mark` is a stencilled
     monogram; swap in `logo: "assets/img/logos/name.svg"` on any row to
     use the real logo instead (drop the file in that folder first).
     =================================================================== */
  {
    id: "experience",
    nav: "Experience",
    number: "03",
    kicker: "ENGINEERING LOGBOOK",
    title: "Experience",
    meta: "6 ENTRIES // MOST RECENT FIRST",
    blocks: [
      {
        type: "ledger",
        rows: [
          {
            tag: "MAY 2026 — PRESENT",
            tagColor: "scope",
            org: "Robotics Research Center",
            logo: "assets/img/logos/robotics-research-center.webp",
            role: "Research Assistant",
            orgColor: "ink",
            points: [
              "Building a learning-based adaptive control framework for an aerial manipulator, so it handles the shifting dynamics of a moving arm and a changing payload in real time.",
              "Validated in PX4 and Gazebo against the stock PX4 controller, including aggressive arm-swing stress tests.",
              "Hardware flight testing is underway."
            ]
          },
          {
            tag: "AUG 2025 — MAY 2026",
            tagColor: "amber",
            org: "Botnova Robotics",
            logo: "assets/img/logos/botnova.webp",
            logoDark: true,
            role: "Robotics Engineer · Internship",
            orgColor: "ink",
            points: [
              "Software and system architecture for <strong class=\"text-ink\">Zerion</strong>, an autonomous solar-panel cleaning robot, for reliable navigation on inclined terrain.",
              "Built the embedded telemetry for live system monitoring.",
              "Designed the communication pipelines behind it."
            ]
          },
          {
            tag: "MAY — NOV 2025",
            tagColor: "paper",
            org: "Mercedes-Benz Coastal Star",
            logo: "assets/img/logos/mercedes-benz.webp",
            logoDark: true,
            role: "Project Developer · Internship",
            orgColor: "ink",
            points: [
              "Computer-vision project work."
            ]
          },
          {
            tag: "MAY — JUL 2025",
            tagColor: "amber",
            org: "IISER Bhopal",
            logo: "assets/img/logos/iiser-bhopal.webp",
            role: "Research Project Intern",
            orgColor: "ink",
            points: [
              "Benchmarked six consensus, containment and formation-control protocols on a five-drone Crazyflie 2.1 swarm — four of them on one bit per axis — against their own simulations.",
              "Flown in a Lighthouse-tracked arena on ROS 2.",
              "Accepted at <strong class=\"text-ink\">ICAART 2026</strong>."
            ]
          },
          {
            tag: "MAY — JUL 2025",
            tagColor: "paper",
            org: "Intelligent Multi-Robot Coordination Lab",
            logo: "assets/img/logos/imrc-lab.webp",
            role: "Stack Contributor",
            orgColor: "ink",
            points: [
              "Contributed a <code class=\"font-mono text-xs bg-paper px-1 border border-ink/30\">PoseStamped</code> subscription service, with pose and position getters, to the Crazyflie ROS 2 API stack.",
              "Gives downstream nodes a standard ROS 2 pose interface and makes planners and visualisers simpler to wire up.",
              "Brings pose to parity with how status is already exposed, and is backward compatible."
            ]
          },
          {
            tag: "JUL 2024",
            tagColor: "paper",
            org: "NeST Technologies",
            logo: "assets/img/logos/nest-technologies.webp",
            role: "Embedded Systems Intern · Internship",
            orgColor: "ink",
            points: [
              "Embedded systems design across a range of microcontrollers.",
              "Developed, programmed and tested solutions for real applications, with a lot of troubleshooting and optimisation along the way."
            ]
          }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 04 — TECH STACK
     A ladder: one plate per layer, hardware at the foot. Add a tool by
     dropping a string into the right `items` list.
     =================================================================== */
  {
    id: "tech-stack",
    nav: "Tech Stack",
    number: "04",
    kicker: "THE STACK, BOTTOM TO TOP",
    title: "Tech Stack",
    meta: "4 LAYERS // L1 → L4",
    blocks: [
      {
        type: "prose",
        body: [
          "Every layer, from the crimp tool to the policy. Read it from the bottom up: each one only works because the one under it does."
        ]
      },
      {
        type: "stack",
        layers: [
          {
            code: "L4",
            name: "Intelligence",
            note: "What it decides",
            items: ["PyTorch", "SAC deep RL", "Model-based learning", "Sim-to-real transfer", "OpenCV", "MATLAB · Simulink"]
          },
          {
            code: "L3",
            name: "Autonomy",
            note: "Where it is, where it goes",
            items: ["Distributed consensus", "Containment & formation", "Probabilistic SLAM", "EKF & sensor fusion",
                    "Optimisation-based planning", "Adaptive control", "FOC motor control", "PX4"]
          },
          {
            code: "L2",
            name: "Middleware",
            note: "How the parts talk",
            items: ["ROS 2 Jazzy", "Gazebo Harmonic", "Isaac Sim", "ros_gz_bridge", "QGroundControl",
                    "Foxglove", "rosbag · .mcap", "Docker", "Python", "C++", "Embedded C"]
          },
          {
            code: "L1",
            name: "Hardware",
            note: "What I crimp, wire and fly",
            items: ["Crazyflie 2.1", "Tarot drone", "xArm 6", "CUAV X7 Pro", "Jetson Orin Nano",
                    "STM32", "Teensy 4.0", "ESP32", "OptiTrack motion capture", "Lighthouse tracking",
                    "Dynamixel servos", "LiDAR · IMU · GPR", "Cycloidal drives", "Magnetic encoders",
                    "Fusion 360"]
          }
        ]
      }
    ]
  },

  /* ===================================================================
     SECTION 05 — EDUCATION
     =================================================================== */
  {
    id: "education",
    nav: "Education",
    number: "05",
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
     SECTION 06 — RESEARCH, PATENTS & AWARDS
     This section stacks several blocks: papers, a sub-heading, patent
     cards, then award cards.
     =================================================================== */
  {
    id: "research",
    nav: "Research",
    number: "06",
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
     SECTION 07 — CONTACT  (keep this last)
     =================================================================== */
  {
    id: "contact",
    nav: "Contact",
    number: "07",
    kicker: "DISPATCH & TRANSMISSION",
    title: "Contact",
    meta: "DIRECT CHANNELS",
    blocks: [
      { type: "contact" }
    ]
  }

];
