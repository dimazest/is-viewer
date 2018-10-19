import { observer } from 'redux-observers'

import * as actions from './actions'
import * as selectors from './selectors'

const annotationObserver = observer(
  state => state.ui.annotationID,
  (dispatch, annotationID, previous) => {
      dispatch(actions.fetchAnnotation(annotationID))
  }
)

const eventAnnotationObserver = observer(
    state => ({
        annotationID: selectors.getAnnotationID(state),
        annotation: selectors.getAnnotation(state),
        eventID: selectors.getEventID(state),
    }),
    (dispatch, {annotationID, annotation, eventID}, previous) => {
        if (annotation.payload && !eventID) {
            dispatch(actions.eventSelected(annotationID, annotation.payload.events[0].eventid))
        }
    }
)

const runObserver = observer(
    state => ({
        annotationID: selectors.getAnnotationID(state),
        runID: selectors.getRunID(state),
        runURL: selectors.getRun(state).url,

    }),
    (dispatch, {annotationID, runID, runURL}, previous) => {
        dispatch(actions.fetchRun(annotationID, runID, runURL))
    }
)

export default [annotationObserver, eventAnnotationObserver, runObserver]
