import styles from './header.module.scss';

export default function Header() : JSX.Element{
  return (
    <header className={styles.header}>
        <a href="/">
          <img src="/Logo.svg" alt="logo" />
        </a>
    </header>
  )
}
