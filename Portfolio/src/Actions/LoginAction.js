const ApiLink = process.env.REACT_APP_API_URL
console.log(ApiLink)
export const L_S = 'L_S'
const loginSuccess = (log) => ({ type: L_S, payload: log })

export const L_L = 'L_L'
const loginLoading = () => ({ type: L_L })

export const L_E = 'L_E'
const loginError = (err) => ({ type: L_E, payload: err })

export const login = (log) => (dispatch) => {
  dispatch(loginLoading())
  fetch(`${ApiLink}/admin/login`, {
    method: 'POST',
    body: JSON.stringify(log),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login')
      }
      return data
    })
    .then((data) => {
      dispatch(loginSuccess(data))
    })
    .catch((err) => {
      dispatch(loginError(err.message))
    })
}
