import { shopifyFetch } from "@/lib/shopify";
import ProductGrid from "./ProductGrid";

type Product = {
  id: string;
  title: string;
  handle: string;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string } };
};

export default async function ProductList() {
  const query = `
    {
      products(first: 12) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges { node { url } }
            }
            priceRange {
              minVariantPrice { amount }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>(query);

  const products = res.data.products.edges.map(e => e.node);

  return <ProductGrid products={products} />;
}
