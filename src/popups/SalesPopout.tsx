import styles from './SalesPopout.module.scss'

interface Props {
  onClose: () => void
}

export default function SalesPopout({ onClose }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.spots}>
        <div className={`${styles.spot} ${styles.s1}`} />
        <div className={`${styles.spot} ${styles.s2}`} />
        <div className={`${styles.spot} ${styles.s3}`} />
        <div className={`${styles.spot} ${styles.s4}`} />
        <div className={`${styles.spot} ${styles.s5}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.label}>⚡ Limited Time Only</div>

        <div className={styles.saleText}>MEGA</div>
        <div className={styles.offText}>70% OFF</div>

        <div className={styles.divider} />

        <p className={styles.caption}>
          Today only. <strong>Limited stock available.</strong><br />
          Don't miss your chance to save big on our best sellers.
        </p>

        <button className={styles.cta} onClick={onClose}>
          Shop Now — Claim Deal
        </button>

        <p className={styles.fine}>Offer expires at midnight · No code needed</p>
      </div>
    </div>
  )
}
