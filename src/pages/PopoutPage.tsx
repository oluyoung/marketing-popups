import { useState } from 'react'
import { Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'
import commonStyles from '../common.module.scss'
import PageHeader from './PageHeader'
import DemoSection from '../components/DemoSection'
import CodeExamples from '../components/CodeExamples'
import NewsletterPopout from '../popups/NewsletterPopout'
import SalesPopout from '../popups/SalesPopout'
import PropTable from '../components/PropTable'
import { PreviousNextGrid } from '../components/PreviousNextGrid'

const prevNextPages = [
  { to: '/docs', label: 'Docs', desc: 'Docs Home', isNext: false },
  { to: '/docs/slide-in', label: 'Slide In', desc: 'Side panels from left or right', isNext: true },
  // { to: '/docs/banner', label: 'Banner →', desc: 'Full-width top or bottom bars' },
]

const popoutProps = [
  { name: 'id', type: 'string', description: 'Unique key for persistence tracking' },
  { name: 'open', type: 'boolean', description: 'Controls visibility', default: 'false' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when open state changes' },
  { name: 'animation', type: '"fade" | "zoom" | "bounce"', description: 'Open/close animation', default: '"zoom"' },
  { name: 'lockScroll', type: 'boolean', description: 'Lock body scroll while open', default: 'false' },
  { name: 'closeOnOverlay', type: 'boolean', description: 'Close on overlay click', default: 'true' },
]

const codeGroups = [
  {
    title: 'Core',
    description:
      'Use the Popout directly — manage open state with useState and wire it to onOpenChange.',
    blocks: [
      {
        filename: 'MyPopout.tsx',
        code: `import { useState } from 'react';
// import { Popout } from 'react-marketing-popups/Popout';
import { Popout } from 'react-marketing-popups';
import 'react-marketing-popups/Popout/style.css';

export const MyPopout = () => {
  const [open, setOpen] = useState(false)

  return (
    <Popout
      id="promo-timer"
      open={open}
      onOpenChange={setOpen}
      animation="zoom"
      lockScroll
    >
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  );
};
  `,
      },
    ],
  },
  {
    title: 'Trigger hooks',
    description:
      'Use hooks for automatic triggering. Pass onOpenChange to wire the hook to your open state. Each hook also returns [fired, setFired] if you need to track whether it has fired.',
    blocks: [
      {
        filename: 'MyTimerPopout.tsx',
        code: `import { useState } from 'react'
// import { Popout } from 'react-marketing-popups/Popout'
// import { useTimerTrigger } from 'react-marketing-popups/hooks/useTimerTrigger'
import { useTimerTrigger, Popout } from 'react-marketing-popups'
import 'react-marketing-popups/Popout/style.css'

export function MyTimerPopout() {
  const [open, setOpen] = useState(false)

  // Fires after 4000ms
  useTimerTrigger({ ms: 4000, onOpenChange: setOpen })

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'MyScrollPopout.tsx',
        code: `import { useState } from 'react'
import { useScrollTrigger, Popout } from 'react-marketing-popups'

export function MyScrollPopout() {
  const [open, setOpen] = useState(false)

  // Fires when the user has scrolled 50% down the page
  useScrollTrigger({ percent: 50, onOpenChange: setOpen })

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="fade" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'MyExitPopout.tsx',
        code: `import { useState } from 'react'
import { useExitTrigger, Popout } from 'react-marketing-popups'

export function MyExitPopout() {
  const [open, setOpen] = useState(false)

  // opts: { topZonePx?, delayMs?, once?, onOpenChange }
  // Fires when the mouse exits through the top of the viewport
  useExitTrigger({ topZonePx: 20, delayMs: 300, once: true, onOpenChange: setOpen })

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="bounce" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'MyInactivityPopout.tsx',
        code: `import { useState } from 'react'
import { useInactivityTrigger, Popout } from 'react-marketing-popups'

export default function MyInactivityPopout() {
  const [open, setOpen] = useState(false)

  // Fires after 5000ms of no mouse or keyboard activity
  useInactivityTrigger({ ms: 5000, onOpenChange: setOpen })

  return (
    <Popout id="promo" open={open} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
      {
        filename: 'MyPersistedPopout.tsx',
        code: `import { useState } from 'react'
// import { useTriggerPersistence } from 'react-marketing-popups/hooks/useTriggerPersistence'
import { useTimerTrigger, useTriggerPersistence, Popout } from 'react-marketing-popups'

export default function MyPersistedPopout() {
  const [open, setOpen] = useState(false)
  const [fired] = useTimerTrigger({ ms: 4000, onOpenChange: setOpen })
  const { hasSeen } = useTriggerPersistence({ id: 'my-persisted-popout', fired, open })

  return (
    <Popout id="my-persisted-popout" open={open && !hasSeen()} onOpenChange={setOpen} animation="zoom" lockScroll>
      <YourContent onClose={() => setOpen(false)} />
    </Popout>
  )
}`,
      },
    ],
  },
]

export default function PopoutPage() {
  const [newsletter, setNewsletter] = useState(false)
  const [sales, setSales] = useState(false)

  return (
    <div>
      <PageHeader
        title="Popout"
        lead="A smooth animated modal that centres on screen. Supports timer, scroll, inactivity, and exit-intent triggers out of the box."
        importName="Popout"
      />

      <PropTable propDefs={popoutProps} />

      <div>
        <h2 className={commonStyles.noBorder}>Demos</h2>
        <DemoSection
          id="newsletter"
          title="Newsletter Subscription"
          description="An email capture modal with botanical imagery, a clean email input, and a strong subscribe CTA. Triggered automatically after 4 seconds."
          onLaunch={() => setNewsletter(true)}
          isOpen={newsletter}
        >
          <Popout
            id="newsletter-popout"
            open={newsletter}
            onOpenChange={setNewsletter}
            animation="zoom"
            lockScroll
          >
            <NewsletterPopout onClose={() => setNewsletter(false)} />
          </Popout>
        </DemoSection>

        <DemoSection
          id="sale"
          title="Flash Sale"
          description="A high-energy sales modal with a pinkish spotted background, giant deep-red sale text, and a bold black CTA. Grabs attention instantly."
          onLaunch={() => setSales(true)}
          isOpen={sales}
        >
          <Popout
            id="sales-popout"
            open={sales}
            onOpenChange={setSales}
            animation="bounce"
            lockScroll
          >
            <SalesPopout onClose={() => setSales(false)} />
          </Popout>
        </DemoSection>
      </div>

      <CodeExamples groups={codeGroups} />
      <PreviousNextGrid pages={prevNextPages} />
    </div>
  )
}
