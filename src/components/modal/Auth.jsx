import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";

import SignIn from "./SignInContainer";
import SignUp from "./SignUpContainer";
import { useDispatch } from "../../context";
import { HIDE_LOGIN_MODAL } from "../../context/action";
// import GithubLoginBtn from "../button/GithubLogin";

/**
 * 인증 팝업 컴포넌트
 *
 */
const Auth = () => {
    const dispatch = useDispatch();
    // 화면 관리
    const [mode, setMode] = useState("로그인");
    // 팝업 닫기 핸들러
    const handleHide = useCallback(() => {
        dispatch({
            type: HIDE_LOGIN_MODAL
        });
    }, []);

    return (
        <Modal
            onHide={handleHide}
            show
            animation={false}
            contentClassName="fr-modal--middle"
        >
            <Modal.Header closeButton>
                <Modal.Title>{mode}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mode === "로그인" && <SignIn />}
                {mode === "회원가입" && <SignUp setMode={setMode} />}
                {/* <hr /> */}
                {/* {mode === "로그인" && (
                    <div className="fr-login">
                        <GithubLoginBtn />
                    </div>
                )} */}

                <div className="fr-login__changer">
                    <div>
                        계정이 {mode === "로그인" ? "없다면" : "있다면"}&nbsp;
                        <span
                            className="fr-login__link"
                            onClick={() =>
                                setMode(
                                    mode === "로그인" ? "회원가입" : "로그인"
                                )
                            }
                        >
                            {mode === "로그인" ? "회원가입" : "로그인"}
                        </span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Auth;
