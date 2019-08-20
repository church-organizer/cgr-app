import React, {Component} from 'react';
import {makeStyles, Typography, Paper} from "@material-ui/core";
import Path from "../../tools/Path/Path";
import Editor from "../../tools/Editor/Editor";
import SideNav, {SideNavItem} from "../../tools/Nav/SideNav";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PageConfig from "./PageConfig";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";


/**
 * Shows the content of a Page
 * @param props [content, readOnly]
 * @returns {*}
 * @constructor
 */
const Content = (props) => {
    const matches = useMediaQuery('(min-width:1100px)');
    return (
        <Paper style={{border: "1px",
            padding: "20px",
            textAlign: "left",
            margin: "10px"}}>
            <Typography color={"inherit"} variant={"h5"}>
                {props.title.replace('-', ' ')}
            </Typography>
            <Typography color={"inherit"} variant={"subtitle1"} style={{display: "inline-block",marginRight: "10px"}}>
                Bearbeitetvon {"Max Mustermann"} am: {"12.12.12"}
            </Typography>
            <Editor content={props.content} readOnly={props.readOnly}/>
        </Paper>
    );
};

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class WikiPage extends Component {
    filename;
    content;
    dir = [];
    path;

    /**
     * readOnly is optional
     * @param props [readOnly, pathname]
     */
    constructor(props) {
        super(props);
        this.state = {
            config: {
                show: false,
                type: ''
            },
            readOnly: {
                isReadOnly: !(this.props.readOnly === false)
            }
        };

        this.path = this.props.pathname.replace("/wiki", "");
        if (this.path === "" || this.path === "/") {
            this.filename = "Startseite";
            this.content = this.pageContentInMD;
        } else {
            this.dir = this.path.split("/");
            this.dir.shift();
            this.filename = this.dir[this.dir.length - 1];
            this.content = this.pageContentInMD2;
        }
    }

    pageContentInMD = '<h1>Das ist die Startseite</h1><br><br><p>Diesen Text kann man bearbeiten</p>';
    pageContentInMD2 = `<h1> Unterseite</h1><br><br><p>Auch hier kann man den Text ändern</p>`;

    onCreateHandler = () => {
        this.setState({config: {show: true, type: 'create'}});
    };

    onEditHandler = () => {
        this.setState({config: {show: true, type: 'edit'}});
    };

    onSaveHandler = () => {
        //todo save file here
        this.setState({
            readOnly: {
                isReadOnly: true
            }
        });
    };

    onEditAbort = () => {
        this.setState({
            readOnly: {
                isReadOnly: true
            }
        });
    };

    onDeleteHandler = () => {

    };

    onConfigAbort = () => {
        this.setState({
            config: {
                show: false,
                type: ''
            }
        });
    };


    editLinks = [
        [
            <SideNavItem key={1} click={this.onSaveHandler} text={"Seite Speichern"} icon={<SaveIcon/>}/>,
            <SideNavItem key={2} click={this.onEditAbort()} text={"Abbrechen"} icon={<CancelIcon/>}/>
        ]
    ];
    showLinks = [
        [
            <SideNavItem key={1} click={this.onCreateHandler} text={"Neue Seite"} icon={<AddIcon/>}/>,
            <SideNavItem key={2} click={this.onEditHandler} text={"Seite bearbeiten"} icon={<EditIcon/>}/>,
            <SideNavItem key={3} click={this.onDeleteHandler} text={"Seite löschen"} icon={<DeleteIcon/>}/>
        ]
    ];

    render() {
        // const path = this.props.pathname.replace("/wiki", "");


        return (
            <div id="page-content">
                <SideNav
                    content={this.state.readOnly.isReadOnly ? this.showLinks : this.editLinks}
                />
                <Path path={this.dir}/>
                <Content title={this.filename} content={this.content} readOnly={this.state.readOnly.isReadOnly}/>
                {this.state.config.show ?
                    <PageConfig new={this.state.config.type === 'create'} onAbort={this.onConfigAbort} name={this.filename}
                                path={this.path}/> : ""}
            </div>
        );

    }
}

export default WikiPage;
