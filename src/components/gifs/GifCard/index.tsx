import type { IGifCardProps } from '@/types/gifs/gif-card';
import Image from 'next/image';

import styles from './styles.module.scss';

const GifCard = ({ gif, onClick }: IGifCardProps) => {
  return (
    <button
      className={styles.card}
      onClick={onClick}
      aria-label={`Open ${gif.title}`}
    >
      <Image
        src={gif.images.fixed_width.url}
        alt={gif.title}
        width={gif.images.fixed_width.width}
        height={gif.images.fixed_width.height}
        unoptimized
        loading="lazy"
      />
    </button>
  );
}

export default GifCard;
