const ApiLink = process.env.REACT_APP_API_URL || ''

const authHeader = () => {
  const token = window.localStorage.getItem('authToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const C_P_S = 'C_P_S'
const createPorjectSuccess = (pro) => ({ type: C_P_S, payload: pro })

export const C_P_L = 'C_P_L'
const createProjectLoading = () => ({ type: C_P_L })

export const C_P_E = 'C_P_E'
const createProjectError = () => ({ type: C_P_E })

export const C_I_S = 'C_I_S'
const createImageSuccess = (pro) => ({ type: C_I_S, payload: pro })

export const C_I_L = 'C_I_L'
const createImageLoading = () => ({ type: C_I_L })

export const C_I_E = 'C_I_E'
const createImageError = () => ({ type: C_I_E })

export const F_P_S = 'F_P_S'
const fetchPorjectSuccess = (pro) => ({ type: F_P_S, payload: pro })

export const F_P_L = 'F_P_L'
const fetchProjectLoading = () => ({ type: F_P_L })

export const F_P_E = 'F_P_E'
const fetchProjectError = () => ({ type: F_P_E })

export const U_P_S = 'U_P_S'
const updatePorjectSuccess = (pro) => ({
  type: U_P_S,
  payload: pro,
})

export const U_P_L = 'U_P_L'
const updateProjectLoading = () => ({ type: U_P_L })

export const U_P_E = 'U_P_E'
const updateProjectError = () => ({ type: U_P_E })

export const D_P_S = 'D_P_S'
const deletePorjectSuccess = (pro) => ({ type: D_P_S, payload: pro })

export const D_P_L = 'D_P_L'
const deleteProjectLoading = () => ({ type: D_P_L })

export const D_P_E = 'D_P_E'
const deleteProjectError = () => ({ type: D_P_E })

//thunk

export const createImage = (pro) => (dispatch) => {
  dispatch(createImageLoading())
  fetch(`${ApiLink}/create_image`, {
    method: 'POST',
    body: pro,
  })
    .then((res) => res.json())
    .then((pro) => {
      dispatch(createImageSuccess(pro))
    })
    .catch((err) => {
      dispatch(createImageError(err))
    })
}

//create function
export const createProject = (pro) => (dispatch) => {
  dispatch(createProjectLoading())
  fetch(`${ApiLink}/create_project`, {
    method: 'POST',
    body: JSON.stringify(pro),
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(createPorjectSuccess(data.project || data))
    })
    .catch((err) => {
      dispatch(createProjectError(err))
    })
}
//fetch
export const fetchProject = () => (dispatch) => {
  dispatch(fetchProjectLoading())
  fetch(`${ApiLink}/get_projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((pro) => {
      dispatch(fetchPorjectSuccess(pro))
    })
    .catch((err) => {
      dispatch(fetchProjectError(err))
    })
}

export const updateProject = (proID, pro) => (dispatch) => {
  dispatch(updateProjectLoading())
  fetch(`${ApiLink}/update_project/${proID}`, {
    method: 'PATCH',
    body: JSON.stringify(pro),
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  })
    .then((res) => res.json())
    .then((pro) => {
      dispatch(updatePorjectSuccess(pro))
    })
    .catch((err) => {
      dispatch(updateProjectError(err))
    })
}

export const fetchProjectById = (proID) => {
  return fetch(`${ApiLink}/get_project/${proID}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
}

export const deleteProject = (proID) => (dispatch) => {
  dispatch(deleteProjectLoading())
  fetch(`${ApiLink}/delete_project/${proID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(deletePorjectSuccess(data._id || proID))
    })
    .catch((err) => {
      dispatch(deleteProjectError(err))
    })
}
