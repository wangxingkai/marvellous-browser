import {marvel} from '../../marvel'
import DataLoader from 'dataloader'
import {transformSeries} from '../transformers/series'
import R from 'ramda'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getData = R.pathOr({}, ['data', 0])
const seriesDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      return transformSeries(getData(await marvel.series.find(id)))
    } catch (error) {
      throw new Error(`Failed to fetch series with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const seriesLoader = new RedisDataLoaderConstructor('series', seriesDataLoader)
