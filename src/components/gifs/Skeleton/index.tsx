import SkeletonCard from './components/SkeletonCard';

import styles from './styles.module.scss';

const Skeleton = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
