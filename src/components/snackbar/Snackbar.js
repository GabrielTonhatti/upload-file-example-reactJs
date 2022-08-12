import React from "react";
import { SnackbarContent } from "./styles";

const Snackbar = ({ type, open, children, onClose }) => {
    return (
        <SnackbarContent open={open} type={type}>
            <span>{children}</span>
            <button className="close" onClick={onClose}>
                &times;
            </button>
        </SnackbarContent>
    );
};

export default Snackbar;
