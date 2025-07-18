"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import { Points as ThreePoints } from "three";

export const StarBackground = () => {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 8 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
      ref.current.rotation.z += delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.019}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-screen fixed inset-0 -z-10 bg-[var(--dark)]">
    <Canvas 
      camera={{ position: [0, 0, 6] }}
    >
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas; 