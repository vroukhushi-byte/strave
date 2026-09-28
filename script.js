/* =========================================================
   STRAVE WORLD
   3D WORLD + SOCIAL UI + ARCADE
========================================================= */

let scene;
let camera;
let renderer;

let worldGroup;
let avatar;

let isNight = false;

let xp = 0;
let level = 1;

let cars = [];
let flowers = [];

const locationName = document.getElementById("locationName");

/* =========================================================
   START
========================================================= */

window.addEventListener("load", () => {

  initWorld();

  setTimeout(() => {
    const loading = document.getElementById("loading");

    loading.style.opacity = "0";

    setTimeout(() => {
      loading.style.display = "none";
    }, 600);

  }, 1400);

});


/* =========================================================
   THREE.JS WORLD
========================================================= */

function initWorld() {

  scene = new THREE.Scene();

  scene.background = new THREE.Color(0xdde9dc);

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(18, 15, 22);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.shadowMap.enabled = true;

  document.getElementById("world").appendChild(renderer.domElement);

  /* LIGHT */

  const ambient = new THREE.AmbientLight(
    0xffffff,
    1.2
  );

  scene.add(ambient);

  const sun = new THREE.DirectionalLight(
    0xffffff,
    1.8
  );

  sun.position.set(
    20,
    30,
    10
  );

  sun.castShadow = true;

  scene.add(sun);

  worldGroup = new THREE.Group();

  scene.add(worldGroup);

  createGround();
  createRoad();
  createBuildings();
  createTrees();
  createFlowers();
  createLake();
  createArcadeBuilding();
  createAvatar();
  createCars();

  addControls();

  window.addEventListener(
    "resize",
    resizeWorld
  );

  animate();
}


/* =========================================================
   GROUND
========================================================= */

function createGround() {

  const geometry =
    new THREE.PlaneGeometry(
      140,
      140
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0xa7b899
    });

  const ground =
    new THREE.Mesh(
      geometry,
      material
    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.receiveShadow = true;

  worldGroup.add(ground);
}


/* =========================================================
   ROAD
========================================================= */

function createRoad() {

  const geometry =
    new THREE.PlaneGeometry(
      8,
      100
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x6b625c
    });

  const road =
    new THREE.Mesh(
      geometry,
      material
    );

  road.rotation.x =
    -Math.PI / 2;

  road.position.y =
    0.02;

  worldGroup.add(road);

  for (let z = -45; z < 45; z += 7) {

    const lineGeometry =
      new THREE.BoxGeometry(
        .25,
        .04,
        3
      );

    const lineMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xf6e9bd
      });

    const line =
      new THREE.Mesh(
        lineGeometry,
        lineMaterial
      );

    line.position.set(
      0,
      .05,
      z
    );

    worldGroup.add(line);
  }
}


/* =========================================================
   BUILDINGS
========================================================= */

function createBuildings() {

  const positions = [
    [-16, -15, 5, 7],
    [16, -18, 7, 9],
    [-18, 10, 6, 5],
    [18, 12, 5, 7],
    [-15, 30, 8, 10],
    [16, 30, 6, 8]
  ];

  positions.forEach((p, index) => {

    const width = p[2];
    const height = p[3];

    const geometry =
      new THREE.BoxGeometry(
        width,
        height,
        width
      );

    const material =
      new THREE.MeshStandardMaterial({
        color: [
          0xe7c6b5,
          0xd6dfc7,
          0xe5d5b8,
          0xc8d8dc
        ][index % 4]
      });

    const building =
      new THREE.Mesh(
        geometry,
        material
      );

    building.position.set(
      p[0],
      height / 2,
      p[1]
    );

    building.castShadow = true;

    worldGroup.add(building);

    /* roof */

    const roofGeometry =
      new THREE.ConeGeometry(
        width * .75,
        2.5,
        4
      );

    const roofMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x7a5549
      });

    const roof =
      new THREE.Mesh(
        roofGeometry,
        roofMaterial
      );

    roof.position.set(
      p[0],
      height + 1.2,
      p[1]
    );

    roof.rotation.y =
      Math.PI / 4;

    worldGroup.add(roof);

  });
}


/* =========================================================
   TREES
========================================================= */

