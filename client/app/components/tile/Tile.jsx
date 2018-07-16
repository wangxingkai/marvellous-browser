import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'
import {ifElse, assoc, prop} from 'ramda'
import { getColourForKey } from '../../random-colours'
import './Tile.pcss'

const styleForCreator = ifElse(
  prop('hasImages'),
  (props) => assoc('backgroundImage', `url(${prop('thumbnail', props)})`, {}),
  (props) => assoc('backgroundColor', getColourForKey(`tile-${prop('id', props)}`), {})
)

function Tile(props) {

  const tileClass = classNames({
    'tile': true,
    'tile--no-images': !props.hasImages,
    'tile--large': props.large,
  })

  return (
    <Link to={props.url} className={tileClass}>
      <div className="tile__image" style={styleForCreator(props)}>
        {props.hasImages && <img src={props.thumbnail}/>}
      </div>
      <div className="tile__detail">
        <h3>{props.title}</h3>
      </div>
    </Link>
  )
}

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  hasImages: PropTypes.bool.isRequired,
  large: PropTypes.bool,
}

export default Tile

