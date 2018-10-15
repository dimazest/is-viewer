import * as actions from './actions'

export const ui = (state = {}, action) => {
    switch (action.type) {
    case actions.ANNOTATION_SELECTED: {
        return {
            ...state,
            annotationID: action.annotationID,
        }}
    default: {
        return state
    }}
}

export const data = (state = {}, action) => {
    switch (action.type) {
    case actions.ANNOTATION_RECEIVED: {
        return {
            ...state,
            annotations: {
                ...state.annotations,
                [action.annotationID]: {
                    ...(state.annotations[action.annotationID] || {}),
                    data: action.payload,
                }
            }
        }}
    default: {
        return state
    }}
}
