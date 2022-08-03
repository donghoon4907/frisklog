import React, { useCallback } from "react";
import { Modal } from "react-bootstrap";

import { useSelector, useDispatch } from "../../context";
import { HIDE_POST_MODAL } from "../../context/action";

const ModalHeader = ({ children }) => {
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
/**
 * 공통 모달 레이아웃 컴포넌트
 *
 * @param {string} props.title 모달 헤더 텍스트
 */
const CommonModal = ({ title, children, ...props }) => {
    const dispatch = useDispatch();
    // 팝업 닫기 핸들러
    const handleClose = useCallback(() => {
        // 팝업 숨기기
        dispatch({
            type: HIDE_POST_MODAL
        });
    }, []);

    return (
        <Modal onHide={handleClose} show animation={false} {...props}>
            <ModalHeader closeButton>
                <Modal.Title>{title}</Modal.Title>
            </ModalHeader>
            {children}
        </Modal>
    );
};

export default CommonModal;
