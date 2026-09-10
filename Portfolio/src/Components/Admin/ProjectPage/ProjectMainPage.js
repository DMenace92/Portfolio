import React, { useState } from 'react'
import styles from './ProjectMainPage.module.css'
import ProjectCreation from '../../../Containers/ProjectContainer'
import EditProject from '../../../Containers/updateProjectContainer'
import ProjectView from '../../../Containers/FetchItemProjectContainer'
import WorkHistoryManager from '../../../Containers/WorkHistoryContainer'

const ProjectMainPage = () => {
  const [currentPage, setCurrentPage] = useState('ProjectView')

  const _onClick = ({ target }) => {
    setCurrentPage(target.value)
  }
  const direct = (pageProp) => {
    switch (pageProp) {
      case 'ProjectView':
        return <ProjectView />
      case 'createProject':
        return <ProjectCreation />
      case 'editProject':
        return <EditProject />
      case 'workHistory':
        return <WorkHistoryManager />
      default:
        return null
    }
  }

  return (
    <div className={styles.projectMainHolder}>
      <div className={styles.leftPMPComponent}>
        <h2 className={styles.sidebarTitle}>Admin</h2>
        <button
          className={`${styles.pmpButtons} ${
            currentPage === 'ProjectView' ? styles.pmpButtonActive : ''
          }`}
          value="ProjectView"
          onClick={_onClick}
        >
          View Projects
        </button>
        <button
          className={`${styles.pmpButtons} ${
            currentPage === 'createProject' ? styles.pmpButtonActive : ''
          }`}
          value="createProject"
          onClick={_onClick}
        >
          Add Project
        </button>
        <button
          className={`${styles.pmpButtons} ${
            currentPage === 'editProject' ? styles.pmpButtonActive : ''
          }`}
          value="editProject"
          onClick={_onClick}
        >
          Update Project
        </button>
        <button
          className={`${styles.pmpButtons} ${
            currentPage === 'workHistory' ? styles.pmpButtonActive : ''
          }`}
          value="workHistory"
          onClick={_onClick}
        >
          Work History
        </button>
      </div>

      <div className={styles.rightPMPComponent}>{direct(currentPage)}</div>
    </div>
  )
}
export default ProjectMainPage
