import { Header } from './components/layout/Header'
import { HeroSection } from './components/layout/HeroSection'
import { Footer } from './components/layout/Footer'
import { SimulatorSection } from './components/simulator/SimulatorSection'
import { RealProjectSection } from './components/real-project/RealProjectSection'
import { ComparisonSection } from './components/comparison/ComparisonSection'
import { TeamSection } from './components/team/TeamSection'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Header />
      <main>
        <HeroSection />
        <SimulatorSection />
        <RealProjectSection />
        <ComparisonSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}
