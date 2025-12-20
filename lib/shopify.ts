type ShopifyResponse<T> = {
  data: T;
};

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<ShopifyResponse<T>> {
  if (!DOMAIN || !TOKEN) {
    throw new Error("Shopify env variables are missing");
  }

  const res = await fetch(
    `https://${DOMAIN}/api/2023-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // 🔥 IMPORTANT
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error: ${text}`);
  }

  return res.json();
}
