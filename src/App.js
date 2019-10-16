import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import "./animations.css"
import StateProvider from "./contexts/StateProvider";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App content" style={{position: "fixed", width: "100%"}}>
                    <StateProvider>
                        <Route path="/" component={Wiki}/>
                    </StateProvider>
                </div>
            </Router>
        );
    }
}

export default App;
