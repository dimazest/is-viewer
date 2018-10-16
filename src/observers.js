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
        annotation: state.data.annotations[state.ui.annotationID],
        eventIDforAnnotation: state.ui.eventIDbyAnnotationID[state.ui.annotationID],
    }),
    (dispatch, {annotationID, annotation, eventIDforAnnotation}, previous) => {
        if (annotation.data) {
            dispatch(actions.eventSelected(annotationID, eventIDforAnnotation || annotation.data.events[0].eventid))
        }
    }
)


export default [annotationObserver, eventAnnotationObserver]
