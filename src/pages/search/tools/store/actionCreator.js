import * as constants from "./constants"

export const setLabelList = (data) => {
  return {
    type: constants.TOOLS_LABELLIST,
    data
  }
}

export const setLabelTags = (data) => {
  return {
    type: constants.TOOLS_LABELTAGS,
    data
  }
}

export const setPageNum = (data) => {
  return {
    type: constants.TOOLS_PAGENUM,
    data
  }
}

export const setPageSize = (data) => {
  return {
    type: constants.TOOLS_PAGESIZE,
    data
  }
}

export const setTotal = (data) => {
  return {
    type: constants.TOOLS_TOTAL,
    data
  }
}

export const setToolsList = (data) => {
  return {
    type: constants.TOOLS_TOOLSLIST,
    data
  }
}