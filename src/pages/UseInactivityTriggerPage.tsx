import { Link } from 'react-router'
import CodeExamples from '../components/CodeExamples'
import commonStyles from '../common.module.scss';
import styles from './HookPage.module.scss'
import { PreviousNextGrid } from '../components/PreviousNextGrid';

const prevNextPages = [
  // { to: '/docs/hooks/use-scroll-trigger', label: 'useScrollTrigger', desc: 'Triggers popup after scroll down', isNext: false },
  { to: '/docs/hooks/use-exit-trigger', label: 'useExitTrigger', desc: 'Triggers popup on page exit', isNext: false },
  { to: '/docs/hooks/use-persistence', label: 'usePersistence', desc: 'Handles popup persistence', isNext: true },
]

const codeGroups = [
  {
    title: 'Basic usage',
    description: 'Pass onOpenChange to set your open state when the idle period elapses. Manage popup visibility separately with useState.',
    blocks: [
      {
        filename: 'useInactivityTrigger with Popout',
        code: `import { useState } from 'react'
import { useInactivityTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  // Opens after 5 seconds of no mouse or keyboard activity
  useInactivityTrigger({ ms: 5000, onOpenChange: setOpen })

  return (
    <Popout id="idle-promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useInactivityTrigger with SlideIn',
        code: `import { useState } from 'react'
import { useInactivityTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  useInactivityTrigger({ ms: 8000, onOpenChange: setOpen })

  return (
    <SlideIn id="idle-offer" open={open} onOpenChange={setOpen} position="right" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useInactivityTrigger with Banner',
        code: `import { useState } from 'react'
import { useInactivityTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  useInactivityTrigger({ ms: 10000, onOpenChange: setOpen })

  return (
    <Banner id="idle-banner" open={open} onOpenChange={setOpen} position="bottom" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
    ],
  },
  {
    title: 'Choosing the right idle time',
    description: 'Shorter durations are more aggressive; longer durations target genuinely disengaged users.',
    blocks: [
      {
        filename: 'Short (5 s) — quick disengagement',
        code: `// 5 seconds — catches users who paused or got distracted immediately
// Good for high-urgency promos on fast-scroll pages
const [open, setOpen] = useState(false)
useInactivityTrigger({ ms: 5000, onOpenChange: setOpen })`,
      },
      {
        filename: 'Medium (30 s) — the default',
        code: `// 30 seconds — the library default; targets users who are reading but not scrolling
// Good for blog posts, long-form pages
const [open, setOpen] = useState(false)
useInactivityTrigger({ ms: 30000, onOpenChange: setOpen })`,
      },
      {
        filename: 'Long (2 min) — deep reading sessions',
        code: `// 2 minutes — fires only for very idle users, almost certainly distracted
// Good for app dashboards, SaaS products
const [open, setOpen] = useState(false)
useInactivityTrigger({ ms: 120000, onOpenChange: setOpen })`,
      },
    ],
  },
  {
    title: 'Combined with usePersistence',
    description: 'Avoid showing the popup every time a user pauses on a page they visit repeatedly.',
    blocks: [
      {
        filename: 'Show only once per visitor',
        code: `import { useState } from 'react'
import { useInactivityTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('idle-promo')
  const [open, setOpen] = useState(false)

  useInactivityTrigger({ ms: 5000, onOpenChange: setOpen })

  return (
    <Popout id="idle-promo" open={open && !hasSeen()} onOpenChange={setOpen} onClose={markSeen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
]

export default function UseInactivityTriggerPage() {
  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/docs">Docs</Link>
        <span className={commonStyles.sep}>/</span>
        <span>Hooks</span>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>useInactivityTrigger</span>
      </div>

      <h1>useInactivityTrigger</h1>

      <p className={styles.lead}>
        Fires after the user has been idle for a given duration. Pass{' '}
        <code>onOpenChange</code> to update your popup's open state. Inactivity is
        measured by the absence of mouse movement and key presses — the timer resets
        on any interaction.
      </p>

      <div className={styles.importRow}>
        <span className={styles.keyword}>import</span>
        <span>{'{ '}</span>
        <span className={styles.name}>useInactivityTrigger</span>
        <span>{' }'}</span>
        <span className={styles.from}>from</span>
        <span className={styles.pkg}>'react-marketing-popups'</span>
      </div>

      <div className={styles.divider} />

      <h2>Signature</h2>

      <div className={styles.returnsBox}>
        <div>
          <span className={styles.returnType}>useInactivityTrigger</span>
          <span>{'({ ms?, onOpenChange? })'}</span>
        </div>
        <div className={styles.returnDesc}>
          Returns <code>readonly [boolean, Dispatch&lt;SetStateAction&lt;boolean&gt;&gt;]</code>
        </div>
      </div>

      <h2>Parameters</h2>

      <table className={commonStyles.paramTable}>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ms</td>
            <td><code>number</code></td>
            <td><code>30000</code></td>
            <td>Milliseconds of inactivity required before the trigger fires. The timer resets on any mouse or keyboard event.</td>
          </tr>
          <tr>
            <td>onOpenChange</td>
            <td><code>(v: boolean) =&gt; void</code></td>
            <td>—</td>
            <td>Called with <code>true</code> when the idle period elapses. Wire to your popup's open state setter.</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>fired</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the trigger has fired. Starts as <code>false</code>, becomes <code>true</code> after the idle period elapses without interaction.
          </span>
        </div>
        <div className={styles.method}>
          <span className={styles.methodSig}>setFired</span>
          <span className={styles.methodDesc}>
            <code>Dispatch&lt;SetStateAction&lt;boolean&gt;&gt;</code> — rarely needed directly; the hook manages this internally. Use a separate <code>useState</code> for popup visibility.
          </span>
        </div>
      </div>

      <CodeExamples groups={codeGroups} />
      <PreviousNextGrid pages={prevNextPages} />
    </div>
  )
}
