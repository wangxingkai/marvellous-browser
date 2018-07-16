import React from 'react'
import CharactersTile from './CharactersTile.jsx'
import {pathOr, path, compose, pick} from 'ramda'
import './Characters.pcss'
import { connect } from 'react-redux'
import { loadMoreCharacters } from '../actions'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroller'
import {
  CHARACTERS_LOAD_MORE_LIMIT
} from '../constants'

const getCharacters = pathOr([], ['characters', 'data'])
const viewingCharacterId = pathOr(false, ['params', 'id'])

const getNumberOfComics = pathOr(0, ['characters', 'data', 'length'])
const getOrderBy = path(['characters', 'orderBy'])
const getNameStartsWith = path(['characters', 'nameStartsWith'])
const getHasMore = path(['characters', 'hasMore'])

export const getCharactersQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'nameStartsWith'
]), pathOr({}, ['characters']))

const getLoadMoreCharactersQueryOptions = (props) => {
  return {
    nameStartsWith: getNameStartsWith(props),
    start: getNumberOfComics(props),
    limit: CHARACTERS_LOAD_MORE_LIMIT,
    orderBy: getOrderBy(props)
  }
}

class CharactersRenderer extends React.Component {

  loadData(page) {
    this.props.dispatch(loadMoreCharacters(getLoadMoreCharactersQueryOptions(this.props)))
  }

  render () {
    if (viewingCharacterId(this.props)) {
      return this.props.children
    }

    const characters = getCharacters(this.props)
    return (
      <div>
        <Helmet>
          <title>Characters | Marvellous</title>
        </Helmet>
        <InfiniteScroll
          className="characters"
          pageStart={0}
          loadMore={this.loadData.bind(this)}
          hasMore={getHasMore(this.props)}
        >
            {characters && characters.map((character) => <CharactersTile key={character.id} character={character}/>)}
        </InfiniteScroll>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    characters: state.characters
  }
})(CharactersRenderer)
