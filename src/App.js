import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import PopperJS from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import './App.css';

import TweetEmbed from './tweet-embed'

let CategoryGroup = ({title, categories}) => (
    <div className="card mb-4" style={{minWidth: "200px"}}>
        <div className="card-header">
            <h5>{title}</h5>
        </div>
        <ul className="list-group list-group-flush">
            {categories.map((c) =><li className="list-group-item" key={c}>{c}</li>)}
        </ul>
    </div>
)

let Categories = () => (
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
                        "Service Available", "Factoid", "Official", "Clenaup", "Hashtags"
                ]}/>
            </div>

            <div className="col">
                <CategoryGroup title="Other" categories={[
                        "Past News", "Continuing News", "Advice", "Sentiment", "Discussion",
                        "Irrelevant", "Unknown", "Known already",
                ]}/>

            </div>
        </div>
    </div>
)

let App = () => (
    <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <span className="navbar-brand">Incident Streams</span>
    </nav>

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
