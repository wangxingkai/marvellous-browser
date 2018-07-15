import React from 'react'
import {gql, graphql} from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import length from 'ramda/src/length'
import compose from 'ramda/src/compose'
import propOr from 'ramda/src/propOr'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {updateComicsQuery} from '../../comics/actions'
import Comics from '../../comics/components/Comics'
import './SeriesDetails.pcss'

const getSeries = pathOr(false, ['data', 'series'])
const hasComics = compose(length, propOr([], 'comics'))

function MoreComics(props) {
  const {
    series,
    dispatch,
    hasMoreComics
  } = props

  if (!hasMoreComics) {
    return null
  }

  return (
    <button onClick={() => dispatch(updateComicsQuery({
      seriesIds: [{
        id: series.id,
        title: series.title
      }]
    }))}
            className="series__comics__view-more">
      More comics in {series.title}
    </button>
  )
}

function ComicsOfSeries(props) {
  const {
    series,
    dispatch
  } = props

  if (!hasComics(series)) {
    return null
  }

  const comics = series.comics
  const hasMoreComics = series.comicsTotal > comics.length

  return (
    <div className="series__comics">
      <h2>Comics in {series.title}</h2>
      <Comics comics={comics} />
      <MoreComics hasMoreComics={hasMoreComics}
                  series={series}
                  dispatch={dispatch}/>
    </div>
  )
}

function SeriesRenderer(props) {
  const series = getSeries(props)
  if (!series) {
    return null
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`${series.title} | Series | Marvellous`}</title>
        <meta property="og:title"
              content={series.title}/>
        <meta property="og:type"
              content="profile"/>
        <meta property="og:url"
              content={window.location.href}/>
        <meta property="og:image"
              content={series.thumbnail}/>
        <meta property="og:description"
              content={series.description}/>
      </Helmet>

      <div className="series series--phone">
        <h1 className="series__namer">{series.title}</h1>
        <div className="series__hero">
          <img src={series.thumbnail}/>
        </div>
        <p className="series__description"
           dangerouslySetInnerHTML={{__html: series.description}}/>
        <ComicsOfSeries series={series}
                dispatch={props.dispatch}/>
      </div>

      <div className="comic series__portrait-tablet">
        <div className="series__portrait-tablet__wrapper">
          <div className="series__hero">
            <img src={series.thumbnail}/>
          </div>
          <div className="series__portrait-tablet__information">
            <h1 className="series__name">{series.title}</h1>
            <p className="series__description"
               dangerouslySetInnerHTML={{__html: series.description}}/>
          </div>
        </div>
        <ComicsOfSeries series={series}
                dispatch={props.dispatch}/>
      </div>
    </div>
  )
}

const SERIES_QUERY = gql`query ($id: Int!) {
  series(id: $id){
    id
    title
    description
    thumbnail
    hasImages
    comicsTotal
    comics {
      id
      title
      thumbnail
      hasImages
    }
  }
}`

const Series = graphql(SERIES_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(SeriesRenderer)

export default connect(() => {
  return {}
})(Series)
