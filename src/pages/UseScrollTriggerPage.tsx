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
    description: 'Pass onOpenChange to set your open state when the scroll threshold is crossed. Manage popup visibility separately with useState.',
    blocks: [
      {
        filename: 'useScrollTrigger with Popout',
        code: `import { useState } from 'react'
import { useScrollTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  // Opens when the page is 50% scrolled
  useScrollTrigger({ percent: 50, onOpenChange: setOpen })

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="fade" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useScrollTrigger with SlideIn',
        code: `import { useState } from 'react'
import { useScrollTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  // Slides in once the reader reaches 40% of the page
  useScrollTrigger({ percent: 40, onOpenChange: setOpen })

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useScrollTrigger with Banner',
        code: `import { useState } from 'react'
import { useScrollTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  // Banner appears when the user is 60% through the page
  useScrollTrigger({ percent: 60, onOpenChange: setOpen })

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
const [open, setOpen] = useState(false)
useScrollTrigger({ percent: 25, onOpenChange: setOpen })`,
      },
      {
        filename: 'High threshold — catch engaged readers',
        code: `// 75% — user is clearly reading; good for content upgrades
const [open, setOpen] = useState(false)
useScrollTrigger({ percent: 75, onOpenChange: setOpen })`,
      },
      {
        filename: 'Near bottom — last-chance CTA',
        code: `// 90% — user reached the bottom; ideal for a final CTA or offer
const [open, setOpen] = useState(false)
useScrollTrigger({ percent: 90, onOpenChange: setOpen })`,
      },
    ],
  },
  {
    title: 'Combined with usePersistence',
    description: 'Show the popup only once so a returning visitor who already scrolled the page is not shown it again.',
    blocks: [
      {
        filename: 'Show once per visitor',
        code: `import { useState } from 'react'
import { useScrollTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('scroll-promo')
  const [open, setOpen] = useState(false)

  useScrollTrigger({ percent: 50, onOpenChange: setOpen })

  return (
    <Popout id="scroll-promo" open={open && !hasSeen()} onOpenChange={setOpen} onClose={markSeen} animation="fade" lockScroll>
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
        Fires when the user scrolls past a percentage of the page. Pass{' '}
        <code>onOpenChange</code> to update your popup's open state. The hook
        listens to the window scroll event and calls <code>onOpenChange(true)</code>{' '}
        once the threshold is crossed.
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
          <span>{'({ percent?, onOpenChange? })'}</span>
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
          <tr>
            <td>onOpenChange</td>
            <td><code>(v: boolean) =&gt; void</code></td>
            <td>—</td>
            <td>Called with <code>true</code> when the scroll threshold is crossed. Wire to your popup's open state setter.</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>fired</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the trigger has fired. Starts as <code>false</code>, becomes <code>true</code> once the scroll threshold is crossed.
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
