import LandingNav from '@/components/landing/LandingNav'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorks from '@/components/landing/HowItWorks'
import ModelsSection from '@/components/landing/ModelsSection'
import IndustriesSection from '@/components/landing/IndustriesSection'
import FaqSection from '@/components/landing/FaqSection'
import FinalCta from '@/components/landing/FinalCta'
import LandingFooter from '@/components/landing/LandingFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <LandingNav />
      <main className="flex-1">
        <HeroSection />
        <ModelsSection />
        <HowItWorks />
        <IndustriesSection />
        <FaqSection />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  )
}
