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
//   if (!data || data.length === 0) return <div><h3>{title}</h3><p>No data available</p></div>;

//   const keys = Object.keys(data[0]);

//   return (
//     <div className={styles["at-tableContainer"]}>
//       <h3>{title}</h3>
//       <div className={scrollable ? styles["at-scrollableTableWrapper"] : undefined} style={scrollable ? { maxHeight } : {}}>
//         <table className={styles["at-table"]}>
//           <thead>
//             <tr>
//               {keys.map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr key={row.id || row.loadId || JSON.stringify(row)}>
//                 {keys.map((key) => (
//                   <td key={key}>
//                     {key === "company" && (isUser || showCompanyLink) ? (
//                       <Link to={`/UserProfile/${row.userId}`} className={styles["at-link"]}>
//                         {row[key]}
//                       </Link>
//                     ) : Array.isArray(row[key]) ? (
//                       row[key].join(", ")
//                     ) : (
//                       row[key]?.toString()
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default React.memo(Table);

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

//   // Helper to render a value cleanly
//   const renderValue = (val: any) => {
//     if (Array.isArray(val)) return val.join(", ");
//     if (val && typeof val === "object") {
//       // Flatten common fields for nested objects
//       if (val.city && val.state) return `${val.city}, ${val.state}`;
//       if (val.name) return val.name;
//       return JSON.stringify(val);
//     }
//     return val ?? "—";
//   };

//   const renderHeader = () => (
//     <tr>
//       {data[0] && Object.keys(data[0]).map((key) => (
//         <th key={key}>{key}</th>
//       ))}
//     </tr>
//   );

//   const renderRow = (item: any) => (
//     <tr key={item.id || item.loadId || JSON.stringify(item)}>
//       {Object.keys(item).map((key) => (
//         <td key={key}>
//           {key === "company" && (isUser || showCompanyLink) ? (
//             <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//               {item.company}
//             </Link>
//           ) : (
//             renderValue(item[key])
//           )}
//         </td>
//       ))}
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

//   const renderValue = (key: string, val: any) => {
//     if (val === null || val === undefined) return "—";

//     // Custom display for nested objects
//     if (key === "originLocation" || key === "destinationLocation") {
//       return val.city && val.state ? `${val.city}, ${val.state}` : JSON.stringify(val);
//     }

//     if (Array.isArray(val)) return val.join(", ");
//     if (typeof val === "object") return JSON.stringify(val);

//     return val.toString();
//   };

//   const getKeysForHeader = () => {
//     if (!data[0]) return [];
//     if (isUser) return ["id", "description", "company"];
//     // For loads, display common key fields
//     return [
//       "id",
//       "description",
//       "company",
//       "originLocation",
//       "destinationLocation",
//       "equipments",
//       "loadSize",
//       "weight",
//       "rateCheck",
//       "numberOfStops",
//       "teamDriving",
//       "pickupDateTimesUtc",
//       "deliveryDateTimeUtc",
//       "status",
//     ];
//   };

//   const renderHeader = () => (
//     <tr>
//       {getKeysForHeader().map((key) => (
//         <th key={key}>{key}</th>
//       ))}
//     </tr>
//   );

//   const renderRow = (item: any) => (
//     <tr key={item.id || item.loadId || JSON.stringify(item)}>
//       {getKeysForHeader().map((key) => (
//         <td key={key}>
//           {key === "company" && (isUser || showCompanyLink) ? (
//             <Link to={`/UserProfile/${item.userId}`} className={styles["at-link"]}>
//               {item.company}
//             </Link>
//           ) : (
//             renderValue(key, item[key])
//           )}
//         </td>
//       ))}
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
  showCompanyLink?: boolean;
  isUser?: boolean; // ✅ optional now
  scrollable?: boolean;
  maxHeight?: string;
}

const Table: React.FC<TableProps> = ({
  data,
  title,
  showCompanyLink = false,
  isUser = false,
  scrollable = true,
  maxHeight = "300px",
}) => {
  // Dynamically generate table header based on first data item
  const renderHeader = () => {
    if (!data || data.length === 0) return null;
    return (
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    );
  };

  // Render each row dynamically based on object values
  const renderRow = (item: any) => (
    <tr key={item.id || item.loadId || JSON.stringify(item)}>
      {Object.entries(item).map(([key, val], i) => (
        <td key={i}>
          {/* Handle arrays, nulls, and convert values to strings */}
          {Array.isArray(val) ? val.join(", ") : val?.toString() || ""}
        </td>
      ))}
    </tr>
  );

  return (
    <div className={styles["at-tableContainer"]}>
      <h3>{title}</h3>
      {scrollable ? (
        <div className={styles["at-scrollableTableWrapper"]} style={{ maxHeight }}>
          <table className={styles["at-table"]}>
            <thead>{renderHeader()}</thead>
            <tbody>{data.map(renderRow)}</tbody>
          </table>
        </div>
      ) : (
        <table className={styles["at-table"]}>
          <thead>{renderHeader()}</thead>
          <tbody>{data.map(renderRow)}</tbody>
        </table>
      )}
    </div>
  );
};

export default React.memo(Table);
