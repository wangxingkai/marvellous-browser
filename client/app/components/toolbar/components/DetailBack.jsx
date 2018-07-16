import React from 'react'
import { browserHistory } from 'react-router'
import './DetailBack.pcss'
import {ifElse, isNil, split, head, compose, reject, isEmpty} from 'ramda'

const getSubjectRoot = compose(head, reject(isEmpty), split('/'))
const goBackOrToSubjectRoot = ifElse(
  isNil,
  () => browserHistory.push(`/${getSubjectRoot(window.location.pathname)}`),
  browserHistory.goBack
)

export function DetailBack () {
  return (
    <a className="detail__back-button"
       onClick={() => goBackOrToSubjectRoot(browserHistory.getCurrentLocation().key)}>
      <i className="icon-left"/>
    </a>
  )
}
