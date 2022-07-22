import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { useInput } from "../../hooks";
import { SIGN_IN, VERIFY_TOKEN } from "../../graphql/mutation/user";
import SignInPresenter from "./SignInPresenter";
import { graphqlError } from "../../lib/error";
import { TOKEN_KEY, setStorage } from "../../lib/cookie";
import { SET_ME, HIDE_LOGIN_MODAL } from "../../context/action";
import { useDispatch } from "../../context";

/**
 * 로그인 컨테이너 컴포넌트
 *
 */
const SignInContainer = () => {
    const dispatch = useDispatch();
    // 모드
    const [mode, setMode] = useState("로그인");
    // 로그인
    const [login, { loading: loginLoading }] = useMutation(SIGN_IN);
    // 이메일 인증
    const [verify, { loading: verifyLoading }] = useMutation(VERIFY_TOKEN);
    // 이메일
    const email = useInput("");
    // 인증코드
    const token = useInput("");
    // 로그인 요청 핸들러
    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();

            if (loginLoading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            try {
                const {
                    data: { logIn }
                } = await login({
                    variables: {
                        email: email.value
                    }
                });
                if (logIn) {
                    alert("인증코드를 메일로 전송했습니다.");

                    setMode("인증");
                }
            } catch (error) {
                graphqlError({ error });
            }
        },
        [email.value, loginLoading]
    );
    // 인증 요청 핸들러
    const handleVerify = useCallback(
        async (e) => {
            e.preventDefault();

            if (verifyLoading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            try {
                const {
                    data: { verifyToken }
                } = await verify({
                    variables: {
                        email: email.value,
                        token: token.value
                    }
                });
                if (verifyToken) {
                    const { token, ...user } = verifyToken;

                    // 토큰 설정
                    setStorage(TOKEN_KEY, token);
                    // 로컬 상태에 내 정보 저장
                    dispatch({
                        type: SET_ME,
                        ...user
                    });
                    // 로그인 모달 숨기기
                    dispatch({
                        type: HIDE_LOGIN_MODAL
                    });
                }
            } catch (error) {
                graphqlError({ error });
            }
        },
        [email.value, token.value, verifyLoading]
    );

    return (
        <SignInPresenter
            mode={mode}
            loading={loginLoading || verifyLoading}
            email={email}
            token={token}
            onLogin={handleLogin}
            onVerify={handleVerify}
        />
    );
};

export default SignInContainer;
