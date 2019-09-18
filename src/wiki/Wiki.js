import React, {Component} from 'react';
import Page from "../components/Page/Page";
import './Wiki.css';
import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";
import FileLoader from "../services/FileLoader";
import AdvancedSearch from "../components/Search/AdvancedSearch";
import {Route, Switch} from "react-router-dom";

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
        }
    };
    //später würde ich über Css-Classes/Ids machen
    setSideBarCss = () => {
        return this.state.showSideBar ? "showSideBar" : "hideSideBar";
    };

    constructor(props) {
        super(props);
        FileLoader.getStructure()
            .then(structure => this.setState({structure: structure}));
    }

    changeSidebarState(state){
        this.setState({showSideBar: state})
    }

    changeReadOnlyState(state){
        this.setState({page: {readOnly: state}})
    }

    render() {
        return (
            <div className={"base " + this.setSideBarCss()}>
                <SideBar
                    open={this.state.showSideBar}
                    structure={this.state.structure}
                    onClose={(sideBarState) => this.changeSidebarState(sideBarState)}/>
                <Switch>
                    <Route exact path="/search" component={AdvancedSearch}/>
                    <Route path="/" render={() =>
                        <div>
                            <TopBar onEdit={(readOnly) => this.changeReadOnlyState(readOnly)}
                                    readOnlyState={this.state.page.readOnly}
                                    path={this.dir}/>
                            <Page closeSidebar={(sideBarState)=> this.changeSidebarState(sideBarState)}
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
