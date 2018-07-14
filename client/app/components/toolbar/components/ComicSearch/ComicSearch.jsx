import React from 'react'
import classNames from 'classnames'
import '../SearchSearch.pcss'
import './ComicSearch.pcss'
import {
  addComicSearchCharacterSuggestion, deleteComicSearchCharacterSuggestion, fetchComicSearchCharacterSuggestions,
  updateComicsQuery,
  updateTitleStartsWith
} from '../../../comics/actions'
import ReactTags from 'react-tag-autocomplete'

export function ComicSearch(props) {
  const {
    dispatch,
    showSearch,
    comics: {
      orderBy,
      titleStartsWith,
      characterSuggestions,
      characterIds
    }
  } = props

  const searchClass = classNames({
    'comic__search': true,
    'search__search': true,
    'search__search--show': showSearch
  })

  return (
    <div className={searchClass}>
      <form onSubmit={(event) => {
        event.preventDefault()
        dispatch(updateComicsQuery({
          titleStartsWith,
          orderBy,
          characterIds
        }))
      }}>
        <div className="search__search__inputs">
          <ReactTags placeholder="Including which character"
                     autoresize={false}
                     autofocus={false}
                     maxSuggestionsLength={5}
                     tags={characterIds}
                     suggestions={characterSuggestions}
                     handleDelete={(index) => dispatch(deleteComicSearchCharacterSuggestion(index, {characterIds}))}
                     handleAddition={(tag) => dispatch(addComicSearchCharacterSuggestion(tag, {characterIds}))}
                     handleInputChange={(input) => dispatch(fetchComicSearchCharacterSuggestions(input))}
          />
          <input onChange={(event) => dispatch(updateTitleStartsWith(event.target.value))}
                 value={titleStartsWith || ''}
                 placeholder="Titles that start with"
                 className="search__search__inputs__input"/>
        </div>
        <button className="search__search__button">
          Go
        </button>
      </form>
    </div>
  )
}
