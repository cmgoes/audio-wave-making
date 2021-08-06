// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import audio from './audio'
import color from './color'

const rootReducer = combineReducers({
  auth,
  audio,
  color
})

export default rootReducer
