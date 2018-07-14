import React from 'react'
import classNames from 'classnames'
import '../SearchSearch.pcss'
import {
  updateCharactersQuery,
  updateNameStartsWith
} from '../../../characters/actions'

export function CharacterSearch(props) {
  const {
    dispatch,
    showSearch,
    characters: {
      orderBy,
      nameStartsWith
    }
  } = props

  const searchClass = classNames({
    'search__search': true,
    'search__search--show': showSearch
  })

  return (
    <div className={searchClass}>
      <form onSubmit={(event) => {
        event.preventDefault()
        dispatch(updateCharactersQuery({
          nameStartsWith,
          orderBy
        }))
      }}>
        <div className="search__search__inputs">
          <input onChange={(event) => dispatch(updateNameStartsWith(event.target.value))}
                 value={nameStartsWith || ''}
                 placeholder="Names that containing"
                 className="search__search__inputs__input"/>
        </div>
        <button className="search__search__button">
          Go
        </button>
      </form>
    </div>
  )
}
