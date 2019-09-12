import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import AdvancedSearch from "./components/Search/AdvancedSearch";
import FileLoader from "./services/FileLoader";
import "./animations.css"

class App extends Component {
    state = {
        login: {isLoggedIn: true, username: 'asd'},
    };

    constructor(props) {
        super(props);
        FileLoader.getStructure(window.location.pathname)
            .then(structure => this.setState({structure: structure}));
    }
    content = () => {
        if (this.state.login.isLoggedIn) {
            return (
                <div className="content">
                    <Switch>
                        <Route exact path="/search" component={AdvancedSearch}/>
                        <Route path="/" component={Wiki}/>
                    </Switch>
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
