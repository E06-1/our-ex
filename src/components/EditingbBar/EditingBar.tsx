import React from "react";
import UndoRedo from "./UndoRedo/UndoRedo";
import "./EditingBar.css";
import Font from "./Font/Font";
import TextAlignColor from "./TextAlignColor/TextAlignColor";
export default function EditingBar() {

    return (

        <div className="editingBar">
            <UndoRedo />
            <Font />
            <TextAlignColor/>
        </div>
    )

}

