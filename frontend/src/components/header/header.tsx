import { DropdownNav } from "../dropdown-nav/dropdown-nav";
import { Navigation } from "../navigation/navigation";

export const Header = () => {
  return (
     <header className="flex items-center justify-end px-8 py-6 min-h-80px
                   bg-linear-to-r from-black to-[#434343]
                   border-b border-gray-700">
      <Navigation />
    </header>

  );
};