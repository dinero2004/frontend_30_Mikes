"use client";

import { signOut, useSession } from "next-auth/react";
import { Text } from "../ui/text/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MenuItem } from "../menu-item/menu-item";

export const Logout = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return session?.username ? (
    <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none">
      <button
        type="button"
        onClick={() => {
          signOut({ redirect: false }).then(() => {
            toast.success("Logout successful");
            router.push("/");
          });
        }}
        className="block relative z-10 w-full p-6
               bg-gray-900 text-white
               transition-colors duration-200
               hover:bg-gray-800
               text-left"
      >
        <Text variant="body-small" className="text-[#DFAF44]">
          Logout
        </Text>

        <Text variant="body-micro" className="text-gray-400">
          See you soon!
        </Text>
      </button>
    </DropdownMenuItem>
  ) : (
    // needs to be here, because the client component is rerendering when something inside changes. This can't be in the server component, because server components are rendered on build time and not on runtime
    <MenuItem
      href="/signup-login"
      title="Login or sign up"
      description="Let us know your wandrstay"
    />
  );
};
