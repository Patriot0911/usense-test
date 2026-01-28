'use client';

import type { IGifModalProps } from '@/types/gifs/gif-modal';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import { useEffect } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

const GifModal = ({ gif, onClose }: IGifModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const copy = async () => {
    await navigator.clipboard.writeText(gif.url);
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          <CgClose size={24} />
        </button>

        <div className={styles['image-wrapper']}>
          <Image
            src={gif.images.original.url}
            alt={gif.title}
            width={gif.images.original.width}
            height={gif.images.original.height}
            unoptimized
            priority
          />
        </div>

        <div className={styles.meta}>
          <h3>{gif.title || 'Untitled GIF'}</h3>

          <div className={styles.actions}>
            <button onClick={copy}>Copy link</button>
            <a
              href={gif.images.original.url}
              download
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default GifModal;
