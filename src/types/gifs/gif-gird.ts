import type { IGifData } from './gif';

export interface IGifGridProps {
  data: IGifData[];
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}
