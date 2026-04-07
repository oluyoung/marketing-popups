import { Outlet, NavLink } from 'react-router'
import styles from './Layout.module.scss'
import SiteHeader from './SiteHeader'

const sidebarItems = [
  {
    label: 'Getting Started',
    links: [
      { to: '/', label: 'Introduction' },
      { to: '/', label: 'Installation' },
    ],
  },
  {
    label: 'Popout',
    links: [
      { to: '/popout', label: 'Newsletter Subscription' },
      { to: '/popout', label: 'Flash Sale' },
    ],
  },
  {
    label: 'Slide In',
    links: [
      { to: '/slide-in', label: 'Discount Offer (Left)' },
      { to: '/slide-in', label: 'Almost Gone (Right)' },
    ],
  },
  {
    label: 'Banner',
    links: [
      { to: '/banner', label: 'Countdown Timer' },
      { to: '/banner', label: 'Info Panel' },
      { to: '/banner', label: 'Cookie Consent' },
    ],
  },
]

export default function Layout() {

  return (
    <div className={styles.wrapper}>
      <SiteHeader />

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {sidebarItems.map((section) => (
            <div key={section.label} className={styles.sidebarSection}>
              <div className={styles.sidebarLabel}>{section.label}</div>
              {section.links.map(({ to, label }) => (
                <NavLink
                  key={to + label}
                  to={to}
                  end={to === '/'}
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
        </aside>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
