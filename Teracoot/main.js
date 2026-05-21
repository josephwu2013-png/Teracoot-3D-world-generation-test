import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const WORLD_SIZE = 1120;
const GRID_RESOLUTION = 156;
const GRID_WIDTH = GRID_RESOLUTION + 1;
const HALF_WORLD = WORLD_SIZE / 2;
const CELL_SIZE = WORLD_SIZE / GRID_RESOLUTION;
const WORLD_FLOOR = -92;
const WATER_LEVEL = -7;

const EYE_HEIGHT = 7.1;
const PLAYER_RADIUS = 2.25;
const MAX_STEP_HEIGHT = 1.35;
const MAX_GROUND_SNAP_DOWN = 2.2;
const MOVE_SUBSTEP = 0.85;
const SMALL_ROCK_JUMP_CLEARANCE = 0.45;
const JUMPABLE_ROCK_HEIGHT = 4.2;

const WALK_SPEED = 24;
const SPRINT_MULTIPLIER = 1.7;
const GROUND_ACCEL = 92;
const AIR_ACCEL = 30;
const GROUND_FRICTION = 15;
const AIR_DRAG = 1.6;
const JUMP_SPEED = 20.8;
const GRAVITY = 31;
const POINTER_SENSITIVITY = 0.0021;
const FLY_SPEED = 34;
const WORLD_EDGE_MARGIN = CELL_SIZE * 1.5;
const WATER_SWELL_AMPLITUDE = 1.35;
const WATER_CURRENT_STRENGTH = 6.2;
const WATER_FILL_ELEVATION_TOLERANCE = 0.35;
const WATER_BUOYANCY = 26;
const WATER_MOVE_FACTOR = 0.58;
const WATER_HORIZONTAL_DRAG = 6.4;
const WATER_VERTICAL_DRAG = 2.8;
const WATER_SWIM_UP_ACCEL = 24;
const WATER_DIVE_ACCEL = 14;
const WATER_FLOAT_OFFSET = EYE_HEIGHT * 0.34;
const WATER_MIN_FLOAT_DEPTH = 2.4;
const WATER_STEP_RIPPLE_INTERVAL = 0.22;
const WATER_RIPPLE_LIFETIME = 2.4;
const MAX_WATER_RIPPLES = 8;
const PLANK_SIZE = 4.4;
const PLANK_THICKNESS = 0.8;
const PLANK_BUILD_RANGE = 13.5;
const STONE_SIZE = PLANK_SIZE;
const STONE_BUILD_RANGE = PLANK_BUILD_RANGE;
const STONE_LAYER_DEPTH = 3.6;
const STONE_REWARD_VOLUME = 10;
const GRASS_BLADE_COUNT = 22;
const GRASS_PHYSICS_RADIUS = STONE_SIZE * 1.6;
const SAND_GRAIN_COUNT = 54;
const SAND_PHYSICS_RADIUS = STONE_SIZE * 1.45;
const PLAYER_MAX_HEALTH = 100;
const STATION_USE_RADIUS = 18;
const FALL_DAMAGE_SAFE_SPEED = 24;
const FALL_DAMAGE_SPEED_SCALE = 4.4;
const GEAR_FALL_REDUCTION = 0.62;
const COOKED_PORK_HEAL = 28;
const PIG_COUNT = 14;
const PIG_WALK_SPEED = 5.6;
const PIG_RUN_SPEED = 9.8;
const PIG_PLAYER_FEAR_RADIUS = 16;
const PIG_WANDER_INTERVAL = 2.8;
const CAVE_TORCH_SAMPLE_STEP = 8;
const STATION_SCAN_INTERVAL = 0.18;
const STATION_SCAN_MOVE_THRESHOLD = 1.6;
const BLOCK_PHYSICS_ACTIVE_RADIUS = 135;
const TORCH_LIGHT_ACTIVE_RADIUS = 88;
const TORCH_LIGHT_UPDATE_INTERVAL = 0.18;
const MAX_ACTIVE_TORCH_LIGHTS = 10;
const WATER_SURFACE_UPDATE_INTERVAL = 1 / 30;
const WATER_NORMAL_UPDATE_INTERVAL = 0.22;
const WATER_SURFACE_UPDATE_INTERVAL_MID_FPS = 1 / 20;
const WATER_SURFACE_UPDATE_INTERVAL_LOW_FPS = 1 / 14;
const WATER_NORMAL_UPDATE_INTERVAL_MID_FPS = 0.32;
const WATER_NORMAL_UPDATE_INTERVAL_LOW_FPS = 0.48;
const PIG_ACTIVE_RADIUS = 180;
const PIG_IDLE_TICK_INTERVAL = 0.28;
const PIG_UPDATE_INTERVAL = 1 / 30;
const PIG_UPDATE_INTERVAL_MID_FPS = 1 / 24;
const PIG_UPDATE_INTERVAL_LOW_FPS = 1 / 18;
const BLOCK_PHYSICS_UPDATE_INTERVAL = 1 / 30;
const BLOCK_PHYSICS_UPDATE_INTERVAL_MID_FPS = 1 / 24;
const BLOCK_PHYSICS_UPDATE_INTERVAL_LOW_FPS = 1 / 18;
const MIN_RENDER_PIXEL_RATIO = 0.72;
const MAX_RENDER_PIXEL_RATIO = 1.5;
const RENDER_SCALE_UP_FPS = 57;
const RENDER_SCALE_DOWN_FPS = 43;
const RENDER_SCALE_ADJUST_INTERVAL = 1.2;
const RENDER_SCALE_UP_STEP = 0.04;
const RENDER_SCALE_DOWN_STEP = 0.14;
const RENDER_SCALE_RECOVERY_DELAY = 3.2;
const FPS_METER_UPDATE_INTERVAL = 0.12;
const COORDS_UPDATE_INTERVAL = 0.08;
const DEFAULT_ITEM_CAPACITY = 99;
const BACKPACK_ITEM_CAPACITY = 199;
const STRUCTURE_COUNT = 6;

const MINE_RANGE = 12.5;
const DIG_RADIUS = 11.5;
const MINE_TICK_INTERVAL = 0.07;
const HOLD_TERRAIN_DIG = 2.95;
const HOLD_PROP_DAMAGE = 6.5;
const CLICK_TERRAIN_DIG = 3.8;
const CLICK_TERRAIN_RADIUS_SCALE = 0.42;
const CLICK_PROP_DAMAGE = 11;
const TERRAIN_MINE_EPSILON = 0.08;
const CAVE_COUNT = 4;
const CAVE_CLEARANCE = 18;
const CAVE_FLOOR_INSET = 1.75;
const CAVE_MOUTH_STAMP_SCALE = 0.82;
const CAVE_PATH_STAMP_SCALE = 0.56;
const CAVE_CHAMBER_STAMP_SCALE = 0.92;
const CAVE_CHAMBER_CORE_STAMP_SCALE = 0.58;

const AIR_FOG_DENSITY = 0.0016;
const UNDERWATER_FOG_DENSITY = 0.031;
let worldSeed = createRandomSeed();
let worldProfile = createWorldProfile(worldSeed);
const THIRD_PERSON_DISTANCE = 15;
const THIRD_PERSON_HEIGHT = 4.8;
const THIRD_PERSON_MIN_DISTANCE = 2.2;
const DAY_NIGHT_CYCLE_SECONDS = 240;
const DEFAULT_FOV = 72;
const MIN_FOV = 50;
const MAX_FOV = 110;
const VIEW_FOV_STORAGE_KEY = "teracoot:view-fov";

const launchButton = document.querySelector("#launch");
const randomizeButton = document.querySelector("#randomize-world");
const coordsLabel = document.querySelector("#coords");
const seedValueLabel = document.querySelector("#seed-value");
const plankValueLabel = document.querySelector("#plank-value");
const stoneValueLabel = document.querySelector("#stone-value");
const buildMaterialValueLabel = document.querySelector("#build-material-value");
const blockPalette = document.querySelector("#block-palette");
const blockGrid = document.querySelector("#block-grid");
const survivalPanel = document.querySelector("#survival-panel");
const inventoryList = document.querySelector("#inventory-list");
const craftingGrid = document.querySelector("#crafting-grid");
const furnaceGrid = document.querySelector("#furnace-grid");
const stationSummary = document.querySelector("#station-summary");
const fovInput = document.querySelector("#fov");
const fovValueLabel = document.querySelector("#fov-value");
const fpsValueLabel = document.querySelector("#fps-value");
const fpsFill = document.querySelector("#fps-fill");
const underwaterOverlay = document.querySelector("#underwater-overlay");
const feedbackLayer = document.querySelector("#feedback-layer");
const modeToggleButton = document.querySelector("#mode-toggle");
const healthValueLabel = document.querySelector("#health-value");
const gearValueLabel = document.querySelector("#gear-value");
const stationValueLabel = document.querySelector("#station-value");
const inventoryCompact = document.querySelector("#inventory-compact");
const inventoryBar = document.querySelector("#inventory-bar");
const viewSettings = {
  fov: loadStoredNumber(VIEW_FOV_STORAGE_KEY, DEFAULT_FOV, MIN_FOV, MAX_FOV),
};

const MORNING_SKY = new THREE.Color(0xe2f3ff);
const AIR_SKY = new THREE.Color(0xcfe9ff);
const EVENING_SKY = new THREE.Color(0x7192c7);
const NIGHT_SKY = new THREE.Color(0x0a1220);
const UNDERWATER_SKY = new THREE.Color(0x114d66);
const MORNING_HEMI = new THREE.Color(0xfbfeff);
const AIR_HEMI = new THREE.Color(0xf7fdff);
const EVENING_HEMI = new THREE.Color(0xc5d9ff);
const NIGHT_HEMI = new THREE.Color(0x49688d);
const UNDERWATER_HEMI = new THREE.Color(0x6ec0cb);
const AIR_GROUND = new THREE.Color(0x566648);
const EVENING_GROUND = new THREE.Color(0x495462);
const NIGHT_GROUND = new THREE.Color(0x121c2a);
const UNDERWATER_GROUND = new THREE.Color(0x12353a);
const MORNING_SUN = new THREE.Color(0xf7fbff);
const AIR_SUN = new THREE.Color(0xfff1c8);
const EVENING_SUN = new THREE.Color(0xbad0f8);
const NIGHT_SUN = new THREE.Color(0x456b98);
const UNDERWATER_SUN = new THREE.Color(0x6fb7d0);
const MORNING_FILL = new THREE.Color(0xe0efff);
const AIR_FILL = new THREE.Color(0xcfe3ff);
const EVENING_FILL = new THREE.Color(0x6888bf);
const NIGHT_FILL = new THREE.Color(0x213d5b);
const UNDERWATER_FILL = new THREE.Color(0x396f98);
const MORNING_SKY_TOP = new THREE.Color(0xc5e2ff);
const DAY_SKY_TOP = new THREE.Color(0x9bcfff);
const EVENING_SKY_TOP = new THREE.Color(0x5978b4);
const NIGHT_SKY_TOP = new THREE.Color(0x060d18);
const MORNING_SKY_HORIZON = new THREE.Color(0xf1f9ff);
const DAY_SKY_HORIZON = new THREE.Color(0xe6f4ff);
const EVENING_SKY_HORIZON = new THREE.Color(0x9db4dc);
const NIGHT_SKY_HORIZON = new THREE.Color(0x13233b);
const MORNING_SKY_BOTTOM = new THREE.Color(0xfbfeff);
const DAY_SKY_BOTTOM = new THREE.Color(0xf9fdff);
const EVENING_SKY_BOTTOM = new THREE.Color(0x5f6f95);
const NIGHT_SKY_BOTTOM = new THREE.Color(0x040911);
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const WORLD_DOWN = new THREE.Vector3(0, -1, 0);

const centerNdc = new THREE.Vector2(0, 0);
const tempForward = new THREE.Vector3();
const tempRight = new THREE.Vector3();
const desiredMove = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
const groundRaycaster = new THREE.Raycaster();
const screenRaycaster = new THREE.Raycaster();
const cameraFocusPoint = new THREE.Vector3();
const desiredCameraPosition = new THREE.Vector3();
const cameraDirection = new THREE.Vector3();
const groundRayOrigin = new THREE.Vector3();
const cameraLookTarget = new THREE.Vector3();
const miningOrigin = new THREE.Vector3();
const miningDirection = new THREE.Vector3();
const projectedUiPoint = new THREE.Vector3();
const tempWaterCurrent = new THREE.Vector3();
const tempBuildDirection = new THREE.Vector3();
const cycleSkyColor = new THREE.Color();
const cycleHemiColor = new THREE.Color();
const cycleGroundColor = new THREE.Color();
const cycleSunColor = new THREE.Color();
const cycleFillColor = new THREE.Color();
const cycleSkyTopColor = new THREE.Color();
const cycleSkyHorizonColor = new THREE.Color();
const cycleSkyBottomColor = new THREE.Color();
const flightEuler = new THREE.Euler(0, 0, 0, "YXZ");
const tempBlockWorldPosition = new THREE.Vector3();

const terrainHeights = new Float32Array(GRID_WIDTH * GRID_WIDTH);
const baseTerrainHeights = new Float32Array(GRID_WIDTH * GRID_WIDTH);
const waterSourceCells = new Uint8Array(GRID_RESOLUTION * GRID_RESOLUTION);
const floodedWaterCells = new Uint8Array(GRID_RESOLUTION * GRID_RESOLUTION);
const waterFloodQueue = new Int32Array(GRID_RESOLUTION * GRID_RESOLUTION);
const props = [];
const caves = [];
const waterRipples = [];
const mineableTargets = [];
const cameraObstacleTargets = [];
const groundSupportTargets = [];
const debrisParticles = [];
const activePopTexts = [];
const audioState = {
  context: null,
  masterGain: null,
  lastTerrainAt: -Infinity,
  lastTreeAt: -Infinity,
  lastRockAt: -Infinity,
  musicStarted: false,
  musicPulseAt: -Infinity,
  musicNodes: [],
};

const ITEM_DEFINITIONS = {
  plank: { label: "Planks", kind: "plank" },
  stone: { label: "Stone", kind: "stone" },
  dirt: { label: "Dirt", kind: "terrain" },
  grass: { label: "Grass", kind: "terrain" },
  sand: { label: "Sand", kind: "terrain" },
  slate: { label: "Slate", kind: "stone" },
  snow: { label: "Snow", kind: "terrain" },
  leaf: { label: "Leaves", kind: "tree" },
  glass: { label: "Glass", kind: "stone" },
  brick: { label: "Brick", kind: "stone" },
  coal: { label: "Coal", kind: "stone" },
  rawPork: { label: "Raw Pork", kind: "pig" },
  cookedPork: { label: "Cooked Pork", kind: "pig" },
  torch: { label: "Torches", kind: "torch" },
  craftingTable: { label: "Crafting Tables", kind: "plank" },
  furnace: { label: "Furnaces", kind: "stone" },
  backpack: { label: "Backpack", kind: "plank" },
  gearBoots: { label: "Safety Boots", kind: "stone" },
};

const SURVIVAL_ITEM_ORDER = [
  "plank",
  "stone",
  "dirt",
  "grass",
  "sand",
  "slate",
  "snow",
  "leaf",
  "glass",
  "brick",
  "coal",
  "rawPork",
  "cookedPork",
  "torch",
  "craftingTable",
  "furnace",
  "backpack",
  "gearBoots",
];

const inventoryCounts = Object.fromEntries(
  SURVIVAL_ITEM_ORDER.map((key) => [key, 0]),
);

const MINING_PARTICLE_POOL_SIZE = 56;
const MINING_POP_DURATION = 0.85;
const MINING_PROFILE_COLORS = {
  terrain: {
    marker: 0xdb9c57,
    accent: 0x7b5737,
    debrisA: 0xc5935d,
    debrisB: 0x7f5a39,
    breakText: "crumbled",
  },
  tree: {
    marker: 0x8de27a,
    accent: 0x2f6e2b,
    debrisA: 0x7a4d29,
    debrisB: 0x4d7d36,
    breakText: "timber",
  },
  plank: {
    marker: 0xf4c57f,
    accent: 0x83582a,
    debrisA: 0xb98249,
    debrisB: 0x6e4626,
    breakText: "plank",
  },
  stone: {
    marker: 0xcfd8e3,
    accent: 0x6f7f92,
    debrisA: 0xadb8c4,
    debrisB: 0x75808d,
    breakText: "stone",
  },
  rock: {
    marker: 0xa7cfff,
    accent: 0x5c6f86,
    debrisA: 0xa9b7c5,
    debrisB: 0x687380,
    breakText: "shatter",
  },
  pig: {
    marker: 0xffb7cb,
    accent: 0xad5d73,
    debrisA: 0xffcad8,
    debrisB: 0xd67b95,
    breakText: "oink",
  },
  torch: {
    marker: 0xffd58a,
    accent: 0xff9847,
    debrisA: 0xf0bf6a,
    debrisB: 0x8d5c2e,
    breakText: "glow",
  },
};

const skyUniforms = {
  topColor: { value: MORNING_SKY_TOP.clone() },
  horizonColor: { value: MORNING_SKY_HORIZON.clone() },
  bottomColor: { value: MORNING_SKY_BOTTOM.clone() },
};

const scene = new THREE.Scene();
scene.background = MORNING_SKY.clone();
scene.fog = new THREE.FogExp2(MORNING_SKY.clone(), AIR_FOG_DENSITY);

const camera = new THREE.PerspectiveCamera(
  viewSettings.fov,
  window.innerWidth / window.innerHeight,
  0.1,
  1800,
);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
let currentRenderPixelRatio = Math.min(window.devicePixelRatio, MAX_RENDER_PIXEL_RATIO);
renderer.setPixelRatio(currentRenderPixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const pointerLockTarget = renderer.domElement;

function isPointerLocked() {
  const lockedElement = document.pointerLockElement;
  return lockedElement === pointerLockTarget || lockedElement === document.body;
}

function requestGamePointerLock() {
  if (!pointerLockTarget?.requestPointerLock) {
    return;
  }

  const requestResult = pointerLockTarget.requestPointerLock();
  if (requestResult && typeof requestResult.catch === "function") {
    requestResult.catch(() => {
      // Pointer lock can fail on restricted contexts (for example some file:// sessions).
    });
  }
}

const ambientLight = new THREE.HemisphereLight(AIR_HEMI, AIR_GROUND, 1.75);
scene.add(ambientLight);

const sun = new THREE.DirectionalLight(AIR_SUN, 2.0);
sun.position.set(160, 240, 110);
sun.castShadow = true;
sun.shadow.mapSize.set(1536, 1536);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 700;
sun.shadow.camera.left = -240;
sun.shadow.camera.right = 240;
sun.shadow.camera.top = 240;
sun.shadow.camera.bottom = -240;
scene.add(sun);

const fillLight = new THREE.DirectionalLight(AIR_FILL, 0.65);
fillLight.position.set(-180, 90, -150);
scene.add(fillLight);

const terrainGeometry = new THREE.PlaneGeometry(
  WORLD_SIZE,
  WORLD_SIZE,
  GRID_RESOLUTION,
  GRID_RESOLUTION,
);
terrainGeometry.rotateX(-Math.PI / 2);

const terrainPositions = terrainGeometry.attributes.position;
const terrainColors = new Float32Array(terrainPositions.count * 3);
const terrainColorAttribute = new THREE.BufferAttribute(terrainColors, 3);
terrainGeometry.setAttribute("color", terrainColorAttribute);

const terrainMaterial = new THREE.MeshStandardMaterial({
  vertexColors: true,
  side: THREE.DoubleSide,
  roughness: 1,
  metalness: 0,
});

const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.receiveShadow = true;
scene.add(terrain);
cameraObstacleTargets.push(terrain);
groundSupportTargets.push(terrain);

const terrainEdgeSkirt = new THREE.Mesh(new THREE.BufferGeometry(), terrainMaterial);
terrainEdgeSkirt.receiveShadow = true;
scene.add(terrainEdgeSkirt);
cameraObstacleTargets.push(terrainEdgeSkirt);

const waterMaterial = new THREE.MeshStandardMaterial({
  color: 0x5faed1,
  emissive: 0x18394b,
  emissiveIntensity: 0.24,
  transparent: true,
  opacity: 0.78,
  roughness: 0.1,
  metalness: 0.08,
  depthWrite: false,
  side: THREE.DoubleSide,
});

const water = new THREE.Mesh(new THREE.BufferGeometry(), waterMaterial);
water.renderOrder = 1;
scene.add(water);

const waterEdgeSkirt = new THREE.Mesh(new THREE.BufferGeometry(), waterMaterial);
waterEdgeSkirt.renderOrder = 1;
scene.add(waterEdgeSkirt);

const treeTrunkGeometry = new THREE.CylinderGeometry(0.34, 0.54, 6, 8);
const treeCanopyGeometryLarge = new THREE.ConeGeometry(3.5, 7.8, 8);
const treeCanopyGeometrySmall = new THREE.ConeGeometry(2.5, 5.4, 8);
const treeTrunkMaterial = new THREE.MeshStandardMaterial({ color: 0x714527, roughness: 1 });
const treeCanopyMaterial = new THREE.MeshStandardMaterial({ color: 0x345f2b, roughness: 1 });

const rockGeometryLarge = new THREE.DodecahedronGeometry(2.45, 0);
rockGeometryLarge.computeBoundingBox();
const rockGeometrySmall = new THREE.DodecahedronGeometry(1.55, 0);
rockGeometrySmall.computeBoundingBox();
const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x778089, roughness: 1 });
const blockPartGeometry = new THREE.BoxGeometry(1, 1, 1);
const organicMoundGeometry = new THREE.SphereGeometry(0.5, 14, 10);
const organicPileGeometry = new THREE.CylinderGeometry(0.4, 0.52, 1, 14, 1);
const organicRockGeometry = new THREE.DodecahedronGeometry(0.55, 0);
const organicBushGeometry = new THREE.IcosahedronGeometry(0.55, 0);
const caveRingGeometry = new THREE.CylinderGeometry(0.5, 0.58, 1, 12, 1, true);
const caveRoofGeometry = new THREE.SphereGeometry(0.5, 12, 9, 0, Math.PI * 2, 0, Math.PI * 0.72);
const grassBladeGeometry = new THREE.PlaneGeometry(1, 1, 1, 4);
grassBladeGeometry.translate(0, 0.5, 0);
const sandGrainGeometry = new THREE.DodecahedronGeometry(0.5, 0);
const buildColliderMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0,
  depthWrite: false,
  colorWrite: false,
});
const plankGeometry = new THREE.BoxGeometry(PLANK_SIZE, PLANK_THICKNESS, PLANK_SIZE);
const stoneBlockGeometry = new THREE.BoxGeometry(STONE_SIZE, STONE_SIZE, STONE_SIZE);

function createBlockTexture(drawTexture, size = 32, { smooth = false } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to create block texture canvas");
  }

  drawTexture(ctx, size);

  const texture = new THREE.CanvasTexture(canvas);
  if ("SRGBColorSpace" in THREE) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  texture.magFilter = smooth ? THREE.LinearFilter : THREE.NearestFilter;
  texture.minFilter = smooth ? THREE.LinearMipmapLinearFilter : THREE.NearestMipmapNearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createSingleBlockMaterial({
  map = null,
  color = 0xffffff,
  roughness = 1,
  metalness = 0,
  transparent = false,
  opacity = 1,
  side = THREE.FrontSide,
}) {
  return new THREE.MeshStandardMaterial({
    color,
    map,
    roughness,
    metalness,
    transparent,
    opacity,
    side,
  });
}

function createBlockMaterialSet({
  topTexture,
  sideTexture = topTexture,
  bottomTexture = sideTexture,
  roughness = 1,
  metalness = 0,
  transparent = false,
  opacity = 1,
}) {
  const createFaceMaterial = (map) =>
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map,
      roughness,
      metalness,
      transparent,
      opacity,
    });

  return [
    createFaceMaterial(sideTexture),
    createFaceMaterial(sideTexture),
    createFaceMaterial(topTexture),
    createFaceMaterial(bottomTexture),
    createFaceMaterial(sideTexture),
    createFaceMaterial(sideTexture),
  ];
}

function cloneBlockMaterial(material, overrides = {}) {
  if (Array.isArray(material)) {
    return material.map((entry) => cloneBlockMaterial(entry, overrides));
  }

  const cloned = material.clone();
  if (overrides.transparent !== undefined) {
    cloned.transparent = overrides.transparent;
  }
  if (overrides.depthTest !== undefined) {
    cloned.depthTest = overrides.depthTest;
  }
  if (overrides.depthWrite !== undefined) {
    cloned.depthWrite = overrides.depthWrite;
  }
  if (overrides.opacityMultiplier !== undefined) {
    cloned.opacity = (cloned.opacity ?? 1) * overrides.opacityMultiplier;
  }
  cloned.needsUpdate = true;
  return cloned;
}

function disposeBlockMaterial(material) {
  if (Array.isArray(material)) {
    for (const entry of material) {
      entry.dispose();
    }
    return;
  }

  material.dispose();
}

function isTransparentBlockMaterial(material) {
  if (Array.isArray(material)) {
    return material.some((entry) => entry.transparent || (entry.opacity ?? 1) < 0.999);
  }

  return material.transparent || (material.opacity ?? 1) < 0.999;
}

function pickBlockMaterial(material, faceIndex = 0) {
  if (!Array.isArray(material)) {
    return material;
  }

  return material[Math.min(faceIndex, material.length - 1)];
}

