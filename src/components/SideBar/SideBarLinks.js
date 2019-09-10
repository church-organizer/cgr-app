import React, {useState} from "react";
import {Collapse} from "@material-ui/core";
import {SideBarItem} from "./SideBarItem";




const SideBarLinks = (props) => {
    const [open, setOpen] = useState(0);
    const structure = props.structure;
    const searchWord = props.searchWord;
    let folder = [];
    for (let item in props.structure) {
        folder.push(item);
    }

    const show = (index, link) => {
        return (open === index && searchWord === "") || (searchWord !== "" && link.match(searchWord) !== null)
    };

    return (folder.map((item, index) => {
        return (
            <div key={index} className={(index === open) ? "shadow-inset-center active" : ""}>
                <SideBarItem setOpen={() => setOpen(index)} key={index} to={"/" + item} label={item} header/>
                {structure[item].map((link, subindex) => {
                    return (
                        <Collapse key={subindex} in={show(index, link)} unmountOnExit>
                            <SideBarItem setOpen={props.setOpen} key={subindex}
                                         to={"/" + item + "/" + link} label={link}/>
                        </Collapse>);
                })}
            </div>
        )
    }));
};

export default SideBarLinks;
