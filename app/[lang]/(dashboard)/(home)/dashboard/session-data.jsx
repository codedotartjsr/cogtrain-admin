"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";

const downloadCSV = (data) => {
  if (!data || !data.length) return;

  const csvRows = [];
  const headers = [
    "userId",
    "sessionId",
    ...Object.keys(data[0].logData),
    "created_at",
    "updated_at",
  ];
  csvRows.push(headers.join(","));

  // Map data rows to CSV format
  data.forEach((row) => {
    const logDataValues = Object.values(row.logData); // Extract dynamic logData values
    const values = [
      row.userId,
      row.sessionId,
      ...logDataValues,
      row.created_at,
      row.updated_at,
    ];
    csvRows.push(values.map((value) => JSON.stringify(value, null, 2)).join(",")); // Serialize each value to CSV-safe format
  });

  // Create a Blob and trigger download
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "session_data.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const SessionData = ({ data, onBack }) => {
  const tableHeaders = [
    // "Session ID",
    // "User ID",
    "Created At",
    // "Updated At",
    ...(data && data.length > 0 ? Object.keys(data[0].logData) : []),
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Back to Users */}
        <button
          onClick={onBack}
          className="flex items-center text-primary-500"
        >
          <Icon icon="heroicons:arrow-left" className="mr-2 h-5 w-5" />
          Back to Users
        </button>

        {/* Conditionally render Download CSV */}
        {data && data.length > 0 && (
          <button
            onClick={() => downloadCSV(data)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 text-primary-foreground"
          >
            Download CSV
          </button>
        )}
      </div>

      <h2 className="text-lg font-medium mb-4">Sessions Data</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {data && data.length > 0 && tableHeaders.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((session) => (
              <TableRow key={session.id}>
                {/* <TableCell>{session.sessionId}</TableCell>
                <TableCell>{session.userId}</TableCell> */}
                <TableCell>
                  {new Date(session.created_at).toLocaleString()}
                </TableCell>
                {/* <TableCell>
                  {new Date(session.updated_at).toLocaleString()}
                </TableCell> */}
                {Object.values(session.logData).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan={tableHeaders.length} className="text-left pl-4 pt-4">
                No session data available.
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionData;
