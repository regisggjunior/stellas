import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MissionValues from '@/components/MissionValues'
import AreasOfAction from '@/components/AreasOfAction'
import ImpactSection from '@/components/ImpactSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instituto Stellas | Do trauma à transformação',
  description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio. Do trauma à transformação: um caminho possível com apoio.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <MissionValues />
      <AreasOfAction />
      <ImpactSection />
      <ContactSection />
      <Footer />
    </main>
  )
}