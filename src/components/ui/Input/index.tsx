'use client';

import type { IInputProps } from '@/types/ui/input';

import styles from './styles.module.scss';

const Input = ({ value, onChange, className, icon, ...props }: IInputProps) => {
  return (
    <div className={styles['input-container']}>
      <input
        value={value}
        onChange={onChange}
        className={`${styles.input} ${className || ''}`}
        {...props}
      />
      {icon && (
        <div className={styles['icon-wrapper']}>
          {icon}
        </div>
      )}
    </div>
  );
}

export default Input;
