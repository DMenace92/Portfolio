import React from 'react'
import mail from '../../Images/mail-solid.svg'

import style from './MailNav.module.css'
import { useEmailModal } from '../../providers/emailModalProvider'

const MailNav = () => {
  const { isVisible, setIsVisible } = useEmailModal()

  return (
    <div
      onClick={() => (isVisible ? () => {} : setIsVisible(true))}
      className={style.PortfolioMailBarComponent}
    >
      <div className={style.cornerDesign}>
        <img
          className={style.mailNavIcon}
          src={mail}
          alt="hb"
          width="30"
          height="30"
        ></img>
      </div>
    </div>
  )
}
export default MailNav
