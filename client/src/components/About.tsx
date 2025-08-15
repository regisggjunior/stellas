export default function About() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stellas-teal mb-6">Nossa História</h2>
            <div className="w-20 h-1 bg-stellas-orange mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Homenagem à Mary Stella e outras vítimas" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                O Instituto Stellas nasceu do amor, da dor e da urgência de transformar luto em luta. 
                Idealizado por familiares de Mary Stella e por advogados comprometidos com o enfrentamento 
                à violência de gênero.
              </p>
              
              <p className="text-lg leading-relaxed">
                Em 2018, Mary Stella teve sua vida interrompida de forma brutal. Mulher forte, mãe dedicada 
                de dois filhos pequenos, ela decidiu romper com o ciclo de violência. Dessa tragédia, 
                nasceu uma força coletiva.
              </p>
              
              <div className="bg-stellas-light p-6 rounded-lg border-l-4 border-stellas-orange">
                <p className="text-stellas-teal font-semibold mb-2">Nossa Missão</p>
                <p className="italic">
                  Ser um espaço de acolhimento, escuta, reconstrução e justiça para familiares e amigos 
                  que conviveram com mulheres que enfrentaram a violência de gênero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
