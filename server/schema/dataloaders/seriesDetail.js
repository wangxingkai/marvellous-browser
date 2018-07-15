import DataLoader from 'dataloader'
import R from 'ramda'
import {extractIdFromURI} from '../../helpers/extract-id-from-uri'
import {seriesLoader} from './series'
import {comicLoader} from './comic'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getId = R.compose(
  extractIdFromURI,
  R.prop('resourceURI')
)

const seriesDetailDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const series = await seriesLoader.load(id)

      series.comics = await comicLoader.loadMany(R.map(getId, series.comics))

      return series
    } catch (error) {
      throw new Error(`Failed to fetch series with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const seriesDetailLoader = new RedisDataLoaderConstructor('series-detail', seriesDetailDataLoader)
