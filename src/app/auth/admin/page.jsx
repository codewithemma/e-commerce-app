"use client";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { session } = useSession();

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {session?.user?.name}</p>
    </div>
  );
};

export default AdminPage;
