import React, { useState, useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { HeartFull, HeartEmpty } from "../assets/icon";
import { LIKE_POST, UNLIKE_POST } from "../graphql/mutation/post";
import { graphqlError } from "../lib/error";
import { useDispatch, useSelector } from "../context";
import { getStorage, TOKEN_KEY } from "../lib/cookie";
import { SHOW_LOGIN_MODAL } from "../context/action";

/**
 * 좋아요 버튼 컴포넌트
 *
 * @param {string}   props.id          게시물 ID
 * @param {object[]} props.likers      좋아요 누른 명단
 * @param {object[]} props.isShowCount 좋아요 수 보여줄 지 여부
 * @param {object}   props.style       아이콘 스타일
 */
const PostLike = ({ id, likers, isShowCount, style }) => {
    const dispatch = useDispatch();

    const { id: userId } = useSelector();
    // 좋아요 mutation
    const [like] = useMutation(LIKE_POST);
    // 좋아요 취소 mutation
    const [unlike] = useMutation(UNLIKE_POST);
    // 좋아요 여부 상태
    const [isLike, setIsLike] = useState(false);
    // 좋아요 수 상태, -1: 비활성화
    const [likeCount, setLikeCount] = useState(likers.length);
    // 클릭 핸들러
    const handleClick = useCallback(async () => {
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        try {
            let willIsLike;
            let willLikeCount;

            if (isLike) {
                await unlike({
                    variables: { id }
                });
                willIsLike = false;

                willLikeCount = likeCount - 1;
            } else {
                await like({
                    variables: { id }
                });

                willIsLike = true;

                willLikeCount = likeCount + 1;
            }
            // 좋아요 여부 업데이트
            setIsLike(willIsLike);
            // 좋아요 수 업데이트
            setLikeCount(willLikeCount);
        } catch (error) {
            graphqlError({ error, dispatch });
        }
    }, [isLike, likeCount]);

    useEffect(() => {
        setIsLike(likers.some((liker) => liker.id == userId));
    }, [userId]);

    return (
        <div className="fr-like">
            <button onClick={handleClick} aria-label="좋아요">
                {isLike ? (
                    <HeartFull style={style} />
                ) : (
                    <HeartEmpty style={style} />
                )}
                <span className="a11y-hidden">
                    {isLike ? "좋아요 취소하기" : "좋아요 하기"}
                </span>
            </button>
            <div className="fr-like__count">
                {isShowCount && <span>{likeCount.toLocaleString()}</span>}
            </div>
        </div>
    );
};

export default PostLike;
