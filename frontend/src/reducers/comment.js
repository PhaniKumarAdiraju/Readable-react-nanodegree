import * as Types from '../actions/types'

function comments(state={}, action) {
    const { commentId, comments, updatedComment, parentId} = action
    switch(action.type) {
        case Types.ADD_COMMENT:
            return Object.assign({}, state, {[parentId]: comments})
        case Types.UPDATE_COMMENT:
            return {
                ...state,
                [parentId]: state[parentId].map(comment => {
                    if(comment.id === commentId) {
                        comment = updatedComment
                    }
                    return comment
                })
            }
        case Types.DELETE_COMMENT:
            return state
        case Types.FETCH_COMMENTS:
            return Object.assign({}, state, {[parentId]: comments})
        case Types.VOTE_COMMENT:
            return {
                ...state,
                [parentId]: state[parentId].map(comment => {
                    if(comment.id === commentId) {
                        comment = updatedComment
                    }
                    return comment
                })
            }
        default:
            return state
    }
}

export default comments
