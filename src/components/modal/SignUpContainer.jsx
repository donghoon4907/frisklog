import React, { useState, useCallback, useRef } from "react";
import { useMutation } from "@apollo/client";
import { useInput, useLazyAxios } from "../../hooks";
import SignUpPresenter from "./SignUpPresenter";
import { SIGN_UP } from "../../graphql/mutation/user";
import { graphqlError } from "../../lib/error";

/**
 * 회원가입 컨테이너 컴포넌트
 *
 * @param props.setAction 인증 화면 전환 모드 (로그인, 회원가입)
 */
const SignUpContainer = ({ setAction }) => {
    // Axios hooks
    const { loading: uploadLoading, call } = useLazyAxios();

    const $file = useRef(null);
    // 별명
    const nickname = useInput("");
    // 이메일
    const email = useInput("");
    // 암호
    const password = useInput("");
    // 프로필사진 미리보기
    const [preview, setPreview] = useState("");
    // 프로필사진 URL
    const [avatar, setAvatar] = useState("");
    // 사용자 추가
    const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP);
    // 파일 업로드 핸들러
    const handleChangeFile = useCallback(
        async (e) => {
            const { value, files } = e.target;
            // 취소 버튼을 누른 경우
            if (!value) {
                return;
            }
            // 요청 중인 경우
            if (uploadLoading) {
                return;
            }

            const [file] = files;

            const formData = new FormData();

            formData.append("file", file);

            const { data, error } = await call({
                method: "post",
                url: `${process.env.RAZZLE_BACKEND_API}/upload`,
                data: formData,
                headers: { "content-type": "multipart/form-data" }
            });

            if (data) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // 미리보기 상태 변경
                    setPreview(reader.result);
                    // 프로필사진 상태 변경
                    setAvatar(data);
                };

                reader.readAsDataURL(file);
            }

            if (error) {
                alert(error.response.data);
            }
        },
        [uploadLoading]
    );
    // 업로드 클릭 핸들러
    const handleClickFile = useCallback(() => {
        const node = $file.current;
        if (node) {
            node.click();
        }
    }, []);
    // 회원가입 요청 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 회원가입 요청 중인 경우
            if (signUpLoading) {
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
                            avatar
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
        [email.value, nickname.value, avatar, signUpLoading]
    );

    return (
        <SignUpPresenter
            uploadLoading={uploadLoading}
            signUpLoading={signUpLoading}
            nickname={nickname}
            email={email}
            password={password}
            preview={preview}
            $file={$file}
            onChangeFile={handleChangeFile}
            onClickFile={handleClickFile}
            onSubmit={handleSubmit}
        />
    );
};

export default SignUpContainer;
