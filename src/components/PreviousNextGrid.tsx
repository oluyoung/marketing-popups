import { Link } from "react-router";
import styles from "../common.module.scss";

type Page = {
  to: string;
  label: string;
  desc: string;
  isNext: boolean;
}

export const PreviousNextGrid = ({ pages }: { pages: Page[]; }) => {
  return (
    <div className={styles.prevNextGrid}>
      {pages.map((c) => (
        <Link key={c.to} to={c.to} className={styles.nextCard}>
          <span className={styles.nextLabel}>
            {!c.isNext ? '← ' : null}
            {c.label}
            {c.isNext ? ' →' : null}
          </span>
          <span className={styles.nextDesc}>{c.desc}</span>
        </Link>
      ))}
    </div>
  );
};
