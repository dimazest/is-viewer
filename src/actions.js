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
        const annotation  = objectPath.get(state, ['annotations', annotationID])
        if (!annotation.payload) {
            return fetch(annotation.url)
            .then(r => r.json())
            .then(j => dispatch(annotationReceived(
                annotationID,
                {
                    ...j,
                    events: new Map(j.events.map(v => [
                        v.eventid,
                        {
                            ...v,
                            tweets: v.tweets.map(t => ({...t, categories: new Set(t.categories)}))
                        }
                    ])),
                    annotator: {
                        ...j.annotator,
                        eventsAnnotated: new Map(j.annotator.eventsAnnotated.map(v => [v.identifier, v])),
                    },
                }
            )))
    }}
)

export const EVENT_SELECTED = 'EVENT_SELECTED'
export const eventSelected = (annotationID, eventID) => ({
    type: EVENT_SELECTED,
    annotationID, eventID,
})

export const ADVANCE_TWEET = 'ADVANCE_TWEET'
export const advanceTweet = (annotationID, eventID, by=1) => ({
    type: ADVANCE_TWEET,
    annotationID, eventID, by,
})

export const SET_TWEET = 'SET_TWEET'
export const setTweet = (annotationID, eventID, index) => ({
    type: SET_TWEET,
    annotationID, eventID, index,
})

export const RUN_SELECTED = 'RUN_SELECTED'
export const runSelected = (annotationID, runID) => ({
    type: RUN_SELECTED,
    annotationID, runID,
})

export const RUN_RECEIVED = 'RUN_RECEIVED'
export const runReceived = (annotationID, runID, payload) => ({
    type: RUN_RECEIVED,
    annotationID, runID, payload,
})

export const fetchRun = (annotationID, runID, runURL) => (
    (dispatch, getState) => {
        return fetch(runURL)
            .then(r => r.text())
            .then(t => {
                const result = {}
                for (let l of t.split('\n')) {
                    if (l === '') {
                        continue
                    }

                    const v = l.split(/\s+/)

                    if (v.length < 7 ) {
                        console.log(v)
                        console.log(`Could not read line in ${runURL}: ${l}`)
                        break
                    }

                    const topic = v[0]
                    const tweetID = v[2]
                    const category = v[5].split('-')[1]

                    if (!result[topic]) {
                        result[topic] = {}
                    }
                    if (!result[topic][tweetID]) {
                        result[topic][tweetID] = new Set()
                    }

                    result[topic][tweetID].add(category)
                }
                dispatch(runReceived(annotationID, runID, result))
            })
    }
)
