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
    // 카테고리 입력
    const category = useInput("", "no_space");
    // 추가된 카테고리
    const [categories, setCategories] = useState(activePost.categories);
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
    // 카테고리 추가 핸들러
    const handleAddCategory = useCallback(
        (e) => {
            e.preventDefault();

            if (category.value.length > 10) {
                return alert("카테고리는 10자 미만으로 입력하세요.");
            }

            const findIndex = categories.findIndex(
                (cat) => cat === category.value
            );

            if (findIndex !== -1) {
                return alert("이미 추가된 카테고리입니다.");
            }

            setCategories((categories) => [...categories, category.value]);
        },
        [category.value, categories]
    );
    // 카테고리 삭제 핸들러
    const handleRemoveCategory = useCallback((removeCategory) => {
        setCategories((categories) =>
            categories.filter((category) => category !== removeCategory)
        );
    }, []);
    // 등록 및 수정 핸들러
    const handleSubmit = useCallback(
        async (e) => {
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
                            categories,
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
        [loading, _content, categories, activePost.id]
    );

    return (
        <SetPostPresenter
            id={activePost.id}
            loading={loading}
            category={category}
            categories={categories}
            content={_content}
            setContent={setContent}
            onClose={handleClose}
            onAddCategory={handleAddCategory}
            onRemoveCategory={handleRemoveCategory}
            onSubmit={handleSubmit}
        />
    );
};

export default SetPostContainer;
