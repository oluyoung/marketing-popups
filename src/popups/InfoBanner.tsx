import styles from './InfoBanner.module.scss'

interface Props {
  onClose: () => void
}

export default function InfoBanner({ onClose }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.imgWrap}>🚀</div>

      <div className={styles.textBlock}>
        <div className={styles.heading}>New Feature: AI-powered Recommendations</div>
        <p className={styles.body}>
          We've launched personalised product recommendations powered by AI.
          Visit your dashboard to enable it and start seeing smarter suggestions.
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnLearn} onClick={onClose}>
          Learn More
        </button>
        <button className={styles.btnDismiss} onClick={onClose}>
          Dismiss
        </button>
      </div>
    </div>
  )
}
