import React from 'react'
import CreatorsTile from './CreatorsTile.jsx'
import {pathOr, path, compose, pick} from 'ramda'
import './Creators.pcss'
import { connect } from 'react-redux'
import { loadMoreCreators } from '../actions'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroller'
import {
  CREATORS_LOAD_MORE_LIMIT,
} from '../constants'

const getCreatorsList = pathOr([], ['creators', 'list'])
const getCreatorsData = pathOr({}, ['creators', 'data'])
const viewingCreatorId = pathOr(false, ['params', 'id'])

const getNumberOfComics = pathOr(0, ['creators', 'list', 'length'])
const getOrderBy = path(['creators', 'orderBy'])
const getNameStartsWith = path(['creators', 'nameStartsWith'])
const getHasMore = path(['creators', 'hasMore'])

export const getCreatorsQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'nameStartsWith'
]), pathOr({}, ['creators']))

const getLoadMoreCreatorsQueryOptions = (props) => {
  return {
    nameStartsWith: getNameStartsWith(props),
    start: getNumberOfComics(props),
    limit: CREATORS_LOAD_MORE_LIMIT,
    orderBy: getOrderBy(props)
  }
}

class CreatorsRenderer extends React.Component {

  loadData(page) {
    this.props.dispatch(loadMoreCreators(getLoadMoreCreatorsQueryOptions(this.props)))
  }

  renderCreators() {
    const creatorsList = getCreatorsList(this.props)
    const creatorsData = getCreatorsData(this.props)

    return creatorsList && creatorsList.map((creatorId) => {
      const creator = creatorsData[creatorId]
      return <CreatorsTile key={creator.id} creator={creator}/>
    })
  }

  render () {
    if (viewingCreatorId(this.props)) {
      return this.props.children
    }

    return (
      <div>
        <Helmet>
          <title>Creators | Marvellous</title>
        </Helmet>
        <InfiniteScroll
          className="creators"
          pageStart={0}
          loadMore={this.loadData.bind(this)}
          hasMore={getHasMore(this.props)}
        >
        {this.renderCreators()}
        </InfiniteScroll>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    creators: state.creators
  }
})(CreatorsRenderer)
