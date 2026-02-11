import Image from "next/image";

interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain";
}

export const ImageContainer = ({ src, alt, className, objectFit }: ImageContainerProps) => {
  return <Image src={src} alt={alt} fill className={className} style={{ objectFit }} />;
};

// import Image from "next/image";

// type ImageContainerProps = {
//   src: string;
//   alt: string;
//   className?: string;
// };

// export const ImageContainer = ({ src, alt }: ImageContainerProps) => {
//   return (
//     <div className="relative w-full h-64 overflow-hidden rounded-md">
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         className="object-cover"
//       />
//     </div>
//   );
// };
