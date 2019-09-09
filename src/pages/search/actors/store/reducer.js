import * as constants from './constants'

let defaultState = {
  sexTags: [],
  ageTags: [],
  nationalTags: [],
  hobbyTags: [],
  hobbyList: [],
  countryList: [],
  // 演员列表搜索结果
  actorList: [],
  pageNum: 1,
  pageSize: 20,
  total: 0
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.ACTOR_SEXTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.sexTags = action.data
        return defaultState = newState
      }
    case constants.ACTOR_AGETAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.ageTags = action.data
        return defaultState = newState
      }
    case constants.ACTOR_NATIONALTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.nationalTags = action.data
        return defaultState = newState
      }
    case constants.ACTOR_HOBBYTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.hobbyTags = action.data
        return defaultState = newState
      }
    case constants.ACTOR_HOBBYLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.hobbyList = action.data
        return defaultState = newState
      }
    case constants.ACTOR_COUNTRYLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.countryList = action.data
        return defaultState = newState
      }
    case constants.ACTOR_ACTORLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.actorList = action.data
        return defaultState = newState
      }
    case constants.ACTOR_PAGENUM:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageNum = action.data
        return defaultState = newState
      }
    case constants.ACTOR_PAGESIZE:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageSize = action.data
        return defaultState = newState
      }
    case constants.ACTOR_TOTAL:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.total = action.data
        return defaultState = newState
      }
    default :
      return state
  }
}