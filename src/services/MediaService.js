import {API_URL} from '../constants'

export const createMedia = async (media) => {
    const response = await fetch(`${API_URL}/media`, {
        method: 'POST',
        body: JSON.stringify(media),
        headers: {
            'content-type': 'application/json'
        }
    })
    return response.json();
}

export const updateMedia = async (media) => {
    const response = await fetch(`${API_URL}/media/${media.id}`, {
        method: 'POST',
        body: JSON.stringify(media),
        headers: {
            'content-type': 'application/json'
        }
    })
    return response.json();
}

export const deleteMedia = async (mediaId) => {
    const response = await fetch(`${API_URL}/media/${mediaId}`, {
        method: 'POST'
    })
    return response.json();
}

export const findMediaById = async (mediaId) => {
    const response = await fetch(`${API_URL}/media/${mediaId}`);
    return response.json();
}

export const findAllMedia = async () => {
    const response = await fetch(`${API_URL}/media`);
    return response.json();
}

export const findMediaByImdbID = async (imdbID) => {
    const response = await fetch(`${API_URL}/media/${imdbID}/imdb`);
    return response.json();
}

export const findMostPopularMedia = async () =>
    await fetch(`${API_URL}/media/popular`)
        .then(response => response.json())

export const findMostPopularMediaByFollowed = async (username) =>
    await fetch(`${API_URL}/media/popular/${username}`)
        .then(response => response.json())
