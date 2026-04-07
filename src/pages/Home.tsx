import { useState } from 'react'
import { Link } from 'react-router'
import styles from './Home.module.scss'
import commonStyles from '../common.module.scss'

const features = [
  { icon: '🪟', title: 'Popout (Modal)', desc: 'Centered modal with overlay, smooth animations, and optional lock scroll.' },
  { icon: '📌', title: 'Banner', desc: 'Full-width horizontal banners at top or bottom. Vertical side banners too.' },
  { icon: '↔️', title: 'Slide In', desc: 'Fixed panels that slide in from the left or right edge of the viewport.' },
]

const triggers = [
  { icon: '⏱️', title: 'Timer', desc: 'Show after a configurable delay in milliseconds.' },
  { icon: '📜', title: 'Scroll %', desc: 'Trigger when the user scrolls past a page percentage.' },
  { icon: '💤', title: 'Inactivity', desc: 'Fire after the user stops interacting for a set duration.' },
  { icon: '🚪', title: 'Exit Intent', desc: 'Detect when the mouse leaves the top of the viewport.' },
]

const demoLinks = [
  { to: '/popout', title: 'Popout', desc: 'Newsletter & sales modals', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🪟' },
  { to: '/slide-in', title: 'Slide In', desc: 'Discount & urgency panels', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '↔️' },
  { to: '/banner', title: 'Banner', desc: 'Timer, info & cookie banners', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '📌' },
]

export default function Home() {
  const [copied, setCopied] = useState(false)

  function copyInstall() {
    navigator.clipboard.writeText('npm install react-marketing-popups')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={commonStyles.page}>
      <div className={styles.hero}>
        <div className={styles.tag}>
          <span className={styles.dot} />
          React Component Library
        </div>

        <h1>
          Beautiful<br />
          <span>Marketing Popups</span><br />
          for React
        </h1>

        <p className={styles.lead}>
          A lightweight library for high-converting popouts, banners, and slide-ins.
          Built with smooth animations, smart triggers, and persistent behaviour tracking.
        </p>

        <div className={styles.actions}>
          <Link to="/popout" className={styles.btnPrimary}>
            View Demos →
          </Link>
          <a
            href="https://www.npmjs.com/package/react-marketing-popups"
            target="_blank"
            rel="noreferrer"
            className={styles.btnSecondary}
          >
            npm package ↗
          </a>
        </div>
      </div>

      <div className={styles.installBox}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>npm install react-marketing-popups</span>
        <button className={styles.copy} onClick={copyInstall}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className={styles.section}>
        <h2>Components</h2>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.icon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Built-in Triggers</h2>
        <div className={styles.triggersGrid}>
          {triggers.map((t) => (
            <div key={t.title} className={styles.triggerItem}>
              <span className={styles.triggerIcon}>{t.icon}</span>
              <div className={styles.triggerText}>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Live Demos</h2>
        <div className={styles.demoCards}>
          {demoLinks.map((d) => (
            <Link key={d.to} to={d.to} className={styles.demoCard}>
              <div className={styles.demoPreview} style={{ background: d.bg }}>
                <span style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>{d.icon}</span>
              </div>
              <div className={styles.demoInfo}>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <div className={styles.arrow}>View demos →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
