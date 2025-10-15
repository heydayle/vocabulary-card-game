import { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';

interface DeckProps {
  count: number;
}

export const Deck = ({ count }: DeckProps) => {
  const cards = useMemo(() => new Array(count).fill(null), [count]);
  return (
    <group>
      {cards.map((_, index) => (
        <RoundedBox
          key={index}
          args={[2.5, 3.5, 0.06]}
          radius={0.12}
          smoothness={3}
          position={[0, 0, -0.05 - index * 0.03]}
        >
          <meshStandardMaterial color={index % 2 === 0 ? '#cbd5f5' : '#94a3b8'} />
        </RoundedBox>
      ))}
    </group>
  );
};

export default Deck;
