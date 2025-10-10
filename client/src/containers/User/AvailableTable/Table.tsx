// // Table.tsx
// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./AvailableTable.module.css"; // Use same CSS for consistent style

// interface TableProps {
//   data: any[];
//   title: string;
//   isUser: boolean;
//   showCompanyLink?: boolean;
// }

// const Table: React.FC<TableProps> = ({
//   data,
//   title,
//   isUser,
//   showCompanyLink = false,
// }) => {
//   return (
//     <div className={styles["at-tableContainer"]}>
//       <h3>{title}</h3>
//       <table className={styles["at-table"]}>
//         <thead>
//           <tr>
//             {isUser ? (
//               <>
//                 <th>Driver ID</th>
//                 <th>Description</th>
//                 <th>Company</th>
//               </>
//             ) : (
//               <>
//                 <th>Load ID</th>
//                 <th>Description</th>
//                 <th>Company</th>
//               </>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               {isUser ? (
//                 <>
//                   <td>{item.id}</td>
//                   <td>{item.description}</td>
//                   <td>
//                     <Link
//                       to={`/UserProfile/${item.userId}`}
//                       className={styles["at-link"]}
//                     >
//                       {item.company}
//                     </Link>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{item.id}</td>
//                   <td>{item.description}</td>
//                   <td>
//                     {showCompanyLink ? (
//                       <Link
//                         to={`/UserProfile/${item.userId}`}
//                         className={styles["at-link"]}
//                       >
//                         {item.company}
//                       </Link>
//                     ) : (
//                       item.company
//                     )}
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./AvailableTable.module.css";

// interface TableProps {
//   data: any[];
//   title: string;
//   isUser: boolean;
//   showCompanyLink?: boolean;
//   // optional: scrollable wrapper defaults to true
//   scrollable?: boolean;
//   maxHeight?: string;
// }

// const Table: React.FC<TableProps> = ({
//   data,
//   title,
//   isUser,
//   showCompanyLink = false,
//   scrollable = true,
//   maxHeight = "300px",
// }) => {
//   return (
//     <div className={styles["at-tableContainer"]}>
//       <h3>{title}</h3>
//       {scrollable ? (
//         <div className={styles["at-scrollableTableWrapper"]} style={{ maxHeight }}>
//           <table className={styles["at-table"]}>
//             <thead>
//               <tr>
//                 {isUser ? (
//                   <>
//                     <th>Driver ID</th>
//                     <th>Description</th>
//                     <th>Company</th>
//                   </>
//                 ) : (
//                   <>
//                     <th>Load ID</th>
//                     <th>Description</th>
//                     <th>Company</th>
//                   </>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item: any) => (
//                 <tr key={item.id || item.loadId || JSON.stringify(item)}>
//                   {isUser ? (
//                     <>
//                       <td>{item.id}</td>
//                       <td>{item.description}</td>
//                       <td>
//                         <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//                           {item.company}
//                         </Link>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{item.id}</td>
//                       <td>{item.description}</td>
//                       <td>
//                         {showCompanyLink ? (
//                           <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//                             {item.company}
//                           </Link>
//                         ) : (
//                           item.company
//                         )}
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <table className={styles["at-table"]}>
//           <thead>
//             <tr>
//               {isUser ? (
//                 <>
//                   <th>Driver ID</th>
//                   <th>Description</th>
//                   <th>Company</th>
//                 </>
//               ) : (
//                 <>
//                   <th>Load ID</th>
//                   <th>Description</th>
//                   <th>Company</th>
//                 </>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item: any) => (
//               <tr key={item.id || item.loadId || JSON.stringify(item)}>
//                 {isUser ? (
//                   <>
//                     <td>{item.id}</td>
//                     <td>{item.description}</td>
//                     <td>
//                       <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//                         {item.company}
//                       </Link>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{item.id}</td>
//                     <td>{item.description}</td>
//                     <td>
//                       {showCompanyLink ? (
//                         <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//                           {item.company}
//                         </Link>
//                       ) : (
//                         item.company
//                       )}
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Table;

// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./AvailableTable.module.css";

// interface TableProps {
//   data: any[];
//   title: string;
//   isUser: boolean;
//   showCompanyLink?: boolean;
//   scrollable?: boolean;
//   maxHeight?: string;
// }

// const Table: React.FC<TableProps> = ({
//   data,
//   title,
//   isUser,
//   showCompanyLink = false,
//   scrollable = true,
//   maxHeight = "300px",
// }) => {
//   const renderHeader = () => (
//     <tr>
//       {isUser ? (
//         <>
//           <th>Driver ID</th>
//           <th>Description</th>
//           <th>Company</th>
//         </>
//       ) : (
//         <>
//           <th>Load ID</th>
//           <th>Description</th>
//           <th>Company</th>
//         </>
//       )}
//     </tr>
//   );

//   const renderRow = (item: any) => (
//     <tr key={item.id || item.loadId || JSON.stringify(item)}>
//       <td>{item.id}</td>
//       <td>{item.description}</td>
//       <td>
//         {isUser || showCompanyLink ? (
//           <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//             {item.company}
//           </Link>
//         ) : (
//           item.company
//         )}
//       </td>
//     </tr>
//   );

//   return (
//     <div className={styles["at-tableContainer"]}>
//       <h3>{title}</h3>
//       {scrollable ? (
//         <div className={styles["at-scrollableTableWrapper"]} style={{ maxHeight }}>
//           <table className={styles["at-table"]}>
//             <thead>{renderHeader()}</thead>
//             <tbody>{data.map(renderRow)}</tbody>
//           </table>
//         </div>
//       ) : (
//         <table className={styles["at-table"]}>
//           <thead>{renderHeader()}</thead>
//           <tbody>{data.map(renderRow)}</tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default React.memo(Table);

import React from "react";
import { Link } from "react-router-dom";
import styles from "./AvailableTable.module.css";

interface TableProps {
  data: any[];
  title: string;
  isUser: boolean;
  showCompanyLink?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
}

const Table: React.FC<TableProps> = ({
  data,
  title,
  isUser,
  showCompanyLink = false,
  scrollable = true,
  maxHeight = "300px",
}) => {
  if (!data || data.length === 0) return <div><h3>{title}</h3><p>No data available</p></div>;

  const keys = Object.keys(data[0]);

  return (
    <div className={styles["at-tableContainer"]}>
      <h3>{title}</h3>
      <div className={scrollable ? styles["at-scrollableTableWrapper"] : undefined} style={scrollable ? { maxHeight } : {}}>
        <table className={styles["at-table"]}>
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id || row.loadId || JSON.stringify(row)}>
                {keys.map((key) => (
                  <td key={key}>
                    {key === "company" && (isUser || showCompanyLink) ? (
                      <Link to={`/UserProfile/${row.userId}`} className={styles["at-link"]}>
                        {row[key]}
                      </Link>
                    ) : Array.isArray(row[key]) ? (
                      row[key].join(", ")
                    ) : (
                      row[key]?.toString()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Table);
