import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import * as commentActions from '../../actions/index'

class CommentEdit extends Component{

    componentDidMount(){
        this.props.fetchCommentForPost(this.props.match.params.postId)
    }

    commentUpdate = (e) => {
        e.preventDefault()
        const comment = {
            commentId: this.props.comment.id,
            postId: this.props.comment.parentId,
            timestamp: Date.now(),
            body:  e.target.body.value
        }
        if (comment.body === "") {
           // alert('Comment body cannot be empty')
        } else {
            this.props.updateComment(comment,
                () => this.props.history.push(`/post/${comment.postId}`))
        }
    }
    render(){
        const { body, parentId } = this.props.comment;
        return(
            <div>
                <form onSubmit={this.commentUpdate}>
                    <h2>Edit Comment</h2>
                    <div>
                        <label>Comment <span className="required">*</span></label>
                        <textarea defaultValue={body} name="body" id="commentBody" ></textarea>
                    </div>
                    <div>
                        <button>Update Comment</button>
                        <Link to={`/post/${parentId}`}>
                            <button>Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }, { match }) {
    return {
        comment: _.find(comments[match.params.postId],
            { id: match.params.commentId })
    }
}

export default connect(mapStateToProps, commentActions)(CommentEdit)

