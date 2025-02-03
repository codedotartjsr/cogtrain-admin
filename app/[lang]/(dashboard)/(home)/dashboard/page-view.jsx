"use client";

import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from './user-list';

const DashboardPageView = () => {
  return (
    <div className=" space-y-6">
      <Card title="List of Patients">
        <CheckboxWithAction />
      </Card>
    </div>
  );
};

export default DashboardPageView;