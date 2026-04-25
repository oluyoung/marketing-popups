import { Link } from 'react-router'
import CodeExamples from '../components/CodeExamples'
import commonStyles from '../common.module.scss'
import styles from './HookPage.module.scss'
import { PreviousNextGrid } from '../components/PreviousNextGrid'

const prevNextPages = [
  // { to: '/docs/popout', label: 'Popout', desc: 'Centered modals with overlay', isNext: false },
  // { to: '/docs/slide-in', label: 'Slide In', desc: 'Side panels from left or right', isNext: false },
  { to: '/docs/banner', label: 'Banner', desc: 'Full-width top or bottom bars', isNext: false },
  { to: '/docs/hooks/use-scroll-trigger', label: 'useScrollTrigger', desc: 'Triggers popup after scroll down threshold', isNext: true },
]

const codeGroups = [
  {
    title: 'Basic usage',
    description: 'Pass onOpenChange to set your open state when the timer fires. Manage popup visibility separately with useState.',
    blocks: [
      {
        filename: 'useTimerTrigger with Popout',
        code: `import { useState } from 'react'
import { useTimerTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  // Opens automatically after 4 000 ms
  useTimerTrigger({ ms: 4000, onOpenChange: setOpen })

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useTimerTrigger with SlideIn',
        code: `import { useState } from 'react'
import { useTimerTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  useTimerTrigger({ ms: 6000, onOpenChange: setOpen })

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useTimerTrigger with Banner',
        code: `import { useState } from 'react'
import { useTimerTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  useTimerTrigger({ ms: 3000, onOpenChange: setOpen })

  return (
    <Banner id="announcement" open={open} onOpenChange={setOpen} position="bottom" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
    ],
  },
  {
    title: 'Combined with usePersistence',
    description: 'Pair with usePersistence to show the popup only once — even across page reloads.',
    blocks: [
      {
        filename: 'Show once per visitor (localStorage)',
        code: `import { useState } from 'react'
import { useTimerTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('welcome-popup')
  const [open, setOpen] = useState(false)

  useTimerTrigger({ ms: 4000, onOpenChange: setOpen })

  return (
    <Popout id="welcome-popup" open={open && !hasSeen()} onOpenChange={setOpen} onClose={markSeen} animation="zoom" lockScroll>
      <WelcomeContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
]

export default function UseTimerTriggerPage() {
  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/docs">Docs</Link>
        <span className={commonStyles.sep}>/</span>
        <span>Hooks</span>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>useTimerTrigger</span>
      </div>

      <h1>useTimerTrigger</h1>

      <p className={styles.lead}>
        Fires after a fixed delay. Pass <code>onOpenChange</code> to wire it to your
        popup's open state. The timer starts on mount and calls{' '}
        <code>onOpenChange(true)</code> once after <code>ms</code> milliseconds.
      </p>

      <div className={styles.importRow}>
        <span className={styles.keyword}>import</span>
        <span>{'{ '}</span>
        <span className={styles.name}>useTimerTrigger</span>
        <span>{' }'}</span>
        <span className={styles.from}>from</span>
        <span className={styles.pkg}>'react-marketing-popups'</span>
      </div>

      <div className={styles.divider} />

      <h2>Signature</h2>

      <div className={styles.returnsBox}>
        <div>
          <span className={styles.returnType}>useTimerTrigger</span>
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
            <td><code>3000</code></td>
            <td>Milliseconds to wait before the trigger fires</td>
          </tr>
          <tr>
            <td>onOpenChange</td>
            <td><code>(v: boolean) =&gt; void</code></td>
            <td>—</td>
            <td>Called with <code>true</code> when the timer fires. Wire to your popup's open state setter.</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>fired</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the timer has fired. Starts as <code>false</code>, becomes <code>true</code> after the delay elapses.
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
