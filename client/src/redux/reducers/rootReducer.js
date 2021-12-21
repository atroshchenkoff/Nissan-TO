import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { serviceInfoReducer } from './serviceInfoReducer'
import { ordersReducer } from './ordersReducer';
import { calendarReducer } from './calendarReducer'
import { adminReducer } from './adminReducer'
import { workerReducer } from './workerReducer'

export const rootReducer = combineReducers({
  userReducer,
  serviceInfoReducer,
  ordersReducer,
  calendarReducer,
  adminReducer,
  workerReducer
})
