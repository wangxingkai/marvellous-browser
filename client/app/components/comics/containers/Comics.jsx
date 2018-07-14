import React from 'react'
import ComicsTile from '../components/ComicsTile.jsx'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import { connect } from 'react-redux'
import { loadMoreComics } from '../actions'
import compose from 'ramda/src/compose'
import pick from 'ramda/src/pick'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroller'
import {
  COMICS_LOAD_MORE_LIMIT
} from '../constants'

const getComics = pathOr([], ['comics', 'data'])
const viewingComicId = pathOr(false, ['params', 'id'])


const getNumberOfComics = pathOr(0, ['comics', 'data', 'length'])
const getOrderBy = path(['comics', 'orderBy'])
const getTitleStartsWith = path(['comics', 'titleStartsWith'])
const getCharacterIds = path(['comics', 'characterIds'])
const getHasMore = path(['comics', 'hasMore'])

export const getComicsQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'titleStartsWith',
  'characterIds'
]), pathOr({}, ['comics']))

const getLoadMoreComicsQueryOptions = (props) => {
  return {
    titleStartsWith: getTitleStartsWith(props),
    characterIds: getCharacterIds(props),
    start: getNumberOfComics(props),
    limit: COMICS_LOAD_MORE_LIMIT,
    orderBy: getOrderBy(props)
  }
}
class ComicsRenderer extends React.Component {

  loadData(page) {
    this.props.dispatch(loadMoreComics(getLoadMoreComicsQueryOptions(this.props)))
  }

  render () {
    if (viewingComicId(this.props)) {
      return this.props.children
    }

    const comics = getComics(this.props)
    return (
      <div>
        <Helmet>
          <title>Comics | Marvellous</title>
        </Helmet>
        <InfiniteScroll
          className="comics"
          pageStart={0}
          loadMore={this.loadData.bind(this)}
          hasMore={getHasMore(this.props)}
        >
          {comics &&
            comics.map((comic) => <ComicsTile key={comic.id} comic={comic}/>)
          }
        </InfiniteScroll>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    comics: state.comics
  }
})(ComicsRenderer)
