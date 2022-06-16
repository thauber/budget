
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from 'gsap';

let camera, scene, renderer;
//let geometry, material, mesh;
const loader = new GLTFLoader();

export function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );

  //Adjusts perspective of Object 
  camera.position.z = 1;
  camera.rotation.z = 1;

  scene = new THREE.Scene();

  //Image Background
  const bg = new THREE.TextureLoader();
  bg.load('/img/BG.png', function (bgImg){
    scene.background = bgImg;
  });

  //Lights
  /*const light = new THREE.AmbientLight( 0xffffff, 1.2 );
  scene.add( light );*/

  const ambientLights = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLights);

  const dirLight = new THREE.DirectionalLight(0x3498db, 1.1);
  dirLight.position.set(0, 1, 0);
  scene.add(dirLight);

  /****Loaded Cube Model
  geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  ****/
 
  //Loads GLTF Model
  loader.load("/models/laptop/scene.gltf", (gltf) => {
    let model = gltf.scene
    model.scale.set(.1, .1, .1)

    //Final Perspective
    gsap.to(camera.position, {
      z: 5,
      duration: 1,
      ease: "back.out(1.7)"
    })

    //Camera Tilt on Z Axis
    gsap.to(camera.rotation, {
      z: -.1,
      duration: 1
    })

    //Rotation Anime around X and Y Axis
    gsap.to(model.rotation, {
      x: .65,
      duration: 1,
      delay: 1
    })

    //Rotates 3D model continually
    gsap.to(model.rotation, {
      y: Math.PI * 1.35,
      duration: 12,
      delay: 1,
      repeat: -1,
      ease: "none"
    })
   
    
    //Model Scale (Stretch)
    gsap.to(model.scale, {
      delay: 1,
      duration: 1,
      x: .25,
      y: .25,
      z: .25
    })

    //Final Positioning
    gsap.to(model.position, {
      delay: 1,
      duration: 1,
      x: 1.2,
      y: 1.5,
    })

    scene.add(model)
  })
  

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);


  //Changes background color 
  //renderer.setClearColor(0x535c68, 1);
  
  document.body.appendChild(renderer.domElement);

  //Makes window resize 
  window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  });
}

function animation(time) {
  //mesh.rotation.x = time / 2000;
  //mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}