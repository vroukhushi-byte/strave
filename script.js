/* =========================================================
   STRAVE WORLD
   BEAUTIFUL 3D AMIGURUMI WORLD
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
let clouds = [];

let dragging = false;
let previousX = 0;
let previousY = 0;

let gameTimer = null;
let gameScore = 0;

const locationName = document.getElementById("locationName");


/* =========================================================
   START
   ========================================================= */

window.addEventListener("load", () => {

    initWorld();

    setTimeout(() => {

        const loading = document.getElementById("loading");

        if (loading) {
            loading.style.opacity = "0";

            setTimeout(() => {
                loading.style.display = "none";
            }, 600);
        }

    }, 1200);

});


/* =========================================================
   INITIALIZE WORLD
   ========================================================= */

function initWorld() {

    scene = new THREE.Scene();

    /* beautiful sky */
    scene.background = new THREE.Color(0xbfd9d1);

    /* atmospheric depth */
    scene.fog = new THREE.Fog(
        0xbfd9d1,
        55,
        150
    );


    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );

    camera.position.set(
        25,
        20,
        32
    );

    camera.lookAt(
        0,
        0,
        0
    );


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

    renderer.outputEncoding =
        THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

    renderer.setClearColor(
        0xbfd9d1,
        1
    );


    document
        .getElementById("world")
        .appendChild(renderer.domElement);


    /* =====================================================
       LIGHTING
       ===================================================== */

    const ambient =
        new THREE.HemisphereLight(
            0xfff4df,
            0x55715f,
            1.05
        );

    scene.add(ambient);


    const sun =
        new THREE.DirectionalLight(
            0xfff1d2,
            1.15
        );

    sun.position.set(
        30,
        45,
        20
    );

    sun.castShadow = true;

    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;

    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 150;

    sun.shadow.camera.left = -70;
    sun.shadow.camera.right = 70;
    sun.shadow.camera.top = 70;
    sun.shadow.camera.bottom = -70;

    scene.add(sun);


    const softLight =
        new THREE.DirectionalLight(
            0xdcecff,
            0.25
        );

    softLight.position.set(
        -30,
        20,
        -20
    );

    scene.add(softLight);


    worldGroup =
        new THREE.Group();

    scene.add(worldGroup);


    /* =====================================================
       WORLD
       ===================================================== */

    createGround();
    createPaths();
    createRoad();
    createPlaza();

    createHome();
    createBuildings();

    createCreatorDistrict();
    createBusinessDistrict();
    createAILab();
    createArcadeBuilding();

    createTrees();
    createForest();
    createFlowers();

    createLake();
    createBeach();
    createMountains();

    createClouds();
    createStars();

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
            180,
            180,
            1,
            1
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x8eae7d,
            roughness: 1
        });

    const ground =
        new THREE.Mesh(
            geometry,
            material
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.position.y = 0;

    ground.receiveShadow = true;

    worldGroup.add(ground);
}


/* =========================================================
   PATHS
   ========================================================= */

function createPaths() {

    const paths = [
        {
            x: 0,
            z: 0,
            w: 7,
            d: 110
        },
        {
            x: 0,
            z: 0,
            w: 110,
            d: 7
        }
    ];

    paths.forEach(path => {

        const geometry =
            new THREE.BoxGeometry(
                path.w,
                0.08,
                path.d
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0xd8c5a7,
                roughness: 0.95
            });

        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        mesh.position.set(
            path.x,
            0.04,
            path.z
        );

        mesh.receiveShadow = true;

        worldGroup.add(mesh);
    });
}


/* =========================================================
   ROAD
   ========================================================= */

function createRoad() {

    const geometry =
        new THREE.PlaneGeometry(
            8,
            110
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x595a5c,
            roughness: 0.9
        });

    const road =
        new THREE.Mesh(
            geometry,
            material
        );

    road.rotation.x =
        -Math.PI / 2;

    road.position.y = 0.08;

    road.receiveShadow = true;

    worldGroup.add(road);


    for (
        let z = -50;
        z <= 50;
        z += 7
    ) {

        const line =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.3,
                    0.06,
                    3
                ),
                new THREE.MeshBasicMaterial({
                    color: 0xffe8a8
                })
            );

        line.position.set(
            0,
            0.13,
            z
        );

        worldGroup.add(line);
    }
}


