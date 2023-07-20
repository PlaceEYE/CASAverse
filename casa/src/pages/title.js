import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";

extend({ OrbitControls });

const Sphere = (props) => {
  const ref = useRef();
  const originalColor = "#BBFF2c";
  const hoverColor = "cyan";
  const navigate = useNavigate();

  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const handlePointerEnter = (e) => {
    e.object.scale.x = 1.5;
    e.object.scale.y = 1.5;
    e.object.scale.z = 1.5;
    e.object.material.color.set(hoverColor);
  };

  const handlePointerLeave = (e) => {
    e.object.scale.x = 1;
    e.object.scale.y = 1;
    e.object.scale.z = 1;
    e.object.material.color.set(originalColor);
  };

  const handleClick = () => {
    navigate("/CASAverse/spring");
  };

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      receiveShadow
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <sphereBufferGeometry args={[1, 32, 32]} attach="geometry" />
      <meshPhysicalMaterial attach="material" metalness={0.5} roughness={0.5} color={originalColor} />
    </mesh>
  );
};

const Sun = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
    </mesh>
  );
};

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

function Title() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows style={{ background: "black" }} camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <Sphere />
        </Suspense>
        <Sun position={[3, 3, 3]} />
        <pointLight />
        <Orbit />
      </Canvas>
    </div>
  );
}

export default Title;
