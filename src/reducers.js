import * as actions from './actions'

export const ui = (state = {}, action) => {
    switch (action.type) {
    case actions.ANNOTATION_SELECTED: {
        return {
            ...state,
            annotationID: action.annotationID,
        }}
    case actions.EVENT_SELECTED: {
        return {
            ...state,
            eventIDbyAnnotationID: {
                ...state.eventIDbyAnnotationID,
                [action.annotationID]: action.eventID,
            }
        }
    }
    default: {
        return state
    }}
}

export const annotations = (state = {}, action) => {
    switch (action.type) {
    case actions.ANNOTATION_RECEIVED: {
        return {
            ...state,
            [action.annotationID]: {
                ...(state[action.annotationID] || {}),
                payload: action.payload,
            }
        }}
    default: {
        return state
    }}
}
