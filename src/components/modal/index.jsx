import React from "react";
import { Modal } from "react-bootstrap";

import { useSelector } from "../../context";

export const ModalHeader = ({ children }) => {
    const { theme } = useSelector();

    return (
        <Modal.Header
            closeButton
            closeVariant={theme === "dark" ? "white" : null}
        >
            {children}
        </Modal.Header>
    );
};
