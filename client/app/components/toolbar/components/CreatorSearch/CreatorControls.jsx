import React from 'react'
import '../SearchControls.pcss'
import { updateCreatorsQuery } from '../../../creators/actions'
import {path, compose} from 'ramda'
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
    <div className="search__controls">
      <div className="search__controls__sorting">
        <label>
          Name
          <input type="radio"
                 name="orderBy"
                 checked={creators.orderBy === CREATORS_ORDER_FIRSTNAME_ASC}
                 onChange={() => dispatch(updateCreatorsQueryWithVariable(CREATORS_ORDER_FIRSTNAME_ASC, props))}
          />
        </label>
      </div>

      <button className="search__controls__search"
              onClick={() => props.dispatch(toggleToolbarSearch())}>
        <i className="icon-search"/>
      </button>
    </div>
  )
}