function createTrees() {

  const treePositions = [
    [-25,-25],
    [25,-25],
    [-27,5],
    [27,5],
    [-28,25],
    [28,25],
    [-10,40],
    [10,40]
  ];

  treePositions.forEach(
    ([x,z]) => {

      const trunk =
        new THREE.Mesh(
          new THREE.CylinderGeometry(
            .5,
            .7,
            4,
            8
          ),
          new THREE.MeshStandardMaterial({
            color: 0x76533d
          })
        );

      trunk.position.set(
        x,
        2,
        z
      );

      worldGroup.add(trunk);

      const crown =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            3.2,
            16,
            16
          ),
          new THREE.MeshStandardMaterial({
            color: 0x7f9d73
          })
        );

      crown.position.set(
        x,
        5.5,
        z
      );

      crown.castShadow = true;

      worldGroup.add(crown);

    }
  );
}


/* =========================================================
   FLOWERS
========================================================= */

function createFlowers() {

  for (
    let i = 0;
    i < 70;
    i++
  ) {

    const stem =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          .04,
          .04,
          .5,
          5
        ),
        new THREE.MeshStandardMaterial({
          color: 0x62835e
        })
      );

    const x =
      (Math.random() - .5) * 70;

    const z =
      (Math.random() - .5) * 70;

    stem.position.set(
      x,
      .25,
      z
    );

    worldGroup.add(stem);

    const flower =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          .18,
          8,
          8
        ),
        new THREE.MeshStandardMaterial({
          color: 0xe7a5aa
        })
      );

    flower.position.set(
      x,
      .55,
      z
    );

    worldGroup.add(flower);

    flowers.push(flower);
  }
}


/* =========================================================
   LAKE
========================================================= */

function createLake() {

  const geometry =
    new THREE.CircleGeometry(
      12,
      40
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x91c5d1,
      transparent: true,
      opacity: .82
    });

  const lake =
    new THREE.Mesh(
      geometry,
      material
    );

  lake.rotation.x =
    -Math.PI / 2;

  lake.position.set(
    -25,
    .08,
    38
  );

  worldGroup.add(lake);
}


/* =========================================================
   ARCADE BUILDING
========================================================= */

function createArcadeBuilding() {

  const geometry =
    new THREE.BoxGeometry(
      9,
      5,
      6
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0xd69eae
    });

  const building =
    new THREE.Mesh(
      geometry,
      material
    );

  building.position.set(
    14,
    2.5,
    -3
  );

  building.castShadow = true;

  worldGroup.add(building);

  const sign =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        6,
        1.5,
        .25
      ),
      new THREE.MeshStandardMaterial({
        color: 0xf3d67d
      })
    );

  sign.position.set(
    14,
    5.5,
    -6
  );

  worldGroup.add(sign);
}


/* =========================================================
   AMIGURUMI AVATAR
========================================================= */

function createAvatar() {

  avatar =
    new THREE.Group();

  /* BODY */

  const body =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.25,
        24,
        20
      ),
      new THREE.MeshStandardMaterial({
        color: 0xd98e92
      })
    );

  body.scale.y =
    1.25;

  body.castShadow = true;

  avatar.add(body);

  /* HEAD */

  const head =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.45,
        24,
        20
      ),
      new THREE.MeshStandardMaterial({
        color: 0xe8b99d
      })
    );

  head.position.y =
    2.1;

  head.castShadow = true;

  avatar.add(head);

  /* HAIR */

  const hair =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.48,
        24,
        16
      ),
      new THREE.MeshStandardMaterial({
        color: 0x6a4036
      })
    );

  hair.position.y =
    2.55;

  hair.scale.set(
    1,
    .7,
    1
  );

  avatar.add(hair);

  /* EYES */

  [-.42,.42].forEach(x => {

    const eye =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          .12,
          10,
          10
        ),
        new THREE.MeshBasicMaterial({
          color: 0x33201c
        })
      );

    eye.position.set(
      x,
      2.15,
      1.32
    );

    avatar.add(eye);

  });

  avatar.position.set(
    0,
    1.2,
    12
  );

  worldGroup.add(avatar);
}


/* =========================================================
   CARS
========================================================= */

