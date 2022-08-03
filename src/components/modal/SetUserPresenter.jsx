import React from "react";
import Modal from "react-bootstrap/Modal";

import { FormInput } from "../Form";
import Loader from "../Loader";
import Button from "../button";
import ModalContainer from ".";

/**
 * 내 정보 수정 모달 프레젠터 컴포넌트
 *
 * @param {boolean}  props.loading
 * @param {object}   props.newNickname
 * @param {function} props.onClose
 * @param {function} props.onSubmit
 */
const SetUserPresenter = ({ loading, newNickname, onClose, onSubmit }) => (
    <ModalContainer title="내 정보 수정" contentClassName="fr-modal--middle">
        {loading && <Loader />}
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
                <div style={{ width: 100 }}>
                    <Button
                        type="button"
                        className="fr-btn--cancel"
                        onClick={onClose}
                    >
                        취소
                    </Button>
                </div>
                <div style={{ width: 100 }}>
                    <Button type="submit" className="fr-btn--primary">
                        수정
                    </Button>
                </div>
            </Modal.Footer>
        </form>
    </ModalContainer>
);

export default SetUserPresenter;
