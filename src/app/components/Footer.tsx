'use client';

import { Mail, Phone, Github, Linkedin, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 px-5 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Company Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-white" size={30} />
            <span className="text-2xl font-bold text-white">ShopSmart</span>
          </div>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for amazing products. Shop smart, live better!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-white font-semibold mb-4">Policies</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 rounded bg-gray-600 text-gray-100 focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="px-3 py-2 rounded bg-gray-600 text-gray-100 focus:outline-none"
              rows={3}
            />
            <button
              type="submit"
              className="bg-black border border-gray-100 hover:bg-gray-500 hover:border-gray-500 hover:text-black   text-white py-2 rounded"
            >
              Send
            </button>
          </form>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-center items-center text-sm">
        {/* Contact Info */}
        <div className="flex gap-6 mb-4 md:mb-0 ">
          <a href="mailto:nandhininandhu5775@gmail.com" target="_blank" rel="noopener noreferrer">
            <Mail className="hover:text-white" />
          </a>
          <a href="tel:8148877916" target="_blank" rel="noopener noreferrer">
            <Phone className="hover:text-white" />
          </a>
          <a href="https://github.com/NandhiniMurugesh" target="_blank" rel="noopener noreferrer">
            <Github className="hover:text-white" />
          </a>
          <a href="https://www.linkedin.com/in/nandhini-murugesh-34b33423b/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="hover:text-white" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 ms-50">
          © 2025 ShopSmart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
