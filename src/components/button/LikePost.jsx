import React, { useState, useCallback, useEffect, memo } from "react";
import { useMutation } from "@apollo/client";
import { HeartFull, HeartEmpty } from "../../assets/icon";
import { LIKE_POST, UNLIKE_POST } from "../../graphql/mutation/post";
import { graphqlError } from "../../lib/error";
import { useDispatch, useSelector } from "../../context";
import { getStorage, TOKEN_KEY } from "../../lib/cookie";
import { SHOW_LOGIN_MODAL } from "../../context/action";

/**
 * 좋아요 버튼 컴포넌트
 *
 * @param {string}   props.postId      게시물 ID
 * @param {object[]} props.likers      좋아요 누른 명단
 * @param {object[]} props.isShowCount 좋아요 수 보여줄 지 여부
 */
const LikePostBtn = ({ postId, likers, isShowCount }) => {
    const dispatch = useDispatch();

    const { id } = useSelector();
    // 좋아요 mutation
    const [like, { loading: likeLoading }] = useMutation(LIKE_POST);
    // 좋아요 취소 mutation
    const [unlike, { loading: unlikeLoading }] = useMutation(UNLIKE_POST);
    // 좋아요 여부 상태
    const [isLike, setIsLike] = useState(false);
    // 좋아요 수 상태, -1: 비활성화
    const [likeCount, setLikeCount] = useState(likers.length);
    // 클릭 핸들러
    const handleClick = useCallback(async () => {
        if (likeLoading || unlikeLoading) {
            return alert("요청 중입니다");
        }
        // 로그인 체크
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
                    variables: { id: postId }
                });
                willIsLike = false;

                willLikeCount = likeCount - 1;
            } else {
                await like({
                    variables: { id: postId }
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
    }, [postId, isLike, likeCount, likeLoading, unlikeLoading]);

    useEffect(() => {
        setIsLike(likers.some((liker) => liker.id == id));
    }, [id]);

    return (
        <div className="fr-like" title="좋아요 버튼">
            <button
                type="button"
                onClick={handleClick}
                aria-label={isLike ? "좋아요 취소" : "좋아요"}
            >
                {isLike ? <HeartFull /> : <HeartEmpty />}
            </button>
            <span className="fr-like__count">
                {isShowCount && <span>{likeCount.toLocaleString()}</span>}
            </span>
        </div>
    );
};

export default memo(LikePostBtn);
