import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; // Import FontLoader
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; // Import TextGeometry

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// no 2
const fontLoader = new FontLoader();
fontLoader.load('/node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

	// generate font L
    const textGeometryL = new TextGeometry('L', {
        font: font,
        size: 2,
        height: 0.5,
    });

	//no 3 favorite color
    const ambientIntensity = 0; // because of ambient the colour fades a bit
    const lightPosition = new THREE.Vector3(1, 0, 3); // Position of the cube

    const vertexShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform vec3 lightPosition;
        uniform float ambientIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vec3 lightDir = normalize(lightPosition - vPosition);
            float diff = max(dot(vNormal, lightDir), 0.0);
            vec3 reflectDir = reflect(-lightDir, vNormal);
            vec3 viewDir = normalize(-vPosition);
            float spec = pow(max(dot(viewDir, reflectDir), 0.0), 320.0); // Moderate shininess
            vec3 ambient = vec3(ambientIntensity);
            vec3 diffuse = diff * vec3(0.635, 0.718, 0.702); // Diffuse color #a2b7b3
            vec3 specular = spec * vec3(0.635, 0.718, 0.702); // Specular color related to base color
            gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
        }
    `;

    const textMaterialL = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            lightPosition: { value: lightPosition },
            ambientIntensity: { value: ambientIntensity }
        }
    });

    const textMeshL = new THREE.Mesh(textGeometryL, textMaterialL);
    textMeshL.position.set(-2, 0, 0);
    scene.add(textMeshL);

	// generate font 3
    const textGeometry3 = new TextGeometry('3', {
        font: font,
        size: 2,
        height: 0.5,
    });

	//no 3 complementary color
    const vertexShader3 = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader3 = `
        uniform vec3 lightPosition;
        uniform float ambientIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vec3 lightDir = normalize(lightPosition - vPosition);
            float diff = max(dot(vNormal, lightDir), 0.0);
            vec3 reflectDir = reflect(-lightDir, vNormal);
            vec3 viewDir = normalize(-vPosition);
            float spec = pow(max(dot(viewDir, reflectDir), 0.0), 5.0); // Increased shininess for metallic appearance
            vec3 ambient = vec3(ambientIntensity);
            vec3 diffuse = diff * vec3(0.635, 0.282, 0.298); // Diffuse color complementary to #a2b7b3
            vec3 specular = spec * vec3(1.0, 1.0, 1.0); // Increased specular color intensity
            gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
        }
    `;

    const textMaterial3 = new THREE.ShaderMaterial({
        vertexShader: vertexShader3,
        fragmentShader: fragmentShader3,
        uniforms: {
            lightPosition: { value: lightPosition },
            ambientIntensity: { value: ambientIntensity }
        }
    });

    const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);
    textMesh3.position.set(2, 0, 0);
    scene.add(textMesh3);
});

// no 4
const glowVertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const glowFragmentShader = `
    varying vec3 vNormal;
    void main() {
        float intensity = pow(0.9 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * intensity;
    }
`;

const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    side: THREE.FrontSide,
    blending: THREE.NoBlending,
    transparent: true
});

const glowCubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const glowCube = new THREE.Mesh(glowCubeGeometry, glowMaterial);
glowCube.position.set(1, 0, 3); //position same with light
scene.add(glowCube);

// Add a point light at the position of the cube
const pointLight = new THREE.PointLight(0xffffff, 3, 100);
pointLight.position.set(1, 0, 3); //position same with cube
scene.add(pointLight); 

// camera position
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5; 

document.addEventListener('keydown', onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // Cube movement
    if (keyCode == 87) { // W key
        glowCube.position.y += 0.1;
        pointLight.position.y += 0.1;
		
    } else if (keyCode == 83) { // S key
        glowCube.position.y -= 0.1;
        pointLight.position.y -= 0.1;
    }
    // Camera movement
    if (keyCode == 65) { // A key
        camera.position.x -= 0.1;
    } else if (keyCode == 68) { // D key
        camera.position.x += 0.1;
    }
}

function animate() {
	renderer.render( scene, camera );
}