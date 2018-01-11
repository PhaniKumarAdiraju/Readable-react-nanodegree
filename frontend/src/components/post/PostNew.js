import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createPost } from '../../actions/index'
import { uid } from '../../utils/Extras'

class PostNew extends  Component {

    postNew = (e) => {
        e.preventDefault()
        const category = e.target.category.value
        const title = e.target.title.value
        const author = e.target.author.value
        const body = e.target.body.value

        const submitPost = {
            id: uid(),
            category: e.target.category.value,
            title: e.target.title.value,
            author: e.target.author.value,
            body: e.target.body.value,
            timestamp: Date.now(),
        }
        this.props.createPost(submitPost, () => this.props.history.push('/'))
    }

    render() {
        return(
            <form onSubmit={this.postNew}>
                <h2>New Post</h2>
                <div>
                    <label>Category </label>
                    <select name="category" className="field-select">
                        {this.props.categories && this.props.categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Title *</label>
                    <input type="text" name="title"/>
                </div>
                <div>
                    <label>Author Name *</label>
                    <input type="text" name="author"/>
                </div>
                <div>
                    <label>Post *</label>
                    <textarea name="body" id="bodyId"></textarea>
                </div>
                <div>
                    <button>Submit </button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ posts, categories }) {
    return {
        posts: posts,
        categories: categories
    }
}

export default connect(mapStateToProps, { createPost })(PostNew)
