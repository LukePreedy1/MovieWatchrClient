import {API_URL} from '../constants'

export const createUser = (user) =>
    fetch(`${API_URL}/users/${user.username}/${user.password}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

export const deleteUser = async (username) =>
    await fetch(`${API_URL}/users/${username}`, {
        method: 'DELETE'
    }).then(response => response.json())

export const checkCredentials = async (username, password) => {
    const response = await fetch(`${API_URL}/users/${username}/credentials/${password}`)
    return response.json().then((data) => data);
}

export const isMediaOnWatchlist = async (username, imdbID) => {
    const response = await fetch(`${API_URL}/users/${username}/onWatchlist/${imdbID}`)
    return response.json().then((data) => data);
}

export const isMediaWatched = async (username, imdbID) => {
    const response = await fetch(`${API_URL}/users/${username}/isWatched/${imdbID}`)
    return response.json().then((data) => data);
}

export const updateUser = async (user, oldPassword) =>
    await fetch(`${API_URL}/users/${user.username}/${oldPassword}/${user.password}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then((data) => data);

export const findUserByUsername = async (username) =>
    await fetch(`${API_URL}/users/${username}`)
        .then(response => response.json());

export const addToWatched = async (username, imdbID) =>
    await fetch(`${API_URL}/users/${username}/watched/${imdbID}`, {
        method: 'PUT'
    }).then(response => response.json());

export const findWatchedMedia = async (username) =>
    await fetch(`${API_URL}/users/${username}/watched`)
        .then(response => response.json());

export const findMediaOnWatchlist = async (username) =>
    await fetch(`${API_URL}/users/${username}/watchlist`)
        .then(response => response.json());

export const userAddToWatchlist = async (username, imdbID) =>
    await fetch(`${API_URL}/users/${username}/watchlist/${imdbID}`, {
        method: 'PUT'
    }).then(response => response.json());

export const userRemoveFromWatchlist = async (username, imdbID) =>
    await fetch(`${API_URL}/users/${username}/watchlist/${imdbID}/remove`, {
        method: 'PUT'
    }).then(response => response.json());

export const findFollowedBy = async (username) =>
    await fetch(`${API_URL}/users/${username}/followedBy`)
        .then(response => response.json());

export const followUser = async (username, following) =>
    await fetch(`${API_URL}/users/${username}/follow/${following}`, {
        method: 'PUT'
    }).then(response => response.json());

export const isXfollowingY = async (username, other) => {
    const response = await fetch(`${API_URL}/users/${username}/isFollowing/${other}`)
    return response.json().then((data) => data);
}

export const findLikedReviews = async (username) =>
    await fetch(`${API_URL}/users/${username}/likedReviews`)
        .then(response => response.json());

export const unFollowUser = async (username, unFollowing) =>
    await fetch(`${API_URL}/users/${username}/unFollow/${unFollowing}`, {
        method: 'PUT'
    }).then(response => response.json());

export const findAllUsers = async () =>
    await fetch(`${API_URL}/users`).then(response => response.json())

export const findFollows = async (username) =>
    await fetch(`${API_URL}/users/${username}/follows`).then(response => response.json());

export const grantAdminPrivileges = async (username, granterUsername, granterPassword) =>
    await fetch(`${API_URL}/users/${username}/grantAdmin/${granterUsername}/${granterPassword}`, {
        method: 'PUT'
    }).then(response => response.json()).then((data) => data);

export const findMostPopularUsers = async () =>
    await fetch(`${API_URL}/users/popular`)
        .then(response => response.json());