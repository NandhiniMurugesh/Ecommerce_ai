// components/Carousel.tsx
"use client"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const slides = [
  "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/e6cafbb6ffa115f6.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/a649b76572db1725.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/bb6f2a5b16b4c4f9.jpg?q=20"
]

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }) // 3 seconds delay between slides
  ])
  

  return (
    <div className="overflow-hidden w-full rounded-xl mb-6" ref={emblaRef}>
      <div className="flex">
        {slides.map((src, idx) => (
          <div key={idx} className="flex-[0_0_100%] relative h-[300px]">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
