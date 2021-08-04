// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({ type: 'LOGIN', data: data._doc })
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })
  }
}
