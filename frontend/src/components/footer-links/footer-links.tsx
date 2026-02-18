import Link from "next/link"

const links = [
  { label: "SOCIALS", href: "#" },
  { label: "IMPRINT", href: "/imprint" },
  { label: "LOGIN", href: "/signup-login" },
  { label: "LEGAL INFORMATION", href: "/legal_information" },
]

export const FooterLinks = () => {
  return (
    <nav className="flex justify-center gap-8 text-sm font-semibold text-[#DFAF44]">
      {links.map(link => (
        <Link
          key={link.label}
          href={link.href}
          className="tracking-wide drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