function hash01(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function updateSpringValue(state, target, stiffness, damping, delta) {
  state.velocity += (target - state.value) * stiffness * delta;
  state.velocity *= Math.exp(-damping * delta);
  state.value += state.velocity * delta;
  return state.value;
}

function createGrassPhysicsPatch(size, height) {
  const root = new THREE.Group();
  const blades = [];

  for (let i = 0; i < GRASS_BLADE_COUNT; i += 1) {
    const angle = (i / GRASS_BLADE_COUNT) * Math.PI * 2 + hash01(i + 0.13) * 0.82;
    const ringBias = i < GRASS_BLADE_COUNT * 0.36 ? 0.1 : i < GRASS_BLADE_COUNT * 0.72 ? 0.2 : 0.3;
    const radius = size * (ringBias + hash01(i + 1.7) * 0.14);
    const baseX = Math.cos(angle) * radius;
    const baseZ = Math.sin(angle) * radius;
    const bladeHeight = height * (0.34 + hash01(i + 2.9) * 0.34);
    const bladeWidth = size * (0.06 + hash01(i + 4.3) * 0.03);

    const pivot = new THREE.Group();
    pivot.position.set(baseX, height * (0.43 + hash01(i + 6.4) * 0.08), baseZ);
    pivot.rotation.y = angle + hash01(i + 7.1) * 1.8;
    pivot.userData = {
      basePitch: -0.18 - hash01(i + 8.7) * 0.24,
      phase: hash01(i + 9.5) * Math.PI * 2,
      localX: baseX,
      localZ: baseZ,
      bendX: { value: 0, velocity: 0 },
      bendZ: { value: 0, velocity: 0 },
    };

    const frontBlade = new THREE.Mesh(
      grassBladeGeometry,
      i % 3 === 0 ? grassBladeShadeMaterial : grassBladeMaterial,
    );
    frontBlade.castShadow = true;
    frontBlade.receiveShadow = true;
    frontBlade.scale.set(bladeWidth, bladeHeight, 1);
    frontBlade.position.y = hash01(i + 10.3) * height * 0.02;
    pivot.add(frontBlade);

    const crossBlade = new THREE.Mesh(
      grassBladeGeometry,
      i % 4 === 0 ? grassBladeShadeMaterial : grassBladeMaterial,
    );
    crossBlade.castShadow = true;
    crossBlade.receiveShadow = true;
    crossBlade.scale.set(bladeWidth * 0.82, bladeHeight * (0.88 + hash01(i + 11.8) * 0.18), 1);
    crossBlade.rotation.y = Math.PI * 0.5;
    crossBlade.position.y = frontBlade.position.y + height * 0.01;
    pivot.add(crossBlade);

    root.add(pivot);
    blades.push(pivot);
  }

  return {
    root,
    controller: {
      kind: "grass",
      blades,
      interactionRadius: GRASS_PHYSICS_RADIUS,
    },
  };
}

function createSandPhysicsPile(size, height) {
  const root = new THREE.Group();
  const grains = [];
  const moundRadius = size * 0.42;
  const baseHeight = height * 0.18;
  const peakHeight = height * 0.27;

  for (let i = 0; i < SAND_GRAIN_COUNT; i += 1) {
    const angle = hash01(i + 1.2) * Math.PI * 2;
    const radiusNorm = Math.pow(hash01(i + 2.4), 0.58);
    const radius = moundRadius * radiusNorm;
    const restX = Math.cos(angle) * radius;
    const restZ = Math.sin(angle) * radius;
    const mound = 1 - Math.min(1, radius / moundRadius);
    const restY = baseHeight + mound * peakHeight + hash01(i + 3.7) * height * 0.04;
    const grainSize = size * (0.088 + hash01(i + 4.8) * 0.06);

    const grain = new THREE.Mesh(
      sandGrainGeometry,
      i % 5 === 0 ? sandGrainShadeMaterial : sandGrainMaterial,
    );
    grain.castShadow = true;
    grain.receiveShadow = true;
    grain.scale.setScalar(grainSize);
    grain.position.set(
      restX + (hash01(i + 5.4) - 0.5) * size * 0.05,
      restY + hash01(i + 6.2) * height * 0.08,
      restZ + (hash01(i + 7.8) - 0.5) * size * 0.05,
    );
    grain.rotation.set(hash01(i + 8.2), hash01(i + 9.1) * Math.PI * 2, hash01(i + 10.5));
    grain.userData = {
      rest: new THREE.Vector3(restX, restY, restZ),
      offset: new THREE.Vector3(
        grain.position.x - restX,
        grain.position.y - restY,
        grain.position.z - restZ,
      ),
      velocity: new THREE.Vector3(
        (hash01(i + 11.1) - 0.5) * 0.4,
        hash01(i + 12.3) * 0.3,
        (hash01(i + 13.6) - 0.5) * 0.4,
      ),
      localX: restX,
      localZ: restZ,
      phase: hash01(i + 14.2) * Math.PI * 2,
      spinX: (hash01(i + 15.1) - 0.5) * 1.2,
      spinZ: (hash01(i + 16.6) - 0.5) * 1.2,
    };
    root.add(grain);
    grains.push(grain);
  }

  return {
    root,
    controller: {
      kind: "sand",
      grains,
      interactionRadius: SAND_PHYSICS_RADIUS,
      moundRadius,
      baseHeight,
      peakHeight,
    },
  };
}

function updateBlockPhysicsController(controller, worldPosition, delta, isHeld = false) {
  if (!controller) {
    return;
  }

  const horizontalPlayerSpeed = Math.hypot(player.velocity.x, player.velocity.z);

  if (controller.kind === "grass") {
    for (const blade of controller.blades) {
      const wind = Math.sin(elapsed * 2.6 + blade.userData.phase) * 0.17
        + Math.sin(elapsed * 1.3 + blade.userData.phase * 0.6) * 0.08;
      let targetX = wind - 0.07;
      let targetZ = Math.cos(elapsed * 1.8 + blade.userData.phase) * 0.06;

      if (!isHeld) {
        const bladeWorldX = worldPosition.x + blade.userData.localX;
        const bladeWorldZ = worldPosition.z + blade.userData.localZ;
        const dx = bladeWorldX - player.position.x;
        const dz = bladeWorldZ - player.position.z;
        const distance = Math.hypot(dx, dz);
        if (distance < controller.interactionRadius) {
          const influence = (1 - distance / controller.interactionRadius) * (0.55 + horizontalPlayerSpeed * 0.03);
          targetX += THREE.MathUtils.clamp((dz / Math.max(distance, 0.001)) * influence, -0.36, 0.36);
          targetZ += THREE.MathUtils.clamp((-dx / Math.max(distance, 0.001)) * influence, -0.36, 0.36);
        }
      }

      const bendX = updateSpringValue(blade.userData.bendX, targetX, 30, 7.5, delta);
      const bendZ = updateSpringValue(blade.userData.bendZ, targetZ, 30, 7.5, delta);
      blade.rotation.x = blade.userData.basePitch + bendX;
      blade.rotation.z = bendZ;
    }
    return;
  }

  if (controller.kind === "sand") {
    for (const grain of controller.grains) {
      const state = grain.userData;
      const wobble = Math.sin(elapsed * 2 + state.phase) * 0.008;

      if (!isHeld) {
        const grainWorldX = worldPosition.x + state.rest.x + state.offset.x;
        const grainWorldZ = worldPosition.z + state.rest.z + state.offset.z;
        const dx = grainWorldX - player.position.x;
        const dz = grainWorldZ - player.position.z;
        const distance = Math.hypot(dx, dz);
        if (distance < controller.interactionRadius) {
          const push = (1 - distance / controller.interactionRadius) * (1.2 + horizontalPlayerSpeed * 0.04);
          state.velocity.x += (dx / Math.max(distance, 0.001)) * push * delta * 14;
          state.velocity.z += (dz / Math.max(distance, 0.001)) * push * delta * 14;
          state.velocity.y += push * delta * 4;
        }
      }

      const localX = state.rest.x + state.offset.x;
      const localZ = state.rest.z + state.offset.z;
      const radius = Math.hypot(localX, localZ);
      const radiusFactor = 1 - Math.min(1, radius / controller.moundRadius);
      const targetY = controller.baseHeight + radiusFactor * controller.peakHeight + wobble;

      state.velocity.x += (-state.offset.x) * 16 * delta;
      state.velocity.z += (-state.offset.z) * 16 * delta;
      state.velocity.y += (targetY - (state.rest.y + state.offset.y)) * 28 * delta;
      state.velocity.multiplyScalar(Math.exp(-7.2 * delta));
      state.offset.addScaledVector(state.velocity, delta);

      grain.rotation.x += (state.velocity.z * 2.8 + state.spinX * 0.6) * delta;
      grain.rotation.z -= (state.velocity.x * 2.8 + state.spinZ * 0.6) * delta;
      grain.rotation.y += (state.velocity.x - state.velocity.z) * delta * 0.9;

      grain.position.set(
        state.rest.x + state.offset.x,
        state.rest.y + state.offset.y,
        state.rest.z + state.offset.z,
      );
    }
  }
}

function createWoodTexture() {
  return createBlockTexture((ctx, size) => {
    ctx.fillStyle = "#b68049";
    ctx.fillRect(0, 0, size, size);

    for (let y = 0; y < size; y += 8) {
      ctx.fillStyle = y % 16 === 0 ? "#c69158" : "#ab7642";
      ctx.fillRect(0, y, size, 8);
      ctx.fillStyle = "#7c4c24";
      ctx.fillRect(0, y, size, 1);

      for (let x = 2; x < size; x += 5) {
        ctx.fillStyle = "rgba(88, 58, 29, 0.28)";
        ctx.fillRect(x, y + 2 + ((x + y) % 3), 1, 4);
      }
    }

    ctx.fillStyle = "#74411c";
    ctx.fillRect(8, 5, 4, 2);
    ctx.fillRect(21, 18, 5, 2);
    ctx.fillRect(14, 26, 3, 2);
  });
}

function createStoneTexture() {
  const palette = ["#a4aeb8", "#8f99a5", "#7c8794", "#c0c8cf"];
  return createBlockTexture((ctx, size) => {
    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        ctx.fillStyle = palette[((x / 4) * 3 + (y / 4) * 5) % palette.length];
        ctx.fillRect(x, y, 4, 4);
      }
    }

    ctx.fillStyle = "#6d7885";
    ctx.fillRect(4, 10, 16, 1);
    ctx.fillRect(19, 10, 1, 6);
    ctx.fillRect(10, 22, 13, 1);
    ctx.fillRect(22, 18, 1, 7);
    ctx.fillRect(6, 25, 8, 1);
  });
}

function createDirtTexture() {
  const palette = ["#8d6943", "#7f5d3c", "#9b7550", "#6c4d31"];
  return createBlockTexture((ctx, size) => {
    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        ctx.fillStyle = palette[((x / 4) * 5 + (y / 4) * 7) % palette.length];
        ctx.fillRect(x, y, 4, 4);
      }
    }

    ctx.fillStyle = "#b08d69";
    for (let i = 0; i < size; i += 6) {
      ctx.fillRect((i * 3) % size, i, 1, 1);
      ctx.fillRect((i * 5 + 7) % size, (i * 2 + 9) % size, 1, 1);
    }
  });
}

function createGrassTopTexture() {
  const palette = ["#7db458", "#6a9d4b", "#5f8f42", "#92c768"];
  return createBlockTexture((ctx, size) => {
    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        ctx.fillStyle = palette[((x / 4) * 2 + (y / 4) * 3) % palette.length];
        ctx.fillRect(x, y, 4, 4);
      }
    }

    ctx.fillStyle = "#a4d47a";
    for (let x = 1; x < size; x += 5) {
      ctx.fillRect(x, (x * 3) % size, 1, 3);
    }
  });
}

function createGrassSideTexture() {
  const dirtTexture = createDirtTexture();
  return createBlockTexture((ctx, size) => {
    ctx.drawImage(dirtTexture.image, 0, 0, size, size);

    ctx.fillStyle = "#6fa64f";
    ctx.fillRect(0, 0, size, 8);
    ctx.fillStyle = "#4c7b38";
    ctx.fillRect(0, 8, size, 1);

    ctx.fillStyle = "#6fa64f";
    for (let x = 2; x < size; x += 6) {
      const dripHeight = 3 + ((x / 2) % 4);
      ctx.fillRect(x, 8, 3, dripHeight);
    }
  });
}

function createSandTexture() {
  const grainPalette = [
    "rgba(244, 228, 188, 0.34)",
    "rgba(223, 198, 142, 0.28)",
    "rgba(195, 164, 108, 0.16)",
    "rgba(235, 214, 170, 0.24)",
  ];
  return createBlockTexture((ctx, size) => {
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#ead8a7");
    gradient.addColorStop(0.48, "#dcc58e");
    gradient.addColorStop(1, "#c7a86e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 420; i += 1) {
      const x = (i * 37.17) % size;
      const y = (i * 53.11) % size;
      const radius = 0.4 + ((i * 17) % 5) * 0.16;
      ctx.fillStyle = grainPalette[i % grainPalette.length];
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(255, 244, 218, 0.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, size * 0.34);
    ctx.quadraticCurveTo(size * 0.3, size * 0.24, size + 6, size * 0.42);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-6, size * 0.72);
    ctx.quadraticCurveTo(size * 0.46, size * 0.6, size + 8, size * 0.78);
    ctx.stroke();
  }, 96, { smooth: true });
}

function createBrickTexture() {
  return createBlockTexture((ctx, size) => {
    ctx.fillStyle = "#d7b7a7";
    ctx.fillRect(0, 0, size, size);

    for (let y = 1; y < size; y += 8) {
      const offset = y % 16 === 1 ? 0 : 6;
      for (let x = -offset; x < size; x += 12) {
        ctx.fillStyle = y % 16 === 1 ? "#b05d49" : "#9f503d";
        ctx.fillRect(x + 1, y + 1, 10, 6);
      }
    }

    ctx.fillStyle = "#834232";
    for (let y = 8; y < size; y += 8) {
      ctx.fillRect(0, y, size, 1);
    }
  });
}

function createBrickTopTexture() {
  return createBlockTexture((ctx, size) => {
    ctx.fillStyle = "#9e5c49";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#d7b8a7";
    for (let y = 0; y < size; y += 8) {
      ctx.fillRect(0, y, size, 2);
    }

    for (let y = 0; y < size; y += 8) {
      const offset = y % 16 === 0 ? 0 : 8;
      for (let x = offset; x < size; x += 16) {
        ctx.fillRect(x, y, 2, 8);
      }
    }
  });
}

function createSlateTexture() {
  const palette = ["#7b8794", "#66727f", "#58636f", "#909aa5"];
  return createBlockTexture((ctx, size) => {
    for (let y = 0; y < size; y += 4) {
      ctx.fillStyle = palette[(y / 4) % palette.length];
      ctx.fillRect(0, y, size, 4);
    }

    ctx.fillStyle = "#4f5863";
    for (let y = 3; y < size; y += 6) {
      ctx.fillRect(0, y, size, 1);
    }

    ctx.fillStyle = "#b2bdc7";
    for (let x = 2; x < size; x += 7) {
      ctx.fillRect(x, (x * 2 + 5) % size, 2, 1);
    }
  });
}

function createSnowTopTexture() {
  return createBlockTexture((ctx, size) => {
    ctx.fillStyle = "#f6fbff";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#ddeaf7";
    for (let y = 0; y < size; y += 5) {
      ctx.fillRect(0, y, size, 2);
    }

    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < size; i += 6) {
      ctx.fillRect((i * 3) % size, i, 2, 2);
    }
  });
}

function createSnowSideTexture() {
  return createBlockTexture((ctx, size) => {
    ctx.fillStyle = "#f7fbff";
    ctx.fillRect(0, 0, size, 8);
    ctx.fillStyle = "#dce6f2";
    ctx.fillRect(0, 8, size, size - 8);
    ctx.fillStyle = "#b9cadb";
    for (let y = 12; y < size; y += 6) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#ffffff";
    for (let x = 3; x < size; x += 7) {
      ctx.fillRect(x, 5, 2, 5);
    }
  });
}

function createLeafTexture() {
  const palette = ["#5b8b45", "#467237", "#3d612f", "#79aa5d"];
  return createBlockTexture((ctx, size) => {
    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        ctx.fillStyle = palette[((x / 4) * 3 + (y / 4) * 4) % palette.length];
        ctx.fillRect(x, y, 4, 4);
      }
    }

    ctx.fillStyle = "#2d4724";
    for (let i = 0; i < size; i += 6) {
      ctx.fillRect((i * 5) % size, i, 2, 2);
    }
  });
}

function createGlassTexture() {
  return createBlockTexture((ctx, size) => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "rgba(191, 233, 255, 0.2)";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(236, 249, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, size - 2, size - 2);
    ctx.beginPath();
    ctx.moveTo(3, size - 8);
    ctx.lineTo(size - 8, 3);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 255, 255, 0.34)";
    ctx.fillRect(7, 6, size - 14, 2);
    ctx.fillRect(9, 11, 2, size - 20);
  });
}

const woodTexture = createWoodTexture();
const stoneTexture = createStoneTexture();
const dirtTexture = createDirtTexture();
const grassTopTexture = createGrassTopTexture();
const grassSideTexture = createGrassSideTexture();
const sandTexture = createSandTexture();
const brickTexture = createBrickTexture();
const brickTopTexture = createBrickTopTexture();
const slateTexture = createSlateTexture();
const snowTopTexture = createSnowTopTexture();
const snowSideTexture = createSnowSideTexture();
const leafTexture = createLeafTexture();
const glassTexture = createGlassTexture();

const plankMaterial = createBlockMaterialSet({
  topTexture: woodTexture,
  sideTexture: woodTexture,
  bottomTexture: woodTexture,
  roughness: 0.98,
  metalness: 0,
});
const stoneBlockMaterial = createBlockMaterialSet({
  topTexture: stoneTexture,
  sideTexture: stoneTexture,
  bottomTexture: stoneTexture,
  roughness: 1,
  metalness: 0,
});
const dirtBlockMaterial = createBlockMaterialSet({
  topTexture: dirtTexture,
  sideTexture: dirtTexture,
  bottomTexture: dirtTexture,
  roughness: 1,
});
const grassBlockMaterial = createBlockMaterialSet({
  topTexture: grassTopTexture,
  sideTexture: grassSideTexture,
  bottomTexture: dirtTexture,
  roughness: 1,
});
const dirtNaturalMaterial = createSingleBlockMaterial({ map: dirtTexture, color: 0xbe9362, roughness: 1 });
const dirtClodMaterial = createSingleBlockMaterial({ map: dirtTexture, color: 0x8c653f, roughness: 1 });
const grassNaturalTopMaterial = createSingleBlockMaterial({ map: grassTopTexture, color: 0x92c66a, roughness: 1 });
const sandBlockMaterial = createSingleBlockMaterial({ map: sandTexture, color: 0xf1ddb0, roughness: 1 });
const stoneNaturalMaterial = createSingleBlockMaterial({ map: stoneTexture, roughness: 1 });
const grassBladeMaterial = createSingleBlockMaterial({
  color: 0x6eaa43,
  roughness: 1,
  side: THREE.DoubleSide,
});
const grassBladeShadeMaterial = createSingleBlockMaterial({
  color: 0x4f7f30,
  roughness: 1,
  side: THREE.DoubleSide,
});
const sandGrainMaterial = createSingleBlockMaterial({ color: 0xe7c98d, roughness: 1 });
const sandGrainShadeMaterial = createSingleBlockMaterial({ color: 0xcfac68, roughness: 1 });
const snowPowderMaterial = createSingleBlockMaterial({ color: 0xf8fcff, roughness: 0.9 });
const leafClusterMaterial = createSingleBlockMaterial({ map: leafTexture, color: 0x78a95c, roughness: 1 });
const leafShadeMaterial = createSingleBlockMaterial({ map: leafTexture, color: 0x4d7438, roughness: 1 });
const twigMaterial = createSingleBlockMaterial({ color: 0x6b4b2b, roughness: 1 });
const caveWallMaterial = createSingleBlockMaterial({
  map: stoneTexture,
  color: 0x5e564c,
  roughness: 1,
  side: THREE.DoubleSide,
});
const caveRoofMaterial = createSingleBlockMaterial({
  map: stoneTexture,
  color: 0x4a433b,
  roughness: 1,
  side: THREE.DoubleSide,
});
const caveGlowMaterial = createSingleBlockMaterial({ color: 0x7b6b58, roughness: 1 });
const pigBodyMaterial = createSingleBlockMaterial({ color: 0xf2a8b8, roughness: 0.98 });
const pigAccentMaterial = createSingleBlockMaterial({ color: 0xe48ca1, roughness: 1 });
const pigSnoutMaterial = createSingleBlockMaterial({ color: 0xf4c0cb, roughness: 1 });
const pigHoofMaterial = createSingleBlockMaterial({ color: 0x6b4f4e, roughness: 1 });
const craftingTableMaterial = createBlockMaterialSet({
  topTexture: woodTexture,
  sideTexture: woodTexture,
  bottomTexture: woodTexture,
  roughness: 0.94,
});
const furnaceBlockMaterial = createSingleBlockMaterial({ color: 0x7e858d, roughness: 1 });
const furnaceInnerMaterial = createSingleBlockMaterial({ color: 0x3a3e44, roughness: 1 });
const torchFlameMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc470,
  emissive: 0xff9c33,
  emissiveIntensity: 1.8,
  roughness: 0.7,
});
const brickBlockMaterial = createBlockMaterialSet({
  topTexture: brickTopTexture,
  sideTexture: brickTexture,
  bottomTexture: brickTopTexture,
  roughness: 0.96,
});
const slateBlockMaterial = createBlockMaterialSet({
  topTexture: slateTexture,
  sideTexture: slateTexture,
  bottomTexture: slateTexture,
  roughness: 1,
});
const snowBlockMaterial = createSingleBlockMaterial({
  map: snowTopTexture,
  roughness: 0.82,
});
const leafBlockMaterial = createSingleBlockMaterial({
  map: leafTexture,
  roughness: 1,
});
const glassBlockMaterial = createSingleBlockMaterial({
  color: 0xdaf4ff,
  roughness: 0.08,
  transparent: true,
  opacity: 0.34,
});

const buildBlockDefinitions = {
  plank: {
    id: "plank",
    label: "Wood Planks",
    swatch: "repeating-linear-gradient(180deg, #c79259 0 22%, #7c4c24 22% 26%, #ad7443 26% 48%)",
    geometry: plankGeometry,
    material: plankMaterial,
    size: PLANK_SIZE,
    height: PLANK_THICKNESS,
    health: 8,
    miningKind: "plank",
    inventoryReward: "plank",
    heldScale: 0.2,
  },
  stone: {
    id: "stone",
    label: "Stone",
    swatch: "linear-gradient(135deg, #b6bec6, #7d8792)",
    geometry: stoneBlockGeometry,
    material: stoneBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 14,
    miningKind: "stone",
    inventoryReward: "stone",
    heldScale: 0.18,
  },
  dirt: {
    id: "dirt",
    label: "Dirt",
    swatch: "linear-gradient(135deg, #9c7550, #6f4f33)",
    geometry: stoneBlockGeometry,
    material: dirtBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 12,
    miningKind: "terrain",
    inventoryReward: "dirt",
    heldScale: 0.18,
  },
  grass: {
    id: "grass",
    label: "Grass",
    swatch: "linear-gradient(180deg, #7fb95c 0 34%, #8c6943 34% 100%)",
    geometry: stoneBlockGeometry,
    material: grassBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 12,
    miningKind: "terrain",
    inventoryReward: "grass",
    heldScale: 0.18,
  },
  sand: {
    id: "sand",
    label: "Sand",
    swatch: "linear-gradient(135deg, #e9d49d, #ccb175)",
    geometry: stoneBlockGeometry,
    material: sandBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 10,
    miningKind: "terrain",
    inventoryReward: "sand",
    heldScale: 0.18,
  },
  brick: {
    id: "brick",
    label: "Brick",
    swatch: "repeating-linear-gradient(180deg, #b05d49 0 30%, #d7b7a7 30% 34%, #9f503d 34% 64%)",
    geometry: stoneBlockGeometry,
    material: brickBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 14,
    miningKind: "stone",
    inventoryReward: "brick",
    heldScale: 0.18,
  },
  slate: {
    id: "slate",
    label: "Slate",
    swatch: "linear-gradient(180deg, #8a95a1, #5d6670)",
    geometry: stoneBlockGeometry,
    material: slateBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 14,
    miningKind: "stone",
    inventoryReward: "slate",
    heldScale: 0.18,
  },
  snow: {
    id: "snow",
    label: "Snow",
    swatch: "linear-gradient(180deg, #ffffff 0 30%, #d9e6f3 30% 100%)",
    geometry: stoneBlockGeometry,
    material: snowBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 10,
    miningKind: "terrain",
    inventoryReward: "snow",
    heldScale: 0.18,
  },
  leaf: {
    id: "leaf",
    label: "Leaf Block",
    swatch: "linear-gradient(135deg, #79aa5d, #3d612f)",
    geometry: stoneBlockGeometry,
    material: leafBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 10,
    miningKind: "terrain",
    inventoryReward: "leaf",
    heldScale: 0.18,
  },
  glass: {
    id: "glass",
    label: "Glass",
    swatch: "linear-gradient(135deg, rgba(214,240,255,0.9), rgba(166,214,242,0.4))",
    geometry: stoneBlockGeometry,
    material: glassBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE,
    health: 10,
    miningKind: "stone",
    inventoryReward: "glass",
    heldScale: 0.18,
  },
  crafting_table: {
    id: "crafting_table",
    label: "Crafting Table",
    swatch: "linear-gradient(135deg, #c88d52, #7f4c25)",
    geometry: stoneBlockGeometry,
    material: craftingTableMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE * 0.9,
    health: 14,
    miningKind: "plank",
    inventoryReward: "craftingTable",
    heldScale: 0.18,
    stationType: "crafting_table",
  },
  furnace: {
    id: "furnace",
    label: "Furnace",
    swatch: "linear-gradient(135deg, #9ca5ae, #5e666f)",
    geometry: stoneBlockGeometry,
    material: furnaceBlockMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE * 0.96,
    health: 18,
    miningKind: "stone",
    inventoryReward: "furnace",
    heldScale: 0.18,
    stationType: "furnace",
  },
  torch: {
    id: "torch",
    label: "Torch",
    swatch: "linear-gradient(180deg, #ffd77f 0 35%, #8b5a31 35% 100%)",
    geometry: stoneBlockGeometry,
    material: twigMaterial,
    size: STONE_SIZE,
    height: STONE_SIZE * 0.86,
    health: 6,
    miningKind: "torch",
    inventoryReward: "torch",
    heldScale: 0.18,
    walkableSurface: false,
    colliderRadius: STONE_SIZE * 0.14,
    buildFootprint: STONE_SIZE * 0.26,
    supportPadding: 0.28,
  },
};

