import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Wiki from "./components/wiki/Wiki";
import Rating from "./components/rating/Rating";
import Media from "./components/media/Media";
import Start from "./components/start/Start"
import TopNav from "./tools/Nav/TopNav";
import Login from "./tools/Login/Login";
import Register from "./tools/Login/Register";
import BottomNav from "./tools/Nav/BottomNav";


class App extends Component {
    state = {
        login: {isLoggedIn: true, username: 'Dieter'}
    };

    // onLogIn = (name) => {
    //     this.setState({login: {isLoggedIn: true, username: name}})
    // };

    render() {
        return (
            <Router>
                <div className="App" style={{position: "fixed", width: "100%"}}>
                    <Route exact path="/register" component={Register}/>
                    {!this.state.login.isLoggedIn ? <Login onLogin={this}/> : (
                        <div className="content">
                            <TopNav username={this.state.login.username}/>
                            <Route exact path="/" component={Start}/>
                            <Route exact path="/wiki" component={Wiki}/>
                            <Route exact path="/rating" component={Rating}/>
                            <Route exact path="/media" component={Media}/>
                            <Route path="/wiki/:name" component={Wiki}/>
                            <BottomNav/>
                        </div>)
                    }


                    {/*<SnackbarProvider maxSnack={3}>*/}
                    {/*    <CreatePopup/>*/}
                    {/*</SnackbarProvider>*/}
                </div>
            </Router>
        );
    }
}

export default App;