/* =========================================================
   PLAZA
   ========================================================= */

function createPlaza() {

    const plaza =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                12,
                12,
                0.25,
                48
            ),
            new THREE.MeshStandardMaterial({
                color: 0xd9c7b2,
                roughness: 0.9
            })
        );

    plaza.position.set(
        0,
        0.12,
        -2
    );

    plaza.receiveShadow = true;

    worldGroup.add(plaza);


    /* center fountain */

    const fountain =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                3,
                3,
                0.35,
                32
            ),
            new THREE.MeshStandardMaterial({
                color: 0x88bdc5,
                roughness: 0.2,
                metalness: 0.05
            })
        );

    fountain.position.set(
        0,
        0.4,
        -2
    );

    worldGroup.add(fountain);


    const water =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                2.3,
                2.3,
                0.08,
                32
            ),
            new THREE.MeshStandardMaterial({
                color: 0x83c6d3,
                roughness: 0.15
            })
        );

    water.position.set(
        0,
        0.62,
        -2
    );

    worldGroup.add(water);
}


/* =========================================================
   BUILDING HELPER
   ========================================================= */

function makeBuilding(
    x,
    z,
    width,
    height,
    depth,
    color,
    roofColor,
    label
) {

    const group =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.85
            })
        );

    body.position.y =
        height / 2;

    body.castShadow = true;
    body.receiveShadow = true;

    group.add(body);


    /* roof */

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                Math.max(width, depth) * 0.72,
                2.5,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: roofColor,
                roughness: 0.85
            })
        );

    roof.position.y =
        height + 1.15;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    group.add(roof);


    /* windows */

    const windowMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9fcbd1,
            roughness: 0.25,
            metalness: 0.1
        });


    const rows =
        Math.max(
            1,
            Math.floor(height / 3)
        );


    for (
        let row = 0;
        row < rows;
        row++
    ) {

        const y =
            1.8 +
            row * 2.5;


        for (
            let side = -1;
            side <= 1;
            side += 2
        ) {

            const window =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        width * 0.16,
                        0.8,
                        0.08
                    ),
                    windowMaterial
                );

            window.position.set(
                side * width * 0.23,
                y,
                depth / 2 + 0.04
            );

            group.add(window);
        }
    }


    group.position.set(
        x,
        0,
        z
    );


    worldGroup.add(group);

    return group;
}


/* =========================================================
   HOME
   ========================================================= */

function createHome() {

    makeBuilding(
        10,
        12,
        8,
        5,
        7,
        0xe7c3a9,
        0x9b6254,
        "HOME"
    );


    /* garden */

    const garden =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                11,
                0.12,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x729965
            })
        );

    garden.position.set(
        10,
        0.07,
        19
    );

    worldGroup.add(garden);


    /* mailbox */

    const post =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                1.3,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0x68483c
            })
        );

    post.position.set(
        6,
        0.65,
        20
    );

    worldGroup.add(post);


    const box =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.7,
                0.45,
                0.55
            ),
            new THREE.MeshStandardMaterial({
                color: 0xd7a65e
            })
        );

    box.position.set(
        6,
        1.25,
        20
    );

    worldGroup.add(box);
}


/* =========================================================
   MAIN BUILDINGS
   ========================================================= */

function createBuildings() {

    makeBuilding(
        -18,
        -17,
        8,
        10,
        8,
        0xd8b7a7,
        0x704c43
    );

    makeBuilding(
        18,
        -17,
        9,
        13,
        8,
        0xc6d8c4,
        0x637c63
    );

    makeBuilding(
        -19,
        15,
        9,
        8,
        8,
        0xe4d1aa,
        0x806047
    );

    makeBuilding(
        20,
        17,
        8,
        11,
        8,
        0xbdd1d5,
        0x5d777e
    );


    /* distant city */

    makeBuilding(
        -30,
        35,
        10,
        17,
        9,
        0xd3c5bc,
        0x6d5b55
    );

    makeBuilding(
        28,
        35,
        12,
        20,
        10,
        0xc4d4d0,
        0x617b79
    );
}


