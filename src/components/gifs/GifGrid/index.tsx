'use client';

import { useState } from 'react';
import GifCard from '../GifCard';
import GifModal from '../GifModal';

import styles from './styles.module.scss';

const GifGrid = ({ data }: { data: any[] }) => {
  const [active, setActive] = useState<any | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {data.map(gif => (
          <GifCard
            key={gif.id}
            gif={gif}
            onClick={() => setActive(gif)}
          />
        ))}
      </div>

      {active && (
        <GifModal gif={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}

export default GifGrid;
