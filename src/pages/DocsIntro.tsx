import { Link } from 'react-router'
import commonStyles from '../common.module.scss';
import styles from './DocsIntro.module.scss'

const components = [
  { to: '/docs/popout', label: 'Popout →', desc: 'Centered modals with overlay' },
  { to: '/docs/slide-in', label: 'Slide In →', desc: 'Side panels from left or right' },
  { to: '/docs/banner', label: 'Banner →', desc: 'Full-width top or bottom bars' },
]

export default function DocsIntro() {
  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/">Home</Link>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>Introduction</span>
      </div>

      <h1>Introduction</h1>

      <p className={commonStyles.lead}>
        <strong>react-marketing-popups</strong> is a lightweight React library for building
        high-converting popouts, banners, and slide-in panels. It ships with built-in trigger
        behaviours, smooth animations, and localStorage-based persistence so each visitor only
        sees a popup the right number of times.
      </p>

      <h2>Installation</h2>

      <div className={styles.codeBlock}>
        <span className={styles.prompt}>$</span>
        <span>npm install react-marketing-popups</span>
      </div>

      <h2>Usage</h2>

      <p>Import the component and its stylesheet, then control visibility with a state variable:</p>

      <div className={commonStyles.codeFile}>
        <div className={commonStyles.codeFilename}>App.tsx</div>
        <pre className={commonStyles.pre}>{`import { useState } from 'react'
import { Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Popup</button>

      <Popout
        id="my-popup"
        open={open}
        onOpenChange={setOpen}
        animation="zoom"
        lockScroll
      >
        <div style={{ padding: 32 }}>
          <h2>Hello World!</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </Popout>
    </>
  )
}`}</pre>
      </div>

      <h2>Persistence</h2>

      <p>
        The <code>id</code> prop is required. The library uses it as a localStorage key
        to record when a popup was last shown. By default, each popup shows once per session.
        Use the <code>showCount</code> and <code>cooldownMs</code> props to tune this behaviour.
      </p>

      <h2>Next steps</h2>

      <div className={styles.nextGrid}>
        {components.map((c) => (
          <Link key={c.to} to={c.to} className={styles.nextCard}>
            <span className={styles.nextLabel}>{c.label}</span>
            <span className={styles.nextDesc}>{c.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
