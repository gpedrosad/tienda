import Link from 'next/link'

export default function OfertasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Ofertas Exclusivas
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Esta página ya no usa Shopify. Implementa tu propia fuente de datos para mostrar ofertas.
        </p>
      </div>

      {/* Botón para volver */}
      <div className="container mx-auto px-4 pb-16">
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-black hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
