import styles from './DiscountSlideIn.module.scss'

interface Props {
  onClose: () => void
}

export default function DiscountSlideIn({ onClose }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.topAccent} />

      <div className={styles.eyebrow}>
        <span className={styles.flash}>⚡</span>
        Flash Deal
      </div>

      <div className={styles.codeBlock}>
        <div className={styles.codeLabel}>Use code at checkout</div>
        <div className={styles.code}>SAVE25</div>
      </div>

      <p className={styles.desc}>
        Grab <strong>25% off</strong> your entire order today.
        Valid on all products — no minimum spend required.
      </p>

      <div className={styles.perks}>
        {['Free shipping over $50', 'Stack with sale items', 'One-time use per account'].map((p) => (
          <div key={p} className={styles.perk}>
            <span className={styles.check}>✓</span>
            {p}
          </div>
        ))}
      </div>

      <button className={styles.cta} onClick={onClose}>
        Copy Code & Shop →
      </button>
      <p className={styles.expiry}>Expires in 24 hours · Limited redemptions</p>
    </div>
  )
}
