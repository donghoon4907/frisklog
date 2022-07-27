import React, { memo, useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { GET_COMMENTS } from "../graphql/query/comment";
import { CREATE_COMMENT } from "../graphql/mutation/comment";
import { useInput } from "../hooks";
import { FormTextArea } from "./Form";
import Button from "./button";
import { TOKEN_KEY, getStorage } from "../lib/cookie";
import { useDispatch, useSelector } from "../context";
import { SHOW_LOGIN_MODAL } from "../context/action";
import CommentItem from "./CommentItem";
import Loader from "./Loader";
import ScrollList from "./ScrollList";
import { graphqlError } from "../lib/error";
import { HOME_PLATFORM_ID } from "../lib/constants";

/**
 * 댓글 목록 컴포넌트
 *
 * @param {string} props.postId 게시물 ID
 *
 */
const CommentList = ({ postId }) => {
    const dispatch = useDispatch();

    const { id, nickname, avatar } = useSelector();
    // 댓글
    const comment = useInput("");
    // 생성한 댓글 목록
    const [comments, setComments] = useState([]);
    // 댓글 추가
    const [create, { loading }] = useMutation(CREATE_COMMENT);

    // 댓글 추가 핸들러
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
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            if (comment.value.length > 100) {
                return alert("댓글은 100자 미만으로 입력 해주세요.");
            }

            const tf = confirm("댓글을 등록하시겠어요?");

            if (tf) {
                try {
                    const { data } = await create({
                        variables: {
                            postId,
                            content: comment.value
                        }
                    });

                    // 입력창 초기화
                    comment.setValue("");

                    const { addComment } = data;
                    // 상태 댓글 목록에 추가
                    setComments([
                        {
                            User: {
                                id,
                                nickname,
                                avatar,
                                link: `/user/${id}`,
                                Platform: {
                                    id: HOME_PLATFORM_ID,
                                    domainUrl: "/"
                                }
                            },
                            ...addComment
                        },
                        ...comments
                    ]);

                    alert("댓글이 등록되었습니다.");
                } catch (error) {
                    graphqlError({ error, dispatch });
                }
            }
        },
        [comment.value, loading, comments, id, nickname, avatar]
    );

    return (
        <div>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                {loading && <Loader />}
                <FormTextArea
                    placeholder="댓글을 입력하세요."
                    id="comment"
                    autoComplete="off"
                    height={100}
                    {...comment}
                    required
                    label="댓글"
                />
                <Button type="submit">댓글 작성</Button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <CommentItem
                        key={`comment_${id}_${comment.id}`}
                        {...comment}
                    />
                ))}
                <ScrollList
                    type="comments"
                    query={GET_COMMENTS}
                    variables={{
                        limit: 10,
                        postId,
                        order: "createdAt_DESC"
                    }}
                    Item={CommentItem}
                />
            </ul>
        </div>
    );
};

export default memo(CommentList);
