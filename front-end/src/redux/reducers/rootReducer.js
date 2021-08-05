// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import audio from './audio'

const rootReducer = combineReducers({
  auth,
  audio
})

export default rootReducer
