import React from 'react'
import PropTypes from 'prop-types'
import './CreatorsTile.pcss'
import {Link} from 'react-router'
import classNames from 'classnames'
import {getColourForKey} from '../../../random-colours'
import {ifElse, assoc, prop} from 'ramda'

const styleForCreator = ifElse(
  prop('hasImages'),
  (creator) => assoc('backgroundImage', `url(${prop('thumbnail', creator)})`, {}),
  (creator) => assoc('backgroundColor', getColourForKey(`creator-${prop('id', creator)}`), {})
)

function CreatorsTile(props) {
  const creator = props.creator

  const comicClass = classNames({
    'creator-tile': true,
    'creator-tile--no-images': !creator.hasImages,
    'creator-tile--large': props.large,
  })

  return (
    <Link to={`/creators/${creator.id}`} className={comicClass}>
      <div className="creator-tile__image" style={styleForCreator(creator)}>
        {creator.hasImages && <img src={creator.thumbnail}/>}
      </div>
      <div className="creator-tile__detail">
        <h3>{creator.suffix && `(${creator.suffix})`} {creator.fullName}</h3>
      </div>
    </Link>
  )
}

CreatorsTile.propTypes = {
  creator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    suffix: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    hasImages: PropTypes.bool.isRequired,
  }),
}

export default CreatorsTile