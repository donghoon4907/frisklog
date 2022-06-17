import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import BtnLink from "./button/BtnLink";
import PostLike from "./PostLike";

/**
 * 게시물 카드형 컴포넌트
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
    category,
    thumbnail,
    Likers
}) => {
    const displayName = "fr-postcard";

    return (
        <div className={displayName}>
            <article className={`${displayName}-selector`}>
                <div className={`${displayName}__header`}>
                    <div className={`${displayName}__header__avatar`}>
                        <Avatar src={User.avatar} size={30} userId={User.id} />

                        <span className="fr-avatar__name ">
                            {User.nickname}
                        </span>
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
                                    thumbnail ||
                                    process.env.RAZZLE_DEFAULT_THUMBNAIL
                                }
                                alt="post thumbnail"
                            />
                        </div>
                    </div>

                    <div className={`${displayName}__body__title-wrapper`}>
                        <h4 className="fr-postcard__body__title">{title}</h4>
                    </div>
                    <p
                        className={`${displayName}__body__description`}
                        style={{ WebkitBoxOrient: "vertical" }}
                        title={description}
                    >
                        {description}
                    </p>
                </Link>
                <div className={`${displayName}__body__meta`}>
                    <div>
                        <PostLike id={id} likers={Likers} isShowCount={true} />
                    </div>
                    <div>{timeForToday(createdAt)}</div>
                </div>
            </article>
        </div>
    );
};

export default PostCardTypeItem;
