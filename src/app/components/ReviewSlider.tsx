'use client';

import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
  {
    id: 1,
    name: 'Aarav Mehta',
    review: 'Great product quality and super fast delivery!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Ishita Sharma',
    review: 'The UI is beautiful and the checkout process is smooth.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    review: 'Customer support was quick to help me with my issue.',
    rating: 4.5,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Sneha Verma',
    review: 'I loved the recommendations! Felt personalized.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    name: 'Karan Joshi',
    review: 'User experience is top-notch. Would recommend!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

export default function ReviewSlider() {
  return (
    <section className="mt-12 px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        What Our Customers Say
      </h2>
      <Slider {...sliderSettings}>
        {reviews.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-md h-40 p-4 mx-2">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{r.name}</h3>
                  <div className="flex text-yellow-500 text-sm">
                    {Array.from({ length: Math.floor(r.rating) }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {r.rating % 1 !== 0 && <FaStar className="opacity-50" />}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{r.review}</p>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
}
