import React, { useCallback, memo } from "react";
import { useMutation } from "@apollo/client";

import { Remove } from "../../assets/icon";
import { useDispatch } from "../../context";
import { DELETE_POST } from "../../graphql/mutation/post";

/**
 * 삭제 버튼 컴포넌트
 *
 * @param {string}   props.postId 게시물 ID
 */
const RemovePostBtn = ({ postId }) => {
    const dispatch = useDispatch();
    // 포스트 삭제
    const [remove, { loading }] = useMutation(DELETE_POST);
    // 클릭 핸들러
    const handleClick = useCallback(async () => {
        if (loading) {
            return alert("요청 중입니다");
        }

        const tf = confirm("게시물을 삭제하시겠어요?");

        if (tf) {
            try {
                const {
                    data: { deletePost }
                } = await remove({
                    variables: {
                        id: postId
                    }
                });

                if (deletePost) {
                    alert("삭제되었습니다.");

                    window.location.reload();
                }
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        }
    }, [postId, loading]);

    return (
        <div className="fr-remove" title="Remove post">
            <button onClick={handleClick} aria-label="Remove post">
                <Remove />
            </button>
        </div>
    );
};

export default memo(RemovePostBtn);
