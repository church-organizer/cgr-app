import React, {useState} from "react";
import {Collapse} from "@material-ui/core";
import {SideBarItem} from "./SideBarItem";


const SideBarLinks = (props) => {
    const [openGoup, setOpenGroup] = useState(0);
    const structure = props.structure;
    const searchWord = props.searchWord;
    let folder = [];
    for (let item in props.structure) {
        folder.push(item);
    }

    const show = (index, link) => {
        return (openGoup === index && searchWord === "") || (searchWord !== "" && link.match(searchWord) !== null)
    };

    const resetReadOnlyState = () => {
        props.resetReadOnlyState();
    };

    const changeSidebarState = (sideBarState) => {
        props.setOpen(sideBarState);
    };

    return (folder.map((item, index) => {
        return (
            <div key={index} className={(index === openGoup) ? "shadow-inset-center active" : ""}>
                <SideBarItem key={index} to={"/" + item} label={item} header
                             onClick={() => {
                                 setOpenGroup(index);
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
