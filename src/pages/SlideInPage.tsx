import { useState } from 'react'
import { SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'
import PageHeader from './PageHeader'
import DemoSection from '../components/DemoSection'
import CodeExamples from '../components/CodeExamples'
import DiscountSlideIn from '../popups/DiscountSlideIn'
import BottlesSlideIn from '../popups/BottlesSlideIn'
import PropTable from '../components/PropTable'
import commonStyles from '../common.module.scss'
import { PreviousNextGrid } from '../components/PreviousNextGrid'

const prevNextPages = [
  { to: '/docs/popout', label: 'Popout', desc: 'Centered modals with overlay', isNext: false },
  // { to: '/docs/slide-in', label: 'Slide In', desc: 'Side panels from left or right', isNext: true },
  { to: '/docs/banner', label: 'Banner', desc: 'Full-width top or bottom bars', isNext: true },
]

const slideInProps = [
  { name: 'id', type: 'string', description: 'Unique key for persistence tracking' },
  { name: 'open', type: 'boolean', description: 'Controls visibility', default: 'false' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when open state changes' },
  { name: 'position', type: '"left" | "right"', description: 'Which edge to slide in from', default: '"left"' },
  { name: 'animation', type: '"fade" | "slide" | "bounce"', description: 'Animation style', default: '"slide"' },
]

const codeGroups = [
  {
    title: 'Core',
    description:
      'Use the SlideIn directly — manage open state with useState and wire it to onOpenChange.',
    blocks: [
      {
        filename: 'MySlideIn.tsx',
        code: `import { useState } from 'react'
// import { SlideIn } from 'react-marketing-popups/SlideIn';
import { SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export function MySlideIn() {
  const [open, setOpen] = useState(false)

  return (
    <SlideIn
      id="my-slideIn"
      open={open}
      onOpenChange={setOpen}
      position="left"
      animation="slide"
    >
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
    ],
  },
  {
    title: 'Trigger hooks',
    description:
      'Use hooks for automatic triggering. Pass onOpenChange to wire the hook to your open state. Each hook also returns [fired, setFired] if you need to track whether it has fired.',
    blocks: [
      {
        filename: 'MyTimerSlideIn.tsx',
        code: `import { useState } from 'react'
import { useTimerTrigger, SlideIn } from 'react-marketing-popups'
// import { useTimerTrigger } from 'react-marketing-popups/hooks/useTimerTrigger'
import 'react-marketing-popups/SlideIn/style.css'

export function MyTimerSlideIn() {
  const [open, setOpen] = useState(false)

  // Fires after 4000ms
  useTimerTrigger({ ms: 4000, onOpenChange: setOpen })

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyScrollSlideIn.tsx',
        code: `import { useState } from 'react'
import { useScrollTrigger, SlideIn } from 'react-marketing-popups'

export default function MyScrollSlideIn() {
  const [open, setOpen] = useState(false)

  // Fires when the user has scrolled 40% down the page
  useScrollTrigger({ percent: 40, onOpenChange: setOpen })

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyExitSlideIn.tsx',
        code: `import { useState } from 'react'
import { useExitTrigger, SlideIn } from 'react-marketing-popups'

export default function MyExitSlideIn() {
  const [open, setOpen] = useState(false)

  // opts: { topZonePx?, delayMs?, once?, onOpenChange }
  // Fires when the mouse exits through the top of the viewport
  useExitTrigger({ topZonePx: 20, delayMs: 300, once: true, onOpenChange: setOpen })

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="right" animation="fade">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyInactivitySlideIn.tsx',
        code: `import { useState } from 'react'
import { useInactivityTrigger, SlideIn } from 'react-marketing-popups'

export default function MyInactivitySlideIn() {
  const [open, setOpen] = useState(false)

  // Fires after 5000ms of no mouse or keyboard activity
  useInactivityTrigger({ ms: 5000, onOpenChange: setOpen })

  return (
    <SlideIn id="offer" open={open} onOpenChange={setOpen} position="right" animation="bounce">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyPersistedSlideIn.tsx',
        code: `import { useState } from 'react'
// import { useTriggerPersistence } from 'react-marketing-popups/hooks/useTriggerPersistence'
import { useTimerTrigger, useTriggerPersistence, SlideIn } from 'react-marketing-popups'

export default function MyPersistedSlideIn() {
  const [open, setOpen] = useState(false)
  const [fired] = useTimerTrigger({ ms: 4000, onOpenChange: setOpen })
  const { hasSeen } = useTriggerPersistence({ id: 'my-persisted-slideIn', fired, open })

  return (
    <SlideIn id="my-persisted-slideIn" open={open && !hasSeen()} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
    ],
  },
]

export default function SlideInPage() {
  const [discount, setDiscount] = useState(false)
  const [bottles, setBottles] = useState(false)

  return (
    <div>
      <PageHeader
        title="Slide In"
        lead="A fixed panel that slides in from the left or right edge. Perfect for discount codes, urgency offers, and contextual nudges."
        importName="SlideIn"
      />

      <PropTable propDefs={slideInProps} />

      <DemoSection
        title="Discount Offer — from Left"
        description="A clean white panel sliding in from the left with a prominent coupon code, feature perks, and an amber gradient CTA button."
        onLaunch={() => setDiscount(true)}
        isOpen={discount}
      >
        <SlideIn
          id="discount-slidein"
          open={discount}
          onOpenChange={setDiscount}
          position="left"
          animation="slide"
        >
          <DiscountSlideIn onClose={() => setDiscount(false)} />
        </SlideIn>
      </DemoSection>

      <DemoSection
        title="Almost Gone Offer — from Right"
        description="An urgency panel sliding from the right with a navy header, gold luxury product showcase with two premium bottles, and a bold CTA."
        onLaunch={() => setBottles(true)}
        isOpen={bottles}
      >
        <SlideIn
          id="bottles-slidein"
          open={bottles}
          onOpenChange={setBottles}
          position="right"
          animation="slide"
          closeBtnClassname={commonStyles.textGreen}
        >
          <BottlesSlideIn onClose={() => setBottles(false)} />
        </SlideIn>
      </DemoSection>

      <CodeExamples groups={codeGroups} />
      <PreviousNextGrid pages={prevNextPages} />
    </div>
  )
}
