import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import Wiki from "./components/wiki/Wiki";
import Rating from "./components/rating/Rating";
import Media from "./components/media/Media";
import Start from "./components/start/Start"
import CreatePage from "./components/wiki/CreatePage";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <h1 id="title">Organizer</h1>
                    <Link to="/" className="homeButton">Start</Link>
                    <div className="nav">
                        <Link to="/wiki" className="nav-button">Wiki</Link>
                        <Link to="/rating" className="nav-button">Bewerten</Link>
                        <Link to="/media" className="nav-button">Medien</Link>
                        <Route exact path="/" component={Start}/>
                        <Route exact path="/wiki" component={Wiki}/>
                        <Route exact  path="/rating" component={Rating}/>
                        <Route exact  path="/media" component={Media}/>
                        <Route path="/wiki/create" component={CreatePage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
