"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div id="task45" className="container py-0 sm:py-15 lg:py-20">
        <h1 className=" text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-10">
        Task 4&5
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <ThreeDElement
            key={product.id}
            intensity={20}
            className="bg-white rounded shadow overflow-hidden"
          >
            <Link
              href={`/product/${product.handle}`}
              className="block p-4 hover:shadow-lg transition"
            >
              <img
                src={product.images.edges[0]?.node.url}
                alt={product.title}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="mt-2 font-semibold  text-black">{product.title}</h2>
              <p className=" text-black">₹{product.priceRange.minVariantPrice.amount}</p>
            </Link>
          </ThreeDElement>
        ))}
      </div>

      {products.length > 9 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(prev => !prev)}
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
