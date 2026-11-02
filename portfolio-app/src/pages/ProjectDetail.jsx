import { useParams } from 'react-router'
import { projects } from '../data/projects'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return (
      <main className="portfolio-page">
        <h1>Project not found</h1>
      </main>
    )
  }

  return (
    <main className="portfolio-page">
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      <p>Category: {project.category}</p>
    </main>
  )
}
