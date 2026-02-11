import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Text } from "../ui/text/text";

interface MenuItemProps {
  href: string;
  title: string;
  description: string;
}

export const MenuItem = ({ href, title, description }: MenuItemProps) => {
  return (
    <DropdownMenuItem className="group relative p-0 overflow-hidden hover:outline-none">
  <Link
    href={href}
    className="block relative z-10 w-full p-6
               bg-gray-900 text-white
               transition-colors duration-200
               hover:bg-gray-800"
  >
    <Text variant="body-small" className="text-[#DFAF44]">
      {title}
    </Text>

    <Text variant="body-micro" className="text-gray-400">
      {description}
    </Text>
  </Link>
</DropdownMenuItem>

  );
};