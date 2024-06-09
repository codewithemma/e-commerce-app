"use client";
import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      <p>hello {data?.user?.role}</p>
    </div>
  );
};

export default User;
