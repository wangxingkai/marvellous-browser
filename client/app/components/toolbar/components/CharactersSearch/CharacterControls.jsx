import React from 'react'
import './CharacterControls.pcss'
import { updateCharactersQuery } from '../../../characters/actions'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import {
  CHARACTERS_LOAD_MORE_LIMIT,
  CHARACTERS_ORDER_NAME_ASC
} from '../../../characters/constants'
import { toggleToolbarSearch } from '../../actions'

const getNameStartsWith = path(['characters', 'nameStartsWith'])

const orderByVariable = (
  orderBy,
  props
) => {
  return {
    orderBy,
    nameStartsWith: getNameStartsWith(props),
    start: 0,
    limit: CHARACTERS_LOAD_MORE_LIMIT
  }
}
const updateCharactersQueryWithVariable = compose(updateCharactersQuery, orderByVariable)

export function CharacterControls (props) {
  const {
    characters,
    dispatch
  } = props

  return (
    <div className="creator__controls">
      <div className="creator__controls__sorting">
        <label>
          Name
          <input type="radio"
                 name="orderBy"
                 checked={characters.orderBy === CHARACTERS_ORDER_NAME_ASC}
                 onChange={() => dispatch(updateCharactersQueryWithVariable(CHARACTERS_ORDER_NAME_ASC, props))}
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
