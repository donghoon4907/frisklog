import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import SignIn from "./SignInContainer";
import SignUp from "./SignUpContainer";
import { useDispatch } from "../../context";
import { HIDE_LOGIN_MODAL } from "../../context/action";

/**
 * * 인증 팝업 컴포넌트
 *
 * @Component
 * @Modal
 * @author frisk
 */
const Auth = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 화면 전환 상태 모듈 활성화
     */
    const [action, setAction] = useState("login");
    /**
     * 팝업 숨기기 핸들러
     */
    const handleClose = useCallback(() => {
        dispatch({
            type: HIDE_LOGIN_MODAL
        });
    }, []);

    return (
        <Modal
            onHide={handleClose}
            show
            animation={false}
            contentClassName="fr-modal--middle"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {action === "login" ? "로그인" : "회원가입"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {action === "signup" ? (
                    <SignUp setAction={setAction} />
                ) : (
                    <SignIn />
                )}
                <div className="fr-form__changer">
                    {action === "login" && (
                        <div>
                            계정이 없다면&nbsp;
                            <span
                                className="fr-form__link"
                                onClick={() => setAction("signup")}
                            >
                                회원가입
                            </span>
                        </div>
                    )}
                    {action === "signup" && (
                        <div>
                            계정이 있다면&nbsp;
                            <span
                                className="fr-form__link"
                                onClick={() => setAction("login")}
                            >
                                로그인
                            </span>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Auth;
