// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import audio from './audio'
import color from './color'
import style from './style'

const rootReducer = combineReducers({
  auth,
  audio,
  color,
  style
})

export default rootReducer
