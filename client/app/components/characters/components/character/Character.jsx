import React from 'react'
import {gql, graphql} from 'react-apollo'
import pathOr from 'ramda/src/pathOr'
import './Character.pcss'
import length from 'ramda/src/length'
import compose from 'ramda/src/compose'
import propOr from 'ramda/src/propOr'
import {Helmet} from 'react-helmet'
import {updateComicsQuery} from '../../../comics/actions'
import {connect} from 'react-redux'
import Comics from '../../../comics/components/Comics'

const getCharacter = pathOr(false, ['data', 'character'])
const hasComics = compose(length, propOr([], 'comics'))

function MoreComics(props) {
  const {
    character,
    dispatch,
    hasMoreComics
  } = props

  if (!hasMoreComics) {
    return null
  }

  return (
    <button onClick={() => dispatch(updateComicsQuery({
      characterIds: [{
        id: character.id,
        name: character.name
      }]
    }))}
            className="character__comics__view-more">
      More {character.name}
    </button>
  )
}

function ComicsOfCharacter(props) {
  const {
    character,
    dispatch
  } = props

  if (!hasComics(character)) {
    return null
  }

  const comics = character.comics
  const hasMoreComics = character.comicsTotal > comics.length

  return (
    <div className="character__comics">
      <h2>Comics of {character.name}</h2>
      <Comics comics={comics} />
      <MoreComics hasMoreComics={hasMoreComics}
                  character={character}
                  dispatch={dispatch}/>
    </div>
  )
}

function CharacterRenderer(props) {
  const character = getCharacter(props)
  if (!character) {
    return null
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`${character.name} | Characters | Marvellous`}</title>
        <meta property="og:title"
              content={character.name}/>
        <meta property="og:type"
              content="profile"/>
        <meta property="og:url"
              content={window.location.href}/>
        <meta property="og:image"
              content={character.thumbnail}/>
        <meta property="og:description"
              content={character.description}/>
      </Helmet>

      <div className="character character--phone">
        <h1 className="character__namer">{character.name}</h1>
        <div className="character__hero">
          <img src={character.thumbnail}/>
        </div>
        <p className="character__description"
           dangerouslySetInnerHTML={{__html: character.description}}/>
        <ComicsOfCharacter character={character}
                dispatch={props.dispatch}/>
      </div>

      <div className="comic character__portrait-tablet">
        <div className="character__portrait-tablet__wrapper">
          <div className="character__hero">
            <img src={character.thumbnail}/>
          </div>
          <div className="character__portrait-tablet__information">
            <h1 className="character__name">{character.name}</h1>
            <p className="character__description"
               dangerouslySetInnerHTML={{__html: character.description}}/>
          </div>
        </div>
        <ComicsOfCharacter character={character}
                dispatch={props.dispatch}/>
      </div>
    </div>
  )
}

const CHARACTER_QUERY = gql`query ($id: Int!) {
  character(id: $id){
    id
    name
    thumbnail
    description
    comicsTotal
    comics {
      id
      title
      thumbnail
      hasImages
    }
  }
}`

const Character = graphql(CHARACTER_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true
  }
})(CharacterRenderer)

export default connect(() => {
  return {}
})(Character)
