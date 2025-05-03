// ProductImage.tsx
import Image from "next/image"

export default function ProductImage({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-xl">
      <Image
        src={src}
        alt="Product"
        width={400}
        height={400}
        className="transition-transform hover:scale-110 duration-300"
      />
    </div>
  )
}
