import Image from "next/image";

interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageContainer = ({ src, alt }: ImageContainerProps) => {
  return <Image src={src} alt={alt} fill objectFit="cover" />;
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
