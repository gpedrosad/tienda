'use client';

import { FaShieldAlt, FaUndoAlt } from 'react-icons/fa';

export default function GuaranteeAndReturn() {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-12 border border-gray-200 shadow-sm max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        Garantía y Devoluciones
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        
        {/* Garantía */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start flex-1">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FaShieldAlt size={28} className="text-gray-700" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Garantía de 2 Años
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Nuestras mesas cuentan con 2 años de garantía que cubren cualquier defecto de fabricación o material. Tu compra está protegida.
          </p>
        </div>

        {/* Devolución */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start flex-1">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FaUndoAlt size={28} className="text-gray-700" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Devoluciones en 30 Días
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Si la mesa no cumple tus expectativas, puedes devolverla en un plazo de 30 días y obtener el reembolso total de tu compra, sin complicaciones.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          Tu satisfacción es nuestra prioridad
        </p>
      </div>
    </section>
  );
}