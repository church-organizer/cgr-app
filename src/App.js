import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import AdvancedSearch from "./components/Search/AdvancedSearch";
import SideBar from "./components/SideBar/SideBar";
import FileLoader from "./services/FileLoader";
import Footer from "./components/Footer/Footer";
import "./animations.css"

class App extends Component {
    state = {
        login: {isLoggedIn: true, username: 'asd'},
        structure: {},
        showSideBar: {show: true}
    };

    constructor(props) {
        super(props);
        FileLoader.getStructure(window.location.pathname).then(structure => this.setState({structure: structure}));
    }


    render() {
        return (
            <Router>
                <div className="App" style={{position: "fixed", width: "100%"}}>
                    {this.state.login.isLoggedIn ?
                            <div className="content" style={!this.state.showSideBar.show ? {left: "20px", width: "calc(100% - 30px)"} : {left: "260px"}}>
                                <SideBar open={this.state.showSideBar.show}  structure={this.state.structure} onClose={(state)=> this.setState({showSideBar: {show: state}})}/>
                                <Switch>
                                    <Route exact path="/search" component={AdvancedSearch}/>
                                    <Route path="/" component={Wiki}/>
                                </Switch>
                                <Footer fullWidth={this.state.showSideBar.show}/>
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
