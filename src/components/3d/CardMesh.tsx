import { a, useSpring } from '@react-spring/three';
import { RoundedBox, Text } from '@react-three/drei';
import { useMemo } from 'react';
import type { Card } from '../../models/Card';
import { useUIStore } from '../../stores/useUIStore';

interface CardMeshProps {
  card?: Card;
  flipped: boolean;
  onFlip: () => void;
}

export const CardMesh = ({ card, flipped, onFlip }: CardMeshProps) => {
  const lowMotion = useUIStore((state) => state.lowMotion);
  const { rotationY } = useSpring({
    rotationY: flipped ? Math.PI : 0,
    config: { mass: 1, tension: 220, friction: 24 },
    immediate: lowMotion
  });

  const frontText = useMemo(() => card?.word ?? 'Draw a card', [card?.word]);
  const backText = useMemo(() => card?.definition ?? 'Create your first card to begin!', [card?.definition]);
  const phonetics = card?.phonetics;

  return (
    <a.group rotation-y={rotationY} onClick={onFlip}>
      <RoundedBox args={[2.5, 3.5, 0.08]} radius={0.15} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={flipped ? '#fefce8' : '#f1f5f9'} metalness={0.1} roughness={0.3} />
      </RoundedBox>
      <group rotation={[0, 0, 0]} position={[0, 0, 0.045]}>
        <Text
          position={[0, 0.5, 0.06]}
          fontSize={0.35}
          color="#0f172a"
          maxWidth={1.8}
          anchorX="center"
          anchorY="middle"
        >
          {frontText}
        </Text>
        {phonetics ? (
          <Text
            position={[0, -0.1, 0.06]}
            fontSize={0.18}
            color="#334155"
            maxWidth={2}
            anchorX="center"
            anchorY="middle"
          >
            {phonetics}
          </Text>
        ) : null}
        <Text
          position={[0, -1.35, 0.06]}
          fontSize={0.12}
          color="#334155"
          maxWidth={2.1}
          anchorX="center"
          anchorY="top"
        >
          Tap or press Space to flip
        </Text>
      </group>
      <group rotation={[0, Math.PI, 0]} position={[0, 0, 0.045]}>
        <Text
          position={[0, 0.4, 0.06]}
          fontSize={0.22}
          color="#0f172a"
          maxWidth={2.1}
          anchorX="center"
          anchorY="middle"
        >
          {backText}
        </Text>
        {card?.example ? (
          <Text
            position={[0, -0.7, 0.06]}
            fontSize={0.15}
            color="#1e293b"
            maxWidth={2.1}
            anchorX="center"
            anchorY="middle"
          >
            “{card.example}”
          </Text>
        ) : null}
      </group>
    </a.group>
  );
};

export default CardMesh;
