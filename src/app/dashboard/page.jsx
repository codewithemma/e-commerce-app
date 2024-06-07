import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      <p>hello {data.name}</p>
    </div>
  );
};

export default User;