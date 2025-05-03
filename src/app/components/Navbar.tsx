// app/components/Navbar.tsx
"use client";
import { Button } from "@/components/ui/button";


import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  const links = [
   
    { name: "Home", href: "/"},
    { name: "Admin Dashboard", href: "/admin" },
   
    { name: "Products", href: "/products" },
    // { name: "AddProduct", href: "/addproduct" },
    { name: "Cart", href: "/cart" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Orders", href: "/my-orders" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="flex justify-between items-center p-4 border-b shadow-sm bg-black text-white sticky top-0 z-50">
      <h1 className="font-bold text-xl">🛒 Ecom-AI</h1>


      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`hover:border-b ${pathname === link.href ? "font-semibold" : ""}`}
          >
            {link.name}
          </Link>
        ))}
        {user ? (
          <SignOutButton>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Sign Out</button>
          </SignOutButton>
        ) : (
          <Link href="/sign-in" className="bg-black text-white px-3 py-1 rounded">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
