import React from "react";
import UndoRedo from "./UndoRedo/UndoRedo";
import "./EditingBar.css";
import Font from "./Font/Font";
import TextAlignColor from "./TextAlignColor/TextAlignColor";
import Search from '../Search/Search'
export default function EditingBar() {

    return (

        <div className="editingBar">
            <UndoRedo />
            <Font />
            <TextAlignColor/>
            <Search/>
        </div>
    )

}

