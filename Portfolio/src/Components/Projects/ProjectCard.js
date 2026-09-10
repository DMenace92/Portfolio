import React, { useEffect, useState } from 'react'
import styles from './ProjectCard.module.css'
import DownCaret from '../DownCaret'
import ExternalLink from './ExternalLink'
import backgroundImage from '../../Images/project-placeholder-2.jpg'

export default function ProjectCard(props) {
  const { title, techUsed, links, features, image, video, description } = props
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [updatedImages, setUpdatedImages] = useState([])

  useEffect(() => {
    if (image && image.length > 0) {
      setUpdatedImages(
        image.map((img) => ({ ...img, url: img.link || backgroundImage }))
      )
    }
  }, [image])

  return (
    <div
      className={`${styles.cardContainer}  ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      <div className={styles.cardContent}>
        {/* IMAGE */}
        {updatedImages &&
          updatedImages.map((singleImg) => {
            return (
              <img
                key={singleImg.url}
                className={`${styles.media} ${
                  isCollapsed ? styles.collapsed : styles.expanded
                }`}
                src={singleImg.url} // Ensure this is the correct URL
                alt={singleImg.description}
                onError={(e) => {
                  e.currentTarget.src = backgroundImage
                }}
              />
            )
          })}
        {/* VIDEO */}
        {video && video.link && (
          <video
            className={styles.media}
            controls
            src={video.link}
            alt={video.description}
          ></video>
        )}
        <div className={styles.upperContent}>
          {/* TITLE */}
          <h3 className={styles.projectTitle}>{title}</h3>
          {/* TECH USED */}
          {techUsed && (
            <div className={styles.pillContainer}>
              {(Array.isArray(techUsed) ? techUsed : [techUsed])
                .flatMap((tech) => String(tech).split(','))
                .map((tech) => tech.trim())
                .filter(Boolean)
                .map((tech) => {
                  return (
                    <div key={tech} className={styles.pill}>
                      {tech}
                    </div>
                  )
                })}
            </div>
          )}
          {/* DESCRIPTION */}
          <div>
            {isCollapsed && description.length > 200
              ? description.slice(0, 200) + '...'
              : description}
          </div>
        </div>

        {!isCollapsed ? (
          <div>
            {/* LINKS */}
            {links && (
              <ul className={styles.linkList}>
                {links.map((link) => {
                  return (
                    <li key={link} className={styles.linkItem}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                      <ExternalLink className={styles.icon} color="#FD6389" />
                    </li>
                  )
                })}
              </ul>
            )}
            {/* FEATURES */}
            {features && (
              <div>
                <h4>Features</h4>
                <ul>
                  {features.map((feature) => {
                    return <li key={feature}>{feature}</li>
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {/* COLLAPSE/EXPAND ICON */}
      <div
        className={styles.iconContainer}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <DownCaret
          className={`${isCollapsed ? styles.collapsed : styles.expanded} ${
            styles.bottomIcon
          } `}
        />
      </div>
    </div>
  )
}
