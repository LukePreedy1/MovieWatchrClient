import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import RegisterComponent from '../components/RegisterComponent'
import MovieComponent from '../components/MovieComponent'
import UserProfileComponent from '../components/user/UserProfileComponent'
import UserHeaderComponent from '../components/user/UserHeaderComponent'
import HeaderComponent from '../components/HeaderComponent'
import SearchComponent from '../components/search/SearchComponent'
import SearchResultsComponent from '../components/search/SearchResultsComponent'
import WriteReviewComponent from '../components/reviews/WriteReviewComponent'
import { checkCredentials, findUserByUsername, userAddToWatchlist, userRemoveFromWatchlist, addToWatched } from '../services/UserService'
import UserWatchlistComponent from '../components/user/UserWatchlistComponent'
import UserWatchedComponent from '../components/user/UserWatchedComponent'
import UserReviewsComponent from '../components/user/UserReviewsComponent'
import UserFollowingComponent from '../components/user/UserFollowingComponent'
import UserFollowedByComponent from '../components/user/UserFollowedByComponent'
import HomepageComponent from '../components/homepage/HomepageComponent'
import ReviewComponent from '../components/reviews/ReviewComponent'
import PrivacyPolicyComponent from '../components/PrivacyPolicyComponent'
import '../style/RouterContainerStyle.css';

class RouterContainer extends React.Component {
    state = {
        loggedIn: false,
        loggedInUser: {},
        newUsername: '',
        newPassword: '',
        searchField: '',
        searched: false
    }

