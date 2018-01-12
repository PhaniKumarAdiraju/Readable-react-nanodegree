import React, { Component } from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchAllPosts, fetchCommentForPost, updatePost } from '../../actions/index'

class PostEdit extends Component{
    componentDidMount() {
        this.props.fetchAllPosts
        this.props.fetchCommentForPost(this.props.match.params.postId)
    }

    postEdit = (e) => {
        e.preventDefault()

        const postId = this.props.post.id
        const body = e.target.body.value
        const title = e.target.title.value

        if(title === "" || body === "" ) {
          //  alert("Body and title are mandatory")
        } else {
            this.props.updatePost(postId, title, body,
                () => this.props.history.push('/'))
        }
    }

    render(){
        const { post } = this.props
        return(
            <div>
                <form onSubmit={this.postEdit}>
                    <h3>Edit This Post</h3>
                    <div>
                        <label>Title * </label>
                        <input
                            defaultValue={post.title}
                            type="text"
                            name="title"
                        />
                    </div>
                    <div>
                        <label>Post *</label>
                        <textarea
                            defaultValue={post.body}
                            name="body"
                            id="bodyId">
                        </textarea>
                    </div>
                    <div>
                        <button>Update</button>
                        <Link to={`/post/${post.id}`}>
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
        post: _.find(posts,
            { id: match.params.postId }),
        comments: comments[match.params.postId]
    }
}

export default connect(mapStateToProps, { fetchAllPosts, updatePost, fetchCommentForPost })(PostEdit)