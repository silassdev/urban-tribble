import Hero from '@/app/components/Hero'
import Marquee from '@/app/components/Marquee'
import AnimatedLines from '@/app/components/AnimatedLines'
import FeatureGrid from '@/app/components/FeatureGrid'
import Packages from '@/app/components/Packages'
import SVGDrawing from '@/app/components/SVGDrawing'

export default function Page() {
  return (
    <main className="space-y-12 py-12">
      <header className="space-y-8">
        <Hero />
        <Marquee />
      </header>

      <section>
        <AnimatedLines />
      </section>

      <section>
        <FeatureGrid />
      </section>

      <section>
        <Packages />
      </section>

      <section>
        <SVGDrawing />
      </section>
    </main>
  )
}
