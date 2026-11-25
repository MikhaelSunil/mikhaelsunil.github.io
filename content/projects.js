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
