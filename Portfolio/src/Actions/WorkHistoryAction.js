import { apiBase } from '../constants'

const ApiLink = apiBase

const authHeader = () => {
  const token = window.localStorage.getItem('authToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Fetch
export const F_WH_S = 'F_WH_S'
const fetchWorkHistorySuccess = (entries) => ({
  type: F_WH_S,
  payload: entries,
})

export const F_WH_L = 'F_WH_L'
const fetchWorkHistoryLoading = () => ({ type: F_WH_L })

export const F_WH_E = 'F_WH_E'
const fetchWorkHistoryError = (err) => ({ type: F_WH_E, payload: err })

// Create
export const C_WH_S = 'C_WH_S'
const createWorkHistorySuccess = (entry) => ({ type: C_WH_S, payload: entry })

export const C_WH_L = 'C_WH_L'
const createWorkHistoryLoading = () => ({ type: C_WH_L })

export const C_WH_E = 'C_WH_E'
const createWorkHistoryError = (err) => ({ type: C_WH_E, payload: err })

// Update
export const U_WH_S = 'U_WH_S'
const updateWorkHistorySuccess = (entry) => ({ type: U_WH_S, payload: entry })

export const U_WH_L = 'U_WH_L'
const updateWorkHistoryLoading = () => ({ type: U_WH_L })

export const U_WH_E = 'U_WH_E'
const updateWorkHistoryError = (err) => ({ type: U_WH_E, payload: err })

// Delete
export const D_WH_S = 'D_WH_S'
const deleteWorkHistorySuccess = (id) => ({ type: D_WH_S, payload: id })

export const D_WH_L = 'D_WH_L'
const deleteWorkHistoryLoading = () => ({ type: D_WH_L })

export const D_WH_E = 'D_WH_E'
const deleteWorkHistoryError = (err) => ({ type: D_WH_E, payload: err })

// Thunks

export const fetchWorkHistory = () => (dispatch) => {
  dispatch(fetchWorkHistoryLoading())
  fetch(`${ApiLink}/get_work_history`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((entries) => dispatch(fetchWorkHistorySuccess(entries)))
    .catch((err) => dispatch(fetchWorkHistoryError(err)))
}

export const createWorkHistory = (entry) => (dispatch) => {
  dispatch(createWorkHistoryLoading())
  fetch(`${ApiLink}/create_work_history`, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  })
    .then((res) => res.json())
    .then((data) => dispatch(createWorkHistorySuccess(data.entry || data)))
    .catch((err) => dispatch(createWorkHistoryError(err)))
}

export const updateWorkHistory = (id, entry) => (dispatch) => {
  dispatch(updateWorkHistoryLoading())
  fetch(`${ApiLink}/update_work_history/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(entry),
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  })
    .then((res) => res.json())
    .then((data) => dispatch(updateWorkHistorySuccess(data)))
    .catch((err) => dispatch(updateWorkHistoryError(err)))
}

export const deleteWorkHistory = (id) => (dispatch) => {
  dispatch(deleteWorkHistoryLoading())
  fetch(`${ApiLink}/delete_work_history/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  })
    .then((res) => res.json())
    .then((data) => dispatch(deleteWorkHistorySuccess(data._id || id)))
    .catch((err) => dispatch(deleteWorkHistoryError(err)))
}
