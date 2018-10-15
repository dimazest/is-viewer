import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import './App.css';

import { connect } from 'react-redux'

import TweetEmbed from './tweet-embed'

import * as actions from './actions'

let Navigation = ({annotations, onChangeAnnotation, annotationID}) => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <span className="navbar-brand h1 mb-0">Incident Streams</span>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <form className="form-inline">
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Annotation</span>
                    </div>
                    <select className="custom-select custom-select-sm"
                        onChange={e => onChangeAnnotation(e.target.value)}
                        value={annotationID}
                        >
                        {Object.entries(annotations).map(([key, {title}]) => (
                            <option value={key} key={key}>{title}</option>))}
                    </select>
                </div>
            </form>
        </div>
    </nav>
)
Navigation = connect(
    state => ({annotations: state.data.annotations, annotationID: state.ui.annotationID}),
    dispatch => ({onChangeAnnotation: annotationID => dispatch(actions.annotationSelected(annotationID))})
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

let App = () => (
    <div>
        <Navigation />

        <main className="container-fluid" role="main">
            <div className="row mx-1">
                <div className="col jumbotron mx-auto" style={{minWidth: "300px", maxWidth: "500px"}}>
                    <TweetEmbed id="1050095243318714368" />
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
