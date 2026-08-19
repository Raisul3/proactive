import Hero from '../../components/landing/Hero'
import ServicesGrid from '../../components/landing/ServicesGrid'
import Stats from '../../components/landing/Stats'
import Testimonials from '../../components/landing/Testimonials'
import FAQ from '../../components/landing/FAQ'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Stats />
      <Testimonials />
      <FAQ />
    </>
  )
}
