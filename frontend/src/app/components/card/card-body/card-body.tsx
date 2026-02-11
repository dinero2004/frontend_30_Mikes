import { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children }: CardBodyProps) => {
  return (
    <div
      className="
        relative w-full aspect-video
        rounded-t-xl
        overflow-hidden
        bg-linear-to-b from-neutral-800 to-neutral-900
        border border-white/10
        shadow-lg
        font-roboto
      " 
    >
      {/* subtle overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none font-roboto" />
      {children}
    </div>
  );
};
