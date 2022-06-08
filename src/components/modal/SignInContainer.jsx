import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useInput } from "../../hooks";
import { SIGN_IN } from "../../graphql/mutation/user";
import SignInPresenter from "./SignInPresenter";
import { TOKEN_KEY, setStorage } from "../../lib/cookie";
import { useDispatch } from "../../context";
import { SET_ME, HIDE_LOGIN_MODAL } from "../../context/action";
import { graphqlError } from "../../lib/error";

/**
 * 로그인 컨테이너 컴포넌트
 *
 */
const SignInContainer = () => {
    // Dispatch hooks
    const dispatch = useDispatch();
    // 로그인 mutation
    const [login, { loading }] = useMutation(SIGN_IN);
    // 이메일 상태
    const email = useInput("");
    // 로그인 요청 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 요청 중인 경우
            if (loading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            try {
                const {
                    data: { logIn }
                } = await login({
                    variables: { email: email.value }
                });
                if (logIn) {
                    const {
                        token,
                        id,
                        nickname,
                        email,
                        avatar,
                        isMaster
                    } = logIn;
                    // 토큰 설정
                    setStorage(TOKEN_KEY, token);
                    // 로컬 상태에 내 정보 저장
                    dispatch({
                        type: SET_ME,
                        id,
                        nickname,
                        email,
                        avatar,
                        isMaster
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
        [email.value, loading]
    );

    return (
        <SignInPresenter
            loading={loading}
            email={email}
            onSubmit={handleSubmit}
        />
    );
};

export default SignInContainer;
