import * as Types from './types'
import * as API from '../utils/API'

export const fetchCategories = () => {
    return (dispatch) => {
        API.fetchCategories().then(res => {
            dispatch({ type: Types.FETCH_CATEGORY, res })
        })
    }
}

export const createPost = (post, callback) => {
    return (dispatch) => {
        API.addPost(post).then(() => callback())
        dispatch({ type: Types.ADD_POST, post })
    }
}
export const deletePost = (postId, callback) => {
    return dispatch => {
        API.deletePost(postId).then(() => callback())
        dispatch({ type: Types.DELETE_POST, postId })
    }
}
export const updatePost = (postId, title, body, callback) => {
    return (dispatch) => {
        API.updatePost(postId, title, body)
            .then(updatedPost => {
            dispatch({ type: Types.UPDATE_POST, updatedPost, postId })
        }).then(() => callback())
    }
}
export const votePost = (postId, option) => {
    return (dispatch) => {
        API.votePost(postId, option).then(post => {
            dispatch({ type: Types.VOTE_POST, postId, option })
        })
    }
}
export const fetchPostsByCategory = (category) => {
    return (dispatch) => {
        API.fetchPostsByCategory(category)
            .then(posts => {
            dispatch({ type: Types.GET_CATEGORY_POSTS, posts })
        })
    }
}
export const fetchAllPosts = () => {
    return (dispatch) => {
        API.fetchPosts().then(posts => {
            dispatch({ type: Types.FETCH_POSTS, posts })
        })
    }
}
export const sortPost = (sortKey) => {
    return dispatch => {
        dispatch({ type: Types.SORT_POST, sortKey })
    }
}

export const createComment = (comment, parentId, callback) => {
    return (dispatch) => {
        API.addComment(comment).then(comment => {
            dispatch({ type: Types.ADD_COMMENT, parentId, comment })
        }).then(() => callback())
    }
}
export const updateComment = (comment, callback) => {
    const { commentId, postId, timestamp, body } = comment;
    const parentId = postId;
    return (dispatch) => {
        API.updateComment(commentId, timestamp, body)
            .then(updatedComment => {
                dispatch({ type: Types.UPDATE_COMMENT, updatedComment, commentId, parentId })
            }).then(() => callback())
    }
}
export const deleteComment = (commentId, callback) => {
    return (dispatch) => {
        API.deleteComment(commentId).then(() => callback())
        dispatch({ type: Types.DELETE_COMMENT, commentId })
    }
}
export const fetchCommentForPost = (parentId) => {
    return (dispatch) => {
        API.fetchComment(parentId).then(comments => {
            dispatch({ type: Types.FETCH_COMMENTS, parentId, comments })
        })
    }
}
export const voteComment = (commentId, parentId, option) => {
    return (dispatch) => {
        API.voteComment(commentId, option).then(updatedComment => {
            dispatch({ type: Types.VOTE_COMMENT, updatedComment, commentId, parentId })
        })
    }
}