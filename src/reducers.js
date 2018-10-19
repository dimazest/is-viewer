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
            byAnnotation: {
                ...state.byAnnotation,
                [action.annotationID]: {
                    ...state.byAnnotation[action.annotationID],
                    eventID: action.eventID,
                },
            }
        }
    }
    case actions.RUN_SELECTED: {
        return {
            ...state,
            byAnnotation: {
                ...state.byAnnotation,
                [action.annotationID]: {
                    ...state.byAnnotation[action.annotationID],
                    runURL: action.runURL,
                },
            }
        }
    }
    case actions.ADVANCE_TWEET: {
        const byEvent = {
            ...(state.byAnnotation[action.annotationID].byEvent || {})
        }
        byEvent[action.eventID] = {
            ...byEvent[action.eventID],
            tweetIndex: ((byEvent[action.eventID] || {}).tweetIndex || 0) + action.by
        }

        return {
            ...state,
            byAnnotation: {
                ...state.byAnnotation,
                [action.annotationID]: {
                    ...state.byAnnotation[action.annotationID],
                    byEvent,
                },
            }
        }
    }
    case actions.SET_TWEET: {
        const byEvent = {
            ...(state.byAnnotation[action.annotationID].byEvent || {})
        }
        byEvent[action.eventID] = {
            ...byEvent[action.eventID],
            tweetIndex: action.index
        }

        return {
            ...state,
            byAnnotation: {
                ...state.byAnnotation,
                [action.annotationID]: {
                    ...state.byAnnotation[action.annotationID],
                    byEvent,
                },
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

export const categoryGroups = (state = {}, action) => state
