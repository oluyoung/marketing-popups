import { HashRouter, Routes, Route } from 'react-router'
import DocsLayout from './components/DocsLayout'
import LandingPage from './pages/LandingPage'
import DocsIntro from './pages/DocsIntro'
import PopoutPage from './pages/PopoutPage'
import SlideInPage from './pages/SlideInPage'
import BannerPage from './pages/BannerPage'
import UseTimerTriggerPage from './pages/UseTimerTriggerPage'
import UseScrollTriggerPage from './pages/UseScrollTriggerPage'
import UseExitTriggerPage from './pages/UseExitTriggerPage'
import UseInactivityTriggerPage from './pages/UseInactivityTriggerPage'
import UsePersistencePage from './pages/UsePersistencePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsIntro />} />
          <Route path="popout" element={<PopoutPage />} />
          <Route path="slide-in" element={<SlideInPage />} />
          <Route path="banner" element={<BannerPage />} />
          <Route path="hooks/use-timer-trigger" element={<UseTimerTriggerPage />} />
          <Route path="hooks/use-scroll-trigger" element={<UseScrollTriggerPage />} />
          <Route path="hooks/use-exit-trigger" element={<UseExitTriggerPage />} />
          <Route path="hooks/use-inactivity-trigger" element={<UseInactivityTriggerPage />} />
          <Route path="hooks/use-persistence" element={<UsePersistencePage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
