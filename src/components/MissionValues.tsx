'use client'

import { Target, Eye, Heart } from "lucide-react";

export default function MissionValues() {
  const principles = [
    {
      icon: Target,
      title: "Missão",
      description: "Promover acolhimento, orientação e suporte a pessoas em situação de vulnerabilidade emocional, oferecendo caminhos possíveis de transformação através do cuidado terapêutico, social e jurídico.",
      color: "bg-stellas-teal"
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser referência no apoio a pessoas que vivenciaram traumas, construindo uma rede de acolhimento e transformação que inspire outras instituições e contribua para uma sociedade mais empática e justa.",
      color: "bg-stellas-orange"
    },
    {
      icon: Heart,
      title: "Valores",
      description: "",
      color: "bg-stellas-teal",
      values: [
        "Dignidade da pessoa humana",
        "Empatia e escuta ativa",
        "Compromisso social",
        "Equidade e transparência",
        "Resiliência e transformação"
      ]
    }
  ];

  return (
    <section className="py-20" style={{backgroundColor: '#FAF4DA'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stellas-teal mb-6">Nossos Princípios</h2>
          <div className="w-20 h-1 bg-stellas-orange mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg card-hover">
              <div className={`w-16 h-16 ${principle.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                <principle.icon className="text-white text-2xl" size={24} />
              </div>
              <h3 className="text-xl font-bold text-stellas-teal mb-4 text-center">{principle.title}</h3>
              {principle.values ? (
                <ul className="text-center space-y-2 text-sm">
                  {principle.values.map((value, valueIndex) => (
                    <li key={valueIndex}>• {value}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-center leading-relaxed">
                  {principle.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
