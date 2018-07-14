import React from 'react'
import './CharactersTile.pcss'
import {Link} from 'react-router'
import classNames from 'classnames'
import {getColourForKey} from '../../../random-colours'
import ifElse from 'ramda/src/ifElse'
import assoc from 'ramda/src/assoc'
import prop from 'ramda/src/prop'

const styleForCharacter = ifElse(
  prop('hasImages'),
  (character) => assoc('backgroundImage', `url(${prop('thumbnail', character)})`, {}),
  (character) => assoc('backgroundColor', getColourForKey(`character-${prop('id', character)}`), {})
)

export default function CharacterTile(props) {
  const character = props.character

  const characterClass = classNames({
    'character-tile': true,
    'character-tile--no-images': !character.hasImages
  })

  return (
    <Link to={`/characters/${character.id}`} className={characterClass}>
      <div className="character-tile__image" style={styleForCharacter(character)}>
        {character.hasImages && <img src={character.thumbnail}/>}
      </div>
      <div className="character-tile__detail">
        <h3>{character.name}</h3>
      </div>
    </Link>
  )
}

