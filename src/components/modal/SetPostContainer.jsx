import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST, UPDATE_POST } from "../../graphql/mutation/post";
import SetPostPresenter from "./SetPostPresenter";
import { useInput } from "../../hooks";
import { useDispatch, useSelector } from "../../context";
import { HIDE_POST_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";
import { graphqlError } from "../../lib/error";

/**
 * 게시물 등록 모달 컨테이너 컴포넌트
 *
 */
const SetPostContainer = () => {
    const dispatch = useDispatch();

    const { activePost } = useSelector();
    // 카테고리
    const category = useInput(activePost.category, "no_space");
    // 내용
    const [_content, setContent] = useState(activePost.content);
    // 게시물 추가 및 수정
    const [set, { loading }] = useMutation(
        activePost.id ? UPDATE_POST : CREATE_POST
    );
    // 팝업 닫기 핸들러
    const handleClose = useCallback(() => {
        // 팝업 숨기기
        dispatch({
            type: HIDE_POST_MODAL
        });
    }, []);
    const handleChange = useCallback(
        (e) => {
            const { value } = e.target;

            if (value.length > 10) {
                return alert("카테고리는 10자 미만으로 입력하세요.");
            }

            category.setValue(value);
        },
        [category.value]
    );
    // 등록 및 수정 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 로그인 체크
            const token = getStorage(TOKEN_KEY);

            if (token === null) {
                return dispatch({
                    type: SHOW_LOGIN_MODAL
                });
            }

            if (loading) {
                return alert("요청 중입니다");
            }

            const content = _content.markdown;

            const tf = confirm(
                `입력한 내용으로 게시물을 ${
                    activePost.id ? "수정" : "등록"
                }하시겠어요?`
            );

            if (tf) {
                try {
                    const {
                        data: { addPost, updatePost }
                    } = await set({
                        variables: {
                            content,
                            category: category.value,
                            id: activePost.id || undefined
                        }
                    });

                    if (addPost) {
                        alert("게시물이 등록되었습니다.");
                    } else if (updatePost) {
                        alert("게시물이 수정되었습니다.");
                    } else {
                        throw new Exception("check SetPostContainer");
                    }

                    window.location.reload();
                } catch (error) {
                    graphqlError({ error, dispatch });
                }
            }
        },
        [loading, _content, category.value, activePost.id]
    );

    return (
        <SetPostPresenter
            id={activePost.id}
            loading={loading}
            category={category}
            content={_content}
            setContent={setContent}
            onClose={handleClose}
            onSubmit={handleSubmit}
            onChange={handleChange}
        />
    );
};

export default SetPostContainer;
