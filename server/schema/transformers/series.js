import R from 'ramda'
import {transformImage} from './images'
import {cleanString} from '../../helpers/clean-string'

export const transformSeries = (rawSeries) => {
  return R.compose(
    R.assoc('hasImages', !R.contains('image_not_available', R.pathOr('', ['thumbnail', 'path'], rawSeries))),
    R.evolve({
      thumbnail: transformImage,
      description: cleanString,
      comics: R.prop('items'),
      characters: R.prop('items'),
      creators: R.prop('items'),
    }),
    R.converge(
      R.assoc('comicsTotal'),
      [
        R.pathOr(0, ['comics', 'available']),
        R.identity
      ]
    ),
    R.pick([
      'id',
      'title',
      'description',
      'thumbnail',
      'comics',
    ])
  )(rawSeries)
}

