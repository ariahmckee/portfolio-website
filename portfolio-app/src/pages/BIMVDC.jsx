import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function BIMVDC() {
  const bimProjects = projects.filter((project) => project.category === 'bim-vdc')

  return (
    <main className="portfolio-page">
      <h1>BIM / VDC</h1>
      <div className="project-grid">
        {bimProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
