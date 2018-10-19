import { createSelector } from 'reselect'
import objectPath from 'object-path'

export const getEventsMetadata = ({annotations, ui}) => objectPath.get(annotations, [ui.annotationID, 'payload', 'annotator', 'eventsAnnotated'], new Map())
export const getAnnotationID = ({ui}) => ui.annotationID
export const getAnnotations = ({annotations}) => annotations
export const getAnnotation = state => objectPath.get(getAnnotations(state), [getAnnotationID(state)], {})
export const getEventID = ({ui}) => objectPath.get(ui, ['byAnnotation', ui.annotationID, 'eventID'])
export const getRunID = ({ui}) => objectPath.get(ui, ['byAnnotation', ui.annotationID, 'runID'])
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
export const getRunIDTitleItems = state => Object.entries(getAnnotation(state).runs).map(([i, {url, title}]) => [i, title])
export const getRun = state => getAnnotation(state).runs[getRunID(state)] || {'a': 1}
export const getRunTweetCategories = state => {
    const annotation = getAnnotation(state)
    const topic = annotation.datasetTopicMapping[getEventID(state)]

    return ((getRun(state).payload || {})[topic] || {})[getTweet(state).postID]
}
