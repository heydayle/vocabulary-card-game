import { useEffect, useMemo, useRef } from 'react';
import { a, useSpring } from '@react-spring/three';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import notoSansFontUrl from '@fontsource/noto-sans/files/noto-sans-latin-ext-400-normal.woff';
import type { Card } from '../../models/Card';
import { useUIStore } from '../../stores/useUIStore';

interface CardMeshProps {
  card?: Card;
  flipped: boolean;
  drawKey: number;
  onFlip: () => void;
}

const basePosition: [number, number, number] = [0, 0, 0];
const baseRotation: [number, number, number] = [-0.04, 0, 0];

export const CardMesh = ({ card, flipped, drawKey, onFlip }: CardMeshProps) => {
  const lowMotion = useUIStore((state) => state.lowMotion);
  const [motionSpring, motionApi] = useSpring(() => ({
    position: basePosition,
    rotation: baseRotation,
    config: { mass: 1.1, tension: 220, friction: 24 }
  }));
  const [flipSpring, flipApi] = useSpring(() => ({
    rotationY: 0,
    config: { mass: 1, tension: 260, friction: 26 }
  }));

  const prevCardId = useRef<string | undefined>();
  const prevDrawKey = useRef(drawKey);
  const prevFlipped = useRef(flipped);
  const lastFlipCardId = useRef<string | undefined>();

  useEffect(() => {
    if (!card) {
      motionApi.start({
        position: [0, -0.18, 0],
        rotation: [0, 0, 0],
        immediate: lowMotion
      });
      flipApi.start({ rotationY: 0, immediate: lowMotion });
      prevCardId.current = undefined;
      prevDrawKey.current = drawKey;
      lastFlipCardId.current = undefined;
      return;
    }

    const isNewCard = card.id !== prevCardId.current || drawKey !== prevDrawKey.current;

    if (lowMotion) {
      motionApi.start({ position: basePosition, rotation: baseRotation, immediate: true });
      flipApi.start({ rotationY: flipped ? Math.PI : 0, immediate: true });
      prevCardId.current = card.id;
      prevDrawKey.current = drawKey;
      return;
    }

    if (isNewCard) {
      motionApi.start({
        from: { position: [0, -0.26, -0.48], rotation: [0, 0, 0] },
        to: async (next) => {
          await next({ position: [0, 4, -0.28], rotation: [-0.22, 0.24, 0.04] });
          await next({ position: [0, 4, -0.08], rotation: [-0.14, 0.08, 0] });
          await next({ position: basePosition, rotation: baseRotation });
        }
      });
      flipApi.start({
        from: Math.PI,
        to: async (next) => {
          await next({ rotationY: Math.PI * 1.1 });
          await next({ rotationY: Math.PI * 0.35 });
          await next({ rotationY: 0 });
        }
      });
    }

    prevCardId.current = card.id;
    prevDrawKey.current = drawKey;
  }, [card, drawKey, flipped, lowMotion, motionApi, flipApi]);

  useEffect(() => {
    if (!card) {
      prevFlipped.current = flipped;
      return;
    }

    if (card.id !== lastFlipCardId.current) {
      lastFlipCardId.current = card.id;
      prevFlipped.current = flipped;
      return;
    }

    const previous = prevFlipped.current;
    prevFlipped.current = flipped;

    if (lowMotion) {
      motionApi.start({ position: basePosition, rotation: baseRotation, immediate: true });
      flipApi.start({ rotationY: flipped ? Math.PI : 0, immediate: true });
      return;
    }

    if (flipped) {
      motionApi.start({
        to: [
          { position: [0, 4, 0], rotation: [-0.12, 0, 0] },
          { position: basePosition, rotation: baseRotation }
        ]
      });
      flipApi.start({
        to: [
          { rotationY: Math.PI * 0.55 },
          { rotationY: Math.PI }
        ]
      });
      return;
    }

    if (previous) {
      motionApi.start({
        to: [
          { position: [0, 4, 0], rotation: [-0.08, 0, 0] },
          { position: basePosition, rotation: baseRotation }
        ]
      });
      flipApi.start({
        to: [
          { rotationY: Math.PI * 0.45 },
          { rotationY: 0 }
        ]
      });
    } else {
      flipApi.start({ rotationY: 0 });
    }
  }, [card, flipped, lowMotion, motionApi, flipApi]);

  const frontText = useMemo(() => card?.word ?? 'Draw a card', [card?.word]);
  const backText = useMemo(
    () => card?.definition ?? 'Create your first card to begin!',
    [card?.definition]
  );
  const phonetics = card?.phonetics;
  const example = card?.example;

  return (
    <a.group
      position={motionSpring.position}
      rotation={motionSpring.rotation}
      rotation-y={flipSpring.rotationY}
      onClick={onFlip}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <RoundedBox args={[2.45, 3.45, 0.028]} radius={0.05} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={flipped ? '#fef3c7' : '#e2e8f0'}
          metalness={0.1}
          roughness={0.35}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
      <group position={[0, 0, 0.02]}>
        <Text
          position={[0, 0.6, 0.03]}
          fontSize={0.38}
          color="#0f172a"
          maxWidth={1.9}
          anchorX="center"
          anchorY="middle"
          font={notoSansFontUrl}
          material-side={THREE.FrontSide}
        >
          {frontText}
        </Text>
        {phonetics ? (
          <Text
            position={[0, -0.05, 0.03]}
            fontSize={0.2}
            color="#334155"
            maxWidth={2}
            anchorX="center"
            anchorY="middle"
            font={notoSansFontUrl}
            material-side={THREE.FrontSide}
          >
            {phonetics}
          </Text>
        ) : null}
        <Text
          position={[0, -1.3, 0.03]}
          fontSize={0.12}
          color="#475569"
          maxWidth={2}
          anchorX="center"
          anchorY="top"
          font={notoSansFontUrl}
          material-side={THREE.FrontSide}
        >
          Tap or press Space to flip
        </Text>
      </group>
      <group rotation={[0, Math.PI, 0]} position={[0, 0, -0.02]}>
        <Text
          position={[0, 0.5, 0.03]}
          fontSize={0.24}
          color="#0f172a"
          maxWidth={2.1}
          anchorX="center"
          anchorY="middle"
          font={notoSansFontUrl}
          material-side={THREE.FrontSide}
        >
          {backText}
        </Text>
        {example ? (
          <Text
            position={[0, -0.75, 0.03]}
            fontSize={0.15}
            color="#1e293b"
            maxWidth={2.2}
            anchorX="center"
            anchorY="middle"
            font={notoSansFontUrl}
            material-side={THREE.FrontSide}
          >
            “{example}”
          </Text>
        ) : null}
      </group>
    </a.group>
  );
};

export default CardMesh;
