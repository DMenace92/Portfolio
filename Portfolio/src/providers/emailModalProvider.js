import React, { createContext, useContext, useState } from 'react'

const EmailModalContext = createContext({
  isVisible: false,
  setIsVisible: () => {},
})

export const EmailModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <EmailModalContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </EmailModalContext.Provider>
  )
}

export const useEmailModal = () => {
  const context = useContext(EmailModalContext)

  if (context === undefined) {
    throw new Error('useActivePage must be used within an ActivePageProvider')
  }

  return context
}
