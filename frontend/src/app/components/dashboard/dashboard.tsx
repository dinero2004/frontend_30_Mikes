"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Text } from "../ui/text/text";
import { MenuSeperator } from "../menu-separator/menu-separator";

export const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.username) {
    return (
      <>
        <MenuSeperator />
       <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none">
  <button
    type="button"
    onClick={() => router.push("/dashboard")}
    className="block relative z-10 w-full p-6
               bg-gray-900 text-white
               transition-colors duration-200
               hover:bg-gray-800
               text-left"
  >
    <Text variant="body-small" className="text-[#DFAF44]">
      Dashboard
    </Text>

    <Text variant="body-micro" className="text-gray-400">
      Your Posts
    </Text>
  </button>
</DropdownMenuItem>

      </>
    );
  }

  return null;
};