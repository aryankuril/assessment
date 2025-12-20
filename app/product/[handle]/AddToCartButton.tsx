"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  price: number;
   image: string;
};

export default function AddToCartButton({ id, title, price ,image}: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (added) return;

 addToCart({ id, title, price, image });
    setAdded(true);

    setTimeout(() => {
      router.push("/cart");
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={added}
      className={`
        mt-6 px-8 py-3
        border border-black
        rounded-full
        transition-all duration-300
        ${
          added
            ? "bg-black text-white opacity-70 cursor-not-allowed"
            : "bg-transparent text-black cursor-pointer hover:bg-black hover:text-white"
        }
      `}
    >
      {added ? "Added ✓ Redirecting…" : "Add to Cart"}
    </button>
  );
}
