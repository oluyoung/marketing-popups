import { useState, useEffect } from 'react'
import styles from './CountdownBanner.module.scss'

interface Props {
  onClose: () => void
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function CountdownBanner({ onClose }: Props) {
  const [time, setTime] = useState({ h: 5, m: 43, s: 21 })

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.bg} />

      <div className={styles.left}>
        <span className={styles.eyebrow}>⚡ Flash Sale</span>
        <span className={styles.title}>Massive Sale</span>
        <span className={styles.sub}>Up to 75% off — ends soon</span>
      </div>

      <div className={styles.timer}>
        <div className={styles.unit}>
          <div className={styles.num}>{pad(time.h)}</div>
          <div className={styles.label}>Hrs</div>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.unit}>
          <div className={styles.num}>{pad(time.m)}</div>
          <div className={styles.label}>Min</div>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.unit}>
          <div className={styles.num}>{pad(time.s)}</div>
          <div className={styles.label}>Sec</div>
        </div>
      </div>

      <button className={styles.cta} onClick={onClose}>
        Shop Now
      </button>
    </div>
  )
}
