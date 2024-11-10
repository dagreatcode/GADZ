import React from "react";
import { Link } from "react-router-dom";
import styles from "./Table.module.css"; // Assuming you have the CSS module for styling

interface TableProps {
  data: any[]; // Data can be either loads or drivers
  title: string;
  isUser: boolean; // Flag to indicate whether we're displaying user-related data (drivers)
  showCompanyLink?: boolean; // Flag to optionally show the company link
}

const Table: React.FC<TableProps> = ({
  data,
  title,
  isUser,
  showCompanyLink = false,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            {isUser ? (
              // Display driver-related headers
              <>
                <th className={styles.tableHeader}>Driver ID</th>
                <th className={styles.tableHeader}>Description</th>
                <th className={styles.tableHeader}>Company</th>
              </>
            ) : (
              // Display load-related headers
              <>
                <th className={styles.tableHeader}>Load ID</th>
                <th className={styles.tableHeader}>Description</th>
                <th className={styles.tableHeader}>Company</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className={styles.tableRow}>
              {isUser ? (
                // Render driver data with ID, description, and company
                <>
                  <td className={styles.tableCell}>{item.id}</td>
                  <td className={styles.tableCell}>{item.description}</td>
                  <td className={styles.tableCell}>
                    <Link
                      to={`/UserProfile/${item.userId}`} // Link to user profile page using the driver's userId
                      className={styles.loadLink}
                    >
                      {item.company}
                    </Link>
                  </td>
                </>
              ) : (
                // Render load data with ID, description, and company
                <>
                  <td className={styles.tableCell}>{item.id}</td>
                  <td className={styles.tableCell}>{item.description}</td>
                  <td className={styles.tableCell}>
                    {showCompanyLink ? (
                      <Link
                        to={`/UserProfile/${item.userId}`} // Link to driver profile using the load's userId
                        className={styles.loadLink}
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
