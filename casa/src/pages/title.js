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
      <meshPhysicalMaterial attach="material" metalness={0.7} roughness={0.5} color={originalColor} />
    </mesh>
  );
};

const Sphere2 = (props) => {
    const ref = useRef();
    const originalColor = "cyan";
    const hoverColor = "#BBFF2c";
    const navigate = useNavigate();
    let theta = 0;
  
    useFrame((state) => {
      theta += 0.005;
      ref.current.position.x = 3 * Math.sin(theta);
      ref.current.position.z = 2 * Math.cos(theta);
      ref.current.rotation.x += 0.01;
      ref.current.rotation.z += 0.01;
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
  
    return (
      <mesh
        ref={ref}
        {...props}
        castShadow
        receiveShadow
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereBufferGeometry args={[0.3, 32, 32]} attach="geometry" />
        <meshPhysicalMaterial attach="material" metalness={0.5} roughness={0.5} color={originalColor} />
      </mesh>
    );
  };

const Sun = (props) => {
    const ref = useRef();
    let theta = 0;
  
    useFrame((state, delta) => {
      theta += 0.0075;
      ref.current.position.x = 15 * Math.sin(theta);
      ref.current.position.y = 15 * Math.cos(theta);
      ref.current.position.z = 15 * Math.sin(theta) * Math.cos(theta);
    });
  
    return (
      <mesh ref={ref} {...props}>
        <pointLight castShadow />
      </mesh>
    );
  };

const Sun2 = (props) => {
    const ref = useRef();
    let theta = 0;
  
    useFrame((state, delta) => {
      theta -= 0.015;
      ref.current.position.x = 21 * Math.sin(theta);
      ref.current.position.y = 0;
      ref.current.position.z = 21 * Math.cos(theta);; // Keep it constant if you want it to move in 2D space
    });
  
    return (
      <mesh ref={ref} {...props}>
        <pointLight castShadow />
      </mesh>
    );
  };

  const Sun3 = (props) => {
    const ref = useRef();
    let theta = 0;
  
    useFrame((state, delta) => {
      theta += 0.0015;
      ref.current.position.x = 21 * Math.sin(theta);
      ref.current.position.y = 21 * Math.cos(theta);
      ref.current.position.z = 21 * Math.cos(theta);; // Keep it constant if you want it to move in 2D space
    });
  
    return (
      <mesh ref={ref} {...props}>
        <pointLight castShadow />
      </mesh>
    );
  };

  const Sun4 = (props) => {
    const ref = useRef();
    let theta = 0;
  
    useFrame((state, delta) => {
      theta -= 0.0015;
      ref.current.position.x = 21 * Math.sin(theta);
      ref.current.position.y = 21 * Math.cos(theta);
      ref.current.position.z = 15 * Math.cos(theta);; // Keep it constant if you want it to move in 2D space
    });
  
    return (
      <mesh ref={ref} {...props}>
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
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          <Sphere />
          <Sphere2 />
        </Suspense>
        <Sun position={[3, 3, 3]} />
        <Sun2 position={[3, 3, 3]} />
        <Sun3 position={[3, 3, 3]} />
        <Sun4 position={[-3, 3, -3]} />
        <pointLight />
        <Orbit />
      </Canvas>
    </div>
  );
}

export default Title;
