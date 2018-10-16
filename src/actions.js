import objectPath from 'object-path'


export const ANNOTATION_SELECTED = 'ANNOTATION_SELECTED'
export const annotationSelected = (annotationID) => ({
        type: ANNOTATION_SELECTED,
        annotationID,
})

export const ANNOTATION_RECEIVED = 'ANNOTATION_RECEIVED'
export const annotationReceived = (annotationID, payload) => ({
    type: ANNOTATION_RECEIVED,
    annotationID,
    payload,
})

export const ANNOTATION_FETCH_REQUESTED = 'ANNOTATION_FETCH_REQUESTED'
export const fetchAnnotation = annotationID => (
    (dispatch, getState) => {
        const state = getState()
        const annotation  = objectPath.get(state, ['data', 'annotations', annotationID])
        if (!annotation.data) {
            return fetch(annotation.url)
            .then(r => r.json())
            .then(j => dispatch(annotationReceived(annotationID, j)))
    }}
)

export const EVENT_SELECTED = 'EVENT_SELECTED'
export const eventSelected = (annotationID, eventID) => ({
    type: EVENT_SELECTED,
    annotationID, eventID,
})

export const RESET_UI_EVENT_SELECTION = 'RESET_UI_EVENT_SELECTION'
export const resetUIEventSelection = () => ({type: RESET_UI_EVENT_SELECTION})
