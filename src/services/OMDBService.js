import {OMDB_API_TITLE_SEARCH, OMDB_API_ID_SEARCH, OMDB_API_ID_SEARCH_FULL} from '../constants'

export const searchForTitle = async (title) => {
    const response = await fetch(OMDB_API_TITLE_SEARCH(title))
    return await response.json()
}

export const getMovieFromID = async (id) => {
    const response = await fetch(OMDB_API_ID_SEARCH(id))
    return await response.json()
}

export const getFullMovieFromID = async (id) => {
    const response = await fetch(OMDB_API_ID_SEARCH_FULL(id))
    return await response.json()
}