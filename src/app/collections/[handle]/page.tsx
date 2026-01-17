import Link from "next/link";

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Botón para volver */}
      <div className="mb-8">
        <Link href="/" className="flex items-center text-black hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-left md:text-center mt-10 mb-10 font-poppins">
        Colección: {handle}
      </h1>

      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Esta página ya no usa Shopify. Implementa tu propia fuente de datos.</p>
      </div>
    </div>
  );
}