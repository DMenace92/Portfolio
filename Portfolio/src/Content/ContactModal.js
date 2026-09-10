import React, { useRef } from 'react'
import styles from './contactModal.module.css'
import { useEmailModal } from '../providers/emailModalProvider'

const ContactModal = (props) => {
  const { setIsVisible } = useEmailModal()

  const usernameRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()

    const hiddenField = '' // Replace with the appropriate hidden field logic if needed

    if (hiddenField.trim() !== '') {
      console.log('Submission Failed')
      return
    } else {
      // Add a confirmation prompt
      const confirmation = window.confirm(
        'Are you sure you want to submit this form?'
      )

      if (confirmation) {
        const formData = {
          username: usernameRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          email: emailRef.current.value,
          message: messageRef.current.value,
        }
        props.emailer(formData)

        // Clear the form fields
        usernameRef.current.value = ''
        phoneNumberRef.current.value = ''
        emailRef.current.value = ''
        messageRef.current.value = ''
      } else {
        console.log('Submission Cancelled')
      }
    }
  }

  return (
    <>
      <div
        className={styles.modalBackdrop}
        onClick={() => setIsVisible(false)}
      />
      <div className={styles.contactModalBody}>
        <div className={styles.hedderLable}>
          <p className={styles.headerTitle}>Contact me Today</p>
        </div>
        <div className={styles.modalKingWrapper}>
          <div className={styles.lableDecorator}>
            <form className={styles.formLayoutDesign} onSubmit={handleSubmit}>
              <label className={styles.inputLableDesign}>
                Full Name
                <input
                  className={styles.inputDesign}
                  ref={usernameRef}
                  name="username"
                />
              </label>
              <label className={styles.inputLableDesign}>
                Email
                <input
                  className={styles.inputDesign}
                  ref={emailRef}
                  name="email"
                />
              </label>

              <label className={styles.inputLableDesign}>
                Phone Number
                <input
                  className={styles.inputDesign}
                  ref={phoneNumberRef}
                  name="phoneNumber"
                />
              </label>
              <div className={styles.textAreaContainer}>
                <label className={styles.inputLableTextArea}>Message</label>
                <textarea
                  className={styles.inputTextArea}
                  cols="200"
                  rows="10"
                  ref={messageRef}
                  name="message"
                ></textarea>
              </div>
              <div className={styles.messageButtonWrapper}>
                {props.hideCancel ? null : (
                  <button
                    className={styles.messageStyleButtonCancel}
                    type="button"
                    onClick={() => setIsVisible(false)}
                  >
                    CANCEL
                  </button>
                )}
                <button className={styles.messageStyleButtonSend} type="submit">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactModal

// import React, { useState, useRef } from 'react'
// import styles from './contactModal.module.css'
// import { useEmailModal } from '../providers/emailModalProvider'

// const ContactModal = (props) => {
//   const { setIsVisible } = useEmailModal()

//   const [username, setUserName] = useState('')
//   const usernameRef = useRef(null)
//   const [phoneNumber, setPhoneName] = useState('')
//   const [email, setEmail] = useState('')
//   const [message, setrMessage] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     // console.log(this.props)
//     if (this.state.hidden.trim() !== '') {
//       console.log('Submission Failed')

//       // usernameRef.current.value

//       return
//     } else {
//       this.props.emailer(this.state)
//       this.setState({ username: '', phoneNumber: '', email: '', message: '' })
//     }
//   }
//   const onChange = ({ target }) => {
//     this.setState({ [target.name]: target.value })
//   }
//   console.log(props)
//   return (
//     <>
//       <div
//         className={styles.modalBackdrop}
//         onClick={() => setIsVisible(false)}
//       />
//       <div className={styles.contactModalBody} onSubmit={{ handleSubmit }}>
//         <div className={styles.hedderLable}>
//           <p className={styles.headerTitle}>Contact me Today</p>
//         </div>
//         <div className={styles.modalKingWrapper}>
//           <div classname={styles.lableDecorator}>
//             <div className={styles.formLayoutDesign}>
//               <label className={styles.inputLableDesign}>
//                 {'     '}Email {'  '}
//                 <input className={styles.inputDesign} ref={usernameRef}></input>
//               </label>
//               <label className={styles.inputLableDesign}>
//                 Subject
//                 <input className={styles.inputDesign}></input>
//               </label>
//               <label className={styles.inputLableDesign}>
//                 Phone Number
//                 <input className={styles.inputDesign}></input>
//               </label>
//             </div>
//             <div className={styles.textAreaContainer}>
//               <label className={styles.inputLableTextArea}>Message</label>

//               <textarea
//                 className={styles.inputTextArea}
//                 cols="200"
//                 rows="10"
//               ></textarea>
//             </div>

//             {/* <label className={styles.inputLableTextArea}>Message</label> */}
//             <div className={styles.messageButtonWrapper}>
//               {props.hideCancel ? null : (
//                 <button
//                   className={styles.messageStyleButtonCancel}
//                   onClick={() => setIsVisible(false)}
//                 >
//                   CANCEL
//                 </button>
//               )}

//               <button className={styles.messageStyleButtonSend}>SEND</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ContactModal
