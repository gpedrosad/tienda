"use client";

import { FaCheckCircle, FaLeaf, FaCogs, FaShieldAlt } from "react-icons/fa";

export default function KeyBenefits() {
  const benefits = [
    {
      icon: <FaLeaf className="text-green-500 text-3xl" />,
      title: "Materiales sostenibles",
      description: "Fabricadas con madera certificada y respetuosa con el medio ambiente.",
    },
    {
      icon: <FaCogs className="text-blue-500 text-3xl" />,
      title: "Diseño funcional",
      description: "Pensadas para combinar estilo y practicidad en cualquier espacio.",
    },
    {
      icon: <FaShieldAlt className="text-yellow-500 text-3xl" />,
      title: "Durabilidad garantizada",
      description: "Resistentes al uso diario con garantía de 5 años.",
    },
    {
      icon: <FaCheckCircle className="text-purple-500 text-3xl" />,
      title: "Montaje fácil",
      description: "Incluyen manual y herramientas para una instalación rápida y sencilla.",
    },
  ];

  return (
    <section className="bg-gray-100 p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Por qué elegir nuestras mesas</h2>
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