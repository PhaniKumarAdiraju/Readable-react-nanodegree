import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../actions/index'
import Post from './Post'

class Posts extends Component{
    static propTypes = {
        posts: PropTypes.array
    }
    componentDidMount(){
        this.props.fetchAllPosts()
    }

    render(){
        const { posts } = this.props
        return(
            <div>
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ posts }, { match }) {
    const category = match.params.category
    return {
        posts: category ? posts.filter(post => post.category === category) : posts
    }
}

export default connect(mapStateToProps, actions)(Posts)