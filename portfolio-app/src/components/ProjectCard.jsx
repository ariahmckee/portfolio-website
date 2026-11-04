import { Link } from 'react-router'

export default function ProjectCard({ project }) {
  const projectPath = `/${project.category}/projects/${project.id}`

  return (
    <Link className="project-card" to={projectPath}>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
    </Link>
  )
}
