import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { useInput } from "../../hooks";
import SetUserPresenter from "./SetUserPresenter";
import { UPDATE_USER } from "../../graphql/mutation/user";
import { graphqlError } from "../../lib/error";
import { HIDE_USER_MODAL, SET_ME } from "../../context/action";
import { TOKEN_KEY, setStorage } from "../../lib/cookie";
import { useDispatch, useSelector } from "../../context";

/**
 * 내 정보 수정 컨테이너 컴포넌트
 *
 */
const SetUserContainer = () => {
    const dispatch = useDispatch();

    const { nickname } = useSelector();
    // 암호 변경 여부
    const [isShowPassword, setIsShowPassword] = useState(false);
    // 별명
    const newNickname = useInput(nickname);
    // 새로운 암호
    const newPassword = useInput("");
    // 새로운 암호 확인
    const confirmNewPassword = useInput("");
    // 사용자 추가
    const [upt, { loading }] = useMutation(UPDATE_USER);
    // 팝업 닫기 핸들러
    const handleClose = useCallback(() => {
        // 팝업 숨기기
        dispatch({
            type: HIDE_USER_MODAL
        });
    }, []);
    // 스위치 변경 핸들러
    const handleChangeSwitch = useCallback(() => {
        setIsShowPassword((prev) => !prev);
    }, []);
    // 내 정보 수정 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 요청 중인 경우
            if (loading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            const variables = {};

            if (isShowPassword) {
                if (newPassword.value !== confirmNewPassword.value) {
                    return alert("암호가 일치하지 않습니다.");
                }

                variables.password = newPassword.value;
            }

            if (newNickname.value.length > 9) {
                return alert("별명은 10자 미만으로 입력 해주세요.");
            }

            variables.nickname = newNickname.value;

            const tf = confirm("입력한 내용으로 수정하시겠어요?");

            if (tf) {
                try {
                    const {
                        data: { updateUser }
                    } = await upt({
                        variables
                    });

                    if (updateUser) {
                        const { token } = updateUser;
                        // 토큰 설정
                        setStorage(TOKEN_KEY, token);

                        // 상태 동기화
                        dispatch({
                            type: SET_ME,
                            nickname: newNickname.value
                        });

                        alert("수정되었습니다.");
                        // 모달 닫기
                        handleClose();
                    }
                } catch (error) {
                    graphqlError({ error });
                }
            }
        },
        [
            newNickname.value,
            newPassword.value,
            confirmNewPassword.value,
            loading,
            isShowPassword
        ]
    );

    return (
        <SetUserPresenter
            loading={loading}
            isShowPassword={isShowPassword}
            newNickname={newNickname}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            onSubmit={handleSubmit}
            onClose={handleClose}
            onChangeSwitch={handleChangeSwitch}
        />
    );
};

export default SetUserContainer;
