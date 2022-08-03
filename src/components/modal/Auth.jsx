import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import SignIn from "./SignInContainer";
import SignUp from "./SignUpContainer";
import GithubLoginBtn from "../button/GithubLogin";
import ModalContainer from ".";

/**
 * 인증 팝업 컴포넌트
 *
 */
const Auth = () => {
    // 화면 관리
    const [mode, setMode] = useState("로그인");

    return (
        <ModalContainer title={mode} contentClassName="fr-modal--middle">
            <Modal.Body>
                {mode === "로그인" && <SignIn />}
                {mode === "회원가입" && <SignUp setMode={setMode} />}

                {mode === "로그인" && (
                    <div className="fr-login">
                        <hr />
                        <GithubLoginBtn />
                    </div>
                )}

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
        </ModalContainer>
    );
};

export default Auth;
