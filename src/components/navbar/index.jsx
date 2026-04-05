"use client";
import { HouseIcon } from "lucide-react";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { MENU_DATA } from "./constans";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavBar() {
  const pathName = usePathname();

  console.log(pathName);
  return (
    <div className="fixed bottom-0 border p-7 shadow-xl w-full flex justify-around rounded-t-xl items-center">
      {MENU_DATA.map((data) => (
        <Link
          key={data.key}
          href={data.key}
          className={clsx(
            "p-1.5",
            pathName == data.key && "bg-amber-200 rounded-xl",
          )}
        >
          {data.icon}
        </Link>
      ))}
    </div>
  );
}
