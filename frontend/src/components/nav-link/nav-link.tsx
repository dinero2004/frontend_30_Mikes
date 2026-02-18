import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { Text, TextVariant } from "../ui/text/text";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
  textVariant?: TextVariant;
  className?: string;
}

export const NavLink = ({
  href,
  children,
  textVariant = "body-small",
  className,
  ...props
}: NavLinkProps) => {
  return (
    <Link href={href} className={cn("cursor-pointer p-4 text-[#DFAF44] drop-shadow-[2px_-2px_2px_rgba(0,0,0,0.6)]", className)} {...props}>
      <Text variant={textVariant}>{children}</Text>
    </Link>
  );
};