import { createSelector } from 'reselect'
import objectPath from 'object-path'

export const getEventsMetadata = ({annotations, ui}) => objectPath.get(annotations, [ui.annotationID, 'payload', 'annotator', 'eventsAnnotated'], new Map())
export const getAnnotationID = ({ui}) => ui.annotationID
export const getAnnotations = ({annotations}) => annotations
export const getAnnotation = state => objectPath.get(getAnnotations(state), [getAnnotationID(state)], {})
export const getEventID = ({ui}) => objectPath.get(ui, ['byAnnotation', ui.annotationID, 'eventID'])
export const getRunURL = ({ui}) => objectPath.get(ui, ['byAnnotation', ui.annotationID, 'runURL'])
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

export const getTweetIndex = state => {
    const annotationID = getAnnotationID(state)
    const eventID = getEventID(state)
    const tweets = getTweets(state)
    const tweetIndex = objectPath.get(state, ['ui', 'byAnnotation', annotationID, 'byEvent', eventID], {}).tweetIndex || 0
    return {
        hasPrevious: tweetIndex > 0,
        hasNext: tweetIndex < tweets.length - 1,
        total: tweets.length,
        tweetIndex,
    }
}

export const getTweet = state => getTweets(state)[getTweetIndex(state).tweetIndex] || {}

export const getTopicID = state => getAnnotation(state).datasetTopicMapping[getEventID(state)]
export const getRunURLTitleItems = state => getAnnotation(state).runs.map(({url, title}) => [url, title])
