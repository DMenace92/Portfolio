import {
  F_WH_S,
  F_WH_L,
  F_WH_E,
  C_WH_S,
  C_WH_L,
  C_WH_E,
  U_WH_S,
  U_WH_L,
  U_WH_E,
  D_WH_S,
  D_WH_L,
  D_WH_E,
} from '../Actions/WorkHistoryAction'

const initState = {
  entries: [],
  loading: false,
  error: false,
}

const WorkHistoryReducers = (state = initState, action) => {
  switch (action.type) {
    case F_WH_L:
    case C_WH_L:
    case U_WH_L:
    case D_WH_L:
      return { ...state, loading: true, error: false }

    case F_WH_S:
      return { ...state, loading: false, entries: action.payload }

    case C_WH_S:
      return {
        ...state,
        loading: false,
        entries: [...state.entries, action.payload],
      }

    case U_WH_S:
      return {
        ...state,
        loading: false,
        entries: state.entries.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      }

    case D_WH_S:
      return {
        ...state,
        loading: false,
        entries: state.entries.filter((e) => e._id !== action.payload),
      }

    case F_WH_E:
    case C_WH_E:
    case U_WH_E:
    case D_WH_E:
      return { ...state, loading: false, error: true }

    default:
      return state
  }
}

export default WorkHistoryReducers
