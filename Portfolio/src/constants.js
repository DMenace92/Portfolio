export const sectionIds = {
  aboutMe: 'about-me',
  experience: 'experience',
  projects: 'projects',
  contact: 'contact-me',
}

// Ignore a build-time localhost API URL when the site itself isn't on localhost,
// so a stale REACT_APP_API_URL can't break production (falls back to same-origin).
const configuredApiUrl = process.env.REACT_APP_API_URL || ''
export const apiBase = (() => {
  const pointsToLocalhost = /localhost|127\.0\.0\.1/.test(configuredApiUrl)
  if (typeof window !== 'undefined' && pointsToLocalhost) {
    const host = window.location.hostname
    if (host !== 'localhost' && host !== '127.0.0.1') return ''
  }
  return configuredApiUrl
})()
