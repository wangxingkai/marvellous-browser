import {propOr, pathOr, split, defaultTo, compose, remove, map} from 'ramda'
import URLSearchParams from 'url-search-params'
import {
  COMICS_CHANGE_QUERY,
  COMICS_LOAD_FULFILLED,
  COMICS_LOAD_MORE_FULFILLED,
  COMICS_ORDER_ISSUE_NUMBER_DESC,
  COMICS_SEARCH_ADD_CHARACTER_SUGGESTION,
  COMICS_SEARCH_DELETE_CHARACTER_SUGGESTION,
  COMICS_SEARCH_FETCH_CHARACTER_SUGGESTIONS_FULFILLED,
  COMICS_UPDATE_TITLE_STARTS_WITH
} from './constants'

const getCharacterIdsFromParams = (params, key) => {
  if (!params.characterIds) {
    return []
  }
  return compose(map((id) => ({ id, name: id })), split(','), defaultTo(''))(params.get('characterIds'))(params)
}

const getSeriesIdsFromParams = (params, key) => {
  if (!params.seriesIds) {
    return []
  }
  return compose(map((id) => ({ id, title: id })), split(','), defaultTo(''))(params.get('seriesIds'))(params)
}

// eslint-disable-next-line no-undef
const params = new URLSearchParams(location.search.slice(1))
const initialState = {
  data: [],
  orderBy: params.get('orderBy') || COMICS_ORDER_ISSUE_NUMBER_DESC,
  titleStartsWith: params.get('titleStartsWith') || '',
  characterIds: getCharacterIdsFromParams(params),
  seriesIds: getSeriesIdsFromParams(params),
  characterSuggestions: [],
  limit: params.get('limit') || 12,
  start: params.get('start') || 0,
  hasMore: true
}

const getComicsFromResponse = pathOr([], ['payload', 'data', 'comics'])
const getNumberOfComics = pathOr(0, ['payload', 'data', 'comics', 'length'])

export function comics (
  state = initialState,
  action
) {
  switch (action.type) {

  case COMICS_LOAD_FULFILLED:
    return Object.assign({}, state, {
      data: getComicsFromResponse(action),
      hasMore: !!getNumberOfComics(action)
    })

  case COMICS_LOAD_MORE_FULFILLED:
    return Object.assign({}, state, {
      data: [...state.data, ...getComicsFromResponse(action)],
      hasMore: !!getNumberOfComics(action)
    })

  case COMICS_CHANGE_QUERY: {
    return Object.assign({}, state, {
      orderBy: propOr(state.orderBy, 'orderBy', action.variables),
      titleStartsWith: propOr(state.titleStartsWith, 'titleStartsWith', action.variables),
      characterIds: propOr(state.characterIds, 'characterIds', action.variables),
      seriesIds: propOr(state.seriesIds, 'seriesIds', action.variables)
    })
  }

  case COMICS_UPDATE_TITLE_STARTS_WITH: {
    return Object.assign({}, state, {
      titleStartsWith: action.titleStartsWith
    })
  }

  case COMICS_SEARCH_ADD_CHARACTER_SUGGESTION: {
    return Object.assign({}, state, {
      characterIds: [...state.characterIds, ...[action.suggestion]]
    })
  }

  case COMICS_SEARCH_DELETE_CHARACTER_SUGGESTION: {
    return Object.assign({}, state, {
      characterIds: remove(action.index, 1, state.characterIds)
    })
  }

  case COMICS_SEARCH_FETCH_CHARACTER_SUGGESTIONS_FULFILLED: {
    return Object.assign({}, state, {
      characterSuggestions: action.payload.data.characters
    })
  }

  default:
    return state
  }
}
