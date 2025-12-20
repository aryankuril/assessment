import { shopifyFetch } from "@/lib/shopify";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: string;
  title: string;
  images: {
    edges: { node: { url: string } }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    productByHandle: Product | null;
  }>(query, { handle });

  if (!res?.data?.productByHandle) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <p className="text-gray-500 mt-2">
          Handle: <code>{handle}</code>
        </p>
      </div>
    );
  }

  const product = res.data.productByHandle;
  const imageUrl = product.images.edges[0]?.node.url;

  return (
    <div className="w-full container py-10 sm:py-15 lg:py-20">
      {/* IMAGE + DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT IMAGE */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full rounded-lg object-cover"
          />
        )}

        {/* RIGHT DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold text-black">{product.title}</h1>

          <p className="text-2xl mt-4 text-black">
            ₹{product.priceRange.minVariantPrice.amount}
          </p>

          {/* BUTTON WRAPPER (styling applied here) */}
          
            <AddToCartButton
            id={product.id}
            title={product.title}
            price={Number(product.priceRange.minVariantPrice.amount)} image={imageUrl || "/placeholder.png"}         />
         
        </div>
      </div>

      {/* PRODUCT DESCRIPTION */}
      <div className="mt-16 w-full">
        <h2 className="text-xl font-semibold mb-4 text-black">Product Description</h2>

       <p className="text-gray-700 leading-relaxed mb-6">
  This product is thoughtfully crafted with a strong focus on quality, comfort, and everyday usability, making it a reliable choice for a wide range of customers. Every detail, from the selection of materials to the final finishing, has been carefully considered to ensure a balanced combination of durability and style. The fabric used in this product feels soft against the skin while still being strong enough to withstand regular wear, making it suitable for long-term use without losing its shape or appearance. Designed to feel lightweight yet substantial, it provides a comfortable experience throughout the day, whether you are wearing it for extended hours at work, during casual outings, or while relaxing at home. The overall construction reflects a premium feel that is noticeable as soon as you touch and wear it, giving you confidence that you are investing in something well-made and dependable.
</p>

<p className="text-gray-700 leading-relaxed mb-6">
  In terms of design, this product follows a clean and timeless aesthetic that avoids unnecessary trends, ensuring it remains relevant season after season. The simple yet refined look allows it to blend effortlessly with different styles, colors, and accessories already present in your wardrobe. Whether you prefer a minimal appearance or enjoy layering your outfits, this piece adapts easily to your personal style. It can be paired with casual wear for a relaxed look or combined with more structured pieces to create a polished and put-together outfit. The versatility of this product makes it especially valuable, as it eliminates the need to constantly switch or replace items in your collection. Its balanced design ensures it looks appropriate in both casual and semi-formal settings, making it a practical option for multiple occasions.
</p>

<p className="text-gray-700 leading-relaxed mb-6">
  Beyond appearance, comfort plays a major role in the overall experience this product delivers. The fit is designed to allow natural movement without feeling restrictive, ensuring that you can go about your daily activities with ease. Breathability and comfort have been prioritized so that the product feels pleasant to wear across different environments and weather conditions. Even after repeated use, it maintains its comfort level and does not feel heavy or irritating. Additionally, the product is easy to care for, requiring minimal maintenance to keep it looking fresh and presentable. This makes it especially suitable for individuals with busy lifestyles who want something that looks good without demanding excessive time or effort for upkeep.
</p>

<p className="text-gray-700 leading-relaxed">
  Overall, this product represents a thoughtful balance between functionality, style, and reliability. It is designed for people who value well-made essentials that can be worn confidently in everyday life. Whether you are purchasing it for yourself or as a gift, it serves as a dependable option that meets practical needs while still offering a refined and premium feel. Its timeless nature ensures that it does not go out of style quickly, and its durable construction means it can be enjoyed for a long time. By choosing this product, you are selecting something that complements your lifestyle, adapts to various situations, and delivers consistent quality every time you use it.
</p>

      </div>
    </div>
  );
}
