import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Environment } from '@react-three/drei';

// Predefined camera checkpoints (Position & Target LookAt) for cinematic sweeps
// Sweeping around a central abstract compute structure
const KEYFRAMES = [
  {
    progress: 0.0,
    pos: [0, 2.0, 7.0],
    target: [0, 0.2, 0]
  },
  {
    progress: 0.25,
    pos: [3.8, 1.2, 3.2],
    target: [0.0, 0.5, 0.0]
  },
  {
    progress: 0.5,
    pos: [-3.5, -0.6, 2.8],
    target: [0.0, 0.3, 0.0]
  },
  {
    progress: 0.75,
    pos: [0.4, 3.6, 2.5],
    target: [0.0, 0.6, -0.5]
  },
  {
    progress: 1.0,
    pos: [-4.8, 2.8, 6.5],
    target: [0, 0.2, 0]
  }
];

// Helper to interpolate between two keyframes based on current progress
function getInterpolatedState(progress) {
  const p = Math.min(Math.max(progress, 0), 1);
  
  let startIndex = 0;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (p >= KEYFRAMES[i].progress && p <= KEYFRAMES[i + 1].progress) {
      startIndex = i;
      break;
    }
  }
  
  const start = KEYFRAMES[startIndex];
  const end = KEYFRAMES[startIndex + 1];
  
  const segmentDuration = end.progress - start.progress;
  const segmentProgress = (p - start.progress) / segmentDuration;
  
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

// Loads the user-supplied 3D room model
function Model({ src }) {
  const { scene } = useGLTF(src);
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 2.0;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} position={[0, -0.8, 0]} rotation={[0, -Math.PI / 4, 0]} dispose={null} />;
}

