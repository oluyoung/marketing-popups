import { Link } from 'react-router';
import commonStyles from '../common.module.scss'
import styles from './PageHeader.module.scss'

interface Props {
  title: string
  lead: string
  importName: string
}

export default function PageHeader({ title, lead, importName }: Props) {
  return (
    <div className={styles.header}>
      <div className={commonStyles.breadcrumb}>
        <Link to="/docs">Docs</Link>
        <span className={commonStyles.sep}>/</span>
        <span className={commonStyles.current}>{title}</span>
      </div>
      <h1>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      <div className={styles.importBox}>
        <span className={styles.keyword}>import</span>
        <span>{`{ `}</span>
        <span className={styles.comp}>{importName}</span>
        <span>{` }`}</span>
        <span className={styles.from}>from</span>
        <span className={styles.pkg}>'react-marketing-popups'</span>
      </div>
    </div>
  )
}