/* =========================================================
   CREATOR DISTRICT
   ========================================================= */

function createCreatorDistrict() {

    const building =
        makeBuilding(
            -16,
            5,
            10,
            6,
            8,
            0xe3b6c0,
            0x9b5f72
        );


    /* creator sign */

    const sign =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5,
                1.3,
                0.2
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf0cf7b
            })
        );

    sign.position.set(
        -16,
        6.5,
        0.9
    );

    worldGroup.add(sign);
}


/* =========================================================
   BUSINESS DISTRICT
   ========================================================= */

function createBusinessDistrict() {

    makeBuilding(
        17,
        5,
        11,
        15,
        9,
        0xc4ccd9,
        0x566277
    );


    /* glass tower */

    const tower =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                8,
                22,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x8fa8b7,
                transparent: true,
                opacity: 0.9,
                roughness: 0.25,
                metalness: 0.1
            })
        );

    tower.position.set(
        30,
        11,
        3
    );

    tower.castShadow = true;

    worldGroup.add(tower);
}


/* =========================================================
   AI LAB
   ========================================================= */

function createAILab() {

    const lab =
        makeBuilding(
            -30,
            5,
            10,
            7,
            9,
            0xb7c8df,
            0x5e7298
        );


    /* glowing core */

    const core =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                1.2,
                24,
                24
            ),
            new THREE.MeshStandardMaterial({
                color: 0xbde9ef,
                emissive: 0x5bbac7,
                emissiveIntensity: 1.5
            })
        );

    core.position.set(
        -30,
        4,
        0
    );

    worldGroup.add(core);
}


/* =========================================================
   ARCADE
   ========================================================= */

function createArcadeBuilding() {

    const arcade =
        makeBuilding(
            15,
            -5,
            11,
            6,
            8,
            0xd99cad,
            0x884f66
        );


    const sign =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                1.5,
                0.25
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf3d77e,
                emissive: 0x6b4a18,
                emissiveIntensity: 0.3
            })
        );

    sign.position.set(
        15,
        6.8,
        -1
    );

    worldGroup.add(sign);


    /* arcade pillars */

    [-4, 4].forEach(offset => {

        const pillar =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.35,
                    0.35,
                    4,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0xf1c56f
                })
            );

        pillar.position.set(
            15 + offset,
            2,
            -9
        );

        worldGroup.add(pillar);
    });
}


/* =========================================================
   TREES
   ========================================================= */

function createTree(
    x,
    z,
    scale = 1
) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.45 * scale,
                0.65 * scale,
                3 * scale,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0x76513d,
                roughness: 1
            })
        );

    trunk.position.y =
        1.5 * scale;

    trunk.castShadow = true;

    tree.add(trunk);


    const colors = [
        0x5d875e,
        0x6f9667,
        0x789f6b,
        0x507b58
    ];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const crown =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    (2.1 - i * 0.2) * scale,
                    16,
                    16
                ),
                new THREE.MeshStandardMaterial({
                    color:
                        colors[
                            i % colors.length
                        ],
                    roughness: 0.95
                })
            );

        crown.position.set(
            (i - 1) *
                0.8 *
                scale,
            (4.1 + i * 0.5) *
                scale,
            i % 2 === 0
                ? 0
                : 0.5
        );

        crown.castShadow = true;

        tree.add(crown);
    }


    tree.position.set(
        x,
        0,
        z
    );

    worldGroup.add(tree);
}


function createTrees() {

    const positions = [

        [-28,-27,1.2],
        [-20,-30,0.9],
        [25,-29,1.1],
        [31,-22,1.4],

        [-31,15,1.3],
        [31,13,1.1],

        [-30,25,1.4],
        [29,25,1.3],

        [-10,37,1.2],
        [0,42,1.5],
        [11,39,1.2],

        [-42,5,1.5],
        [42,5,1.5]
    ];


    positions.forEach(p => {

        createTree(
            p[0],
            p[1],
            p[2]
        );

    });
}


/* =========================================================
   FOREST
   ========================================================= */

