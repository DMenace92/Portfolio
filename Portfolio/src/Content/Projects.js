import React, { useState, useEffect } from 'react'
import styles from './Projects.module.css'
import ProjectCard from '../Components/Projects/ProjectCard'
import { sectionIds } from '../constants'

const Projects = (props) => {
  const { fetchProject, pro } = props
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

  const projectsHolder = [
    {
      title: 'Pharmacy App',
      techUsed: ['javascript', 'Node.js', 'mongoDB', 'Mongoose'],
      links: [{ url: 'https://', label: 'www.decorative.link.com' }],
      features: [
        'user db search complete with custom api',
        'user selection screen',
        'user details view',
      ],
      image: {
        link: 'https://www.volumetree.com/wp-content/uploads/2021/11/how-Rover-app-work.png',
        description: 'this image is dog',
      },
      // video: { link: 'https://...', description: 'this is also dog' },
      description:
        'it is about dogs and stuffs doing dog things like sniffing and cat nomming. they loves to noms the cats unless the cats is all prickly and pokey. then the doggses cries and poops themselves some morz. is disgustinin',
    },
    {
      title: 'Also Dog App 2',
      techUsed: ['javascript', 'typescript'],
      links: [{ url: 'https://', label: 'www.decorative.link.com' }],
      features: [
        'user db search complete with custom api',
        'user selection screen',
        'user details view',
      ],
      image: {
        link: 'https://s3-alpha.figma.com/hub/file/2192153279/e6c39181-4c3a-49e0-b467-1b67412c70b1-cover.png',
        description: 'this image is dog',
      },
      // video: { link: 'https://...', description: 'this is also dog' },
      description: 'it is about dog',
    },
  ]

  return (
    <div id={sectionIds.projects} className={styles.ProjectMainContainer}>
      <div className={styles.ProjectBanner}>
        <h2>Projects</h2>
        {projects.length > 0
          ? projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                techUsed={project.techUsed}
                links={project.links}
                features={project.features}
                image={project.image}
                video={project.video}
                description={project.description}
              />
            ))
          : projectsHolder.length > 0 &&
            projectsHolder.map((pProject) => (
              <ProjectCard
                key={`${pProject.title}-${pProject.techUsed.join('-')}`}
                title={pProject.title}
                techUsed={pProject.techUsed}
                links={pProject.links}
                features={pProject.features}
                image={pProject.image}
                video={pProject.video}
                description={pProject.description}
              />
            ))}
      </div>
    </div>
  )
}
export default Projects
