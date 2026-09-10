import React, { useState, useEffect } from 'react'
import ProjectCard from '../../Projects/ProjectCard'
import Styles from './ProjectView.module.css'
import { Link } from 'react-router-dom'

const ProjectView = (props) => {
  const { fetchProject, deleteProject, pro } = props
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (fetchProject) {
      fetchProject()
    }
  }, [fetchProject])

  useEffect(() => {
    if (pro) {
      setProjects(pro)
    }
  }, [pro])

  const handleDelete = (id) => {
    if (!deleteProject) return
    const confirmed = window.confirm(
      'Delete this project? This cannot be undone.'
    )
    if (confirmed) {
      deleteProject(id)
    }
  }

  return (
    <div>
      <h2>Projects</h2>
      <div className={Styles.projectViewerWrapper}>
        {projects.length > 0
          ? projects.map((project) => (
              <div key={project._id}>
                <ProjectCard
                  title={project.title}
                  techUsed={project.techUsed}
                  links={project.links}
                  features={project.features}
                  image={project.image}
                  video={project.video}
                  description={project.description}
                />
                <div className={Styles.projectActions}>
                  <button>
                    <Link to={`edit/${project._id}`}>Edit</Link>
                  </button>
                  <button
                    className={Styles.deleteButton}
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default ProjectView
