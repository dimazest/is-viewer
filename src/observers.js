import { observer } from 'redux-observers'

import * as actions from './actions'

const annotationObserver = observer(
  state => state.ui.annotationID,
  (dispatch, current, previous) => {
      dispatch(actions.fetchAnnotation(current))
  }
)

const eventAnnotationObserver = observer(
    state => ({
        annotationID: state.ui.annotationID,
        annotation: state.annotations[state.ui.annotationID],
        eventIDforAnnotation: state.ui.eventIDbyAnnotationID[state.ui.annotationID],
    }),
    (dispatch, {annotationID, annotation, eventIDforAnnotation}, previous) => {
        if (annotation.payload && !eventIDforAnnotation) {
            dispatch(actions.eventSelected(annotationID, annotation.payload.events[0].eventid))
        }
    }
)


export default [annotationObserver, eventAnnotationObserver]
