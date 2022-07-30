import React from "react";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FormInput } from "../Form";
import Loader from "../Loader";
import { ModalHeader } from "../Modal";

/**
 * 내 정보 수정 모달 프레젠터 컴포넌트
 *
 * @param {boolean}  props.loading
 * @param {object}   props.newNickname
 * @param {function} props.onClose
 * @param {function} props.onSubmit
 */
const SetUserPresenter = ({ loading, newNickname, onClose, onSubmit }) => (
    <Modal
        onHide={onClose}
        show
        animation={false}
        contentClassName="fr-modal--middle"
    >
        {loading && <Loader />}
        <ModalHeader>
            <Modal.Title>내 정보 수정</Modal.Title>
        </ModalHeader>
        <form onSubmit={onSubmit}>
            <Modal.Body>
                {/* <div className="fr-modal__switch">
                    <Form.Check
                        type="switch"
                        id="show-password-switch"
                        label={`암호 변경 ${
                            isShowPassword ? "활성화" : "비활성화"
                        }`}
                        value={isShowPassword}
                        onChange={onChangeSwitch}
                    />
                </div> */}

                <FormInput
                    placeholder="닉네임을 입력하세요"
                    required
                    id="nickname"
                    isExpand={true}
                    {...newNickname}
                    autoComplete="off"
                    label="닉네임"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
                <Button variant="primary" type="submit">
                    수정
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
);

export default SetUserPresenter;
