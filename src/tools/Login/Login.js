import React from "react";
import {Container, Paper, Tab, Tabs} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";

const Login = () => {

    return (
        <Container maxWidth={"xs"}>
            <Paper>
                <AppBar>
                    <Tabs variant={"fullWidth"} value={0} indicatorColor="primary" textColor="primary">
                        <Tab label="Active"/>
                        <Tab label="Disabled" disabled/>
                        <Tab label="Active"/>
                    </Tabs>
                </AppBar>
            </Paper>
        </Container>
    );
};


export default Login
