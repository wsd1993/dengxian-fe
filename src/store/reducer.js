import { combineReducers } from 'redux'
import { reducer as actorReducer } from '../pages/search/actors/store'
import { reducer as customReducer } from '../pages/search/custom/store'
import { reducer as toolsReducer } from '../pages/search/tools/store'
import { reducer as scenesReducer } from '../pages/search/scenes/store'

export default combineReducers({
  actorReducer,
  customReducer,
  toolsReducer,
  scenesReducer
})