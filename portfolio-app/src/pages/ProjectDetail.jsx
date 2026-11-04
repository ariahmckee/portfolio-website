import { useParams } from 'react-router'
import TechMarquee from '../components/TechMarquee'
import { projects } from '../data/projects'

export default function ProjectDetail({ discipline }) {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)

  if (!project || project.category !== discipline) {
    return (
      <main className="portfolio-page page-container">
        <h1>Project not found</h1>
        <p>The requested project does not exist for this discipline.</p>
      </main>
    )
  }

  return (
    <main className="portfolio-page page-container">
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      <p>Category: {project.category}</p>

      {project.technologies?.length > 0 ? (
        <article className="worked-with project-technologies">
          <p>Technologies Used</p>
          <TechMarquee items={project.technologies} animated={false} />
        </article>
      ) : null}
    </main>
  )
}
