import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FormInput } from "../Form";
import Loader from "../Loader";

/**
 * 내 정보 수정 모달 프레젠터 컴포넌트
 *
 * @param {boolean}  props.loading
 * @param {boolean}  props.isShowPassword
 * @param {object}   props.newNickname
 * @param {object}   props.newPassword
 * @param {object}   props.confirmNewPassword
 * @param {function} props.onClose
 * @param {function} props.onSubmit
 * @param {function} props.onChangeSwitch
 */
const SetUserPresenter = ({
    loading,
    isShowPassword,
    newNickname,
    newPassword,
    confirmNewPassword,
    onClose,
    onSubmit,
    onChangeSwitch
}) => (
    <Modal
        onHide={onClose}
        show
        animation={false}
        contentClassName="fr-modal--middle"
    >
        {loading && <Loader />}
        <Modal.Header closeButton>
            <Modal.Title>내 정보 수정</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
            <Modal.Body>
                <div className="fr-modal__switch">
                    <Form.Check
                        type="switch"
                        id="show-password-switch"
                        label={`암호 변경 ${
                            isShowPassword ? "활성화" : "비활성화"
                        }`}
                        value={isShowPassword}
                        onChange={onChangeSwitch}
                    />
                </div>
                {isShowPassword && (
                    <>
                        <FormInput
                            type="password"
                            placeholder="암호를 입력하세요"
                            id="password"
                            autoComplete="off"
                            required
                            isAlone={true}
                            {...newPassword}
                            label="암호"
                        />
                        <FormInput
                            type="password"
                            placeholder="암호를 입력하세요"
                            id="confirmPwd"
                            autoComplete="off"
                            required
                            isAlone={true}
                            {...confirmNewPassword}
                            label="암호 확인"
                        />
                        <hr />
                    </>
                )}

                <FormInput
                    placeholder="닉네임을 입력하세요"
                    required
                    id="nickname"
                    isAlone={true}
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