function createDetailedBlockAssembly(definition, material = definition.material, options = {}) {
  const root = new THREE.Group();
  const targets = [];
  const castShadow = options.castShadow ?? true;
  const receiveShadow = options.receiveShadow ?? true;
  const includeCollider = options.includeCollider ?? true;
  let physicsController = null;

  const addVisibleMesh = (geometry, meshMaterial, dimensions, position, extra = {}) => {
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    const transparent = isTransparentBlockMaterial(meshMaterial);
    mesh.castShadow = (extra.castShadow ?? castShadow) && !transparent;
    mesh.receiveShadow = extra.receiveShadow ?? receiveShadow;
    mesh.position.set(position.x, position.y, position.z);
    mesh.scale.set(dimensions.x, dimensions.y, dimensions.z);
    if (extra.rotation) {
      mesh.rotation.set(extra.rotation.x, extra.rotation.y, extra.rotation.z);
    }
    root.add(mesh);
    return mesh;
  };

  const size = definition.size;
  const height = definition.height;
  const isThinBlock = height < size * 0.42;
  const sideMaterial = pickBlockMaterial(material, 0);
  const supportTopY = isThinBlock ? height * 0.96 : height * 0.9;
  let supportSurface = null;

  if (includeCollider) {
    const collider = new THREE.Mesh(blockPartGeometry, buildColliderMaterial);
    collider.position.set(0, height * 0.5, 0);
    collider.scale.set(size, height, size);
    root.add(collider);
    targets.push(collider);

    supportSurface = new THREE.Mesh(blockPartGeometry, buildColliderMaterial);
    supportSurface.position.set(0, supportTopY - Math.max(height * 0.04, 0.02) * 0.5, 0);
    supportSurface.scale.set(size * 0.94, Math.max(height * 0.04, 0.02), size * 0.94);
    root.add(supportSurface);
  }

  switch (definition.id) {
    case "plank":
      addVisibleMesh(
        blockPartGeometry,
        material,
        { x: size * 0.92, y: height * 0.88, z: size * 0.9 },
        { x: 0, y: height * 0.46, z: 0 },
      );
      addVisibleMesh(
        blockPartGeometry,
        sideMaterial,
        { x: size * 0.14, y: height * 0.18, z: size * 0.14 },
        { x: -size * 0.24, y: height * 0.12, z: 0 },
      );
      addVisibleMesh(
        blockPartGeometry,
        sideMaterial,
        { x: size * 0.14, y: height * 0.18, z: size * 0.14 },
        { x: size * 0.24, y: height * 0.12, z: 0 },
      );
      break;
    case "stone":
      addVisibleMesh(
        organicRockGeometry,
        stoneNaturalMaterial,
        { x: size * 0.74, y: height * 0.72, z: size * 0.74 },
        { x: 0, y: height * 0.46, z: 0 },
        { rotation: { x: 0.18, y: 0.62, z: 0.08 } },
      );
      addVisibleMesh(
        organicRockGeometry,
        stoneNaturalMaterial,
        { x: size * 0.24, y: height * 0.2, z: size * 0.22 },
        { x: size * 0.08, y: height * 0.72, z: -size * 0.04 },
        { rotation: { x: -0.1, y: 0.22, z: 0.16 } },
      );
      break;
    case "dirt":
      addVisibleMesh(
        organicPileGeometry,
        dirtNaturalMaterial,
        { x: size * 0.88, y: height * 0.48, z: size * 0.88 },
        { x: 0, y: height * 0.24, z: 0 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        dirtNaturalMaterial,
        { x: size * 0.68, y: height * 0.24, z: size * 0.68 },
        { x: 0, y: height * 0.5, z: 0 },
      );
      addVisibleMesh(
        organicRockGeometry,
        dirtClodMaterial,
        { x: size * 0.22, y: height * 0.14, z: size * 0.2 },
        { x: -size * 0.18, y: height * 0.56, z: size * 0.06 },
        { rotation: { x: 0.12, y: 0.36, z: -0.1 } },
      );
      addVisibleMesh(
        organicRockGeometry,
        dirtClodMaterial,
        { x: size * 0.17, y: height * 0.1, z: size * 0.16 },
        { x: size * 0.14, y: height * 0.52, z: -size * 0.12 },
        { rotation: { x: -0.08, y: 0.18, z: 0.14 } },
      );
      break;
    case "grass":
      addVisibleMesh(
        organicPileGeometry,
        dirtNaturalMaterial,
        { x: size * 0.88, y: height * 0.42, z: size * 0.88 },
        { x: 0, y: height * 0.21, z: 0 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        grassNaturalTopMaterial,
        { x: size * 0.82, y: height * 0.12, z: size * 0.82 },
        { x: 0, y: height * 0.42, z: 0 },
      );
      {
        const patch = createGrassPhysicsPatch(size, height);
        root.add(patch.root);
        physicsController = patch.controller;
      }
      break;
    case "sand":
      addVisibleMesh(
        organicMoundGeometry,
        sandBlockMaterial,
        { x: size * 0.84, y: height * 0.14, z: size * 0.84 },
        { x: 0, y: height * 0.2, z: 0 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        sandBlockMaterial,
        { x: size * 0.58, y: height * 0.12, z: size * 0.58 },
        { x: -size * 0.08, y: height * 0.34, z: size * 0.04 },
      );
      {
        const pile = createSandPhysicsPile(size, height);
        root.add(pile.root);
        physicsController = pile.controller;
      }
      break;
    case "brick":
      addVisibleMesh(
        blockPartGeometry,
        material,
        { x: size * 0.92, y: height * 0.92, z: size * 0.92 },
        { x: 0, y: height * 0.46, z: 0 },
      );
      break;
    case "slate":
      addVisibleMesh(
        blockPartGeometry,
        material,
        { x: size * 0.9, y: height * 0.82, z: size * 0.9 },
        { x: 0, y: height * 0.41, z: 0 },
      );
      addVisibleMesh(
        blockPartGeometry,
        sideMaterial,
        { x: size * 0.78, y: height * 0.08, z: size * 0.78 },
        { x: 0, y: height * 0.9, z: 0 },
      );
      break;
    case "snow":
      addVisibleMesh(
        organicPileGeometry,
        snowBlockMaterial,
        { x: size * 0.88, y: height * 0.4, z: size * 0.88 },
        { x: 0, y: height * 0.2, z: 0 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        snowPowderMaterial,
        { x: size * 0.74, y: height * 0.22, z: size * 0.74 },
        { x: 0, y: height * 0.42, z: 0 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        snowPowderMaterial,
        { x: size * 0.3, y: height * 0.12, z: size * 0.3 },
        { x: -size * 0.16, y: height * 0.5, z: size * 0.08 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        snowPowderMaterial,
        { x: size * 0.24, y: height * 0.1, z: size * 0.24 },
        { x: size * 0.16, y: height * 0.47, z: -size * 0.1 },
      );
      break;
    case "leaf":
      addVisibleMesh(
        organicBushGeometry,
        leafClusterMaterial,
        { x: size * 0.6, y: height * 0.36, z: size * 0.6 },
        { x: 0, y: height * 0.34, z: 0 },
        { rotation: { x: 0.1, y: 0.4, z: -0.08 } },
      );
      addVisibleMesh(
        organicBushGeometry,
        leafClusterMaterial,
        { x: size * 0.42, y: height * 0.24, z: size * 0.42 },
        { x: -size * 0.14, y: height * 0.5, z: size * 0.12 },
        { rotation: { x: -0.08, y: 0.12, z: 0.18 } },
      );
      addVisibleMesh(
        organicBushGeometry,
        leafShadeMaterial,
        { x: size * 0.34, y: height * 0.2, z: size * 0.34 },
        { x: size * 0.16, y: height * 0.46, z: -size * 0.1 },
        { rotation: { x: 0.12, y: 0.76, z: -0.06 } },
      );
      addVisibleMesh(
        blockPartGeometry,
        twigMaterial,
        { x: size * 0.08, y: height * 0.26, z: size * 0.08 },
        { x: 0, y: height * 0.18, z: 0 },
      );
      break;
    case "glass":
      addVisibleMesh(
        blockPartGeometry,
        material,
        { x: size * 0.8, y: height * 0.9, z: size * 0.8 },
        { x: 0, y: height * 0.45, z: 0 },
        { castShadow: false },
      );
      break;
    case "crafting_table":
      addVisibleMesh(
        blockPartGeometry,
        material,
        { x: size * 0.9, y: height * 0.78, z: size * 0.9 },
        { x: 0, y: height * 0.39, z: 0 },
      );
      addVisibleMesh(
        blockPartGeometry,
        pickBlockMaterial(material, 2),
        { x: size * 0.96, y: height * 0.12, z: size * 0.96 },
        { x: 0, y: height * 0.84, z: 0 },
      );
      break;
    case "furnace":
      addVisibleMesh(
        blockPartGeometry,
        furnaceBlockMaterial,
        { x: size * 0.92, y: height * 0.92, z: size * 0.92 },
        { x: 0, y: height * 0.46, z: 0 },
      );
      addVisibleMesh(
        blockPartGeometry,
        furnaceInnerMaterial,
        { x: size * 0.34, y: height * 0.22, z: size * 0.1 },
        { x: 0, y: height * 0.36, z: size * 0.38 },
      );
      break;
    case "torch": {
      addVisibleMesh(
        blockPartGeometry,
        twigMaterial,
        { x: size * 0.08, y: height * 0.58, z: size * 0.08 },
        { x: 0, y: height * 0.34, z: 0 },
      );
      addVisibleMesh(
        organicMoundGeometry,
        torchFlameMaterial,
        { x: size * 0.16, y: height * 0.16, z: size * 0.16 },
        { x: 0, y: height * 0.72, z: 0 },
      );
      const light = new THREE.PointLight(0xffb44d, 1.5, 26, 2);
      light.position.set(0, height * 0.8, 0);
      root.add(light);
      root.userData.pointLight = light;
      root.userData.baseLightIntensity = light.intensity;
      break;
    }
    default:
      addVisibleMesh(
        blockPartGeometry,
        material,
        { x: size * 0.9, y: height * 0.9, z: size * 0.9 },
        { x: 0, y: height * 0.45, z: 0 },
      );
      break;
  }

  root.userData.blockPhysics = physicsController;
  return { root, targets, supportSurface, physicsController };
}

const buildBlockCatalog = Object.values(buildBlockDefinitions);
const craftingRecipes = [
  {
    id: "crafting-table",
    label: "Crafting Table",
    description: "Place nearby to unlock advanced crafting.",
    station: "none",
    output: { craftingTable: 1 },
    costs: { plank: 4 },
  },
  {
    id: "furnace",
    label: "Furnace",
    description: "Turns raw resources into refined blocks and food.",
    station: "crafting_table",
    output: { furnace: 1 },
    costs: { stone: 8, slate: 2 },
  },
  {
    id: "torch",
    label: "Torch Bundle",
    description: "Light up caves and build sites.",
    station: "crafting_table",
    output: { torch: 4 },
    costs: { plank: 1, coal: 1 },
  },
  {
    id: "leaf",
    label: "Leaf Block",
    description: "Weave grassy fibers into a soft foliage block.",
    station: "crafting_table",
    output: { leaf: 1 },
    costs: { grass: 2, plank: 1 },
  },
  {
    id: "backpack",
    label: "Backpack",
    description: "Wear it to carry a lot more without dropping supplies.",
    station: "crafting_table",
    output: { backpack: 1 },
    costs: { plank: 6, leaf: 4 },
    unlockBackpack: true,
  },
  {
    id: "safety-boots",
    label: "Safety Boots",
    description: "Wear them to reduce fall damage.",
    station: "crafting_table",
    output: { gearBoots: 1 },
    costs: { slate: 4, plank: 2 },
    autoEquip: "gearBoots",
  },
];

const furnaceRecipes = [
  {
    id: "glass",
    label: "Glass",
    description: "Smelt beach sand into clear panes.",
    output: { glass: 1 },
    costs: { sand: 2 },
  },
  {
    id: "brick",
    label: "Brick",
    description: "Fire compacted earth into brick blocks.",
    output: { brick: 1 },
    costs: { dirt: 2 },
  },
  {
    id: "slate",
    label: "Slate",
    description: "Harden rough stone into darker slabs.",
    output: { slate: 1 },
    costs: { stone: 2 },
  },
  {
    id: "cooked-pork",
    label: "Cooked Pork",
    description: "Restores health when you eat it with X.",
    output: { cookedPork: 1 },
    costs: { rawPork: 1 },
  },
];

const blockPaletteButtons = new Map();
const heldPaletteBlock = createHeldPaletteBlock();
camera.add(heldPaletteBlock);

const playerModel = createPlayerModel();
scene.add(playerModel);
const miningMarker = createMiningMarker();
scene.add(miningMarker);
createDebrisPool();
addSkyDome();

const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  ascend: false,
  sprint: false,
};

const player = {
  position: new THREE.Vector3(0, 0, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  grounded: true,
  health: PLAYER_MAX_HEALTH,
  maxHealth: PLAYER_MAX_HEALTH,
};

let yaw = Math.PI;
let pitch = -0.2;
let underwaterBlend = 0;
let elapsed = 0;
let smoothedFps = 60;
let isMining = false;
let miningCooldown = 0;
let viewMode = "first";
let isFlyMode = false;
let waterStepRippleCooldown = 0;
let wasPlayerInWater = false;
let selectedBuildMaterial = "plank";
let isBlockPaletteOpen = false;
let isSurvivalPanelOpen = false;
let gameMode = "survival";
let equippedGear = null;
let hasBackpack = false;
let inventoryCompactSignature = "";
let inventoryListSignature = "";
let inventoryBarSignature = "";
let lastStationScanAt = Number.NEGATIVE_INFINITY;
let lastTorchLightUpdateAt = Number.NEGATIVE_INFINITY;
let lastWaterSurfaceUpdateAt = Number.NEGATIVE_INFINITY;
let lastRenderScaleAdjustAt = Number.NEGATIVE_INFINITY;
let renderScaleRecoveryReadyAt = 0;
let lastFpsMeterUpdateAt = Number.NEGATIVE_INFINITY;
let lastCoordsUpdateAt = Number.NEGATIVE_INFINITY;
let blockPhysicsAccumulator = 0;
let pigUpdateAccumulator = 0;
const cachedNearbyStations = {
  crafting: false,
  furnace: false,
  x: Number.POSITIVE_INFINITY,
  z: Number.POSITIVE_INFINITY,
  changed: false,
};

regenerateWorld(worldSeed);
camera.position.copy(player.position);
applyViewSettings();
populateBlockPalette();
updateSelectedBuildLabel();
updateResourceLabels();

launchButton.addEventListener("click", () => {
  ensureAudio();
  requestGamePointerLock();
});

randomizeButton?.addEventListener("click", () => {
  regenerateWorld();
});

modeToggleButton?.addEventListener("click", () => {
  toggleGameMode();
});

blockPalette?.addEventListener("click", (event) => {
  if (event.target === blockPalette) {
    closeBlockPalette(true);
  }
});

survivalPanel?.addEventListener("click", (event) => {
  if (event.target === survivalPanel) {
    closeSurvivalPanel(true);
  }
});

fovInput?.addEventListener("input", (event) => {
  setFov(event.target.value);
});

document.addEventListener("pointerlockchange", () => {
  const locked = isPointerLocked();
  document.body.classList.toggle("locked", locked);

  if (!locked) {
    resetGameplayInputs();
  }
});

document.addEventListener("mousemove", (event) => {
  if (!isPointerLocked()) {
    return;
  }

  yaw -= event.movementX * POINTER_SENSITIVITY;
  pitch -= event.movementY * POINTER_SENSITIVITY;
  pitch = THREE.MathUtils.clamp(pitch, -1.35, 1.35);
});

document.addEventListener("keydown", (event) => {
  preventGameplayKeyDefaults(event);

  if (!isPointerLocked() && event.code === "Enter" && !event.repeat) {
    ensureAudio();
    requestGamePointerLock();
    return;
  }

  if (isSurvivalPanelOpen) {
    if ((event.code === "KeyC" || event.code === "KeyI" || event.code === "Escape") && !event.repeat) {
      closeSurvivalPanel(true);
    }
    return;
  }

  if (isBlockPaletteOpen) {
    if ((event.code === "KeyB" || event.code === "Escape") && !event.repeat) {
      closeBlockPalette(true);
    }
    return;
  }

  if (event.code === "KeyV" && !event.repeat) {
    toggleViewMode();
    return;
  }

  if (event.code === "KeyR" && !event.repeat) {
    regenerateWorld();
    return;
  }

  if (event.code === "KeyL" && !event.repeat) {
    toggleFlyMode();
    return;
  }

  if (event.code === "KeyB" && !event.repeat) {
    toggleBlockPalette();
    return;
  }

  if (event.code === "KeyC" && !event.repeat) {
    toggleSurvivalPanel();
    return;
  }

  if (event.code === "KeyI" && !event.repeat) {
    toggleSurvivalPanel();
    return;
  }

  if (event.code === "KeyM" && !event.repeat) {
    toggleGameMode();
    return;
  }

  if (/^Digit[1-9]$/.test(event.code) && !event.repeat) {
    selectInventoryBarSlot(Number.parseInt(event.code.slice(5), 10) - 1);
    return;
  }

  if (event.code === "KeyQ" && !event.repeat) {
    tryPlaceSelectedBuild();
    return;
  }

  if (event.code === "KeyX" && !event.repeat) {
    tryEatCookedPork();
    return;
  }

  setKeyState(event.code, true);

  if (!isFlyMode && event.code === "Space" && player.grounded) {
    player.velocity.y = JUMP_SPEED;
    player.grounded = false;
  }
});

document.addEventListener("keyup", (event) => {
  preventGameplayKeyDefaults(event);
  if (isBlockPaletteOpen) {
    return;
  }
  setKeyState(event.code, false);
});

document.addEventListener("mousedown", (event) => {
  if (event.button !== 0 || !isPointerLocked()) {
    return;
  }

  event.preventDefault();
  ensureAudio();
  isMining = true;
  updateCamera();
  mineImmediately();
});

document.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    isMining = false;
    miningCooldown = 0;
  }
});

window.addEventListener("blur", () => {
  resetGameplayInputs();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(currentRenderPixelRatio);
});

const clock = new THREE.Clock();
animate();

function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.05);
  elapsed += delta;
  updatePlayer(delta);
  updatePlayerModel(delta);
  updateCamera();
  updateHeldBuildItem();
  updateBuildBlockPhysics(delta);
  updateTorchLights();
  updatePigProps(delta);
  updateStationHud();
  updateMining(delta);
  updateWaterAnimation(delta);
  updateEnvironment(delta);
  updateBackgroundMusic();
  updateFeedback(delta);
  updateFpsMeter(delta);
  updateAdaptiveRenderScale();
  renderer.render(scene, camera);
}

function getAdaptiveInterval(highFpsInterval, midFpsInterval, lowFpsInterval) {
  if (smoothedFps < RENDER_SCALE_DOWN_FPS) {
    return lowFpsInterval;
  }

  if (smoothedFps < RENDER_SCALE_UP_FPS - 2) {
    return midFpsInterval;
  }

  return highFpsInterval;
}

function updateFpsMeter(delta) {
  const instantFps = 1 / Math.max(delta, 0.0001);
  smoothedFps = THREE.MathUtils.lerp(smoothedFps, instantFps, 0.14);

  if (!fpsValueLabel || !fpsFill || elapsed < lastFpsMeterUpdateAt + FPS_METER_UPDATE_INTERVAL) {
    return;
  }

  lastFpsMeterUpdateAt = elapsed;
  const normalized = THREE.MathUtils.clamp(smoothedFps / 60, 0, 1);
  const hueShift = THREE.MathUtils.lerp(0, 115, normalized);
  const nextFpsText = `${Math.round(smoothedFps)}`;
  const nextWidth = `${(normalized * 100).toFixed(1)}%`;
  const nextFilter = `hue-rotate(${hueShift.toFixed(1)}deg)`;

  if (fpsValueLabel.textContent !== nextFpsText) {
    fpsValueLabel.textContent = nextFpsText;
  }
  if (fpsFill.style.width !== nextWidth) {
    fpsFill.style.width = nextWidth;
  }
  if (fpsFill.style.filter !== nextFilter) {
    fpsFill.style.filter = nextFilter;
  }
}

function updateAdaptiveRenderScale() {
  if (elapsed < lastRenderScaleAdjustAt + RENDER_SCALE_ADJUST_INTERVAL) {
    return;
  }

  lastRenderScaleAdjustAt = elapsed;
  const deviceRatio = Math.min(window.devicePixelRatio || 1, MAX_RENDER_PIXEL_RATIO);
  let nextRatio = currentRenderPixelRatio;

  if (smoothedFps < RENDER_SCALE_DOWN_FPS) {
    nextRatio = Math.max(MIN_RENDER_PIXEL_RATIO, currentRenderPixelRatio - RENDER_SCALE_DOWN_STEP);
    renderScaleRecoveryReadyAt = Math.max(renderScaleRecoveryReadyAt, elapsed + RENDER_SCALE_RECOVERY_DELAY);
  } else if (smoothedFps > RENDER_SCALE_UP_FPS && elapsed >= renderScaleRecoveryReadyAt) {
    nextRatio = Math.min(deviceRatio, currentRenderPixelRatio + RENDER_SCALE_UP_STEP);
  }

  if (Math.abs(nextRatio - currentRenderPixelRatio) > 0.015) {
    currentRenderPixelRatio = nextRatio;
    renderer.setPixelRatio(currentRenderPixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
}

function updatePlayer(delta) {
  if (isFlyMode) {
    updateFlyPlayer(delta);
    updateCoordsLabel();
    return;
  }

  desiredMove.set(0, 0, 0);
  const movementWaterState = getWaterState(
    player.position.x,
    player.position.z,
    player.position.y - EYE_HEIGHT,
  );

  const forwardInput = Number(keys.forward) - Number(keys.backward);
  const strafeInput = Number(keys.right) - Number(keys.left);

  if (forwardInput !== 0 || strafeInput !== 0) {
    tempForward.set(0, 0, -1).applyAxisAngle(WORLD_UP, yaw);
    tempForward.y = 0;
    tempForward.normalize();

    tempRight.set(1, 0, 0).applyAxisAngle(WORLD_UP, yaw);
    tempRight.y = 0;
    tempRight.normalize();

    desiredMove.addScaledVector(tempForward, forwardInput);
    desiredMove.addScaledVector(tempRight, strafeInput);
    desiredMove.normalize();
  }

  const speed = WALK_SPEED
    * (keys.sprint && !movementWaterState.present ? SPRINT_MULTIPLIER : 1)
    * (movementWaterState.present
      ? THREE.MathUtils.lerp(1, WATER_MOVE_FACTOR, movementWaterState.submersion)
      : 1);
  const accel = movementWaterState.present
    ? GROUND_ACCEL * 0.46
    : player.grounded
      ? GROUND_ACCEL
      : AIR_ACCEL;

  if (desiredMove.lengthSq() > 0) {
    player.velocity.x = moveToward(player.velocity.x, desiredMove.x * speed, accel * delta);
    player.velocity.z = moveToward(player.velocity.z, desiredMove.z * speed, accel * delta);
  } else {
    if (!movementWaterState.present && player.grounded) {
      player.velocity.x = 0;
      player.velocity.z = 0;
    } else {
      const drag = movementWaterState.present
        ? WATER_HORIZONTAL_DRAG
        : player.grounded
          ? GROUND_FRICTION
          : AIR_DRAG;
      player.velocity.x = applyDrag(player.velocity.x, drag * delta);
      player.velocity.z = applyDrag(player.velocity.z, drag * delta);
    }
  }

  if (movementWaterState.present && movementWaterState.submersion > 0.08) {
    sampleWaterCurrent(player.position.x, player.position.z, tempWaterCurrent);
    player.velocity.x += tempWaterCurrent.x * WATER_CURRENT_STRENGTH * delta;
    player.velocity.z += tempWaterCurrent.z * WATER_CURRENT_STRENGTH * delta;
  }

  const moveX = player.velocity.x * delta;
  const moveZ = player.velocity.z * delta;
  attemptHorizontalMove(moveX, moveZ, player.grounded);

  const groundY = getVisibleTerrainHeight(player.position.x, player.position.z) + EYE_HEIGHT;
  const waterState = getWaterState(
    player.position.x,
    player.position.z,
    player.position.y - EYE_HEIGHT,
  );

  if (waterState.present && (waterState.depth > 1.1 || waterState.feetDepth > 0.55)) {
    updatePlayerInWater(delta, groundY, waterState);
  } else {
    if (player.grounded) {
      const drop = player.position.y - groundY;

      if (drop <= MAX_GROUND_SNAP_DOWN) {
        player.position.y = groundY;
        player.velocity.y = 0;
      } else {
        player.grounded = false;
      }
    }

    if (!player.grounded) {
      player.velocity.y -= GRAVITY * delta;
      player.position.y += player.velocity.y * delta;

      const landingY = getVisibleTerrainHeight(player.position.x, player.position.z) + EYE_HEIGHT;
      if (player.position.y <= landingY) {
        const impactSpeed = -player.velocity.y;
        player.position.y = landingY;
        player.velocity.y = 0;
        player.grounded = true;
        if (impactSpeed > FALL_DAMAGE_SAFE_SPEED) {
          const reduction = equippedGear === "gearBoots" ? GEAR_FALL_REDUCTION : 0;
          const damage = Math.max(0, (impactSpeed - FALL_DAMAGE_SAFE_SPEED) * FALL_DAMAGE_SPEED_SCALE * (1 - reduction));
          applyPlayerDamage(damage, "stone");
        }
      }
    }
  }

  updatePlayerWaterRipples(delta, waterState);
  updateCoordsLabel();
}

function updateFlyPlayer(delta) {
  desiredMove.set(0, 0, 0);

  const forwardInput = Number(keys.forward) - Number(keys.backward);
  const strafeInput = Number(keys.right) - Number(keys.left);
  const verticalInput = Number(keys.ascend) - Number(keys.sprint);

  flightEuler.set(pitch, yaw, 0, "YXZ");
  tempForward.set(0, 0, -1).applyEuler(flightEuler).normalize();
  tempRight.set(1, 0, 0).applyAxisAngle(WORLD_UP, yaw).normalize();

  if (forwardInput !== 0) {
    desiredMove.addScaledVector(tempForward, forwardInput);
  }

  if (strafeInput !== 0) {
    desiredMove.addScaledVector(tempRight, strafeInput);
  }

  if (verticalInput !== 0) {
    desiredMove.y += verticalInput;
  }

  if (desiredMove.lengthSq() > 0) {
    desiredMove.normalize();
    player.position.addScaledVector(desiredMove, FLY_SPEED * delta);
  }

  clampPlayerToWorldBounds(WORLD_EDGE_MARGIN);
  player.velocity.set(0, 0, 0);
  player.grounded = false;
}

function updatePlayerInWater(delta, groundY, waterState) {
  const canFloat = waterState.depth > WATER_MIN_FLOAT_DEPTH || player.position.y > groundY + 0.2;
  const floatTargetY = waterState.surfaceY + WATER_FLOAT_OFFSET;

  player.velocity.y -= GRAVITY * delta * 0.14;
  if (keys.ascend) {
    player.velocity.y += WATER_SWIM_UP_ACCEL * delta;
  }
  if (keys.sprint) {
    player.velocity.y -= WATER_DIVE_ACCEL * delta;
  }
  if (canFloat) {
    player.velocity.y += (floatTargetY - player.position.y) * WATER_BUOYANCY * delta;
  }

  player.velocity.y = applyDrag(player.velocity.y, WATER_VERTICAL_DRAG * delta);
  player.velocity.y = THREE.MathUtils.clamp(player.velocity.y, -12, 14);
  player.position.y += player.velocity.y * delta;

  if (player.position.y <= groundY) {
    player.position.y = groundY;
    if (canFloat && waterState.submersion > 0.24) {
      player.velocity.y = Math.max(0, player.velocity.y);
      player.grounded = false;
    } else {
      player.velocity.y = 0;
      player.grounded = true;
    }
    return;
  }

  player.grounded = false;
}

function updatePlayerWaterRipples(delta, waterState) {
  waterStepRippleCooldown = Math.max(0, waterStepRippleCooldown - delta);
  const inWater = waterState.present && waterState.feetDepth > 0.12;
  const movementSpeed = Math.hypot(player.velocity.x, player.velocity.z);

  if (inWater && !wasPlayerInWater) {
    spawnWaterRipple(player.position.x, player.position.z, 0.95, 18);
    waterStepRippleCooldown = WATER_STEP_RIPPLE_INTERVAL * 0.7;
  } else if (inWater && movementSpeed > 4.2 && waterStepRippleCooldown <= 0) {
    spawnWaterRipple(
      player.position.x,
      player.position.z,
      THREE.MathUtils.clamp(movementSpeed / 18, 0.35, 1.05),
      16 + movementSpeed * 0.4,
    );
    waterStepRippleCooldown = WATER_STEP_RIPPLE_INTERVAL;
  } else if (!inWater && wasPlayerInWater) {
    spawnWaterRipple(player.position.x, player.position.z, 0.55, 14);
  }

  wasPlayerInWater = inWater;
}

function updateCamera() {
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;

  if (viewMode === "first") {
    camera.position.copy(player.position);
    camera.updateMatrixWorld();
    return;
  }

  getForwardLookTarget(cameraLookTarget, 32);
  cameraFocusPoint.set(player.position.x, player.position.y - 1.3, player.position.z);
  cameraDirection.set(0, 0, 1).applyAxisAngle(WORLD_UP, yaw).normalize();
  desiredCameraPosition.copy(cameraFocusPoint).addScaledVector(cameraDirection, THIRD_PERSON_DISTANCE);
  desiredCameraPosition.y += THIRD_PERSON_HEIGHT;

  if (isFlyMode) {
    camera.position.copy(desiredCameraPosition);
    camera.lookAt(cameraLookTarget);
    camera.updateMatrixWorld();
    return;
  }

  const groundUnderCamera = getVisibleTerrainHeight(
    desiredCameraPosition.x,
    desiredCameraPosition.z,
  ) + 1.2;
  desiredCameraPosition.y = Math.max(desiredCameraPosition.y, groundUnderCamera);

  cameraDirection.copy(desiredCameraPosition).sub(cameraFocusPoint).normalize();
  raycaster.set(cameraFocusPoint, cameraDirection);
  const maxDistance = cameraFocusPoint.distanceTo(desiredCameraPosition);
  const obstruction = raycaster
    .intersectObjects(cameraObstacleTargets, true)
    .find((hit) => hit.distance > 0.2 && hit.distance < maxDistance);

  if (obstruction) {
    camera.position.copy(cameraFocusPoint).addScaledVector(
      cameraDirection,
      Math.max(THIRD_PERSON_MIN_DISTANCE, obstruction.distance - 0.35),
    );
  } else {
    camera.position.copy(desiredCameraPosition);
  }

  camera.lookAt(cameraLookTarget);
  camera.updateMatrixWorld();
}

function updateMining(delta) {
  const locked = isPointerLocked();
  const miningHit = locked ? getCrosshairMiningHit(MINE_RANGE) : null;

  updateMiningMarker(miningHit);

  if (!locked || !isMining || !miningHit) {
    if (!isMining || !locked) {
      miningCooldown = 0;
    }
    return;
  }

  miningCooldown -= delta;
  if (miningCooldown > 0) {
    return;
  }

  applyMiningToHit(miningHit, HOLD_TERRAIN_DIG, HOLD_PROP_DAMAGE);
  miningCooldown = MINE_TICK_INTERVAL;
}

function getCrosshairHit() {
  screenRaycaster.setFromCamera(centerNdc, camera);
  return getNearestWorldHit(screenRaycaster);
}

function getCrosshairMiningHit(maxDistance) {
  const crosshairHit = getCrosshairHit();
  if (!crosshairHit) {
    return null;
  }

  if (crosshairHit.point.distanceToSquared(player.position) > maxDistance * maxDistance) {
    return null;
  }

  if (!crosshairHit.object.userData.mineableRef && !canMineTerrainAtPoint(crosshairHit.point)) {
    return null;
  }

  return crosshairHit;
}

function mineImmediately() {
  const hit = getCrosshairMiningHit(MINE_RANGE);
  if (!hit) {
    return false;
  }

  applyMiningToHit(hit, CLICK_TERRAIN_DIG, CLICK_PROP_DAMAGE, CLICK_TERRAIN_RADIUS_SCALE);
  miningCooldown = MINE_TICK_INTERVAL;
  return true;
}

function applyMiningToHit(hit, terrainAmount, propAmount, terrainRadiusScale = 1) {
  const prop = hit.object.userData.mineableRef;
  const kind = getMiningKind(hit);
  if (prop) {
    const changed = mineProp(prop, propAmount);
    if (changed) {
      spawnMiningDebris(hit.point, kind, 1);
      playMiningSound(kind);
      spawnWaterRipple(hit.point.x, hit.point.z, 0.45, 12);
    }
    return changed;
  }

  const changed = mineTerrain(hit.point, terrainAmount, terrainRadiusScale);
  if (changed) {
    spawnMiningDebris(hit.point, kind, terrainRadiusScale);
    playMiningSound(kind);
    spawnWaterRipple(hit.point.x, hit.point.z, 0.8 * terrainRadiusScale, 16 * terrainRadiusScale);
  }
  return changed;
}

function getForwardLookTarget(target, maxDistance) {
  miningOrigin.copy(player.position);
  miningDirection
    .set(0, 0, -1)
    .applyEuler(new THREE.Euler(pitch, yaw, 0, "YXZ"))
    .normalize();
  target.copy(miningOrigin).addScaledVector(miningDirection, maxDistance);
  return target;
}

function updateMiningMarker(hit) {
  if (!hit) {
    miningMarker.visible = false;
    return;
  }

  const kind = getMiningKind(hit);
  const profile = getMiningProfile(kind);
  const prop = hit.object.userData.mineableRef ?? null;
  const canMine = hit.object.userData.mineableRef
    ? true
    : canMineTerrainAtPoint(hit.point);
  const holdProgress = isMining
    ? THREE.MathUtils.clamp(1 - miningCooldown / MINE_TICK_INTERVAL, 0, 1)
    : 0;
  const damageProgress = prop
    ? THREE.MathUtils.clamp(1 - prop.health / prop.maxHealth, 0, 1)
    : holdProgress;
  const ringPulse = 3 + holdProgress * 1.9;
  const crackScale = 2.2 + damageProgress * 1.6 + holdProgress * 0.45;
  const { core, ring, crack } = miningMarker.userData;

  miningMarker.visible = true;
  miningMarker.position.copy(hit.point);
  miningMarker.position.y += 0.2;
  core.material.color.setHex(canMine ? profile.marker : 0x9aa3aa);
  core.material.opacity = canMine ? 0.94 : 0.45;
  core.scale.setScalar(canMine ? 0.9 + holdProgress * 0.45 : 0.75);

  ring.material.color.setHex(profile.accent);
  ring.material.opacity = canMine ? 0.18 + holdProgress * 0.38 : 0.08;
  ring.scale.set(ringPulse, ringPulse, 1);

  crack.material.color.setHex(profile.marker);
  crack.material.opacity = canMine ? 0.1 + damageProgress * 0.45 + holdProgress * 0.15 : 0.05;
  crack.material.rotation = elapsed * ((kind === "rock" || kind === "stone") ? 0.22 : 0.1);
  crack.scale.set(crackScale, crackScale, 1);
}

function getMiningKind(hit) {
  const prop = hit.object.userData.mineableRef ?? null;
  return prop?.miningKind ?? prop?.type ?? "terrain";
}

function getMiningProfile(kind) {
  return MINING_PROFILE_COLORS[kind] ?? MINING_PROFILE_COLORS.terrain;
}

function updateFeedback(delta) {
  updateDebrisParticles(delta);
  updatePopTexts(delta);
}

function createDebrisPool() {
  const geometry = new THREE.OctahedronGeometry(0.16, 0);

  for (let i = 0; i < MINING_PARTICLE_POOL_SIZE; i += 1) {
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.02,
      transparent: true,
      opacity: 0,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.visible = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    scene.add(mesh);

    debrisParticles.push({
      mesh,
      velocity: new THREE.Vector3(),
      spin: new THREE.Vector3(),
      life: 0,
      maxLife: 0,
    });
  }
}

function spawnMiningDebris(point, kind, scale = 1) {
  const profile = getMiningProfile(kind);
  const count = kind === "tree" ? 7 : (kind === "rock" || kind === "stone") ? 6 : 5;
  const burstScale = THREE.MathUtils.clamp(scale, 0.45, 2.4);

  for (let i = 0; i < count; i += 1) {
    const particle = debrisParticles.find((item) => item.life <= 0);
    if (!particle) {
      return;
    }

    particle.life = 0.28 + Math.random() * 0.22;
    particle.maxLife = particle.life;
    particle.mesh.visible = true;
    particle.mesh.material.opacity = 0.92;
    particle.mesh.material.color.setHex(
      Math.random() > 0.5 ? profile.debrisA : profile.debrisB,
    );

    particle.mesh.position.copy(point);
    particle.mesh.position.x += (Math.random() - 0.5) * 1.2 * burstScale;
    particle.mesh.position.y += 0.2 + Math.random() * 0.35;
    particle.mesh.position.z += (Math.random() - 0.5) * 1.2 * burstScale;
    particle.mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    );
    particle.mesh.scale.setScalar(
      (0.16 + Math.random() * 0.16) * ((kind === "rock" || kind === "stone") ? 1.15 : 1) * burstScale,
    );

    particle.velocity.set(
      (Math.random() - 0.5) * 5.4 * burstScale,
      (kind === "tree" ? 2.6 : 1.8) + Math.random() * 2.2 * burstScale,
      (Math.random() - 0.5) * 5.4 * burstScale,
    );
    particle.spin.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    );
  }
}

function updateDebrisParticles(delta) {
  for (const particle of debrisParticles) {
    if (particle.life <= 0) {
      continue;
    }

    particle.life -= delta;
    if (particle.life <= 0) {
      particle.life = 0;
      particle.mesh.visible = false;
      continue;
    }

    particle.velocity.y -= GRAVITY * 0.62 * delta;
    particle.mesh.position.addScaledVector(particle.velocity, delta);
    particle.mesh.rotation.x += particle.spin.x * delta;
    particle.mesh.rotation.y += particle.spin.y * delta;
    particle.mesh.rotation.z += particle.spin.z * delta;

    const fade = particle.life / particle.maxLife;
    particle.mesh.material.opacity = fade * 0.9;
  }
}

function triggerBreakFeedback(prop) {
  const kind = prop.miningKind ?? prop.type;
  const origin = prop.root.position.clone();
  origin.y += Math.max(1.8, (prop.colliderHeight ?? 4.5) * 0.65);
  spawnMiningDebris(origin, kind, 2.1);
  playBreakSound(kind);
  spawnMiningPop(getMiningProfile(kind).breakText, origin, kind);
}

function spawnMiningPop(text, worldPosition, kind) {
  if (!feedbackLayer) {
    return;
  }

  const element = document.createElement("div");
  element.className = `mining-pop ${kind}`;
  element.textContent = text;
  feedbackLayer.appendChild(element);

  activePopTexts.push({
    element,
    position: worldPosition.clone(),
    velocityY: 2.8,
    life: MINING_POP_DURATION,
    maxLife: MINING_POP_DURATION,
  });
}

function updatePopTexts(delta) {
  for (let i = activePopTexts.length - 1; i >= 0; i -= 1) {
    const pop = activePopTexts[i];
    pop.life -= delta;

    if (pop.life <= 0) {
      pop.element.remove();
      activePopTexts.splice(i, 1);
      continue;
    }

    pop.position.y += pop.velocityY * delta;
    pop.velocityY = Math.max(0.7, pop.velocityY - delta * 3.2);

    projectedUiPoint.copy(pop.position).project(camera);
    if (projectedUiPoint.z > 1.2) {
      pop.element.style.opacity = "0";
      continue;
    }

    const x = (projectedUiPoint.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-projectedUiPoint.y * 0.5 + 0.5) * window.innerHeight;
    const fade = THREE.MathUtils.clamp(pop.life / pop.maxLife, 0, 1);
    const lift = (1 - fade) * 18;
    const scale = 0.86 + (1 - fade) * 0.26;

    pop.element.style.opacity = `${fade}`;
    pop.element.style.transform =
      `translate(${x}px, ${y - lift}px) translate(-50%, -50%) scale(${scale})`;
  }
}

function getNearestWorldHit(activeRaycaster) {
  const propHit = activeRaycaster.intersectObjects(mineableTargets, false)[0];
  const terrainHit = activeRaycaster.intersectObject(terrain, false)[0];

  if (!propHit) {
    return terrainHit ?? null;
  }

  if (!terrainHit) {
    return propHit;
  }

  return propHit.distance <= terrainHit.distance ? propHit : terrainHit;
}

function updateEnvironment(delta) {
  const waterSurfaceAtCamera = sampleWaterSurfaceHeight(camera.position.x, camera.position.z);
  const isUnderwater =
    Number.isFinite(waterSurfaceAtCamera) && camera.position.y < waterSurfaceAtCamera - 0.25;
  const targetBlend = isUnderwater ? 1 : 0;
  underwaterBlend = THREE.MathUtils.lerp(underwaterBlend, targetBlend, delta * 4);
  const cyclePhase = (elapsed / DAY_NIGHT_CYCLE_SECONDS) % 1;
  const airFogDensity = blendCycleNumber(cyclePhase, AIR_FOG_DENSITY, 0.00235, 0.0054);
  const ambientIntensity = blendCycleNumber(cyclePhase, 1.75, 1.08, 0.42);
  const sunIntensity = blendCycleNumber(cyclePhase, 2.0, 0.92, 0.14);
  const fillIntensity = blendCycleNumber(cyclePhase, 0.65, 0.56, 0.2);
  const sunAngle = cyclePhase * Math.PI * 2 - Math.PI * 0.38;

  blendCycleColor(cycleSkyColor, cyclePhase, AIR_SKY, EVENING_SKY, NIGHT_SKY, MORNING_SKY);
  blendCycleColor(cycleHemiColor, cyclePhase, AIR_HEMI, EVENING_HEMI, NIGHT_HEMI, MORNING_HEMI);
  blendCycleColor(cycleGroundColor, cyclePhase, AIR_GROUND, EVENING_GROUND, NIGHT_GROUND);
  blendCycleColor(cycleSunColor, cyclePhase, AIR_SUN, EVENING_SUN, NIGHT_SUN, MORNING_SUN);
  blendCycleColor(cycleFillColor, cyclePhase, AIR_FILL, EVENING_FILL, NIGHT_FILL, MORNING_FILL);
  blendCycleColor(cycleSkyTopColor, cyclePhase, DAY_SKY_TOP, EVENING_SKY_TOP, NIGHT_SKY_TOP, MORNING_SKY_TOP);
  blendCycleColor(
    cycleSkyHorizonColor,
    cyclePhase,
    DAY_SKY_HORIZON,
    EVENING_SKY_HORIZON,
    NIGHT_SKY_HORIZON,
    MORNING_SKY_HORIZON,
  );
  blendCycleColor(
    cycleSkyBottomColor,
    cyclePhase,
    DAY_SKY_BOTTOM,
    EVENING_SKY_BOTTOM,
    NIGHT_SKY_BOTTOM,
    MORNING_SKY_BOTTOM,
  );

  scene.background.copy(cycleSkyColor).lerp(UNDERWATER_SKY, underwaterBlend);
  scene.fog.color.copy(scene.background);
  scene.fog.density = THREE.MathUtils.lerp(airFogDensity, UNDERWATER_FOG_DENSITY, underwaterBlend);

  ambientLight.color.copy(cycleHemiColor).lerp(UNDERWATER_HEMI, underwaterBlend);
  ambientLight.groundColor.copy(cycleGroundColor).lerp(UNDERWATER_GROUND, underwaterBlend);
  ambientLight.intensity = THREE.MathUtils.lerp(ambientIntensity, 0.72, underwaterBlend);

  sun.color.copy(cycleSunColor).lerp(UNDERWATER_SUN, underwaterBlend);
  sun.intensity = THREE.MathUtils.lerp(sunIntensity, 0.42, underwaterBlend);
  sun.position.set(
    Math.cos(sunAngle) * 210,
    45 + Math.sin(sunAngle) * 210,
    120 + Math.sin(sunAngle * 0.72 + 0.7) * 95,
  );

  fillLight.color.copy(cycleFillColor).lerp(UNDERWATER_FILL, underwaterBlend);
  fillLight.intensity = THREE.MathUtils.lerp(fillIntensity, 0.95, underwaterBlend);
  fillLight.position.set(
    -Math.cos(sunAngle) * 160,
    90 + Math.cos(sunAngle * 0.7) * 26,
    -110 + Math.sin(sunAngle * 0.55) * 80,
  );

  skyUniforms.topColor.value.copy(cycleSkyTopColor).lerp(UNDERWATER_SKY, underwaterBlend * 0.4);
  skyUniforms.horizonColor.value
    .copy(cycleSkyHorizonColor)
    .lerp(UNDERWATER_SKY, underwaterBlend * 0.48);
  skyUniforms.bottomColor.value
    .copy(cycleSkyBottomColor)
    .lerp(UNDERWATER_SKY, underwaterBlend * 0.56);

  const shimmer = 0.08 * Math.sin(elapsed * 1.7) + 0.04 * Math.sin(elapsed * 0.73 + 1.4);
  underwaterOverlay.style.opacity = `${Math.max(0, underwaterBlend * (0.72 + shimmer))}`;
}

function updateWaterAnimation(delta) {
  for (let i = waterRipples.length - 1; i >= 0; i -= 1) {
    waterRipples[i].age += delta;
    if (waterRipples[i].age >= WATER_RIPPLE_LIFETIME) {
      waterRipples.splice(i, 1);
    }
  }

  const waterSurfaceInterval = getAdaptiveInterval(
    WATER_SURFACE_UPDATE_INTERVAL,
    WATER_SURFACE_UPDATE_INTERVAL_MID_FPS,
    WATER_SURFACE_UPDATE_INTERVAL_LOW_FPS,
  );
  if (elapsed < lastWaterSurfaceUpdateAt + waterSurfaceInterval) {
    return;
  }

  lastWaterSurfaceUpdateAt = elapsed;
  updateAnimatedWaterMesh(water);
  updateAnimatedWaterMesh(waterEdgeSkirt);
}

function hasWaterSurfaceAt(x, z, searchRadius = 0) {
  const { ix, iz } = getWaterCellAtWorldPosition(x, z);
  const cellRadius = Math.max(0, Math.ceil(searchRadius / CELL_SIZE));

  for (let dz = -cellRadius; dz <= cellRadius; dz += 1) {
    for (let dx = -cellRadius; dx <= cellRadius; dx += 1) {
      const sampleIx = THREE.MathUtils.clamp(ix + dx, 0, GRID_RESOLUTION - 1);
      const sampleIz = THREE.MathUtils.clamp(iz + dz, 0, GRID_RESOLUTION - 1);
      if (floodedWaterCells[gridCellIndex(sampleIx, sampleIz)]) {
        return true;
      }
    }
  }

  return false;
}

function sampleWaterSurfaceHeight(x, z) {
  if (!hasWaterSurfaceAt(x, z)) {
    return Number.NEGATIVE_INFINITY;
  }

  return WATER_LEVEL + sampleWaterSurfaceOffset(x, z);
}

function sampleWaterSurfaceOffset(x, z) {
  const swellA = Math.sin(x * 0.024 + elapsed * 1.45 + z * 0.006) * 0.62;
  const swellB = Math.cos(z * 0.031 - elapsed * 1.18 + x * 0.007 + 1.3) * 0.42;
  const swellC = Math.sin((x + z) * 0.018 + elapsed * 1.96) * 0.24;
  return (swellA + swellB + swellC) * WATER_SWELL_AMPLITUDE + sampleWaterRippleOffset(x, z);
}

function sampleWaterRippleOffset(x, z) {
  let rippleOffset = 0;

  for (const ripple of waterRipples) {
    const dx = x - ripple.x;
    const dz = z - ripple.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    const maxDistance = ripple.radius + ripple.age * 8.5;
    if (distance > maxDistance) {
      continue;
    }

    const envelope = 1 - ripple.age / WATER_RIPPLE_LIFETIME;
    const travel = distance * 0.48 - ripple.age * 8.6;
    const decay = Math.exp(-distance * 0.08) * envelope * envelope;
    rippleOffset += Math.sin(travel) * decay * ripple.strength;
  }

  return THREE.MathUtils.clamp(rippleOffset, -1.1, 1.1);
}

function sampleWaterCurrent(x, z, target) {
  const flowX = Math.cos(z * 0.015 - elapsed * 0.72 + x * 0.002) * 0.72
    + Math.sin((x + z) * 0.011 + elapsed * 0.48) * 0.35;
  const flowZ = Math.sin(x * 0.017 + elapsed * 0.84 - z * 0.004) * 0.66
    + Math.cos((x - z) * 0.013 - elapsed * 0.52) * 0.38;
  return target.set(flowX, 0, flowZ);
}

function getWaterState(x, z, feetY = player.position.y - EYE_HEIGHT) {
  if (!hasWaterSurfaceAt(x, z, CELL_SIZE * 0.2)) {
    return {
      present: false,
      surfaceY: Number.NEGATIVE_INFINITY,
      depth: 0,
      feetDepth: 0,
      submersion: 0,
    };
  }

  const terrainY = sampleTerrainHeight(x, z);
  const surfaceY = WATER_LEVEL + sampleWaterSurfaceOffset(x, z);
  const depth = Math.max(0, surfaceY - terrainY);
  const feetDepth = surfaceY - feetY;

  return {
    present: depth > 0.08,
    surfaceY,
    depth,
    feetDepth,
    submersion: THREE.MathUtils.clamp(feetDepth / (EYE_HEIGHT * 0.72), 0, 1),
  };
}

function getWaterCellAtWorldPosition(x, z) {
  const localX = THREE.MathUtils.clamp((x + HALF_WORLD) / CELL_SIZE, 0, GRID_RESOLUTION - 0.00001);
  const localZ = THREE.MathUtils.clamp((z + HALF_WORLD) / CELL_SIZE, 0, GRID_RESOLUTION - 0.00001);
  return {
    ix: Math.floor(localX),
    iz: Math.floor(localZ),
  };
}

function spawnWaterRipple(x, z, strength = 1, radius = 18) {
  if (!hasWaterSurfaceAt(x, z, 1.15)) {
    return false;
  }

  if (waterRipples.length >= MAX_WATER_RIPPLES) {
    waterRipples.shift();
  }

  waterRipples.push({
    x,
    z,
    age: 0,
    strength,
    radius,
  });
  return true;
}

function registerAnimatedWaterGeometry(mesh, geometry, waveWeights = null) {
  mesh.geometry.dispose();
  mesh.geometry = geometry;

  const positionAttribute = geometry.getAttribute("position");
  if (!positionAttribute) {
    mesh.visible = false;
    mesh.userData.basePositions = null;
    mesh.userData.waveWeights = null;
    return;
  }

  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  mesh.visible = true;
  mesh.userData.basePositions = new Float32Array(positionAttribute.array);
  mesh.userData.waveWeights = waveWeights
    ? new Float32Array(waveWeights)
    : new Float32Array(positionAttribute.count).fill(1);
  mesh.userData.lastNormalUpdateAt = Number.NEGATIVE_INFINITY;
  updateAnimatedWaterMesh(mesh);
}

function updateAnimatedWaterMesh(mesh) {
  if (!mesh.visible) {
    return;
  }

  const positionAttribute = mesh.geometry.getAttribute("position");
  const basePositions = mesh.userData.basePositions;
  const waveWeights = mesh.userData.waveWeights;
  if (!positionAttribute || !basePositions || !waveWeights) {
    return;
  }

  const positions = positionAttribute.array;
  for (let i = 0, offset = 0; i < waveWeights.length; i += 1, offset += 3) {
    positions[offset] = basePositions[offset];
    positions[offset + 2] = basePositions[offset + 2];
    positions[offset + 1] =
      basePositions[offset + 1]
      + sampleWaterSurfaceOffset(basePositions[offset], basePositions[offset + 2]) * waveWeights[i];
  }

  positionAttribute.needsUpdate = true;
  const normalUpdateInterval = getAdaptiveInterval(
    WATER_NORMAL_UPDATE_INTERVAL,
    WATER_NORMAL_UPDATE_INTERVAL_MID_FPS,
    WATER_NORMAL_UPDATE_INTERVAL_LOW_FPS,
  );
  if (elapsed >= (mesh.userData.lastNormalUpdateAt ?? Number.NEGATIVE_INFINITY) + normalUpdateInterval) {
    mesh.geometry.computeVertexNormals();
    if (mesh.geometry.attributes.normal) {
      mesh.geometry.attributes.normal.needsUpdate = true;
    }
    mesh.userData.lastNormalUpdateAt = elapsed;
  }
}

function blendCycleColor(target, phase, dayColor, eveningColor, nightColor, morningColor = dayColor) {
  if (phase < 0.12) {
    return target.copy(morningColor).lerp(dayColor, smoothstep(0, 0.12, phase));
  }

  if (phase < 0.32) {
    return target.copy(dayColor);
  }

  if (phase < 0.58) {
    return target.copy(dayColor).lerp(eveningColor, smoothstep(0.32, 0.58, phase));
  }

  if (phase < 0.9) {
    return target.copy(eveningColor).lerp(nightColor, smoothstep(0.58, 0.9, phase));
  }

  if (phase < 0.94) {
    return target.copy(nightColor);
  }

  return target.copy(nightColor).lerp(morningColor, smoothstep(0.94, 1, phase));
}

function blendCycleNumber(phase, dayValue, eveningValue, nightValue) {
  if (phase < 0.32) {
    return dayValue;
  }

  if (phase < 0.58) {
    return THREE.MathUtils.lerp(dayValue, eveningValue, smoothstep(0.32, 0.58, phase));
  }

  if (phase < 0.9) {
    return THREE.MathUtils.lerp(eveningValue, nightValue, smoothstep(0.58, 0.9, phase));
  }

  if (phase < 0.97) {
    return nightValue;
  }

  return THREE.MathUtils.lerp(nightValue, dayValue, smoothstep(0.97, 1, phase));
}

function attemptHorizontalMove(moveX, moveZ, respectTerrainSteps) {
  const steps = Math.max(1, Math.ceil(Math.hypot(moveX, moveZ) / MOVE_SUBSTEP));
  const stepX = moveX / steps;
  const stepZ = moveZ / steps;

  for (let i = 0; i < steps; i += 1) {
    tryMoveAxis(stepX, 0, respectTerrainSteps);
    tryMoveAxis(0, stepZ, respectTerrainSteps);
  }
}

function tryMoveAxis(deltaX, deltaZ, respectTerrainSteps) {
  if (deltaX === 0 && deltaZ === 0) {
    return;
  }

  const startX = player.position.x;
  const startZ = player.position.z;
  const nextX = THREE.MathUtils.clamp(startX + deltaX, -HALF_WORLD + 2, HALF_WORLD - 2);
  const nextZ = THREE.MathUtils.clamp(startZ + deltaZ, -HALF_WORLD + 2, HALF_WORLD - 2);

  if (respectTerrainSteps) {
    const startGround = getVisibleTerrainHeight(startX, startZ);
    const nextGround = getVisibleTerrainHeight(nextX, nextZ);
    if (nextGround - startGround > MAX_STEP_HEIGHT) {
      if (deltaX !== 0) {
        player.velocity.x = 0;
      }
      if (deltaZ !== 0) {
        player.velocity.z = 0;
      }
      return;
    }
  }

  if (collidesWithProp(nextX, nextZ)) {
    if (deltaX !== 0) {
      player.velocity.x = 0;
    }
    if (deltaZ !== 0) {
      player.velocity.z = 0;
    }
    return;
  }

  player.position.x = nextX;
  player.position.z = nextZ;
}

function collidesWithProp(x, z) {
  const playerFeetY = player.position.y - EYE_HEIGHT;

  for (const prop of props) {
    if (!prop.active) {
      continue;
    }

    const dx = x - prop.x;
    const dz = z - prop.z;
    const minimumDistance = PLAYER_RADIUS + prop.colliderRadius;
    if (dx * dx + dz * dz < minimumDistance * minimumDistance) {
      const stepAllowance = prop.walkableSurface ? MAX_STEP_HEIGHT : SMALL_ROCK_JUMP_CLEARANCE;
      if (
        ((prop.type === "rock" && prop.jumpable)
          || prop.walkableSurface)
        && playerFeetY >= prop.root.position.y + prop.colliderHeight - stepAllowance
      ) {
        continue;
      }
      return true;
    }
  }

  return false;
}

function mineTerrain(point, digAmount, radiusScale = 1) {
  let changed = false;
  const removedVolumes = {};
  let removedCoalVolume = 0;
  const digRadius = DIG_RADIUS * radiusScale;
  const digRadiusSquared = digRadius * digRadius;
  const { minIx, maxIx, minIz, maxIz } = getTerrainDigBounds(point, digRadius);
  const smoothingRadius = digRadius * 1.22;
  const smoothingRadiusSquared = smoothingRadius * smoothingRadius;

  for (let iz = minIz; iz <= maxIz; iz += 1) {
    const z = gridToWorldZ(iz);

    for (let ix = minIx; ix <= maxIx; ix += 1) {
      const x = gridToWorldX(ix);
      const dx = x - point.x;
      const dz = z - point.z;
      const distanceSquared = dx * dx + dz * dz;

      if (distanceSquared > digRadiusSquared) {
        continue;
      }

      const index = gridIndex(ix, iz);
      const currentHeight = terrainHeights[index];
      const currentDigDepth = baseTerrainHeights[index] - currentHeight;
      const normalizedDistance = Math.sqrt(distanceSquared) / digRadius;
      const falloff = smoothstep(1, 0, normalizedDistance);
      const nextHeight = Math.max(WORLD_FLOOR, currentHeight - digAmount * falloff);

      if (nextHeight === currentHeight) {
        continue;
      }

      const removedAmount = currentHeight - nextHeight;
      const harvestItem = classifyTerrainHarvest(currentHeight, currentDigDepth);
      if (harvestItem) {
        removedVolumes[harvestItem] = (removedVolumes[harvestItem] ?? 0) + removedAmount;
      }
      if (currentDigDepth > 7.5) {
        removedCoalVolume += removedAmount;
      }
      terrainHeights[index] = nextHeight;
      changed = true;
    }
  }

  if (!changed) {
    return false;
  }

  smoothTerrainPatch(point, minIx, maxIx, minIz, maxIz, smoothingRadiusSquared, digAmount * 0.42);
  rebuildTerrainSurface();
  rebuildWaterSurface();
  rebuildWorldBoundarySkirts();
  syncNearbyProps(point.x, point.z, digRadius + 18);

  const rewardPosition = point.clone();
  rewardPosition.y += 1.4;
  for (const [itemKey, volume] of Object.entries(removedVolumes)) {
    const amount = Math.floor(volume / getHarvestVolumeForItem(itemKey));
    if (amount > 0) {
      grantItem(itemKey, amount, rewardPosition);
    }
  }

  const coalReward = Math.floor(removedCoalVolume / 18);
  if (coalReward > 0) {
    grantItem("coal", coalReward, rewardPosition);
  }

  return true;
}

function classifyTerrainHarvest(height, digDepth) {
  if (digDepth > 12) {
    return "slate";
  }
  if (digDepth > 4.2) {
    return "stone";
  }
  if (height < WATER_LEVEL + 1.2) {
    return "sand";
  }
  if (height > 78) {
    return "snow";
  }
  if (height < 20) {
    return "grass";
  }
  return "dirt";
}

function getHarvestVolumeForItem(itemKey) {
  if (itemKey === "sand" || itemKey === "snow") {
    return 8;
  }
  if (itemKey === "grass") {
    return 9;
  }
  if (itemKey === "stone" || itemKey === "slate") {
    return 11;
  }
  return 10;
}

function getStoneVolumeRemoved(index, startHeight, endHeight) {
  const stoneCeiling = baseTerrainHeights[index] - STONE_LAYER_DEPTH;
  return Math.max(0, Math.min(startHeight, stoneCeiling) - endHeight);
}

function smoothTerrainPatch(point, minIx, maxIx, minIz, maxIz, smoothingRadiusSquared, strength) {
  const smoothedHeights = new Float32Array(terrainHeights);
  const expandedMinIx = Math.max(1, minIx - 1);
  const expandedMaxIx = Math.min(GRID_WIDTH - 2, maxIx + 1);
  const expandedMinIz = Math.max(1, minIz - 1);
  const expandedMaxIz = Math.min(GRID_WIDTH - 2, maxIz + 1);

  for (let iz = expandedMinIz; iz <= expandedMaxIz; iz += 1) {
    const z = gridToWorldZ(iz);

    for (let ix = expandedMinIx; ix <= expandedMaxIx; ix += 1) {
      const x = gridToWorldX(ix);
      const dx = x - point.x;
      const dz = z - point.z;
      const distanceSquared = dx * dx + dz * dz;

      if (distanceSquared > smoothingRadiusSquared) {
        continue;
      }

      const index = gridIndex(ix, iz);
      const neighborAverage = (
        terrainHeights[gridIndex(ix - 1, iz)] +
        terrainHeights[gridIndex(ix + 1, iz)] +
        terrainHeights[gridIndex(ix, iz - 1)] +
        terrainHeights[gridIndex(ix, iz + 1)] +
        terrainHeights[index]
      ) / 5;

      const blend = smoothstep(smoothingRadiusSquared, 0, distanceSquared) * strength;
      const maxBlend = THREE.MathUtils.clamp(blend, 0, 0.45);
      smoothedHeights[index] = THREE.MathUtils.lerp(
        terrainHeights[index],
        Math.max(WORLD_FLOOR, neighborAverage),
        maxBlend,
      );
    }
  }

  terrainHeights.set(smoothedHeights);
}

function canMineTerrainAtPoint(point) {
  const digRadiusSquared = DIG_RADIUS * DIG_RADIUS;
  const { minIx, maxIx, minIz, maxIz } = getTerrainDigBounds(point);

  for (let iz = minIz; iz <= maxIz; iz += 1) {
    const z = gridToWorldZ(iz);

    for (let ix = minIx; ix <= maxIx; ix += 1) {
      const x = gridToWorldX(ix);
      const dx = x - point.x;
      const dz = z - point.z;

      if (dx * dx + dz * dz > digRadiusSquared) {
        continue;
      }

      if (terrainHeights[gridIndex(ix, iz)] > WORLD_FLOOR + TERRAIN_MINE_EPSILON) {
        return true;
      }
    }
  }

  return false;
}

function getTerrainDigBounds(point, radius = DIG_RADIUS) {
  return {
    minIx: THREE.MathUtils.clamp(
      Math.floor((point.x - radius + HALF_WORLD) / CELL_SIZE),
      0,
      GRID_WIDTH - 1,
    ),
    maxIx: THREE.MathUtils.clamp(
      Math.ceil((point.x + radius + HALF_WORLD) / CELL_SIZE),
      0,
      GRID_WIDTH - 1,
    ),
    minIz: THREE.MathUtils.clamp(
      Math.floor((point.z - radius + HALF_WORLD) / CELL_SIZE),
      0,
      GRID_WIDTH - 1,
    ),
    maxIz: THREE.MathUtils.clamp(
      Math.ceil((point.z + radius + HALF_WORLD) / CELL_SIZE),
      0,
      GRID_WIDTH - 1,
    ),
  };
}

function mineProp(prop, damageAmount) {
  if (!prop.active) {
    return false;
  }

  if (prop.type === "pig") {
    prop.fleeTimer = 3.2;
  }

  prop.health -= damageAmount;
  const remaining = THREE.MathUtils.clamp(prop.health / prop.maxHealth, 0, 1);
  const visibleScale = prop.baseScale * (0.38 + remaining * 0.62);
  prop.root.scale.setScalar(visibleScale);

  if (prop.health <= 0) {
    const rewardPosition = prop.root.position.clone();
    rewardPosition.y += Math.max(1.1, (prop.colliderHeight ?? 1) * 0.6);
    triggerBreakFeedback(prop);
    if (prop.type === "tree") {
      grantPlanks(Math.max(2, Math.round(2 + prop.baseScale * 3.2)), rewardPosition);
      grantItem("leaf", Math.max(1, Math.round(prop.baseScale * 1.4)), rewardPosition);
    } else if (prop.type === "rock") {
      grantStones(Math.max(1, Math.round(1 + prop.baseScale * 2.1)), rewardPosition);
    } else if (prop.type === "pig") {
      grantItem("rawPork", prop.rewardAmount ?? 2, rewardPosition);
    } else if (prop.inventoryReward) {
      grantItem(prop.inventoryReward, 1, rewardPosition);
    }
    removeProp(prop);
  }

  return true;
}

function removeProp(prop) {
  if (!prop.active) {
    return;
  }

  prop.active = false;
  const obstacleIndex = cameraObstacleTargets.indexOf(prop.root);
  if (obstacleIndex >= 0) {
    cameraObstacleTargets.splice(obstacleIndex, 1);
  }
  for (const target of prop.targets) {
    const index = mineableTargets.indexOf(target);
    if (index >= 0) {
      mineableTargets.splice(index, 1);
    }
  }
  if (prop.supportSurface) {
    const supportIndex = groundSupportTargets.indexOf(prop.supportSurface);
    if (supportIndex >= 0) {
      groundSupportTargets.splice(supportIndex, 1);
    }
  }
  scene.remove(prop.root);
}

function regenerateWorld(nextSeed = createRandomSeed()) {
  worldSeed = nextSeed;
  worldProfile = createWorldProfile(worldSeed);
  clearTransientWorldState();
  hasBackpack = false;
  for (const key of SURVIVAL_ITEM_ORDER) {
    setItemCount(key, 0);
  }
  equippedGear = null;
  player.health = player.maxHealth;
  clearWorldProps();
  clearWorldCaves();
  generateTerrain();
  buildWaterSources();
  generateCaves();
  rebuildTerrainSurface();
  rebuildWaterSurface();
  rebuildWorldBoundarySkirts();
  populateProps();
  buildCaveStructures();
  movePlayerToSpawn(findSpawnPoint());
  updateSeedLabel();
  updateCamera();
  updateResourceLabels();
}

function clearTransientWorldState() {
  isMining = false;
  miningCooldown = 0;
  miningMarker.visible = false;
  waterRipples.length = 0;
  waterStepRippleCooldown = 0;
  wasPlayerInWater = false;

  for (const pop of activePopTexts) {
    pop.element.remove();
  }
  activePopTexts.length = 0;

  for (const particle of debrisParticles) {
    particle.life = 0;
    particle.maxLife = 0;
    particle.mesh.visible = false;
    particle.mesh.material.opacity = 0;
  }
}

function clearWorldProps() {
  for (const prop of props) {
    scene.remove(prop.root);
  }

  props.length = 0;
  mineableTargets.length = 0;
  cameraObstacleTargets.length = 0;
  groundSupportTargets.length = 0;
  cameraObstacleTargets.push(terrain);
  cameraObstacleTargets.push(terrainEdgeSkirt);
  groundSupportTargets.push(terrain);
}

function clearWorldCaves() {
  for (const cave of caves) {
    if (cave.structureRoot) {
      scene.remove(cave.structureRoot);
      const obstacleIndex = cameraObstacleTargets.indexOf(cave.structureRoot);
      if (obstacleIndex >= 0) {
        cameraObstacleTargets.splice(obstacleIndex, 1);
      }
    }
  }
  caves.length = 0;
}

function movePlayerToSpawn(point) {
  player.position.set(
    point.x,
    getVisibleTerrainHeight(point.x, point.z) + EYE_HEIGHT,
    point.z,
  );
  player.velocity.set(0, 0, 0);
  player.grounded = true;
  updateCoordsLabel();
}

function toggleFlyMode() {
  isFlyMode = !isFlyMode;
  player.velocity.set(0, 0, 0);

  if (isFlyMode) {
    player.grounded = false;
  } else {
    clampPlayerToWorldBounds(WORLD_EDGE_MARGIN);
    const groundY = getVisibleTerrainHeight(player.position.x, player.position.z) + EYE_HEIGHT;
    if (player.position.y <= groundY) {
      player.position.y = groundY;
      player.grounded = true;
    } else {
      player.grounded = false;
    }
  }

  updateCoordsLabel();
}

function clampPlayerToWorldBounds(margin = PLAYER_RADIUS) {
  const maxCoordinate = HALF_WORLD - margin;
  player.position.x = THREE.MathUtils.clamp(player.position.x, -maxCoordinate, maxCoordinate);
  player.position.z = THREE.MathUtils.clamp(player.position.z, -maxCoordinate, maxCoordinate);
}

function updateCoordsLabel(force = false) {
  if (!coordsLabel) {
    return;
  }

  if (!force && elapsed < lastCoordsUpdateAt + COORDS_UPDATE_INTERVAL) {
    return;
  }

  lastCoordsUpdateAt = elapsed;
  const nextCoordsText =
    `x: ${player.position.x.toFixed(1)} ` +
    `z: ${player.position.z.toFixed(1)} ` +
    `h: ${(getVisibleTerrainHeight(player.position.x, player.position.z)).toFixed(1)}` +
    (isFlyMode ? " fly" : "");

  if (coordsLabel.textContent !== nextCoordsText) {
    coordsLabel.textContent = nextCoordsText;
  }
}

function updateSeedLabel() {
  if (!seedValueLabel) {
    return;
  }

  seedValueLabel.textContent = worldSeed.toFixed(3);
}

function getItemCount(key) {
  return inventoryCounts[key] ?? 0;
}

function getItemCapacity(key) {
  if (key === "backpack" || key === "gearBoots") {
    return 1;
  }

  return hasBackpack ? BACKPACK_ITEM_CAPACITY : DEFAULT_ITEM_CAPACITY;
}

function setItemCount(key, amount) {
  if (!(key in inventoryCounts)) {
    return;
  }

  inventoryCounts[key] = THREE.MathUtils.clamp(Math.floor(amount), 0, getItemCapacity(key));
  if (key === "backpack") {
    hasBackpack = inventoryCounts[key] > 0;
  }
}

function hasItems(costs) {
  return Object.entries(costs).every(([key, amount]) => getItemCount(key) >= amount);
}

function grantItem(key, amount, worldPosition = null) {
  if (amount <= 0 || !(key in ITEM_DEFINITIONS)) {
    return;
  }

  setItemCount(key, getItemCount(key) + amount);
  updateResourceLabels();

  if (worldPosition) {
    const definition = ITEM_DEFINITIONS[key];
    spawnMiningPop(
      `+${amount} ${definition.label.toLowerCase()}`,
      worldPosition,
      definition.kind,
    );
  }
}

function spendItem(key, amount) {
  if (getItemCount(key) < amount) {
    return false;
  }

  setItemCount(key, getItemCount(key) - amount);
  updateResourceLabels();
  return true;
}

function spendItems(costs) {
  if (!hasItems(costs)) {
    return false;
  }

  for (const [key, amount] of Object.entries(costs)) {
    setItemCount(key, getItemCount(key) - amount);
  }
  updateResourceLabels();
  return true;
}

function formatRecipeCosts(costs) {
  return Object.entries(costs)
    .map(([key, amount]) => `${amount} ${ITEM_DEFINITIONS[key].label}`)
    .join(" • ");
}

function updatePlankCountLabel() {
  if (plankValueLabel) {
    plankValueLabel.textContent = `${getItemCount("plank")}`;
  }
}

function updateStoneCountLabel() {
  if (stoneValueLabel) {
    stoneValueLabel.textContent = `${getItemCount("stone")}`;
  }
}

function updateHealthLabel() {
  if (healthValueLabel) {
    healthValueLabel.textContent = `${Math.round(player.health)}`;
  }
}

function updateGearLabel() {
  if (!gearValueLabel) {
    return;
  }

  const labels = [];
  if (equippedGear === "gearBoots") {
    labels.push("Safety Boots");
  }
  if (hasBackpack) {
    labels.push("Backpack");
  }

  gearValueLabel.textContent = labels.length > 0 ? labels.join(" + ") : "None";
}

function getNearbyStations() {
  let crafting = false;
  let furnace = false;

  for (const prop of props) {
    if (!prop.active || !prop.stationType) {
      continue;
    }

    const dx = prop.x - player.position.x;
    const dz = prop.z - player.position.z;
    if (dx * dx + dz * dz > STATION_USE_RADIUS * STATION_USE_RADIUS) {
      continue;
    }

    if (prop.stationType === "crafting_table") {
      crafting = true;
    } else if (prop.stationType === "furnace") {
      furnace = true;
    }
  }

  return { crafting, furnace };
}

function getNearbyStationsCached(force = false) {
  const movedX = player.position.x - cachedNearbyStations.x;
  const movedZ = player.position.z - cachedNearbyStations.z;
  const movedEnough =
    movedX * movedX + movedZ * movedZ >
    STATION_SCAN_MOVE_THRESHOLD * STATION_SCAN_MOVE_THRESHOLD;

  if (!force && elapsed < lastStationScanAt + STATION_SCAN_INTERVAL && !movedEnough) {
    cachedNearbyStations.changed = false;
    return cachedNearbyStations;
  }

  const nearby = getNearbyStations();
  cachedNearbyStations.changed =
    nearby.crafting !== cachedNearbyStations.crafting
    || nearby.furnace !== cachedNearbyStations.furnace;
  cachedNearbyStations.crafting = nearby.crafting;
  cachedNearbyStations.furnace = nearby.furnace;
  cachedNearbyStations.x = player.position.x;
  cachedNearbyStations.z = player.position.z;
  lastStationScanAt = elapsed;
  return cachedNearbyStations;
}

function updateStationHud(force = false) {
  const nearby = getNearbyStationsCached(force);
  if (stationValueLabel) {
    const stationLabel = nearby.crafting && nearby.furnace
      ? "Table + Furnace"
      : nearby.crafting
        ? "Crafting Table"
        : nearby.furnace
          ? "Furnace"
          : "None";
    if (stationValueLabel.textContent !== stationLabel) {
      stationValueLabel.textContent = stationLabel;
    }
  }

  if (stationSummary) {
    const summaryText = gameMode === "creative"
      ? "Creative mode bypasses all station and inventory requirements."
      : nearby.crafting && nearby.furnace
        ? "Crafting table and furnace are both in range."
        : nearby.crafting
          ? "Crafting table in range. Furnace recipes still need a furnace."
          : nearby.furnace
            ? "Furnace in range. Advanced crafting still needs a crafting table."
            : "No stations nearby. Craft a table first, then a furnace.";
    if (stationSummary.textContent !== summaryText) {
      stationSummary.textContent = summaryText;
    }
  }

  if (isSurvivalPanelOpen && nearby.changed && !force) {
    renderSurvivalPanel(true);
  }

  return nearby;
}

function updateModeLabel() {
  if (modeToggleButton) {
    const nextLabel = gameMode === "creative" ? "Creative" : "Survival";
    if (modeToggleButton.textContent !== nextLabel) {
      modeToggleButton.textContent = nextLabel;
    }
  }
}

function updateInventoryCompact() {
  if (!inventoryCompact) {
    return;
  }

  const visibleKeys = SURVIVAL_ITEM_ORDER.filter((key) => getItemCount(key) > 0).slice(0, 8);
  const signature = `${gameMode}|${visibleKeys.map((key) => `${key}:${getItemCount(key)}`).join("|")}`;
  if (signature === inventoryCompactSignature) {
    return;
  }
  inventoryCompactSignature = signature;
  inventoryCompact.textContent = "";

  for (const key of visibleKeys) {
    const chip = document.createElement("span");
    chip.className = "inventory-chip";
    chip.textContent = `${ITEM_DEFINITIONS[key].label} ${getItemCount(key)}`;
    inventoryCompact.appendChild(chip);
  }

  if (gameMode === "creative") {
    const chip = document.createElement("span");
    chip.className = "inventory-chip";
    chip.textContent = "Unlimited Build";
    inventoryCompact.appendChild(chip);
  }
}

function getInventoryBarEntries() {
  const visibleEntries = [];

  for (const key of SURVIVAL_ITEM_ORDER) {
    const count = getItemCount(key);
    if (count <= 0) {
      continue;
    }

    const definition = buildBlockCatalog.find((blockDefinition) => blockDefinition.inventoryReward === key);
    visibleEntries.push({
      key,
      count,
      buildId: definition?.id ?? null,
      active: definition?.id === selectedBuildMaterial,
    });
  }

  return visibleEntries;
}

function selectInventoryBarSlot(slotIndex) {
  if (!Number.isInteger(slotIndex) || slotIndex < 0) {
    return false;
  }

  const visibleEntries = getInventoryBarEntries();
  const entry = visibleEntries[slotIndex];
  if (!entry?.buildId) {
    return false;
  }

  selectBuildMaterial(entry.buildId);
  return true;
}

function renderInventoryBar() {
  if (!inventoryBar) {
    return;
  }

  const visibleEntries = getInventoryBarEntries();
  const signature = `${gameMode}|${visibleEntries.map((entry) => `${entry.key}:${entry.count}:${entry.active ? 1 : 0}`).join("|")}`;
  if (signature === inventoryBarSignature) {
    return;
  }

  inventoryBarSignature = signature;
  inventoryBar.textContent = "";

  const fragment = document.createDocumentFragment();
  for (const [index, entry] of visibleEntries.entries()) {
    const slot = document.createElement("div");
    slot.className = `inventory-slot${entry.active ? " active" : ""}`;

    const slotIndex = document.createElement("div");
    slotIndex.className = "inventory-slot-index";
    slotIndex.textContent = index < 9 ? `${index + 1}` : "";

    const name = document.createElement("div");
    name.className = "inventory-slot-name";
    name.textContent = ITEM_DEFINITIONS[entry.key].label;

    const count = document.createElement("div");
    count.className = "inventory-slot-count";
    count.textContent = `${entry.count}`;

    const meta = document.createElement("div");
    meta.className = "inventory-slot-meta";
    meta.textContent = entry.active
      ? "Selected"
      : `Cap ${getItemCapacity(entry.key)}`;

    slot.append(slotIndex, name, count, meta);
    fragment.appendChild(slot);
  }

  if (visibleEntries.length === 0) {
    const slot = document.createElement("div");
    slot.className = "inventory-slot";
    const name = document.createElement("div");
    name.className = "inventory-slot-name";
    name.textContent = gameMode === "creative" ? "Creative" : "Inventory";
    const count = document.createElement("div");
    count.className = "inventory-slot-count";
    count.textContent = gameMode === "creative" ? "Unlimited" : "Empty";
    const meta = document.createElement("div");
    meta.className = "inventory-slot-meta";
    meta.textContent = gameMode === "creative" ? "Build freely" : "Mine to gather";
    slot.append(name, count, meta);
    fragment.appendChild(slot);
  }

  inventoryBar.appendChild(fragment);
}

function renderInventoryList() {
  if (!inventoryList) {
    return;
  }

  const visibleEntries = [];
  for (const key of SURVIVAL_ITEM_ORDER) {
    const count = getItemCount(key);
    if (count <= 0 && key !== "plank" && key !== "stone" && key !== "cookedPork") {
      continue;
    }
    visibleEntries.push([key, count]);
  }

  const signature = visibleEntries.map(([key, count]) => `${key}:${count}`).join("|");
  if (signature === inventoryListSignature) {
    return;
  }
  inventoryListSignature = signature;
  inventoryList.textContent = "";

  const fragment = document.createDocumentFragment();
  for (const [key, count] of visibleEntries) {
    const row = document.createElement("div");
    row.className = "inventory-item";
    const name = document.createElement("span");
    name.className = "inventory-item-name";
    name.textContent = ITEM_DEFINITIONS[key].label;
    const value = document.createElement("span");
    value.className = "inventory-item-count";
    value.textContent = `${count}`;
    row.append(name, value);
    fragment.appendChild(row);
  }
  inventoryList.appendChild(fragment);
}

function canUseRecipeStation(station, nearby = getNearbyStationsCached()) {
  if (gameMode === "creative" || station === "none") {
    return true;
  }

  return station === "crafting_table" ? nearby.crafting : nearby.furnace;
}

function craftRecipe(recipe, type) {
  const nearby = getNearbyStationsCached(true);
  if (gameMode !== "creative") {
    const needsStation = type === "furnace" ? "furnace" : recipe.station;
    if (!canUseRecipeStation(needsStation, nearby)) {
      const messagePoint = player.position.clone();
      messagePoint.y -= 1.6;
      spawnMiningPop("need station", messagePoint, type === "furnace" ? "stone" : "plank");
      return false;
    }
    if (!spendItems(recipe.costs)) {
      const messagePoint = player.position.clone();
      messagePoint.y -= 1.6;
      spawnMiningPop("need items", messagePoint, type === "furnace" ? "stone" : "plank");
      return false;
    }
  }

  for (const [key, amount] of Object.entries(recipe.output)) {
    grantItem(key, amount);
  }
  if (recipe.autoEquip) {
    equippedGear = recipe.autoEquip;
  }
  if (recipe.unlockBackpack) {
    hasBackpack = true;
    setItemCount("backpack", 1);
  }

  updateResourceLabels();
  return true;
}

function renderRecipeCards(recipes, target, type, nearby) {
  if (!target) {
    return;
  }

  const signature = `${gameMode}|${recipes.map((recipe) => (
    `${recipe.id}:${hasItems(recipe.costs) ? 1 : 0}:${canUseRecipeStation(type === "furnace" ? "furnace" : recipe.station, nearby) ? 1 : 0}`
  )).join("|")}`;
  if (target.dataset.signature === signature) {
    return;
  }
  target.dataset.signature = signature;
  target.textContent = "";

  for (const recipe of recipes) {
    const card = document.createElement("div");
    card.className = "recipe-card";
    const heading = document.createElement("h4");
    heading.textContent = recipe.label;
    const description = document.createElement("p");
    description.textContent = recipe.description;
    const cost = document.createElement("div");
    cost.className = "recipe-cost";
    cost.textContent = formatRecipeCosts(recipe.costs);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recipe-action";
    button.textContent = type === "furnace" ? "Smelt" : "Craft";
    button.disabled = gameMode !== "creative"
      && (!hasItems(recipe.costs) || !canUseRecipeStation(type === "furnace" ? "furnace" : recipe.station, nearby));
    button.addEventListener("click", () => {
      if (craftRecipe(recipe, type)) {
        renderSurvivalPanel(true);
      }
    });
    card.append(heading, description, cost, button);
    target.appendChild(card);
  }
}

function renderSurvivalPanel(force = false) {
  if (!isSurvivalPanelOpen && !force) {
    return;
  }

  const nearby = updateStationHud(true);
  renderInventoryList();
  renderRecipeCards(craftingRecipes, craftingGrid, "crafting", nearby);
  renderRecipeCards(furnaceRecipes, furnaceGrid, "furnace", nearby);
}

function updateResourceLabels() {
  updatePlankCountLabel();
  updateStoneCountLabel();
  updateHealthLabel();
  updateGearLabel();
  updateModeLabel();
  updateInventoryCompact();
  renderInventoryBar();
  if (isSurvivalPanelOpen) {
    renderSurvivalPanel(true);
  }
  updateHeldBuildItem();
}

function grantPlanks(amount, worldPosition = null) {
  grantItem("plank", amount, worldPosition);
}

function spendPlanks(amount) {
  return spendItem("plank", amount);
}

function grantStones(amount, worldPosition = null) {
  grantItem("stone", amount, worldPosition);
}

function spendStones(amount) {
  return spendItem("stone", amount);
}

function updateHeldBuildItem() {
  const canShow = viewMode === "first" && isPointerLocked();
  const definition = getSelectedBuildDefinition();
  applyHeldPaletteBlockDefinition(definition);
  setHeldItemState(heldPaletteBlock, canShow);
}

function updateBuildBlockPhysics(delta) {
  blockPhysicsAccumulator += delta;
  const updateInterval = getAdaptiveInterval(
    BLOCK_PHYSICS_UPDATE_INTERVAL,
    BLOCK_PHYSICS_UPDATE_INTERVAL_MID_FPS,
    BLOCK_PHYSICS_UPDATE_INTERVAL_LOW_FPS,
  );
  if (blockPhysicsAccumulator < updateInterval) {
    return;
  }

  const stepDelta = Math.min(blockPhysicsAccumulator, 0.09);
  blockPhysicsAccumulator = 0;
  const activeRadiusSquared = BLOCK_PHYSICS_ACTIVE_RADIUS * BLOCK_PHYSICS_ACTIVE_RADIUS;

  for (const prop of props) {
    if (!prop.active || !prop.physicsController) {
      continue;
    }

    const dx = prop.x - camera.position.x;
    const dz = prop.z - camera.position.z;
    if (dx * dx + dz * dz > activeRadiusSquared) {
      continue;
    }

    updateBlockPhysicsController(prop.physicsController, prop.root.position, stepDelta, false);
  }

  if (heldPaletteBlock.visible && heldPaletteBlock.userData.physicsController) {
    heldPaletteBlock.getWorldPosition(tempBlockWorldPosition);
    updateBlockPhysicsController(
      heldPaletteBlock.userData.physicsController,
      tempBlockWorldPosition,
      stepDelta,
      true,
    );
  }
}

function setTorchLightLevel(prop, intensity) {
  if (!prop.light) {
    return;
  }

  const clampedIntensity = Math.max(0, intensity);
  const nextVisible = clampedIntensity > 0.02;
  if (prop.light.visible !== nextVisible) {
    prop.light.visible = nextVisible;
  }
  if (Math.abs(prop.light.intensity - clampedIntensity) > 0.02) {
    prop.light.intensity = clampedIntensity;
  }
}

function updateTorchLights(force = false) {
  if (!force && elapsed < lastTorchLightUpdateAt + TORCH_LIGHT_UPDATE_INTERVAL) {
    return;
  }

  lastTorchLightUpdateAt = elapsed;
  const activeRadiusSquared = TORCH_LIGHT_ACTIVE_RADIUS * TORCH_LIGHT_ACTIVE_RADIUS;
  const candidates = [];

  for (const prop of props) {
    if (!prop.active || !prop.light) {
      continue;
    }

    const lightY = prop.root.position.y + prop.colliderHeight * 0.8;
    const dx = prop.x - camera.position.x;
    const dy = lightY - camera.position.y;
    const dz = prop.z - camera.position.z;
    const distanceSquared = dx * dx + dy * dy + dz * dz;

    if (distanceSquared > activeRadiusSquared) {
      setTorchLightLevel(prop, 0);
      continue;
    }

    candidates.push({ prop, distanceSquared });
  }

  candidates.sort((a, b) => a.distanceSquared - b.distanceSquared);
  for (let i = 0; i < candidates.length; i += 1) {
    const { prop, distanceSquared } = candidates[i];
    if (i >= MAX_ACTIVE_TORCH_LIGHTS) {
      setTorchLightLevel(prop, 0);
      continue;
    }

    const falloff = 1 - distanceSquared / activeRadiusSquared;
    const intensity = prop.baseLightIntensity * THREE.MathUtils.clamp(0.35 + falloff * 0.75, 0.18, 1);
    setTorchLightLevel(prop, intensity);
  }
}

function setHeldItemState(mesh, selected) {
  mesh.visible = selected;
}

function selectBuildMaterial(kind) {
  selectedBuildMaterial = buildBlockDefinitions[kind] ? kind : "plank";
  updateSelectedBuildLabel();
  updateBlockPaletteSelection();
  renderInventoryBar();
  updateHeldBuildItem();
}

function updateSelectedBuildLabel() {
  if (!buildMaterialValueLabel) {
    return;
  }

  buildMaterialValueLabel.textContent = getSelectedBuildDefinition().label;
}

function getSelectedBuildDefinition() {
  return buildBlockDefinitions[selectedBuildMaterial] ?? buildBlockDefinitions.plank;
}

function setGameMode(nextMode) {
  gameMode = nextMode === "creative" ? "creative" : "survival";
  if (gameMode === "creative") {
    player.health = player.maxHealth;
  }
  updateResourceLabels();
}

function toggleGameMode() {
  setGameMode(gameMode === "creative" ? "survival" : "creative");
}

function openSurvivalPanel() {
  if (!survivalPanel) {
    return;
  }

  isSurvivalPanelOpen = true;
  resetGameplayInputs();
  renderSurvivalPanel();
  survivalPanel.hidden = false;
  if (isPointerLocked()) {
    document.exitPointerLock();
  }
}

function closeSurvivalPanel(resumePointerLock = false) {
  if (!survivalPanel) {
    return;
  }

  isSurvivalPanelOpen = false;
  survivalPanel.hidden = true;
  if (resumePointerLock) {
    requestGamePointerLock();
  }
}

function toggleSurvivalPanel() {
  if (isSurvivalPanelOpen) {
    closeSurvivalPanel(true);
  } else {
    openSurvivalPanel();
  }
}

function healPlayer(amount) {
  if (amount <= 0) {
    return;
  }

  player.health = THREE.MathUtils.clamp(player.health + amount, 0, player.maxHealth);
  updateHealthLabel();
}

function applyPlayerDamage(amount, kind = "terrain") {
  if (gameMode === "creative" || amount <= 0) {
    return;
  }

  player.health = Math.max(0, player.health - amount);
  const messagePoint = player.position.clone();
  messagePoint.y -= 1.2;
  spawnMiningPop(`-${Math.round(amount)} hp`, messagePoint, kind);
  updateHealthLabel();

  if (player.health <= 0) {
    player.health = player.maxHealth;
    movePlayerToSpawn(findSpawnPoint());
    const respawnPoint = player.position.clone();
    respawnPoint.y -= 1.3;
    spawnMiningPop("respawn", respawnPoint, "terrain");
    updateHealthLabel();
  }
}

function tryEatCookedPork() {
  if (gameMode !== "creative" && !spendItem("cookedPork", 1)) {
    const messagePoint = player.position.clone();
    messagePoint.y -= 1.6;
    spawnMiningPop("need food", messagePoint, "pig");
    return false;
  }

  healPlayer(COOKED_PORK_HEAL);
  const messagePoint = player.position.clone();
  messagePoint.y -= 1.2;
  spawnMiningPop("restored", messagePoint, "pig");
  return true;
}

function toggleBlockPalette() {
  if (isBlockPaletteOpen) {
    closeBlockPalette(true);
  } else {
    openBlockPalette();
  }
}

function openBlockPalette() {
  if (!blockPalette || !blockGrid) {
    return;
  }

  isBlockPaletteOpen = true;
  resetGameplayInputs();
  blockPalette.hidden = false;
  updateBlockPaletteSelection();
  if (isPointerLocked()) {
    document.exitPointerLock();
  }
}

function closeBlockPalette(resumePointerLock = false) {
  if (!blockPalette) {
    return;
  }

  isBlockPaletteOpen = false;
  blockPalette.hidden = true;
  if (resumePointerLock) {
    requestGamePointerLock();
  }
}

function resetGameplayInputs() {
  isMining = false;
  miningCooldown = 0;
  keys.forward = false;
  keys.backward = false;
  keys.left = false;
  keys.right = false;
  keys.ascend = false;
  keys.sprint = false;
}

function populateBlockPalette() {
  if (!blockGrid) {
    return;
  }

  blockGrid.textContent = "";
  blockPaletteButtons.clear();

  for (const definition of buildBlockCatalog) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "block-swatch";
    button.dataset.blockId = definition.id;

    const preview = document.createElement("span");
    preview.className = "block-swatch-preview";
    preview.style.background = definition.swatch;

    const label = document.createElement("span");
    label.className = "block-swatch-label";
    label.textContent = definition.label;

    button.append(preview, label);
    button.addEventListener("click", () => {
      selectBuildMaterial(definition.id);
      closeBlockPalette(true);
    });

    blockPaletteButtons.set(definition.id, button);
    blockGrid.appendChild(button);
  }

  updateBlockPaletteSelection();
}

