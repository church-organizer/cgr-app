import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";
import {makeStyles, Typography, Paper, Divider} from "@material-ui/core";
import Path from "../../tools/Path";


const useStyles = makeStyles(theme => ({
    paper: {
        width: "1200px",
        border: "1px",
        padding: "20px",
        textAlign: "left",
        position: 'relative', left: '5%', top: "40px",
        transform: 'translate(-22%, 0%)',
        margin: "20px"
    },
    meta: {
        display: "inline-block",
        marginRight: "10px"
    },
    paperHeader: {}
}));

const Content = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography color={"inherit"} variant={"h5"} className={classes.paperHeader}>DateiName</Typography>
            <Typography color={"inherit"} variant={"subtitle1"} className={classes.meta}>Bearbeitet von {"Max Mustermann"} am: {"12.12.12"}</Typography>
            <Divider/>
            <ReactMarkdown source={props.content}/>
        </Paper>
    );
};


class WikiPage extends Component {
    pageContentInMD = '# Das ist die Startseite\n\nDiesen Text kann man bearbeiten';

    render() {
        if (this.props.file === "") {
            return (
                <div id="page-content">
                    <Path path={['/']} />
                    <Content content={this.pageContentInMD}/>
                </div>
            );
        }
        return (
            <div id="page-content">
                <Path style={{display: "inline-block"}}/>
                <Content content={""}/>
            </div>
        );

    }
}

export default WikiPage;
