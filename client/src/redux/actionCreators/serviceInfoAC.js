import {
  GET_SERVICE_INFO,
  GET_SERVICE_TYPE,
  SET_MODEL_SELECT,
  SET_MILEGE_SELECT,
  SET_YEAR_SELECT,
  SET_STATE_NUMBER,
  HIDE_TEXT_MAIN,
  SHOW_TEXT_MAIN,
  ADD_ADDITIONAL_SERVICE,
  ADD_ADDITIONAL_COMPONENT,
  SET_OWNER_CAR_IN_ORDER,
  IS_CREATE_NEW_CAR_TRUE,
  IS_CREATE_NEW_CAR_FALSE,

} from '../actionTypes/serviceInfoAT'

export const getServiceInfo = (payload) => {
  return {
    type: GET_SERVICE_INFO,
    payload,
  }
}

export const getServiceType = (payload) => {
  return {
    type: GET_SERVICE_TYPE,
    payload,
  }
}

export const setModelSelect = (payload) => {
  return {
    type: SET_MODEL_SELECT,
    payload,
  }
}

export const setMilegeSelect = (payload) => {
  return {
    type: SET_MILEGE_SELECT,
    payload,
  }
}

export const setYearSelectAC = (payload) => {
  return {
    type: SET_YEAR_SELECT,
    payload,
  }
}

export const setStateNumberAC = (payload) => {
  return {
    type: SET_STATE_NUMBER,
    payload,
  }
}

export const hideTextMain = () => {
  return {
    type: HIDE_TEXT_MAIN,
  }
}

export const showTextMain = () => {
  return {
    type: SHOW_TEXT_MAIN,
  }
}

export const addAdditionalServiceAC = (payload) => {
  return {
    type: ADD_ADDITIONAL_SERVICE,
    payload,
  }
}

export const addAdditionalComponentAC = (payload) => {
  return {
    type: ADD_ADDITIONAL_COMPONENT,
    payload,
  }
}

export const setOwnerCarInOrderAC = (payload) => {
  return {
    type: SET_OWNER_CAR_IN_ORDER,
    payload,
  }
}

export const setIsCreateNewCarTrue = (payload) => {
  return {
    type: IS_CREATE_NEW_CAR_TRUE,
    payload
  }
}

export const setIsCreateNewCarFalse = (payload) => {
  return {
    type: IS_CREATE_NEW_CAR_FALSE,
    payload
  }
}
