import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import PopperJS from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import './App.css';

import TweetEmbed from './tweet-embed'

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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="card mb-4" style={{minWidth: "200px"}}>
                                <div className="card-header">
                                    <h5>Request</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Goods and Services</li>
                                    <li className="list-group-item">Search and Rescue</li>
                                    <li className="list-group-item">Information Wanted</li>
                                </ul>
                            </div>

                        </div>

                        <div className="col">
                            <div className="card mb-4" style={{minWidth: "200px"}}>
                                <div className="card-header">
                                    <h5>Call to Action</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Volunteer</li>
                                    <li className="list-group-item">Donations</li>
                                    <li className="list-group-item">Move People</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card mb-4" style={{minWidth: "200px"}}>
                                <div className="card-header">
                                    <h5>Report</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">First Party Observation</li>
                                    <li className="list-group-item">Third Party Observatoin</li>
                                    <li className="list-group-item">Weather</li>
                                    <li className="list-group-item">Emerging Threats</li>
                                    <li className="list-group-item">Significant Event Change</li>
                                    <li className="list-group-item">Multimedia Share</li>
                                    <li className="list-group-item">Service Available</li>
                                    <li className="list-group-item">Factoid</li>
                                    <li className="list-group-item">Official</li>
                                    <li className="list-group-item">Clenaup</li>
                                    <li className="list-group-item">Hashtags</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card" style={{minWidth: "200px"}}>
                                <div className="card-header">
                                    <h5>Other</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Past News</li>
                                    <li className="list-group-item">Continuing News</li>
                                    <li className="list-group-item">Advice</li>
                                    <li className="list-group-item">Sentiment</li>
                                    <li className="list-group-item">Discussion</li>
                                    <li className="list-group-item">Irrelevant</li>
                                    <li className="list-group-item">Unknown</li>
                                    <li className="list-group-item">Known Already</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
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
