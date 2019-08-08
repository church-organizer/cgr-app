import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Wiki from "./components/wiki/Wiki";
import Rating from "./components/rating/Rating";
import Media from "./components/media/Media";
import Start from "./components/start/Start"
import CreatePage from "./components/wiki/CreatePage";
import {
    Button,
} from "@material-ui/core";
import TopNav from "./tools/TopNav/TopNav";


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <TopNav/>

                    <div className="content">
                        <Route exact path="/" component={Start}/>
                        <Route exact path="/wiki" component={Wiki}/>
                        <Route exact path="/rating" component={Rating}/>
                        <Route exact path="/media" component={Media}/>
                        <Route path="/wiki/create" component={CreatePage}/>
                    </div>
                    {/*<SnackbarProvider maxSnack={3}>*/}
                    {/*    <CreatePopup/>*/}
                    {/*</SnackbarProvider>*/}
                </div>
            </Router>
        );
    }
}

export default App;
