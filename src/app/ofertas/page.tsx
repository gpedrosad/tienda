'use client'

import { useState, useEffect } from 'react'
import { getProductsOnSale } from '@/lib/shopify'

interface ShopifyProduct {
  id: string
  title: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  featuredImage: {
    url: string
  }
  handle: string
}

export default function OfertasPage() {
  const [productos, setProductos] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargarOfertas() {
      try {
        const productosEnOferta = await getProductsOnSale()
        setProductos(productosEnOferta)
      } catch (error) {
        console.error('Error al cargar las ofertas:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarOfertas()
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4">Cargando ofertas...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Ofertas Exclusivas
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubre nuestra selección especial de productos con los mejores descuentos. ¡No te pierdas estas ofertas por tiempo limitado!
        </p>
      </div>

      {/* Contador de ofertas */}
      <div className="bg-blue-600 text-white py-4 mb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            ¡{productos.length} productos en oferta disponibles!
          </p>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => {
            const precioActual = parseFloat(producto.priceRange.minVariantPrice.amount)
            const precioOriginal = parseFloat(producto.compareAtPriceRange.minVariantPrice.amount)
            const descuento = Math.round(((precioOriginal - precioActual) / precioOriginal) * 100)

            return (
              <div key={producto.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                <div className="relative">
                  <img
                    src={producto.featuredImage?.url || '/placeholder.jpg'}
                    alt={producto.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-bl-lg">
                    -{descuento}% OFF
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">{producto.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{producto.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-red-600">€{precioActual.toFixed(2)}</span>
                      <span className="text-gray-500 line-through">€{precioOriginal.toFixed(2)}</span>
                    </div>
                    <a 
                      href={`/productos/${producto.handle}`}
                      className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalles
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 mb-6">Explora nuestra colección completa de productos</p>
          <a 
            href="/productos" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Catálogo Completo
          </a>
        </div>
      </div>
    </div>
  )
}
