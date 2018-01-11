import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostComment from '../comment/CommentPost'
import { fetchAllPosts, votePost, deletePost, fetchCommentForPost,getPost } from '../../actions/index'
import Like from '../../images/like.png'
import Dislike from '../../images/dislike.png'
import { formatTimeStamp } from '../../utils/Extras'

class PostInfo extends Component{

    componentDidMount() {
        console.log("all: ", this.props.fetchAllPosts)
        this.props.fetchAllPosts
        this.props.fetchCommentForPost(this.props.match.params.postId)
        console.log("post: ", this.props.getPost(this.props.match.params.postId))
    }

    onDeletePost = () => {
        const id = this.props.match.params.postId
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        })
    }

    render(){
        const {  fetchAllPosts, post, votePost, comments} = this.props
        if(!post) {
            return (
                <div>Post Not Found</div>
            )
        }
        return(
            <div>
                {post && (
                    <div className="post" key={post.id}>
                        <div className="post-description">
                            <div className="post-title">
                                <Link to={`/${post.category}/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </Link>
                            </div>
                            <div className="post-info">
                                <span className="post-category"> {post.category} </span> {' '}
                                <span className="post-author"> {post.author} </span> {' '}
                                <span className="post-time"> {formatTimeStamp(post.timestamp)} </span>
                            </div>

                            <div className="post-body">
                                <p>{post.body}</p>
                            </div>

                            <div className="post-likes">
                                <img src={Like}
                                     height="30"
                                     width="30"
                                     onClick={() => {
                                        votePost(post.id, "upVote")
                                        fetchAllPosts() }}
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
                                {' '}{comments && comments ? comments.length : 0} comments
                            </div>
                        </div>

                        <div className="button-action">
                            <Link to={`/${post.category}/${post.id}/comment`}>
                                <button>
                                    Add New Comment
                                </button>
                            </Link>
                            <Link to={`/${post.category}/${post.id}/edit`}>
                                <button>
                                    Edit Post
                                </button>
                            </Link>
                            <button onClick={(e) => this.onDeletePost(e)}>
                                Delete Post
                            </button>
                        </div>

                    </div>
                )}
                { comments && post &&
                    <PostComment
                        comments={comments}
                        category={post.category}
                        history={this.props.history}
                    />
                }
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }, { match }) {
    const post = _.find(posts,
        { id: match.params.postId })
    return {
        post: post,
        comments: comments[match.params.postId]
    }
}

export default connect(mapStateToProps, {fetchCommentForPost, fetchAllPosts, deletePost, votePost, getPost})(PostInfo)