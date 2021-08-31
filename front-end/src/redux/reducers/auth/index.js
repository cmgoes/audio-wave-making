// **  Initial State
const userData = JSON.parse(localStorage.getItem("userData"))
const initialState = {
  userData: {},
  activeTab: userData ? 0 : 7
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userData: action.data }
    case 'LOGOUT':
      return { ...state, userData: {} }
    case 'ACTIVE_TAB':
      return { ...state, activeTab: action.data }
    default:
      return state
  }
}

export default auth
