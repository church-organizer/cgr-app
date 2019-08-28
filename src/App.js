import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import AdvancedSearch from "./components/Search/AdvancedSearch";
import SideBar from "./components/SideBar/SideBar";
import FileLoader from "./services/FileLoader";

class App extends Component {
    state = {
        login: {isLoggedIn: true, username: 'asd'},
        structure: {}
    };

    constructor(props) {
        super(props);
        FileLoader.structorFromApi(window.location.pathname).then(structure => this.setState({structure: structure}));
    }


    render() {
        return (
            <Router>
                <div className="App" style={{position: "fixed", width: "100%"}}>
                    {this.state.login.isLoggedIn ?

                            <div className="content">
                                <SideBar structure={this.state.structure}/>
                                <Switch>
                                    <Route exact path="/search" component={AdvancedSearch}/>
                                    <Route path="/" component={Wiki}/>
                                </Switch>
                            </div>
                        :
                        <Route path="/" render={(props) => <Login onLogin={(username) =>
                            this.setState({isLoggedIn: true, username: username})}/>}/>}

                </div>
            </Router>
        );
    }
}

export default App;
