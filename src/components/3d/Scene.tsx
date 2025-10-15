import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Sparkles } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import CardMesh from './CardMesh';
import Deck from './Deck';
import { useGameStore } from '../../stores/useGameStore';
import { useCardsStore } from '../../stores/useCardsStore';
import './Scene.css';

const Table = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
    <circleGeometry args={[6, 64]} />
    <meshStandardMaterial color="#3f2b1c" roughness={0.6} metalness={0.1} />
  </mesh>
);

const SceneContent = () => {
  const { cards } = useCardsStore();
  const { snapshot, currentCard, flip, shuffleKey, drawKey } = useGameStore();

  const remaining = useMemo(() => Math.max(cards.length - (snapshot.index + 1), 0), [cards.length, snapshot.index]);
  const showSparkles = snapshot.phase === 'judged' && snapshot.flipped;

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 5]} intensity={1.3} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-4, 4, -4]} intensity={0.4} />

      <Table />

      <group position={[0, 0.02, 0.12]}>
        <Deck count={Math.min(remaining, 12)} shuffleKey={shuffleKey} />
      </group>

      <group position={[0, 0.12, 0.32]}>
        <CardMesh card={currentCard} flipped={snapshot.flipped} drawKey={drawKey} onFlip={flip} />
        {showSparkles ? <Sparkles count={35} scale={1.8} position={[0, 0.8, 0]} speed={0.6} size={3.2} /> : null}
      </group>

      <ContactShadows position={[0, -0.35, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </group>
  );
};

export const Scene = () => (
  <div className="scene-container">
    <Canvas shadows camera={{ position: [4, 4, 6], fov: 45 }}>
      <color attach="background" args={[0.05, 0.08, 0.15]} />
      <Suspense fallback={null}>
        <SceneContent />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={9} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  </div>
);

export default Scene;
