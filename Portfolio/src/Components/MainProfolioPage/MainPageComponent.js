import React, { useEffect, useRef } from 'react'
import SideBar from '../Profile/SideBar'
import ScrollItems from '../Profile/ScrollItems'
import './MainPageComponent.css'
import ContactModal from '../../Containers/EmailContainer'
import { useEmailModal } from '../../providers/emailModalProvider'
import { useActivePage } from '../../providers/activePageProvider'
import { sectionIds } from '../../constants'

function MainPageComponent() {
  const { isVisible } = useEmailModal()
  const scrollContainer = useRef(null)
  const { setActivePage } = useActivePage()

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(sectionIds)
      const currentScrollPosition = scrollContainer.current.scrollTop
      const clientHeight = scrollContainer.current.clientHeight
      const scrollHeight = scrollContainer.current.scrollHeight
      const scrollTop = scrollContainer.current.scrollTop
      const endReached = Math.ceil(clientHeight + scrollTop) === scrollHeight

      // Check if the scrollbar is exactly at the bottom
      if (endReached) {
        return setActivePage(sectionIds.contact)
      }

      let activeSectionId = sections[0] // Default to the first section
      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i]
        const sectionElement = document.getElementById(sectionId)

        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop
          const sectionBottom = sectionTop + sectionElement.offsetHeight

          // Expand the considered "active" range slightly above and below the actual section
          const visibilityOffset = 200 // pixels to look ahead or behind in the scroll

          if (
            currentScrollPosition + visibilityOffset >= sectionTop &&
            currentScrollPosition - visibilityOffset <= sectionBottom
          ) {
            activeSectionId = sectionId
          }
        }
      }

      setActivePage(activeSectionId)
    }

    const scrollEl = scrollContainer.current
    scrollEl.addEventListener('scroll', handleScroll)

    return () => {
      scrollEl.removeEventListener('scroll', handleScroll)
    }
  }, [setActivePage])

  return (
    <div ref={scrollContainer} id="scrollContainer" className="MainPageWrapper">
      {isVisible && <ContactModal />}

      <div className="sideBarPositionWrapper">
        <SideBar />
      </div>

      <ScrollItems />
    </div>
  )
}
export default MainPageComponent
