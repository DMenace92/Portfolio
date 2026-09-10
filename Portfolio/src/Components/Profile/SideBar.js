import React, { useCallback } from 'react'
import profilePic from '../../Images/newProfilePic.png'
import NodeIcon from '../../Images/NodeIcon.svg'
import facebook from '../../Images/Vector5.svg'
import instagram from '../../Images/Vector4.svg'
import twitter from '../../Images/Vector1.svg'
import linkedin from '../../Images/Vector3.svg'
import github from '../../Images/Vector2.svg'
import styles from './ProfileComponent.module.css'
import { useActivePage } from '../../providers/activePageProvider'
import { sectionIds } from '../../constants'

const ProfileComponent = (props) => {
  const { isDrawerVersion, drawerIsOpen, setMenuIsVisible } = props
  const { activePage } = useActivePage()

  const handleSmoothScroll = useCallback(
    (targetId) => {
      const target = document.getElementById(targetId)

      if (!target) {
        console.error('Target element not found: ', targetId)
        return
      }

      const scrollContainer = document.getElementById('scrollContainer')
      if (!scrollContainer) {
        console.error('Scroll container not found')
        return
      }

      if (drawerIsOpen) setMenuIsVisible(false)

      const containerRect = scrollContainer.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const topPosition =
        targetRect.top - containerRect.top + scrollContainer.scrollTop

      scrollContainer.scrollTo({
        top: topPosition,
        left: 0,
        behavior: 'smooth',
      })
    },
    [drawerIsOpen, setMenuIsVisible]
  )

  return (
    <div
      className={`${styles.gridDesign} ${
        isDrawerVersion && styles.drawerVersion
      } ${drawerIsOpen && styles.open}`}
    >
      <div className={styles.portfolioHolder}>
        {/* <div className="ProfileImageHolder"> */}
        <div className={styles.shapeContainer}>
          <div className="imagePosition">
            <img
              className={styles.ProfileImageHolder}
              src={profilePic}
              alt="Dennis Enwiya"
            ></img>
          </div>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
        </div>
        <div>
          <h1 className={styles.nameContainer}>
            <span className={styles.nameTextStyle}>DENNIS</span>
            <span className={styles.nameTextStyle1}>ENWIYA</span>
          </h1>
          <div className={styles.contentItemsWrapper}>
            <img className={styles.NodeIcon} src={NodeIcon} alt="Node"></img>

            <ul className={styles.navigationSelection}>
              {/* <div className={styles.NodeDesign}></div> */}
              <li
                onClick={() => handleSmoothScroll(sectionIds.aboutMe)}
                className={`${styles.selectionOption} 
                ${
                  activePage === sectionIds.aboutMe || !activePage
                    ? styles.selectionItemPage
                    : styles.selectionItem
                }`}
              >
                About
              </li>
              <li
                onClick={() => handleSmoothScroll(sectionIds.experience)}
                className={`${styles.selectionOption} 
                ${
                  activePage === sectionIds.experience
                    ? styles.selectionItemPage
                    : styles.selectionItem
                }`}
              >
                Experience
              </li>
              <li
                onClick={() => handleSmoothScroll(sectionIds.projects)}
                className={`${styles.selectionOption} 
                ${
                  activePage === sectionIds.projects
                    ? styles.selectionItemPage
                    : styles.selectionItem
                }`}
              >
                Projects
              </li>
              <li
                onClick={() => handleSmoothScroll(sectionIds.contact)}
                className={`${styles.selectionOption} 
                  ${
                    activePage === sectionIds.contact
                      ? styles.selectionItemPage
                      : styles.selectionItem
                  }`}
              >
                Contact Me
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerSocialMedia}>
          {/* Add your social media icons or links here */}
          <a
            href="https://www.facebook.com/dennis.enwiya/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook"></i>
            <img
              className={styles.footerIcons}
              src={facebook}
              alt="Facebook"
            ></img>
          </a>
          <a
            href="https://twitter.com/DEnwiya"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
            <img
              className={styles.footerIcons}
              src={twitter}
              alt="Twitter"
            ></img>
          </a>
          <a
            href="https://www.instagram.com/theonlymenace/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
            <img
              className={styles.footerIcons}
              src={instagram}
              alt="Instagram"
            ></img>
          </a>
          <a
            href="https://www.linkedin.com/in/dennisenwiya"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
            <img
              className={styles.footerIcons}
              src={linkedin}
              alt="LinkedIn"
            ></img>
          </a>
          <a
            href="https://github.com/DMenace92"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
            <img className={styles.footerIcons} src={github} alt="GitHub"></img>
          </a>
        </div>
      </div>
      <div className={styles.ScrollItemsContainer}></div>
    </div>
  )
}
export default ProfileComponent
