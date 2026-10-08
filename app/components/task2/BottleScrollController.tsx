'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { LuxuryBottleMesh, VariantConfig } from './LuxuryBottleMesh';

interface ControllerProps {
  scrollProgress: number;
  activeVariant: VariantConfig;
  useGlbModel?: boolean;
}

interface RollingKeyframe {
  progress: number;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
}

const desktopRollingKeyframes: RollingKeyframe[] = [
  { progress: 0.00, pos: [0, -0.2, 0], rot: [0, 0, 0], scale: 1.0 },
  { progress: 0.22, pos: [2.1, 0.15, 0.3], rot: [-0.3, 2.2, -2.5], scale: 1.18 }, // Rolls Right (The Rebel - Red)
  { progress: 0.50, pos: [-2.1, -0.1, 0.2], rot: [0.4, -2.5, 2.8], scale: 1.25 }, // Rolls Left (The Dreamer - Blue)
  { progress: 0.76, pos: [0, -1.35, 2.1], rot: [0.8, 5.2, -0.4], scale: 1.45 },   // Rolls Center Cap Close-Up (The Sage - Green)
  { progress: 1.00, pos: [0, -0.1, 0], rot: [0, Math.PI * 2, 0], scale: 1.05 },  // Landing
];

const mobileRollingKeyframes: RollingKeyframe[] = [
  { progress: 0.00, pos: [0, 0.15, -0.4], rot: [0, 0, 0], scale: 0.72 },
  { progress: 0.22, pos: [0.45, 0.65, -0.3], rot: [-0.2, 1.8, -1.8], scale: 0.76 },
  { progress: 0.50, pos: [-0.45, -0.55, -0.2], rot: [0.3, -2.1, 2.0], scale: 0.80 },
  { progress: 0.76, pos: [0, -0.85, 1.1], rot: [0.65, 4.8, -0.3], scale: 0.92 },
  { progress: 1.00, pos: [0, 0.05, -0.3], rot: [0, Math.PI * 2, 0], scale: 0.75 },
];

function interpolateKeyframes(t: number, keyframes: RollingKeyframe[]) {
  if (t <= keyframes[0].progress) return keyframes[0];
  if (t >= keyframes[keyframes.length - 1].progress) return keyframes[keyframes.length - 1];

  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].progress < t) {
    i++;
  }

  const k1 = keyframes[i];
  const k2 = keyframes[i + 1];
  const alpha = (t - k1.progress) / (k2.progress - k1.progress);
  
  // Smooth cubic ease-in-out curve
  const ease = alpha < 0.5 ? 4 * alpha * alpha * alpha : 1 - Math.pow(-2 * alpha + 2, 3) / 2;

  const px = THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], ease);
  const py = THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], ease);
  const pz = THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], ease);

  const rx = THREE.MathUtils.lerp(k1.rot[0], k2.rot[0], ease);
  const ry = THREE.MathUtils.lerp(k1.rot[1], k2.rot[1], ease);
  const rz = THREE.MathUtils.lerp(k1.rot[2], k2.rot[2], ease);

  const scale = THREE.MathUtils.lerp(k1.scale, k2.scale, ease);

  return { pos: [px, py, pz] as [number, number, number], rot: [rx, ry, rz] as [number, number, number], scale };
}

export function BottleScrollController({ scrollProgress, activeVariant, useGlbModel }: ControllerProps) {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const smoothedProgress = useRef(0);
  const prevProgress = useRef(0);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7.5;
  const keyframes = isMobile ? mobileRollingKeyframes : desktopRollingKeyframes;

  // Mouse parallax state
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!bottleGroupRef.current) return;

    // Smooth scroll progress interpolation (heavy fluid lerp)
    const targetP = Math.max(0, Math.min(1, scrollProgress));
    const lerpSpeed = Math.min(1, delta * 3.8);
    smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, targetP, lerpSpeed);

    // Scroll velocity for dynamic rolling acceleration
    const velocity = (targetP - prevProgress.current);
    prevProgress.current = targetP;

    // Calculate interpolated position & rotation keyframes
    const targetTransform = interpolateKeyframes(smoothedProgress.current, keyframes);

    // Idle weightless floating wave
    const elapsedTime = state.clock.getElapsedTime();
    const floatY = Math.sin(elapsedTime * 1.5) * 0.05;
    const floatRotZ = Math.cos(elapsedTime * 1.2) * 0.02;

    // Interactive mouse tilt
    const mouseTiltX = mouse.current.y * 0.12;
    const mouseTiltY = mouse.current.x * 0.20;

    // Extra dynamic rolling momentum when user scrolls fast!
    const dynamicRoll = velocity * 4.5;

    // Smoothly apply position (X, Y, Z)
    bottleGroupRef.current.position.x = THREE.MathUtils.lerp(
      bottleGroupRef.current.position.x,
      targetTransform.pos[0] + mouse.current.x * 0.12,
      delta * 5.5
    );
    bottleGroupRef.current.position.y = THREE.MathUtils.lerp(
      bottleGroupRef.current.position.y,
      targetTransform.pos[1] + floatY + mouse.current.y * 0.08,
      delta * 5.5
    );
    bottleGroupRef.current.position.z = THREE.MathUtils.lerp(
      bottleGroupRef.current.position.z,
      targetTransform.pos[2],
      delta * 5.5
    );

    // Smoothly apply rolling rotation (X, Y, Z)
    bottleGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      bottleGroupRef.current.rotation.x,
      targetTransform.rot[0] + mouseTiltX,
      delta * 5.5
    );
    bottleGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      bottleGroupRef.current.rotation.y,
      targetTransform.rot[1] + mouseTiltY + dynamicRoll * 0.5,
      delta * 5.5
    );
    bottleGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      bottleGroupRef.current.rotation.z,
      targetTransform.rot[2] + floatRotZ - dynamicRoll * 2.0,
      delta * 5.5
    );

    // Smoothly apply scale
    const curScale = bottleGroupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(curScale, targetTransform.scale, delta * 5.5);
    bottleGroupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={bottleGroupRef}>
      <LuxuryBottleMesh
        activeVariant={activeVariant}
        useGlbModel={useGlbModel}
        scrollProgress={scrollProgress}
      />
    </group>
  );
}
