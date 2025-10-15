import { useEffect, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useUIStore } from '../../stores/useUIStore';

interface DeckProps {
  count: number;
  shuffleKey: number;
}

export const Deck = ({ count, shuffleKey }: DeckProps) => {
  const cards = useMemo(() => new Array(count).fill(null), [count]);
  const lowMotion = useUIStore((state) => state.lowMotion);
  const [deckSpring, api] = useSpring(() => ({
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    config: { mass: 1.4, tension: 180, friction: 24 }
  }));

  useEffect(() => {
    if (!count) {
      api.start({ position: [0, 0, 0], rotation: [0, 0, 0], immediate: true });
      return;
    }

    if (lowMotion) {
      api.start({ position: [0, 0, 0], rotation: [0, 0, 0], immediate: true });
      return;
    }

    api.start({
      from: { position: [0, 0, 0], rotation: [0, 0, 0] },
      to: [
        { position: [0.12, 0, 0.06], rotation: [0.2, Math.PI / 4, 0.12] },
        { position: [-0.1, 0, -0.08], rotation: [-0.18, -Math.PI / 3.2, -0.1] },
        { position: [0, 0, 0], rotation: [0, 0, 0] }
      ]
    });
  }, [shuffleKey, count, lowMotion, api]);

  return (
    <a.group position={deckSpring.position} rotation={deckSpring.rotation}>
      {cards.map((_, index) => (
        <RoundedBox
          key={index}
          args={[2.45, 3.45, 0.035]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, -0.03 - index * 0.022]}
          rotation={[0, 0, index % 2 === 0 ? 0.006 : -0.006]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={index === 0 ? '#e2e8f0' : index % 2 === 0 ? '#cbd5f5' : '#a5b4fc'}
            metalness={0.15}
            roughness={0.4}
            clearcoat={0.4}
            clearcoatRoughness={0.3}
          />
        </RoundedBox>
      ))}
    </a.group>
  );
};

export default Deck;