function updateBlockPaletteSelection() {
  for (const [blockId, button] of blockPaletteButtons) {
    button.classList.toggle("active", blockId === selectedBuildMaterial);
  }
}

function tryPlaceSelectedBuild() {
  if (!isPointerLocked()) {
    return false;
  }

  const definition = getSelectedBuildDefinition();
  if (gameMode !== "creative") {
    const itemKey = definition.inventoryReward;
    if (itemKey && getItemCount(itemKey) <= 0) {
      const messagePoint = player.position.clone();
      messagePoint.y -= 1.6;
      spawnMiningPop(`need ${ITEM_DEFINITIONS[itemKey].label.toLowerCase()}`, messagePoint, definition.miningKind);
      return false;
    }
  }

  updateCamera();
  const placement = getBuildPlacementTarget(definition.size, definition.size === PLANK_SIZE ? PLANK_BUILD_RANGE : STONE_BUILD_RANGE);
  if (!placement || !canPlaceBuildAt(placement, definition.size, definition.height)) {
    const messagePoint = player.position.clone();
    messagePoint.y -= 1.6;
    spawnMiningPop("blocked", messagePoint, definition.miningKind);
    return false;
  }

  if (gameMode !== "creative" && definition.inventoryReward && !spendItem(definition.inventoryReward, 1)) {
    return false;
  }

  createCatalogBlockProp(definition, placement.x, placement.y, placement.z);
  spawnMiningPop(
    "placed",
    new THREE.Vector3(placement.x, placement.y + definition.height + 0.5, placement.z),
    definition.miningKind,
  );
  return true;
}

