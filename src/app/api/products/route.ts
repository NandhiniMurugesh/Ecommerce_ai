import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image, image2, image3, image4, price, rating, stock, brand, category, warranty, offers } = body;

    if (!title || !description || !image || price === undefined || rating === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const parsedStock = typeof stock === "string" ? parseInt(stock) : stock;

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        image,
        image2,
        image3,
        image4,
        price: Number(price),
        rating: Number(rating),
        stock: parsedStock ?? 0,
        brand,
        category,
        warranty,
        offers,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Failed to create product", error: error.message }, { status: 500 });
  }
}

// Get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products", error: error.message }, { status: 500 });
  }
}
