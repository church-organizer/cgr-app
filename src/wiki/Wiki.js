import React, {Component} from 'react';
import Page from "../components/Page/Page";
import './Wiki.css';
import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";
import AdvancedSearch from "../components/Search/AdvancedSearch";
import Message from "../components/Error/Message";
import Button from "@material-ui/core/Button";
import Login from "../components/Login/Login";
import StateContext from "../contexts/StateContext";
import { getPaths } from '../services/strapi.service';
import { checkLoggedIn } from '../services/Authentication';

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {
    dir = [];
    state = {
        structure: [],
    };
    static contextType = StateContext;
    //später würde ich über Css-Classes/Ids machen
    setSideBarCss = () => {
        return this.context.sidebar.open ? "showSideBar" : "hideSideBar";
    };

    constructor(props) {
        super(props);
        getPaths().then(res => {
            const structure = [];
            res.data.map(entry => {
                const name = entry.path;
                const paths = entry.articles.map(article => article.title);
                structure.push({
                    name: name,
                    paths: paths
                });
            });
            this.setState({structure: structure});
        })
        .catch(error => {
            this.context.message.changeMessageState(true,
                "",
                error.toString(),
                [<Button href={window.location.pathname} color={"primary"}>Die Seite neu laden</Button>,
                <Button href="https://cg-rahden.de" color={"primary"}>Zur CGR Startseite</Button>],
                true
                );
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
        this.context.page.changeReadOnly(state);
    }

    /**
     * opens the login form and saves the callback
     */
    loginFirst() {
        if (!this.context.login.isLoggedIn) {
            checkLoggedIn().then((res) => {
                if (res) {
                    this.context.login.changeLoginState(false, true, true, res.username);
                } else {
                    this.context.login.changeLoginState(true, false, false, '');
                }
            }).catch((err) => {
                console.log('error: ', err);
            });
        }
    }

    pageOrSearchContent() {
        if (this.context.search.content === "") {
            return (
                <div>
                    <TopBar
                        onClick={
                            (readOnly) => {
                                if (this.context.login.isLoggedIn) {
                                    this.changeReadOnlyState(false);
                                } else {
                                    if (!readOnly) {
                                        this.loginFirst();
                                        if (this.context.login.isLoggedIn) {
                                            this.changeReadOnlyState(false);
                                        }
                                    }
                                }
                            }
                        }
                        path={this.dir}/>
                    <Page/>
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
                <Message/>
                <SideBar structure={this.state.structure}/>
                {this.pageOrSearchContent()}
                <Footer/>
            </div>
        );
    }
}

export default Wiki;