function getBuildPlacementTarget(buildSize, buildRange) {
  const hit = getCrosshairHit();
  getFlatBuildDirection(tempBuildDirection);

  if (!hit || hit.point.distanceToSquared(player.position) > buildRange * buildRange) {
    return createGroundBuildPlacement(
      player.position.x + tempBuildDirection.x * Math.min(buildRange * 0.58, 7.2),
      player.position.z + tempBuildDirection.z * Math.min(buildRange * 0.58, 7.2),
      buildSize,
    );
  }

  const prop = hit.object.userData.mineableRef ?? null;
  if (prop?.buildAttachable) {
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
    const absX = Math.abs(normal.x);
    const absY = Math.abs(normal.y);
    const absZ = Math.abs(normal.z);

    if (absY >= absX && absY >= absZ) {
      if (normal.y < 0.4) {
        return null;
      }

      return {
        x: prop.x,
        y: prop.root.position.y + prop.colliderHeight,
        z: prop.z,
        attachedToBuild: true,
      };
    }

    if (absX >= absZ) {
      return {
        x: prop.x + Math.sign(normal.x || 1) * buildSize,
        y: prop.root.position.y,
        z: prop.z,
        attachedToBuild: true,
      };
    }

    return {
      x: prop.x,
      y: prop.root.position.y,
      z: prop.z + Math.sign(normal.z || 1) * buildSize,
      attachedToBuild: true,
    };
  }

  if (prop) {
    return null;
  }

  return createGroundBuildPlacement(
    hit.point.x + tempBuildDirection.x * buildSize * 0.58,
    hit.point.z + tempBuildDirection.z * buildSize * 0.58,
    buildSize,
  );
}

