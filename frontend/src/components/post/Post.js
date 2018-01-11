import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { browserHistory } from 'history'

import * as actions from '../../actions/index'
import Like from '../../images/like.png'
import Dislike from '../../images/dislike.png'
import { formatTimeStamp } from '../../utils/Extras'

class Post extends Component {
    componentDidMount() {
        this.props.fetchCommentForPost(this.props.post.id)
        //this.props.fetchCommentForPost(this.props.match.params.postId)
    }

    onDeletePost = () => {
        const id = this.props.post.id
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { fetchAllPosts, post, votePost, comments} = this.props

        return (
            <div>
                {post && (
                    <div className="post">
                        <div className="post-description">
                            <Link to={`/${post.category}/${post.id}`}>
                                <div className="post-title">
                                    <h3>{post.title}</h3>
                                </div>
                                <div className="post-info">
                                    <span className="post-category"> {post.category} </span> {' '}
                                    <span className="post-author"> {post.author} </span> {' '}
                                    <span className="post-time"> {formatTimeStamp(post.timestamp)} </span>
                                </div>
                            </Link>
                            <div className="post-body">
                                <p>
                                    {post.body}
                                </p>
                            </div>

                            <div className="button-action">
                                <Link to={`/${post.category}/${post.id}/edit`}>
                                    <button>
                                        Edit Post
                                    </button>
                                </Link>
                                <button onClick={(e) => this.onDeletePost(e)}>
                                    Delete Post
                                </button>
                            </div>


                            <div className="post-likes">
                                <img src={Like}
                                     height="30"
                                     width="30"
                                     onClick={() => {
                                    votePost(post.id, "upVote")
                                    fetchAllPosts()}}
                                />
                                <img src={Dislike}
                                     height="30"
                                     width="30"
                                     onClick={() => {
                                    votePost(post.id, "downVote")
                                    fetchAllPosts()}}
                                />
                            </div>
                            <div className="post-comments">
                                {post.voteScore} votes
                                {' '} {comments && comments ? comments.length : 0} comments
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps({ comments }, { post }) {
    return {
        comments: comments[post.id]
    }
}

export default connect(mapStateToProps, actions)(Post)
