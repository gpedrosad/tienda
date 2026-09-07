import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export type HouseView = 'exterior' | 'interior' | 'assembly' | 'panel';
export type HouseOptions = { view: HouseView; length: number; separation: number; };
export type HouseScene = { update: (options: HouseOptions) => void; rotate: (direction: number) => void; zoom: (factor: number) => void; reset: () => void; dispose: () => void; };

// Conceptual geometry in metres; not a structural or thermal calculation.
export function createHouseScene(host: HTMLDivElement, initial: HouseOptions, onError: () => void): HouseScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setClearColor('#deded9');
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute('aria-label', 'Modelo 3D de tiny house en DLT. Arrastra para girar o usa los controles de vista.');
  renderer.domElement.setAttribute('role', 'img');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 29;
  controls.maxPolarAngle = Math.PI / 2 - 0.03;
  const ambient = new THREE.HemisphereLight('#eff5ff', '#8b7964', 2.5);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight('#fff1d5', 4);
  sun.position.set(-4, 10, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, far: 35 });
  sun.shadow.normalBias = 0.025;
  sun.shadow.bias = -0.00015;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#dfeaff', 1.5);
  fill.position.set(5, 5, -5);
  scene.add(fill);

  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  function material(color: THREE.ColorRepresentation, roughness = 0.8) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness });
    materials.add(mat);
    return mat;
  }
  // A repeatable, locally generated wood grain; no external image requests.
  const grainCanvas = document.createElement('canvas');
  grainCanvas.width = 128; grainCanvas.height = 512;
  const ctx = grainCanvas.getContext('2d')!;
  ctx.fillStyle = '#d5b080'; ctx.fillRect(0, 0, 128, 512);
  let seed = 19;
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 90; i++) {
    const x = random() * 128;
    ctx.strokeStyle = `rgba(97, 60, 27, ${0.03 + random() * 0.14})`;
    ctx.lineWidth = 0.3 + random(); ctx.beginPath(); ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + random() * 9, 170, x - random() * 7, 350, x + random() * 4, 512); ctx.stroke();
  }
  const grain = new THREE.CanvasTexture(grainCanvas);
  grain.colorSpace = THREE.SRGBColorSpace; grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); textures.add(grain);
  const wood = [0xffffff, 0xe7d4b7, 0xf3e4cc, 0xe6c9a5, 0xf8ebd7].map(color => {
    const mat = material(color); mat.map = grain; return mat;
  });
  const dark = material('#292e2c', 0.65);
  const steel = material('#353d3b', 0.35);
  const concrete = material('#9c9c93');
  const fabric = material('#c8c5b1');
  const linen = material('#eee8d9');
  const sage = material('#798a72');
  const dowelMat = material('#b57b31', 0.55);
  const glass = new THREE.MeshPhysicalMaterial({ color: '#c9dfdc', transparent: true, opacity: 0.22, roughness: 0.12, metalness: 0.15, depthWrite: false, side: THREE.DoubleSide }); materials.add(glass);
  const unitBox = new THREE.BoxGeometry(1, 1, 1); geometries.add(unitBox);
  const dowelGeo = new THREE.CylinderGeometry(0.033, 0.033, 1, 12); geometries.add(dowelGeo);
  function box(parent: THREE.Object3D, size: number[], position: number[], mat: THREE.Material) {
    const mesh = new THREE.Mesh(unitBox, mat); mesh.scale.set(size[0], size[1], size[2]); mesh.position.set(position[0], position[1], position[2]); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function dowel(parent: THREE.Object3D, length: number, position: number[]) {
    const mesh = new THREE.Mesh(dowelGeo, dowelMat); mesh.scale.y = length; mesh.rotation.z = Math.PI / 2; mesh.position.set(...position as [number, number, number]); mesh.castShadow = true; parent.add(mesh);
  }
  const ground = box(scene, [200, 0.12, 200], [0, -0.22, 0], material('#deded9'));
  ground.castShadow = false;
  const house = new THREE.Group(); scene.add(house);
  const detail = new THREE.Group(); scene.add(detail);
  const floor = new THREE.Group(), roof = new THREE.Group(), front = new THREE.Group(), back = new THREE.Group(), left = new THREE.Group(), right = new THREE.Group(), furniture = new THREE.Group(), base = new THREE.Group();
  house.add(floor, roof, front, back, left, right, furniture, base);
  const moveParts = [front, back, left, right, roof];
  const targetPositions = moveParts.map(() => new THREE.Vector3());

  function boards(parent: THREE.Object3D, width: number, height: number, thickness: number, x: number, y: number, z: number) {
    const count = Math.ceil(width / 0.12), step = width / count;
    // Each lamella is visible, with only a hairline seam between boards.
    for (let i = 0; i < count; i++) box(parent, [step - 0.002, height, thickness], [x - width / 2 + step * (i + 0.5), y, z], wood[i % wood.length]);
  }
  function windowFrame(parent: THREE.Object3D, width: number, height: number, x: number, y: number, z: number, divisions = 2) {
    box(parent, [width, height, 0.018], [x, y, z], glass);
    for (const sy of [-1, 1]) box(parent, [width + 0.065, 0.055, 0.11], [x, y + sy * height / 2, z], dark);
    for (let i = 0; i <= divisions; i++) box(parent, [0.05, height, 0.11], [x - width / 2 + width * i / divisions, y, z], dark);
  }

  function build(length: number) {
    for (const group of [floor, roof, front, back, left, right, furniture, base]) group.clear();
    const half = length / 2;
    const yFloor = 0.55, yWall = 1.91, height = 2.6;
    // Footings, beams and a separate deck.
    for (const x of [-half + 0.35, 0, half - 0.35]) for (const z of [-1.35, 1.35]) box(base, [0.32, 0.4, 0.32], [x, 0.1, z], concrete);
    for (const z of [-1.35, 1.35]) box(base, [length, 0.18, 0.14], [0, 0.35, z], dark);
    for (let i = 0; i < 29; i++) box(floor, [length, 0.16, 3.4 / 29 - 0.002], [0, yFloor, -1.7 + (i + 0.5) * 3.4 / 29], wood[i % 5]);
    for (let i = 0; i < Math.ceil(length / 0.16); i++) box(base, [0.153, 0.11, 1.5], [-half + 0.08 + i * 0.16, 0.38, 2.46], wood[(i + 2) % 5]);
    box(base, [2.2, 0.16, 0.4], [1, 0.18, 3.3], wood[1]);
    // Main long wall: bedroom wall on the left, sliding glazing on the right.
    const solidWidth = length * 0.37, glassWidth = length - solidWidth - 0.2;
    boards(front, solidWidth, height, 0.096, -half + solidWidth / 2, yWall, 1.7);
    windowFrame(front, glassWidth, 2.45, -half + solidWidth + glassWidth / 2, 1.86, 1.7, 3);
    boards(front, length, 0.12, 0.12, 0, 3.15, 1.7);
    boards(back, length, height, 0.096, 0, yWall, -1.7);
    // End panels use the same lamella construction, rotated into the side plane.
    const west = new THREE.Group(); left.add(west); west.rotation.y = Math.PI / 2; west.position.x = -half;
    boards(west, 3.4, 0.9, 0.096, 0, 1.06, 0);
    boards(west, 3.4, 0.55, 0.096, 0, 2.935, 0);
    for (const x of [-1.43, 1.43]) boards(west, 0.54, 1.15, 0.096, x, 2.085, 0);
    windowFrame(west, 2.32, 1.15, 0, 2.085, 0, 2);
    const east = new THREE.Group(); right.add(east); east.rotation.y = Math.PI / 2; east.position.x = half;
    windowFrame(east, 3.4, 2.6, 0, yWall, 0, 2);
    // Gable infill made of individual boards.
    for (const side of [-1, 1]) {
      const end = side < 0 ? left : right;
      for (let i = 0; i < 29; i++) {
        const z = -1.7 + (i + 0.5) * 3.4 / 29;
        const h = (1 - Math.abs(z) / 1.7) * 0.82;
        box(end, [0.096, h, 3.4 / 29 - 0.002], [side * half, 3.21 + h / 2, z], wood[i % 5]);
      }
    }
    const slope = Math.atan2(0.9, 1.88), roofWidth = Math.hypot(1.88, 0.9);
    for (const side of [-1, 1]) {
      const wing = new THREE.Group(); roof.add(wing); wing.position.set(0, 3.64, side * 0.94); wing.rotation.x = -side * slope;
      box(wing, [length + 0.5, 0.12, roofWidth], [0, 0, 0], wood[0]);
      box(wing, [length + 0.55, 0.035, roofWidth + 0.08], [0, 0.085, 0], dark);
      for (let x = -half - 0.2; x <= half + 0.2; x += 0.32) box(wing, [0.018, 0.035, roofWidth + 0.08], [x, 0.113, 0], steel);
    }
    box(roof, [length + 0.6, 0.085, 0.16], [0, 4.12, 0], dark);
    // Furnished open-plan study: sleeping, living, dining and kitchen zones.
    const bedX = -half + 1.18;
    box(furniture, [2, 0.22, 1.48], [bedX, 0.77, 0.45], wood[2]);
    box(furniture, [1.94, 0.22, 1.42], [bedX, 0.98, 0.45], linen);
    box(furniture, [1.27, 0.07, 1.44], [bedX + 0.25, 1.12, 0.45], sage);
    for (const z of [0.1, 0.8]) box(furniture, [0.4, 0.12, 0.52], [bedX - 0.67, 1.14, z], linen);
    box(furniture, [0.07, 0.75, 1.55], [bedX - 1, 1, 0.45], wood[3]);
    // Low partition and storage behind the bed.
    box(furniture, [0.1, 1.2, 1.45], [-half + 2.3, 1.23, -0.95], wood[1]);
    box(furniture, [1.1, 1.7, 0.48], [-half + 0.7, 1.48, -1.35], wood[3]);
    for (let y = 0.95; y < 2.3; y += 0.4) box(furniture, [1.02, 0.035, 0.52], [-half + 0.7, y, -1.33], wood[0]);
    box(furniture, [1.5, 0.3, 0.66], [0, 0.89, -1.13], fabric);
    box(furniture, [1.5, 0.52, 0.16], [0, 1.1, -1.46], fabric);
    for (const x of [-0.69, 0.69]) box(furniture, [0.14, 0.46, 0.7], [x, 1.04, -1.1], fabric);
    box(furniture, [1.8, 0.02, 1.15], [0.2, 0.645, 0.15], materialOnceRug);
    box(furniture, [0.78, 0.08, 0.5], [0.15, 1.03, 0.1], wood[1]);
    for (const x of [-0.12, 0.42]) box(furniture, [0.045, 0.36, 0.045], [x, 0.83, 0.1], dark);
    const kitchenX = half - 0.9;
    box(furniture, [1.62, 0.84, 0.62], [kitchenX, 1.05, -1.3], sage);
    box(furniture, [1.72, 0.06, 0.68], [kitchenX, 1.5, -1.3], linen);
    for (let i = 0; i < 3; i++) {
      box(furniture, [0.018, 0.69, 0.025], [kitchenX - 0.8 + i * 0.54, 1.06, -0.975], dark);
      box(furniture, [0.17, 0.025, 0.035], [kitchenX - 0.56 + i * 0.54, 1.33, -0.958], dark);
    }
    box(furniture, [0.46, 0.013, 0.4], [kitchenX + 0.4, 1.538, -1.3], dark);
    box(furniture, [0.42, 0.018, 0.36], [kitchenX - 0.37, 1.54, -1.3], steel);
    box(furniture, [0.035, 0.3, 0.035], [kitchenX - 0.4, 1.68, -1.53], steel);
    box(furniture, [0.035, 0.035, 0.15], [kitchenX - 0.4, 1.83, -1.47], steel);
    box(furniture, [1.6, 0.05, 0.27], [kitchenX, 2.29, -1.5], wood[1]);
    box(furniture, [0.85, 0.06, 0.72], [half - 1.12, 1.4, 0.72], wood[0]);
    for (const x of [half - 1.44, half - 0.8]) for (const z of [0.47, 0.97]) box(furniture, [0.04, 0.72, 0.04], [x, 1.01, z], dark);
    for (const z of [0.07, 1.36]) {
      box(furniture, [0.42, 0.07, 0.4], [half - 1.12, 1.08, z], sage);
      for (const x of [half - 1.28, half - 0.96]) box(furniture, [0.035, 0.42, 0.3], [x, 0.83, z], dark);
    }
    // Dowels across a visible front-wall sample, in assembly mode.
    for (const y of [1.08, 1.83, 2.58]) dowel(front, solidWidth + 0.1, [-half + solidWidth / 2, y, 1.7]);
  }
  const materialOnceRug = material('#aaa691');
  build(initial.length);

  // Enlarged explanatory panel. Cylinders pass across the grain and through all boards.
  const sampleBoards: THREE.Mesh[] = [];
  for (let i = 0; i < 12; i++) sampleBoards.push(box(detail, [0.19, 2.6, 0.24], [(i - 5.5) * 0.192, 1.9, 0], wood[i % 5]));
  for (const y of [1.05, 1.9, 2.75]) dowel(detail, 2.85, [0, y, 0]);
  detail.rotation.y = -0.15;

  let options = initial;
  let disposed = false, inView = true, frame = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastTime = 0;
  function draw(time: number) {
    frame = 0;
    if (disposed || !inView || document.hidden) return;
    const dt = Math.min((time - lastTime) / 1000 || 0.016, 0.05); lastTime = time;
    let moving = false;
    moveParts.forEach((group, i) => {
      if (group.position.distanceTo(targetPositions[i]) > 0.002) {
        if (reducedMotion.matches) group.position.copy(targetPositions[i]);
        else group.position.lerp(targetPositions[i], 1 - Math.exp(-dt * 7));
        moving = true;
      } else group.position.copy(targetPositions[i]);
    });
    const changed = controls.update();
    renderer.render(scene, camera);
    if (moving || changed) invalidate();
  }
  function invalidate() { if (!frame && !disposed && inView && !document.hidden) frame = requestAnimationFrame(draw); }
  function reset() {
    const isPanel = options.view === 'panel';
    camera.position.set(...(isPanel ? [4.5, 3.6, 6.2] : options.view === 'interior' ? [8, 10, 12] : [10, 7, 12]) as [number, number, number]);
    controls.target.set(0, isPanel ? 1.8 : options.view === 'assembly' ? 2.3 : 1.3, 0);
    controls.minDistance = isPanel ? 3 : 6;
    const narrow = host.clientWidth < 600;
    camera.position.sub(controls.target).multiplyScalar(narrow ? 1.3 : 1).add(controls.target);
    controls.update(); invalidate();
  }
  function update(next: HouseOptions) {
    const changedView = next.view !== options.view;
    if (next.length !== options.length) build(next.length);
    options = next;
    house.visible = next.view !== 'panel'; detail.visible = next.view === 'panel';
    roof.visible = next.view !== 'interior'; front.visible = next.view !== 'interior'; right.visible = next.view !== 'interior';
    furniture.visible = next.view !== 'assembly';
    const amount = next.view === 'assembly' ? next.separation / 100 : 0;
    targetPositions[0].set(0, amount * 0.5, amount * 2.1);
    targetPositions[1].set(0, amount * 0.5, -amount * 2.1);
    targetPositions[2].set(-amount * 1.8, amount * 0.5, 0);
    targetPositions[3].set(amount * 1.8, amount * 0.5, 0);
    targetPositions[4].set(0, amount * 3, 0);
    sampleBoards.forEach((board, i) => { board.position.z = i > 7 ? 0.68 : 0; });
    if (changedView) reset();
    invalidate();
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); invalidate();
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) invalidate(); else { cancelAnimationFrame(frame); frame = 0; } }); observer.observe(host);
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else invalidate(); };
  document.addEventListener('visibilitychange', visibility);
  const contextLost = (event: Event) => { event.preventDefault(); onError(); };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  controls.addEventListener('change', invalidate);
  update(initial); reset(); resize();
  return {
    update, reset,
    rotate(direction) { const offset = camera.position.clone().sub(controls.target); offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), direction * Math.PI / 8); camera.position.copy(controls.target).add(offset); controls.update(); invalidate(); },
    zoom(factor) { const offset = camera.position.clone().sub(controls.target); offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance)); camera.position.copy(controls.target).add(offset); controls.update(); invalidate(); },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      controls.removeEventListener('change', invalidate); controls.dispose();
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
      sun.shadow.map?.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
