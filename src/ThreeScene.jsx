import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Predefined camera checkpoints for 6 sections
const KEYFRAMES = [
  { progress: 0.0, pos: [0, 2.0, 7.0], target: [0, 0.2, 0] },
  { progress: 0.2, pos: [-3.8, 1.4, 4.2], target: [0.0, 0.4, 0.0] },
  { progress: 0.4, pos: [3.8, 1.2, 3.2], target: [0.0, 0.5, 0.0] },
  { progress: 0.6, pos: [-3.5, -0.6, 2.8], target: [0.0, 0.3, 0.0] },
  { progress: 0.8, pos: [0.4, 3.6, 2.5], target: [0.0, 0.6, -0.5] },
  { progress: 1.0, pos: [-4.8, 2.8, 6.5], target: [0, 0.2, 0] }
];

function getInterpolatedState(progress) {
  const p = Math.min(Math.max(progress, 0), 1);
  
  let startIndex = 0;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (p >= KEYFRAMES[i].progress && p <= KEYFRAMES[i + 1].progress) {
      startIndex = i;
      break;
    }
  }
  
  const start = KEYFRAMES[startIndex] || KEYFRAMES[0];
  const end = KEYFRAMES[startIndex + 1] || KEYFRAMES[KEYFRAMES.length - 1];
  
  const segmentDuration = Math.max(end.progress - start.progress, 0.0001);
  const segmentProgress = Math.min(Math.max((p - start.progress) / segmentDuration, 0), 1);
  
  const eased = segmentProgress < 0.5 
    ? 2 * segmentProgress * segmentProgress 
    : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;

  const pos = new THREE.Vector3(
    THREE.MathUtils.lerp(start.pos[0], end.pos[0], eased),
    THREE.MathUtils.lerp(start.pos[1], end.pos[1], eased),
    THREE.MathUtils.lerp(start.pos[2], end.pos[2], eased)
  );

  const target = new THREE.Vector3(
    THREE.MathUtils.lerp(start.target[0], end.target[0], eased),
    THREE.MathUtils.lerp(start.target[1], end.target[1], eased),
    THREE.MathUtils.lerp(start.target[2], end.target[2], eased)
  );

  return { pos, target };
}

