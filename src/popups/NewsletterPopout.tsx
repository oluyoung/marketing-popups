import styles from './NewsletterPopout.module.scss'

interface Props {
  onClose: () => void
}

export default function NewsletterPopout({ onClose }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.imagePanel}>
        <div className={styles.leaves}>
          <div className={`${styles.leaf} ${styles.leaf1}`} />
          <div className={`${styles.leaf} ${styles.leaf2}`} />
          <div className={`${styles.leaf} ${styles.leaf3}`} />
          <div className={`${styles.leaf} ${styles.leaf4}`} />
        </div>
        <div className={styles.planeWrap}>
          <div className={styles.plane}>✉️</div>
          <div className={styles.envelope}>🌿</div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.eyebrow}>Join the community</div>
        <h2>Stay ahead of the curve</h2>
        <p className={styles.sub}>
          Get exclusive early-access deals, product updates, and curated tips
          delivered straight to your inbox. No noise — just the good stuff.
        </p>

        <div className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Enter your email address"
          />
          <button className={styles.submit} onClick={onClose}>
            Subscribe Now →
          </button>
        </div>

        <p className={styles.disclaimer}>
          No spam, ever. Unsubscribe in one click.
        </p>
      </div>
    </div>
  )
}
