import { observer } from 'redux-observers'

import * as actions from './actions'

const annotationObserver = observer(
  state => state.ui.annotationID,
  (dispatch, current, previous) => {
      dispatch(actions.fetchAnnotation(current))
  }
)

export default [annotationObserver]
