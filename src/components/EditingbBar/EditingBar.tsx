import React from "react";
import UndoRedo from "./UndoRedo/UndoRedo";
import "./EditingBar.css";
import Font from "./Font/Font";
export default function EditingBar() {

    return (

        <div className="editingBar">
            <UndoRedo />
            <Font />
        </div>
    )

}

