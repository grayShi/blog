import { createContext } from 'react'

export const SHOW_LOADING = 'show loading mask'
export const SET_LOADING = 'set loading mask'
export const HIDE_LOADING = 'hide loading mask'
export const CLEAR_LOADING = 'clear loading mask'
export const PageContext = createContext({})
PageContext.displayName = 'MyDisplayName'

export const Reducer = (state, action) => {
  switch (action) {
    case SHOW_LOADING:
      return state + 1
    case SET_LOADING:
      return 1
    case HIDE_LOADING:
      return state > 0 ? state - 1 : 0
    case CLEAR_LOADING:
      return 0
    default:
      return state
  }
}