function createForest() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const x =
            -45 +
            Math.random() * 90;

        const z =
            25 +
            Math.random() * 25;


        createTree(
            x,
            z,
            0.6 +
            Math.random() * 0.6
        );
    }
}


/* =========================================================
   FLOWERS
   ========================================================= */

function createFlowers() {

    const flowerColors = [
        0xf09aa8,
        0xf4c86b,
        0xc4a5dc,
        0xffffff
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const x =
            (Math.random() - 0.5) * 90;

        const z =
            (Math.random() - 0.5) * 85;


        const stem =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.035,
                    0.035,
                    0.5,
                    5
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x54784f
                })
            );

        stem.position.set(
            x,
            0.25,
            z
        );

        worldGroup.add(stem);


        const flower =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.16,
                    8,
                    8
                ),
                new THREE.MeshStandardMaterial({
                    color:
                        flowerColors[
                            Math.floor(
                                Math.random() *
                                flowerColors.length
                            )
                        ]
                })
            );

        flower.position.set(
            x,
            0.55,
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

    const lake =
        new THREE.Mesh(
            new THREE.CircleGeometry(
                13,
                48
            ),
            new THREE.MeshStandardMaterial({
                color: 0x76b8c8,
                roughness: 0.15,
                metalness: 0.05,
                transparent: true,
                opacity: 0.9
            })
        );

    lake.rotation.x =
        -Math.PI / 2;

    lake.position.set(
        -30,
        0.12,
        43
    );

    worldGroup.add(lake);


    /* little island */

    const island =
        new THREE.Mesh(
            new THREE.CircleGeometry(
                3,
                24
            ),
            new THREE.MeshStandardMaterial({
                color: 0x739b62
            })
        );

    island.rotation.x =
        -Math.PI / 2;

    island.position.set(
        -30,
        0.18,
        43
    );

    worldGroup.add(island);

    createTree(
        -30,
        43,
        0.7
    );
}


/* =========================================================
   BEACH
   ========================================================= */

function createBeach() {

    const sand =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                35,
                20
            ),
            new THREE.MeshStandardMaterial({
                color: 0xe8d3a4,
                roughness: 1
            })
        );

    sand.rotation.x =
        -Math.PI / 2;

    sand.position.set(
        32,
        0.05,
        43
    );

    worldGroup.add(sand);


    /* beach umbrellas */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const pole =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.08,
                    0.08,
                    2,
                    8
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x74523f
                })
            );

        pole.position.set(
            24 + i * 5,
            1,
            40 + (i % 2) * 5
        );

        worldGroup.add(pole);


        const umbrella =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    1.5,
                    0.8,
                    16
                ),
                new THREE.MeshStandardMaterial({
                    color:
                        i % 2 === 0
                            ? 0xe59ba4
                            : 0xf0c76d
                })
            );

        umbrella.position.set(
            24 + i * 5,
            2,
            40 + (i % 2) * 5
        );

        worldGroup.add(umbrella);
    }
}


/* =========================================================
   MOUNTAINS
   ========================================================= */

function createMountains() {

    const mountainColors = [
        0x7d9583,
        0x708878,
        0x8aa090
    ];


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const mountain =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    8 +
                    Math.random() * 5,
                    16 +
                    Math.random() * 8,
                    6
                ),
                new THREE.MeshStandardMaterial({
                    color:
                        mountainColors[
                            i % 3
                        ],
                    roughness: 1
                })
            );


        mountain.position.set(
            -42 +
            i * 12,
            8,
            60 +
            Math.random() * 8
        );

        mountain.rotation.y =
            Math.random();

        mountain.castShadow = true;

        worldGroup.add(mountain);
    }
}


/* =========================================================
   CLOUDS
   ========================================================= */

function createClouds() {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const cloud =
            new THREE.Group();


        for (
            let j = 0;
            j < 4;
            j++
        ) {

            const puff =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        1.4 +
                        Math.random() * 1.2,
                        12,
                        12
                    ),
                    new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        roughness: 1
                    })
                );

            puff.position.set(
                j * 1.7,
                Math.random() * 0.7,
                Math.random() * 0.8
            );

            cloud.add(puff);
        }


        cloud.position.set(
            -45 +
            Math.random() * 90,
            25 +
            Math.random() * 15,
            -50 +
            Math.random() * 60
        );

        cloud.scale.set(
            1.5,
            0.8,
            1
        );

        worldGroup.add(cloud);

        clouds.push(cloud);
    }
}


