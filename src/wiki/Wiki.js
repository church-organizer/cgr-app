import React, {Component} from 'react';
import Page from "../components/Page/Page";
import './Wiki.css';
import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";
import FileLoader from "../services/FileLoader";

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
    render() {
        return (
            <div className={"base " + this.setSideBarCss()}>
                <TopBar onEdit={(readOnly) => this.setState({page: {readOnly: readOnly}})} path={this.dir}/>
                <SideBar
                    open={this.state.showSideBar}
                    structure={this.state.structure}
                    onClose={(sideBarState) => this.setState({showSideBar: sideBarState})}/>
                <Page readOnly={this.state.page.readOnly}/>
                <Footer/>
            </div>
        );
    }
}

export default Wiki;
