import { apiBase } from '../constants'

const ApiLink = apiBase

export const CREATE_EMAIL_SUCCESS = 'CREATE_EMAIL_SUCCESS'
const createEmailSuccess = (mail) => ({
  type: CREATE_EMAIL_SUCCESS,
  payload: mail,
})

export const CREATE_EMAIL_LOADING = 'CREATE_EMAIL_LOADING'
const createEmailLoading = () => ({ type: CREATE_EMAIL_LOADING })

export const CREATE_EMAIL_ERROR = 'CREATE_EMAIL_ERROR'
const createEmailError = () => ({ type: CREATE_EMAIL_ERROR })

//email Thunk

export const emailer = (mail) => (dispatch) => {
  dispatch(createEmailLoading())
  fetch(`${ApiLink}/send-email`, {
    method: 'POST',
    body: JSON.stringify(mail),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((mail) => {
      dispatch(createEmailSuccess(mail))
    })
    .catch((err) => {
      dispatch(createEmailError())
    })
}
