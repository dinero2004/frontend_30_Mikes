import Image from "next/image";

type ImageContainerProps = {
  src: string;
  alt: string;
  className?: string;
};

export const ImageContainer = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

