import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SceneInit from './lib/SceneInit.js';

extend({ OrbitControls });

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load(process.env.PUBLIC_URL + "/assets/scene.gltf", (gltfScene) => {
      loadedModel = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(0.1, 0.1, 0.1);
      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.x += 0.01;
        loadedModel.scene.rotation.y += 0.01;
        loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;