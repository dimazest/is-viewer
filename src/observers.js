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
        eventID: state.ui.eventID,
        annotation: state.data.annotations[state.ui.annotationID],
        defaultEventID: state.ui.eventIDbyAnnotationID[state.ui.annotationID],
    }),
    (dispatch, {annotationID, eventID, annotation, defaultEventID}, previous) => {
        if (!annotation.data) {
            dispatch(actions.resetUIEventSelection())
        }
        if (annotation.data && !eventID) {
            dispatch(actions.eventSelected(annotationID, defaultEventID || annotation.data.events[0].eventid))
        }
    }
)


export default [annotationObserver, eventAnnotationObserver]
