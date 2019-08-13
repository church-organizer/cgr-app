import React, {Component} from 'react';
import {makeStyles, Typography, Paper} from "@material-ui/core";
import Path from "../../tools/Path/Path";
import Editor from "../../tools/Editor/Editor";
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PageConfig from "./PageConfig";


const useStyles = makeStyles(theme => ({
    paper: {
        maxWidth: "1200px",
        minWidth: "700px",
        width: "60%",
        border: "1px",
        padding: "20px",
        textAlign: "left",
        margin: "10px"
    },
    meta: {
        display: "inline-block",
        marginRight: "10px"
    },
    paperHeader: {},
}));

const Content = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography color={"inherit"} variant={"h5"}
                        className={classes.paperHeader}>{props.title.replace('-', ' ')}</Typography>
            <Typography color={"inherit"} variant={"subtitle1"} className={classes.meta}>Bearbeitet
                von {"Max Mustermann"} am: {"12.12.12"}</Typography>
            <Editor content={props.content} readOnly={props.readOnly}/>
        </Paper>
    );
};


class WikiPage extends Component {
    state = {
        config: {
            show: false,
            type: ''
        }
    };
    pageContentInMD = '<h1>Das ist die Startseite</h1><br><br><p>Diesen Text kann man bearbeiten</p>';
    pageContentInMD2 = `<h1> Unterseite</h1><br><br><p>Auch hier kann man den Text ändern</p>`;

    onCreateHandler = () => {
        console.log('create');
        this.setState({config: {show: true, type: 'create'}});
    };

    onEditHandler = () => {

    };

    onSaveHandler = () => {

    };

    onDeleteHandler = () => {

    };


    editLinks = [
        [
            <SideNavItem key={1} click={this.onSaveHandler} text={"Seite Speichern"} icon={<SaveIcon/>}/>,
            <SideNavItem key={2} click={this.onDeleteHandler} text={"Abbrechen"} icon={<CancelIcon/>}/>
        ]
    ];
    showLinks = [
        [
            <SideNavItem key={1} click={this.onCreateHandler} text={"Neue Seite"} icon={<AddIcon/>}/>,
            <SideNavItem key={2} click={this.onEditHandler} text={"Seite bearbeiten"} icon={<EditIcon/>}/>,
            <SideNavItem key={3} text={"Seite löschen"} icon={<DeleteIcon/>}/>
        ]
    ];

    render() {
        console.log(this.state.config.show);
        const path = window.location.pathname.replace("/wiki", "");
        if (path === "" || path === "/") {
            return (
                <div id="page-content">
                    <SideNav
                        content={this.props.readOnly || this.props.readOnly === undefined ? this.showLinks : this.editLinks}
                    />
                    <Path path={[]}/>
                    <Content title={'Startseite'} content={this.pageContentInMD} readOnly={this.props.readOnly}/>
                    {this.state.config.show ? <PageConfig new={this.state.type === 'create'} name={""} path={""}/> : ""}
                </div>
            );
        }
        const dir = path.split("/");
        dir.shift();
        const filename = dir[dir.length - 1];
        return (
            <div id="page-content">
                <SideNav
                    content={this.props.readOnly || this.props.readOnly === undefined ? this.showLinks : this.editLinks}
                />
                <Path path={dir}/>
                <Content title={filename} content={'# hi ' + filename} readOnly={this.props.readOnly}/>
                {this.state.config.show ? <PageConfig new={this.state.type === 'create'} name={""} path={""}/> : ""}
            </div>
        );

    }
}

export default WikiPage;
