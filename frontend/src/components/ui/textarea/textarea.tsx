"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Text } from "../text/text";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, error, className, id, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2xs text-black">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-xs font-semibold text-black",
            error && "text-red-600"
          )}
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-lg border px-s py-xs text-sm text-white",
          "bg-gray-50 border-gray-300",
          "placeholder:text-gray-400",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-cyan-800/40 focus:border-cyan-800",
          "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
          error &&
            "border-red-500 bg-red-50 focus:ring-red-500/40 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <Text as="span" variant="body-micro" className="text-red-600">
          {error}
        </Text>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";
