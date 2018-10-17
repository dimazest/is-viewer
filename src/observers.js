import { observer } from 'redux-observers'

import * as actions from './actions'
import * as selectors from './selectors'

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
        eventID: selectors.getEventID(state),
    }),
    (dispatch, {annotationID, annotation, eventID}, previous) => {
        if (annotation.payload && !eventID) {
            dispatch(actions.eventSelected(annotationID, annotation.payload.events[0].eventid))
        }
    }
)


export default [annotationObserver, eventAnnotationObserver]
