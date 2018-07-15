import {COMICS_ORDER_ISSUE_NUMBER_DESC} from '../constants'
import {comicsLoader} from './dataloaders/comics'
import {comicLoader} from './dataloaders/comic'
import {seriesLoader} from './dataloaders/series'
import {charactersLoader} from './dataloaders/characters'
import {characterLoader} from './dataloaders/character'
import {creatorsLoader} from './dataloaders/creators'
import {creatorLoader} from './dataloaders/creator'
import R from 'ramda'
import {extractIdFromURI} from '../helpers/extract-id-from-uri'

const getId = R.compose(
  extractIdFromURI,
  R.prop('resourceURI')
)

export const resolvers = {
  Comic: {
    series(comic, args, ctx, info) {
      return seriesLoader.load(getId(comic.series))
    },
    characters(comic, args, ctx, info) {
      return characterLoader.loadMany(R.map(getId, comic.characters))
    },
    creators(comic, args, ctx, info) {
      return creatorLoader.loadMany(R.map(getId, comic.creators))
    }
  },
  Series: {
    comics(series, args, ctx, info) {
      return comicLoader.loadMany(R.map(getId, series.comics))
    }
  },
  Character: {
    comics(character, args, ctx, info) {
      return comicLoader.loadMany(R.map(getId, character.comics))
    }
  },
  Creator: {
    comics(creator, args, ctx, info) {
      return comicLoader.loadMany(R.map(getId, creator.comics))
    }
  },
  Query: {
    creator(
      obj,
      {id}
    ) {
      return creatorLoader.load(id)
    },

    creators(
      obj,
      {
        start,
        limit,
        orderBy,
        nameStartsWith = false
      }
    ) {
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }

      if (nameStartsWith) {
        keys.nameStartsWith = nameStartsWith
      }

      return creatorsLoader.load(JSON.stringify(keys))
    },

    comic(
      obj,
      {id}
    ) {
      return comicLoader.load(id)
    },

    comics(
      obj,
      {
        start,
        limit,
        orderBy = COMICS_ORDER_ISSUE_NUMBER_DESC,
        titleStartsWith = false,
        characterIds = false,
        seriesIds = false
      }
    ) {
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }

      if (titleStartsWith) {
        keys.titleStartsWith = titleStartsWith
      }

      if (characterIds && R.length(characterIds)) {
        keys.characters = R.join(',', characterIds)
      }

      if (seriesIds && R.length(seriesIds)) {
        keys.series = R.join(',', seriesIds)
      }

      return comicsLoader.load(JSON.stringify(keys))
    },

    series(
      obj,
      {id}
    ) {
      return seriesLoader.load(id)
    },

    character(
      obj,
      {id}
    ) {
      return characterLoader.load(id)
    },

    characters(
      obj,
      {
        start,
        limit,
        orderBy,
        nameStartsWith = false
      }
    ) {
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }

      if (nameStartsWith) {
        keys.nameStartsWith = nameStartsWith
      }

      return charactersLoader.load(JSON.stringify(keys))
    },

    login: (
      _,
      { credential },
      { userStore }
    ) => ({
      email: userStore.login(credential)
    }),
    isEmailRegistered: (
      _,
      { email },
      { userStore }
    ) => ({
      isUserExist: userStore.isUserExist(email)
    })
  },
  Mutation: {
    createUser: (
      _,
      { credential },
      { userStore }
    ) => userStore.register(credential)
  }
}
