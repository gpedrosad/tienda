'use client';

import { FaShieldAlt, FaUndoAlt } from 'react-icons/fa';

export default function GuaranteeAndReturn() {
  return (
    <section className="bg-gray-50 py-16 px-8 md:px-16 rounded-xl shadow-sm max-w-5xl mx-auto my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
        Garantía y Devoluciones
      </h2>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Garantía */}
        <div className="group hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white hover:shadow-md">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gray-100 group-hover:bg-gray-50 transition-colors duration-300">
              <FaShieldAlt size={32} className="text-gray-700" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-800">
                Garantía de 2 Años
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Nuestras mesas cuentan con 2 años de garantía que cubren cualquier 
                defecto de fabricación o material. Tu compra está protegida.
              </p>
            </div>
          </div>
        </div>

        {/* Devolución */}
        <div className="group hover:transform hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white hover:shadow-md">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gray-100 group-hover:bg-gray-50 transition-colors duration-300">
              <FaUndoAlt size={32} className="text-gray-700" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-800">
                Devoluciones en 30 Días
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Si la mesa no cumple tus expectativas, puedes devolverla en un plazo 
                de 30 días y obtener el reembolso total de tu compra, sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 font-medium bg-white inline-block px-6 py-3 rounded-full shadow-sm">
          Tu satisfacción es nuestra prioridad
        </p>
      </div>
    </section>
  );
}