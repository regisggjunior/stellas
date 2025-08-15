import { HandHeart } from "lucide-react";

export default function ImpactSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    {
      number: "1.350+",
      label: "Feminicídios por ano"
    },
    {
      number: "3.000+",
      label: "Crianças órfãs anualmente"
    },
    {
      number: "80%",
      label: "Sem suporte adequado"
    }
  ];

  return (
    <section className="py-16 bg-stellas-teal text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O Brasil é o 5º país com mais feminicídios no mundo</h2>
          <p className="text-xl mb-8 text-white text-opacity-90">
            Em média, 3 a 4 mulheres são assassinadas por dia. Para cada mulher assassinada, 
            filhos e pais são deixados à margem, sem apoio. Este é o vácuo social que ocupamos.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-stellas-orange mb-2">{stat.number}</div>
                <div className="text-white text-opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollToSection('contato')}
            className="bg-stellas-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            <HandHeart className="mr-2" size={20} />
            Quero Apoiar o Instituto
          </button>
        </div>
      </div>
    </section>
  );
}
