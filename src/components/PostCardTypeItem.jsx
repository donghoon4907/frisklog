import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import { HeartFull, HeartEmpty } from "../assets/icon";
import BtnLink from "./BtnLink";
import { LIKE_POST, UNLIKE_POST } from "../graphql/mutation/post";
import { graphqlError } from "../lib/error";
import { useDispatch, useSelector } from "../context";
import { getStorage, TOKEN_KEY } from "../lib/cookie";
import { SHOW_LOGIN_MODAL } from "../context/action";

/**
 * 게시물 카드형 렌더링 컴포넌트
 *
 * @param {string} props.id           게시물 ID
 * @param {string} props.title        게시물 제목
 * @param {string} props.description  게시물 설명
 * @param {object} props.User         게시물 작성자
 * @param {string} props.createdAt    게시물 작성일
 * @param {number} props.viewCount    게시물 조회수
 * @param {string} props.category     게시물 카테고리
 * @param {string} props.thumbnail    게시물 썸네일
 * @param {string} props.Likers       게시물 좋아요 목록
 * @param {string} props.PostComments 게시물 댓글
 */
const PostCardTypeItem = ({
    id,
    title,
    description,
    User,
    createdAt,
    // viewCount,
    category,
    thumbnail,
    Likers
    // PostComments
}) => {
    const displayName = "fr-card";
    // dispatch
    const dispatch = useDispatch();
    // selector
    const { id: userId } = useSelector();
    // 좋아요 mutation
    const [like] = useMutation(LIKE_POST);
    // 좋아요 취소 mutation
    const [unlike] = useMutation(UNLIKE_POST);
    // 좋아요 여부 상태
    const [isLike, setIsLike] = useState(
        Likers.some((liker) => liker.id == userId)
    );
    // 좋아요 수 상태
    const [likeCount, setLikeCount] = useState(Likers.length);
    // 좋아요 핸들러
    const handleLike = useCallback(async () => {
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        if (isLike) {
            try {
                await unlike({
                    variables: { id }
                });
                // 좋아요 여부 업데이트
                setIsLike(false);
                // 좋아요 수 업데이트
                setLikeCount(likeCount - 1);
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        } else {
            try {
                await like({
                    variables: { id }
                });
                // 좋아요 여부 업데이트
                setIsLike(true);
                // 좋아요 수 업데이트
                setLikeCount(likeCount + 1);
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        }
    }, [isLike, likeCount]);

    useEffect(() => {
        setIsLike(Likers.some((liker) => liker.id == userId));
    }, [userId]);

    return (
        <div className={displayName}>
            <article className={`${displayName}-selector`}>
                <div className={`${displayName}__header`}>
                    <div className={`${displayName}__header__avatar`}>
                        <Avatar src={User.avatar} size="30" userId={User.id} />

                        <span>{User.nickname}</span>
                    </div>
                    <div>
                        {category && (
                            <BtnLink to={`/category/${category}`}>
                                {category}
                            </BtnLink>
                        )}
                    </div>
                </div>
                <Link
                    className={`${displayName}__body fr-link`}
                    to={`/post/${id}`}
                >
                    <div className={`${displayName}__img-wrapper fr-link`}>
                        <div className={`${displayName}__img-bg`}>
                            <img
                                className={`${displayName}__img`}
                                src={
                                    process.env.RAZZLE_BACKEND_ROOT +
                                    (thumbnail ||
                                        process.env.RAZZLE_DEFAULT_THUMBNAIL)
                                }
                                alt="post thumbnail"
                            />
                        </div>
                    </div>

                    <div className={`${displayName}__body__title-wrapper`}>
                        <h4 className="fr-card__body__title">{title}</h4>
                    </div>
                    <p
                        className={`${displayName}__body__description`}
                        style={{ WebkitBoxOrient: "vertical" }}
                    >
                        {description}
                    </p>
                </Link>
                <div className={`${displayName}__body__meta`}>
                    <div>
                        <button onClick={handleLike}>
                            {isLike ? <HeartFull /> : <HeartEmpty />}
                            <span>{likeCount}</span>
                        </button>
                        {/* <span>
                            <Comment />
                            <span>{PostComments.length}</span>
                        </span> */}
                    </div>
                    <div>{timeForToday(createdAt)}</div>
                </div>
            </article>
        </div>
    );
};

export default PostCardTypeItem;
