import React, { useCallback, memo } from "react";
import { useMutation } from "@apollo/client";
import { useInput } from "../../hooks";
import SignUpPresenter from "./SignUpPresenter";
import { SIGN_UP } from "../../graphql/mutation/user";
import { graphqlError } from "../../lib/error";
import { useSelector } from "../../context";

/**
 * 회원가입 컨테이너 컴포넌트
 *
 * @param props.setAction 인증 화면 전환 모드 (로그인, 회원가입)
 */
const SignUpContainer = ({ setAction }) => {
    const { uploadedUrl } = useSelector();
    // 별명
    const nickname = useInput("");
    // 이메일
    const email = useInput("");
    // 암호
    const password = useInput("");
    // 사용자 추가
    const [signUp, { loading }] = useMutation(SIGN_UP);
    // 회원가입 요청 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 회원가입 요청 중인 경우
            if (loading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            if (nickname.value.length > 9) {
                return alert("별명은 10자 미만으로 입력 해주세요.");
            }

            const tf = confirm("입력한 내용으로 회원가입 하시겠어요?");

            if (tf) {
                try {
                    const {
                        data: { addUser }
                    } = await signUp({
                        variables: {
                            email: email.value,
                            password: password.value,
                            nickname: nickname.value,
                            avatar: uploadedUrl
                        }
                    });
                    if (addUser) {
                        alert("회원가입이 정상처리되었습니다.");

                        // 로그인 화면 전환
                        setAction("login");
                    }
                } catch (error) {
                    graphqlError({ error });
                }
            }
        },
        [email.value, nickname.value, loading, uploadedUrl]
    );

    return (
        <SignUpPresenter
            loading={loading}
            nickname={nickname}
            email={email}
            password={password}
            onSubmit={handleSubmit}
        />
    );
};

export default memo(SignUpContainer);
