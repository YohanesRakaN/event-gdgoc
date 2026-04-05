"use client";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { HouseIcon } from "lucide-react";
import { UserIcon } from "lucide-react";

export default function HomePage() {
  const { logout } = useAuth();
  return (
    <div className="relative bg-amber-100">
      <div>Header</div>
      <div>
        content
        <Button variant="destructive" onClick={logout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
