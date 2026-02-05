import Link from 'next/link'
import Hero from '@/app/components/Hero'
import Marquee from '@/app/components/Marquee'
import AnimatedLines from '@/app/components/AnimatedLines'
import FeatureGrid from '@/app/components/FeatureGrid'
import Team from '@/app/components/Team'
import Packages from '@/app/components/Packages'
import SVGDrawing from '@/app/components/SVGDrawing'
import ShowcaseProjectImage from '@/app/components/ShowcaseProjectImage'
import { PROJECTS } from '@/app/data/projectsData'

export default function Page() {
  const featuredProjects = PROJECTS.slice(0, 2)

  return (
    <main className="space-y-12 py-12">
      <header className="space-y-8">
        <Hero />
        <Marquee />
      </header>

      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View Collection &rarr;
          </Link>
        </div>
        <ShowcaseProjectImage items={featuredProjects} />
      </section>

      <section>
        <Packages />
      </section>

      <section>
        <AnimatedLines />
      </section>

      <section>
        <FeatureGrid />
      </section>

      <section>
        <Team />
      </section>

      <section>
        <SVGDrawing />
      </section>
    </main>
  )
}
