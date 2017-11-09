import { pathOr, curry } from 'ramda'
import {
  LOGIN_USER_LOGIN,
  LOGIN_USER_LOGOUT
} from './constants'
import { client } from '../../client'
import {
  IS_USER_EXIST_QUERY,
  LOGIN_QUERY
} from './queries'

import { CREATE_USER_MUTATION } from './mutations'

const isEmailTaken = pathOr(true, [
  'data',
  'isEmailRegistered',
  'isUserExist'
])

export const loginActionCurry = curry(function(
  query,
  mutate,
  credential
) {
  return {
    type: LOGIN_USER_LOGIN,
    // check if user exist
    payload: query({
      query: IS_USER_EXIST_QUERY,
      variables: { email: credential.email }
    }).then(response => {
      return isEmailTaken(response)
        ? // try login
          query({
            query: LOGIN_QUERY,
            variables: { credential }
          })
        : // try create user
          mutate({
            mutation: CREATE_USER_MUTATION,
            variables: { credential }
          })
    })
  }
})
export const loginAction = loginActionCurry(
  client.query
)(client.mutate)

export function logoutAction() {
  return {
    type: LOGIN_USER_LOGOUT
  }
}
