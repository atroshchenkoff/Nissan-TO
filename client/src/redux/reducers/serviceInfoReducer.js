import {
  GET_SERVICE_INFO,
  GET_SERVICE_TYPE,
  SET_MODEL_SELECT,
  SET_MILEGE_SELECT,
  SET_STATE_NUMBER,
  SET_YEAR_SELECT,
  HIDE_TEXT_MAIN,
  SHOW_TEXT_MAIN,
  ADD_ADDITIONAL_SERVICE,
  ADD_ADDITIONAL_COMPONENT,
  SET_OWNER_CAR_IN_ORDER,
  IS_CREATE_NEW_CAR_TRUE,
  IS_CREATE_NEW_CAR_FALSE,
} from '../actionTypes/serviceInfoAT'

const yearsCeed = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
  { value: 2018, label: '2018' },
  { value: 2017, label: '2017' },
  { value: 2016, label: '2016' },
  { value: 2015, label: '2015' },
  { value: 2014, label: '2014' },
  { value: 2013, label: '2013' },
  { value: 2012, label: '2012' },
  { value: 2011, label: '2011' },
  { value: 2010, label: '2010' },
]

const initialState = {
  mainSelectValue: {
    carModelId: null,
    milegeId: null,
    imgCar: null,
    carModel: null,
  },
  hash: { years: yearsCeed },
  newOrder: {
    carId: null,
    model: null,
    fullServiceId: null,
    timeStart: null,
    serviceId: [],
    addServiceTotalPrice: 0,
    componentId: [],
    addComponentTotalPrice: 0,
    orderAdditionsTotalPrice: 0,
    totalPrice: 0,
  },
  newCar: {
    modelId: null,
    stateNumber: null,
    yearIssue: null,
    milegeId: null,
    isCreate: false,
  },
}

