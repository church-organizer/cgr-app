import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import AdvancedSearch from "./components/Search/AdvancedSearch";
import SideBar from "./components/SideBar/SideBar";

class App extends Component {
    // state = {
    //     login: {isLoggedIn: true, username: 'Dieter'}
    // };

    render() {
        return (
            <Router>
                <div className="App" style={{position: "fixed", width: "100%"}}>
                    <SideBar/>
                    <div className="content">
                        <Switch>
                            <Route exact path="/search" component={AdvancedSearch}/>
                            <Route path="/" component={Wiki}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
