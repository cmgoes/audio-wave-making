import { Root } from "config"

// ** Handle User Login
export const handleLogin = (userData, sessionToken) => {
  localStorage.setItem(Root.key, JSON.stringify(userData))
  localStorage.setItem(Root.sessionKey, JSON.stringify(sessionToken))
  return dispatch => {
    dispatch({ type: 'LOGIN', userData })
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  localStorage.removeItem(Root.key)
  localStorage.removeItem(Root.sessionKey)
  return dispatch => {
    dispatch({ type: 'LOGOUT' })
    location.reload();
  }
}

export const handleActiveTab = (data) => {
  return dispatch => {
    dispatch({ type: 'ACTIVE_TAB', data })
  }
}