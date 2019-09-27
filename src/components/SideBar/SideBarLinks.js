import React, {useContext, useState} from "react";
import {Collapse} from "@material-ui/core";
import {SideBarItem} from "./SideBarItem";
import StateContext from "../../contexts/StateContext";


const SideBarLinks = (props) => {
    const pageReadOnly = useContext(StateContext).page;
    const sidebar = useContext(StateContext).sidebar;
    const searchWord = useContext(StateContext).search.content;
    const structure = props.structure;
    let folder = [];
    for (let item in props.structure) {
        folder.push(item);
    }

    const show = (index, link) => {
        return (sidebar.openCategory === index && searchWord === "") || (searchWord !== "" && link.match(searchWord) !== null)
    };

    const resetReadOnlyState = () => {
        pageReadOnly.changeReadOnly(true);
    };

    const changeSidebarState = (sideBarState) => {
        props.setOpen(sideBarState);
    };

    const changeSidebarCategory = (category)=> {
        sidebar.changeSideBarOpen(sidebar.open, category);
    };

    return (folder.map((item, index) => {
        return (
            <div key={index} className={(index === sidebar.openCategory) ? "shadow-inset-center active" : ""}>
                <SideBarItem key={index} to={"/" + item} label={item} header
                             onClick={() => {
                                 changeSidebarCategory(index);
                                 resetReadOnlyState()
                             }}/>
                {structure[item].map((link, subindex) => {
                    return (
                        <Collapse key={subindex} in={show(index, link)} unmountOnExit>
                            <SideBarItem key={subindex} to={"/" + item + "/" + link} label={link}
                                         onClick={(sideBarState) => {
                                             changeSidebarState(sideBarState);
                                             resetReadOnlyState();
                                         }}/>
                        </Collapse>);
                })}
            </div>
        )
    }));
};

export default SideBarLinks;
