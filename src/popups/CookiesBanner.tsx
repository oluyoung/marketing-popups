import styles from './CookiesBanner.module.scss'

interface Props {
  onClose: () => void
}

export default function CookiesBanner({ onClose }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.icon}>🍪</div>

      <div className={styles.text}>
        <div className={styles.title}>We value your privacy</div>
        <p className={styles.body}>
          We use cookies to enhance your browsing experience, serve personalised content,
          and analyse our traffic. Read our{' '}
          <a href="#">Privacy Policy</a> and <a href="#">Cookie Policy</a>.
        </p>
      </div>

      <div className={styles.btns}>
        <button className={styles.accept} onClick={onClose}>
          Accept All
        </button>
        <button className={styles.necessary} onClick={onClose}>
          Use Necessary Only
        </button>
      </div>
    </div>
  )
}
