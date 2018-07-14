import React from 'react'
import './CreatorControls.pcss'
import { updateCreatorsQuery } from '../../../creators/actions'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import {
  CREATORS_LOAD_MORE_LIMIT,
  CREATORS_ORDER_FIRSTNAME_ASC
} from '../../../creators/constants'
import { toggleToolbarSearch } from '../../actions'

const getNameStartsWith = path(['creators', 'nameStartsWith'])

const orderByVariable = (
  orderBy,
  props
) => {
  return {
    orderBy,
    nameStartsWith: getNameStartsWith(props),
    start: 0,
    limit: CREATORS_LOAD_MORE_LIMIT
  }
}
const updateCreatorsQueryWithVariable = compose(updateCreatorsQuery, orderByVariable)

export function CreatorControls (props) {
  const {
    creators,
    dispatch
  } = props

  return (
    <div className="creator__controls">
      <div className="creator__controls__sorting">
        <label>
          Name
          <input type="radio"
                 name="orderBy"
                 checked={creators.orderBy === CREATORS_ORDER_FIRSTNAME_ASC}
                 onChange={() => dispatch(updateCreatorsQueryWithVariable(CREATORS_ORDER_FIRSTNAME_ASC, props))}
          />
        </label>
      </div>

      <button className="creator__controls__search"
              onClick={() => props.dispatch(toggleToolbarSearch())}>
        <i className="icon-search"/>
      </button>
    </div>
  )
}
