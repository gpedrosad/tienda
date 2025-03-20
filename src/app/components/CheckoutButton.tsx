"use client";

export default function CheckoutButton({ 
  variantId, 
  selectedAddons,
  quantity = 1 
}: { 
  variantId: string;
  selectedAddons: string[];
  quantity?: number;
}) {
  const handleCheckout = () => {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "ideamadera.cl";
    const variantIdCleaned = variantId.split("gid://shopify/ProductVariant/")[1];

    // Usar el formato básico de Shopify
    let items = [];
    
    // Agregar producto principal
    items.push(`${variantIdCleaned}:${quantity}`);
    
    // Agregar barniz si está seleccionado
    if (selectedAddons.includes('barniz')) {
      // ID actualizado del barniz
      const BARNIZ_VARIANT_ID = '44778174644395';
      items.push(`${BARNIZ_VARIANT_ID}:1`);
    }

    const checkoutUrl = `https://${domain}/cart/${items.join(',')}`;
    console.log('URL final:', checkoutUrl);
    window.location.href = checkoutUrl;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-transparent z-50 p-4 flex justify-center">
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition w-2/4 text-lg font-semibold"
      >
        Agregar al Carrito
      </button>
    </div>
  );
}