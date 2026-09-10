import React from 'react'
import styles from './ScrollItem.module.css'
import AboutMe from '../../Content/AboutMe'
import Experience from '../../Content/Experience'
import Projects from '../../Containers/fetchProjectContainer'
import CodeDecal from '../CodeDecal/CodeDecal'
import { useEmailModal } from '../../providers/emailModalProvider'
import { sectionIds } from '../../constants'

const ScrollItems = () => {
  const { isVisible, setIsVisible } = useEmailModal()
  const toggleVisibility = () => {
    if (!isVisible) {
      return setIsVisible(true)
    }
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.topDecorStyle}>
          <CodeDecal />
        </div>
        <AboutMe />
        <Experience />
        <Projects />

        <div
          id={sectionIds.contact}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button className={styles.button} onClick={toggleVisibility}>
            Contact Dennis Today!
          </button>
        </div>

        <div className={styles.bottomDecorStyle}>
          <CodeDecal />
        </div>
      </div>
    </div>
  )
}
export default ScrollItems
