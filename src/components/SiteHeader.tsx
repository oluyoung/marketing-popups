import { useState } from 'react'
import { NavLink, Link } from 'react-router'
import styles from './SiteHeader.module.scss'
import cn from 'classnames';

const NPM_URL = 'https://www.npmjs.com/package/react-marketing-popups'
const GITHUB_URL = 'https://github.com/react-marketing-popups/react-marketing-popups'

function NpmIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="npm">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456l-.01 10.368H5.13z" />
    </svg>
  )
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const navLinks = [
  { to: '/docs', label: 'Docs', end: true },
  { to: '/docs/popout', label: 'Popout', end: false },
  { to: '/docs/slide-in', label: 'Slide In', end: false },
  { to: '/docs/banner', label: 'Banner', end: false },
  { to: '/docs/hooks/use-timer-trigger', label: 'Hooks', end: false },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={styles.brand}>
          <div className={styles.logo}>P</div>
          <span>React Marketing Popups</span>
        </div>


        <div className={styles.navLinks}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to + label}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className={styles.headerIconLinks}>
          <a href={NPM_URL} target="_blank" rel="noreferrer" className={styles.headerIconLink} aria-label="npm package">
            <NpmIcon />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={styles.headerIconLink} aria-label="GitHub repository">
            <GitHubIcon />
          </a>
        </div>
      </nav>

      <div
        className={cn(styles.drawerOverlay, { [styles.drawerOverlayOpen]: menuOpen })}
        onClick={() => setMenuOpen(false)}
      />
      <div className={cn(styles.drawer, { [styles.drawerOpen]: menuOpen })}>
        <div className={styles.drawerHeader}>
          <Link to="/" className={styles.drawerBrand} onClick={() => setMenuOpen(false)}>
            <div className={styles.logo}>P</div>
            <span className={styles.name}>react-marketing-popups</span>
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className={styles.drawerNav}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to + label}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(styles.drawerLink, { [styles.active]: isActive })
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className={styles.drawerIconLinks}>
          <a href={NPM_URL} target="_blank" rel="noreferrer" className={styles.drawerIconLink} aria-label="npm package" onClick={() => setMenuOpen(false)}>
            <NpmIcon />
            <span>npm</span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={styles.drawerIconLink} aria-label="GitHub repository" onClick={() => setMenuOpen(false)}>
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </>
  )
}
