import { areas } from "@/data/areas";

export default function AreasOfAction() {
  return (
    <section id="atuacao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stellas-teal mb-6">Áreas de Atuação</h2>
          <div className="w-20 h-1 bg-stellas-orange mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos suporte integral às vítimas secundárias da violência de gênero, 
            abrangendo diversos aspectos para uma recuperação completa e digna.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {areas.map((area, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 bg-stellas-light group-hover:${area.hoverColor} rounded-full flex items-center justify-center mb-6 mx-auto transition-colors`}>
                <area.icon className={`${area.iconColor} group-hover:text-white text-3xl transition-colors`} size={32} />
              </div>
              <h3 className="text-xl font-semibold text-stellas-teal mb-4">{area.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
