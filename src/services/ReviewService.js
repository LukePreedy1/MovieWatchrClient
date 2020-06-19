import {API_URL} from '../constants'

export const createReview = async (username, imdbID, review) => {
    const response = await fetch(`${API_URL}/users/${username}/media/${imdbID}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    })
    return response.json();
}

export const updateReview = async (username, mediaId, review) => {
    const response = await fetch(`${API_URL}/users/${username}/media/${mediaId}/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    })
    return response.json();
}

export const deleteReview = async (reviewId) => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    return response.json()
}

export const findReviewById = async (reviewId) => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`);
    return response.json()
}

export const findAllReviews = async () => {
    const response = await fetch(`${API_URL}/reviews`);
    return response.json();
}

export const findAllReviewsByUser = async (username) => {
    const response = await fetch(`${API_URL}/users/${username}/reviews`);
    return response.json();
}

export const findAllReviewsOfMedia = async (mediaId) => {
    const response = await fetch(`${API_URL}/media/${mediaId}/reviews`);
    return response.json();
}

export const findAllReviewsOfMediaByUser = async (username, imdbID) =>
    await fetch(`${API_URL}/media/${imdbID}/reviews/${username}`)
        .then(response => response.json());

export const getAuthor = async (reviewId) => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}/user`)
    return response.json();
}

export const getUsernameOfAuthor = async (reviewId) => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}/author`);
    return response.json().then((data) => data);
}

export const likeReview = async (username, reviewId) =>
    await fetch(`${API_URL}/reviews/${reviewId}/like/${username}`, {
        method: 'PUT'
    }).then(response => response.json());

export const unLikeReview = async (username, reviewId) =>
    await fetch(`${API_URL}/reviews/${reviewId}/unLike/${username}`, {
        method: 'PUT'
    }).then(response => response.json());

export const findAllReviewsOfMediaByFollowing = async (imdbID, username) =>
    await fetch(`${API_URL}/media/${imdbID}/reviews/${username}/following`)
        .then(response => response.json());

export const isReviewLikedByUser = async (reviewId, username) =>
    await fetch(`${API_URL}/reviews/${reviewId}/likedBy/${username}`)
        .then(response => response.json()).then((data) => data);

export const findMostPopularReviews = async () =>
    await fetch(`${API_URL}/reviews/popular`)
        .then(response => response.json())

export const findMostPopularReviewsByFollowed = async (username) =>
    await fetch(`${API_URL}/reviews/popular/${username}`)
        .then(response => response.json())
