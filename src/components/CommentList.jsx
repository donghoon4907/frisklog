import React, { memo, useCallback, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "../graphql/query/comment";
import { CREATE_COMMENT } from "../graphql/mutation/comment";
import { useInput } from "../hooks";
import { FormTextArea } from "./Form";
import Button from "./button";
import { TOKEN_KEY, getStorage } from "../lib/cookie";
import { useDispatch } from "../context";
import { SHOW_LOGIN_MODAL } from "../context/action";
import CommentItem from "./CommentItem";
import Loader from "./Loader";
import { graphqlError } from "../lib/error";

/**
 * 댓글 목록 컴포넌트
 *
 */
const CommentList = () => {
    const {
        params: { id }
    } = useRouteMatch("/post/:id");

    const dispatch = useDispatch();

    const { data, loading, fetchMore, refetch } = useQuery(GET_COMMENTS, {
        variables: {
            limit: 30,
            postId: id
        },
        notifyOnNetworkStatusChange: true
    });
    // 댓글
    const comment = useInput("");

    const [create, { loading: createLoading }] = useMutation(CREATE_COMMENT);

    // 댓글 추가 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (createLoading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            const token = getStorage(TOKEN_KEY);

            if (!token) {
                // 로그인 팝업 보이기
                return dispatch({
                    type: SHOW_LOGIN_MODAL
                });
            }

            if (comment.value.length > 100) {
                return alert("댓글은 100자 미만으로 입력 해주세요.");
            }

            try {
                await create({
                    variables: {
                        postId: id,
                        content: comment.value
                    }
                });

                // 댓글 초기화
                refetch();
                // 입력창 초기화
                comment.setValue("");
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        },
        [comment.value, createLoading]
    );

    // 스크롤 이벤트 핸들러
    const handleFetchMore = () => {
        if (data && data.comments) {
            if (loading) {
                return;
            }
            const $main = document.querySelector("#main");

            const { scrollHeight, clientHeight, scrollTop } = $main;

            const { comments } = data;

            if (scrollTop + clientHeight === scrollHeight) {
                if (
                    comments.rows.length > 0 &&
                    comments.rows.length % 30 === 0
                ) {
                    // 추가 게시물 요청
                    fetchMore({
                        variables: {
                            offset: comments.rows.length,
                            limit: 30,
                            postId: id
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (fetchMoreResult) {
                                return {
                                    comments: {
                                        rows: [
                                            ...prev.comments.rows,
                                            ...fetchMoreResult.comments.rows
                                        ],
                                        count: comments.count
                                    }
                                };
                            } else {
                                return prev;
                            }
                        }
                    });
                }
            }
        }
    };

    useEffect(() => {
        const $main = document.querySelector("#main");
        // 스크롤 이벤트 바인딩
        $main.addEventListener("scroll", handleFetchMore);
        // 스크롤 이벤트 언바인딩
        return () => $main.removeEventListener("scroll", handleFetchMore);
    }, [data && data.comments, loading]);

    return (
        <form className="d-flex flex-column mt-4" onSubmit={handleSubmit}>
            {(loading || createLoading) && <Loader />}
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
            <ul>
                {data &&
                    data.comments.rows.map((comment) => (
                        <CommentItem key={comment.id} {...comment} />
                    ))}
            </ul>
        </form>
    );
};

export default memo(CommentList);
