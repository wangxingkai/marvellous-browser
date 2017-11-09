import {
  LOGIN_USER_LOGIN_FULFILLED,
  LOGIN_USER_LOGOUT
} from './constants'

const initialState = {
  errorMessage: null,
  user: {
    email: null
  }
}

export function login(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOGIN_USER_LOGIN_FULFILLED: {
      const { email } = Object.values(
        payload.data
      )[0]
      if (email === null) {
        return Object.assign({}, state, {
          errorMessage: 'wrong username/password'
        })
      }

      return Object.assign({}, state, {
        user: { email }
      })
    }

    case LOGIN_USER_LOGOUT:
      return Object.assign(
        {},
        state,
        initialState
      )

    default:
      return state
  }
}
