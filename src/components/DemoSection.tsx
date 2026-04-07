import type { ReactNode } from 'react'
import styles from './DemoSection.module.scss'

interface Props {
  title: string
  description: string
  onLaunch: () => void
  isOpen: boolean
  children?: ReactNode
  id?: string
}

export default function DemoSection({
  id,
  title,
  description,
  onLaunch,
  isOpen,
  children,
}: Props) {
  return (
    <div className={styles.section} id={id}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button
          className={[styles.launchBtn, isOpen ? styles.active : ''].join(' ')}
          onClick={onLaunch}
        >
          <span className={styles.arrow}>▶</span>
          {isOpen ? 'Showing' : 'Launch Demo'}
        </button>
      </div>
      {children}
    </div>
  )
}
