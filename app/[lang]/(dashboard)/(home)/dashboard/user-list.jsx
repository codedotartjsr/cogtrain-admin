"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import config from "@/config/config";

const CheckboxWithAction = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `${config.API_BASE_URL}/auth/users`;
  const TOKEN = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        // Filter users with the role 'patient'
        const filteredUsers = data.filter((user) => user.role.includes("patient"));
        setUsers(filteredUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Approved</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-left text-gray-500 pl-4 pt-4 pb-4">
              No patient found.
            </TableCell>
          </TableRow>
        ) : (
          users.map((user, index) => (
            <TableRow
              key={user.id}
              className="hover:bg-muted"
              data-state={selectedRows.includes(user.id) && "selected"}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium text-card-foreground/80">
                <span className="text-sm">{user.name}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
              <Badge
                    variant="soft"
                    color={user.approved ? "success" : "warning"}
                    className="capitalize"
                >
                    {user.approved.toString()}
                </Badge>
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CheckboxWithAction;
