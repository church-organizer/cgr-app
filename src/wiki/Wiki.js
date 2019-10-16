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
import StateContext from "../contexts/StateContext";

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {
    dir = [];
    state = {
        structure: {},
        sidebar: {
            open: true,
            openCategory: 0
        },
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
    static contextType = StateContext;
    //später würde ich über Css-Classes/Ids machen
    setSideBarCss = () => {
        return this.context.sidebar.open ? "showSideBar" : "hideSideBar";
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

    /**
     * changes the sidebar open state
     * opens or closes the sidebar
     * @param state the new state
     */
    changeSidebarState(state) {
        this.setState({showSideBar: state})
    }

    /**
     * changes the readonly state of the content
     * @param state new state
     */
    changeReadOnlyState(state) {
        this.setState({page: {readOnly: state}})
    }

    /**
     * opens the login form and saves the callback
     * the callback will be called if login succeded
     * @param callback
     */
    loginFirst(callback) {
        this.context.login.changeLoginState(true, false, callback);
    }

    pageOrSearchContent() {
        if (this.context.search.content === "") {
            return (
                <div>
                    <TopBar
                        onClick={(readOnly) => !readOnly ? this.loginFirst(() => this.changeReadOnlyState(readOnly)) : this.changeReadOnlyState(readOnly)}
                        readOnlyState={this.state.page.readOnly}
                        path={this.dir}/>
                    <Page closeSidebar={(sideBarState) => this.changeSidebarState(sideBarState)}
                          readOnly={this.state.page.readOnly}
                          onEdit={(readOnly) => this.changeReadOnlyState(readOnly)}/>
                </div>
            );
        } else {
            return (<AdvancedSearch/>);
        }
    }

    render() {
        return (
            <div className={"base " + this.setSideBarCss()}>
                <Login/>
                <Message open={this.state.error.open} title={this.state.error.title} message={this.state.error.message}
                         isError>
                    <Button href={window.location.pathname} color={"primary"}>Die Seite neu laden</Button>
                    <Button href="https://cg-rahden.de" color={"primary"}>Zur CGR Startseite</Button>
                </Message>
                <SideBar
                    structure={this.state.structure}
                    resetReadOnlyState={() => this.changeReadOnlyState(true)}
                    onClose={(sideBarState) => this.changeSidebarState(sideBarState)}/>
                <div>

                    {this.pageOrSearchContent()}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Wiki;
