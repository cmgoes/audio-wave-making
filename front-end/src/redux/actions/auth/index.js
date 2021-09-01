import { Root } from "config"

// ** Handle User Login
export const handleLogin = data => {
  localStorage.setItem(Root.key, JSON.stringify(data))
  return dispatch => {
    dispatch({ type: 'LOGIN', data })
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  localStorage.removeItem(Root.key)
  return dispatch => {
    dispatch({ type: 'LOGOUT' })
  }
}

export const handleActiveTab = (data) => {
  return dispatch => {
    dispatch({ type: 'ACTIVE_TAB', data })
  }
}