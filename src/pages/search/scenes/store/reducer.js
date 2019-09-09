import * as constants from "./constants"

let defaultState = {
  propTags: [],
  timeTags: [],
  typeTags: [],
  characTags: [],
  propsList: [],
  timeList: [],
  typeList: [],
  characList: [],
  // 搜索结果
  scenesList: [],
  pageNum: 1,
  pageSize: 20,
  total: 0
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.SCENES_PROPTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.propTags = action.data
        return defaultState = newState
      }
    case constants.SCENES_TIMETAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.timeTags = action.data
        return defaultState = newState
      }
    case constants.SCENES_TYPETAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.typeTags = action.data
        return defaultState = newState
      }
    case constants.SCENES_CHARACTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.characTags = action.data
        return defaultState = newState
      }
    case constants.SCENES_PROPSLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.propsList = action.data
        return defaultState = newState
      }
    case constants.SCENES_TIMELIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.timeList = action.data
        return defaultState = newState
      }
    case constants.SCENES_TYPELIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.typeList = action.data
        return defaultState = newState
      }
    case constants.SCENES_CHARACLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.characList = action.data
        return defaultState = newState
      }
    case constants.SCENES_SCENESLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.scenesList = action.data
        return defaultState = newState
      }
    case constants.SCENES_PAGENUM:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageNum = action.data
        return defaultState = newState
      }
    case constants.SCENES_PAGESIZE:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageSize = action.data
        return defaultState = newState
      }
    case constants.SCENES_TOTAL:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.total = action.data
        return defaultState = newState
      }
    default:
      return state
  }
}