function snapBuildCoordinate(value, buildSize) {
  return Math.round(value / buildSize) * buildSize;
}

function getFlatBuildDirection(target) {
  target.set(0, 0, -1).applyAxisAngle(WORLD_UP, yaw);
  target.y = 0;
  if (target.lengthSq() < 0.0001) {
    target.set(0, 0, -1);
  }
  return target.normalize();
}

function createGroundBuildPlacement(rawX, rawZ, buildSize) {
  const x = snapBuildCoordinate(rawX, buildSize);
  const z = snapBuildCoordinate(rawZ, buildSize);
  return {
    x,
    y: getVisibleTerrainHeight(x, z),
    z,
    attachedToBuild: false,
  };
}

function canPlacePlankAt(placement) {
  return canPlaceBuildAt(placement, PLANK_SIZE, PLANK_THICKNESS);
}

function canPlaceStoneAt(placement) {
  return canPlaceBuildAt(placement, STONE_SIZE, STONE_SIZE);
}

function canPlaceBuildAt(placement, buildSize, buildHeight) {
  const { x, y, z, attachedToBuild } = placement;
  if (
    Math.abs(x) > HALF_WORLD - buildSize ||
    Math.abs(z) > HALF_WORLD - buildSize ||
    y < WORLD_FLOOR + 0.1 ||
    y > 220
  ) {
    return false;
  }

  if (!attachedToBuild && Math.abs(y - getVisibleTerrainHeight(x, z)) > 0.6) {
    return false;
  }

  const buildTop = y + buildHeight;
  for (const prop of props) {
    if (!prop.active) {
      continue;
    }

    const propBottom = prop.root.position.y;
    const propTop = propBottom + prop.colliderHeight;
    const verticalOverlap = y < propTop - 0.05 && buildTop > propBottom + 0.05;

    if (prop.buildAttachable) {
      const overlapDistance = (buildSize + (prop.buildFootprint ?? buildSize)) * 0.42;
      if (
        Math.abs(x - prop.x) < overlapDistance &&
        Math.abs(z - prop.z) < overlapDistance &&
        verticalOverlap
      ) {
        return false;
      }
      continue;
    }

    const dx = x - prop.x;
    const dz = z - prop.z;
    const minimumDistance = buildSize * 0.42 + prop.colliderRadius;
    if (dx * dx + dz * dz < minimumDistance * minimumDistance && verticalOverlap) {
      return false;
    }
  }

  const playerFeetY = player.position.y - EYE_HEIGHT;
  if (
    Math.abs(x - player.position.x) < buildSize * 0.7 &&
    Math.abs(z - player.position.z) < buildSize * 0.7 &&
    y < player.position.y + 0.6 &&
    buildTop > playerFeetY - 0.2
  ) {
    return false;
  }

  return true;
}

function createBuildProp(definition, x, y, z, type = "block") {
  const { root, targets, supportSurface, physicsController } = createDetailedBlockAssembly(definition);
  root.position.set(x, y, z);
  scene.add(root);

  const prop = {
    type,
    blockId: definition.id,
    miningKind: definition.miningKind,
    inventoryReward: definition.inventoryReward ?? null,
    active: true,
    root,
    targets,
    supportSurface,
    buildAttachable: definition.buildAttachable ?? true,
    buildFootprint: definition.buildFootprint ?? definition.size,
    walkableSurface: definition.walkableSurface ?? true,
    stationType: definition.stationType ?? null,
    x,
    z,
    baseScale: 1,
    health: definition.health,
    maxHealth: definition.health,
    colliderRadius: definition.colliderRadius ?? definition.size * 0.48,
    colliderHeight: definition.colliderHeight ?? definition.height,
    minDryClearance: -Infinity,
    maxSlope: Infinity,
    groundInset: 0,
    physicsController,
    light: root.userData.pointLight ?? null,
    baseLightIntensity: root.userData.baseLightIntensity ?? 0,
  };

  for (const target of targets) {
    target.userData.mineableRef = prop;
    mineableTargets.push(target);
  }
  if (supportSurface && prop.walkableSurface) {
    groundSupportTargets.push(supportSurface);
  }
  props.push(prop);
  cameraObstacleTargets.push(root);
  return prop;
}

function createPlankProp(x, y, z) {
  return createBuildProp(buildBlockDefinitions.plank, x, y, z, "plank");
}

function createStoneProp(x, y, z) {
  return createBuildProp(buildBlockDefinitions.stone, x, y, z, "stone");
}

function createCatalogBlockProp(definition, x, y, z) {
  if (definition.id === "plank") {
    return createPlankProp(x, y, z);
  }

  if (definition.id === "stone") {
    return createStoneProp(x, y, z);
  }

  return createBuildProp(definition, x, y, z, "block");
}

function applyViewSettings() {
  camera.fov = viewSettings.fov;
  camera.updateProjectionMatrix();

  if (fovInput) {
    fovInput.value = `${Math.round(viewSettings.fov)}`;
  }

  if (fovValueLabel) {
    fovValueLabel.textContent = `${Math.round(viewSettings.fov)}`;
  }
}

function setFov(nextFov) {
  viewSettings.fov = THREE.MathUtils.clamp(Number(nextFov) || DEFAULT_FOV, MIN_FOV, MAX_FOV);
  applyViewSettings();

  try {
    window.localStorage.setItem(VIEW_FOV_STORAGE_KEY, `${viewSettings.fov}`);
  } catch {
    // Ignore storage failures and keep the in-memory value.
  }
}

function generateCaves() {
  for (let i = 0; i < CAVE_COUNT; i += 1) {
    placeCave(i);
  }
}

function placeCave(seedOffset) {
  for (let attempt = 0; attempt < 48; attempt += 1) {
    const sampleIndex = 780 + seedOffset * 67 + attempt * 3.9;
    const angle = randomInRange(0, Math.PI * 2, sampleIndex);
    const radialDistance = randomInRange(HALF_WORLD * 0.18, HALF_WORLD * 0.58, sampleIndex + 0.41);
    const x = Math.cos(angle) * radialDistance;
    const z = Math.sin(angle) * radialDistance;
    const surfaceHeight = sampleTerrainHeight(x, z);
    const slope = sampleHeightmapSlope(x, z);

    if (surfaceHeight < WATER_LEVEL + 22 || slope < 0.065 || slope > 0.34) {
      continue;
    }

    if (isPointNearAnyCave(x, z, 118)) {
      continue;
    }

    const uphill = getHeightmapUphillDirection(x, z);
    if (!uphill) {
      continue;
    }

    const side = new THREE.Vector2(-uphill.y, uphill.x);
    const tunnelRadius = randomInRange(7.2, 9.6, sampleIndex + 1.8);
    const stepLength = randomInRange(12, 16, sampleIndex + 2.4);
    const depthPerStep = randomInRange(3.8, 5.9, sampleIndex + 3.1);
    const bendAmount = randomInRange(5.5, 11.5, sampleIndex + 3.8)
      * (seededFloat(worldSeed, sampleIndex + 4.1) > 0.5 ? 1 : -1);
    const chamberRadius = tunnelRadius * randomInRange(1.22, 1.55, sampleIndex + 4.8);
    const controlPoints = [];

    controlPoints.push(new THREE.Vector3(
      x - uphill.x * (tunnelRadius * 0.85),
      surfaceHeight - tunnelRadius * 0.18,
      z - uphill.y * (tunnelRadius * 0.85),
    ));

    for (let i = 1; i <= 4; i += 1) {
      const t = i / 4;
      const distance = tunnelRadius * 0.6 + i * stepLength;
      const bend = Math.sin(t * Math.PI) * bendAmount;
      controlPoints.push(new THREE.Vector3(
        x + uphill.x * distance + side.x * bend,
        Math.max(WORLD_FLOOR + 16, surfaceHeight - 2.8 - i * depthPerStep - t * t * 4.4),
        z + uphill.y * distance + side.y * bend,
      ));
    }

    const lastPoint = controlPoints[controlPoints.length - 1];
    controlPoints.push(new THREE.Vector3(
      lastPoint.x + uphill.x * (stepLength * 0.78) + side.x * bendAmount * 0.28,
      Math.max(WORLD_FLOOR + 13, lastPoint.y - depthPerStep * 0.65),
      lastPoint.z + uphill.y * (stepLength * 0.78) + side.y * bendAmount * 0.28,
    ));

    if (controlPoints.some((point) => (
      Math.abs(point.x) > HALF_WORLD * 0.93 ||
      Math.abs(point.z) > HALF_WORLD * 0.93 ||
      point.y < WORLD_FLOOR + 12
    ))) {
      continue;
    }

    const curve = new THREE.CatmullRomCurve3(controlPoints);
    const curvePoints = curve.getPoints(28);
    const samples = [];

    stampCavePatch(
      x - uphill.x * tunnelRadius * 0.45,
      z - uphill.y * tunnelRadius * 0.45,
      tunnelRadius * 1.24,
      surfaceHeight - tunnelRadius * 0.34,
    );
    stampCavePatch(
      x + uphill.x * tunnelRadius * 0.55,
      z + uphill.y * tunnelRadius * 0.55,
      tunnelRadius * 0.96,
      surfaceHeight - tunnelRadius * 0.72,
    );

    for (let i = 0; i < curvePoints.length; i += 1) {
      const point = curvePoints[i];
      const t = i / (curvePoints.length - 1);
      const radius = THREE.MathUtils.lerp(tunnelRadius * 0.84, tunnelRadius * 1.04, t);
      const floorY = point.y - radius + CAVE_FLOOR_INSET;
      samples.push({
        position: point.clone(),
        radius,
        floorY,
      });

      stampCavePatch(
        point.x,
        point.z,
        radius * (t < 0.16 ? CAVE_MOUTH_STAMP_SCALE : CAVE_PATH_STAMP_SCALE),
        floorY,
      );

      if (t > 0.24 && t < 0.88 && i % 6 === 3) {
        const sidePocketRadius = radius * 0.34;
        const sidePocketLift = floorY + radius * 0.12;
        stampCavePatch(
          point.x + side.x * radius * 0.42,
          point.z + side.y * radius * 0.42,
          sidePocketRadius,
          sidePocketLift,
        );
        stampCavePatch(
          point.x - side.x * radius * 0.42,
          point.z - side.y * radius * 0.42,
          sidePocketRadius,
          sidePocketLift,
        );
      }
    }

    const chamberCenter = curvePoints[curvePoints.length - 1].clone();
    const chamberFloorY = chamberCenter.y - chamberRadius + CAVE_FLOOR_INSET + 0.6;
    samples.push({
      position: chamberCenter.clone(),
      radius: chamberRadius,
      floorY: chamberFloorY,
    });
    stampCavePatch(
      chamberCenter.x,
      chamberCenter.z,
      chamberRadius * CAVE_CHAMBER_STAMP_SCALE,
      chamberFloorY,
    );
    stampCavePatch(
      chamberCenter.x,
      chamberCenter.z,
      chamberRadius * CAVE_CHAMBER_CORE_STAMP_SCALE,
      chamberFloorY - 1.6,
    );
    stampCavePatch(
      chamberCenter.x + side.x * chamberRadius * 0.44,
      chamberCenter.z + side.y * chamberRadius * 0.44,
      chamberRadius * 0.34,
      chamberFloorY - 0.35,
    );
    stampCavePatch(
      chamberCenter.x - side.x * chamberRadius * 0.44,
      chamberCenter.z - side.y * chamberRadius * 0.44,
      chamberRadius * 0.34,
      chamberFloorY - 0.35,
    );
    caves.push({
      entrance: { x, z },
      samples,
    });
    return;
  }
}

function stampCavePatch(centerX, centerZ, radius, floorY) {
  const radiusSquared = radius * radius;
  const bounds = getTerrainDigBounds({ x: centerX, z: centerZ }, radius + CELL_SIZE);

  for (let iz = bounds.minIz; iz <= bounds.maxIz; iz += 1) {
    const z = gridToWorldZ(iz);

    for (let ix = bounds.minIx; ix <= bounds.maxIx; ix += 1) {
      const x = gridToWorldX(ix);
      const dx = x - centerX;
      const dz = z - centerZ;
      const distanceSquared = dx * dx + dz * dz;

      if (distanceSquared > radiusSquared) {
        continue;
      }

      const falloff = smoothstep(1, 0, Math.sqrt(distanceSquared) / radius);
      const index = gridIndex(ix, iz);
      const loweredHeight = THREE.MathUtils.lerp(terrainHeights[index], floorY, falloff);
      terrainHeights[index] = Math.min(terrainHeights[index], loweredHeight);
    }
  }
}

function isPointNearAnyCave(x, z, extraRadius = 0) {
  for (const cave of caves) {
    for (const sample of cave.samples) {
      const radius = sample.radius * 0.88 + extraRadius;
      const dx = x - sample.position.x;
      const dz = z - sample.position.z;
      if (dx * dx + dz * dz < radius * radius) {
        return true;
      }
    }
  }

  return false;
}

function generateTerrain() {
  for (let iz = 0; iz < GRID_WIDTH; iz += 1) {
    for (let ix = 0; ix < GRID_WIDTH; ix += 1) {
      const x = gridToWorldX(ix);
      const z = gridToWorldZ(iz);
      const index = gridIndex(ix, iz);
      const height = getBaseTerrainHeight(x, z);
      terrainHeights[index] = height;
      baseTerrainHeights[index] = height;
    }
  }
}

function rebuildTerrainSurface() {
  for (let iz = 0; iz < GRID_WIDTH; iz += 1) {
    for (let ix = 0; ix < GRID_WIDTH; ix += 1) {
      const index = gridIndex(ix, iz);
      const height = terrainHeights[index];
      const digDepth = baseTerrainHeights[index] - height;

      terrainPositions.setY(index, height);

      const color = pickTerrainColor(height, digDepth);
      terrainColorAttribute.setXYZ(index, color.r, color.g, color.b);
    }
  }

  terrainPositions.needsUpdate = true;
  terrainColorAttribute.needsUpdate = true;
  terrainGeometry.computeVertexNormals();
  terrainGeometry.computeBoundingSphere();
  terrainGeometry.computeBoundingBox();
  terrainGeometry.attributes.normal.needsUpdate = true;
}

