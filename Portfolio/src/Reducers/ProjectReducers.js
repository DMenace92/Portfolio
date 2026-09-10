import {
  C_P_S,
  C_P_L,
  C_P_E,
  F_P_S,
  F_P_L,
  F_P_E,
  C_I_L,
  C_I_S,
  C_I_E,
  U_P_S,
  U_P_L,
  U_P_E,
  D_P_S,
  D_P_L,
  D_P_E,
} from '../Actions/ProjectAction'

const initState = {
  image: [],
  pro: [],
  proLoading: false,
  proError: false,
}

const ProjectReducers = (state = initState, action) => {
  switch (action.type) {
    case C_I_L:
      return {
        projectLoading: true,
      }
    case C_I_S:
      return {
        ...state,
        image: [...state.image, action.payload],
      }
    case C_I_E:
      return {
        projectError: true,
      }
    case C_P_L:
      return {
        ...state,
        proLoading: true,
      }
    case C_P_S:
      return {
        ...state,
        proLoading: false,
        pro: [...state.pro, action.payload],
      }
    case C_P_E:
      return {
        ...state,
        proError: true,
      }
    case F_P_L:
      return {
        ...state,
        proLoading: true,
      }
    case F_P_S:
      return {
        ...state,
        proLoading: false,
        pro: action.payload,
      }
    case F_P_E:
      return {
        ...state,
        proError: true,
      }
    case U_P_L:
      return {
        ...state,
        proLoading: true,
      }
    case U_P_S:
      return {
        ...state,
        proLoading: false,
        pro: state.pro.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      }
    case U_P_E:
      return {
        ...state,
        proError: true,
      }
    case D_P_L:
      return {
        ...state,
        proLoading: true,
      }
    case D_P_S:
      return {
        ...state,
        proLoading: false,
        pro: state.pro.filter((p) => p._id !== action.payload),
      }
    case D_P_E:
      return {
        ...state,
        proError: true,
      }
    default:
      return state
  }
}

export default ProjectReducers
