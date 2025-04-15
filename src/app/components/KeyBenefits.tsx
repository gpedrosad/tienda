"use client";

import { FaCogs, FaChair, FaShieldAlt, FaHandshake } from "react-icons/fa";

export default function KeyBenefits() {
  const benefits = [
    {
      icon: <FaCogs className="text-gray-800 text-3xl" />,
      title: "Artesanía de excelencia",
      description:
        "Cada mesa es elaborada meticulosamente, fusionando diseño moderno con toques artesanales para un acabado impecable.",
    },
    {
      icon: <FaChair className="text-gray-800 text-3xl" />,
      title: "Ergonomía superior",
      description:
        "Diseñada para brindar máxima comodidad y funcionalidad, perfecta para reuniones y momentos de relax.",
    },
    {
      icon: <FaShieldAlt className="text-gray-800 text-3xl" />,
      title: "Fácil mantenimiento",
      description:
        "Acabados resistentes a manchas y arañazos, garantizando una apariencia impecable con mínimo esfuerzo.",
    },
    {
      icon: <FaHandshake className="text-gray-800 text-3xl" />,
      title: "Garantía de satisfacción",
      description:
        "Respaldamos cada mesa con una garantía integral, asegurando tu inversión y tranquilidad.",
    },
  ];

  return (
    <section className="bg-gray-100 p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 font-poppins">
        Por qué invertir en una mesa de calidad
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            {benefit.icon}
            <h3 className="text-lg font-semibold mt-4">{benefit.title}</h3>
            <p className="text-gray-600 mt-2">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}