import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  icon?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
