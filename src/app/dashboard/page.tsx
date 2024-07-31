"use client";

import ProfileSection from "@/Components/ProfileSection";
import TaskSection from "@/Components/TaskSection";


export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/5  p-4">
        <ProfileSection />
      </div>
      <div className="w-4/5 bg-gray-100 p-4">
        <TaskSection />
      </div>
    </div>
  )
}
