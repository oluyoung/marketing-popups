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
    description: 'The hook returns an [open, setOpen] tuple. Wire it to any component — the popup opens automatically after the delay.',
    blocks: [
      {
        filename: 'useTimerTrigger with Popout',
        code: `import { useTimerTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  // Opens automatically after 4 000 ms
  const [open, setOpen] = useTimerTrigger(4000)

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useTimerTrigger with SlideIn',
        code: `import { useTimerTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const [open, setOpen] = useTimerTrigger(6000)

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useTimerTrigger with Banner',
        code: `import { useTimerTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  const [open, setOpen] = useTimerTrigger(3000)

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
    title: 'Conditional firing with enabled',
    description: 'Pass false as the second argument to pause the timer. Useful for gating the trigger on auth state, A/B tests, or feature flags.',
    blocks: [
      {
        filename: 'Only fire for authenticated users',
        code: `import { useTimerTrigger, Popout } from 'react-marketing-popups'

export default function App() {
  const isLoggedIn = useAuth()

  // Timer only starts when isLoggedIn is true
  const [open, setOpen] = useTimerTrigger(5000, isLoggedIn)

  return (
    <Popout id="upsell" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <UpsellContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'A/B test — show to 50% of visitors',
        code: `import { useTimerTrigger, Popout } from 'react-marketing-popups'

export default function App() {
  // Randomly enable for half of visitors (evaluated once on mount)
  const [inVariant] = useState(() => Math.random() < 0.5)
  const [open, setOpen] = useTimerTrigger(4000, inVariant)

  return (
    <Popout id="ab-promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <PromoContent onClose={() => setOpen(false)} />
    </Popout>
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
        code: `import { useTimerTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen } = usePersistence('welcome-popup')

  // Don't start the timer at all if already seen
  const [open, setOpen] = useTimerTrigger(4000, !hasSeen())

  return (
    <Popout id="welcome-popup" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
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
        Fires after a fixed delay. Returns an <code>[open, setOpen]</code> tuple that
        you wire to any popup component. The timer starts on mount and calls{' '}
        <code>setOpen(true)</code> once after <code>ms</code> milliseconds.
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
          <span>{'(ms?: number, enabled?: boolean)'}</span>
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
            <td>Milliseconds to wait before setting open to true</td>
          </tr>
          <tr>
            <td>enabled</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>When false the timer does not start. Useful for conditional firing.</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>open</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the popup should be visible. Starts as <code>false</code>, becomes <code>true</code> after the timer fires.
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
