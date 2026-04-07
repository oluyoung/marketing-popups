import { Link } from 'react-router'
import CodeExamples from '../components/CodeExamples'
import commonStyles from '../common.module.scss';
import styles from './HookPage.module.scss'
import { PreviousNextGrid } from '../components/PreviousNextGrid';

const prevNextPages = [
  // { to: '/docs/popout', label: 'Popout', desc: 'Centered modals with overlay', isNext: false },
  // { to: '/docs/slide-in', label: 'Slide In', desc: 'Side panels from left or right', isNext: false },
  // { to: '/docs/banner', label: 'Banner', desc: 'Full-width top or bottom bars', isNext: false },
  { to: '/docs/hooks/use-timer-trigger', label: 'useTimerTrigger', desc: 'Triggers popup after a delay', isNext: false },
  { to: '/docs/hooks/use-exit-trigger', label: 'useExitTrigger', desc: 'Triggers popup on page exit', isNext: true },
]

const codeGroups = [
  {
    title: 'Basic usage',
    description: 'The hook listens to the window scroll event and fires once the page has been scrolled past the given percentage.',
    blocks: [
      {
        filename: 'useScrollTrigger with Popout',
        code: `import { useScrollTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  // Opens when the page is 50% scrolled
  const [open, setOpen] = useScrollTrigger(50)

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="fade" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useScrollTrigger with SlideIn',
        code: `import { useScrollTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  // Slides in once the reader reaches 40% of the page
  const [open, setOpen] = useScrollTrigger(40)

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useScrollTrigger with Banner',
        code: `import { useScrollTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  // Banner appears when the user is 60% through the page
  const [open, setOpen] = useScrollTrigger(60)

  return (
    <Banner id="cta" open={open} onOpenChange={setOpen} position="bottom" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
    ],
  },
  {
    title: 'Scroll depth strategy',
    description: 'Choose the percentage based on what the user should have read or seen before the popup appears.',
    blocks: [
      {
        filename: 'Low threshold — catch early attention',
        code: `// 25% — fires near the top of the page, good for lead-gen
const [open, setOpen] = useScrollTrigger(25)`,
      },
      {
        filename: 'High threshold — catch engaged readers',
        code: `// 75% — user is clearly reading; good for content upgrades
const [open, setOpen] = useScrollTrigger(75)`,
      },
      {
        filename: 'Near bottom — last-chance CTA',
        code: `// 90% — user reached the bottom; ideal for a final CTA or offer
const [open, setOpen] = useScrollTrigger(90)`,
      },
    ],
  },
  {
    title: 'Combined with usePersistence',
    description: 'Show the popup only once so a returning visitor who already scrolled the page is not shown it again.',
    blocks: [
      {
        filename: 'Show once per visitor',
        code: `import { useScrollTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const [open, setOpen] = useScrollTrigger(50)
  const { hasSeen, markSeen } = usePersistence('scroll-promo')

  // Mark as seen on first fire so it never shows again
  if (open && !hasSeen()) {
    markSeen()
  }

  return (
    <Popout id="scroll-promo" open={open} onOpenChange={setOpen} animation="fade" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
]

export default function UseScrollTriggerPage() {
  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/docs">Docs</Link>
        <span className={commonStyles.sep}>/</span>
        <span>Hooks</span>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>useScrollTrigger</span>
      </div>

      <h1>useScrollTrigger</h1>

      <p className={styles.lead}>
        Fires when the user scrolls past a percentage of the page. Returns an{' '}
        <code>[open, setOpen]</code> tuple that you wire to any popup component.
        The hook listens to the window scroll event and sets <code>open</code> to{' '}
        <code>true</code> once the threshold is crossed.
      </p>

      <div className={styles.importRow}>
        <span className={styles.keyword}>import</span>
        <span>{'{ '}</span>
        <span className={styles.name}>useScrollTrigger</span>
        <span>{' }'}</span>
        <span className={styles.from}>from</span>
        <span className={styles.pkg}>'react-marketing-popups'</span>
      </div>

      <div className={styles.divider} />

      <h2>Signature</h2>

      <div className={styles.returnsBox}>
        <div>
          <span className={styles.returnType}>useScrollTrigger</span>
          <span>{'(percent?: number)'}</span>
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
            <td>percent</td>
            <td><code>number</code></td>
            <td><code>50</code></td>
            <td>Page scroll depth (0–100) at which the trigger fires</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>open</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the popup should be visible. Starts as <code>false</code>, becomes <code>true</code> once the scroll threshold is crossed.
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
