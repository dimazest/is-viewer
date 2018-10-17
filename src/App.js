import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import './App.css';

import { connect } from 'react-redux'
import objectPath from 'object-path'

import TweetEmbed from './tweet-embed'

import * as actions from './actions'
import * as selectors from './selectors'

const Select = ({title, onChange, value, values}) => (
    <div className="input-group input-group-sm mr-2">
        <div className="input-group-prepend">
            <span className="input-group-text">{title}</span>
        </div>
        <select className="custom-select custom-select-sm"
            onChange={e => onChange(e.target.value)} value={value}>
            {values.map(([key, value]) => (<option value={key} key={key}>{value}</option>))}
        </select>
    </div>
)

let Navigation = ({eventsAnnotatedIdentifierNameItems, annotationsIDTitleItems, onChangeAnnotation, annotationID, eventID, onChangeEvent}) => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <span className="navbar-brand h1 mb-0">Incident Streams</span>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline">
                <Select title="Annotation" onChange={annotationID => onChangeAnnotation(annotationID)} value={annotationID} values={annotationsIDTitleItems} />
                {eventsAnnotatedIdentifierNameItems && <Select title="Event" onChange={eventID => onChangeEvent(annotationID, eventID)} value={eventID} values={eventsAnnotatedIdentifierNameItems} />}
            </form>
        </div>
    </nav>
)
Navigation = connect(
    state => ({
        eventsAnnotatedIdentifierNameItems: selectors.getEventsAnnotatedIdentifierNameItems(state),
        annotationsIDTitleItems: selectors.getAnnotationsIDTitleItems(state),
        annotationID: state.ui.annotationID,
        eventID: selectors.getEventID(state),
    }),
    dispatch => ({
        onChangeAnnotation: annotationID => dispatch(actions.annotationSelected(annotationID)),
        onChangeEvent: (annotationID, eventID) => dispatch(actions.eventSelected(annotationID, eventID)),
    })
)(Navigation)

const CategoryGroup = ({categoryGroup}) => (
    <div className="card mb-4" style={{minWidth: "200px"}}>
        <div className="card-header">
            <h5>{categoryGroup.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
            {categoryGroup.categories.map((i) =><li className="list-group-item" key={i.id}>{i.title}</li>)}
        </ul>
    </div>
)

let Categories = ({categoryGroups}) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <CategoryGroup categoryGroup={categoryGroups.request} />
            </div>

            <div className="col">
                <CategoryGroup categoryGroup={categoryGroups.callToAction} />
            </div>

        </div>
        <div className="row">
            <div className="col">
                <CategoryGroup categoryGroup={categoryGroups.report} />
            </div>

            <div className="col">
                <CategoryGroup categoryGroup={categoryGroups.other} />
            </div>
        </div>
    </div>
)
Categories = connect(
    state => ({
        categoryGroups: state.categoryGroups
    })
)(Categories)

let EventDescription = ({eventInfo}) => (
    <div>
        <h5 className="mt-5">Event description</h5>
        <p dangerouslySetInnerHTML={{__html: objectPath.get(eventInfo, 'description')}} />
    </div>
)
EventDescription = connect(
    state => ({eventInfo: selectors.getEventInfo(state)})
)(EventDescription)

let TweetBox = ({tweet}) => (
    <div key={`tweet-${tweet.postID}`}>
        {tweet && <TweetEmbed id={tweet.postID} />}
    </div>
)
TweetBox = connect(
    state => ({
        tweet: selectors.getTweet(state),
    })
)(TweetBox)

let TweetNavigation = ({annotationID, eventID, advanceTweet, tweetIndex}) => {
    const onClick = by => () => advanceTweet(annotationID, eventID, by)

    return <div className="btn-group" role="group">
      <button type="button" className={"btn " + (tweetIndex.hasPrevious ? "btn-secondary " : "btn-outline-secondary ")} onClick={tweetIndex.hasPrevious ? onClick(-1) : () => null}><span className="oi oi-media-skip-backward"></span></button>
      <button type="button" className="btn btn-secondary">{tweetIndex.tweetIndex + 1} of {tweetIndex.total}</button>
      <button type="button" className={"btn " + (tweetIndex.hasNext ? "btn-secondary " : "btn-outline-secondary ")} onClick={tweetIndex.hasNext ? onClick(1) : () => null}><span className="oi oi-media-skip-forward"></span></button>
    </div>
}
TweetNavigation = connect(
    state => ({
        annotationID: selectors.getAnnotationID(state),
        eventID: selectors.getEventID(state),
        tweetIndex: selectors.getTweetIndex(state),
    }),
    dispatch => ({
        advanceTweet: (annotationID, eventID, by) => dispatch(actions.advanceTweet(annotationID, eventID, by))
    })
)(TweetNavigation)

const App = () => (
    <div>
        <Navigation />

        <main className="container-fluid" role="main">
            <div className="row mx-1">
                <div className="col jumbotron mx-auto" style={{minWidth: "300px", maxWidth: "500px"}}>
                    <TweetNavigation />
                    <TweetBox />
                    <EventDescription />
                </div>
                <div className="col jumbotron ml-2">
                <Categories />
                </div>
            </div>
        </main>

        <footer className="footer">
            <div className="container">
                <span className="text-muted">Navigatoin trough the stream.</span>
            </div>
        </footer>
    </div>
)

export default App;
