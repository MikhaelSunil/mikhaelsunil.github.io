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
   projects/ncf/ to projects/<your-slug>/ and change the one slug line in
   its index.html. Without "detail" the card simply is not clickable.

   DETAIL BLOCK TYPES
     prose    { heading, body: ["para", "para"] }
     steps    { heading, items: [{ n, label, text }] }
     figure   { src, alt, caption }
     figures  { columns, items: [{ src, alt, caption }] }
     table    { heading, headers: [...], rows: [[...]], note }
     callout  { tone: "warn" | "info", heading, body: [...], items: [...] }
     tags     { heading, items: [...] }
   Image paths are written from the site root, e.g. assets/media/ncf/x.webp —
   the page works out the rest.
   ========================================================================= */

window.PROJECTS = [

  /* =====================================================================
     NCF
     ===================================================================== */
  {
    slug: "ncf",
    code: "PRJ-01",
    featured: true,
    status: "Ongoing research",
    kicker: "AERIAL MANIPULATION",
    badgeColor: "signal",
    title: "NCF — Learning the Forces a Drone Cannot Model",
    summary: "A neural ODE that learns how a drone's unmodelled force evolves — the arm's reaction, a payload, a shifted centre of mass — conditioned on a per-drone context vector so one network covers a whole family of airframes. Exported from JAX and flown onboard at 20 Hz through a mid-air payload release.",
    media: {
      src: "assets/media/ncf/real-flight.gif",
      alt: "NCF flying a figure eight on the real drone through a payload release"
    },
    tags: ["Neural ODE", "JAX to onboard 20 Hz", "PX4 · Gazebo · Isaac Gym", "Disturbance Observer"],

    detail: {
      tagline: "A context-conditioned neural ODE for the residual force on a drone with an arm — deployed onboard and flown through a payload release.",
      facts: [
        { label: "Platform", value: "Quadrotor + 2-DOF arm, PX4" },
        { label: "Onboard rate", value: "20 Hz" },
        { label: "Trained in", value: "JAX, exported to NumPy" },
        { label: "Validated in", value: "Real flight, Gazebo SITL, Isaac Gym" },
        { label: "Status", value: "Generation 1 — second generation in progress" }
      ],
      hero: {
        src: "assets/media/ncf/drone-figure8.jpg",
        alt: "The quadrotor with its 2-DOF arm flying a figure eight in the motion-capture arena",
        caption: "The airframe in the motion-capture arena, flying the figure eight used throughout the tests."
      },

      blocks: [
        {
          type: "prose",
          heading: "The problem",
          body: [
            "The rigid-body model of a drone is never exact. The difference between the force the controller commands and the force that actually accelerates the drone — the <strong>residual force</strong>, H = F &minus; m&middot;a — holds everything the simple model misses: the arm's reaction torque, a payload, a shifted centre of mass, drag.",
            "On a drone that carries an arm and picks things up, that residual is not a small nuisance term. It changes shape every time the arm moves and jumps the moment a payload leaves the gripper. A controller that treats it as noise spends the whole flight chasing it."
          ]
        },
        {
          type: "steps",
          heading: "How it works",
          items: [
            { n: "01.", label: "Continuous-time model.", text: "A network predicts the <em>rate of change</em> of the residual force and an ODE solver integrates it, so the estimate is smooth and consistent over time rather than re-guessed every tick." },
            { n: "02.", label: "A context vector per drone.", text: "Each airframe gets a 256-number context. One network covers a family of drones; a new one needs only its context fitted, from a short flight — not a retrained model." },
            { n: "03.", label: "Room to think.", text: "Seven augmented latent dimensions give the ODE state space to represent dynamics that a bare 3-D force vector could not." },
            { n: "04.", label: "Fused in flight.", text: "A disturbance observer blends the model's prediction with the residual actually measured in flight, and the result is applied as a feed-forward term in a PX4 attitude controller." }
          ]
        },
        {
          type: "figure",
          src: "assets/media/ncf/architecture.gif",
          alt: "Animated diagram of the NCF architecture, from flight state and drone context through the neural ODE and disturbance observer to the attitude controller",
          caption: "Flight state and the drone's context vector each pass through a 3-layer MLP into a shared head, which predicts the rate of the residual force plus seven latent dimensions. The ODE integrates it; the observer fuses it with the measured residual; the result feeds forward into the attitude controller."
        },
        {
          type: "prose",
          heading: "What is actually new here",
          body: [
            "<strong>One model, many drones.</strong> Payload, base mass and centre-of-mass offset are absorbed into the context vector, so the network does not need retraining per airframe. Adapting to a new drone is fitting 256 numbers, not a training run.",
            "<strong>It learns dynamics, not a lookup table.</strong> Predicting the rate and integrating it is what makes the force estimate smooth and physically consistent — a network that regressed the force directly would jitter.",
            "<strong>It left the simulator.</strong> Plenty of learned-dynamics work stops at a plot. This was exported from JAX to plain NumPy and run on the aircraft at 20 Hz, inside the control loop, through a payload release."
          ]
        },

        { type: "heading2", label: "Results" },

        {
          type: "table",
          heading: "Real drone",
          headers: ["Tracking error (RMSE)", ""],
          rows: [["Whole flight", "<strong>5.4 cm</strong>"], ["Before / after the release", "5.2 / 5.6 cm"]],
          note: "Quadrotor with a 2-DOF arm, motion capture, figure 8 (&plusmn;1 m at 1.1 m altitude), 0.3 kg payload released at 25 s, model on. The applied force follows the measured residual closely through the release — correlation 0.98 on the vertical axis."
        },
        {
          type: "figure",
          src: "assets/media/ncf/real-payload-release.webp",
          alt: "Figure-8 payload compensation: 3-D trajectory, per-axis position tracking, tracking error and disturbance-observer estimates",
          caption: "Real flight. The payload leaves at 25 s — visible as the step in the disturbance-observer panel — and the tracking error barely registers it."
        },
        {
          type: "table",
          heading: "Simulation — PX4 SITL + Gazebo",
          headers: ["Scenario", "PX4 position control", "NCF", "Error cut"],
          rows: [
            ["No payload change", "0.194 m", "<strong>0.028 m</strong>", "<strong>86%</strong>"],
            ["Payload dropped mid-flight", "0.200 m", "<strong>0.040 m</strong>", "<strong>80%</strong>"],
            ["Payload dropped, with the observer", "0.200 m", "<strong>0.036 m</strong>", "<strong>82%</strong>"]
          ],
          note: "Figure 8 with the arm sweeping throughout."
        },
        {
          type: "figures",
          columns: 2,
          items: [
            { src: "assets/media/ncf/gazebo-vs-px4.webp", alt: "Gazebo comparison, no payload change", caption: "No payload change — 0.194 m to 0.028 m." },
            { src: "assets/media/ncf/gazebo-payload-drop.webp", alt: "Gazebo comparison with a payload drop", caption: "Payload dropped mid-flight — 0.200 m to 0.040 m." }
          ]
        },
        {
          type: "prose",
          heading: "Simulation — Isaac Gym",
          body: [
            "On a drone with a 39.5 mm centre-of-mass offset, NCF alone cut the tracking error by <strong>91%</strong> (0.864 m to 0.078 m) and removed 95% of the steady offset. With a heavier 144 g payload the cut was 64%."
          ]
        },
        {
          type: "figure",
          src: "assets/media/ncf/real-asmc-v1.webp",
          alt: "Real drone comparison: adaptive sliding-mode control with model v1 against PX4's own controller",
          caption: "A separate, later bench: the learned model paired with an adaptive sliding-mode controller tracks a small figure 8 to about 1 cm where PX4's own controller manages 5.2 cm, mostly by removing a steady 2.5 cm offset. Single flights — as the figure itself says, repeat before quoting."
        },

        {
          type: "callout",
          tone: "warn",
          heading: "What these numbers do and do not show",
          body: ["Every result above comes with a caveat, and they are worth stating plainly rather than burying:"],
          items: [
            "The Gazebo comparisons are NCF <em>plus an attitude controller</em> against PX4's position controller. That is a change of controller as well as a change of model, so the headline percentages are not attributable to the learned model alone.",
            "The real flight was flown with the model on only. About <strong>85% of the applied correction came from the measured residual</strong> through the disturbance observer — so the learned model is doing a minority of the work in that number.",
            "The Isaac Gym controller has no attitude integrator, so part of that 91% is the model doing a job an integrator would otherwise have done.",
            "The adaptive sliding-mode figures are single flights. They have not been repeated enough times to quote as a result."
          ]
        },
        {
          type: "callout",
          tone: "info",
          heading: "Ongoing research — what is not here",
          body: [
            "This is the first generation of an active research line, so this page is deliberately a summary rather than a full account. Training code, learned weights, the dataset and the unpublished details of the architecture are not public while the work is in progress.",
            "The limitations above are precisely what led to the second generation, <strong>Meta-L</strong>, which is being built now. Results from it will be added here once they are solid enough to stand on. If you want to talk about any of it in more detail, get in touch."
          ]
        },
        {
          type: "tags",
          heading: "Stack",
          items: ["JAX", "Neural ODE", "Diffrax-style integration", "NumPy export", "PX4", "Gazebo SITL", "Isaac Gym", "Motion capture", "Disturbance observer", "ROS 2"]
        }
      ]
    }
  },

  /* =====================================================================
     PHYSIOBOT
     ===================================================================== */
  {
    slug: "physiobot",
    code: "PRJ-02",
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
    code: "PRJ-03",
    featured: true,
    status: "Published",
    kicker: "AERIAL SWARMS",
    badgeColor: "scope",
    title: "Distributed Containment-Consensus Control for a Heterogeneous Drone Swarm",
    summary: "Fully decentralised single- and double-integrator consensus on Crazyflie 2.1 nano-drones using only discretised binary relative position feedback — one bit per axis — with ROS 2 and Crazyswarm2. Benchmarked on physical hardware, not just in simulation.",
    tags: ["Crazyflie 2.1", "ROS 2", "Crazyswarm2", "Binary Feedback"]
  },

  /* =====================================================================
     The rest — shown on the showcase page
     ===================================================================== */
  {
    slug: "geoscout",
    code: "PRJ-04",
    kicker: "FIELD ROBOTICS",
    badgeColor: "ink",
    title: "GeoScout — 6WD Autonomous Mine-Mapping Rover",
    summary: "Six-wheel-drive GPS-denied exploration rover on Jetson Nano/RPi and Teensy 4.0, fusing 3D LiDAR, IMU, ground-penetrating radar and hazardous gas sensors for real-time ROS 2 SLAM.",
    tags: ["ROS 2 SLAM", "Jetson / Teensy 4.0", "LiDAR · GPR"]
  },
  {
    slug: "sac-navigation",
    code: "PRJ-05",
    kicker: "DEEP RL",
    badgeColor: "paper",
    title: "Deep RL (SAC) Mapless Autonomous Navigation",
    summary: "Containerised Soft Actor-Critic navigation stack replacing classical planners with continuous control and automatic entropy tuning, on TurtleBot3 in ROS 2 Foxy and Gazebo Classic.",
    tags: ["SAC DRL", "ROS 2 Foxy", "Docker · TurtleBot3"]
  },
  {
    slug: "uav-vision",
    code: "PRJ-06",
    kicker: "UAV VISION",
    badgeColor: "paper",
    title: "Vision-Based UAV Path Following & Landing",
    summary: "Real-time image segmentation, centroid path prediction, yaw-rate correction and autonomous landing-marker descent on the Parrot Mambo minidrone, via MATLAB/Simulink.",
    tags: ["MATLAB / Simulink", "Parrot Mambo", "Vision Control"]
  }

];