// 100% Local, Crash-Proof Procedural Cyber Core
function ProceduralMockRoom() {
  const blobRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const pointsRef = useRef();
  const bitsRef = useRef([]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 120 : 250;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 * 6;
      const radius = 1.2 + Math.random() * 2.8;
      const height = (Math.random() - 0.5) * 4.0;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      vel[i * 3] = 0.05 + Math.random() * 0.08;
    }
    return [pos, vel];
  }, [particleCount]);

  const csBits = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.2;
      return {
        isZero: i % 2 === 0,
        pos: [Math.cos(angle) * radius, 0.3 + Math.random() * 1.8, Math.sin(angle) * radius],
        color: i % 2 === 0 ? '#bda07a' : '#00f0ff',
        speed: 0.15 + Math.random() * 0.15,
        phase: Math.random() * Math.PI
      };
    });
  }, []);

  useFrame((state, rawDelta) => {
    // Clamp delta to prevent NaN explosions on tab unfocus
    const delta = Math.min(rawDelta, 0.05);
    const time = state.clock.getElapsedTime();

    if (blobRef.current) {
      blobRef.current.rotation.y += delta * 0.12;
      blobRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      const scaleWave = 1.0 + Math.sin(time * 1.2) * 0.03;
      blobRef.current.scale.set(scaleWave, scaleWave, scaleWave);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2;
      ring1Ref.current.rotation.y = time * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = time * -0.18;
      ring2Ref.current.rotation.x = time * 0.12;
    }

    if (pointsRef.current && pointsRef.current.geometry?.attributes?.position) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      const mouseX = (window.mx || 0) * 3.0;
      const mouseY = (window.my || 0) * 2.0;

      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;

        let px = arr[xIdx];
        let py = arr[yIdx];
        let pz = arr[zIdx];

        if (isNaN(px) || isNaN(py) || isNaN(pz)) {
          px = (Math.random() - 0.5) * 4;
          py = (Math.random() - 0.5) * 4;
          pz = (Math.random() - 0.5) * 4;
        }

        py += velocities[i * 3] * delta * 2.5;
        px += Math.sin(time * 0.3 + py * 0.5 + i) * 0.12 * delta;
        pz += Math.cos(time * 0.3 + px * 0.5 + i) * 0.12 * delta;

        const dx = px - mouseX;
        const dy = py - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 1.5 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1.25 - dist) * 0.3;
          px += (dx / dist) * force * delta * 3;
          py += (dy / dist) * force * delta * 3;
        }

        if (py > 2.8) {
          py = -2.2;
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.2 + Math.random() * 2.5;
          px = Math.cos(angle) * radius;
          pz = Math.sin(angle) * radius;
        }

        arr[xIdx] = px;
        arr[yIdx] = py;
        arr[zIdx] = pz;
      }
      posAttr.needsUpdate = true;
    }

    bitsRef.current.forEach((mesh, i) => {
      if (mesh) {
        const config = csBits[i];
        if (config) {
          mesh.position.y = config.pos[1] + Math.sin(time * config.speed + config.phase) * 0.12;
          mesh.rotation.y += delta * 0.3;
          mesh.rotation.x += delta * 0.15;
        }
      }
    });
  });

  return (
    <group position={[0, -0.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
      <gridHelper args={[16, 16, '#bda07a', '#0a101d']} position={[0, -0.1, 0]} />

      <mesh ref={blobRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial
          color="#040914"
          emissive="#061224"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ring1Ref} position={[0, 0.8, 0]}>
        <torusGeometry args={[1.75, 0.015, 10, 36]} />
        <meshStandardMaterial color="#bda07a" emissive="#bda07a" emissiveIntensity={0.8} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0.8, 0]}>
        <torusGeometry args={[2.1, 0.012, 10, 36]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#e8d3b9"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {csBits.map((bit, idx) => (
        <mesh
          key={idx}
          ref={(el) => (bitsRef.current[idx] = el)}
          position={bit.pos}
        >
          {bit.isZero ? (
            <sphereGeometry args={[0.06, 6, 6]} />
          ) : (
            <boxGeometry args={[0.08, 0.08, 0.08]} />
          )}
          <meshStandardMaterial
            color={bit.color}
            wireframe
            emissive={bit.color}
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2, 7));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const prevScroll = useRef(0);
  const currentRoll = useRef(0);

  useFrame(() => {
    const { pos: targetPos, target: targetLookAt } = getInterpolatedState(scrollProgress);

    const mx = window.mx || 0;
    const my = window.my || 0;
    
    const driftX = mx * 0.3;
    const driftY = my * 0.2;

    const finalTargetPos = targetPos.clone().add(new THREE.Vector3(driftX * 0.3, driftY * 0.3, 0));
    const finalLookAt = targetLookAt.clone().add(new THREE.Vector3(driftX, driftY, 0));

    currentPos.current.lerp(finalTargetPos, 0.045);
    currentTarget.current.lerp(finalLookAt, 0.045);

    const scrollDiff = scrollProgress - prevScroll.current;
    prevScroll.current = scrollProgress;
    
    const targetRoll = -scrollDiff * 1.5;
    currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, 0.07);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), currentRoll.current);
  });

  return null;
}

export default function ThreeScene({ scrollProgress = 0 }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#020205']} />
        
        <ambientLight intensity={0.5} color="#0d1f3d" />
        <pointLight position={[6, 8, 6]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[-6, 4, -6]} intensity={1.2} color="#bda07a" />
        <pointLight position={[0, 10, 4]} intensity={2.0} color="#e8d3b9" />

        <ProceduralMockRoom />
        <CameraRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
