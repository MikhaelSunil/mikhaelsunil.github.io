/* =========================================================================
   PROJECTS.JS  —  Every project, in one place.
   -------------------------------------------------------------------------
   Used in three places, all from this one list:
     • the Projects section on the home page  (the ones marked featured)
     • the showcase page at /projects/        (all of them)
     • a detail page at /projects/<slug>/     (only ones that have "detail")

   To add a project: copy a block below and edit it. Put it where you want it
   to appear — the order here is the order on the page.
   To feature it on the home page: featured: true  (keep this to three).
   To give it a detail page: fill in "detail", then copy the folder
   projects/_template/ to projects/<your-slug>/ and change the one slug
   line in its index.html. Without "detail" the card simply is not clickable.

   DETAIL BLOCK TYPES
     prose    { heading, body: ["para", "para"] }
     steps    { heading, items: [{ n, label, text }] }
     figure   { src, alt, caption }
     figures  { columns, items: [{ src, alt, caption }] }
     table    { heading, headers: [...], rows: [[...]], note }
     callout  { tone: "warn" | "info", heading, body: [...], items: [...] }
     tags     { heading, items: [...] }
   Image paths are written from the site root, e.g. assets/media/<name>/x.webp —
   the page works out the rest.
   ========================================================================= */

window.PROJECTS = [

  /* =====================================================================
     PHYSIOBOT
     ===================================================================== */
  {
    slug: "physiobot",
    code: "PRJ-01",
    featured: true,
    status: "Patent filed",
    kicker: "AICTE IBIP · 202541109767",
    badgeColor: "amber",
    title: "PHYSIOBOT — Wearable Upper-Limb Robotic Exoskeleton",
    summary: "Portable rear-mounted rehabilitation exoskeleton for shoulder and elbow physiotherapy. Pairs custom 25:1 cycloidal gear actuators with a cable-driven shoulder abduction transmission, STM32 embedded control, FOC drivers and magnetic encoders — reaching smooth shoulder flexion up to 150&deg;.",
    tags: ["25:1 Cycloidal Drive", "Cable-Driven", "STM32 & FOC", "Magnetic Encoders"]
  },

  /* =====================================================================
     AERIAL SWARM
     ===================================================================== */
  {
    slug: "swarm-consensus",
    code: "PRJ-02",
    featured: true,
    status: "ICAART 2026",
    kicker: "AERIAL SWARMS",
    badgeColor: "scope",
    title: "Binary-Measurement Consensus & Formation Control on a Crazyflie Swarm",
    summary: "Six consensus and formation-control protocols put on five Crazyflie 2.1 nano-quadrotors and benchmarked against their own simulations. Four of them fly on one bit per axis — only the <em>sign</em> of a neighbour's relative position, no velocity measurement at all. Nearly all consensus work stops at simulation; this reports what actually survives sensor noise, latency and a 10 Hz loop.",
    media: {
      src: "assets/media/swarm/p1-hw.mp4",
      poster: "assets/media/swarm/card-poster.webp",
      alt: "Five Crazyflie 2.1 nano-quadrotors reaching consensus in the Lighthouse arena",
      caption: "Five Crazyflie 2.1s reaching consensus on one bit per axis, replayed in Foxglove from the flight log."
    },
    tags: ["5 × Crazyflie 2.1", "ROS 2 Jazzy", "Gazebo Harmonic", "Lighthouse + EKF", "Binary feedback"],

    detail: {
      tagline: "Six consensus and formation-control protocols implemented on a five-drone Crazyflie swarm and benchmarked against their own simulations — four of them flown on hardware, using nothing but the sign of a neighbour's relative position.",
      facts: [
        { label: "Swarm", value: "5 × Crazyflie 2.1 (27 g)" },
        { label: "Arena", value: "4 × 3.61 m, Bitcraze Lighthouse" },
        { label: "Stack", value: "ROS 2 Jazzy · Gazebo Harmonic" },
        { label: "Control loop", value: "10 Hz (Δt = 0.1 s)" },
        { label: "Venue", value: "ICAART 2026" }
      ],

      blocks: [
                {
          type: "prose-pair",
          items: [
            {
              heading: "The gap",
              body: [
              "Consensus theory for multi-agent systems is mature. Validation of it mostly is not — the overwhelming majority of published protocols are demonstrated in simulation and never leave it. A simulated agent has exact state, instant communication and no actuator of its own to fight.",
              "A real swarm has none of those. Sensor noise, communication latency, actuation uncertainty and disturbance can degrade a protocol or destabilise it outright, and which protocols survive that is not something theory predicts for you. This work implements <strong>six</strong> protocol families on the same five-drone Crazyflie swarm, flies four of them, and reports the trade-offs side by side."
              ]
            },
            {
              heading: "One bit per axis",
              body: [
              "Most consensus laws assume each agent can measure its neighbour's relative position, and often relative velocity too, as a precise real number. That is an expensive assumption: it buys you convergence proofs at the cost of sensing that small or cheap platforms do not have.",
              "The protocols benchmarked here need only the <strong>sign</strong> of the difference — <code>+1</code>, <code>0</code> or <code>−1</code> on each axis. One bit per axis per neighbour. Several of them additionally need <strong>no velocity measurement at all</strong>, reconstructing what they need through an internal dynamic state. That is what makes them interesting for swarms built from minimal hardware, and what makes it worth knowing whether they actually hold up in the air."
              ]
            }
          ]
        },

        { type: "heading2", label: "The rig" },

        {
          type: "steps",
          heading: "How it is built",
          items: [
            { n: "01.", label: "Hardware.", text: "Five Crazyflie 2.1 nano-quadrotors, 27 g each, ARM Cortex-M4, commanded over a Crazyradio 2.0 link from a client laptop. Simulated agents cf1–cf5 map to physical airframes cf03, cf10, cf07, cf05 and cf08." },
            { n: "02.", label: "Localisation.", text: "A 4 × 3.61 m arena running the Bitcraze Lighthouse system. Each drone carries synchronised sensor nodes that receive the Lighthouse sweeps, and an Extended Kalman Filter fuses those bearing-only measurements into a position estimate in real time." },
            { n: "03.", label: "Software.", text: "ROS 2 Jazzy Jalisco with Gazebo Harmonic as the physics environment, joined by a <code>ros_gz_bridge</code>: per-agent velocity commands go out on <code>/crazyflieN/cmd_vel</code>, odometry and range come back on <code>/crazyflieN/odom</code>. Every controller therefore sees simulated sensor feedback rather than ground truth." },
            { n: "04.", label: "One package per protocol.", text: "Each family is an independent <code>ament_python</code> package exposing its variants as <code>console_scripts</code> entry points — undirected, balanced, unbalanced — so a control law can be swapped without touching the launch, bridge or world description." },
            { n: "05.", label: "The loop.", text: "A controller node subscribes to all five odometries and publishes a Twist to each, on a <code>create_timer()</code> callback at a fixed 10 Hz. Each tick it reads positions, computes the sign-based consensus term over that agent's neighbours, integrates a damped and speed-limited velocity command, and regulates altitude through a separate proportional command." },
            { n: "06.", label: "Logging.", text: "rosbag to CSV for the plots, with every time axis referenced to the start of the run, and .mcap into Foxglove to visualise the drone transforms during each experiment." }
          ]
        },

        { type: "heading2", label: "The six protocols" },

                {
          type: "protocol",
          heading: "1 — Finite-time consensus from binary information",
          body: [
            "The simplest of the set: each agent moves on the sign of its position difference with each neighbour, nothing more. Gains <code>a_ij = 1</code>, <code>k = 0.5</code>.",
            "<strong>In simulation</strong> it reaches ideal finite-time convergence with stable agreement and negligible chattering. <strong>On hardware</strong> convergence is confirmed, but with post-consensus drift — attributable to sensor noise and delay rather than to anything unstable in the algorithm. Convergence is sharp in simulation and slightly oscillatory in the air, which is the protocol's robustness and its sensitivity to real sensing showing up in the same trace."
          ],
          arch: "assets/media/swarm/p1-arch.mp4",
          hardware: "assets/media/swarm/p1-hw.mp4",
          sim: "assets/media/swarm/p1-sim.mp4",
          results: "assets/media/swarm/p1-results.webp",
          resultsCaption: "Left: simulation, x-position of all five agents against time. Right: the same quantity from the flown swarm (cf03, cf07, cf05, cf10, cf08) with the 3-D trajectories beside it. The agreement value is reached in both; the hardware trace carries the sensor noise and the post-consensus drift the simulation does not have."
        },
                {
          type: "protocol",
          heading: "2 — Mixed fractional-order, fixed-time",
          body: [
            "Two fractional exponents in one law, <code>0 &lt; α &lt; 1 &lt; β</code>: the lower exponent drives rapid convergence once errors are small, the higher one handles large errors. Gains <code>α = 0.5</code>, <code>β = 1.5</code>, <code>k₁ = 0.4</code>, <code>k₂ = 0.2</code>.",
            "<strong>In simulation</strong>, smooth convergence with minimal to no oscillation or chattering. <strong>On hardware</strong>, convergence confirmed with post-consensus drift and slight scatter. The steady convergence reproduces in the air with mild overshoot afterwards — the most precise of the flown protocols, and the one that damps oscillation best."
          ],
          arch: "assets/media/swarm/p2-arch.mp4",
          hardware: "assets/media/swarm/p2-hw.mp4",
          sim: "assets/media/swarm/p2-sim.mp4",
          results: "assets/media/swarm/p2-results.webp",
          resultsCaption: "Simulation left, hardware right. Convergence is smooth in both. The late excursions on the right-hand trace are the end of the run, not part of the consensus phase."
        },
                {
          type: "protocol",
          heading: "3 — Velocity-free consensus-containment",
          body: [
            "Second-order agent dynamics with <strong>no explicit velocity measurement</strong>. Each agent computes acceleration commands from an internal dynamic state, and binary interactions with neighbours and with boundary agents keep the swarm inside a prescribed interval. Gains <code>a_ij = 1</code>, bounds <code>x_min = −1</code>, <code>x_max = +1</code>.",
            "<strong>In simulation</strong> the protocol drives every agent into the <code>[−1, +1]</code> bound with finite-time convergence and moderate stability. <strong>On hardware</strong> the bound-constrained behaviour reproduces almost exactly, confirming robust containment, though as expected no averaging of states occurs beyond the imposed limits. The approach is sharp in simulation and shows medium oscillatory drift in flight."
          ],
          arch: "assets/media/swarm/p3-arch.mp4",
          hardware: "assets/media/swarm/p3-hw.mp4",
          sim: "assets/media/swarm/p3-sim.mp4",
          results: "assets/media/swarm/p3-results.webp",
          resultsCaption: "Simulation left, hardware right. The bound-constrained behaviour reproduces closely in flight, with the medium oscillatory drift described above."
        },
                {
          type: "protocol",
          heading: "4 — Second-order formation tracking of a target",
          body: [
            "The most capable of the flown set: a tanh-based second-order law with internal filter states that lets the swarm hold a geometric formation while tracking a moving target, assuming constant target velocity. Each agent needs only its own position and velocity — no measurement of neighbouring states at all. Gains <code>K₁ = K₂ = K₃ = K₄ = 1.0</code>.",
            "<strong>In simulation</strong> the agents settle into a precise square with moderate convergence speed, high stability and minimal oscillation. <strong>On hardware</strong> a stable square is achieved too, with slight lateral drift and an altitude offset; the formation stays steady at higher <code>z</code>, which is a good sign for robustness. The experiment shows slight post-formation scatter and small vertical oscillations from sensing noise and estimator delay."
          ],
          arch: "assets/media/swarm/p4-arch.mp4",
          hardware: "assets/media/swarm/p4-hw.mp4",
          sim: "assets/media/swarm/p4-sim.mp4",
          results: "assets/media/swarm/p4-results.webp",
          resultsCaption: "Simulation left, hardware right. The square forms in both; the right-hand trace shows the post-formation scatter and the small vertical oscillations that come from estimator delay."
        },
                {
          type: "protocol",
          heading: "5 — Consensus-tracking with a discontinuous Γ(·)  ·  simulation only",
          body: [
            "Here the continuous auxiliary function is replaced with the discontinuous choice <code>Γ(ζ) = k₂·sign(ζ)</code>, and the law is extended to track a moving target. The five agents communicate over a fixed chain, cf1↔cf2↔cf3↔cf4↔cf5, and <strong>only the median agent cf3 senses the circular reference directly</strong> — everyone else reaches the target through the chain.",
            "Starting from widely scattered spawn points, the swarm holds position through a 30 s takeoff and then converges onto the moving target over roughly 90 s of tracking, with a brief transient overshoot near <code>t ≈ 115 s</code> before settling to within 0.2–0.4 m of the reference.",
            "<strong>This one was not flown.</strong> Real-world validation on the physical swarm is left for future work."
          ],
          arch: "assets/media/swarm/p5-arch.mp4",
          sim: "assets/media/swarm/p5-sim.mp4"
        },
                {
          type: "protocol",
          heading: "6 — Formation plus target capturing  ·  simulation only",
          body: [
            "The same chain and the same pinned leader, but now with a desired 1-D line formation: offsets <code>d_i ∈ {−0.8, −0.4, 0, 0.4, 0.8} m</code> along <code>x</code>, with cf3 (its own offset zero) driving directly at the reference.",
            "From the same scattered spawn points the swarm converges over about 90–100 s, with a moderate transient bump near <code>t ≈ 100 s</code>. Crucially it settles into <em>distinguishable</em> relative offsets rather than collapsing to a point — a final spread of roughly 1.4 m across the line against a nominal 1.6 m design width — confirming that the inter-agent geometry is preserved while the whole formation is pulled along by the target.",
            "<strong>Also not flown.</strong> Hardware deployment and further gain tuning are left for future work."
          ],
          arch: "assets/media/swarm/p6-arch.mp4",
          sim: "assets/media/swarm/p6-sim.mp4"
        },

        {
          type: "callout",
          tone: "info",
          heading: "What it takes to make a discontinuous law fly",
          body: ["A sign-based control law is a clean object on paper and a vibrating actuator in the air. Getting protocols 5 and 6 onto quadrotor dynamics at all took three specific measures, and they are arguably the most transferable result in the paper:"],
          items: [
            "<strong>A boundary-layer surrogate for sign(·).</strong> Both discontinuous terms were replaced with smooth approximations — <code>Γ(ζ) = k₂·tanh(αζ)</code> and <code>sign(·) ≈ tanh(2.5·)</code> — at gains <code>k₁ = 0.6</code>, <code>k₂ = 0.1</code>, <code>α = 2.0</code>, which satisfies the convergence margin <code>k₁ &gt; n·k₂ = 0.5</code>.",
            "<strong>Actuator-side filtering.</strong> The velocity command goes through a first-order low-pass and a hard slew-rate limiter before reaching the vehicle. Unfiltered high-frequency commands were found to force rapid re-tilting and a corresponding transient loss of altitude.",
            "<strong>Altitude stacking.</strong> The tracking law drives every agent to the same planar position by construction, so each agent holds a distinct fixed hover altitude. The guaranteed rendezvous becomes a vertical stack instead of a collision."
          ]
        },

        { type: "heading2", label: "Side by side" },

        {
          type: "table",
          heading: "All six protocols compared",
          headers: ["Protocol", "Convergence", "Stability", "Oscillations", "Precision"],
          rows: [
            ["1 · Finite-time, binary", "Fast", "Moderate", "High (chattering)", "Robust"],
            ["2 · Fractional-order", "Fast", "High", "Low", "High"],
            ["3 · Velocity-free containment", "Fast", "Moderate", "Medium", "Bound-constrained"],
            ["4 · Formation control", "Moderate", "High", "Low", "High"],
            ["5 · Consensus-tracking, discontinuous Γ", "Moderate", "High", "Low–Moderate", "High"],
            ["6 · Formation + target capturing", "Moderate", "Moderate", "Low–Moderate", "Moderate–High"]
          ],
          note: "Protocols 1–4 were flown on the Crazyflie swarm as well as simulated. Protocols 5 and 6 are simulation results only. The ratings are the paper's own qualitative comparison rather than measured convergence times."
        },
        {
          type: "prose",
          heading: "What the comparison says",
          body: [
            "The trade-offs come out cleanly. <strong>Fractional-order dynamics damp oscillation best.</strong> <strong>Double-integrator schemes improve formation stability.</strong> <strong>The advanced formation controller achieves the most precise dynamic coordination.</strong> And the simplest binary protocol converges fastest but chatters hardest — which is exactly the behaviour its discontinuity predicts, amplified rather than hidden by real hardware."
          ]
        },

        {
          type: "callout",
          tone: "warn",
          heading: "Scope, and what this does not establish",
          body: ["The honest boundaries of the benchmark:"],
          items: [
            "<strong>Two of the six never flew.</strong> Protocols 5 and 6 are simulation results, and the paper says so — hardware implementation and further gain tuning are deferred to future work.",
            "<strong>The simulation baseline models agents as point masses.</strong> Gazebo supplies the physical parameters governing motion, but the agents themselves are not full quadrotor models.",
            "<strong>Everything flown was flown indoors</strong>, in a 4 × 3.61 m arena under Lighthouse localisation. This is a controlled-environment benchmark, not an outdoor or GPS-denied one.",
            "<strong>The required gain margin grows with swarm size.</strong> Convergence needs <code>k₁ &gt; (n−1)k₂</code>, so the margin between the gains has to widen as <code>n</code> grows. Scalability is argued from that structure, not demonstrated beyond five agents.",
            "<strong>Post-consensus drift is attributed, not isolated.</strong> It is put down to sensor noise and delay rather than algorithmic instability, but the paper does not separate those contributions quantitatively."
          ]
        },

        {
          type: "callout",
          tone: "info",
          heading: "Publication",
          body: [
            "Mikhael Sunil, Akshat Singh, Agniva Banerjee, Arijit Sen and Sujit P. B. — <em>Experimental Benchmarking of Binary Measurement Based Consensus and Formation Control Algorithms for Multi-Agent Aerial Swarms.</em>",
            "The underlying experimental evaluation appears in the 18th International Conference on Agents and Artificial Intelligence (ICAART 2026), Volume 3, pages 2581–2587, INSTICC / SciTePress. Work carried out with the Department of Electrical Engineering and Computer Science, IISER Bhopal."
          ]
        },
        {
          type: "tags",
          heading: "Stack",
          items: ["ROS 2 Jazzy Jalisco", "Gazebo Harmonic", "ros_gz_bridge", "ament_python", "Crazyflie 2.1", "Crazyradio 2.0", "Bitcraze Lighthouse", "Extended Kalman Filter", "rosbag / .mcap", "Foxglove", "Python 3.13", "Ubuntu 24.04"]
        }
      ]
    }
  },

  /* =====================================================================
     The rest — shown on the showcase page
     ===================================================================== */
  {
    slug: "geoscout",
    code: "PRJ-03",
    featured: true,
    kicker: "FIELD ROBOTICS",
    badgeColor: "ink",
    title: "GeoScout — 6WD Autonomous Mine-Mapping Rover",
    summary: "Six-wheel-drive GPS-denied exploration rover on Jetson Nano/RPi and Teensy 4.0, fusing 3D LiDAR, IMU, ground-penetrating radar and hazardous gas sensors for real-time ROS 2 SLAM.",
    tags: ["ROS 2 SLAM", "Jetson / Teensy 4.0", "LiDAR · GPR"]
  },
  {
    slug: "sac-navigation",
    code: "PRJ-04",
    kicker: "DEEP RL",
    badgeColor: "paper",
    title: "Deep RL (SAC) Mapless Autonomous Navigation",
    summary: "Containerised Soft Actor-Critic navigation stack replacing classical planners with continuous control and automatic entropy tuning, on TurtleBot3 in ROS 2 Foxy and Gazebo Classic.",
    tags: ["SAC DRL", "ROS 2 Foxy", "Docker · TurtleBot3"]
  },
  {
    slug: "uav-vision",
    code: "PRJ-05",
    kicker: "UAV VISION",
    badgeColor: "paper",
    title: "Vision-Based UAV Path Following & Landing",
    summary: "Real-time image segmentation, centroid path prediction, yaw-rate correction and autonomous landing-marker descent on the Parrot Mambo minidrone, via MATLAB/Simulink.",
    tags: ["MATLAB / Simulink", "Parrot Mambo", "Vision Control"]
  }

];
