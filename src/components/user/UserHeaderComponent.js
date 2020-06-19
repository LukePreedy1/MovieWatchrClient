import React from 'react';
import { followUser, unFollowUser, isXfollowingY } from '../../services/UserService';
import '../../style/UserHeaderComponentStyle.css';

class UserHeaderComponent extends React.Component {
    state = {
        isFollowing: false
    }

    componentDidMount = async () => {
        if (this.props.loggedIn && typeof this.props.user.username !== 'undefined' && this.props.user.username !== this.props.username) {
            const isFollowing = await isXfollowingY(this.props.user.username, this.props.username)
            this.setState({isFollowing: isFollowing})
        }
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.user.username !== prevProps.user.username && this.props.loggedIn) {
            const isFollowing = await isXfollowingY(this.props.user.username, this.props.username)
            this.setState({isFollowing: isFollowing})
        }
    }

    render() {
        return (
        <div id='user-header-component'>
            <div id='username-and-followbtn-row'>
                <p className='float-left'><b id='username-text'>{this.props.username}</b></p>
                {
                    this.props.loggedIn && (this.props.user.username !== this.props.username) && !this.state.isFollowing &&
                    <button id='follow-btn' className='btn float-right'
                        onClick={() => {
                            followUser(this.props.user.username, this.props.username)
                            this.setState({isFollowing: true})
                        }}>
                        Follow
                    </button>
                }
                {
                    this.props.loggedIn && (this.props.user.username !== this.props.username) && this.state.isFollowing &&
                    <button id='unfollow-btn' className='btn float-right'
                        onClick={() => {
                            unFollowUser(this.props.user.username, this.props.username)
                            this.setState({isFollowing: false})
                        }}>
                        UnFollow
                    </button>
                }
            </div>
            <br/>
            <br/>
            <ul className='nav justify-content-center' id='user-component-navigation-buttons'>
                <button className={'nav-item btn col-2 ' + (this.props.active === 'profile' ? 'active' : '')}
                    onClick={() => this.props.history.push(`/profile/${this.props.username}`)}>
                    Profile Info
                </button>
                <button className={'nav-item btn col-2 ' + (this.props.active === 'watchlist' ? 'active' : '')}
                    onClick={() => this.props.history.push(`/profile/${this.props.username}/watchlist`)}>
                    Watchlist
                </button>
                <button className={'nav-item btn col-2 ' + (this.props.active === 'watched' ? 'active' : '')}
                    onClick={() => this.props.history.push(`/profile/${this.props.username}/watched`)}>
                    Watched
                </button>
                <button className={'nav-item btn col-2 ' + (this.props.active === 'reviews' ? 'active' : '')}
                    onClick={() => this.props.history.push(`/profile/${this.props.username}/reviews`)}>
                    Reviews
                </button>
                <button className={'nav-item btn col-2 ' + (this.props.active === 'following' ? 'active' : '')}
                    onClick={() => this.props.history.push(`/profile/${this.props.username}/following`)}>
                    Following
                </button>
                <button className={'nav-item btn col-2 ' + (this.props.active === 'followedBy' ? 'active' : '')}
                    onClick={() => this.props.history.push(`/profile/${this.props.username}/followedBy`)}>
                    Followed By
                </button>
            </ul>
            <br/>
        </div>
        )
    }
}

export default UserHeaderComponent