function createCars() {

  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const car =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          1.7,
          .8,
          3
        ),
        new THREE.MeshStandardMaterial({
          color: [
            0xd78e8e,
            0x8ea8c2,
            0xe1b65e,
            0x8fa77f
          ][i]
        })
      );

    car.position.set(
      i % 2 === 0 ? -.8 : .8,
      .5,
      -35 + i * 20
    );

    car.castShadow = true;

    worldGroup.add(car);

    cars.push(car);
  }
}


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

  requestAnimationFrame(
    animate
  );

  cars.forEach(
    car => {

      car.position.z += .035;

      if (
        car.position.z > 50
      ) {
        car.position.z = -50;
      }

    }
  );

  if (avatar) {

    avatar.position.y =
      1.2 +
      Math.sin(
        Date.now() * .002
      ) * .04;

  }

  flowers.forEach(
    flower => {

      flower.rotation.y += .005;

    }
  );

  renderer.render(
    scene,
    camera
  );
}


/* =========================================================
   CAMERA CONTROLS
========================================================= */

let dragging = false;
let previousX = 0;

function addControls() {

  renderer.domElement.addEventListener(
    "pointerdown",
    e => {

      dragging = true;

      previousX = e.clientX;

    }
  );

  renderer.domElement.addEventListener(
    "pointerup",
    () => {
      dragging = false;
    }
  );

  renderer.domElement.addEventListener(
    "pointermove",
    e => {

      if (!dragging) return;

      const delta =
        e.clientX - previousX;

      camera.position.x -=
        delta * .025;

      camera.lookAt(
        0,
        0,
        0
      );

      previousX =
        e.clientX;

    }
  );

  renderer.domElement.addEventListener(
    "wheel",
    e => {

      camera.position.z +=
        e.deltaY * .01;

      camera.position.z =
        Math.max(
          10,
          Math.min(
            55,
            camera.position.z
          )
        );

    }
  );
}


/* =========================================================
   RESIZE
========================================================= */

function resizeWorld() {

  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
}


/* =========================================================
   PANELS
========================================================= */

function openPanel(id) {

  closePanels();

  const panel =
    document.getElementById(id);

  panel.classList.add("active");
}

function closePanels() {

  document
    .querySelectorAll(".panel")
    .forEach(
      p =>
        p.classList.remove(
          "active"
        )
    );
}


/* =========================================================
   ARCADE
========================================================= */

function openArcade() {

  closePanels();

  document
    .getElementById("arcadePanel")
    .classList.add("active");

  document
    .getElementById("arcadeHome")
    .style.display = "block";

  document
    .getElementById("gameScreen")
    .innerHTML = "";

  travelTo("STRAVE Arcade");
}

function closeArcade() {

  document
    .getElementById("arcadePanel")
    .classList.remove(
      "active"
    );
}


/* =========================================================
   LOCATION
========================================================= */

function travelTo(name) {

  locationName.textContent =
    name;

  closePanels();

  showToast(
    "Entering " + name + "..."
  );
}

function goHome() {

  travelTo(
    "My Amigurumi Home"
  );

  if (avatar) {

    avatar.position.set(
      0,
      1.2,
      12
    );

  }
}


/* =========================================================
   DAY / NIGHT
========================================================= */

function toggleDayNight() {

  isNight =
    !isNight;

  if (isNight) {

    scene.background =
      new THREE.Color(
        0x17243b
      );

    showToast(
      "STRAVE night mode 🌙"
    );

  } else {

    scene.background =
      new THREE.Color(
        0xdde9dc
      );

    showToast(
      "STRAVE day mode ☀️"
    );

  }
}


/* =========================================================
   XP
========================================================= */

function addXP(amount) {

  xp += amount;

  level =
    Math.floor(
      xp / 500
    ) + 1;

  updateXP();

  showToast(
    "+" + amount + " XP ✨"
  );
}

function updateXP() {

  const progress =
    (xp % 500) / 500 * 100;

  document
    .getElementById("xpFill")
    .style.width =
    progress + "%";

  document
    .getElementById("xpText")
    .textContent =
    xp + " XP";

  document
    .getElementById("levelText")
    .textContent =
    "Level " + level;

  document
    .getElementById("avatarLevel")
    .textContent =
    "Level " + level;
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2200
    );
}


