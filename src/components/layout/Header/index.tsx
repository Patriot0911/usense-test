import Link from 'next/link';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-content-wrapper']}>
        <Link href="/">
          <span className={styles['logo-heading']}>GIF FINDER</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
