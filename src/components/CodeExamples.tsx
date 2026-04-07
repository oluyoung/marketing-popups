import styles from './CodeExamples.module.scss'
import commonStyles from '../common.module.scss'

interface Block {
  filename: string
  code: string
}

interface Group {
  title: string
  description?: string
  blocks: Block[]
}

interface Props {
  groups: Group[]
}

export default function CodeExamples({ groups }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.mainHeading}>Code Examples</h2>
        <p className={styles.intro}>By design the open state is handled outside of the component</p>
      </div>
      {groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          {group.description && (
            <p className={styles.groupDesc}>{group.description}</p>
          )}
          {group.blocks.map((block) => (
            <div key={block.filename} className={commonStyles.codeFile}>
              <div className={commonStyles.codeFilename}>{block.filename}</div>
              <pre className={commonStyles.pre}>{block.code}</pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
