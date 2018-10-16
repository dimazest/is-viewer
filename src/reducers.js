import * as actions from './actions'

export const ui = (state = {}, action) => {
    switch (action.type) {
    case actions.ANNOTATION_SELECTED: {
        return {
            ...state,
            annotationID: action.annotationID,
            eventID: undefined,
        }}
    case actions.EVENT_SELECTED: {
        return {
            ...state,
            eventID: action.eventID,
            eventIDbyAnnotationID: {
                ...state.eventIDbyAnnotationID,
                [action.annotationID]: action.eventID,
            }
        }
    }
    case actions.RESET_UI_EVENT_SELECTION: {
        return {
            ...state,
            eventID: undefined,
        }
    }
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
