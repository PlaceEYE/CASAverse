import React, { useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ShaderMaterial } from 'three';
import Modal from 'react-modal';
import './App.css';

extend({ OrbitControls });

function Sphere(props) {
  const mesh = useRef();
  const { camera, gl } = useThree();

  useFrame(() => (mesh.current.rotation.y += 0.01));

  const gradientShader = {
    uniforms: {},
    vertexShader: `
      varying vec3 vUv; 

      void main() {
        vUv = position; 
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(vUv.y * 0.5 + 0.5, 1.0, vUv.y * -0.5 + 0.5, 1.0);
      }
    `,
  };

  return (
    <>
      <mesh {...props} ref={mesh}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial attach="material" args={[gradientShader]} />
      </mesh>
      <OrbitControls args={[camera, gl.domElement]} />
    </>
  );
}

function Shape(props) {
  const { onClick, color } = props;
  return (
    <mesh {...props} onClick={onClick}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleShapeClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Canvas style={{ background: '#000' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Sphere position={[0, 0, 0]} />
        <Shape position={[-2, 0, 0]} onClick={handleShapeClick} color="pink" />
        <Shape position={[2, 0, 0]} onClick={handleShapeClick} color="gray" />
        <Shape position={[0, 2, 0]} onClick={handleShapeClick} color="blue" />
        <Shape position={[0, -2, 0]} onClick={handleShapeClick} color="brown" />
      </Canvas>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Shape Clicked"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>A shape was clicked</div>
      </Modal>
    </>
  );
}

export default App;
