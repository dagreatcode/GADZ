// Table.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./AvailableTable.module.css"; // Use same CSS for consistent style

interface TableProps {
  data: any[];
  title: string;
  isUser: boolean;
  showCompanyLink?: boolean;
}

const Table: React.FC<TableProps> = ({
  data,
  title,
  isUser,
  showCompanyLink = false,
}) => {
  return (
    <div className={styles["at-tableContainer"]}>
      <h3>{title}</h3>
      <table className={styles["at-table"]}>
        <thead>
          <tr>
            {isUser ? (
              <>
                <th>Driver ID</th>
                <th>Description</th>
                <th>Company</th>
              </>
            ) : (
              <>
                <th>Load ID</th>
                <th>Description</th>
                <th>Company</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {isUser ? (
                <>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link
                      to={`/UserProfile/${item.userId}`}
                      className={styles["at-link"]}
                    >
                      {item.company}
                    </Link>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>
                    {showCompanyLink ? (
                      <Link
                        to={`/UserProfile/${item.userId}`}
                        className={styles["at-link"]}
                      >
                        {item.company}
                      </Link>
                    ) : (
                      item.company
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
