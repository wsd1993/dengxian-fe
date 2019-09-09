import * as constants from './constants'

// 演员
export const setActorSexTags = (data) => {
  return {
    type: constants.ACTOR_SEXTAGS,
    data
  }
}

export const setActorAgeTags = (data) => {
  return {
    type: constants.ACTOR_AGETAGS,
    data
  }
}

export const setNationalTags = (data) => {
  return {
    type: constants.ACTOR_NATIONALTAGS,
    data
  }
}

export const setHobbyTags = (data) => {
 return {
   type: constants.ACTOR_HOBBYTAGS,
   data
 }
}

export const setHobbyList = (data) => {
  return {
    type: constants.ACTOR_HOBBYLIST,
    data
  }
}

export const setCountryList = (data) => {
  return {
    type: constants.ACTOR_COUNTRYLIST,
    data
  }
}

export const setActorList = (data) => {
  return {
    type: constants.ACTOR_ACTORLIST,
    data
  }
}

export const setPageSize = (data) => {
  return {
    type: constants.ACTOR_PAGESIZE,
    data
  }
}

export const setPageNum = (data) => {
  return {
    type: constants.ACTOR_PAGENUM,
    data
  }
}

export const setTotal = (data) => {
  return {
    type: constants.ACTOR_TOTAL,
    data
  }
}