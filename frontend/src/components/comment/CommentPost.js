import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as commentActions from '../../actions/index'
import Like from '../../images/like.png'
import Dislike from '../../images/dislike.png'
import { formatTimeStamp } from '../../utils/Extras'

const CommentPost = (props) => {

    const onDeleteComment = (comment) => {
        const parentId = comment.parentId
        props.deleteComment(comment.id, () => {
            props.history.push(`/post/${parentId}`)
            props.fetchCommentForPost(comment.parentId)
        })
    }

    return(
        <div>
            {props.comments.map(comment => {
                const { id, body, timestamp, parentId, voteScore, author } = comment;
                return(
                    <div className="comment-2" key={id}>
                        <div>
                            <div className="comment-style">
                                {body}
                            </div>
                            <div className="comment-style">
                                <p>
                                    at {formatTimeStamp(timestamp)}by
                                    <b>{author}</b>
                                </p>
                            </div>
                            <div className="comment-style">
                                <img src={Like}
                                     height="30"
                                     width="30"
                                     onClick={() => {
                                         props.voteComment(id, parentId, "upVote")}}
                                />
                                <img src={Dislike}
                                     height="30"
                                     width="30"
                                     onClick={() => {
                                         props.voteComment(id, parentId, "downVote")}}
                                />
                                {voteScore} votes
                            </div>
                            <div className="button-action">
                                <Link to={`/${props.category}/${parentId}/${id}/edit`}>
                                    <button>Edit Comment</button>
                                </Link>
                                <button
                                    onClick={() => onDeleteComment(comment)}>
                                    Delete Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )

            })}
        </div>
    )
}

function mapStateToProps({ posts }) {
    return { posts }
}

export default connect(mapStateToProps, commentActions)(CommentPost)