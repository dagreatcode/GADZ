import React from 'react';
import { Link } from "react-router-dom";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Data {
  name: string;
  age: number;
  city: string;
}

const PrintOut: React.FC = () => {
  // Sample data to be exported to CSV
  const data: Data[] = [
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Smith', age: 34, city: 'Chicago' },
    { name: 'Sam Green', age: 45, city: 'Los Angeles' },
  ];

  // Function to convert data to CSV format
  const convertToCSV = (data: Data[]): string => {
    const headers = Object.keys(data[0]).join(','); // Get the headers (keys)
    const rows = data.map(row => Object.values(row).join(',')); // Map each object to a CSV row
    return [headers, ...rows].join('\n'); // Combine headers and rows
  };

  // Function to trigger the CSV download
  const downloadCSV = (): void => {
    const csv = convertToCSV(data); // Convert the data to CSV format
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob); // Create a link to the file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv'); // Set the file name
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

    // Function to convert data to Excel format and trigger download
    const downloadExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'data.xlsx');
    };

  return (
    <>
      <div>
        <button onClick={downloadCSV}>Download CSV</button>
        <button onClick={downloadExcel}>Download Excel</button>
      </div>
      <Link to="/Admin">Home</Link>
    </>
  );
};

export default PrintOut;