import * as constants from './constants'

export const setNameTags = (data) => {
  return {
    type: constants.CUSTOM_NAMETAGS,
    data
  }
}

export const setSexTags = (data) => {
  return {
    type: constants.CUSTOM_SEXTAGS,
    data
  }
}

export const setAgeTags = (data) => {
  return {
    type: constants.CUSTOM_AGETAGS,
    data
  }
}

export const setTypeTags = (data) => {
  return {
    type: constants.CUSTOM_TYPETAGS,
    data
  }
}

export const setLabelTags = (data) => {
  return {
    type: constants.CUSTOM_LABELTAGS,
    data
  }
}

export const setChannelTags = (data) => {
  return {
    type: constants.CUSTOM_CHANNELTAGS,
    data
  }
}

export const setNameList = (data) => {
  return {
    type: constants.CUSTOM_NAMELIST,
    data
  }
}

export const setSexList = (data) => {
  return {
    type: constants.CUSTOM_SEXLIST,
    data
  }
}

export const setAgeList = (data) => {
  return {
    type: constants.CUSTOM_AGELIST,
    data
  }
}

export const setTypeList = (data) => {
  return {
    type: constants.CUSTOM_TYPELIST,
    data
  }
}

export const setLabelList = (data) => {
  return {
    type: constants.CUSTOM_LABELLIST,
    data
  }
}

export const setChannelList = (data) => {
  return {
    type: constants.CUSTOM_CHANNELLIST,
    data
  }
}

export const setSceneList = (data) => {
  return {
    type: constants.CUSTOM_SCENESLIST,
    data
  }
}

export const setPageNum = (data) => {
  return {
    type: constants.CUSTOM_PAGENUM,
    data
  }
}

export const setPageSize = (data) => {
  return {
    type: constants.CUSTOM_PAGESIZE,
    data
  }
}

export const setTotal = (data) => {
  return {
    type: constants.CUSTOM_TOTAL,
    data
  }
}