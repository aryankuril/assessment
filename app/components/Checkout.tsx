"use client";

import { useCart } from "@/context/CartContext";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// @ts-ignore
import confetti from "canvas-confetti";


/* ================= CONFETTI FUNCTION ================= */
const shootConfettiFromBottom = () => {
  const duration = 2000;
  const end = Date.now() + duration;

//   const colors = ["#000000", "#ffffff"];

  (function frame() {
    // Bottom Left
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 1 },
    //   colors,
    });

    // Bottom Right
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 1 },
    //   colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
/* ===================================================== */

const Checkout = () => {
  const { cart, clearCart, updateQty } = useCart();
  const router = useRouter();
  const [popup, setPopup] = useState<"success" | "failed" | null>(null);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handlePayment = async (status: "success" | "failed") => {
    if (cart.length === 0) return;

    await addDoc(collection(db, "orders"), {
      user: "guest",
      cart,
      total,
      paymentStatus: status,
      createdAt: serverTimestamp(),
    });

    if (status === "success") {
      clearCart();
      shootConfettiFromBottom(); // 🎉 CONFETTI ONLY ON SUCCESS
    }

    setPopup(status);

    setTimeout(() => {
      router.push("/task45");
    }, 3000);
  };

  // EMPTY STATE
  if (cart.length === 0 && !popup) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-semibold mb-3 text-black">Your cart is empty 😕</h1>
        <p className="text-gray-600 mb-8">
          Please add some products before checking out.
        </p>
        <Link
          href="/"
          className="border border-black px-8 py-3 rounded-full text-black transition hover:bg-black hover:text-white"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10 text-black">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: PRODUCTS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 border border-black rounded-xl p-5"
            >
              {/* IMAGE */}
              <div className="w-24 h-24 rounded-lg overflow-hidden border bg-gray-100">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 flex flex-col">
                <h2 className="font-medium text-lg text-black">{item.title}</h2>
                <p className="text-gray-600 mt-1">₹{item.price}</p>

                {/* Quantity on mobile */}
                <div className="mt-2 sm:hidden">
                  <div className="inline-flex items-center border border-black rounded-full px-3 py-1 gap-4">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.qty - 1))
                      }
                      className="text-xl font-medium text-black"
                    >
                      −
                    </button>
                    <span className="min-w-[20px] text-center font-medium text-black">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="text-xl font-medium text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity desktop */}
              <div className="hidden sm:flex items-center border border-black rounded-full px-3 py-1 gap-4">
                <button
                  onClick={() =>
                    updateQty(item.id, Math.max(1, item.qty - 1))
                  }
                  className="text-xl font-medium cursor-pointer text-black"
                >
                  −
                </button>
                <span className="min-w-[20px] text-center font-medium text-black">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="text-xl font-medium cursor-pointer text-black"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="border border-black rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-black">Order Summary</h2>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="border-t-black pt-4 flex justify-between text-lg font-semibold text-black">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* PAYMENT BUTTONS */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handlePayment("success")}
              className="
                w-full border border-black
                text-black bg-transparent
                rounded-full py-3
                transition cursor-pointer
                hover:bg-black hover:text-white
              "
            >
              Pay Success
            </button>

            <button
              onClick={() => handlePayment("failed")}
              className="
                w-full bg-black text-white
                rounded-full py-3
                transition cursor-pointer
                hover:bg-white hover:text-black hover:border
              "
            >
              Pay Failed
            </button>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[90%] max-w-md text-center shadow-lg">
            {popup === "success" ? (
              <>
                <h2 className="text-2xl font-bold text-green-600">
                  🎉 Payment Successful!
                </h2>
                <p className="mt-3 text-gray-600">
                  Yay! Your payment was successful.  
                  We’ll get your order soon 🚚
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-600">
                  ❌ Payment Failed
                </h2>
                <p className="mt-3 text-gray-600">
                  Oops! Your payment couldn’t be completed.  
                  Please try again.
                </p>
              </>
            )}

            <p className="mt-4 text-sm text-gray-400">
              Redirecting in a few seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
