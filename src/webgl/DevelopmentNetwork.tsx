import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

function NetworkParticles() {
  const pointsRef = useRef<Points>(null);
  const accentColor = useMemo(() => getComputedStyle(document.documentElement).getPropertyValue("--tdl-accent").trim(), []);
  const positions = useMemo(() => {
    const values = new Float32Array(1500);
    for (let index = 0; index < values.length; index += 3) {
      const radius = 2 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      values[index] = Math.cos(angle) * radius;
      values[index + 1] = (Math.random() - 0.5) * 5.5;
      values[index + 2] = Math.sin(angle) * radius;
    }
    return values;
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) {
      return;
    }
    pointsRef.current.rotation.y += delta * 0.045;
    pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={accentColor} opacity={0.86} size={0.035} sizeAttenuation transparent />
    </points>
  );
}

export function DevelopmentNetwork() {
  return (
    <div className="development-network" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 72 }} dpr={[1, 1.5]}>
        <NetworkParticles />
      </Canvas>
    </div>
  );
}

