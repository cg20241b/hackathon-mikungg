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
    const textMaterialL = new THREE.MeshBasicMaterial({ color: 0xa2b7b3 }); // Change color to #a2b7b3
    const textMeshL = new THREE.Mesh(textGeometryL, textMaterialL);
    textMeshL.position.set(-2, 0, 0);
    scene.add(textMeshL);

	// generate font 3
    const textGeometry3 = new TextGeometry('3', {
        font: font,
        size: 2,
        height: 0.5,
    });
    const textMaterial3 = new THREE.MeshBasicMaterial({ color: 0x5d484c }); // Complementary color of #a2b7b3
    const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);
    textMesh3.position.set(2, 0, 0);
    scene.add(textMesh3);
});

// camera position
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5; 

function animate() {
	renderer.render( scene, camera );
}