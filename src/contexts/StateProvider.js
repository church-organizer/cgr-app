import React, {Component} from "react";
import StateContext from "./StateContext";

class StateProvider extends Component {
    state = {
        searchContent: "",
        sidebar:{
            open: true,
            openCategory: 0
        },
        pageReadOnly: true,
        message: {
            open: false,
            title: "",
            message: "",
            isError: false,
            actionButtons: []
        },
        login: {
            open: false,
            isLoaded: false,
            isLoggedIn: false,
            username: ''
        }
    };

    render() {
        return (
            <StateContext.Provider value={{
                search: {
                    content: this.state.searchContent,
                    changeSearchContent: searchContent => {
                        console.log(searchContent);
                        this.setState({searchContent: searchContent});
                    }
                },
                sidebar: {
                    open: this.state.sidebar.open,
                    openCategory: this.state.sidebar.openCategory,
                    changeSideBarOpen: (openState, openCategory) => {
                        this.setState({
                            sidebar: {
                                open: openState,
                                openCategory: openCategory
                            }
                        });
                    }
                },
                page: {
                    readOnly: this.state.pageReadOnly,
                    changeReadOnly: readOnly => {
                        this.setState({pageReadOnly: readOnly});
                    }
                },
                message: {
                    open: this.state.message.open,
                    title: this.state.message.title,
                    message: this.state.message.message,
                    isError: this.state.message.isError,
                    actionButtons: this.state.message.actionButtons,
                    changeMessageState: (open, title, message, actionButtons, isError = false) => {
                        this.setState({
                            message: {
                                open: open,
                                title: title,
                                message: message,
                                isError: isError,
                                actionButtons: actionButtons
                            }
                        })
                    },
                    close: () => {
                        this.setState({
                            message: {
                                open: false,
                                title: "",
                                message: "",
                                isError: false,
                                actionButtons: []
                            }
                        })
                    }
                },
                login: {
                    open: this.state.login.open,
                    isLoggedIn: this.state.login.isLoggedIn,
                    changeLoginState: (open, isLoggedIn, isLoaded, username) => {
                        this.setState({
                            login: {
                                open: open,
                                isLoggedIn: isLoggedIn,
                                isLoaded: isLoaded,
                                username: username
                            }
                        })
                    }
                }
            }}>
                {this.props.children}
            </StateContext.Provider>
        );
    }
}

export default StateProvider;