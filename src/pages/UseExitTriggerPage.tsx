import { Link } from 'react-router'
import CodeExamples from '../components/CodeExamples';
import commonStyles from '../common.module.scss';
import styles from './HookPage.module.scss'
import { PreviousNextGrid } from '../components/PreviousNextGrid';

const prevNextPages = [
  { to: '/docs/hooks/use-scroll-trigger', label: 'useScrollTrigger', desc: 'Triggers popup after scroll down', isNext: false },
  { to: '/docs/hooks/use-inactivity-trigger', label: 'useInactivityTrigger', desc: 'Triggers popup on user inactivity', isNext: true },
]

const codeGroups = [
  {
    title: 'Basic usage',
    description: 'Pass onOpenChange to set your open state when exit intent is detected. Manage popup visibility separately with useState.',
    blocks: [
      {
        filename: 'useExitTrigger with Popout',
        code: `import { useState } from 'react'
import { useExitTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  // Fires when the mouse exits through the top of the viewport
  useExitTrigger({ onOpenChange: setOpen })

  return (
    <Popout id="exit-promo" open={open} onOpenChange={setOpen} animation="bounce" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'useExitTrigger with SlideIn',
        code: `import { useState } from 'react'
import { useExitTrigger, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  useExitTrigger({ onOpenChange: setOpen })

  return (
    <SlideIn id="exit-offer" open={open} onOpenChange={setOpen} position="right" animation="fade">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'useExitTrigger with Banner',
        code: `import { useState } from 'react'
import { useExitTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function App() {
  const [open, setOpen] = useState(false)

  useExitTrigger({ onOpenChange: setOpen })

  return (
    <Banner id="exit-banner" open={open} onOpenChange={setOpen} position="top" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
    ],
  },
  {
    title: 'Configuring the options',
    description: 'All options are optional. Tune topZonePx to control sensitivity and delayMs to debounce accidental triggers.',
    blocks: [
      {
        filename: 'Custom topZonePx — tighter detection zone',
        code: `// topZonePx: 20 — only fires when mouse is within 20 px of the top edge
// Good for reducing false positives on large monitors
const [open, setOpen] = useState(false)
useExitTrigger({ topZonePx: 20, onOpenChange: setOpen })`,
      },
      {
        filename: 'delayMs — debounce accidental triggers',
        code: `// delayMs: 300 — mouse must stay in the top zone for 300 ms before firing
// Prevents the popup from flashing on quick cursor movements
const [open, setOpen] = useState(false)
useExitTrigger({ topZonePx: 20, delayMs: 300, onOpenChange: setOpen })`,
      },
      {
        filename: 'once: false — fire on every exit',
        code: `// once: false — fires each time the user moves to exit, not just the first time
// The default is true (fires once per page load)
const [open, setOpen] = useState(false)
useExitTrigger({ once: false, onOpenChange: setOpen })`,
      },
      {
        filename: 'All options together',
        code: `const [open, setOpen] = useState(false)
useExitTrigger({
  topZonePx: 20,          // detection zone height in pixels (default: 50)
  delayMs: 300,           // debounce delay in ms (default: 0)
  once: true,             // fire only once per page load (default: true)
  onOpenChange: setOpen,  // called with true when exit intent fires
})`,
      },
    ],
  },
  {
    title: 'Combined with usePersistence',
    description: 'Prevent repeat interruptions for visitors who have already dismissed the popup.',
    blocks: [
      {
        filename: 'Show exit popup only once per visitor',
        code: `import { useState } from 'react'
import { useExitTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('exit-promo')
  const [open, setOpen] = useState(false)

  useExitTrigger({ topZonePx: 20, delayMs: 300, onOpenChange: setOpen })

  return (
    <Popout id="exit-promo" open={open && !hasSeen()} onOpenChange={setOpen} onClose={markSeen} animation="bounce" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
]

export default function UseExitTriggerPage() {
  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/docs">Docs</Link>
        <span className={commonStyles.sep}>/</span>
        <span>Hooks</span>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>useExitTrigger</span>
      </div>

      <h1>useExitTrigger</h1>

      <p className={styles.lead}>
        Fires when the user's mouse moves toward the top of the viewport — the
        classic exit-intent signal. Pass <code>onOpenChange</code> to update your
        popup's open state. By default it fires once per page load and only on
        desktop (no mouse on touch devices).
      </p>

      <div className={styles.importRow}>
        <span className={styles.keyword}>import</span>
        <span>{'{ '}</span>
        <span className={styles.name}>useExitTrigger</span>
        <span>{' }'}</span>
        <span className={styles.from}>from</span>
        <span className={styles.pkg}>'react-marketing-popups'</span>
      </div>

      <div className={styles.divider} />

      <h2>Signature</h2>

      <div className={styles.returnsBox}>
        <div>
          <span className={styles.returnType}>useExitTrigger</span>
          <span>{'(opts?: { topZonePx?: number; delayMs?: number; once?: boolean; onOpenChange?: (v: boolean) => void })'}</span>
        </div>
        <div className={styles.returnDesc}>
          Returns <code>readonly [boolean, Dispatch&lt;SetStateAction&lt;boolean&gt;&gt;]</code>
        </div>
      </div>

      <h2>Parameters</h2>

      <table className={commonStyles.paramTable}>
        <thead>
          <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>topZonePx</td>
            <td><code>number</code></td>
            <td><code>50</code></td>
            <td>Pixel height of the top-of-viewport zone that triggers the intent detection</td>
          </tr>
          <tr>
            <td>delayMs</td>
            <td><code>number</code></td>
            <td><code>0</code></td>
            <td>How long the mouse must remain in the zone before firing — debounces accidental triggers</td>
          </tr>
          <tr>
            <td>once</td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>When true the trigger fires only once per page load; set to false to re-fire on each exit movement</td>
          </tr>
          <tr>
            <td>onOpenChange</td>
            <td><code>(v: boolean) =&gt; void</code></td>
            <td>—</td>
            <td>Called with <code>true</code> when exit intent is detected. Wire to your popup's open state setter.</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>fired</span>
          <span className={styles.methodDesc}>
            <code>boolean</code> — whether the trigger has fired. Starts as <code>false</code>, becomes <code>true</code> when exit intent is detected.
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
