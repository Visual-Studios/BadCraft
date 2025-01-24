let scene, camera, renderer;
let raycaster, mouse;
let blocks = [];
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
const velocity = new THREE.Vector3();

init();
animate();

function init() {
    console.log("Initializing scene...");

    // Set up the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up raycaster and mouse
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    console.log("Scene initialized.");

    // Add event listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        const position = intersect.point.clone().floor().addScalar(0.5);
        const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
        const blockMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
        const block = new THREE.Mesh(blockGeometry, blockMaterial);
        block.position.copy(position);
        scene.add(block);
        blocks.push(block);
    }
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (moveForward) velocity.z -= 0.1;
    if (moveBackward) velocity.z += 0.1;
    if (moveLeft) velocity.x -= 0.1;
    if (moveRight) velocity.x += 0.1;

    camera.position.add(velocity);
    velocity.multiplyScalar(0.9); // Damping

    renderer.render(scene, camera);
}