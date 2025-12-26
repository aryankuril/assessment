"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThreeDElement from "./ThreeDElement";

type Product = {
  id: string;
  title: string;
  handle: string;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string } };
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? products : products.slice(0, 9);

  return (
    <div id="task45" className="container py-10 sm:py-15 lg:py-20">
      <h1 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-8">
        Task 4&5
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProducts.map((product) => {
          // ✅ SAFE image handling (NO undefined src)
          const imageUrl =
            product.images.edges[0]?.node.url || "/placeholder.png";

          return (
            <ThreeDElement
              key={product.id}
              intensity={20}
              className="bg-white rounded shadow overflow-hidden"
            >
              <Link
                href={`/product/${product.handle}`}
                className="block p-4 hover:shadow-lg transition"
              >
                {/* SAME SIZE, SAME UI */}
                <div className="relative h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded"
                  />
                </div>

                <h2 className="mt-2 font-semibold text-black">
                  {product.title}
                </h2>
                <p className="text-black">
                  ₹{product.priceRange.minVariantPrice.amount}
                </p>
              </Link>
            </ThreeDElement>
          );
        })}
      </div>

      {products.length > 9 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="
              px-8 py-3
              border border-black
              text-black
              bg-transparent
              transition
              rounded-full
              cursor-pointer
              hover:bg-black hover:text-white
            "
          >
            {showAll ? "View Less Products" : "View More Products"}
          </button>
        </div>
      )}
    </div>
  );
}
