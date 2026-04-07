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
    description: 'The timer resets on any mouse movement or keypress. Once the user is idle for the full duration, the popup opens.',
    blocks: [
      {
        filename: 'useInactivityTrigger with Popout',
        code: `import { useInactivityTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  // Opens after 5 seconds of no mouse or keyboard activity
  const [open, setOpen] = useInactivityTrigger(5000)

  return (
    <Popout id="idle-promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useInactivityTrigger with SlideIn',
        code: `import { useInactivityTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const [open, setOpen] = useInactivityTrigger(8000)

  return (
    <SlideIn id="idle-offer" open={open} onOpenChange={setOpen} position="right" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useInactivityTrigger with Banner',
        code: `import { useInactivityTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  const [open, setOpen] = useInactivityTrigger(10000)

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
const [open, setOpen] = useInactivityTrigger(5000)`,
      },
      {
        filename: 'Medium (30 s) — the default',
        code: `// 30 seconds — the library default; targets users who are reading but not scrolling
// Good for blog posts, long-form pages
const [open, setOpen] = useInactivityTrigger(30000)`,
      },
      {
        filename: 'Long (2 min) — deep reading sessions',
        code: `// 2 minutes — fires only for very idle users, almost certainly distracted
// Good for app dashboards, SaaS products
const [open, setOpen] = useInactivityTrigger(120000)`,
      },
    ],
  },
  {
    title: 'Combined with usePersistence',
    description: 'Avoid showing the popup every time a user pauses on a page they visit repeatedly.',
    blocks: [
      {
        filename: 'Show only once per visitor',
        code: `import { useInactivityTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('idle-promo')

  // Only start listening if not already seen
  const [open, setOpen] = useInactivityTrigger(hasSeen() ? Infinity : 5000)

  if (open && !hasSeen()) {
    markSeen()
  }

  return (
    <Popout id="idle-promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
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
        Fires after the user has been idle for a given duration. Returns an{' '}
        <code>[open, setOpen]</code> tuple. Inactivity is measured by the absence
        of mouse movement and key presses — the timer resets on any interaction.
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
          <span>{'(ms?: number)'}</span>
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
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>open</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the popup should be visible. Starts as <code>false</code>, becomes <code>true</code> after the idle period elapses without interaction.
          </span>
        </div>
        <div className={styles.method}>
          <span className={styles.methodSig}>setOpen</span>
          <span className={styles.methodDesc}>
            <code>Dispatch&lt;SetStateAction&lt;boolean&gt;&gt;</code> — standard state setter. Pass directly as <code>onOpenChange</code>, or call <code>setOpen(false)</code> in your close handler.
          </span>
        </div>
      </div>

      <CodeExamples groups={codeGroups} />
      <PreviousNextGrid pages={prevNextPages} />
    </div>
  )
}