// Styled Mock Abstract Computing Core - serving as high-fidelity visual fallback
function ProceduralMockRoom() {
  const blobRef = useRef();
  const glassPanelsRef = useRef();
  const pointsRef = useRef();
  const bitsRef = useRef([]);

  const originalPositions = useRef(null);
  const particleCount = 350;

  // Initialize particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 * 12;
      const radius = 1.0 + Math.random() * 3.5;
      const height = (Math.random() - 0.5) * 5.0;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      vel[i * 3] = 0.08 + Math.random() * 0.15;
    }
    return [pos, vel];
  }, []);

  // Only 12 floating CS bits (lightweight)
  const csBits = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.8;
      return {
        isZero: i % 2 === 0,
        pos: [Math.cos(angle) * radius, 0.4 + Math.random() * 2.2, Math.sin(angle) * radius],
        color: i % 3 === 0 ? '#bda07a' : i % 3 === 1 ? '#00f0ff' : '#007fff',
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI
      };
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Hardware-accelerated organic transformations on central sphere (Zero CPU cost)
    if (blobRef.current) {
      // Rotate the sphere organically
      blobRef.current.rotation.y += delta * 0.15;
      blobRef.current.rotation.x = Math.sin(time * 0.4) * 0.12;
      
      // Organically pulsate scale (simulating organic liquid expansion/contraction)
      const scaleWave = 1.0 + Math.sin(time * 1.5) * 0.06;
      blobRef.current.scale.set(scaleWave, scaleWave, scaleWave);
    }

    // 2. Animate 600 particle swarm along trigonometric flow field vortex + mouse interaction (Optimized)
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      const mouseX = (window.mx || 0) * 4.0;
      const mouseY = (window.my || 0) * 3.0;

      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;

        let px = arr[xIdx];
        let py = arr[yIdx];
        let pz = arr[zIdx];

        // Wave vortex movement formulas
        py += velocities[i * 3] * delta * 4;
        px += Math.sin(time * 0.4 + py * 0.8 + i) * 0.25 * delta;
        pz += Math.cos(time * 0.4 + px * 0.8 + i) * 0.25 * delta;

        // Dynamic mouse repulsion logic (Optimized using distance squared check)
        const dx = px - mouseX;
        const dy = py - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 1.96) { // 1.4^2 = 1.96
          const dist = Math.sqrt(distSq);
          const force = (1.4 - dist) * 0.6;
          px += (dx / (dist || 0.001)) * force * delta * 6;
          py += (dy / (dist || 0.001)) * force * delta * 6;
        }

        // Reset if moving out of boundary
        if (py > 3.0) {
          py = -2.5;
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.0 + Math.random() * 3.0;
          px = Math.cos(angle) * radius;
          pz = Math.sin(angle) * radius;
        }

        arr[xIdx] = px;
        arr[yIdx] = py;
        arr[zIdx] = pz;
      }
      posAttr.needsUpdate = true;
    }

    // 3. Float and spin coding bits (0s and 1s wireframes)
    bitsRef.current.forEach((mesh, i) => {
      if (mesh) {
        const config = csBits[i];
        mesh.position.y = config.pos[1] + Math.sin(time * config.speed + config.phase) * 0.15;
        mesh.rotation.y += delta * 0.4;
        mesh.rotation.x += delta * 0.2;
      }
    });

    // 4. Float refractive glass panels
    if (glassPanelsRef.current) {
      glassPanelsRef.current.children.forEach((panel, index) => {
        panel.rotation.y = time * 0.05 + index * 0.5;
        panel.rotation.x = Math.sin(time * 0.03 + index) * 0.1;
        panel.position.y = (index === 0 ? 1.2 : index === 1 ? 1.5 : 0.9) + Math.sin(time * 0.2 + index) * 0.06;
      });
    }
  });

  return (
    <group position={[0, -0.6, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Simplified Grid Floor */}
      <gridHelper args={[14, 14, '#00f0ff', '#0b162a']} position={[0, -0.05, 0]} />
      
      {/* Central Sphere - using MeshStandardMaterial (much faster than MeshPhysicalMaterial) */}
      <mesh ref={blobRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[1.35, 20, 20]} />
        <meshStandardMaterial
          color="#001a35"
          emissive="#020c1b"
          roughness={0.05}
          metalness={0.95}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Optimized Particle Swarm - 350 particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#e8d3b9"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Lightweight Floating CS Bits - reduced to 12 */}
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
            emissiveIntensity={1.5}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

// Rig updates the camera position/rotation dynamically based on scroll & mouse variables
function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2, 7));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const prevScroll = useRef(0);
  const currentRoll = useRef(0);

  useFrame((state, delta) => {
    const { pos: targetPos, target: targetLookAt } = getInterpolatedState(scrollProgress);

    // Interactive mouse drift (Parallax)
    const mx = window.mx || 0;
    const my = window.my || 0;
    
    const driftX = mx * 0.45;
    const driftY = my * 0.35;

    const finalTargetPos = targetPos.clone().add(new THREE.Vector3(driftX * 0.35, driftY * 0.35, 0));
    const finalLookAt = targetLookAt.clone().add(new THREE.Vector3(driftX, driftY, 0));

    // Smooth inertia lerp
    currentPos.current.lerp(finalTargetPos, 0.045); // highly smooth damping
    currentTarget.current.lerp(finalLookAt, 0.045);

    // Calculate drone Z-roll from scroll velocity
    const scrollDiff = scrollProgress - prevScroll.current;
    prevScroll.current = scrollProgress;
    
    const targetRoll = -scrollDiff * 2.2;
    currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, 0.07);

    // Set camera transform
    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    // Add Z-axis tilt
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), currentRoll.current);
  });

  return null;
}

export default function ThreeScene({ modelPath = '/model.glb', scrollProgress = 0 }) {
  const [modelExists, setModelExists] = useState(false);

  // Check if model.glb actually exists in the public directory
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(modelPath);
        if (!res.ok) {
          if (mounted) setModelExists(false);
          return;
        }
        
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          if (mounted) setModelExists(false);
          return;
        }

        const ab = await res.arrayBuffer();
        if (ab.byteLength >= 4) {
          const header = String.fromCharCode.apply(null, new Uint8Array(ab.slice(0, 4)));
          if (mounted) {
            setModelExists(header === 'glTF' || header === 'gltf');
          }
        } else {
          if (mounted) setModelExists(false);
        }
      } catch (e) {
        if (mounted) setModelExists(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [modelPath]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: false, // Disable anti-aliasing for big perf boost
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Cap pixel ratio to 1.5 max (prevents 4K render on retina)
      >
        <color attach="background" args={['#020205']} />
        
        {/* Simplified lighting - no expensive shadows */}
        <ambientLight intensity={0.35} color="#0d1f3d" />
        <pointLight position={[6, 8, 6]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[-6, 4, -6]} intensity={1.2} color="#ff007f" />
        <pointLight position={[0, 10, 4]} intensity={2.0} color="#e8d3b9" />

        {/* Background Environment map for dark metallic reflections */}
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>

        <Suspense fallback={null}>
          {modelExists ? <Model src={modelPath} /> : <ProceduralMockRoom />}
        </Suspense>

        <CameraRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
