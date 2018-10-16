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

let Navigation = ({annotations, onChangeAnnotation, annotationID, eventID, onChangeEvent}) => {
    const eventsAnnotated = [...objectPath.get(annotations, [annotationID, 'payload', 'annotator', 'eventsAnnotated'], [])].map(([k, v]) => [v.identifier, v.name])

    return <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <span className="navbar-brand h1 mb-0">Incident Streams</span>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline">
                <Select title="Annotation" onChange={annotationID => onChangeAnnotation(annotationID)} value={annotationID} values={Object.entries(annotations).map(([key, {title}]) => [key, title])} />
                {eventsAnnotated && <Select title="Event" onChange={eventID => onChangeEvent(annotationID, eventID)} value={eventID} values={eventsAnnotated} />}
            </form>
        </div>
    </nav>
}
Navigation = connect(
    state => ({
        annotations: state.annotations,
        annotationID: state.ui.annotationID,
        eventID: state.ui.eventIDbyAnnotationID[state.ui.annotationID],
    }),
    dispatch => ({
        onChangeAnnotation: (annotationID) => dispatch(actions.annotationSelected(annotationID)),
        onChangeEvent: (annotationID, eventID) => dispatch(actions.eventSelected(annotationID, eventID)),
    })
)(Navigation)

const CategoryGroup = ({title, categories}) => (
    <div className="card mb-4" style={{minWidth: "200px"}}>
        <div className="card-header">
            <h5>{title}</h5>
        </div>
        <ul className="list-group list-group-flush">
            {categories.map((c) =><li className="list-group-item" key={c}>{c}</li>)}
        </ul>
    </div>
)

const Categories = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <CategoryGroup title="Request" categories={["Goods and Services", "Search and Rescue", "Information Wanted"]}/>
            </div>

            <div className="col">
                <CategoryGroup title="Call to Action" categories={["Volunteer", "Donations", "Move People"]}/>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <CategoryGroup title="Report" categories={[
                        "First Party Observation", "Third Party Observation", "Weather",
                        "Emerging Threats", "Significant Event Change", "Multimedia Share",
                        "Service Available", "Factoid", "Official", "Clenaup", "Hashtags"]}/>
            </div>

            <div className="col">
                <CategoryGroup title="Other" categories={[
                        "Past News", "Continuing News", "Advice", "Sentiment", "Discussion",
                        "Irrelevant", "Unknown", "Known already"]}/>
            </div>
        </div>
    </div>
)

let EventDescription = ({annotationID, eventID, annotations}) => {
    const eventInfo = objectPath.get(annotations, [annotationID, 'payload', 'annotator', 'eventsAnnotated'], new Map()).get(eventID)

    return (<div>
        <h5 className="mt-5">Event description</h5>
        <p dangerouslySetInnerHTML={{__html: objectPath.get(eventInfo, 'description')}} />
    </div>)
}
EventDescription = connect(
    state => ({
        annotationID: state.ui.annotationID,
        eventID: state.ui.eventIDbyAnnotationID[state.ui.annotationID],
        annotations: state.annotations,
    })
)(EventDescription)

let TweetBox = ({annotationID, eventID, annotations}) => {
    const tweets = (objectPath.get(annotations, [annotationID, 'payload', 'events'], new Map()).get(eventID) || {}).tweets || [{}]
    const tweetID = (tweets[0] || {}).postID
    return <div key={`tweet-${tweetID}`}>
        {tweetID && <TweetEmbed id={tweetID} />}
    </div>
}
TweetBox = connect(
    state => ({
        annotationID: state.ui.annotationID,
        eventID: state.ui.eventIDbyAnnotationID[state.ui.annotationID],
        annotations: state.annotations,
    })
)(TweetBox)


const App = () => (
    <div>
        <Navigation />

        <main className="container-fluid" role="main">
            <div className="row mx-1">
                <div className="col jumbotron mx-auto" style={{minWidth: "300px", maxWidth: "500px"}}>
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
