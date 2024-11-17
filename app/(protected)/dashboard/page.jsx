"use client";
import withAuth from "@/components/hoc/withAuth";
import useAuthStore from "@/store/authStore";

function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="mt-5 flex flex-col">
      <h3>Dashboard</h3>
      <p className="text-2xl">Welcome {user.email}</p>
    </div>
  );
}

export default withAuth(Dashboard);
