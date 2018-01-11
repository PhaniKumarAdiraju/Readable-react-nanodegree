import React, { Component } from 'react'
import { connect } from 'react-redux'

import { uid } from '../../utils/Extras'
import { createComment } from '../../actions/index'

class CommentNew extends Component{

    submitComment = (e) => {
        e.preventDefault()

        const author = e.target.author.value
        const postId = this.props.match.params.postId
        const commentBody = e.target.body.value

        if( author === "" || commentBody ==="") {
            alert("Comment Body and author fields are mandatory")
        } else {
            const submitComment = {
                id: uid(),
                body: commentBody,
                parentId: postId,
                author: author,
                timeStamp: Date.now(),
            }
            this.props.createComment(submitComment, postId,
                () => this.props.history.push(`/post/${postId}`))
        }
    }
    render(){
        return(
            <form onSubmit={this.submitComment}>
                <h3>Add New Comment</h3>
                <div>
                    <label>Name: <span>*</span></label>
                    <input type="text" name="author" />
                </div>
                <div>
                    <label>Comment: <span>*</span></label>
                    <textarea name="body" id="commentId"></textarea>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ posts, categories }) {
    return {
        posts: posts,
    }
}

export default connect(mapStateToProps, { createComment })(CommentNew)