/* =========================================================
   STRAVE AI
========================================================= */

function askAI() {

  const input =
    document.getElementById(
      "aiInput"
    );

  const text =
    input.value.trim();

  if (!text) return;

  const chat =
    document.getElementById(
      "aiChat"
    );

  const userMessage =
    document.createElement(
      "div"
    );

  userMessage.className =
    "user-message";

  userMessage.textContent =
    text;

  chat.appendChild(
    userMessage
  );

  input.value = "";

  setTimeout(
    () => {

      const reply =
        document.createElement(
          "div"
        );

      reply.className =
        "ai-message";

      const lower =
        text.toLowerCase();

      if (
        lower.includes(
          "content"
        )
      ) {

        reply.textContent =
          "Let's build a content idea around your audience, emotion and current goal. Real STRAVE AI will eventually connect to a secure AI backend.";

      } else if (
        lower.includes(
          "growth"
        )
      ) {

        reply.textContent =
          "Growth starts with understanding your audience, creating consistent value and improving based on analytics.";

      } else if (
        lower.includes(
          "business"
        )
      ) {

        reply.textContent =
          "STRAVE Business can eventually help with strategy, networking, collaborations and business development.";

      } else {

        reply.textContent =
          "I'm your STRAVE AI prototype. Connect me to a secure backend to unlock real AI conversations.";

      }

      chat.appendChild(
        reply
      );

      chat.scrollTop =
        chat.scrollHeight;

    },
    600
  );
}


/* =========================================================
   ARCADE GAME SYSTEM
========================================================= */

let gameTimer = null;
let gameScore = 0;


/* =========================================================
   START GAME
========================================================= */

function startGame(game) {

  document
    .getElementById("arcadeHome")
    .style.display = "none";

  const screen =
    document.getElementById(
      "gameScreen"
    );

  screen.innerHTML = "";

  clearInterval(
    gameTimer
  );

  gameScore = 0;

  if (game === "racing")
    startRacing(screen);

  if (game === "treasure")
    startTreasure(screen);

  if (game === "trivia")
    startTrivia(screen);

  if (game === "obstacle")
    startObstacle(screen);

  if (game === "fashion")
    startFashion(screen);
}


/* =========================================================
   BACK TO ARCADE
========================================================= */

function backToArcade() {

  clearInterval(
    gameTimer
  );

  document
    .getElementById("gameScreen")
    .innerHTML = "";

  document
    .getElementById("arcadeHome")
    .style.display =
    "block";
}


/* =========================================================
   RACING
========================================================= */

function startRacing(screen) {

  screen.innerHTML = `
    <div class="game-header">
      <strong>🏎️ Amigurumi Racing</strong>
      <span id="raceScore">Score: 0</span>
      <button class="back-game" onclick="backToArcade()">Back</button>
    </div>

    <div class="game-area" id="raceArea">

      <div class="race-road"></div>

      <div class="player-car" id="playerCar">
        🏎️
      </div>

    </div>

    <p style="margin-top:10px;opacity:.6;">
      Use ← → keys or tap the left/right side of the road.
    </p>
  `;

  const area =
    document.getElementById(
      "raceArea"
    );

  const player =
    document.getElementById(
      "playerCar"
    );

  let lane = 1;

  const lanes = [
    30,
    50,
    70
  ];

  function move(direction) {

    lane += direction;

    lane =
      Math.max(
        0,
        Math.min(
          2,
          lane
        )
      );

    player.style.left =
      lanes[lane] + "%";

  }

  function keyHandler(e) {

    if (
      e.key === "ArrowLeft"
    )
      move(-1);

    if (
      e.key === "ArrowRight"
    )
      move(1);

  }

  document.addEventListener(
    "keydown",
    keyHandler
  );

  area.addEventListener(
    "click",
    e => {

      const rect =
        area.getBoundingClientRect();

      if (
        e.clientX <
        rect.left +
        rect.width / 2
      )
        move(-1);
      else
        move(1);

    }
  );

  let score = 0;

  gameTimer =
    setInterval(
      () => {

        score += 10;

        document
          .getElementById(
            "raceScore"
          )
          .textContent =
          "Score: " + score;

        const obstacle =
          document.createElement(
            "div"
          );

        obstacle.className =
          "race-obstacle";

        obstacle.textContent =
          "🚧";

        obstacle.style.left =
          lanes[
            Math.floor(
              Math.random() * 3
            )
          ] + "%";

        area.appendChild(
          obstacle
        );

        let y = -50;

        const interval =
          setInterval(
            () => {

              y += 5;

              obstacle.style.top =
                y + "px";

              if (y > 430) {

                obstacle.remove();

                clearInterval(
                  interval
                );

              }

            },
            40
          );

      },
      1000
    );

  setTimeout(
    () => {

      clearInterval(
        gameTimer
      );

      document.removeEventListener(
        "keydown",
        keyHandler
      );

      addXP(
        100
      );

      showToast(
        "Race complete! 🏁 +100 XP"
      );

    },
    15000
  );
}


