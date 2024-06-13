import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const UserProfile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>hello {session?.user?.email}</p>
      {session?.user?.image && (
        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width={100}
          height={100}
          priority
        />
      )}
    </div>
  );
};

export default UserProfile;
