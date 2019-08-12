import React, {Component} from 'react';
import {makeStyles, Typography, Paper} from "@material-ui/core";
import Path from "../../tools/Path/Path";
import Editor from "../../tools/Editor/Editor";


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
            <Typography color={"inherit"} variant={"h5"} className={classes.paperHeader}>DateiName</Typography>
            <Typography color={"inherit"} variant={"subtitle1"} className={classes.meta}>Bearbeitet
                von {"Max Mustermann"} am: {"12.12.12"}</Typography>
            <Editor content={props.content} readOnly={props.readOnly}/>
        </Paper>
    );
};


class WikiPage extends Component {
    pageContentInMD = '<h1>Das ist die Startseite</h1><br><br><p>Diesen Text kann man bearbeiten</p>';
    pageContentInMD2 = `<h1> Unterseite</h1><br><br><p>Auch hier kann man den Text ändern</p>`;

    render() {
        const path = window.location.pathname.replace("/wiki", "");
        if (path === "" || path === "/") {
            return (
                <div id="page-content">
                    <Path path={['home']}/>
                    <Content content={this.pageContentInMD} readOnly={this.props.readOnly}/>
                </div>
            );
        }
        const dir = path.split("/");
        dir.shift();
        const filename = dir[dir.length - 1];
        return (
            <div id="page-content">
                <Path path={dir}/>
                <Content content={'# hi ' + filename} readOnly={this.props.readOnly}/>
            </div>
        );

    }
}

export default WikiPage;
