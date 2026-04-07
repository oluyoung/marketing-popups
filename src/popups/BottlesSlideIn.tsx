import styles from './BottlesSlideIn.module.scss'

interface Props {
  onClose: () => void
}

export default function BottlesSlideIn({ onClose }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.urgencyDots}>
          <span /><span /><span /><span /><span />
        </div>
        <div className={styles.tag}>🔴 Almost Gone</div>
        <h2>Few Bottles Left</h2>
        <p className={styles.subtitle}>Premium spirits — selling fast</p>
      </div>

      <div className={styles.goldPanel}>
        <div className={styles.shimmer} />
        <div className={styles.bottles}>
          <div className={styles.bottle}>
            <div className={styles.bottleImg}>🥃</div>
            <div className={styles.bottleLabel}>Hennessy</div>
          </div>
          <div className={styles.bottle}>
            <div className={styles.bottleImg}>🍾</div>
            <div className={styles.bottleLabel}>Moët</div>
          </div>
        </div>

        <div className={styles.stockBar}>
          <div className={styles.barBg}>
            <div className={styles.barFill} />
          </div>
          <div className={styles.barLabel}>
            <span>3 left in stock</span>
            <span>18% remaining</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span className={styles.current}>$289</span>
          <span className={styles.original}>$349</span>
          <span className={styles.save}>Save $60</span>
        </div>
        <button className={styles.cta} onClick={onClose}>
          Grab Yours Now →
        </button>
        <p className={styles.remaining}>Only 3 units left · Ships today</p>
      </div>
    </div>
  )
}
