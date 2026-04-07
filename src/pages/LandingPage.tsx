import { useState } from 'react'
import { Link } from 'react-router'
import SiteHeader from '../components/SiteHeader'
import styles from './LandingPage.module.scss'

const componentDescriptions: Record<string, string> = {
  popout: 'Centered modal with overlay, smooth animations, and scroll lock.',
  slide_in: 'Fixed panels that slide from the left or right viewport edge.',
  banner: 'Full-width banners anchored to the top or bottom of the screen.',
};

const triggers = [
  { label: 'Timer', desc: 'Show after a configurable delay' },
  { label: 'Scroll %', desc: 'Trigger at a page scroll depth' },
  { label: 'Inactivity', desc: 'Fire after user stops interacting' },
  { label: 'Exit Intent', desc: 'Detect mouse leaving viewport' },
]

const highlights = [
  { title: 'Lightweight', desc: 'Zero heavy dependencies. Ships tiny.' },
  { title: 'Smart Triggers', desc: '4 built-in behaviours with persistence tracking.' },
  { title: 'Animated', desc: 'Fade, zoom, slide, and bounce transitions.' },
  { title: 'Persistent', desc: "Remembers what the user has seen via localStorage." },
  { title: 'Responsive', desc: 'Works beautifully on any screen size.' },
  { title: 'Composable', desc: 'Bring your own content — full design freedom.' },
]

type PreviewTab = 'popout' | 'slide_in' | 'banner'

export default function LandingPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<PreviewTab>('popout')

  function copyInstall() {
    navigator.clipboard.writeText('npm install react-marketing-popups')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.page}>
      <SiteHeader />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroText}>Marketing popups<br />for React</h1>

          <p className={styles.heroLead}>
            Popouts, banners, and slide-ins with built-in smart triggers,
            smooth animations, and persistent behaviour tracking.
            Easy drop-in components, complete design freedom, and zero heavy dependencies.
          </p>

          <div className={styles.heroActions}>
            <Link to="/docs" className={styles.btnPrimary}>
              Get Started →
            </Link>
            <Link to="/docs/popout" className={styles.btnSecondary}>
              View Demos
            </Link>
          </div>

          <button className={styles.installBox} onClick={copyInstall}>
            <span className={styles.prompt}>$</span>
            <span className={styles.cmd}>npm install react-marketing-popups</span>
            <span className={[styles.copyBtn, copied ? styles.copied : ''].join(' ')}>
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>
      </section>

      {/* ── Preview ── */}
      <section className={[styles.section, styles.previewSection].join(' ')}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>PREVIEW</div>
            <h2>See it in action</h2>
            <p className={styles.sectionDesc}>
              Select a popup component type to preview how it looks in context.
            </p>
          </div>

          <div className={styles.previewTabs}>
            {(['popout', 'slide_in', 'banner'] as const).map((tab) => (
              <button
                key={tab}
                className={[styles.previewTab, activeTab === tab ? styles.previewTabActive : ''].join(' ')}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'popout' ? 'Popout' : tab === 'slide_in' ? 'Slide In' : 'Banner'}
              </button>
            ))}
          </div>

          <div className={styles.componentDescription}>
            <h4>{activeTab.replace('_', ' ')}</h4>
            <p>{componentDescriptions[activeTab]}</p>
          </div>

          <div className={styles.browser}>
            <div className={styles.browserChrome}>
              <div className={styles.chromeDots}>
                <span /><span /><span />
              </div>
              <div className={styles.chromeAddress}>mystore.com</div>
            </div>

            <div className={styles.browserContent}>
              {/* Mock background page */}
              <div className={styles.mockPage}>
                <div className={styles.mockPageNav}>
                  <div className={styles.mockPageNavBar} />
                  <div className={styles.mockPageNavLinks}>
                    <div className={styles.mockPageNavLink} />
                    <div className={styles.mockPageNavLink} />
                    <div className={styles.mockPageNavLink} />
                  </div>
                </div>
                <div className={styles.mockPageBody}>
                  <div className={[styles.mockLine, styles.mockLineWide].join(' ')} />
                  <div className={[styles.mockLine, styles.mockLineMid].join(' ')} />
                  <div className={[styles.mockLine, styles.mockLineWide].join(' ')} />
                  <div className={[styles.mockLine, styles.mockLineNarrow].join(' ')} />
                  <div className={[styles.mockLine, styles.mockLineMid].join(' ')} />
                </div>
              </div>

              {/* Popout */}
              {activeTab === 'popout' && (
                <>
                <div className={styles.mockOverlay}>
                  <div className={styles.mockPopout}>
                    <div className={styles.mockPopoutBand}>
                      <span className={styles.mockClose}>×</span>
                    </div>
                    <div className={styles.mockPopoutBody}>
                      <div className={[styles.mBar, styles.mTitle].join(' ')} />
                      <div className={[styles.mBar, styles.mSub].join(' ')} />
                      <div className={[styles.mBar, styles.mSub, styles.mSubShort].join(' ')} />
                      <div className={styles.mockInputBar} />
                      <div className={styles.mockCta} />
                    </div>
                  </div>
                </div>
                </>
              )}

              {/* Slide In */}
              {activeTab === 'slide_in' && (
                <div className={styles.mockSlideIn}>
                  <span className={styles.mockClose}>×</span>
                  <div className={styles.mockSlideInIcon}>🏷️</div>
                  <div className={[styles.mBar, styles.mTitle].join(' ')} />
                  <div className={[styles.mBar, styles.mSub].join(' ')} />
                  <div className={styles.mockCouponBox}>SAVE20</div>
                  <div className={styles.mockCta} />
                </div>
              )}

              {/* Banner */}
              {activeTab === 'banner' && (
                <div className={styles.mockBanner}>
                  <span className={styles.mockBannerEmoji}>⏱</span>
                  <div className={styles.mockBannerTextGroup}>
                    <div className={[styles.mBar, styles.mBannerTitle].join(' ')} />
                    <div className={[styles.mBar, styles.mBannerSub].join(' ')} />
                  </div>
                  <div className={styles.mockBannerCta} />
                  <span className={styles.mockBannerClose}>×</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Triggers ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>Triggers</div>
            <h2>Built-in triggers</h2>
            <p className={styles.sectionDesc}>
              Show the right popup when you need it — no custom logic required.
            </p>
          </div>
          <dl className={styles.triggersList}>
            {triggers.map((t) => (
              <div key={t.label} className={styles.triggersItem}>
                <dt>{t.label}</dt>
                <dd>{t.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      
      {/* ── Highlights ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2>Why it works?</h2>
          </div>
          <ul className={styles.highlightList}>
            {highlights.map((h) => (
              <li key={h.title} className={styles.highlightItem}>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2>Ready to start converting?</h2>
            <p className={styles.sectionDesc}>Add your first popup in under 5 minutes.</p>
          </div>
          <div className={styles.heroActions}>
            <Link to="/docs" className={styles.btnPrimary}>Read the Docs →</Link>
            <Link to="/docs/popout" className={styles.btnSecondary}>Browse Demos</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
