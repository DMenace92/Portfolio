import { L_S, L_L, L_E } from '../Actions/LoginAction'

const initState = {
  log: [],
  logLoading: false,
  logError: false,
}

const LoginReducers = (state = initState, action) => {
  switch (action.type) {
    case L_L:
      return {
        ...state,
        logLoading: true,
        logError: false,
      }
    case L_S:
      window.localStorage.setItem('authToken', action.payload.token)
      return {
        ...state,
        log: [...state.log, action.payload],
        logLoading: false,
        logError: false,
      }

    case L_E:
      return {
        ...state,
        logLoading: false,
        logError: true,
      }
    default:
      return state
  }
}

export default LoginReducers
