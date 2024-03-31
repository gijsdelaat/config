function selectOption(category, optionValue) {
    // Deselect all tabs within the same category
    const tabsInCategory = document.querySelectorAll(`.option-tab[data-category="${category}"]`);
    tabsInCategory.forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
    });

    // Select the clicked tab
    const selectedTab = Array.from(tabsInCategory).find(tab => tab.getAttribute('onclick').includes(optionValue));
    if (selectedTab) {
        selectedTab.setAttribute('aria-selected', 'true');
    }

    // Conditional logic for displaying sections based on selected options
    if (category === 'sealShape') {
        updateDimensionInputs(optionValue);
        handleSealExpansionVisibility(optionValue);
    }
}

// Function to show/hide the sealExpansionSection with transitions
function handleSealExpansionVisibility(optionValue) {
    const sealExpansionSection = document.getElementById('sealExpansionSection');
    if (optionValue === 'straight') {
        sealExpansionSection.classList.add('hidden');
    } else {
        sealExpansionSection.classList.remove('hidden');
    }
}

// Function to update dimension inputs visibility based on selected shape
function updateDimensionInputs(shape) {
    // Initially hide all dimension inputs
    const allDimensionInputs = document.querySelectorAll('.dimension-input');
    allDimensionInputs.forEach(input => {
        input.style.display = 'none';
    });

    // Logic to show dimension inputs based on the selected shape
    switch (shape) {
        case 'circular':
            // Show only the diameter input for circular shape
            document.getElementById('diameterInput').style.display = 'block';
            break;
        case 'rectangular':
            // Show length, width, and radius inputs for rectangular shape
            document.getElementById('lengthInput').style.display = 'block';
            document.getElementById('widthInput').style.display = 'block';
            document.getElementById('radiusText').style.display = 'block';
            break;
        case 'straight':
            // Show only the length input for straight shape
            document.getElementById('lengthInput').style.display = 'block';
            break;
        default:
            
    }
}

// You'll need to bind this function to run whenever a shape option is selected.
// Assuming you have buttons for shape selection with onclick handlers, ensure those handlers call this function with the appropriate argument.
// For example:
// <button onclick="selectOption('sealShape', 'circular')">Circular</button>
// Inside selectOption function, call updateDimensionInputs(optionValue) when sealShape category is handled.





    // Select the scene container
    const sceneContainer = document.getElementById('scene-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sceneContainer.offsetWidth / sceneContainer.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
sceneContainer.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xFFFFFF);

    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    function createBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
}

function createCircle() {
    const geometry = new THREE.CircleGeometry(1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    return new THREE.Mesh(geometry, material);
}

function createLine() {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(-1, 0, 0));
    points.push(new THREE.Vector3(1, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
}

function changeGeometry(geometryCreator) {
    // Remove the current object from the scene
    if (currentObject) {
        scene.remove(currentObject);
    }
    // Add the new object to the scene
    currentObject = geometryCreator();
    scene.add(currentObject);
}
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
