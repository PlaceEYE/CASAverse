import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

extend({ OrbitControls });

const BackGround = (props) => {
  const texture = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + "/assets/spring.jpg");
  const { scene, gl } = useThree();

  useEffect(() => {
    if (texture) {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(gl, texture);
      scene.background = rt.texture;
    }
  }, [texture, gl, scene]);

  return null;
};

const Box = (props) => {
  const ref = useRef();
  const originalColor = "#bbff2c";
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
    navigate("/CASAverse/summer");
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
      <boxBufferGeometry attach="geometry" />
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
        <Box />
        <Sun position={[0, 3, 0]} />
        <pointLight />
        <Orbit />
        <Suspense fallback={null}>
          <BackGround />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Title;
