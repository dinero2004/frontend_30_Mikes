"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Text } from "../ui/text/text";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        group
        inline-flex items-center gap-2
        px-l py-s
        rounded-md
        bg-gray-900
        border border-white/10
        cursor-pointer
        transition-all duration-300
        hover:bg-gray-800
        hover:border-[#DFAF44]/60
      "
    >
      <ArrowLeft
        size={20}
        className="
          text-gray-300
          transition-colors duration-300
          group-hover:text-[#DFAF44]
        "
      />

      <Text
        variant="body-small"
        className="
          text-gray-300
          transition-colors duration-300
          group-hover:text-[#DFAF44]
        "
      >
        Back
      </Text>
    </button>
  );
};
