import React from 'react'
import './Toolbar.pcss'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import pathOr from 'ramda/src/pathOr'
import any from 'ramda/src/any'
import {toggleToolbar} from '../actions'
import classNames from 'classnames'
import {ComicControls} from './ComicSearch/ComicControls'
import {ComicSearch} from './ComicSearch/ComicSearch'
import {CreatorControls} from './CreatorSearch/CreatorControls'
import {CreatorSearch} from './CreatorSearch/CreatorSearch'
import {CharacterControls} from './CharactersSearch/CharacterControls'
import {CharacterSearch} from './CharactersSearch/CharacterSearch'
import {DetailBack} from './DetailBack'
import UserWidget from '../../login/components/UserWidget';

const getPathname = pathOr('', ['routing', 'locationBeforeTransitions', 'pathname'])
const isOnDetailsPage = () => {
  return any((path) => {
    return (new RegExp(`^${path}/\\d+`)).test(window.location.pathname)
  }, ['/comics', '/characters', '/creators'])
}

function Toolbar(props) {
  const {
    dispatch,
    comics,
    creators,
    characters,
    toolbar: {
      show,
      showSearch
    },
  } = props

  const pathname = getPathname(props)

  // Show Comics load more / other controls iff on the /comics page
  const showComicControls = '/comics' === pathname
  const showCreatorControls = '/creators' === pathname
  const showCharacterControls = '/characters' === pathname
  const toolbarClass = classNames({
    toolbar: true,
    'toolbar--active': show,
    'toolbar--active-search': show && showSearch && (showComicControls || showCreatorControls || showCharacterControls)
  })

  const toolbarToggleClass = classNames({
    'toolbar__toggle': true,
    'toolbar__toggle--is-active': show
  })

  const toolbarBottomClass = classNames({
    'toolbar__bottom': true,
    'toolbar__bottom--is-active': show && showSearch && (showComicControls || showCreatorControls || showCharacterControls)
  })

  // Show the back button if on a detail page
  const showDetailsBackButton = isOnDetailsPage()

  return (
    <div className={toolbarClass}>
      <button className={toolbarToggleClass}
              onClick={() => dispatch(toggleToolbar())}>
        <span>Toggle menu</span>
      </button>
      <div className="toolbar__wrapper">
        <div className="toolbar__top">
          <h1 className="logo">
            <Link to="/"
                  onClick={() => dispatch(toggleToolbar())}>
              <span className="logo__marvel">Marvellous</span>
              <span className="logo__eighties">Browser</span>
            </Link>
          </h1>

          <div className="toolbar__top__links"
                  onClick={() => dispatch(toggleToolbar())}>
            <Link to="/comics"
                  activeClassName="toolbar__top__links--active">
              Comics
            </Link>
            <Link to="/creators"
                  activeClassName="toolbar__top__links--active">
              Creators
            </Link>
            <Link to="/characters"
                  activeClassName="toolbar__top__links--active">
              Characters
            </Link>
            <UserWidget />
          </div>

          {showComicControls && <ComicControls comics={comics}
                                              dispatch={dispatch}/>}
          {showCreatorControls && <CreatorControls creators={creators}
                                              dispatch={dispatch}/>}
          {showCharacterControls && <CharacterControls characters={characters}
                                                  dispatch={dispatch}/>}

          {showDetailsBackButton && <DetailBack/>}

        </div>
        <div className={toolbarBottomClass}>
          {showComicControls && <ComicSearch comics={comics}
                                            dispatch={dispatch}
                                            showSearch={showSearch && showComicControls}/>
          }
          {showCreatorControls && <CreatorSearch creators={creators}
                                                dispatch={dispatch}
                                                showSearch={showSearch && showCreatorControls}/>
          }
          {showCharacterControls && <CharacterSearch characters={characters}
                                                dispatch={dispatch}
                                                showSearch={showSearch && showCharacterControls}/>
          }
        </div>
      </div>
    </div>
  )
}

export default connect((state) => {
  return {
    routing: state.routing,
    comics: state.comics,
    creators: state.creators,
    characters: state.characters,
    toolbar: state.toolbar,
    login:state.login
  }
})(Toolbar)
