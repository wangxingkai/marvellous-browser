import React from 'react'
import { browserHistory } from 'react-router'
import './DetailBack.pcss'
import ifElse from 'ramda/src/ifElse'
import isNil from 'ramda/src/isNil'
import split from 'ramda/src/split'
import head from 'ramda/src/head'
import compose from 'ramda/src/compose'
import reject from 'ramda/src/reject'
import isEmpty from 'ramda/src/isEmpty'

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