export const serviceInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICE_INFO:
      return {
        ...state,
        allModels: action.payload.allModels,
        allMilege: action.payload.allMilege,
      }
    case SET_MODEL_SELECT:
      const newsetModelState = { ...state }
      newsetModelState.mainSelectValue = { ...state.mainSelectValue }
      newsetModelState.mainSelectValue.carModelId = action.payload
      newsetModelState.mainSelectValue.imgCar = newsetModelState.allModels.find(
        (carModel) => carModel.id === action.payload
      ).photoLink
      newsetModelState.newCar = { ...state.newCar }
      newsetModelState.newCar.modelId = action.payload
      return { ...newsetModelState }

    case SET_MILEGE_SELECT:
      const newsetMilegeState = { ...state }
      newsetMilegeState.mainSelectValue = { ...state.mainSelectValue }
      newsetMilegeState.mainSelectValue.milegeId = action.payload
      newsetMilegeState.newCar = { ...state.newCar }
      newsetMilegeState.newCar.milegeId = action.payload
      return { ...newsetMilegeState }

    case SET_YEAR_SELECT:
      const newsetYearState = { ...state }
      newsetYearState.newCar = { ...state.newCar }
      newsetYearState.newCar.yearIssue = action.payload
      return { ...newsetYearState }

    case SET_STATE_NUMBER:
      const newsetStateNumber = { ...state }
      newsetStateNumber.newCar = { ...state.newCar }
      newsetStateNumber.newCar.stateNumber = action.payload
      return { ...newsetStateNumber }

    case GET_SERVICE_TYPE:
      const newServiceTypeState = { ...state }
      newServiceTypeState.fullService = action.payload.fullService[0]
      newServiceTypeState.components = action.payload.components
      newServiceTypeState.services = action.payload.services.filter(
        (service) => service.price !== 0
      )
      newServiceTypeState.servicesAllPrice = {}
      newServiceTypeState.servicesAllPrice.sumServicesPrice = 0
      newServiceTypeState.fullService.Services.forEach(
        (servicePrice) =>
          (newServiceTypeState.servicesAllPrice.sumServicesPrice +=
            servicePrice.price)
      )
      newServiceTypeState.servicesAllPrice.sumComponentsPrice = 0
      newServiceTypeState.servicesAllPrice.serviceTypeWorckerPrice =
        newServiceTypeState.fullService.duration * 2200
      newServiceTypeState.fullService.Components.forEach(
        (componentPrice) =>
          (newServiceTypeState.servicesAllPrice.sumComponentsPrice +=
            componentPrice.price)
      )
      newServiceTypeState.servicesAllPrice.totalServiceTypePrice = 0
      newServiceTypeState.servicesAllPrice.totalServiceTypePrice =
        newServiceTypeState.servicesAllPrice.serviceTypeWorckerPrice +
        newServiceTypeState.servicesAllPrice.sumComponentsPrice
      newServiceTypeState.mainRecommendation = true
      newServiceTypeState.newOrder.fullServiceId =
        newServiceTypeState.fullService.id
      newServiceTypeState.newOrder.serviceId = []
      newServiceTypeState.newOrder.componentId = []
      newServiceTypeState.newOrder.addServiceTotalPrice = 0
      newServiceTypeState.newOrder.addComponentTotalPrice = 0
      newServiceTypeState.newOrder.orderAdditionsTotalPrice = 0
      newServiceTypeState.newOrder.totalPrice = 0
      newServiceTypeState.newOrder.totalPrice =
        newServiceTypeState.servicesAllPrice.totalServiceTypePrice +
        newServiceTypeState.newOrder.orderAdditionsTotalPrice
      newServiceTypeState.mainSelectValue = { ...state.mainSelectValue }
      newServiceTypeState.mainSelectValue.carModel =
        newServiceTypeState.allModels.find(
          (model) => model.id === newServiceTypeState.fullService.CarModelId
        ).title
      return { ...newServiceTypeState }

    case HIDE_TEXT_MAIN:
      let newHideTextMainState = { ...state }
      newHideTextMainState.mainRecommendation = false
      newHideTextMainState.mainSelectValue.carModelId = null
      newHideTextMainState.mainSelectValue.milegeId = null
      newHideTextMainState.mainSelectValue.imgCar = null
      return { ...newHideTextMainState }

    case SHOW_TEXT_MAIN:
      const newShowTextMainState = { ...state }
      newShowTextMainState.mainRecommendation = true
      return { ...newShowTextMainState }

    case ADD_ADDITIONAL_SERVICE:
      const newAddAdditionalService = { ...state }
      newAddAdditionalService.newOrder = { ...state.newOrder }
      newAddAdditionalService.newOrder.serviceId = [
        ...state.newOrder.serviceId,
        action.payload,
      ]
      let filterStateServices = []
      newAddAdditionalService.newOrder.serviceId.forEach(
        (el) =>
          (filterStateServices = newAddAdditionalService.services.filter(
            (service) => service.id !== el.value
          ))
      )
      newAddAdditionalService.services = filterStateServices
      newAddAdditionalService.newOrder.addServiceTotalPrice = 0
      newAddAdditionalService.newOrder.serviceId.forEach(
        (service) =>
          (newAddAdditionalService.newOrder.addServiceTotalPrice +=
            service.price)
      )
      newAddAdditionalService.newOrder.orderAdditionsTotalPrice =
        newAddAdditionalService.newOrder.addServiceTotalPrice +
        newAddAdditionalService.newOrder.addComponentTotalPrice
      newAddAdditionalService.newOrder.totalPrice =
        newAddAdditionalService.servicesAllPrice.totalServiceTypePrice +
        newAddAdditionalService.newOrder.orderAdditionsTotalPrice

      return { ...newAddAdditionalService }

    case ADD_ADDITIONAL_COMPONENT:
      const newAddAdditionalComponent = { ...state }
      newAddAdditionalComponent.newOrder = { ...state.newOrder }
      newAddAdditionalComponent.newOrder.componentId = [
        ...state.newOrder.componentId,
        action.payload,
      ]
      let filterStateComponents = []
      newAddAdditionalComponent.newOrder.componentId.forEach(
        (el) =>
          (filterStateComponents = newAddAdditionalComponent.components.filter(
            (component) => component.id !== el.value
          ))
      )
      newAddAdditionalComponent.components = filterStateComponents
      newAddAdditionalComponent.newOrder.addComponentTotalPrice = 0
      newAddAdditionalComponent.newOrder.componentId.forEach(
        (component) =>
          (newAddAdditionalComponent.newOrder.addComponentTotalPrice +=
            component.price)
      )
      newAddAdditionalComponent.newOrder.orderAdditionsTotalPrice =
        newAddAdditionalComponent.newOrder.addServiceTotalPrice +
        newAddAdditionalComponent.newOrder.addComponentTotalPrice
      newAddAdditionalComponent.newOrder.totalPrice =
        newAddAdditionalComponent.servicesAllPrice.totalServiceTypePrice +
        newAddAdditionalComponent.newOrder.orderAdditionsTotalPrice
      return { ...newAddAdditionalComponent }

    case SET_OWNER_CAR_IN_ORDER:
      const newSetOwnerCarInOrderState = { ...state }
      newSetOwnerCarInOrderState.newOrder = { ...state.newOrder }
      newSetOwnerCarInOrderState.newOrder.carId = action.payload.carId
      newSetOwnerCarInOrderState.newOrder.model = action.payload.label
      return { ...newSetOwnerCarInOrderState }

    case IS_CREATE_NEW_CAR_TRUE:
      return {
        ...state,
        newCar: { ...state.newCar, isCreate: action.payload },
      }

    case IS_CREATE_NEW_CAR_FALSE:
      return {
        ...state,
        newCar: { ...state.newCar, isCreate: action.payload },
      }
    default:
      return state
  }
}