function rebuildWaterSurface() {
  const waterVertices = [];
  floodWaterCells();

  for (let iz = 0; iz < GRID_RESOLUTION; iz += 1) {
    for (let ix = 0; ix < GRID_RESOLUTION; ix += 1) {
      if (!floodedWaterCells[gridCellIndex(ix, iz)]) {
        continue;
      }

      const x0 = gridToWorldX(ix);
      const x1 = gridToWorldX(ix + 1);
      const z0 = gridToWorldZ(iz);
      const z1 = gridToWorldZ(iz + 1);

      addWaterTriangle(waterVertices, x0, z0, x1, z0, x0, z1);
      addWaterTriangle(waterVertices, x1, z0, x1, z1, x0, z1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  if (waterVertices.length > 0) {
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(waterVertices, 3));
    geometry.computeBoundingSphere();
  }

  registerAnimatedWaterGeometry(water, geometry);
}

function rebuildWorldBoundarySkirts() {
  const terrainVertices = [];
  const terrainColors = [];
  const waterVertices = [];
  const waterWaveWeights = [];
  const skirtBottomColor = new THREE.Color(0x5a4b3c);

  for (let ix = 0; ix < GRID_RESOLUTION; ix += 1) {
    appendWorldBoundarySegment(
      ix,
      0,
      ix + 1,
      0,
      terrainVertices,
      terrainColors,
      waterVertices,
      waterWaveWeights,
      skirtBottomColor,
    );
    appendWorldBoundarySegment(
      ix,
      GRID_RESOLUTION,
      ix + 1,
      GRID_RESOLUTION,
      terrainVertices,
      terrainColors,
      waterVertices,
      waterWaveWeights,
      skirtBottomColor,
    );
  }

  for (let iz = 0; iz < GRID_RESOLUTION; iz += 1) {
    appendWorldBoundarySegment(
      0,
      iz,
      0,
      iz + 1,
      terrainVertices,
      terrainColors,
      waterVertices,
      waterWaveWeights,
      skirtBottomColor,
    );
    appendWorldBoundarySegment(
      GRID_RESOLUTION,
      iz,
      GRID_RESOLUTION,
      iz + 1,
      terrainVertices,
      terrainColors,
      waterVertices,
      waterWaveWeights,
      skirtBottomColor,
    );
  }

  const terrainGeometry = new THREE.BufferGeometry();
  if (terrainVertices.length > 0) {
    terrainGeometry.setAttribute("position", new THREE.Float32BufferAttribute(terrainVertices, 3));
    terrainGeometry.setAttribute("color", new THREE.Float32BufferAttribute(terrainColors, 3));
    terrainGeometry.computeVertexNormals();
    terrainGeometry.computeBoundingSphere();
    terrainEdgeSkirt.visible = true;
  } else {
    terrainEdgeSkirt.visible = false;
  }
  terrainEdgeSkirt.geometry.dispose();
  terrainEdgeSkirt.geometry = terrainGeometry;

  const waterGeometry = new THREE.BufferGeometry();
  if (waterVertices.length > 0) {
    waterGeometry.setAttribute("position", new THREE.Float32BufferAttribute(waterVertices, 3));
    waterGeometry.computeBoundingSphere();
    waterEdgeSkirt.visible = true;
  } else {
    waterEdgeSkirt.visible = false;
  }
  registerAnimatedWaterGeometry(waterEdgeSkirt, waterGeometry, waterWaveWeights);
}

function appendWorldBoundarySegment(
  ixA,
  izA,
  ixB,
  izB,
  terrainVertices,
  terrainColors,
  waterVertices,
  waterWaveWeights,
  skirtBottomColor,
) {
  const xA = gridToWorldX(ixA);
  const zA = gridToWorldZ(izA);
  const xB = gridToWorldX(ixB);
  const zB = gridToWorldZ(izB);
  const indexA = gridIndex(ixA, izA);
  const indexB = gridIndex(ixB, izB);
  const topA = terrainHeights[indexA];
  const topB = terrainHeights[indexB];
  const colorA = pickTerrainColor(topA, baseTerrainHeights[indexA] - topA);
  const colorB = pickTerrainColor(topB, baseTerrainHeights[indexB] - topB);

  addVerticalQuad(terrainVertices, xA, topA, zA, xB, topB, zB, WORLD_FLOOR, WORLD_FLOOR);
  pushQuadColors(terrainColors, colorA, colorB, skirtBottomColor, skirtBottomColor);

  const boundaryWaterCell = getBoundaryWaterCell(ixA, izA, ixB, izB);
  if (boundaryWaterCell && floodedWaterCells[gridCellIndex(boundaryWaterCell.ix, boundaryWaterCell.iz)]) {
    const waterFloorA = Math.min(WATER_LEVEL, topA);
    const waterFloorB = Math.min(WATER_LEVEL, topB);
    addVerticalQuad(
      waterVertices,
      xA,
      WATER_LEVEL,
      zA,
      xB,
      WATER_LEVEL,
      zB,
      waterFloorA,
      waterFloorB,
    );
    waterWaveWeights.push(1, 1, 0, 1, 0, 0);
  }
}

function buildWaterSources() {
  waterSourceCells.fill(0);

  for (let iz = 0; iz < GRID_RESOLUTION; iz += 1) {
    for (let ix = 0; ix < GRID_RESOLUTION; ix += 1) {
      if (!isFloodableWaterCell(ix, iz, baseTerrainHeights)) {
        continue;
      }

      waterSourceCells[gridCellIndex(ix, iz)] = 1;
    }
  }
}

function floodWaterCells() {
  floodedWaterCells.fill(0);
  let head = 0;
  let tail = 0;

  for (let iz = 0; iz < GRID_RESOLUTION; iz += 1) {
    for (let ix = 0; ix < GRID_RESOLUTION; ix += 1) {
      const cellIndex = gridCellIndex(ix, iz);
      if (!waterSourceCells[cellIndex] || !isFloodableWaterCell(ix, iz, terrainHeights)) {
        continue;
      }

      floodedWaterCells[cellIndex] = 1;
      waterFloodQueue[tail] = cellIndex;
      tail += 1;
    }
  }

  while (head < tail) {
    const cellIndex = waterFloodQueue[head];
    head += 1;
    const ix = cellIndex % GRID_RESOLUTION;
    const iz = Math.floor(cellIndex / GRID_RESOLUTION);

    enqueueFloodNeighbor(ix - 1, iz);
    enqueueFloodNeighbor(ix + 1, iz);
    enqueueFloodNeighbor(ix, iz - 1);
    enqueueFloodNeighbor(ix, iz + 1);
  }

  function enqueueFloodNeighbor(ix, iz) {
    if (ix < 0 || iz < 0 || ix >= GRID_RESOLUTION || iz >= GRID_RESOLUTION) {
      return;
    }

    const neighborIndex = gridCellIndex(ix, iz);
    if (floodedWaterCells[neighborIndex] || !isFloodableWaterCell(ix, iz, terrainHeights)) {
      return;
    }

    floodedWaterCells[neighborIndex] = 1;
    waterFloodQueue[tail] = neighborIndex;
    tail += 1;
  }
}

function isFloodableWaterCell(ix, iz, heights) {
  return getCellAverageHeight(heights, ix, iz) <= WATER_LEVEL + WATER_FILL_ELEVATION_TOLERANCE;
}

function getCellAverageHeight(heights, ix, iz) {
  return (
    heights[gridIndex(ix, iz)] +
    heights[gridIndex(ix + 1, iz)] +
    heights[gridIndex(ix, iz + 1)] +
    heights[gridIndex(ix + 1, iz + 1)]
  ) * 0.25;
}

function getBoundaryWaterCell(ixA, izA, ixB, izB) {
  if (izA === izB) {
    const ix = Math.min(ixA, ixB);
    if (izA === 0) {
      return { ix, iz: 0 };
    }
    if (izA === GRID_RESOLUTION) {
      return { ix, iz: GRID_RESOLUTION - 1 };
    }
  }

  if (ixA === ixB) {
    const iz = Math.min(izA, izB);
    if (ixA === 0) {
      return { ix: 0, iz };
    }
    if (ixA === GRID_RESOLUTION) {
      return { ix: GRID_RESOLUTION - 1, iz };
    }
  }

  return null;
}

function addVerticalQuad(vertices, ax, topAy, az, bx, topBy, bz, bottomAyA, bottomAyB) {
  vertices.push(
    ax, topAy, az,
    bx, topBy, bz,
    ax, bottomAyA, az,
    bx, topBy, bz,
    bx, bottomAyB, bz,
    ax, bottomAyA, az,
  );
}

function pushQuadColors(colors, topColorA, topColorB, bottomColorA, bottomColorB) {
  pushColor(colors, topColorA);
  pushColor(colors, topColorB);
  pushColor(colors, bottomColorA);
  pushColor(colors, topColorB);
  pushColor(colors, bottomColorB);
  pushColor(colors, bottomColorA);
}

function pushColor(colors, color) {
  colors.push(color.r, color.g, color.b);
}

function populateProps() {
  for (let i = 0; i < STRUCTURE_COUNT; i += 1) {
    placeStructure(i);
  }

  for (let i = 0; i < 120; i += 1) {
    placeTree(i);
  }

  for (let i = 0; i < 96; i += 1) {
    placeRock(i);
  }

  for (let i = 0; i < PIG_COUNT; i += 1) {
    placePig(i);
  }
}

function addStructureBlock(root, blockId, x, y, z, width, height, depth, options = {}) {
  const definition = buildBlockDefinitions[blockId] ?? buildBlockDefinitions.stone;
  const mesh = new THREE.Mesh(blockPartGeometry, definition.material);
  const transparent = isTransparentBlockMaterial(definition.material);
  mesh.castShadow = (options.castShadow ?? true) && !transparent;
  mesh.receiveShadow = options.receiveShadow ?? true;
  mesh.position.set(x, y, z);
  mesh.scale.set(width, height, depth);
  if (options.rotation) {
    mesh.rotation.set(
      options.rotation.x ?? 0,
      options.rotation.y ?? 0,
      options.rotation.z ?? 0,
    );
  }
  root.add(mesh);
  return mesh;
}

function createStaticStructureProp(root, x, z, colliderRadius, colliderHeight, type = "structure") {
  root.position.set(x, getVisibleTerrainHeight(x, z), z);
  scene.add(root);

  const prop = {
    type,
    active: true,
    root,
    targets: [],
    x,
    z,
    baseScale: 1,
    health: 999,
    maxHealth: 999,
    colliderRadius,
    colliderHeight,
    minDryClearance: 8,
    maxSlope: 0.16,
    groundInset: 0,
    walkableSurface: false,
    buildAttachable: false,
    stationType: null,
  };

  props.push(prop);
  cameraObstacleTargets.push(root);
  return prop;
}

function placeStructureStation(blockId, x, z) {
  const definition = blockId === "crafting_table"
    ? buildBlockDefinitions.crafting_table
    : buildBlockDefinitions[blockId];
  if (!definition) {
    return;
  }

  const y = getVisibleTerrainHeight(x, z);
  createCatalogBlockProp(definition, x, y, z);
}

function placeStructure(seedOffset) {
  for (let attempt = 0; attempt < 32; attempt += 1) {
    const sampleIndex = 1900 + seedOffset * 29 + attempt * 5.1;
    const x = randomInRange(-HALF_WORLD * 0.82, HALF_WORLD * 0.82, sampleIndex);
    const z = randomInRange(-HALF_WORLD * 0.82, HALF_WORLD * 0.82, sampleIndex + 0.77);

    if (!canPlaceProp(x, z, 8, 0.14, 48)) {
      continue;
    }

    const style = Math.floor(fract(sampleIndex * 0.31 + worldSeed * 0.002) * 3);
    const root = new THREE.Group();

    if (style === 0) {
      addStructureBlock(root, "stone", 0, 0.3, 0, 8.4, 0.6, 8.4, { castShadow: false });
      addStructureBlock(root, "plank", 0, 2.8, -3, 8.2, 0.35, 0.7);
      addStructureBlock(root, "plank", -3.2, 1.6, 0, 0.48, 3.2, 0.48);
      addStructureBlock(root, "plank", 3.2, 1.6, 0, 0.48, 3.2, 0.48);
      addStructureBlock(root, "plank", -3.2, 3.2, 0, 0.4, 0.4, 6.2);
      addStructureBlock(root, "plank", 3.2, 3.2, 0, 0.4, 0.4, 6.2);
      addStructureBlock(root, "slate", 0, 4.25, 0, 8.8, 0.45, 6.8, {
        rotation: { z: 0.05 },
        castShadow: false,
      });
      createStaticStructureProp(root, x, z, 6.4, 5.4, "structure");
      placeStructureStation("crafting_table", x - 1.5, z + 1.2);
      placeStructureStation("furnace", x + 1.5, z + 1.2);
      placeStructureStation("torch", x - 2.8, z - 2.8);
      placeStructureStation("torch", x + 2.8, z - 2.8);
      return;
    }

    if (style === 1) {
      addStructureBlock(root, "brick", -2.8, 1.8, -2.4, 1.1, 3.6, 1.1);
      addStructureBlock(root, "brick", 2.8, 1.8, -2.4, 1.1, 3.6, 1.1);
      addStructureBlock(root, "brick", -2.8, 1.8, 2.4, 1.1, 3.6, 1.1);
      addStructureBlock(root, "brick", 2.8, 1.8, 2.4, 1.1, 3.6, 1.1);
      addStructureBlock(root, "slate", 0, 3.6, -2.4, 6.8, 0.55, 1.15);
      addStructureBlock(root, "slate", 0, 3.6, 2.4, 6.8, 0.55, 1.15);
      addStructureBlock(root, "stone", 0, 0.25, 0, 7.8, 0.5, 7.8, { castShadow: false });
      addStructureBlock(root, "glass", 0, 2.1, 0, 1.4, 1.4, 1.4, { castShadow: false });
      createStaticStructureProp(root, x, z, 6.9, 4.5, "structure");
      placeStructureStation("furnace", x, z);
      placeStructureStation("torch", x - 3.1, z);
      placeStructureStation("torch", x + 3.1, z);
      return;
    }

    addStructureBlock(root, "plank", 0, 0.25, 0, 7.2, 0.5, 7.2, { castShadow: false });
    addStructureBlock(root, "stone", -2.5, 1.5, -2.5, 1, 3, 1, { castShadow: false });
    addStructureBlock(root, "stone", 2.5, 1.5, -2.5, 1, 3, 1, { castShadow: false });
    addStructureBlock(root, "stone", -2.5, 1.5, 2.5, 1, 3, 1, { castShadow: false });
    addStructureBlock(root, "stone", 2.5, 1.5, 2.5, 1, 3, 1, { castShadow: false });
    addStructureBlock(root, "brick", 0, 1.75, -2.8, 4.8, 3.5, 0.65, { castShadow: false });
    addStructureBlock(root, "brick", 0, 1.75, 2.8, 4.8, 3.5, 0.65, { castShadow: false });
    addStructureBlock(root, "slate", 0, 3.65, 0, 6.6, 0.45, 6.6, {
      rotation: { x: 0.12 },
      castShadow: false,
    });
    createStaticStructureProp(root, x, z, 6.1, 4.8, "structure");
    placeStructureStation("crafting_table", x, z + 1.2);
    placeStructureStation("torch", x - 2.5, z - 2.5);
    placeStructureStation("torch", x + 2.5, z - 2.5);
    return;
  }
}

function placeTree(seedOffset) {
  for (let attempt = 0; attempt < 28; attempt += 1) {
    const sampleIndex = seedOffset * 29 + attempt * 3.7;
    const x = randomInRange(-HALF_WORLD * 0.92, HALF_WORLD * 0.92, sampleIndex);
    const z = randomInRange(-HALF_WORLD * 0.92, HALF_WORLD * 0.92, sampleIndex + 0.71);
    const scale = 0.78 + fract(Math.sin(sampleIndex * 0.91 + worldSeed) * 921.2) * 0.9;

    if (!canPlaceProp(x, z, 4.2, 0.17, 12)) {
      continue;
    }

    const root = new THREE.Group();

    const trunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
    trunk.castShadow = true;
    trunk.position.y = 3;

    const canopyLarge = new THREE.Mesh(treeCanopyGeometryLarge, treeCanopyMaterial);
    canopyLarge.castShadow = true;
    canopyLarge.position.y = 8.8;

    const canopySmall = new THREE.Mesh(treeCanopyGeometrySmall, treeCanopyMaterial);
    canopySmall.castShadow = true;
    canopySmall.position.y = 11.3;

    root.add(trunk);
    root.add(canopyLarge);
    root.add(canopySmall);
    root.scale.setScalar(scale);
    root.rotation.y = fract((x + z) * 0.017 + seedOffset * 0.33) * Math.PI * 2;
    const groundInset = 0.08 * scale;
    root.position.set(x, getVisibleTerrainHeight(x, z) - groundInset, z);
    scene.add(root);

    const prop = {
      type: "tree",
      active: true,
      root,
      targets: [trunk, canopyLarge, canopySmall],
      x,
      z,
      baseScale: scale,
      health: 16 + scale * 12,
      maxHealth: 16 + scale * 12,
      colliderRadius: 1.7 * scale,
      colliderHeight: 11.6 * scale,
      minDryClearance: 4.2,
      maxSlope: 0.17,
      groundInset,
    };

    for (const target of prop.targets) {
      target.userData.mineableRef = prop;
      mineableTargets.push(target);
    }

    props.push(prop);
    cameraObstacleTargets.push(root);
    return;
  }
}

function placeRock(seedOffset) {
  for (let attempt = 0; attempt < 28; attempt += 1) {
    const sampleIndex = 400 + seedOffset * 17 + attempt * 2.3;
    const x = randomInRange(-HALF_WORLD * 0.92, HALF_WORLD * 0.92, sampleIndex);
    const z = randomInRange(-HALF_WORLD * 0.92, HALF_WORLD * 0.92, sampleIndex + 0.54);
    const scale = 0.62 + fract(Math.sin(sampleIndex * 1.19 + worldSeed * 1.7) * 513.5) * 1.05;

    if (!canPlaceProp(x, z, 2.1, 0.28, 5.6)) {
      continue;
    }

    const root = new THREE.Group();
    const usesLargeGeometry = fract(sampleIndex * 0.41) > 0.5;
    const geometry = usesLargeGeometry ? rockGeometryLarge : rockGeometrySmall;
    const bottomOffset = -geometry.boundingBox.min.y;
    const colliderHeight = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) * scale;
    const jumpable = colliderHeight <= JUMPABLE_ROCK_HEIGHT;
    const mesh = new THREE.Mesh(geometry, rockMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.y = bottomOffset;
    root.add(mesh);
    root.scale.setScalar(scale);
    root.rotation.set(
      fract(sampleIndex * 0.17) * Math.PI,
      fract(sampleIndex * 0.29) * Math.PI,
      fract(sampleIndex * 0.43) * Math.PI,
    );
    const groundInset = 0.12 * scale;
    root.position.set(x, getVisibleTerrainHeight(x, z) - groundInset, z);
    scene.add(root);

    const prop = {
      type: "rock",
      active: true,
      root,
      targets: [mesh],
      x,
      z,
      baseScale: scale,
      health: 18 + scale * 14,
      maxHealth: 18 + scale * 14,
      colliderRadius: jumpable ? 1.1 * scale : 1.65 * scale,
      colliderHeight,
      jumpable,
      minDryClearance: 2.1,
      maxSlope: 0.28,
      groundInset,
    };

    mesh.userData.mineableRef = prop;
    mineableTargets.push(mesh);
    props.push(prop);
    cameraObstacleTargets.push(root);
    return;
  }
}

function createPigModel() {
  const root = new THREE.Group();
  const targets = [];

  const body = new THREE.Mesh(blockPartGeometry, pigBodyMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.set(0, 2.55, 0);
  body.scale.set(3.1, 2, 1.8);
  root.add(body);
  targets.push(body);

  const shoulders = new THREE.Mesh(blockPartGeometry, pigAccentMaterial);
  shoulders.castShadow = true;
  shoulders.receiveShadow = true;
  shoulders.position.set(-0.24, 3, 0);
  shoulders.scale.set(2.25, 0.52, 1.5);
  root.add(shoulders);
  targets.push(shoulders);

  const headPivot = new THREE.Group();
  headPivot.position.set(2.14, 2.82, 0);
  root.add(headPivot);

  const head = new THREE.Mesh(blockPartGeometry, pigBodyMaterial);
  head.castShadow = true;
  head.receiveShadow = true;
  head.scale.set(1.45, 1.38, 1.26);
  headPivot.add(head);
  targets.push(head);

  const snout = new THREE.Mesh(blockPartGeometry, pigSnoutMaterial);
  snout.castShadow = true;
  snout.receiveShadow = true;
  snout.position.set(0.98, -0.08, 0);
  snout.scale.set(0.72, 0.5, 0.66);
  headPivot.add(snout);
  targets.push(snout);

  for (const zSign of [-1, 1]) {
    const ear = new THREE.Mesh(blockPartGeometry, pigAccentMaterial);
    ear.castShadow = true;
    ear.receiveShadow = true;
    ear.position.set(0.18, 0.9, zSign * 0.38);
    ear.rotation.z = zSign * 0.12;
    ear.scale.set(0.18, 0.34, 0.2);
    headPivot.add(ear);
    targets.push(ear);
  }

  const legOffsets = [
    [-1.02, 0.82],
    [-1.02, -0.82],
    [1.05, 0.82],
    [1.05, -0.82],
  ];
  const legs = [];
  const legBaseHeights = [];

  for (const [x, z] of legOffsets) {
    const leg = new THREE.Mesh(blockPartGeometry, pigHoofMaterial);
    leg.castShadow = true;
    leg.receiveShadow = true;
    leg.position.set(x, 0.9, z);
    leg.scale.set(0.34, 1.8, 0.34);
    root.add(leg);
    legs.push(leg);
    legBaseHeights.push(leg.position.y);
    targets.push(leg);
  }

  return {
    root,
    targets,
    body,
    headPivot,
    legs,
    legBaseHeights,
    bodyBaseY: body.position.y,
  };
}

function placePig(seedOffset) {
  for (let attempt = 0; attempt < 28; attempt += 1) {
    const sampleIndex = 850 + seedOffset * 19 + attempt * 4.7;
    const x = randomInRange(-HALF_WORLD * 0.9, HALF_WORLD * 0.9, sampleIndex);
    const z = randomInRange(-HALF_WORLD * 0.9, HALF_WORLD * 0.9, sampleIndex + 0.81);
    const scale = 0.86 + fract(Math.sin(sampleIndex * 1.17 + worldSeed * 0.39) * 621.5) * 0.34;
    const height = getVisibleTerrainHeight(x, z);

    if (
      !canPlaceProp(x, z, 6, 0.16, 13.5)
      || height > 88
      || height < WATER_LEVEL + 7
    ) {
      continue;
    }

    const model = createPigModel();
    const root = model.root;
    root.scale.setScalar(scale);
    root.rotation.y = fract(sampleIndex * 0.21 + worldSeed * 0.03) * Math.PI * 2;
    root.position.set(x, height, z);
    scene.add(root);

    const prop = {
      type: "pig",
      active: true,
      root,
      targets: model.targets,
      x,
      z,
      baseScale: scale,
      health: 10 + scale * 5,
      maxHealth: 10 + scale * 5,
      colliderRadius: 1.55 * scale,
      colliderHeight: 4.3 * scale,
      minDryClearance: 6,
      maxSlope: 0.16,
      groundInset: 0,
      inventoryReward: "rawPork",
      rewardAmount: 2 + Math.round(scale),
      fleeTimer: 0,
      wanderAngle: root.rotation.y,
      wanderTimer: fract(sampleIndex * 0.37) * PIG_WANDER_INTERVAL,
      moveSpeed: PIG_WALK_SPEED * (0.92 + fract(sampleIndex * 0.51) * 0.24),
      stepPhase: fract(sampleIndex * 0.73) * Math.PI * 2,
      body: model.body,
      bodyBaseY: model.bodyBaseY,
      headPivot: model.headPivot,
      legs: model.legs,
      legBaseHeights: model.legBaseHeights,
    };

    for (const target of prop.targets) {
      target.userData.mineableRef = prop;
      mineableTargets.push(target);
    }

    props.push(prop);
    cameraObstacleTargets.push(root);
    return;
  }
}

function canPigMoveTo(prop, x, z) {
  if (
    x < -HALF_WORLD + 6
    || x > HALF_WORLD - 6
    || z < -HALF_WORLD + 6
    || z > HALF_WORLD - 6
  ) {
    return false;
  }

  const height = getVisibleTerrainHeight(x, z);
  if (height < WATER_LEVEL + 5.6 || height > 92) {
    return false;
  }

  if (sampleSlope(x, z) > 0.19 || isPointNearAnyCave(x, z, 5.5)) {
    return false;
  }

  for (const other of props) {
    if (!other.active || other === prop) {
      continue;
    }

    const dx = x - other.x;
    const dz = z - other.z;
    const minDistance = prop.colliderRadius + other.colliderRadius + 0.7;
    if (dx * dx + dz * dz < minDistance * minDistance) {
      return false;
    }
  }

  return true;
}

function updatePigProps(delta) {
  pigUpdateAccumulator += delta;
  const updateInterval = getAdaptiveInterval(
    PIG_UPDATE_INTERVAL,
    PIG_UPDATE_INTERVAL_MID_FPS,
    PIG_UPDATE_INTERVAL_LOW_FPS,
  );
  if (pigUpdateAccumulator < updateInterval) {
    return;
  }

  delta = Math.min(pigUpdateAccumulator, 0.11);
  pigUpdateAccumulator = 0;
  const activeRadiusSquared = PIG_ACTIVE_RADIUS * PIG_ACTIVE_RADIUS;

  for (const prop of props) {
    if (!prop.active || prop.type !== "pig") {
      continue;
    }

    const cameraDx = prop.x - camera.position.x;
    const cameraDz = prop.z - camera.position.z;
    const distanceToCameraSquared = cameraDx * cameraDx + cameraDz * cameraDz;
    const reducedTick = distanceToCameraSquared > activeRadiusSquared;
    if (reducedTick && elapsed % PIG_IDLE_TICK_INTERVAL > delta) {
      continue;
    }

    prop.fleeTimer = Math.max(0, prop.fleeTimer - delta);
    prop.wanderTimer -= delta;

    const dx = prop.x - player.position.x;
    const dz = prop.z - player.position.z;
    const playerDistance = Math.hypot(dx, dz);

    let desiredAngle = prop.wanderAngle;
    let targetSpeed = prop.moveSpeed;

    if (playerDistance < PIG_PLAYER_FEAR_RADIUS || prop.fleeTimer > 0) {
      desiredAngle = Math.atan2(dz, dx);
      targetSpeed = PIG_RUN_SPEED;
      prop.wanderTimer = Math.min(prop.wanderTimer, 0.18);
    } else if (prop.wanderTimer <= 0) {
      prop.wanderTimer = PIG_WANDER_INTERVAL * (0.75 + fract((prop.x + prop.z + elapsed) * 0.07) * 0.65);
      desiredAngle += (fract((prop.x - prop.z + elapsed) * 0.11) - 0.5) * 1.8;
      prop.wanderAngle = desiredAngle;
    }

    const nextX = prop.x + Math.cos(desiredAngle) * targetSpeed * delta;
    const nextZ = prop.z + Math.sin(desiredAngle) * targetSpeed * delta;

    if (canPigMoveTo(prop, nextX, nextZ)) {
      prop.x = nextX;
      prop.z = nextZ;
      prop.root.position.x = prop.x;
      prop.root.position.z = prop.z;
      prop.root.position.y = getVisibleTerrainHeight(prop.x, prop.z);
      prop.wanderAngle = desiredAngle;
      prop.stepPhase += delta * targetSpeed * 2.2;
    } else {
      prop.wanderAngle += (fract((prop.x * 0.03 + prop.z * 0.05 + elapsed) * 0.53) - 0.5) * 2.4;
      prop.wanderTimer = 0.3;
    }

    const angleDelta = Math.atan2(
      Math.sin(prop.wanderAngle - prop.root.rotation.y),
      Math.cos(prop.wanderAngle - prop.root.rotation.y),
    );
    prop.root.rotation.y += angleDelta * Math.min(1, delta * 5.6);

    const stride = Math.sin(prop.stepPhase);
    const lift = Math.abs(stride) * 0.08;
    prop.body.position.y = prop.bodyBaseY + lift;
    prop.headPivot.rotation.x = 0.07 + Math.sin(prop.stepPhase * 0.5) * 0.08;

    for (let i = 0; i < prop.legs.length; i += 1) {
      const leg = prop.legs[i];
      const phase = i % 2 === 0 ? prop.stepPhase : prop.stepPhase + Math.PI;
      leg.rotation.x = Math.sin(phase) * 0.34;
      leg.position.y = prop.legBaseHeights[i] + Math.max(0, Math.cos(phase)) * 0.06;
    }
  }
}

function buildCaveStructures() {
  for (const cave of caves) {
    const root = new THREE.Group();
    const samples = cave.samples;

    for (let i = 2; i < samples.length - 1; i += 2) {
      addCaveTunnelSection(root, samples, i);
    }

    addCaveChamberSection(root, samples[samples.length - 1]);
    scene.add(root);
    cameraObstacleTargets.push(root);
    cave.structureRoot = root;

    for (let i = CAVE_TORCH_SAMPLE_STEP; i < samples.length - 2; i += CAVE_TORCH_SAMPLE_STEP) {
      placeCaveTorch(samples[i - 1], samples[i], samples[i + 1], i % 4 === 0 ? 1 : -1);
    }

    const chamber = samples[samples.length - 1];
    const chamberApproach = samples[Math.max(0, samples.length - 3)];
    placeCaveTorch(chamberApproach, chamber, chamber, 1);
    placeCaveTorch(chamberApproach, chamber, chamber, -1);
  }
}

function addCaveTunnelSection(root, samples, index) {
  const sample = samples[index];
  const prev = samples[index - 1] ?? sample;
  const next = samples[index + 1] ?? sample;
  const dirX = next.position.x - prev.position.x;
  const dirZ = next.position.z - prev.position.z;
  const dirLength = Math.hypot(dirX, dirZ);
  const surfaceY = sampleBaseTerrainHeight(sample.position.x, sample.position.z);
  const ceilingY = Math.max(sample.floorY + sample.radius * 1.2, surfaceY - 1.4);
  const tunnelHeight = Math.max(sample.radius * 1.1, ceilingY - sample.floorY);

  const ring = new THREE.Mesh(caveRingGeometry, caveWallMaterial);
  ring.castShadow = false;
  ring.receiveShadow = true;
  ring.position.set(
    sample.position.x,
    sample.floorY + tunnelHeight * 0.5,
    sample.position.z,
  );
  ring.scale.set(sample.radius * 1.5, tunnelHeight, sample.radius * 1.5);
  if (dirLength > 0.001) {
    ring.rotation.y = Math.atan2(dirZ, dirX);
  }
  root.add(ring);

  if (surfaceY - sample.floorY > sample.radius * 1.4) {
    const roof = new THREE.Mesh(caveRoofGeometry, caveRoofMaterial);
    roof.castShadow = false;
    roof.receiveShadow = true;
    roof.position.set(
      sample.position.x,
      sample.floorY + tunnelHeight * 0.98,
      sample.position.z,
    );
    roof.scale.set(
      sample.radius * 1.76,
      Math.max(sample.radius * 0.86, tunnelHeight * 0.68),
      sample.radius * 1.76,
    );
    roof.rotation.y = ring.rotation.y;
    root.add(roof);
  }

  if (index % 6 === 0) {
    for (const sign of [-1, 1]) {
      const sideX = dirLength > 0.001 ? -dirZ / dirLength : 1;
      const sideZ = dirLength > 0.001 ? dirX / dirLength : 0;
      const outcrop = new THREE.Mesh(organicRockGeometry, caveGlowMaterial);
      outcrop.castShadow = false;
      outcrop.receiveShadow = true;
      outcrop.position.set(
        sample.position.x + sideX * sample.radius * 0.7 * sign,
        sample.floorY + sample.radius * 0.46,
        sample.position.z + sideZ * sample.radius * 0.7 * sign,
      );
      outcrop.scale.set(sample.radius * 0.44, sample.radius * 0.52, sample.radius * 0.44);
      outcrop.rotation.set(0.3 * sign, ring.rotation.y + sign * 0.4, 0.12 * sign);
      root.add(outcrop);
    }
  }
}

function addCaveChamberSection(root, chamber) {
  const surfaceY = sampleBaseTerrainHeight(chamber.position.x, chamber.position.z);
  const ceilingY = Math.max(chamber.floorY + chamber.radius * 1.4, surfaceY - 1.8);
  const chamberHeight = Math.max(chamber.radius * 1.2, ceilingY - chamber.floorY);

  const chamberWall = new THREE.Mesh(caveRingGeometry, caveWallMaterial);
  chamberWall.castShadow = false;
  chamberWall.receiveShadow = true;
  chamberWall.position.set(
    chamber.position.x,
    chamber.floorY + chamberHeight * 0.52,
    chamber.position.z,
  );
  chamberWall.scale.set(chamber.radius * 1.72, chamberHeight, chamber.radius * 1.72);
  root.add(chamberWall);

  const chamberRoof = new THREE.Mesh(caveRoofGeometry, caveRoofMaterial);
  chamberRoof.castShadow = false;
  chamberRoof.receiveShadow = true;
  chamberRoof.position.set(
    chamber.position.x,
    chamber.floorY + chamberHeight * 1.04,
    chamber.position.z,
  );
  chamberRoof.scale.set(
    chamber.radius * 1.92,
    Math.max(chamber.radius * 1.12, chamberHeight * 0.82),
    chamber.radius * 1.92,
  );
  root.add(chamberRoof);

  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2 + 0.2;
    const radius = chamber.radius * (0.58 + (i % 2) * 0.12);
    const outcrop = new THREE.Mesh(organicRockGeometry, caveGlowMaterial);
    outcrop.castShadow = false;
    outcrop.receiveShadow = true;
    outcrop.position.set(
      chamber.position.x + Math.cos(angle) * radius,
      chamber.floorY + chamber.radius * 0.34 + (i % 3) * 0.25,
      chamber.position.z + Math.sin(angle) * radius,
    );
    outcrop.scale.set(chamber.radius * 0.46, chamber.radius * 0.62, chamber.radius * 0.46);
    outcrop.rotation.set(0.2 * i, angle, -0.12 * i);
    root.add(outcrop);
  }
}

function placeCaveTorch(prevSample, sample, nextSample, sideSign) {
  const dirX = nextSample.position.x - prevSample.position.x;
  const dirZ = nextSample.position.z - prevSample.position.z;
  const dirLength = Math.hypot(dirX, dirZ);
  const sideX = dirLength > 0.001 ? -dirZ / dirLength : 1;
  const sideZ = dirLength > 0.001 ? dirX / dirLength : 0;
  const x = sample.position.x + sideX * sample.radius * 0.52 * sideSign;
  const z = sample.position.z + sideZ * sample.radius * 0.52 * sideSign;
  const y = getVisibleTerrainHeight(x, z);
  if (y < WATER_LEVEL || Math.abs(y - sample.floorY) > sample.radius * 0.8) {
    return;
  }
  createCatalogBlockProp(buildBlockDefinitions.torch, x, y, z);
}

function syncNearbyProps(centerX, centerZ, radius) {
  const radiusSquared = radius * radius;

  for (const prop of props) {
    if (!prop.active) {
      continue;
    }

    if (prop.buildAttachable) {
      continue;
    }

    const dx = prop.x - centerX;
    const dz = prop.z - centerZ;
    if (dx * dx + dz * dz > radiusSquared) {
      continue;
    }

    const groundHeight = getVisibleTerrainHeight(prop.x, prop.z);
    const slope = sampleSlope(prop.x, prop.z);

    if (groundHeight < WATER_LEVEL + prop.minDryClearance || slope > prop.maxSlope + 0.05) {
      removeProp(prop);
      continue;
    }

    prop.root.position.y = groundHeight - prop.groundInset;
  }
}

function canPlaceProp(x, z, minDryClearance, maxSlope, minimumSpacing) {
  const height = getVisibleTerrainHeight(x, z);
  if (height < WATER_LEVEL + minDryClearance) {
    return false;
  }

  if (isPointNearAnyCave(x, z, minimumSpacing * 0.42)) {
    return false;
  }

  if (sampleSlope(x, z) > maxSlope) {
    return false;
  }

  for (const prop of props) {
    if (!prop.active) {
      continue;
    }

    const dx = x - prop.x;
    const dz = z - prop.z;
    if (dx * dx + dz * dz < minimumSpacing * minimumSpacing) {
      return false;
    }
  }

  return true;
}

function updatePlayerModel(delta) {
  playerModel.visible = viewMode === "third";
  if (!playerModel.visible) {
    return;
  }

  if (playerModel.userData.backpack) {
    playerModel.userData.backpack.visible = hasBackpack;
  }

  const terrainHeight = getVisibleTerrainHeight(player.position.x, player.position.z);
  const waterState = getWaterState(player.position.x, player.position.z, player.position.y - EYE_HEIGHT);
  const visibleGroundHeight = isFlyMode
    || (waterState.present && player.position.y - EYE_HEIGHT > terrainHeight + 0.35)
    ? player.position.y - EYE_HEIGHT
    : terrainHeight;
  playerModel.position.set(
    player.position.x,
    visibleGroundHeight,
    player.position.z,
  );
  playerModel.rotation.y = THREE.MathUtils.lerp(
    playerModel.rotation.y,
    yaw + Math.PI,
    delta * 10,
  );
}

function toggleViewMode() {
  viewMode = viewMode === "first" ? "third" : "first";
}

function createHeldPaletteBlock() {
  const group = new THREE.Group();
  group.renderOrder = 11;
  group.position.set(0.76, -0.78, -2.15);
  group.rotation.set(0, 0, 0);
  group.scale.set(0.24, 0.24, 0.24);
  group.visible = false;
  group.userData.blockId = "";
  group.userData.material = null;
  group.userData.extraMaterials = [];
  group.userData.physicsController = null;
  return group;
}

function applyHeldPaletteBlockDefinition(definition) {
  if (heldPaletteBlock.userData.blockId === definition.id) {
    return;
  }

  if (heldPaletteBlock.userData.material) {
    disposeBlockMaterial(heldPaletteBlock.userData.material);
  }
  for (const extraMaterial of heldPaletteBlock.userData.extraMaterials ?? []) {
    disposeBlockMaterial(extraMaterial);
  }
  heldPaletteBlock.clear();
  heldPaletteBlock.userData.extraMaterials = [];
  heldPaletteBlock.userData.physicsController = null;

  const heldMaterial = cloneBlockMaterial(definition.material, {
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const assembly = createDetailedBlockAssembly(definition, heldMaterial, {
    castShadow: false,
    receiveShadow: false,
    includeCollider: false,
  });
  const extraMaterials = [];
  assembly.root.traverse((node) => {
    if (node.isMesh) {
      node.renderOrder = 11;
      node.material = cloneBlockMaterial(node.material, {
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      extraMaterials.push(node.material);
    }
  });
  heldPaletteBlock.add(assembly.root);
  heldPaletteBlock.position.set(0.76, -0.78, -2.15);
  heldPaletteBlock.scale.setScalar(definition.heldScale ?? 0.22);
  heldPaletteBlock.userData.blockId = definition.id;
  heldPaletteBlock.userData.material = heldMaterial;
  heldPaletteBlock.userData.extraMaterials = extraMaterials;
  heldPaletteBlock.userData.physicsController = assembly.physicsController ?? null;
}

function createPlayerModel() {
  const root = new THREE.Group();

  const outfitMaterial = new THREE.MeshStandardMaterial({ color: 0x35545b, roughness: 1 });
  const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xd7c59a, roughness: 1 });
  const backpackMaterial = new THREE.MeshStandardMaterial({ color: 0x87623b, roughness: 1 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.8, 2.2, 4, 8), outfitMaterial);
  torso.castShadow = true;
  torso.position.y = 2.55;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 10), skinMaterial);
  head.castShadow = true;
  head.position.y = 4.9;

  const legGeometry = new THREE.CylinderGeometry(0.22, 0.25, 1.8, 8);
  const leftLeg = new THREE.Mesh(legGeometry, outfitMaterial);
  leftLeg.castShadow = true;
  leftLeg.position.set(-0.34, 0.9, 0);

  const rightLeg = new THREE.Mesh(legGeometry, outfitMaterial);
  rightLeg.castShadow = true;
  rightLeg.position.set(0.34, 0.9, 0);

  const backpack = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.6, 0.56), backpackMaterial);
  backpack.castShadow = true;
  backpack.position.set(0, 2.55, 0.82);
  backpack.visible = false;

  root.add(torso);
  root.add(head);
  root.add(leftLeg);
  root.add(rightLeg);
  root.add(backpack);
  root.userData.backpack = backpack;
  root.visible = false;
  return root;
}

