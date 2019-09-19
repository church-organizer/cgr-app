import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import FileLoader from "./services/FileLoader";
import "./animations.css"

class App extends Component {
    state = {
        login: {isLoggedIn: true, username: 'asd'},
    };

    constructor(props) {
        super(props);
    }
    content = () => {
        if (this.state.login.isLoggedIn) {
            return (
                <div className="content">
                    <Wiki/>
                </div>
            )
        } else {
            return (
                <Route path="/" render={(props) => <Login onLogin={(username) =>
                    this.setState({isLoggedIn: true, username: username})}/>}/>
            )
        }
    };

    render() {
        return (
            <Router>
                <div className="App" style={{position: "fixed", width: "100%"}}>
                    {this.content()}
                </div>
            </Router>
        );
    }
}

export default App;