/* =========================================================
   NIGHT STARS
   ========================================================= */

function createStars() {

    const starMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        });


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const star =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.08,
                    6,
                    6
                ),
                starMaterial
            );

        star.position.set(
            -80 +
                Math.random() * 160,
            30 +
                Math.random() * 35,
            -80 +
                Math.random() * 160
        );

        star.visible = false;

        star.userData.isStar = true;

        worldGroup.add(star);
    }
}


/* =========================================================
   AMIGURUMI AVATAR
   ========================================================= */

function createAvatar() {

    avatar =
        new THREE.Group();


    /* body */

    const body =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                1.25,
                24,
                20
            ),
            new THREE.MeshStandardMaterial({
                color: 0xd88d91,
                roughness: 0.95
            })
        );

    body.scale.y = 1.25;

    body.castShadow = true;

    avatar.add(body);


    /* head */

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                1.5,
                28,
                24
            ),
            new THREE.MeshStandardMaterial({
                color: 0xe6b69c,
                roughness: 0.95
            })
        );

    head.position.y = 2.15;

    head.castShadow = true;

    avatar.add(head);


    /* hair */

    const hair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                1.55,
                28,
                20
            ),
            new THREE.MeshStandardMaterial({
                color: 0x5c392f,
                roughness: 1
            })
        );

    hair.position.y = 2.55;

    hair.scale.set(
        1,
        0.72,
        1
    );

    avatar.add(hair);


    /* eyes */

    [-0.43, 0.43].forEach(x => {

        const eye =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.13,
                    12,
                    12
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x2b1b18
                })
            );

        eye.position.set(
            x,
            2.15,
            1.38
        );

        avatar.add(eye);
    });


    /* cheeks */

    [-0.65, 0.65].forEach(x => {

        const cheek =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.14,
                    10,
                    10
                ),
                new THREE.MeshBasicMaterial({
                    color: 0xe58f91,
                    transparent: true,
                    opacity: 0.7
                })
            );

        cheek.position.set(
            x,
            1.85,
            1.28
        );

        avatar.add(cheek);
    });


    /* legs */

    [-0.45, 0.45].forEach(x => {

        const leg =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.4,
                    16,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x765a53,
                    roughness: 1
                })
            );

        leg.scale.y = 1.4;

        leg.position.set(
            x,
            -1.25,
            0
        );

        leg.castShadow = true;

        avatar.add(leg);
    });


    avatar.position.set(
        0,
        2.1,
        12
    );


    worldGroup.add(avatar);
}


/* =========================================================
   CARS
   ========================================================= */

