import { push, go } from 'react-router-redux'
import { STORE } from './reducer'

export default function (params = {}) {
  if (params.back) {
    const amount = params.back === true ? -1 : -(Math.abs(params.back))
    return STORE.dispatch(go(amount))
  }

  if (params.forward) {
    const amount = params.forward === true ? 1 : Math.abs(params.forward)
    return STORE.dispatch(go(amount))
  }

  if (params.replace) {
    const newParams = { ...params }
    delete newParams.replace

    return STORE.dispatch(push(newParams))
  }

  const state = STORE.getState()
  const location = state.routing.locationBeforeTransitions

  const newParams = Object.assign({}, {
    hash: location.hash,
    pathname: location.pathname
  }, params)

  newParams.query = Object.assign({}, location.query, newParams.query)
  return STORE.dispatch(push(newParams))
}
