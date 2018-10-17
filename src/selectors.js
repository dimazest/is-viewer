import { createSelector } from 'reselect'
import objectPath from 'object-path'

export const getEventsMetadata = ({annotations, ui}) => objectPath.get(annotations, [ui.annotationID, 'payload', 'annotator', 'eventsAnnotated'], new Map())
export const getEventID = ({ui}) => ui.byAnnotation[ui.annotationID].eventID
export const getAnnotations = state => state.annotations
export const getEvents = ({annotations, ui}) => objectPath.get(annotations, [ui.annotationID, 'payload', 'events'], new Map())

export const getEventInfo = state => {
    const events = getEventsMetadata(state)
    const eventID = getEventID(state)

    return events.get(eventID)
}

export const getEventsAnnotatedIdentifierNameItems = createSelector(
    [getEventsMetadata],
    eventsAnnotated => [...eventsAnnotated].map(([k, v]) => [v.identifier, v.name])
)

export const getAnnotationsIDTitleItems = createSelector(
    [getAnnotations],
    annotations => Object.entries(annotations).map(([key, {title}]) => [key, title])
)

export const getTweets = createSelector(
    [getEvents, getEventID],
    (events, eventID) => (events.get(eventID) || {}).tweets || [{}]
)

export const getTweetID = state => getTweets(state)[0].postID
