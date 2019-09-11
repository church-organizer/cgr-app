import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import AdvancedSearch from "./components/Search/AdvancedSearch";
import SideBar from "./components/SideBar/SideBar";
import FileLoader from "./services/FileLoader";
import "./animations.css"

class App extends Component {
    state = {
        login: {isLoggedIn: true, username: 'asd'},
        structure: {},
        showSideBar: true
    };

    constructor(props) {
        super(props);
        FileLoader.getStructure(window.location.pathname)
            .then(structure => this.setState({structure: structure}));
    }

    // die werden noch ausgelagert 
    hideSideBarCss = {
        left: "20px", 
        width: "calc(100% - 30px)"
    }

    showSideBarCss = {
        left: "260px",
    }
    //später würde ich über Css-Classes/Ids machen 
    setSideBarCss = () => {
        return this.state.showSideBar ? this.showSideBarCss : this.hideSideBarCss;
    }

    content = () => {
        if (this.state.login.isLoggedIn) {
            return (
                <div className="content" style={this.setSideBarCss()}>
                    <SideBar 
                        open={this.state.showSideBar} 
                        structure={this.state.structure} 
                        onClose={(sideBarState) => this.setState({showSideBar: sideBarState})}/>
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
    }

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
