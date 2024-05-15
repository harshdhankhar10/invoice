import React from 'react';
import SideNavBar from './SideNavBar';
import MainDashboardBar from './MainDashboardBar';

const Dashboard = () => {
  return (
    <div className=" flex h-screen">
      <SideNavBar />
      <MainDashboardBar />
    </div>
  );
}

export default Dashboard;
