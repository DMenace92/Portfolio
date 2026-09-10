import React, { forwardRef } from 'react'
import styles from '../Components/Profile/ScrollItem.module.css'
import { sectionIds } from '../constants'

const AboutMe = forwardRef((props, ref) => {
  return (
    <div id={sectionIds.aboutMe} className={styles.aboutmeMainContainer}>
      <div className={styles.aboutmeItemHolder} ref={ref}>
        <h2 className={styles.aboutMeHeader}>About Me</h2>
        <div className={styles.aboutmeDiscription}>
          Hi, I'm Dennis Enwiya, a passionate software developer. My journey
          began with a 6-month boot camp at Galvanize, where I gained invaluable
          certifications and honed my technical skills, collaboration, and
          problem-solving abilities. Pursuing a degree in Computer Science from
          Southern New Hampshire University further deepened my understanding of
          core principles and fueled my passion for continuous learning.
          Equipped with these experiences, I am eager to tackle coding
          challenges, build robust applications, and drive innovation in the
          tech industry. Committed to personal and professional growth, I aim to
          make a lasting impact and create innovative solutions that shape the
          future.
        </div>
        <div style={{ marginBottom: 40 }} />
      </div>
    </div>
  )
})

export default AboutMe
