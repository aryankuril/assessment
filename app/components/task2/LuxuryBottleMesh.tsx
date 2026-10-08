'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export interface VariantConfig {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  accentHex: string;
  glowHex: string;
  description: string;
  notes: string;
}

interface LuxuryBottleProps {
  activeVariant: VariantConfig;
  useGlbModel?: boolean;
  scrollProgress?: number;
}

export function LuxuryBottleMesh({ activeVariant, useGlbModel = true }: LuxuryBottleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const glassMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const collarMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const pumpMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Try to load GLB bottle model safely
  let glbScene: THREE.Group | null = null;
  try {
    const gltf = useGLTF('/models/bottle.glb', true);
    if (gltf && gltf.scene) {
      glbScene = gltf.scene;
    }
  } catch (e) {
    glbScene = null;
  }

  // Generate dynamic canvas label texture
  const labelTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, 1024, 1024);

    // Luxury outer border
    ctx.strokeStyle = activeVariant.accentHex || '#d4af37';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 944, 944);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 904, 904);

    // Brand Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px "Oswald", "Geist", "Cinzel", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FLUX THEORY', 512, 220);

    // Subheader Line
    ctx.strokeStyle = activeVariant.accentHex || '#d4af37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(312, 260);
    ctx.lineTo(712, 260);
    ctx.stroke();

    // Variant Title
    ctx.fillStyle = activeVariant.accentHex || '#d4af37';
    ctx.font = '700 80px "Oswald", "Geist", sans-serif';
    ctx.fillText(activeVariant.name.toUpperCase(), 512, 380);

    // Category
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 34px sans-serif';
    ctx.fillText('LUXURY BODY WASH • 250 ML / 8.4 FL OZ', 512, 450);

    // Formula details box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(140, 520, 744, 280);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(140, 520, 744, 280);

    ctx.fillStyle = '#e4e4e7';
    ctx.font = '600 38px sans-serif';
    ctx.fillText('ACTIVE FORMULATION', 512, 590);

    ctx.fillStyle = '#d4d4d8';
    ctx.font = '400 30px sans-serif';
    ctx.fillText('5% NIACINAMIDE + QUAD HYALURONIC ACID', 512, 650);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '400 26px sans-serif';
    ctx.fillText(activeVariant.subtitle.toUpperCase(), 512, 710);
    ctx.fillText('DERMATOLOGICALLY TESTED • ZERO SULFATES', 512, 750);

    // Bottom Serial
    ctx.fillStyle = '#71717a';
    ctx.font = '400 24px monospace';
    ctx.fillText('BATCH: FLUX-2026-SKIN • PARIS / TOKYO', 512, 890);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [activeVariant]);

  // Smooth skin color morphing on frame
  useFrame((_, delta) => {
    const targetColor = new THREE.Color(activeVariant.glowHex);
    const accentColor = new THREE.Color(activeVariant.accentHex);

    if (liquidMatRef.current) {
      liquidMatRef.current.color.lerp(targetColor, delta * 5);
      if (liquidMatRef.current.attenuationColor) {
        liquidMatRef.current.attenuationColor.lerp(targetColor, delta * 5);
      }
    }
    if (glassMatRef.current && glassMatRef.current.attenuationColor) {
      glassMatRef.current.attenuationColor.lerp(targetColor, delta * 5);
    }
    if (collarMatRef.current) {
      collarMatRef.current.color.lerp(accentColor, delta * 5);
    }
    if (pumpMatRef.current) {
      pumpMatRef.current.color.lerp(accentColor, delta * 5);
    }
  });

  // Prepare GLB scene if available
  const preparedGlbScene = useMemo(() => {
    if (!glbScene) return null;
    const cloned = glbScene.clone(true);
    
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetScale = 3.2 / maxDim;
      cloned.scale.set(targetScale, targetScale, targetScale);
    }
    const centerBox = new THREE.Box3().setFromObject(cloned);
    const center = centerBox.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = Math.min(mat.roughness, 0.3);
          mat.envMapIntensity = 2.5;
        }
      }
    });
    return cloned;
  }, [glbScene]);

  if (useGlbModel && preparedGlbScene) {
    return (
      <group ref={groupRef}>
        <primitive object={preparedGlbScene} />
      </group>
    );
  }

  // Procedural Custom Luxury Cosmetic Bottle with Dynamic Skin
  return (
    <group ref={groupRef} dispose={null}>
      {/* 1. Outer Glass Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.72, 0.76, 2.8, 64, 16]} />
        <meshPhysicalMaterial
          ref={glassMatRef}
          color="#18181b"
          transmission={0.82}
          opacity={1}
          transparent
          roughness={0.15}
          metalness={0.08}
          ior={1.52}
          thickness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
          envMapIntensity={2.5}
          attenuationColor={activeVariant.glowHex}
          attenuationDistance={0.8}
        />
      </mesh>

      {/* 2. Inner Liquid Core (Morphs color per section skin) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.67, 0.70, 2.6, 64]} />
        <meshPhysicalMaterial
          ref={liquidMatRef}
          color={activeVariant.glowHex}
          transmission={0.55}
          opacity={0.95}
          transparent
          roughness={0.25}
          metalness={0.1}
          ior={1.38}
          attenuationColor={activeVariant.glowHex}
          attenuationDistance={0.5}
        />
      </mesh>

      {/* 3. Front Brand Label Decal */}
      {labelTexture && (
        <mesh position={[0, -0.05, 0.762]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.05, 1.9]} />
          <meshStandardMaterial
            map={labelTexture}
            roughness={0.35}
            metalness={0.1}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      )}

      {/* 4. Bottle Shoulder */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.72, 0.35, 64]} />
        <meshPhysicalMaterial
          color="#18181b"
          transmission={0.8}
          transparent
          roughness={0.15}
          clearcoat={1.0}
        />
      </mesh>

      {/* 5. Metallic Neck Collar */}
      <mesh position={[0, 1.72, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.40, 0.22, 64]} />
        <meshStandardMaterial
          ref={collarMatRef}
          color={activeVariant.accentHex || '#d4af37'}
          metalness={0.92}
          roughness={0.2}
          envMapIntensity={3.0}
        />
      </mesh>

      {/* Ribbed Collar Ring */}
      <mesh position={[0, 1.78, 0]}>
        <torusGeometry args={[0.39, 0.015, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* 6. Pump Dispenser Head */}
      <group position={[0, 1.83, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.3, 32]} />
          <meshStandardMaterial color="#1f1f23" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.28, 0.18, 32]} />
          <meshStandardMaterial
            ref={pumpMatRef}
            color={activeVariant.accentHex || '#d4af37'}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        <mesh position={[0.22, 0.32, 0]} rotation={[0, 0, -1.35]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.28, 32]} />
          <meshStandardMaterial color="#18181b" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* 7. Base Glass Foot */}
      <mesh position={[0, -1.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.76, 0.74, 0.18, 64]} />
        <meshPhysicalMaterial
          color="#09090b"
          transmission={0.4}
          transparent
          roughness={0.2}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
}

try {
  useGLTF.preload('/models/bottle.glb');
} catch (e) {}
