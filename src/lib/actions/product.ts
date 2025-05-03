// src/lib/actions/product.ts
import prisma from "@/lib/prisma";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
