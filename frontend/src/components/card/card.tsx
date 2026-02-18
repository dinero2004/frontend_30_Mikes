import Link from "next/link";
import { ReactNode } from "react";
import { GridItem } from "../ui/grid/grid";

interface CardProps {
  children: ReactNode;
  slug: string;
}

export const Card = ({ children, slug }: CardProps) => {
  return (
    <GridItem
      span={{ sm: 12, md: 6, lg: 4 }}
      className="
        group
        rounded-xl
        overflow-hidden
        bg-neutral-900/80
        border border-white/10
        shadow-lg
        transition
        hover:-translate-y-1
        hover:shadow-2xl
        cursor-pointer
      "
    >
      <Link href={slug} className="flex h-full flex-col">
        {children}
      </Link>
    </GridItem>
  );
};
