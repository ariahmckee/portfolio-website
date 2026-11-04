import ProjectCard from '../components/ProjectCard'
import TechMarquee from '../components/TechMarquee'
import VideoHero from '../components/VideoHero'
import { bimTechIcons, projects } from '../data/projects'

export default function BIMVDC() {
  const bimProjects = projects.filter((project) => project.category === 'bim-vdc')

  return (
    <main className="portfolio-page page-container">
      <VideoHero
        heading="BIM / VDC"
        description="Integrated design, coordination, and workflow systems for modern construction and project delivery."
        sources={{
          mobile: '/videos/BIMtools_Hero_mobile.webm',
          standard: '/videos/BIMtools_Hero_standard.webm',
          desktop: '/videos/BIMtools_Hero_desktop.webm',
        }}
        className="bim-video-hero"
      />

      <article className="worked-with discipline-marquee">
        <p>Worked With</p>
        <TechMarquee items={bimTechIcons} />
      </article>

      <div id="projects" className="project-grid">
        {bimProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