function createCars() {

    const colors = [
        0xd98f92,
        0x8ba9c2,
        0xe2b65f,
        0x82a17d
    ];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const car =
            new THREE.Group();


        const body =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    1.8,
                    0.75,
                    3
                ),
                new THREE.MeshStandardMaterial({
                    color:
                        colors[i % 4],
                    roughness: 0.75
                })
            );

        body.castShadow = true;

        car.add(body);


        const roof =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    1.35,
                    0.55,
                    1.35
                ),
                new THREE.MeshStandardMaterial({
                    color: 0xf1ddd1
                })
            );

        roof.position.y = 0.6;

        car.add(roof);


        car.position.set(
            i % 2 === 0
                ? -1.7
                : 1.7,
            0.55,
            -48 + i * 22
        );


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


    const time =
        Date.now() * 0.001;


    /* cars */

    cars.forEach(car => {

        car.position.z +=
            0.055;

        if (
            car.position.z > 55
        ) {
            car.position.z = -55;
        }
    });


    /* avatar breathing */

    if (avatar) {

        avatar.position.y =
            2.1 +
            Math.sin(time * 2) *
            0.05;

        avatar.rotation.y =
            Math.sin(time * 0.5) *
            0.03;
    }


    /* flowers */

    flowers.forEach(
        (flower, index) => {

            flower.rotation.y +=
                0.01;

            flower.position.y =
                0.55 +
                Math.sin(
                    time * 2 +
                    index
                ) *
                0.03;
        }
    );


    /* clouds */

    clouds.forEach(
        cloud => {

            cloud.position.x +=
                0.008;

            if (
                cloud.position.x > 60
            ) {
                cloud.position.x = -60;
            }
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

function addControls() {

    const canvas =
        renderer.domElement;


    canvas.addEventListener(
        "pointerdown",
        e => {

            dragging = true;

            previousX =
                e.clientX;

            previousY =
                e.clientY;
        }
    );


    canvas.addEventListener(
        "pointerup",
        () => {
            dragging = false;
        }
    );


    canvas.addEventListener(
        "pointercancel",
        () => {
            dragging = false;
        }
    );


    canvas.addEventListener(
        "pointermove",
        e => {

            if (!dragging)
                return;


            const dx =
                e.clientX -
                previousX;

            const dy =
                e.clientY -
                previousY;


            camera.position.x -=
                dx * 0.035;

            camera.position.y +=
                dy * 0.025;


            camera.position.y =
                Math.max(
                    8,
                    Math.min(
                        45,
                        camera.position.y
                    )
                );


            camera.lookAt(
                0,
                0,
                0
            );


            previousX =
                e.clientX;

            previousY =
                e.clientY;
        }
    );


    canvas.addEventListener(
        "wheel",
        e => {

            camera.position.z +=
                e.deltaY * 0.025;

            camera.position.z =
                Math.max(
                    14,
                    Math.min(
                        65,
                        camera.position.z
                    )
                );

            camera.lookAt(
                0,
                0,
                0
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

    if (!panel)
        return;

    panel.classList.add(
        "active"
    );
}


function closePanels() {

    document
        .querySelectorAll(
            ".panel"
        )
        .forEach(panel => {

            panel.classList.remove(
                "active"
            );
        });
}


/* =========================================================
   ARCADE
   ========================================================= */

function openArcade() {

    closePanels();

    const arcade =
        document.getElementById(
            "arcadePanel"
        );

    arcade.classList.add(
        "active"
    );


    document.getElementById(
        "arcadeHome"
    ).style.display =
        "block";


    document.getElementById(
        "gameScreen"
    ).innerHTML = "";


    travelTo(
        "STRAVE Arcade"
    );
}


function closeArcade() {

    document
        .getElementById(
            "arcadePanel"
        )
        .classList.remove(
            "active"
        );

    clearInterval(
        gameTimer
    );
}


/* =========================================================
   LOCATION
   ========================================================= */

function travelTo(name) {

    if (locationName) {

        locationName.textContent =
            name;
    }


    closePanels();

    showToast(
        "Entering " +
        name +
        "..."
    );
}


function goHome() {

    travelTo(
        "My Amigurumi Home"
    );


    if (avatar) {

        avatar.position.set(
            0,
            2.1,
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


    const stars =
        worldGroup.children
            .filter(
                child =>
                    child.userData &&
                    child.userData.isStar
            );


    if (isNight) {

        scene.background =
            new THREE.Color(
                0x17263d
            );

        scene.fog.color =
            new THREE.Color(
                0x17263d
            );


        stars.forEach(
            star => {
                star.visible = true;
            }
        );


        showToast(
            "STRAVE night mode 🌙"
        );

    } else {

        scene.background =
            new THREE.Color(
                0xbfd9d1
            );

        scene.fog.color =
            new THREE.Color(
                0xbfd9d1
            );


        stars.forEach(
            star => {
                star.visible = false;
            }
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
        "+" +
        amount +
        " XP ✨"
    );
}


function updateXP() {

    const progress =
        (xp % 500) /
        500 *
        100;


    const fill =
        document.getElementById(
            "xpFill"
        );

    const xpText =
        document.getElementById(
            "xpText"
        );

    const levelText =
        document.getElementById(
            "levelText"
        );

    const avatarLevel =
        document.getElementById(
            "avatarLevel"
        );


    if (fill)
        fill.style.width =
            progress + "%";

    if (xpText)
        xpText.textContent =
            xp + " XP";

    if (levelText)
        levelText.textContent =
            "Level " +
            level;

    if (avatarLevel)
        avatarLevel.textContent =
            "Level " +
            level;
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


    if (!toast)
        return;


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
   STRAVE AI PROTOTYPE
   ========================================================= */

function askAI() {

    const input =
        document.getElementById(
            "aiInput"
        );


    if (!input)
        return;


    const text =
        input.value.trim();


    if (!text)
        return;


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
                    "Let's build a content idea around your audience, emotion and current goal. Real STRAVE AI can later connect to a secure AI backend.";

            } else if (
                lower.includes(
                    "growth"
                )
            ) {

                reply.textContent =
                    "Growth starts with understanding your audience, creating consistent value and improving through analytics.";

            } else if (
                lower.includes(
                    "business"
                )
            ) {

                reply.textContent =
                    "STRAVE Business can help with strategy, networking, collaborations and business development once the backend is connected.";

            } else {

                reply.textContent =
                    "I'm your STRAVE AI prototype. A secure backend connection is required for real AI conversations.";
            }


            chat.appendChild(
                reply
            );


            chat.scrollTop =
                chat.scrollHeight;

        },
        500
    );
}


/* =========================================================
   ARCADE GAME SYSTEM
   ========================================================= */

function startGame(game) {

    document.getElementById(
        "arcadeHome"
    ).style.display =
        "none";


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


function backToArcade() {

    clearInterval(
        gameTimer
    );


    document.getElementById(
        "gameScreen"
    ).innerHTML = "";


    document.getElementById(
        "arcadeHome"
    ).style.display =
        "block";
}


/* =========================================================
   RACING
   ========================================================= */

function startRacing(screen) {

    screen.innerHTML = `

        <div class="game-header">

            <strong>
                🏎️ Amigurumi Racing
            </strong>

            <span id="raceScore">
                Score: 0
            </span>

            <button
                class="back-game"
                onclick="backToArcade()"
            >
                Back
            </button>

        </div>


        <div
            class="game-area"
            id="raceArea"
        >

            <div class="race-road"></div>

            <div
                class="player-car"
                id="playerCar"
            >
                🏎️
            </div>

        </div>


        <p style="margin-top:10px;opacity:.6;">
            Tap left/right side to move.
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
            lanes[lane] +
            "%";
    }


    function keyHandler(e) {

        if (
            e.key ===
            "ArrowLeft"
        )
            move(-1);

        if (
            e.key ===
            "ArrowRight"
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
            ) {

                move(-1);

            } else {

                move(1);
            }
        }
    );


    let score = 0;


    gameTimer =
        setInterval(
            () => {

                score += 10;


                document.getElementById(
                    "raceScore"
                ).textContent =
                    "Score: " +
                    score;


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
                            Math.random() *
                            3
                        )
                    ] +
                    "%";


                area.appendChild(
                    obstacle
                );


                let y = -50;


                const movement =
                    setInterval(
                        () => {

                            y += 5;


                            obstacle.style.top =
                                y +
                                "px";


                            if (
                                y >
                                430
                            ) {

                                obstacle.remove();

                                clearInterval(
                                    movement
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


            addXP(100);


            showToast(
                "Race complete! 🏁 +100 XP"
            );

        },
        15000
    );
}


/* =========================================================
   TREASURE
   ========================================================= */

function startTreasure(screen) {

    screen.innerHTML = `

        <div class="game-header">

            <strong>
                💎 Treasure Hunt
            </strong>

            <span id="treasureScore">
                0 / 5
            </span>

            <button
                class="back-game"
                onclick="backToArcade()"
            >
                Back
            </button>

        </div>


        <div
            class="game-area"
            id="treasureArea"
        ></div>


        <p style="margin-top:10px;opacity:.6;">
            Find all five hidden treasures.
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
            10 +
            Math.random() *
            80 +
            "%";


        treasure.style.top =
            10 +
            Math.random() *
            75 +
            "%";


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


                document.getElementById(
                    "treasureScore"
                ).textContent =
                    found +
                    " / 5";


                if (
                    found === 5
                ) {

                    clearInterval(
                        gameTimer
                    );


                    addXP(150);


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
            q:
                "What does STRAVE represent?",

            options: [
                "A social digital world",
                "Only a game",
                "Only a shop",
                "Only a map"
            ],

            answer: 0
        },

        {
            q:
                "Where do creators build their creator life?",

            options: [
                "Creator District",
                "Beach",
                "Forest",
                "Garage"
            ],

            answer: 0
        },

        {
            q:
                "Which place belongs to STRAVE games?",

            options: [
                "STRAVE Arcade",
                "Business District",
                "AI Lab",
                "Home"
            ],

            answer: 0
        },

        {
            q:
                "What can users customize?",

            options: [
                "Avatar",
                "Nothing",
                "Only username",
                "Only map"
            ],

            answer: 0
        },

        {
            q:
                "What helps users progress?",

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

                <strong>
                    🧠 STRAVE Trivia
                </strong>

                <span>
                    ${current + 1}
                    /
                    ${questions.length}
                </span>

                <button
                    class="back-game"
                    onclick="backToArcade()"
                >
                    Back
                </button>

            </div>


            <div
                class="game-area trivia-box"
            >

                <div class="trivia-question">
                    ${q.q}
                </div>

                ${q.options
                    .map(
                        (option, index) =>
                            `

                            <button
                                class="trivia-option"
                                onclick="answerTrivia(${index})"
                            >
                                ${option}
                            </button>

                            `
                    )
                    .join("")}

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

                    <div
                        class="game-area trivia-box"
                    >

                        <h2>
                            Trivia Complete 🎉
                        </h2>

                        <p
                            style="margin-top:10px;"
                        >
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

            <strong>
                🏃‍♀️ Obstacle Run
            </strong>

            <span id="runScore">
                0
            </span>

            <button
                class="back-game"
                onclick="backToArcade()"
            >
                Back
            </button>

        </div>


        <div
            class="game-area"
            id="runnerArea"
        >

            <div class="runner-world">

                <div
                    class="runner"
                    id="runner"
                >
                    🧶
                </div>

                <div
                    class="runner-ground"
                ></div>

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


    function keyHandler(e) {

        if (
            e.code ===
            "Space"
        ) {

            e.preventDefault();

            jump();
        }
    }


    document.addEventListener(
        "keydown",
        keyHandler
    );


    area.addEventListener(
        "click",
        jump
    );


    gameTimer =
        setInterval(
            () => {

                score++;


                document.getElementById(
                    "runScore"
                ).textContent =
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


                const movement =
                    setInterval(
                        () => {

                            x += 6;


                            obstacle.style.right =
                                x +
                                "px";


                            if (
                                x >
                                900
                            ) {

                                obstacle.remove();

                                clearInterval(
                                    movement
                                );
                            }

                        },
                        40
                    );

            },
            1200
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


            addXP(120);


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

    let selected =
        "🧶";


    screen.innerHTML = `

        <div class="game-header">

            <strong>
                👗 Avatar Challenge
            </strong>

            <span>
                Style Score
            </span>

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


            <div
                class="fashion-options"
            >

                <button
                    onclick="chooseFashion('👗')"
                >
                    👗
                </button>

                <button
                    onclick="chooseFashion('🧥')"
                >
                    🧥
                </button>

                <button
                    onclick="chooseFashion('👑')"
                >
                    👑
                </button>

                <button
                    onclick="chooseFashion('🎀')"
                >
                    🎀
                </button>

                <button
                    onclick="chooseFashion('🕶️')"
                >
                    🕶️
                </button>

                <button
                    onclick="chooseFashion('💎')"
                >
                    💎
                </button>

            </div>


            <button
                class="primary-btn"
                onclick="finishFashion()"
            >
                ✨ Finish Look
            </button>

        </div>
    `;


    window.chooseFashion =
        function(item) {

            selected =
                item;


            document.getElementById(
                "fashionAvatar"
            ).textContent =
                "🧶 " +
                item;
        };


    window.finishFashion =
        function() {

            addXP(100);


            showToast(
                "Amazing look! 👗 +100 XP"
            );
        };
}