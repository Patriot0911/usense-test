import { IGifData } from './gif';

export interface IGifModalProps {
  gif: IGifData;
  onClose: () => void;
}
