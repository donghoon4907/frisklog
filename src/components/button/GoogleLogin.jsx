import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

import { useDispatch } from "../../context";
import { SET_ME, HIDE_LOGIN_MODAL } from "../../context/action";
import { SIGN_IN_GOOGLE } from "../../graphql/mutation/user";
import GoogleAccounts from "../../lib/google";
import { graphqlError } from "../../lib/error";
import { TOKEN_KEY, setStorage } from "../../lib/cookie";

/**
 * 구글 로그인 버튼 컴포넌트
 *
 */
const GoogleLogin = () => {
    const dispatch = useDispatch();

    const [login] = useMutation(SIGN_IN_GOOGLE);
    // 구글 로그인 버튼
    const btnEl = useRef(null);
    // sdk obj
    const sdkRef = useRef(null);
    // 로그인 성공 핸들러
    const handleSuccess = async ({ credential }) => {
        const email = sdkRef.current.getEmail(credential);

        const nickname = sdkRef.current.getName(credential);

        try {
            const {
                data: { logInWithGoogle }
            } = await login({
                variables: {
                    email,
                    nickname
                }
            });
            if (logInWithGoogle) {
                const {
                    token,
                    id,
                    nickname,
                    email,
                    avatar,
                    isMaster
                } = logInWithGoogle;
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
    };

    useEffect(() => {
        sdkRef.current = new GoogleAccounts(
            process.env.RAZZLE_GOOGLE_CLIENTID,
            handleSuccess
        );

        // sdkRef.current.renderButton(btnEl.current, {
        //     theme: "filled_white",
        //     size: "large",
        //     text: "Google 계정으로 로그인",
        //     width: "470",
        //     type: "standard"
        // });
    }, []);

    return <div className="fr-google" ref={btnEl} />;
};

export default GoogleLogin;
