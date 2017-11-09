/**
 * idealy, the gql should be in *.gql or *.graphql file. 
 * but that would require extra loader on webpack,
 * and other components us js to control it, so ...
 */


import { gql } from 'react-apollo'

export const LOGIN_QUERY = gql`
query loginQuery($credential:UserCredentialInput!){
  login(credential:$credential){
    email
  }
}
`
export const IS_USER_EXIST_QUERY=gql`
query isUserExist($email:String!){
  isEmailRegistered(email:$email){
    isUserExist
  }
}
`
