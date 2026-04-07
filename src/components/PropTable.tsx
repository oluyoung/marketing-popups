import commonStyles from "../common.module.scss";

interface Prop {
  name: string
  type: string
  description: string
  default?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PropTable = ({ propDefs }: { propDefs: Prop[] }) => {
  return (
    <div className={commonStyles.section}>
      <h2>Props</h2>
      <div className={commonStyles.tableWrap}>
        {propDefs &&
        propDefs.length > 0 && (
          <table className={commonStyles.paramTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {propDefs.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>
                    <code>{p.type}</code>
                  </td>
                  <td>{p.description}</td>
                  <td>{p.default ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PropTable;
