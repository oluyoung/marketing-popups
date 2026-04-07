import { Link } from 'react-router'
import CodeExamples from '../components/CodeExamples'
import commonStyles from '../common.module.scss';
import styles from './HookPage.module.scss'
import { PreviousNextGrid } from '../components/PreviousNextGrid';

const prevNextPages = [
  // { to: '/docs/hooks/use-scroll-trigger', label: 'useScrollTrigger', desc: 'Triggers popup after scroll down', isNext: false },
  { to: '/docs/hooks/use-inactivity-trigger', label: 'useInactivityTrigger', desc: 'Triggers popup on user inactivity', isNext: false },
]

const codeGroups = [
  {
    title: 'Basic usage',
    description: 'Pair usePersistence with any trigger hook. Use hasSeen to guard the trigger and markSeen to record the first display.',
    blocks: [
      {
        filename: 'Show once — timer trigger',
        code: `import { useTimerTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('welcome-popup')

  // Don't start the timer if the user has already seen the popup
  const [open, setOpen] = useTimerTrigger(4000, !hasSeen())

  if (open && !hasSeen()) {
    markSeen()
  }

  return (
    <Popout id="welcome-popup" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <WelcomeContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'Show once — scroll trigger',
        code: `import { useScrollTrigger, usePersistence, SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('scroll-offer')
  const [open, setOpen] = useScrollTrigger(50)

  if (open && !hasSeen()) {
    markSeen()
  }

  return (
    <SlideIn
      id="scroll-offer"
      open={open && !hasSeen()}
      onOpenChange={setOpen}
      position="left"
      animation="slide"
    >
      <OfferContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'Show once — exit intent',
        code: `import { useExitTrigger, usePersistence, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export default function App() {
  const { hasSeen, markSeen } = usePersistence('exit-popup')
  const [open, setOpen] = useExitTrigger({ topZonePx: 20, delayMs: 300 })

  if (open && !hasSeen()) {
    markSeen()
  }

  return (
    <Popout id="exit-popup" open={open && !hasSeen()} onOpenChange={setOpen} animation="bounce" lockScroll>
      <ExitContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
  {
    title: 'Cooldown — show again after N days',
    description: 'usePersistence uses a simple boolean flag (key present in localStorage = seen). For time-based cooldowns, store a timestamp instead.',
    blocks: [
      {
        filename: 'Re-show after 7 days',
        code: `import { useTimerTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

const COOLDOWN_DAYS = 7
const KEY = 'promo-last-shown'

function hasCooldowned(): boolean {
  const stored = localStorage.getItem(KEY)
  if (!stored) return true
  const diffMs = Date.now() - Number(stored)
  return diffMs > COOLDOWN_DAYS * 24 * 60 * 60 * 1000
}

function recordShown() {
  localStorage.setItem(KEY, String(Date.now()))
}

export default function App() {
  const cooldownPassed = hasCooldowned()
  const [open, setOpen] = useTimerTrigger(4000, cooldownPassed)

  if (open && cooldownPassed) {
    recordShown()
  }

  return (
    <Popout id="promo" open={open && cooldownPassed} onOpenChange={setOpen} animation="zoom" lockScroll>
      <PromoContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
  {
    title: 'Development reset with clear()',
    description: 'During development, call clear() to wipe the localStorage key so you can preview the first-visit experience.',
    blocks: [
      {
        filename: 'Reset with a keyboard shortcut',
        code: `import { usePersistence, useTimerTrigger, Popout } from 'react-marketing-popups'
import { useEffect } from 'react'

export default function App() {
  const { hasSeen, markSeen, clear } = usePersistence('dev-popup')
  const [open, setOpen] = useTimerTrigger(2000, !hasSeen())

  // Press Shift+R in development to reset the seen flag
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'R') clear()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [clear])

  if (open && !hasSeen()) markSeen()

  return (
    <Popout id="dev-popup" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <DevContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'Reset from the browser console',
        code: `// Run this in the browser DevTools console to clear a specific popup's seen state:
localStorage.removeItem('my-popup-key')

// Or call clear() directly in a useEffect for one-time dev resets:
useEffect(() => {
  clear() // removes the key on every mount — remove this line before shipping
}, [])`,
      },
    ],
  },
  {
    title: 'Multiple popups with separate keys',
    description: 'Each popup must use a unique key. usePersistence is lightweight — you can call it multiple times.',
    blocks: [
      {
        filename: 'Three independent popups',
        code: `import { useTimerTrigger, usePersistence, Popout, Banner, SlideIn } from 'react-marketing-popups'

export default function App() {
  const welcome  = usePersistence('welcome-popup')
  const offer    = usePersistence('scroll-offer')
  const exit     = usePersistence('exit-banner')

  const [popoutOpen, setPopoutOpen] = useTimerTrigger(3000, !welcome.hasSeen())
  const [slideOpen,  setSlideOpen]  = useScrollTrigger(50,  !offer.hasSeen())
  const [bannerOpen, setBannerOpen] = useExitTrigger()

  if (popoutOpen && !welcome.hasSeen()) welcome.markSeen()
  if (slideOpen  && !offer.hasSeen())   offer.markSeen()
  if (bannerOpen && !exit.hasSeen())    exit.markSeen()

  return (
    <>
      <Popout id="welcome-popup" open={popoutOpen} onOpenChange={setPopoutOpen} animation="zoom" lockScroll>
        <WelcomeContent />
      </Popout>
      <SlideIn id="scroll-offer" open={slideOpen} onOpenChange={setSlideOpen} position="left" animation="slide">
        <OfferContent />
      </SlideIn>
      <Banner id="exit-banner" open={bannerOpen && !exit.hasSeen()} onOpenChange={setBannerOpen} position="top" animation="fade">
        <ExitContent />
      </Banner>
    </>
  )
}`,
      },
    ],
  },
]

export default function UsePersistencePage() {
  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/docs">Docs</Link>
        <span className={commonStyles.sep}>/</span>
        <span>Hooks</span>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>usePersistence</span>
      </div>

      <h1>usePersistence</h1>

      <p className={styles.lead}>
        Manages whether a visitor has already seen a popup, using localStorage as
        the backing store. Designed to be paired with any trigger hook to prevent
        repeat interruptions on return visits.
      </p>

      <div className={styles.importRow}>
        <span className={styles.keyword}>import</span>
        <span>{'{ '}</span>
        <span className={styles.name}>usePersistence</span>
        <span>{' }'}</span>
        <span className={styles.from}>from</span>
        <span className={styles.pkg}>'react-marketing-popups'</span>
      </div>

      <div className={styles.divider} />

      <h2>Signature</h2>

      <div className={styles.returnsBox}>
        <div>
          <span className={styles.returnType}>usePersistence</span>
          <span>{'(key: string)'}</span>
        </div>
        <div className={styles.returnDesc}>
          Returns <code>{'{ hasSeen: () => boolean, markSeen: () => void, clear: () => void }'}</code>
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
            <td>key</td>
            <td><code>string</code></td>
            <td>—</td>
            <td>The localStorage key used to record the seen state. Must be unique per popup.</td>
          </tr>
        </tbody>
      </table>

      <h2>Returns</h2>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <span className={styles.methodSig}>hasSeen()</span>
          <span className={styles.methodDesc}>
            Returns <code>true</code> if the key is present in localStorage — i.e., the popup has been shown to this visitor before.
          </span>
        </div>
        <div className={styles.method}>
          <span className={styles.methodSig}>markSeen()</span>
          <span className={styles.methodDesc}>
            Writes the key to localStorage. Call this when the popup first displays so future visits skip it.
          </span>
        </div>
        <div className={styles.method}>
          <span className={styles.methodSig}>clear()</span>
          <span className={styles.methodDesc}>
            Removes the key from localStorage. Useful during development to reset to a first-visit state without opening DevTools.
          </span>
        </div>
      </div>

      <CodeExamples groups={codeGroups} />
      <PreviousNextGrid pages={prevNextPages} />
    </div>
  )
}
