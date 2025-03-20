const domain = "ideamadera.myshopify.com"; // Cambia al dominio de tu tienda
const storefrontAccessToken = "e7bfcafb70411824e2d9e65b3d837e02"; // Tu token de acceso

export async function shopifyFetch(query: string, variables = {}) {
  try {
    const response = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.error("HTTP Error:", response.status, response.statusText);
      throw new Error("Error en la solicitud HTTP");
    }

    const json = await response.json();

    if (json.errors) {
      console.error("Errores de la API de Shopify:", json.errors);
      throw new Error("Error al hacer la consulta a Shopify");
    }

    return json.data; // Devuelve los datos de la consulta si no hay errores
  } catch (error) {
    console.error("Error al conectar con Shopify:", error);
    throw error;
  }
}

export async function getProductsOnSale() {
  const query = `
    {
      products(first: 20, query: "compare_at_price:>0") {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  return response.products.edges.map((edge: any) => edge.node);
}