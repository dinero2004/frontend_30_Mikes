import { Text } from "@/components/ui/text/text";
import { cn } from "@/lib/utils";

interface CardHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export const CardHeader = ({
  title,
  subtitle,
  description,
  className,
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        "px-s pt-s pb-m flex flex-col gap-s bg-neutral-900/60 backdrop-blur-sm",
        className
      )}
    >
      {/* Title + subtitle */}
      <div className="flex flex-col gap-2">
        <Text
          as="h4"
          variant="headline-4"
          className="line-clamp-2 text-gray-100"
        >
          {title}
        </Text>

        <Text
          variant="body-small"
          className="line-clamp-2 text-gray-400"
        >
          {subtitle}
        </Text>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Description */}
      {description && (
        <Text
          variant="body-small"
          className="text-gray-300 leading-relaxed"
        >
          {description}
        </Text>
      )}
    </div>
  );
};
