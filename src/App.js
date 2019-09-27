import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Wiki from "./wiki/Wiki";
import Login from "./components/Login/Login";
import "./animations.css"
import { isAuthenticated } from './services/Authentication';
import Cookies from 'js-cookie';
import axios from 'axios';

class App extends Component {
    state = {
        login: { isLoggedIn: false, username: '' },
    };

    componentDidMount() {
        this.getUsers();
        // isAuthenticated().then(response => {
        //     console.log(response.data);
        //     if (response.data.authorized) {
        //         this.setState({ isLoggedIn: true, username: response.data.username });
        //     }
        // });
    }

    getUsers = async () => {
        const jwt = Cookies.get('jwt');

        let res = await axios({
            method: 'post',
            url: 'localhost:3001/authenticate',
            headers: {
                'authorization': jwt
            }
        });
        let { data } = res.data;
        console.log(data);
    };

    content = () => {
        if (this.state.login.isLoggedIn) {
            return (
                <div className="content">
                    <Wiki />
                </div>
            )
        } else {
            return (
                <Route path="/" render={(props) => <Login onLogin={(username) =>
                    this.setState({ isLoggedIn: true, username: username })} />} />
            )
        }
    };

    render() {
        return (
            <Router>
                <div className="App" style={{ position: "fixed", width: "100%" }}>
                    {this.content()}
                </div>
            </Router>
        );
    }
}

export default App;
