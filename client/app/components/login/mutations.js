/**
 * idealy, the gql should be in *.gql or *.graphql file. 
 * but that would require extra loader on webpack,
 * and other components us js to control it, so ...
 */


import { gql } from 'react-apollo'

export const CREATE_USER_MUTATION=gql`
mutation createUser($credential:UserCredentialInput!){
  createUser(credential:$credential){
    email
  }
}
`