import Hero from '../components/Hero'
import TechMarquee from '../components/TechMarquee'
import { startupBrandIcons } from '../data/projects'

export default function Home() {
  return (
    <main className="content" id="top">
      <Hero />

      <article id="worked-with" className="worked-with">
        <p>Worked with</p>
        <TechMarquee items={startupBrandIcons} />
      </article>
    </main>
  )
}
