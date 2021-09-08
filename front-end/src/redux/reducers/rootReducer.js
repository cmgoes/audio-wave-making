// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import audio from './audio'
import color from './color'
import style from './style'
import text from './text'

const rootReducer = combineReducers({
  auth,
  audio,
  color,
  style,
  text
})

export default rootReducer