/* =========================================================
   TREASURE HUNT
========================================================= */

function startTreasure(screen) {

  screen.innerHTML = `
    <div class="game-header">
      <strong>💎 Treasure Hunt</strong>
      <span id="treasureScore">0 / 5</span>
      <button class="back-game" onclick="backToArcade()">Back</button>
    </div>

    <div class="game-area" id="treasureArea"></div>

    <p style="margin-top:10px;opacity:.6;">
      Find all five hidden treasures before time runs out.
    </p>
  `;

  const area =
    document.getElementById(
      "treasureArea"
    );

  let found = 0;

  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const treasure =
      document.createElement(
        "button"
      );

    treasure.className =
      "treasure";

    treasure.textContent =
      "💎";

    treasure.style.left =
      Math.random() * 85 + "%";

    treasure.style.top =
      Math.random() * 80 + "%";

    treasure.onclick =
      () => {

        if (
          treasure.dataset.found
        )
          return;

        treasure.dataset.found =
          "true";

        treasure.style.opacity =
          "0";

        found++;

        document
          .getElementById(
            "treasureScore"
          )
          .textContent =
          found + " / 5";

        if (
          found === 5
        ) {

          clearInterval(
            gameTimer
          );

          addXP(
            150
          );

          showToast(
            "All treasures found! 💎 +150 XP"
          );

        }

      };

    area.appendChild(
      treasure
    );
  }

  let time = 30;

  gameTimer =
    setInterval(
      () => {

        time--;

        if (
          time <= 0
        ) {

          clearInterval(
            gameTimer
          );

          showToast(
            "Time's up! 🔎"
          );

        }

      },
      1000
    );
}


/* =========================================================
   TRIVIA
========================================================= */

function startTrivia(screen) {

  const questions = [

    {
      q: "What does STRAVE represent?",
      options: [
        "A social digital world",
        "Only a game",
        "Only a shop",
        "Only a map"
      ],
      answer: 0
    },

    {
      q: "Where do creators build their creator life?",
      options: [
        "Creator District",
        "Beach",
        "Forest",
        "Garage"
      ],
      answer: 0
    },

    {
      q: "Which place belongs to STRAVE games?",
      options: [
        "STRAVE Arcade",
        "Business District",
        "AI Lab",
        "Home"
      ],
      answer: 0
    },

    {
      q: "What can users customize?",
      options: [
        "Avatar",
        "Nothing",
        "Only username",
        "Only map"
      ],
      answer: 0
    },

    {
      q: "What helps users progress?",
      options: [
        "XP and achievements",
        "Nothing",
        "Ads only",
        "Random points"
      ],
      answer: 0
    }

  ];

  let current = 0;
  let score = 0;

  function renderQuestion() {

    const q =
      questions[current];

    screen.innerHTML = `
      <div class="game-header">
        <strong>🧠 STRAVE Trivia</strong>
        <span>${current + 1} / ${questions.length}</span>
        <button class="back-game" onclick="backToArcade()">Back</button>
      </div>

      <div class="game-area trivia-box">

        <div class="trivia-question">
          ${q.q}
        </div>

        ${q.options.map(
          (option,index) =>
            `
              <button
                class="trivia-option"
                onclick="answerTrivia(${index})"
              >
                ${option}
              </button>
            `
        ).join("")}

      </div>
    `;

  }

  window.answerTrivia =
    function(index) {

      if (
        index ===
        questions[current].answer
      ) {

        score++;

        showToast(
          "Correct! ✨"
        );

      } else {

        showToast(
          "Not quite!"
        );

      }

      current++;

      if (
        current >=
        questions.length
      ) {

        addXP(
          score * 20
        );

        screen.innerHTML = `
          <div class="game-area trivia-box">

            <h2>Trivia Complete 🎉</h2>

            <p style="margin-top:10px;">
              Your score:
              <strong>
                ${score}/${questions.length}
              </strong>
            </p>

            <button
              class="primary-btn"
              onclick="backToArcade()"
            >
              Back to Arcade
            </button>

          </div>
        `;

        return;
      }

      renderQuestion();

    };

  renderQuestion();
}


