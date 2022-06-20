import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../graphql/mutation/post";
import { graphqlError } from "../../lib/error";
import { useDispatch } from "../../context";

/**
 * 포스트 삭제 버튼 컴포넌트
 *
 * @param {string} props.id       POST ID
 */
const DeletePostBtn = ({ id }) => {
    const dispatch = useDispatch();

    const [del, { loading }] = useMutation(DELETE_POST);
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
                } = await del({
                    variables: {
                        id
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
    }, [loading]);

    return (
        <span className="fr-dropdown__text" onClick={handleClick}>
            삭제
        </span>
    );
};

export default DeletePostBtn;
