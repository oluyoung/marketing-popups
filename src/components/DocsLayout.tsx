import { useMemo, useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router'
import cn from 'classnames'
import SiteHeader from './SiteHeader'
import styles from './DocsLayout.module.scss'

const sidebarItems = [
  {
    label: 'Getting Started',
    links: [
      { to: '/docs', label: 'Introduction', end: true },
    ],
  },  
]

const sidebarPopupItems = [
  {
    label: 'Popout',
    links: [
      { to: '/docs/popout#newsletter', label: 'Newsletter Subscription', end: false },
      { to: '/docs/popout#sale', label: 'Flash Sale', end: false },
    ],
  },
  {
    label: 'Slide In',
    links: [
      { to: '/docs/slide-in#discount', label: 'Discount Offer', end: false },
      { to: '/docs/slide-in#gone', label: 'Almost Gone', end: false },
    ],
  },
  {
    label: 'Banner',
    links: [
      { to: '/docs/banner#countdown', label: 'Countdown Timer', end: false },
      { to: '/docs/banner#info', label: 'Info Panel', end: false },
      { to: '/docs/banner#cookie', label: 'Cookie Consent', end: false },
    ],
  },
]

const sidebarHookItems = [
  {
    label: 'Hooks',
    links: [
      { to: '/docs/hooks/use-timer-trigger', label: 'useTimerTrigger', end: false },
      { to: '/docs/hooks/use-scroll-trigger', label: 'useScrollTrigger', end: false },
      { to: '/docs/hooks/use-exit-trigger', label: 'useExitTrigger', end: false },
      { to: '/docs/hooks/use-inactivity-trigger', label: 'useInactivityTrigger', end: false },
      { to: '/docs/hooks/use-persistence', label: 'usePersistence', end: false },
    ],
  },
]

export default function DocsLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = useLocation().pathname;

  const activePath = useMemo(() => {
    if (pathname.includes('/popout')) return 'Popout';
    if (pathname.includes('/banner')) return 'Banner';
    if (pathname.includes('/slide-in')) return 'Slide In';
    return '';
  }, [pathname]);

  return (
    <div className={styles.wrapper}>
      <SiteHeader />

      <div className={styles.body}>
        <aside className={cn(styles.sidebar, { [styles.sidebarCollapsed]: collapsed })}>
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '›' : '‹'}
          </button>

          <div className={styles.sidebarNav}>
            {sidebarItems.map((section) => (
              <div key={section.label} className={styles.sidebarSection}>
                <div className={styles.sidebarLabel}>{section.label}</div>
                {section.links.map(({ to, label, end }) => (
                  <NavLink
                    key={to + label}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(styles.sidebarLink, { [styles.active]: isActive })
                    }
                  >
                    <span className={styles.dot} />
                    {label}
                  </NavLink>
                ))}
              </div>
            ))}
            {sidebarPopupItems.map((section) => (
              <div key={section.label} className={styles.sidebarSection}>
                <div className={cn(styles.sidebarLabel, { [styles.active]: activePath === section.label })}>{section.label}</div>
                {section.links.map(({ to, label, end }) => (
                  <NavLink
                    key={to + label}
                    to={to}
                    end={end}
                    className={styles.sidebarLink}
                  >
                    <span className={styles.dot} />
                    {label}
                  </NavLink>
                ))}
              </div>
            ))}
            {sidebarHookItems.map((section) => (
              <div key={section.label} className={styles.sidebarSection}>
                <div className={styles.sidebarLabel}>{section.label}</div>
                {section.links.map(({ to, label, end }) => (
                  <NavLink
                    key={to + label}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      [styles.sidebarLink, isActive ? styles.active : ''].join(' ')
                    }
                  >
                    <span className={styles.dot} />
                    {label}
                  </NavLink>
                ))}
              </div>
            ))}
            
          </div>
        </aside>

        <main className={cn(styles.main, { [styles.mainCentered]: collapsed })}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
