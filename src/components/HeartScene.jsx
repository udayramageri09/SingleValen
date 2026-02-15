import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const Heart = () => {
  const heartRef = useRef();

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(25, 25);
    shape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    shape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    shape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    shape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    shape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    shape.bezierCurveTo(35, 0, 25, 25, 25, 25);
    return shape;
  }, []);

  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  const extrudeSettings = { 
    depth: 8, 
    bevelEnabled: true, 
    bevelSegments: 2, 
    steps: 2, 
    bevelSize: 2, 
    bevelThickness: 2 
  };

  return (
    <mesh ref={heartRef} rotation={[Math.PI, 0, 0]} scale={0.04}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial 
        color="#8B0000" 
        emissive="#3a0000"
        roughness={0.1} 
        metalness={0.9} 
      />
    </mesh>
  );
};

const HeartScene = () => {
  return (
    <div className="w-full h-full pointer-events-none"> 
      {/* pointer-events-none ensures clicks pass through to UI buttons */}
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#D4AF37" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={3} rotationIntensity={1} floatIntensity={2}>
          <Heart />
        </Float>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default HeartScene;