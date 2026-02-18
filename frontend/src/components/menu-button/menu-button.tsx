import { Menu } from "lucide-react";

export const MenuButton = () => {
  return (
    <button
      className="flex items-center justify-center p-2 bg-transparent border-none hover:opacity-80 transition-opacity cursor-pointer"
    >
      <Menu className="h-5 w-5 text-[#DFAF44]" />
    </button>
  );
};
