"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import UsersDataChart from "./users-data-chart";
import UsersDataTable from "./users-data-table";

const UsersStat = () => {
  const data = [
    {
      id: 1,
      category: "Mathematics",
      count: "12",
    },
    {
      id: 2,
      category: "Science",
      count: "15",
    },
    {
      id: 3,
      category: "English",
      count: "10",
    },
    {
      id: 4,
      category: "History",
      count: "8",
    },
    {
      id: 5,
      category: "Art",
      count: "5",
    },
    {
      id: 6,
      category: "Mathematics",
      count: "12",
    },
    {
      id: 7,
      category: "Science",
      count: "15",
    },
    {
      id: 8,
      category: "English",
      count: "10",
    },
    {
      id: 9,
      category: "History",
      count: "8",
    },
    {
      id: 10,
      category: "Art",
      count: "5",
    },
    {
      id: 11,
      category: "Art",
      count: "5",
    },
  ];
  
  return (
    <Card>
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900"> Courses </div>
            <span className="text-xs text-default-600">We need to bring learning to people instead of people to learning.</span>
          </div>
          <div className="flex-none flex items-center gap-1">
            <span className="text-4xl font-semibold text-primary">35</span>
            <span className="text-2xl text-success">
              <Icon icon="heroicons:arrow-trending-up-16-solid" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        {/* <p className="text-xs font-medium text-default-800">User Per Minutes</p> */}
        {/* <UsersDataChart /> */}
        <UsersDataTable users={data} />
      </CardContent>
    </Card>
  );
};

export default UsersStat;