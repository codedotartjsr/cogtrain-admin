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
import toast from "react-hot-toast";
import SessionData from './session-data';

const CheckboxWithAction = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [showSessionData, setShowSessionData] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null);

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

  const fetchSessionData = async (userId) => {
    setLoading(true);
    setSelectedUser(userId);

    console.log("userId", userId);
    const token = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(
        // `https://em4wuex6mh.ap-south-1.awsapprunner.com/api/auth/therapist/patient/${userId}/tracking`,
        `${config.API_BASE_URL}/auth/therapist/patient/${userId}/tracking`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // if (!response.ok) throw new Error("Failed to fetch session data");
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 403 && errorData.error === "Patient not assigned to this therapist") {
          toast.error("Patient not assigned to this therapist.");
        } else {
          throw new Error("Failed to fetch session data");
        }
        return;
      }
  
      const data = await response.json();
      setSessionData(data);
      setShowSessionData(true);
      toast.success("Session data loaded successfully!");
    } catch (error) {
      console.error("Error fetching session data:", error);
      toast.error("Error fetching session data");
    } finally {
      setLoading(false);
    }
  };

  if (showSessionData && sessionData) {
    return (
      <SessionData
        data={sessionData}
        onBack={() => setShowSessionData(false)}
      />
    );
  }

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
          <TableHead>patientAlias</TableHead>
          <TableHead>Approved</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
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
              className="hover:bg-muted cursor-pointer"
              data-state={selectedRows.includes(user.id) && "selected"}
              onClick={() => fetchSessionData(user.id)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium text-card-foreground/80">
                <span className="text-sm">{user.name}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.patientAlias}</TableCell>
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
              <TableCell>
                <Button size="icon" variant="outline">
                  <Icon icon="heroicons:eye" className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CheckboxWithAction;