    componentDidMount = async () => {
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    logIn = async () => {
        try {
            if (await checkCredentials(this.state.newUsername, this.state.newPassword)) {
                const newUser = await findUserByUsername(this.state.newUsername);
                this.updateForm({
                    loggedIn: true,
                    loggedInUser: newUser,
                    newUsername: '',
                    newPassword: ''
                })
            } else {
                alert("The username and password combination provided does not exist.");
            }
        } catch(exception) {
            alert("The username you provided does not match any username in our database.");
        }
    }

    logOut = () => {
        this.updateForm({
            loggedIn: false,
            loggedInUser: {}
        })
    }

    search = () => {
        this.updateForm({
            searched: true
        })
    }

    addToWatchlist = async (imdbID) => {
        await userAddToWatchlist(this.state.loggedInUser.username, imdbID);
    }

    removeFromWatchlist = async (imdbID) => {
        await userRemoveFromWatchlist(this.state.loggedInUser.username, imdbID)
    }

    markMovieAsWatched = async (imdbID) => {
        await addToWatched(this.state.loggedInUser.username, imdbID)
    }

    render = () => {
        return (
        <div id='page'>
            <Router>
                <Route
                    path="/"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <HomepageComponent
                                    {...props}
                                    user={this.state.loggedInUser}
                                    loggedIn={this.state.loggedIn}
                                    />
                            </div>
                        </div>
                    }/>
                <Route
                    path="/register"
                    exact={true}
                    render={(props) =>
                        <div>
                            <RegisterComponent
                                {...props}
                                updateForm={this.updateForm}
                                comeBackWithNewUser={this.comeBackWithNewUser}
                                />
                        </div>
                    }/>
                <Route
                    path="/details/:movieId"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <MovieComponent
                                    {...props}
                                    imdbID={props.match.params.movieId}
                                    user={this.state.loggedInUser}
                                    loggedIn={this.state.loggedIn}
                                    addToWatchlist={this.addToWatchlist}
                                    removeFromWatchlist={this.removeFromWatchlist}
                                    markMovieAsWatched={this.markMovieAsWatched}
                                    />
                            </div>
                        </div>
                    }/>
                <Route
                    path="/details/:movieId/write-review"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <WriteReviewComponent
                                    {...props}
                                    imdbID={props.match.params.movieId}
                                    updateForm={this.updateForm}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser} />
                            </div>
                        </div>
                    }/>
                <Route
                    path="/profile"
                    exact={true}
                    render={(props) =>
                    {
                        if (this.state.loggedIn)
                        return(
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={this.state.loggedInUser.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'profile'}
                                    {...props} />
                                <UserProfileComponent
                                    {...props}
                                    username={this.state.loggedInUser.username}
                                    user={this.state.loggedInUser}
                                    loggedIn={this.state.loggedIn}
                                    />
                            </div>
                        </div>
                        )
                        else return(
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <h1>Please log in to view this page properly.</h1>
                            </div>
                        </div>
                        )
                    }} />
                <Route
                    path="/profile/:username"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={props.match.params.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'profile'}
                                    {...props} />
                                <UserProfileComponent
                                    {...props}
                                    username={props.match.params.username}
                                    user={this.state.loggedInUser}
                                    loggedIn={this.state.loggedIn}
                                    />
                            </div>
                        </div>
                    }/>
                <Route
                    path="/profile/:username/watchlist"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={props.match.params.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'watchlist'}
                                    {...props} />
                                <UserWatchlistComponent
                                    {...props}
                                    username={props.match.params.username}
                                    user={this.state.loggedInUser}
                                    loggedIn={this.state.loggedIn} />
                            </div>
                        </div>
                    }/>
                <Route
                    path="/profile/:username/watched"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={props.match.params.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'watched'}
                                    {...props} />
                                <UserWatchedComponent
                                    {...props}
                                    username={props.match.params.username} />
                            </div>
                        </div>
                    } />
                <Route
                    path="/profile/:username/reviews"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={props.match.params.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'reviews'}
                                    {...props} />
                                <UserReviewsComponent
                                    {...props}
                                    username={props.match.params.username} />
                            </div>
                        </div>
                    } />
                <Route
                    path="/profile/:username/following"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={props.match.params.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'following'}
                                    {...props} />
                                <UserFollowingComponent
                                    username={props.match.params.username}
                                    {...props} />
                            </div>
                        </div>
                    } />
                <Route
                    path="/profile/:username/followedBy"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}

                                {...props}/>
                            <div className='container'>
                                <UserHeaderComponent
                                    username={props.match.params.username}
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    active={'followedBy'}
                                    {...props} />
                                <UserFollowedByComponent
                                    username={props.match.params.username}
                                    {...props} />
                            </div>
                        </div>
                    } />
                <Route
                    path="/reviews/:reviewId"
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <ReviewComponent
                                    loggedIn={this.state.loggedIn}
                                    user={this.state.loggedInUser}
                                    reviewId={props.match.params.reviewId}
                                    {...props} />
                            </div>
                        </div>
                    } />
                <Route
                    path="/search"
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <SearchComponent
                                    {...props}
                                    updateForm={this.updateForm}
                                    search={this.search}
                                    searchField={this.state.searchField}
                                    />
                            </div>
                        </div>
                    }/>
                <Route
                    path='/search/:title'
                    exact={true}
                    render={(props) =>
                        <div className='container'>
                            <SearchResultsComponent
                                {...props}
                                title={props.match.params.title}
                                />
                        </div>
                    }/>
                <Route
                    path='/privacy'
                    exact={true}
                    render={(props) =>
                        <div>
                            <HeaderComponent
                                loggedIn={this.state.loggedIn}
                                updateForm={this.updateForm}
                                newUsername={this.state.newUsername}
                                newPassword={this.state.newPassword}
                                logIn={this.logIn}
                                logOut={this.logOut}
                                user={this.state.loggedInUser}
                                {...props}/>
                            <div className='container'>
                                <PrivacyPolicyComponent
                                    {...props} />
                            </div>
                        </div>
                    }/>
                <div className='container' id='privacy-policy-container'>
                    <Link to='/privacy'>
                        Privacy Policy
                    </Link>
                </div>
            </Router>
        </div>
        )
    }
}


export default RouterContainer