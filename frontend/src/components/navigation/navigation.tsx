import { DropdownNav } from "../dropdown-nav/dropdown-nav"
import { NavLink } from "../nav-link/nav-link"

export const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-m">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/model">Models</NavLink>
      <DropdownNav />
    </nav>
  )
}
