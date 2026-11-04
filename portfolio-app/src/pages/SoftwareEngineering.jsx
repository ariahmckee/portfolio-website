import ProjectCard from '../components/ProjectCard'
import TechMarquee from '../components/TechMarquee'
import { projects, softwareTechIcons } from '../data/projects'

export default function SoftwareEngineering() {
  const softwareProjects = projects.filter((project) => project.category === 'software-engineering')

  return (
    <main className="portfolio-page page-container">
      <h1>Software Engineering</h1>
      <article className="worked-with discipline-marquee">
        <p>Worked With</p>
        <TechMarquee items={softwareTechIcons} />
      </article>
      <div id="projects" className="project-grid">
        {softwareProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
