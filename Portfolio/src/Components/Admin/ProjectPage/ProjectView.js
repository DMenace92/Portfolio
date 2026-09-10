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
    <div className={Styles.projectViewRoot}>
      <div className={Styles.viewHeader}>
        <div>
          <h2 className={Styles.viewTitle}>Projects</h2>
          <p className={Styles.viewSubtitle}>
            Manage, edit, and remove your portfolio projects.
          </p>
        </div>
        <span className={Styles.countBadge}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      <div className={Styles.projectViewerWrapper}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className={Styles.projectCardShell}>
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
                <Link to={`edit/${project._id}`} className={Styles.editButton}>
                  Edit
                </Link>
                <button
                  className={Styles.deleteButton}
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={Styles.emptyState}>
            <h3 className={Styles.emptyTitle}>No projects yet</h3>
            <p className={Styles.emptyText}>
              Projects you create will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectView
