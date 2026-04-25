import { useState } from 'react'
import { Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'
import PageHeader from './PageHeader'
import DemoSection from '../components/DemoSection'
import CodeExamples from '../components/CodeExamples'
import CountdownBanner from '../popups/CountdownBanner'
import InfoBanner from '../popups/InfoBanner'
import CookiesBanner from '../popups/CookiesBanner'
import PropTable from '../components/PropTable'
import { PreviousNextGrid } from '../components/PreviousNextGrid'

const prevNextPages = [
  // { to: '/docs/popout', label: 'Popout', desc: 'Centered modals with overlay', isNext: false },
  { to: '/docs/slide-in', label: 'Slide In', desc: 'Side panels from left or right', isNext: false },
  { to: '/docs/hooks/use-timer-trigger', label: 'useTimerTrigger', desc: 'Triggers popup after a delay', isNext: true },
]

const bannerProps = [
  { name: 'id', type: 'string', description: 'Unique key for persistence tracking' },
  { name: 'open', type: 'boolean', description: 'Controls visibility', default: 'false' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when open state changes' },
  { name: 'position', type: '"top" | "bottom" | "left" | "right"', description: 'Banner placement', default: '"bottom"' },
  { name: 'animation', type: '"fade" | "slide" | "bounce"', description: 'Animation style', default: '"slide"' },
]

const codeGroups = [
  {
    title: 'Core Banner',
    description:
      'Use Banner directly — manage open state with useState and wire it to onOpenChange.',
    blocks: [
      {
        filename: 'MyBanner.tsx',
        code: `import { useState } from 'react'
// import { Banner } from 'react-marketing-popups/Banner';
import { Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export default function MyBanner() {
  const [open, setOpen] = useState(false)

  return (
    <Banner
      id="my-banner"
      open={open}
      onOpenChange={setOpen}
      position="bottom"
      animation="slide"
    >
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
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
        filename: 'MyTimerBanner.tsx',
        code: `import { useState } from 'react'
// import { Banner } from 'react-marketing-popups/Banner'
// import { useTimerTrigger } from 'react-marketing-popups/hooks/useTimerTrigger'
import { useTimerTrigger, Banner } from 'react-marketing-popups'
import 'react-marketing-popups/Banner/style.css'

export function MyTimerBanner() {
  const [open, setOpen] = useState(false)

  // Fires after 3000ms
  useTimerTrigger({ ms: 3000, onOpenChange: setOpen })

  return (
    <Banner id="promo" open={open} onOpenChange={setOpen} position="bottom" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
      {
        filename: 'MyScrollBanner.tsx',
        code: `import { useState } from 'react'
import { useScrollTrigger, Banner } from 'react-marketing-popups'

export function MyScrollBanner() {
  const [open, setOpen] = useState(false)

  // Fires when the user has scrolled 50% down the page
  useScrollTrigger({ percent: 50, onOpenChange: setOpen })

  return (
    <Banner id="promo" open={open} onOpenChange={setOpen} position="bottom" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
      {
        filename: 'MyExitBanner.tsx',
        code: `import { useState } from 'react'
import { useExitTrigger, Banner } from 'react-marketing-popups'

export function MyExitBanner() {
  const [open, setOpen] = useState(false)

  // opts: { topZonePx?, delayMs?, once?, onOpenChange }
  // Fires when the mouse exits through the top of the viewport
  useExitTrigger({ topZonePx: 20, delayMs: 300, once: true, onOpenChange: setOpen })

  return (
    <Banner id="promo" open={open} onOpenChange={setOpen} position="top" animation="fade">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
      {
        filename: 'MyInactivityBanner.tsx',
        code: `import { useState } from 'react'
import { useInactivityTrigger, Banner } from 'react-marketing-popups'

export function MyInactivityBanner() {
  const [open, setOpen] = useState(false)

  // Fires after 8 000 ms of no mouse or keyboard activity
  useInactivityTrigger({ ms: 8000, onOpenChange: setOpen })

  return (
    <Banner id="promo" open={open} onOpenChange={setOpen} position="bottom" animation="bounce">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
      {
        filename: 'MyPersistedBanner.tsx',
        code: `import { useState } from 'react'
// import { useTriggerPersistence } from 'react-marketing-popups/hooks/useTriggerPersistence'
import { useTimerTrigger, useTriggerPersistence, Banner } from 'react-marketing-popups'

export function MyPersistedBanner() {
  const [open, setOpen] = useState(false)
  const [fired] = useTimerTrigger({ ms: 4000, onOpenChange: setOpen })
  const { hasSeen } = useTriggerPersistence({ id: 'my-persisted-banner', fired, open })

  return (
    <Banner id="my-persisted-banner" open={open && !hasSeen()} onOpenChange={setOpen} position="bottom" animation="slide">
      <YourContent onClose={() => setOpen(false)} />
    </Banner>
  )
}`,
      },
    ],
  },
]

export default function BannerPage() {
  const [countdown, setCountdown] = useState(false)
  const [info, setInfo] = useState(false)
  const [cookies, setCookies] = useState(false)

  return (
    <div>
      <PageHeader
        title="Banner"
        lead="Full-width horizontal banners anchored to the top or bottom of the viewport. Great for time-sensitive alerts, announcements, and consent notices."
        importName="Banner"
      />

      <PropTable propDefs={bannerProps} />

      <DemoSection
        title="Countdown Timer — from Bottom"
        description="A dark navy bottom banner with a live countdown clock, bold sale headline, and a cyan CTA. Creates urgency without interrupting browsing."
        onLaunch={() => setCountdown((v) => !v)}
        isOpen={countdown}
      >
        <Banner
          id="countdown-banner"
          open={countdown}
          onOpenChange={setCountdown}
          position="bottom"
          animation="slide"
        >
          <CountdownBanner onClose={() => setCountdown(false)} />
        </Banner>
      </DemoSection>

      <DemoSection
        title="Info Panel — from Bottom"
        description="A clean white bottom banner with an icon, headline, body copy, and two action buttons. Shown after a timer trigger — ideal for feature announcements."
        onLaunch={() => setInfo((v) => !v)}
        isOpen={info}
      >
        <Banner
          id="info-banner"
          open={info}
          onOpenChange={setInfo}
          position="bottom"
          animation="slide"
        >
          <InfoBanner onClose={() => setInfo(false)} />
        </Banner>
      </DemoSection>

      <DemoSection
        title="Cookie Consent — from Bottom"
        description="A dark consent bar with cookie policy text and two distinct action buttons: Accept All and Use Necessary Only. GDPR-ready pattern."
        onLaunch={() => setCookies((v) => !v)}
        isOpen={cookies}
      >
        <Banner
          id="cookies-banner"
          open={cookies}
          onOpenChange={setCookies}
          position="bottom"
          animation="slide"
        >
          <CookiesBanner onClose={() => setCookies(false)} />
        </Banner>
      </DemoSection>

      <CodeExamples groups={codeGroups} />
      <PreviousNextGrid pages={prevNextPages} />
    </div>
  )
}
