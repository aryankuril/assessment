'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Sparkles } from '@react-three/drei';
import { BottleScrollController } from './BottleScrollController';
import { VariantConfig } from './LuxuryBottleMesh';

interface BottleCanvasProps {
  scrollProgress: number;
  activeVariant: VariantConfig;
  useGlbModel?: boolean;
}

export function BottleCanvas({ scrollProgress, activeVariant, useGlbModel = true }: BottleCanvasProps) {
  return (
    <div className="relative w-full h-full min-h-screen">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        className="w-full h-full pointer-events-none"
      >
        <color attach="background" args={['#050507']} />

        {/* Ambient Studio Lighting */}
        <ambientLight intensity={0.8} />
        
        {/* Key Light */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={15}
          shadow-bias={-0.0001}
        />

        {/* Dynamic Variant Rim / Back Light */}
        <pointLight
          position={[-4, 3, -3]}
          intensity={3.5}
          color={activeVariant.glowHex}
        />

        {/* Secondary Fill Light */}
        <directionalLight
          position={[-5, -2, 3]}
          intensity={0.6}
          color="#94a3b8"
        />

        {/* Studio Top Accent Spotlight */}
        <spotLight
          position={[0, 8, 2]}
          angle={0.5}
          penumbra={0.8}
          intensity={3.0}
          color={activeVariant.accentHex || '#ffffff'}
          castShadow
        />

        {/* R3F Environment Reflections */}
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={1.2} />
        </Suspense>

        {/* Floating Atmospheric Sparkles */}
        <Sparkles
          count={35}
          scale={7}
          size={2.8}
          speed={0.4}
          opacity={0.35}
          color={activeVariant.accentHex}
        />

        {/* 3D Bottle Controller & Mesh */}
        <Suspense fallback={null}>
          <BottleScrollController
            scrollProgress={scrollProgress}
            activeVariant={activeVariant}
            useGlbModel={useGlbModel}
          />
        </Suspense>

        {/* Soft Contact Floor Shadow */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.65}
          scale={8}
          blur={2.8}
          far={4}
          resolution={1024}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
