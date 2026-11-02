import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function SoftwareEngineering() {
  const softwareProjects = projects.filter((project) => project.category === 'software-engineering')

  return (
    <main className="portfolio-page">
      <h1>Software Engineering</h1>
      <div className="project-grid">
        {softwareProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
