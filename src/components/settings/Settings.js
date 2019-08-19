import React, {Component} from 'react';
import SideNav, {SideNavItem} from "../../tools/Nav/SideNav";
import ColorLensIcon from '@material-ui/icons/ColorLens';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {Container} from "@material-ui/core";
import Genral from "./General";
import Design from "./Design";
import User from "./User";
import Groups from "./Groups";
import Authentication from "./Authentication";
import Pages from "./Pages";


class Settings extends Component {
    state = {
        value: 0
    };

    onSideNavHandler = (value) => {
        this.setState({value: value})
    };

    links = [
        [
            <SideNavItem key={0} click={() => this.onSideNavHandler(0)} text={"Allgemein"} icon={<SettingsIcon/>}/>,
            <SideNavItem key={1} click={() => this.onSideNavHandler(1)} text={"Design"} icon={<ColorLensIcon/>}/>,
            <SideNavItem key={2} click={() => this.onSideNavHandler(2)} text={"Benutzer"} icon={<PersonIcon/>}/>,
            <SideNavItem key={3} click={() => this.onSideNavHandler(3)} text={"Gruppen"}
                         icon={<SupervisedUserCircleIcon/>}/>,
            <SideNavItem key={4} click={() => this.onSideNavHandler(4)} text={"Authentifizierung"} icon={<LockIcon/>}/>,
            <SideNavItem key={5} click={() => this.onSideNavHandler(5)} text={"Seiten"} icon={<InsertDriveFileIcon/>}/>,

        ]
    ];

    render() {
        let component;
        switch (this.state.value) {
            case 0:
                component = <Genral/>;
                break;
            case 1:
                component = <Design/>;
                break;
            case 2:
                component = <User/>;
                break;
            case 3:
                component = <Groups/>;
                break;
            case 4:
                component = <Authentication/>;
                break;
            case 5:
                component = <Pages/>;
                break;
            default:
                component = <Genral/>;
        }

        return (
            <div className="base">
                <SideNav
                    content={this.links}
                />
                <Container>
                    {component}
                </Container>
            </div>
        );
    }
}

export default Settings;