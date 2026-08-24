import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// @react-three/fiber 9.x still instantiates THREE.Clock internally on every
// <Canvas> mount, which three.js r183+ logs as deprecated (favor THREE.Timer).
// This is an upstream r3f issue (fixed in v10), not something in our code -
// silence just this one warning so it doesn't spam the console.
if (typeof console !== "undefined" && !console.__clockWarnPatched) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    originalWarn(...args);
  };
  console.__clockWarnPatched = true;
}

function CodeCube() {
  const group = useRef();
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.18;
    group.current.rotation.x += dt * 0.05;
  });
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshBasicMaterial color="#e8c468" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh scale={0.98}>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function PythonOrb() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.6) * 0.15;
    ref.current.rotation.y -= 0.004;
  });
  return (
    <group ref={ref} position={[2.6, 0.4, -1]}>
      <Sphere args={[0.55, 32, 32]}>
        <meshStandardMaterial
          color="#12101c"
          emissive="#4cc9f0"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
        />
      </Sphere>
      <Torus args={[0.78, 0.02, 16, 64]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color="#4cc9f0" transparent opacity={0.6} />
      </Torus>
    </group>
  );
}

function OrbitRing() {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.z += dt * 0.12; });
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * 2.9, Math.sin(a) * 2.9 * 0.4, Math.sin(a) * 0.6));
  }
  return (
    <Line
      ref={ref}
      points={points}
      color="#a855f7"
      transparent
      opacity={0.35}
      lineWidth={1}
    />
  );
}

function Rig() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#e8c468" />
      <pointLight position={[-4, -2, -3]} intensity={30} color="#a855f7" />
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
        <CodeCube />
      </Float>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.1}>
        <PythonOrb />
      </Float>
      <Icosahedron args={[0.22, 0]} position={[-2.4, -1.1, 0.6]}>
        <meshBasicMaterial color="#e8c468" wireframe />
      </Icosahedron>
      <OrbitRing />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}