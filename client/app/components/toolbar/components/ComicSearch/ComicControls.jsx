import React from 'react'
import './ComicControls.pcss'
import { updateComicsQuery } from '../../../comics/actions'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import {
  COMICS_LOAD_MORE_LIMIT,
  COMICS_ORDER_ISSUE_NUMBER_DESC,
  COMICS_ORDER_ON_SALE_DATE_DESC,
  COMICS_ORDER_TITLE_ASC
} from '../../../comics/constants'
import { toggleToolbarSearch } from '../../actions'

const getTitleStartsWith = path(['comics', 'titleStartsWith'])
const getCharacterIds = path(['comics', 'characterIds'])

const orderByVariable = (
  orderBy,
  props
) => {
  return {
    orderBy,
    titleStartsWith: getTitleStartsWith(props),
    characterIds: getCharacterIds(props),
    start: 0,
    limit: COMICS_LOAD_MORE_LIMIT
  }
}
const updateComicsQueryWithVariable = compose(updateComicsQuery, orderByVariable)

export function ComicControls (props) {
  const {
    comics,
    dispatch
  } = props

  return (
    <div className="comic__controls">
      <div className="comic__controls__sorting">
        <label>
          Title
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === COMICS_ORDER_TITLE_ASC}
                 onChange={() => dispatch(updateComicsQueryWithVariable(COMICS_ORDER_TITLE_ASC, props))}
          />
        </label>
        <label>
          Sale Date
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === COMICS_ORDER_ON_SALE_DATE_DESC}
                 onChange={() => dispatch(updateComicsQueryWithVariable(COMICS_ORDER_ON_SALE_DATE_DESC, props))}
          />
        </label>
        <label>
          Issue Number
          <input type="radio"
                 name="orderBy"
                 checked={comics.orderBy === COMICS_ORDER_ISSUE_NUMBER_DESC}
                 onChange={() => dispatch(updateComicsQueryWithVariable(COMICS_ORDER_ISSUE_NUMBER_DESC, props))}
          />
        </label>
      </div>

      <button className="comic__controls__search"
              onClick={() => props.dispatch(toggleToolbarSearch())}>
        <i className="icon-search"/>
      </button>
    </div>
  )
}
