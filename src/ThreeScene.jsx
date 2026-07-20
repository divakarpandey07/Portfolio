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
  const particleCount = 1200;

  // Initialize unified points particles in a wave-vortex structure
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 * 12; // Spiral revolutions
      const radius = 1.0 + Math.random() * 3.5;
      const height = (Math.random() - 0.5) * 5.0;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      vel[i * 3] = 0.08 + Math.random() * 0.15; // float speed
    }
    return [pos, vel];
  }, []);

  // Set up 24 floating computer science data bits (0s as wireframe spheres, 1s as wireframe boxes)
  const csBits = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => {
      const angle = (i / 26) * Math.PI * 2;
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

  // Save original positions of blob vertices for displacement calculation
  useEffect(() => {
    if (blobRef.current) {
      originalPositions.current = blobRef.current.geometry.attributes.position.array.slice();
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Real-time organic vertex displacement on central sphere (Fluid compute node)
    if (blobRef.current && originalPositions.current) {
      const geom = blobRef.current.geometry;
      const posAttr = geom.attributes.position;
      const original = originalPositions.current;
      const v = new THREE.Vector3();

      for (let i = 0; i < posAttr.count; i++) {
        const origX = original[i * 3];
        const origY = original[i * 3 + 1];
        const origZ = original[i * 3 + 2];

        // Complex multi-wave noise deformation
        const wave = Math.sin(origX * 3.0 + time * 2.5) * 
                     Math.cos(origY * 2.5 - time * 1.8) * 
                     Math.sin(origZ * 2.0 + time * 1.5) * 0.15;

        // Displace along surface normal vector
        v.set(origX, origY, origZ).normalize().multiplyScalar(1.35 + wave);
        posAttr.setXYZ(i, v.x, v.y, v.z);
      }
      posAttr.needsUpdate = true;
      geom.computeVertexNormals();

      // Slow orbital rotate
      blobRef.current.rotation.y += delta * 0.12;
      blobRef.current.rotation.x = Math.sin(time * 0.25) * 0.1;
    }

    // 2. Animate 1,200 particle swarm along trigonometric flow field vortex + mouse interaction
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

        // Dynamic mouse repulsion logic
        const dx = px - mouseX;
        const dy = py - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.4) {
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
      {/* Digital Network Grid Floor */}
      <gridHelper args={[16, 16, '#00f0ff', '#0b162a']} position={[0, -0.05, 0]} opacity={0.12} transparent />
      
      {/* Central Morphing Liquid-Metallic Core */}
      <mesh ref={blobRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshPhysicalMaterial 
          color="#001a35"
          emissive="#020c1b"
          roughness={0.02}
          metalness={0.98}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transmission={0.35}
          ior={1.65}
          thickness={1.2}
          envMapIntensity={2.5}
        />
      </mesh>
      
      {/* Dynamic Swarm Constellation (glowing dust particles) */}
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
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Floating Holographic Binary Bits (CS Theme) */}
      {csBits.map((bit, idx) => (
        <mesh 
          key={idx} 
          ref={(el) => (bitsRef.current[idx] = el)} 
          position={bit.pos} 
          castShadow
        >
          {bit.isZero ? (
            <sphereGeometry args={[0.06, 8, 8]} />
          ) : (
            <boxGeometry args={[0.08, 0.08, 0.08]} />
          )}
          <meshStandardMaterial 
            color={bit.color} 
            wireframe 
            emissive={bit.color}
            emissiveIntensity={1.8}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {/* Floating Refraction Glass Panels */}
      <group ref={glassPanelsRef}>
        {/* Panel 1 */}
        <mesh position={[-1.2, 1.2, 0.8]} rotation={[0.2, 0.4, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.6, 0.02]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.95} 
            thickness={0.8} 
            roughness={0.08} 
            ior={1.5}
            envMapIntensity={2.5} 
            transparent 
            opacity={0.25}
          />
        </mesh>
        {/* Panel 2 */}
        <mesh position={[1.4, 1.5, -0.6]} rotation={[-0.1, -0.3, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.9, 0.02]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.95} 
            thickness={0.8} 
            roughness={0.08} 
            ior={1.5}
            envMapIntensity={2.5} 
            transparent 
            opacity={0.25}
          />
        </mesh>
        {/* Panel 3 */}
        <mesh position={[0.6, 0.9, 1.4]} rotation={[0.3, -0.2, -0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.5, 0.02]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.95} 
            thickness={0.8} 
            roughness={0.08} 
            ior={1.5}
            envMapIntensity={2.5} 
            transparent 
            opacity={0.25}
          />
        </mesh>
      </group>
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
        shadows
        camera={{ fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      >
        <color attach="background" args={['#020205']} />
        
        {/* Cinematic colorful dark lighting */}
        <ambientLight intensity={0.25} color="#0d1f3d" />
        
        {/* Soft cool fill lights */}
        <pointLight position={[6, 8, 6]} intensity={1.8} color="#00f0ff" castShadow />
        <pointLight position={[-6, 4, -6]} intensity={1.2} color="#ff007f" />
        
        {/* Primary spotlight shining down with shadows */}
        <spotLight
          position={[0, 10, 4]}
          angle={0.7}
          penumbra={0.9}
          intensity={2.8}
          color="#e8d3b9"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

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
