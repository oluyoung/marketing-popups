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
  { name: 'trigger', type: '"timer" | "scroll" | "exit" | "inactivity"', description: 'Built-in trigger type' },
  { name: 'triggerProps', type: 'object | number', description: 'Options for the trigger — object for timer/exit, number for scroll/inactivity' },
]

const codeGroups = [
  {
    title: 'Core',
    description:
      'Use the SlideIn directly',
    blocks: [
      {
        filename: 'MySlideIn.tsx',
        code: `import { useState } from 'react'
// import { SlideIn } from 'react-marketing-popups/SlideIn';
import { SlideIn } from 'react-marketing-popups'
import 'react-marketing-popups/SlideIn/style.css'

export function MySlideIn({ open, setOpen }) {
  return (
    <SlideIn
      id="my0slideIn"
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
      'Use hooks directly for full control over when and how the panel fires. Each returns [fired, setFired].',
    blocks: [
      {
        filename: 'MyTimerSlideIn.tsx',
        code: `import { useTimerTrigger, SlideIn } from 'react-marketing-popups'
// import { useTimerTrigger } from 'react-marketing-popups/hooks/useTimerTrigger'
// import { useFiredPersistence } from 'react-marketing-popups/hooks/useFiredPersistence'
import 'react-marketing-popups/SlideIn/style.css'

export function MyTimerSlideIn() {
  const [open, setOpen] = useState(true)

  // Fires after 4000ms
  const [fired] = useTimerTrigger(4000)

  return (
    <SlideIn id="offer" open={fired && open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyScrollSlideIn.tsx',
        code: `import { useScrollTrigger, SlideIn } from 'react-marketing-popups'

export default function MyScrollSlideIn() {
  const [open, setOpen] = useState(true)

  // Fires when the user has scrolled 40% down the page
  const [open, setOpen] = useScrollTrigger(40)

  return (
    <SlideIn id="offer" open={fired && open} onOpenChange={setOpen} position="left" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyExitSlideIn.tsx',
        code: `import { useExitTrigger, SlideIn } from 'react-marketing-popups'

export default function MyExitSlideIn() {
  const [open, setOpen] = useState(true)

  // opts: { topZonePx?: number, delayMs?: number, once?: boolean }
  // Fires when the mouse exits through the top of the viewport
  const [open, setOpen] = useExitTrigger({ topZonePx: 20, delayMs: 300, once: true })

  return (
    <SlideIn id="offer" open={fired && open} onOpenChange={setOpen} position="right" animation="fade">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyInactivitySlideIn.tsx',
        code: `import { useInactivityTrigger, SlideIn } from 'react-marketing-popups'

export default function MyInactivitySlideIn() {
  const [open, setOpen] = useState(true)

  // Fires after 5000ms of no mouse or keyboard activity
  const [fired] = useInactivityTrigger(5000)

  return (
    <SlideIn id="offer" open={fired && open} onOpenChange={setOpen} position="right" animation="bounce">
      <YourContent onClose={() => setOpen(false)} />
    </SlideIn>
  )
}`,
      },
      {
        filename: 'MyPersistedSlideIn.tsx',
        code: `// import { useFiredPersistence } from 'react-marketing-popups/hooks/useFiredPersistence'
        import { useTimerTrigger, useFiredPersistence, SlideIn } from 'react-marketing-popups'

export default function MyPersistedSlideIn() {
  const [open, setOpen] = useState(true)
  const [fired] = useTimerTrigger(4000)
  useFiredPersistence({ id: "my-persisted-slideIn", fired, open, onOpenChange: setOpen });

  return (
    <SlideIn id="offer" open={fired && open} onOpenChange={setOpen} position="left" animation="slide">
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
