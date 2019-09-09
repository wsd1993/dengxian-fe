import * as constants from './constants'

let defaultState = {
  nameTags: [],
  sexTags: [],
  ageTags: [],
  typeTags: [],
  labelTags: [],
  channelTags: [],
  nameList: [],
  sexList: [],
  ageList: [],
  typeList: [],
  labelList: [],
  channelList: [],
  // 搜索结果
  scenesList: [],
  pageNum: 1,
  pageSize: 20,
  total: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CUSTOM_NAMETAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.nameTags = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_SEXTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.sexTags = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_AGETAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.ageTags = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_TYPETAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.typeTags = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_LABELTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.labelTags = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_CHANNELTAGS:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.channelTags = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_NAMELIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.nameList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_SEXLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.sexList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_AGELIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.ageList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_TYPELIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.typeList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_LABELLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.labelList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_CHANNELLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.channelList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_SCENESLIST:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.scenesList = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_PAGENUM:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageNum = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_PAGESIZE:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.pageSize = action.data
        return defaultState = newState
      }
    case constants.CUSTOM_TOTAL:
      {
        const newState = JSON.parse(JSON.stringify(state))
        newState.total = action.data
        return defaultState = newState
      }
    default: 
      return state
  }
}