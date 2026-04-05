"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGetProfileById } from "./hooks/useProfile";
import { UserIcon } from "lucide-react";

export default function ProfilePage() {
  // call data from auth table
  const { logout, user } = useAuth();

  //   filter data based on id from user data
  const { data, error, isLoading } = useGetProfileById(user?.id);
  if (isLoading) {
    return <div>Loading. . .</div>;
  }

  console.log(data);
  return (
    <div>
      <div className="flex flex-col items-center pt-5 gap-2">
        <div>
          <UserIcon />
        </div>
        <div>{data.full_name}</div>
        <div>{user.email}</div>
        <div>Edit Button</div>
        <Button variant="destructive" onClick={logout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
