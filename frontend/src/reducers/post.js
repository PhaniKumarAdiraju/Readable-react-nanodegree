import * as Types from '../actions/types'
import sortBy from 'sort-by'

function posts(state=[], action) {
    const { postId, post, updatedPost, posts, sortKey } = action
    switch(action.type) {
        case Types.ADD_POST:
            return state.concat([post])
        case Types.UPDATE_POST:
            return state.map(post => {
                if(post.id === postId) {
                    post = updatedPost
                }
                return post
            })
        case Types.DELETE_POST:
            return state.filter(post => post.id !== postId)
        case Types.GET_CATEGORY_POSTS:
            return posts.filter(post => !(post.deleted))
        case Types.FETCH_POSTS:
            return action.posts.filter(post => !(post.deleted))
        case Types.GET_POST:
            return state.map(post => {
                if(post.id === postId) {
                }
                return post
            })
        case Types.SORT_POST:
            return [].concat(state.sort(sortBy("-"+sortKey)))
        case Types.VOTE_POST:
            return state.map(post => {
                if (post.id === action.postId) {
                    if (action.option === "upVote") {
                        post.voteScore += 1
                    }
                    if (action.option === "downVote") {
                        post.voteScore -= 1
                    }
                }
                return post
            })
        default:
            return state
    }
}

export default posts