function createMiningMarker() {
  const marker = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 12, 10),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      depthTest: false,
    }),
  );
  const ring = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createMiningRingTexture(),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
    }),
  );
  const crack = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createMiningCrackTexture(),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
    }),
  );

  ring.scale.set(3, 3, 1);
  crack.scale.set(2.4, 2.4, 1);
  marker.add(ring);
  marker.add(crack);
  marker.add(core);
  marker.visible = false;
  marker.renderOrder = 4;
  marker.userData = { core, ring, crack };
  return marker;
}

function createMiningRingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, 128, 128);
  context.strokeStyle = "rgba(255,255,255,0.95)";
  context.lineWidth = 10;
  context.beginPath();
  context.arc(64, 64, 42, 0, Math.PI * 2);
  context.stroke();

  context.lineWidth = 4;
  context.strokeStyle = "rgba(255,255,255,0.58)";
  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2;
    context.beginPath();
    context.moveTo(64 + Math.cos(angle) * 52, 64 + Math.sin(angle) * 52);
    context.lineTo(64 + Math.cos(angle) * 60, 64 + Math.sin(angle) * 60);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createMiningCrackTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, 128, 128);
  context.strokeStyle = "rgba(255,255,255,0.9)";
  context.lineWidth = 4;
  context.lineCap = "round";

  const crackSets = [
    [[64, 64], [74, 50], [90, 42]],
    [[64, 64], [58, 48], [48, 34]],
    [[64, 64], [80, 70], [98, 78]],
    [[64, 64], [54, 78], [42, 94]],
    [[64, 64], [66, 84], [70, 102]],
  ];

  for (const segments of crackSets) {
    context.beginPath();
    context.moveTo(segments[0][0], segments[0][1]);
    for (let i = 1; i < segments.length; i += 1) {
      context.lineTo(segments[i][0], segments[i][1]);
    }
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function ensureAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!audioState.context) {
    const context = new AudioContextClass();
    const masterGain = context.createGain();
    masterGain.gain.value = 0.2;
    masterGain.connect(context.destination);
    audioState.context = context;
    audioState.masterGain = masterGain;
  }

  if (audioState.context.state === "suspended") {
    audioState.context.resume();
  }

  ensureBackgroundMusic();
  return audioState.context;
}

function playMiningSound(kind) {
  const context = ensureAudio();
  if (!context || !audioState.masterGain) {
    return;
  }

  const now = context.currentTime;

  if (kind === "terrain") {
    if (now - audioState.lastTerrainAt < 0.055) {
      return;
    }
    audioState.lastTerrainAt = now;
    playNoiseBurst(now, 0.095, 360, 0.065);
    playToneBurst(now, 96 + Math.random() * 18, 0.12, "triangle", 0.05, 0.68);
    return;
  }

  if (kind === "tree" || kind === "plank") {
    if (now - audioState.lastTreeAt < 0.05) {
      return;
    }
    audioState.lastTreeAt = now;
    playNoiseBurst(now, 0.06, 760, 0.04);
    playToneBurst(now, 188 + Math.random() * 34, 0.09, "triangle", 0.038, 0.76);
    playToneBurst(now + 0.018, 132 + Math.random() * 18, 0.11, "sine", 0.03, 0.72);
    return;
  }

  if (kind === "pig") {
    if (now - audioState.lastTreeAt < 0.06) {
      return;
    }
    audioState.lastTreeAt = now;
    playToneBurst(now, 260 + Math.random() * 30, 0.08, "triangle", 0.03, 0.92);
    playToneBurst(now + 0.03, 320 + Math.random() * 40, 0.06, "sine", 0.024, 0.88);
    return;
  }

  if (kind === "torch") {
    if (now - audioState.lastTerrainAt < 0.08) {
      return;
    }
    audioState.lastTerrainAt = now;
    playNoiseBurst(now, 0.028, 1350, 0.012);
    playToneBurst(now, 540 + Math.random() * 50, 0.06, "triangle", 0.018, 0.96);
    return;
  }

  if (now - audioState.lastRockAt < 0.045) {
    return;
  }
  audioState.lastRockAt = now;
  playNoiseBurst(now, 0.045, 1550, 0.028);
  playToneBurst(now, 420 + Math.random() * 80, 0.06, "square", 0.026, 0.84);
  playToneBurst(now + 0.012, 680 + Math.random() * 90, 0.05, "triangle", 0.02, 0.88);
}

function playBreakSound(kind) {
  const context = ensureAudio();
  if (!context || !audioState.masterGain) {
    return;
  }

  const now = context.currentTime;

  if (kind === "tree" || kind === "plank") {
    playNoiseBurst(now, 0.11, 620, 0.08);
    playToneBurst(now, 112, 0.18, "triangle", 0.06, 0.56);
    playToneBurst(now + 0.028, 82, 0.2, "sine", 0.04, 0.52);
    return;
  }

  if (kind === "pig") {
    playToneBurst(now, 185, 0.16, "sine", 0.04, 0.82);
    playToneBurst(now + 0.03, 148, 0.2, "triangle", 0.028, 0.78);
    return;
  }

  playNoiseBurst(now, 0.075, 1800, 0.05);
  playToneBurst(now, 520, 0.11, "square", 0.045, 0.82);
  playToneBurst(now + 0.018, 790, 0.09, "triangle", 0.03, 0.86);
}

function playNoiseBurst(startTime, duration, frequency, gainValue) {
  const context = audioState.context;
  if (!context || !audioState.masterGain) {
    return;
  }

  const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    const fade = 1 - i / frameCount;
    channel[i] = (Math.random() * 2 - 1) * fade;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;

  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(frequency, startTime);
  filter.Q.value = 0.7;

  const gain = context.createGain();
  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioState.masterGain);

  source.start(startTime);
  source.stop(startTime + duration);
}

function playToneBurst(startTime, frequency, duration, type, gainValue, endFrequencyMultiplier) {
  const context = audioState.context;
  if (!context || !audioState.masterGain) {
    return;
  }

  const oscillator = context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(40, frequency * endFrequencyMultiplier),
    startTime + duration,
  );

  const gain = context.createGain();
  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioState.masterGain);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

function createMusicOscillator(type, frequency, gainValue, detune = 0) {
  const context = audioState.context;
  if (!context) {
    return null;
  }

  const oscillator = context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.detune.value = detune;

  const gain = context.createGain();
  gain.gain.value = gainValue;

  oscillator.connect(gain);
  return { oscillator, gain };
}

function ensureBackgroundMusic() {
  if (!audioState.context || !audioState.masterGain || audioState.musicStarted) {
    return;
  }

  const context = audioState.context;
  const musicBus = context.createGain();
  musicBus.gain.value = 0.22;
  musicBus.connect(audioState.masterGain);

  const lowpass = context.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 1100;
  lowpass.Q.value = 0.22;
  lowpass.connect(musicBus);

  const lfo = context.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.06;
  const lfoGain = context.createGain();
  lfoGain.gain.value = 260;
  lfo.connect(lfoGain);
  lfoGain.connect(lowpass.frequency);

  const shimmerLfo = context.createOscillator();
  shimmerLfo.type = "triangle";
  shimmerLfo.frequency.value = 0.11;
  const shimmerGain = context.createGain();
  shimmerGain.gain.value = 0.025;

  const pad = createMusicOscillator("triangle", 130.81, 0.035, -8);
  const drone = createMusicOscillator("sine", 98, 0.02, 5);
  const bass = createMusicOscillator("triangle", 65.41, 0.024, 0);
  const shimmer = createMusicOscillator("sine", 261.63, 0.01, 7);

  for (const node of [pad, drone, bass, shimmer]) {
    if (!node) {
      continue;
    }
    node.gain.connect(lowpass);
    if (node === shimmer) {
      shimmerLfo.connect(shimmerGain);
      shimmerGain.connect(node.gain.gain);
    }
    node.oscillator.start();
  }

  lfo.start();
  shimmerLfo.start();
  audioState.musicNodes.push(
    musicBus,
    lowpass,
    lfo,
    lfoGain,
    shimmerLfo,
    shimmerGain,
    pad?.oscillator,
    pad?.gain,
    drone?.oscillator,
    drone?.gain,
    bass?.oscillator,
    bass?.gain,
    shimmer?.oscillator,
    shimmer?.gain,
  );
  audioState.musicStarted = true;
  audioState.musicPulseAt = -Infinity;
}

function updateBackgroundMusic() {
  const context = audioState.context;
  if (!context || !audioState.musicStarted || context.state !== "running") {
    return;
  }

  const now = context.currentTime;
  if (now - audioState.musicPulseAt < 2.45) {
    return;
  }

  audioState.musicPulseAt = now;
  const chords = [
    [196, 246.94, 293.66],
    [174.61, 220, 261.63],
    [164.81, 207.65, 246.94],
    [146.83, 196, 246.94],
  ];
  const chord = chords[Math.floor((elapsed / 10) % chords.length)];
  playToneBurst(now, chord[0] * 0.5, 2.4, "triangle", 0.014, 0.98);
  playToneBurst(now + 0.16, chord[1], 2.1, "sine", 0.012, 0.98);
  playToneBurst(now + 0.33, chord[2], 1.9, "triangle", 0.011, 0.98);
}

function getVisibleTerrainHeight(x, z) {
  groundRayOrigin.set(x, 320, z);
  groundRaycaster.set(groundRayOrigin, WORLD_DOWN);
  const hit = groundRaycaster.intersectObjects(groundSupportTargets, false)[0];
  return hit ? hit.point.y : sampleTerrainHeight(x, z);
}

function sampleTerrainHeight(x, z) {
  return sampleHeightField(terrainHeights, x, z);
}

function sampleBaseTerrainHeight(x, z) {
  return sampleHeightField(baseTerrainHeights, x, z);
}

function sampleHeightField(heights, x, z) {
  const localX = THREE.MathUtils.clamp((x + HALF_WORLD) / CELL_SIZE, 0, GRID_RESOLUTION - 0.00001);
  const localZ = THREE.MathUtils.clamp((z + HALF_WORLD) / CELL_SIZE, 0, GRID_RESOLUTION - 0.00001);
  const ix = Math.floor(localX);
  const iz = Math.floor(localZ);
  const fx = localX - ix;
  const fz = localZ - iz;

  const h00 = terrainHeights[gridIndex(ix, iz)];
  const h10 = terrainHeights[gridIndex(ix + 1, iz)];
  const h01 = terrainHeights[gridIndex(ix, iz + 1)];
  const h11 = terrainHeights[gridIndex(ix + 1, iz + 1)];

  if (fx + fz <= 1) {
    return h00 * (1 - fx - fz) + h10 * fx + h01 * fz;
  }

  return h11 * (fx + fz - 1) + h10 * (1 - fz) + h01 * (1 - fx);
}

function sampleHeightmapSlope(x, z) {
  const epsilon = CELL_SIZE * 0.9;
  const dx = sampleTerrainHeight(x + epsilon, z) - sampleTerrainHeight(x - epsilon, z);
  const dz = sampleTerrainHeight(x, z + epsilon) - sampleTerrainHeight(x, z - epsilon);
  return Math.hypot(dx, dz) / (2 * epsilon);
}

function getHeightmapUphillDirection(x, z) {
  const epsilon = CELL_SIZE * 0.9;
  const dx = sampleTerrainHeight(x + epsilon, z) - sampleTerrainHeight(x - epsilon, z);
  const dz = sampleTerrainHeight(x, z + epsilon) - sampleTerrainHeight(x, z - epsilon);
  const direction = new THREE.Vector2(dx, dz);

  if (direction.lengthSq() < 0.0001) {
    return null;
  }

  return direction.normalize();
}

function sampleSlope(x, z) {
  const epsilon = CELL_SIZE * 0.9;
  const dx = getVisibleTerrainHeight(x + epsilon, z) - getVisibleTerrainHeight(x - epsilon, z);
  const dz = getVisibleTerrainHeight(x, z + epsilon) - getVisibleTerrainHeight(x, z - epsilon);
  return Math.hypot(dx, dz) / (2 * epsilon);
}

function findSpawnPoint() {
  const candidates = [
    { x: 0, z: 0 },
    { x: -120, z: 90 },
    { x: 130, z: -120 },
    { x: -160, z: -40 },
    { x: 90, z: 150 },
  ];

  for (const candidate of candidates) {
    const height = getVisibleTerrainHeight(candidate.x, candidate.z);
    if (
      height > WATER_LEVEL + 6 &&
      sampleSlope(candidate.x, candidate.z) < 0.18 &&
      !isPointNearAnyCave(candidate.x, candidate.z, CAVE_CLEARANCE)
    ) {
      return candidate;
    }
  }

  for (let attempt = 0; attempt < 2000; attempt += 1) {
    const x = randomInRange(-HALF_WORLD * 0.8, HALF_WORLD * 0.8, attempt * 0.73);
    const z = randomInRange(-HALF_WORLD * 0.8, HALF_WORLD * 0.8, attempt * 1.09);
    const height = getVisibleTerrainHeight(x, z);
    if (
      height > WATER_LEVEL + 6 &&
      sampleSlope(x, z) < 0.18 &&
      !isPointNearAnyCave(x, z, CAVE_CLEARANCE)
    ) {
      return { x, z };
    }
  }

  return { x: 0, z: 0 };
}

function addWaterTriangle(vertices, ax, az, bx, bz, cx, cz) {
  vertices.push(
    ax, WATER_LEVEL, az,
    bx, WATER_LEVEL, bz,
    cx, WATER_LEVEL, cz,
  );
}

function pickTerrainColor(height, digDepth) {
  if (digDepth > 12) {
    return new THREE.Color(0x66615b);
  }
  if (digDepth > 3) {
    return new THREE.Color(0x7b6244);
  }
  if (digDepth > 0.35) {
    return new THREE.Color(0x8d714d);
  }
  if (height < WATER_LEVEL + 1.2) {
    return new THREE.Color(0xd2c48a);
  }
  if (height < 18) {
    return new THREE.Color(0x7fa85e);
  }
  if (height < 46) {
    return new THREE.Color(0x66874f);
  }
  if (height < 78) {
    return new THREE.Color(0x726a60);
  }
  return new THREE.Color(0xe3ded2);
}

function getBaseTerrainHeight(x, z) {
  const nx = x * worldProfile.baseFrequency;
  const nz = z * worldProfile.baseFrequency;
  const broad = fbm(nx * worldProfile.broadNoiseScale, nz * worldProfile.broadNoiseScale, 4)
    * worldProfile.broadAmplitude;
  const ridges = ridgeNoise(nx * worldProfile.ridgeFrequency, nz * worldProfile.ridgeFrequency)
    * worldProfile.ridgeAmplitude;
  const detail = fbm(nx * worldProfile.detailFrequency, nz * worldProfile.detailFrequency, 3)
    * worldProfile.detailAmplitude;
  const dunes = Math.sin(nx * worldProfile.duneFrequencyX + worldProfile.dunePhaseX)
    * Math.cos(nz * worldProfile.duneFrequencyZ + worldProfile.dunePhaseZ)
    * worldProfile.duneAmplitude;

  const distanceFromCenter = Math.hypot(
    x * worldProfile.coastStretchX,
    z * worldProfile.coastStretchZ,
  );
  const coastFalloff = -smoothstep(
    worldProfile.coastStart,
    worldProfile.coastEnd,
    distanceFromCenter,
  ) * worldProfile.coastDepth;

  const lakeDistance = Math.hypot(x - worldProfile.lakeX, z - worldProfile.lakeZ);
  const landMask = smoothstep(worldProfile.lakeOuter * 0.42, worldProfile.lakeOuter, lakeDistance);
  const lakeBasin = -(1 - smoothstep(worldProfile.lakeInner, worldProfile.lakeOuter, lakeDistance))
    * worldProfile.lakeDepth;
  const inlandRise = landMask * worldProfile.inlandRise;
  const landRelief = Math.max(
    0,
    broad + ridges * 0.6 + detail * 0.45 - worldProfile.reliefThreshold,
  ) * worldProfile.reliefGain * landMask;

  const mesaDistance = Math.hypot(x - worldProfile.mesaX, z - worldProfile.mesaZ);
  const mesaLift = (1 - smoothstep(worldProfile.mesaInner, worldProfile.mesaOuter, mesaDistance))
    * worldProfile.mesaHeight;

  const terrainShape = broad
    + ridges
    + detail
    + dunes
    + inlandRise
    + landRelief
    + mesaLift;

  return terrainShape * worldProfile.heightScale + coastFalloff + lakeBasin + worldProfile.baseLift;
}

function addSkyDome() {
  const skyGeometry = new THREE.SphereGeometry(1200, 32, 20);
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: skyUniforms,
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 bottomColor;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition).y * 0.5 + 0.5;
        vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.45, h));
        color = mix(color, topColor, smoothstep(0.45, 1.0, h));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  scene.add(new THREE.Mesh(skyGeometry, skyMaterial));
}

function setKeyState(code, pressed) {
  if (code === "KeyW") {
    keys.forward = pressed;
  } else if (code === "KeyS") {
    keys.backward = pressed;
  } else if (code === "KeyA") {
    keys.left = pressed;
  } else if (code === "KeyD") {
    keys.right = pressed;
  } else if (code === "Space") {
    keys.ascend = pressed;
  } else if (code === "ShiftLeft" || code === "ShiftRight") {
    keys.sprint = pressed;
  }
}

function preventGameplayKeyDefaults(event) {
  if (
    event.code === "KeyW" ||
    event.code === "KeyA" ||
    event.code === "KeyS" ||
    event.code === "KeyD" ||
    event.code === "KeyB" ||
    event.code === "KeyC" ||
    event.code === "KeyI" ||
    event.code === "KeyM" ||
    event.code === "KeyX" ||
    /^Digit[1-9]$/.test(event.code) ||
    event.code === "ShiftLeft" ||
    event.code === "ShiftRight" ||
    event.code === "Space"
  ) {
    event.preventDefault();
  }
}

function moveToward(current, target, maxDelta) {
  if (Math.abs(target - current) <= maxDelta) {
    return target;
  }

  return current + Math.sign(target - current) * maxDelta;
}

function applyDrag(value, amount) {
  if (Math.abs(value) <= amount) {
    return 0;
  }

  return value - Math.sign(value) * amount;
}

function gridIndex(ix, iz) {
  return iz * GRID_WIDTH + ix;
}

function gridCellIndex(ix, iz) {
  return iz * GRID_RESOLUTION + ix;
}

function gridToWorldX(ix) {
  return -HALF_WORLD + ix * CELL_SIZE;
}

function gridToWorldZ(iz) {
  return -HALF_WORLD + iz * CELL_SIZE;
}

function ridgeNoise(x, z) {
  return 1 - Math.abs(fbm(x, z, 4));
}

function fbm(x, z, octaves) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let i = 0; i < octaves; i += 1) {
    value += smoothValueNoise(x * frequency, z * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value;
}

function smoothValueNoise(x, z) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const xf = fade(x - x0);
  const zf = fade(z - z0);

  const v00 = valueNoise(x0, z0);
  const v10 = valueNoise(x0 + 1, z0);
  const v01 = valueNoise(x0, z0 + 1);
  const v11 = valueNoise(x0 + 1, z0 + 1);

  const x1 = THREE.MathUtils.lerp(v00, v10, xf);
  const x2 = THREE.MathUtils.lerp(v01, v11, xf);
  return THREE.MathUtils.lerp(x1, x2, zf);
}

function valueNoise(x, z) {
  const raw = Math.sin(x * 127.1 + z * 311.7 + worldSeed * 19.13) * 43758.5453123;
  return fract(raw) * 2 - 1;
}

function randomInRange(min, max, offset) {
  return min + fract(Math.sin(offset * 93.17 + worldSeed * 7.1) * 8127.13) * (max - min);
}

function createWorldProfile(seed) {
  return {
    baseFrequency: 0.0031 + seededFloat(seed, 1.4) * 0.0015,
    broadNoiseScale: 0.42 + seededFloat(seed, 2.7) * 0.28,
    broadAmplitude: 30 + seededFloat(seed, 3.5) * 26,
    ridgeFrequency: 1 + seededFloat(seed, 4.2) * 0.95,
    ridgeAmplitude: 14 + seededFloat(seed, 5.4) * 22,
    detailFrequency: 2 + seededFloat(seed, 6.1) * 1.9,
    detailAmplitude: 5.8 + seededFloat(seed, 7.8) * 8.4,
    duneFrequencyX: 1.1 + seededFloat(seed, 8.3) * 1.4,
    duneFrequencyZ: 0.9 + seededFloat(seed, 9.1) * 1.3,
    dunePhaseX: seededFloat(seed, 10.6) * Math.PI * 2,
    dunePhaseZ: seededFloat(seed, 11.2) * Math.PI * 2,
    duneAmplitude: 2.2 + seededFloat(seed, 12.4) * 7.2,
    coastStretchX: 0.7 + seededFloat(seed, 13.3) * 0.38,
    coastStretchZ: 0.7 + seededFloat(seed, 14.7) * 0.38,
    coastStart: HALF_WORLD * (0.56 + seededFloat(seed, 15.9) * 0.18),
    coastEnd: HALF_WORLD * (0.89 + seededFloat(seed, 16.8) * 0.08),
    coastDepth: 16 + seededFloat(seed, 17.6) * 19,
    lakeX: THREE.MathUtils.lerp(-HALF_WORLD * 0.42, HALF_WORLD * 0.42, seededFloat(seed, 18.7)),
    lakeZ: THREE.MathUtils.lerp(-HALF_WORLD * 0.42, HALF_WORLD * 0.42, seededFloat(seed, 19.4)),
    lakeInner: 52 + seededFloat(seed, 20.8) * 72,
    lakeOuter: 150 + seededFloat(seed, 21.9) * 120,
    lakeDepth: 10 + seededFloat(seed, 22.6) * 18,
    inlandRise: 6 + seededFloat(seed, 23.7) * 14,
    reliefThreshold: 1 + seededFloat(seed, 24.2) * 6,
    reliefGain: 0.18 + seededFloat(seed, 25.5) * 0.2,
    mesaX: THREE.MathUtils.lerp(-HALF_WORLD * 0.45, HALF_WORLD * 0.45, seededFloat(seed, 26.6)),
    mesaZ: THREE.MathUtils.lerp(-HALF_WORLD * 0.45, HALF_WORLD * 0.45, seededFloat(seed, 27.3)),
    mesaInner: 26 + seededFloat(seed, 28.4) * 62,
    mesaOuter: 90 + seededFloat(seed, 29.1) * 118,
    mesaHeight: seededFloat(seed, 30.2) > 0.38 ? 10 + seededFloat(seed, 31.4) * 24 : 0,
    baseLift: 6 + seededFloat(seed, 32.6) * 14,
    heightScale: 1.16 + seededFloat(seed, 33.4) * 0.24,
  };
}

function loadStoredNumber(key, fallback, minimum, maximum) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }

    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }

    return THREE.MathUtils.clamp(parsed, minimum, maximum);
  } catch {
    return fallback;
  }
}

function seededFloat(seed, offset) {
  return fract(Math.sin(offset * 78.233 + seed * 12.9898) * 43758.5453123);
}

function createRandomSeed() {
  return Math.random() * 100000;
}

function fade(value) {
  return value * value * (3 - 2 * value);
}

function smoothstep(edge0, edge1, value) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function fract(value) {
  return value - Math.floor(value);
}
