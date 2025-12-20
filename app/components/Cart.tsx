"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

const Cart = () => {
  const { cart, updateQty, removeItem } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-semibold mb-3">Your cart is empty 😕</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          href="/"
          className="border border-black px-8 py-3 rounded transition hover:bg-black hover:text-white"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

      {/* CART ITEMS */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center lg:gap-6 gap-3 border rounded-xl lg:p-5 p-3"
          >
            {/* IMAGE */}
           <div className="  w-24 h-24 rounded-lg overflow-hidden border bg-gray-100">
  <img
    src={item.image || "/placeholder.png"}
    alt={item.title}
    className="w-full h-full object-cover"
  />
</div>


            {/* DETAILS */}
           <div className="flex-1 flex flex-col">
  <h2 className="font-medium text-lg">{item.title}</h2>
  <p className="text-gray-600 mt-1">₹{item.price}</p>

  {/* Quantity BELOW price on mobile */}
  <div className="mt-2 sm:hidden">
    <div className="inline-flex items-center border border-black rounded-full px-3 py-1 gap-4">
      <button
        onClick={() =>
          updateQty(item.id, Math.max(1, item.qty - 1))
        }
        className="text-xl font-medium"
      >
        −
      </button>

      <span className="min-w-[20px] text-center font-medium">
        {item.qty}
      </span>

      <button
        onClick={() => updateQty(item.id, item.qty + 1)}
        className="text-xl font-medium"
      >
        +
      </button>
    </div>
  </div>
</div>

            {/* QUANTITY CONTROL */}
            <div className="hidden sm:flex items-center border border-black rounded-full px-3 py-1 gap-4">

              <button
                onClick={() =>
                  updateQty(item.id, Math.max(1, item.qty - 1))
                }
                className="text-xl font-medium cursor-pointer"
              >
                −
              </button>

              <span className="min-w-[20px] text-center font-medium">
                {item.qty}
              </span>

              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="text-xl font-medium cursor-pointer"
              >
                +
              </button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 text-xl hover:scale-110 transition"
              aria-label="Remove item"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL + CHECKOUT */}
      <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <h2 className="text-2xl font-semibold">
          Total: ₹{total}
        </h2>

        <Link
          href="/checkout"
          className="border border-black px-10 py-3 rounded-full text-center transition hover:bg-black hover:text-white"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
