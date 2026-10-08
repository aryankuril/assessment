"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

const ModelMesh = () => {
  const groupRef = useRef();
  const baseRotation = useRef({ x: 0, y: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });
  const smoothedMouse = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(0.75);
      } else {
        setScale(1.2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosition.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedMouse.current.x +=
      (mousePosition.current.x - smoothedMouse.current.x) * 0.05;
    smoothedMouse.current.y +=
      (mousePosition.current.y - smoothedMouse.current.y) * 0.05;

    baseRotation.current.x += delta * 0.5;
    baseRotation.current.y += delta * 0.5;

    const mouseInfluenceX = smoothedMouse.current.y * Math.PI * 0.5;
    const mouseInfluenceY = smoothedMouse.current.x * Math.PI * 0.5;

    const targetRotationX = baseRotation.current.x + mouseInfluenceX;
    const targetRotationY = baseRotation.current.y + mouseInfluenceY;

    groupRef.current.rotation.x +=
      (targetRotationX - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y +=
      (targetRotationY - groupRef.current.rotation.y) * 0.1;
  });

  return (
    <>
      <fog attach="fog" args={["#ededed", 2, 6]} />
      <group ref={groupRef} scale={scale}>
        <mesh scale={[1.5, 0.1, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            roughness={0.5}
            metalness={0.7}
            color="#ededed"
          />
        </mesh>
        <mesh scale={[0.1, 1.5, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            roughness={0.5}
            metalness={0.7}
            color="#ededed"
          />
        </mesh>
        <mesh scale={[0.1, 0.1, 1.5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            roughness={0.5}
            metalness={0.7}
            color="#ededed"
          />
        </mesh>
      </group>
    </>
  );
};

const Model = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
      <Stage adjustCamera={false} />
      <ModelMesh />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default Model;
