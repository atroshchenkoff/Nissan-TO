import { call, put, takeEvery } from 'redux-saga/effects'
import { SAGA_GET_SERVICE_INFO, SAGA_GET_SERVICE_TYPE} from '../actionTypes/asyncAT/asyncServiseInfoAT'
import {getServiceInfo, getServiceType, showTextMain} from '../actionCreators/serviceInfoAC'
import { useLayoutEffect } from 'react'


const fetchGetServiceInfo = async () => {
  const response = await fetch('/main', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()
  return data
}

function* getServiceInfoWorcker() {
 const serviceInfo = yield call(fetchGetServiceInfo)
 yield put(getServiceInfo(serviceInfo))
}


const fetchGetServiceType = async (action) => {
  const carModelId = action.payload.carModelId
  const milegeId = action.payload.milegeId
  const response = await fetch(`/services?carModelId=${carModelId}&milegeId=${milegeId}`, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()
  return data
}


function* getServiceTypeWorcker(action) {

  const serviceType = yield call(fetchGetServiceType, action)
  yield put(getServiceType(serviceType))
  // yield put(showTextMain())
 }



export function* serviceInfoWatcher() {
  yield takeEvery(SAGA_GET_SERVICE_INFO , getServiceInfoWorcker)
  yield takeEvery(SAGA_GET_SERVICE_TYPE , getServiceTypeWorcker)

}
