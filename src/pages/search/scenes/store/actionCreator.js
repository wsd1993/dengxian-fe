import * as constants from './constants'

export const setPropTags = (data) => {
  return {
    type: constants.SCENES_PROPTAGS,
    data
  }
}

export const setTimeTags = (data) => {
  return {
    type: constants.SCENES_TIMETAGS,
    data
  }
}

export const setTypeTags = (data) => {
  return {
    type: constants.SCENES_TYPETAGS,
    data
  }
}

export const setCharacTags = (data) => {
  return {
    type: constants.SCENES_CHARACTAGS,
    data
  }
}

export const setPropsList = (data) => {
  return {
    type: constants.SCENES_PROPSLIST,
    data
  }
}

export const setTimeList = (data) => {
  return {
    type: constants.SCENES_TIMELIST,
    data
  }
}

export const setTypeList = (data) => {
  return {
    type: constants.SCENES_TYPELIST,
    data
  }
}

export const setCharacList = (data) => {
  return {
    type: constants.SCENES_CHARACLIST,
    data
  }
}

export const setScenesList = (data) => {
  return {
    type: constants.SCENES_SCENESLIST,
    data
  }
}

export const setPageNum = (data) => {
  return {
    type: constants.SCENES_PAGENUM,
    data
  }
}

export const setPageSize = (data) => {
  return {
    type: constants.SCENES_PAGESIZE,
    data
  }
}

export const setTotal = (data) => {
  return {
    type: constants.SCENES_TOTAL,
    data
  }
}