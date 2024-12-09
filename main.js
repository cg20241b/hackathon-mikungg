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
    const textMaterialL = new THREE.MeshStandardMaterial({ color: 0xa2b7b3 });
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
    const textMaterial3 = new THREE.MeshStandardMaterial({ color: 0x5d484c });
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
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
});

const glowCubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const glowCube = new THREE.Mesh(glowCubeGeometry, glowMaterial);
glowCube.position.set(0, 0, 2); //position same with light
scene.add(glowCube);

// Add a point light at the position of the cube
const pointLight = new THREE.PointLight(0xffffff, 7, 100);
pointLight.position.set(0, 0, 2); //position same with cube
scene.add(pointLight); 

// camera position
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5; 

function animate() {
	renderer.render( scene, camera );
}