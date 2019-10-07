import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import "./animations.css"
import { isAuthenticated } from './services/Authentication';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            username: '',
        }
    }

    componentDidMount() {
        isAuthenticated().then(response => {
            if (response.data.authorized) {
                this.setState({ isLoaded: true, isLoggedIn: true, username: response.data.username });
            }
        }).catch((err) => {
            this.setState({ isLoaded: true });
            console.log('error: ', err);
        });
    }

    render() {
        let content = '';
        if (this.state.isLoggedIn) {
            content =
                <div className="content">
                    <Wiki />
                </div>
        } else {
            content =
                <Route path="/" render={() => <Login onLogin={(username) =>
                    this.setState({ isLoggedIn: true, username: username })} />} />
        }
        return (
            <Router>
                <div className="App" style={{ position: "fixed", width: "100%" }}>
                    {this.state.isLoaded ? content : "waiting"}
                </div>
            </Router>
        );
    }
}

export default App;
