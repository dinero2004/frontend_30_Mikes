"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Text, TextVariant } from "../text/text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  textVariant?: TextVariant;
  href?: string;
  label: string;
  labelClassName?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      textVariant = "body",
      leftSection,
      rightSection,
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
  ref={ref}
  className={cn(
    "rounded-lg cursor-pointer inline-flex items-center justify-center transition-all duration-200",
    // PRIMARY – main gold action
    variant === "primary" &&
      "bg-[#DFAF44] text-black hover:bg-[#c99a3d] px-4 py-2 shadow-md",

    // SECONDARY – dark surface
    variant === "secondary" &&
      "bg-gray-900 text-[#DFAF44] hover:bg-gray-800 px-4 py-2 border border-[#DFAF44]/30",

    // GHOST – text only
    variant === "ghost" &&
      "text-[#DFAF44] hover:text-white underline-offset-4 hover:underline",

    // DESTRUCTIVE – warning red
    variant === "destructive" &&
      "bg-red-600 text-white hover:bg-red-700 px-4 py-2",

    // ICON SPACING
    leftSection && "gap-2 pl-3 pr-4",
    rightSection && "gap-2 pl-4 pr-3",

    className
  )}
  {...props}
>
  {leftSection && <span className="flex items-center">{leftSection}</span>}

  <Text variant={textVariant} className={cn("font-semibold tracking-wide", labelClassName)}>
    {label}
  </Text>

  {rightSection && <span className="flex items-center">{rightSection}</span>}
</button>
    );
  }
);

Button.displayName = "Button";
