import * as constants from './constants'

let defaultState = {
  labelList: [],
  labelTags: [],
  // 搜索结果
  pageNum: 1,
  pageSize: 20,
  total: 0,
  toolsList: []
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.TOOLS_LABELLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.labelList = action.data
        return defaultState = newState
      }
    case constants.TOOLS_LABELTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.labelTags = action.data
        return defaultState = newState
      }
    case constants.TOOLS_PAGENUM:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageNum = action.data
        return defaultState = newState
      }
    case constants.TOOLS_PAGESIZE:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageSize = action.data
        return defaultState = newState
      }
    case constants.TOOLS_TOTAL:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.total = action.data
        return defaultState = newState
      }
    case constants.TOOLS_TOOLSLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.toolsList = action.data
        return defaultState = newState
      }
    default:
      return state
  }
}