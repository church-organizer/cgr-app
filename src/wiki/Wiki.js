import React, {Component} from 'react';
import Page from "../components/Page/Page";
import './Wiki.css';
import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";
import FileLoader from "../services/FileLoader";
import AdvancedSearch from "../components/Search/AdvancedSearch";
import {Route, Switch} from "react-router-dom";
import Message from "../components/Error/Message";
import Button from "@material-ui/core/Button";
import Login from "../components/Login/Login";

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {
    dir = [];
    state = {
        structure: {},
        showSideBar: true,
        page: {
            readOnly: true
        },
        error: {
            title: "",
            message: "",
            open: false
        },
        login: {
            open: false,
            isLoggedIn: false,
            callback: () => {
            }
        }
    };
    //später würde ich über Css-Classes/Ids machen
    setSideBarCss = () => {
        return this.state.showSideBar ? "showSideBar" : "hideSideBar";
    };

    constructor(props) {
        super(props);
        FileLoader.getStructure()
            .then(structure => this.setState({structure: structure}))
            .catch(error => {
                this.setState({
                    error: {
                        title: "Keine Daten",
                        message: error.toString(),
                        open: true
                    }
                });
            });
    }

    changeSidebarState(state) {
        this.setState({showSideBar: state})
    }

    changeReadOnlyState(state) {
        this.setState({page: {readOnly: state}})
    }

    loginFirst(callback) {
        this.setState({login: {isLoggedIn: false, open: true, callback: callback}});
    }

    onSuccess() {
        this.state.login.callback();
        this.setState({
            login: {
                isLoggedIn: true,
                open: false,
                callback: () => {
                }
            }
        })
    }

    onAbort() {
        this.setState({
            login: {
                isLoggedIn: false,
                open: false,
                callback: () => {
                }
            }
        });
    }

    render() {
        return (
            <div className={"base " + this.setSideBarCss()}>
                <Login open={this.state.login.open}
                       onSuccess={() => this.onSuccess()}
                       onAbort={() => this.onAbort()}/>
                <Message open={this.state.error.open} title={this.state.error.title} message={this.state.error.message}
                         isError>
                    <Button href={window.location.pathname} color={"primary"}>Die Seite neu laden</Button>
                    <Button href="https://cg-rahden.de" color={"primary"}>Zur CGR Startseite</Button>
                </Message>
                <SideBar
                    open={this.state.showSideBar}
                    structure={this.state.structure}
                    resetReadOnlyState={() => this.changeReadOnlyState(true)}
                    onClose={(sideBarState) => this.changeSidebarState(sideBarState)}/>
                <Switch>
                    <Route exact path="/search" component={AdvancedSearch}/>
                    <Route path="/" render={() =>
                        <div>
                            <TopBar onEdit={(readOnly) => this.loginFirst(() => this.changeReadOnlyState(readOnly))}
                                    readOnlyState={this.state.page.readOnly}
                                    path={this.dir}/>
                            <Page closeSidebar={(sideBarState) => this.changeSidebarState(sideBarState)}
                                  readOnly={this.state.page.readOnly}
                                  onEdit={(readOnly) => this.changeReadOnlyState(readOnly)}/>
                        </div>}/>

                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Wiki;