/* =========================================================
   OBSTACLE RUN
========================================================= */

function startObstacle(screen) {

  screen.innerHTML = `
    <div class="game-header">
      <strong>🏃‍♀️ Obstacle Run</strong>
      <span id="runScore">0</span>
      <button class="back-game" onclick="backToArcade()">Back</button>
    </div>

    <div class="game-area" id="runnerArea">

      <div class="runner-world">

        <div
          class="runner"
          id="runner"
        >
          🧶
        </div>

        <div class="runner-ground"></div>

      </div>

    </div>

    <p style="margin-top:10px;opacity:.6;">
      Tap / press Space to jump.
    </p>
  `;

  const runner =
    document.getElementById(
      "runner"
    );

  const area =
    document.getElementById(
      "runnerArea"
    );

  let jumping = false;
  let score = 0;

  function jump() {

    if (jumping)
      return;

    jumping = true;

    runner.style.bottom =
      "150px";

    setTimeout(
      () => {

        runner.style.bottom =
          "45px";

        jumping = false;

      },
      600
    );

  }

  document.addEventListener(
    "keydown",
    e => {

      if (
        e.code ===
        "Space"
      )
        jump();

    }
  );

  area.addEventListener(
    "click",
    jump
  );

  gameTimer =
    setInterval(
      () => {

        score++;

        document
          .getElementById(
            "runScore"
          )
          .textContent =
          score;

        const obstacle =
          document.createElement(
            "div"
          );

        obstacle.className =
          "run-obstacle";

        obstacle.textContent =
          "🪨";

        area.appendChild(
          obstacle
        );

        let x = -60;

        const move =
          setInterval(
            () => {

              x += 6;

              obstacle.style.right =
                x + "px";

              if (
                x > 900
              ) {

                obstacle.remove();

                clearInterval(
                  move
                );

              }

            },
            40
          );

      },
      1300
    );

  setTimeout(
    () => {

      clearInterval(
        gameTimer
      );

      addXP(
        120
      );

      showToast(
        "Run complete! 🏃‍♀️ +120 XP"
      );

    },
    15000
  );
}


/* =========================================================
   AVATAR FASHION
========================================================= */

function startFashion(screen) {

  screen.innerHTML = `
    <div class="game-header">

      <strong>👗 Avatar Challenge</strong>

      <button
        class="back-game"
        onclick="backToArcade()"
      >
        Back
      </button>

    </div>

    <div class="game-area">

      <div
        class="fashion-avatar"
        id="fashionAvatar"
      >
        🧶
      </div>

      <div class="fashion-options">

        <button onclick="chooseFashion('👒')">
          👒
        </button>

        <button onclick="chooseFashion('🎀')">
          🎀
        </button>

        <button onclick="chooseFashion('🕶️')">
          🕶️
        </button>

        <button onclick="chooseFashion('🧥')">
          🧥
        </button>

        <button onclick="chooseFashion('👗')">
          👗
        </button>

        <button onclick="chooseFashion('🧣')">
          🧣
        </button>

      </div>

    </div>
  `;

  window.chooseFashion =
    function(item) {

      document
        .getElementById(
          "fashionAvatar"
        )
        .textContent =
        item;

      addXP(
        20
      );

      showToast(
        "New avatar style unlocked! ✨"
      );

    };
}
