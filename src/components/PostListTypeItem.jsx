import React from "react";
import moment from "moment";
import Avatar from "./Avatar";
import Timestamp from "./Timestamp";
import StyledLink from "./StyledLink";
import { HeartFull } from "../assets/icon";
import BtnLink from "./BtnLink";
import { timeForToday } from "../lib/date";

/**
 * 게시물 리스트형 컴포넌트
 *
 * @param {string} props.id           게시물 ID
 * @param {string} props.title        게시물 제목
 * @param {string} props.description  게시물 설명
 * @param {object} props.user         게시물 작성자
 * @param {string} props.createdAt    게시물 작성일
 * @param {number} props.likeCount    게시물 좋아요 수
 * @param {number} props.viewCount    게시물 조회 수
 * @param {string} props.category     게시물 카테고리
 * @param {number} props.commentCount 게시물 댓글 수
 * @param {string?} props.renderType   렌더링 타입
 */
const PostListTypeItem = ({
    id,
    title,
    description,
    User,
    createdAt,
    Likers,
    category,
    // PostComments,
    renderType
}) => {
    const displayName = "fr-grid";

    return (
        <div className={displayName}>
            {renderType === "timeline" && (
                <div className={`${displayName}__timeline-wrapper`}>
                    <div className={`${displayName}__timeline`}>
                        <div className={`${displayName}__timeline__stamp`}>
                            <div
                                className={`${displayName}__timeline__stamp__dot`}
                            />
                        </div>
                        <div className={`${displayName}__timeline__timestamp`}>
                            <time>
                                {moment(createdAt).format("YYYY년 MM월 DD일")}
                            </time>
                            <Timestamp>
                                {moment(createdAt).format("HH시 mm분")}
                            </Timestamp>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${displayName}__meta`}>
                <div className={`${displayName}__meta__header`}>
                    <div className={`${displayName}__meta__header__category`}>
                        <BtnLink to={`/category/${category}`}>
                            {category}
                        </BtnLink>
                    </div>

                    <h4 className={`${displayName}__meta__header__title`}>
                        <StyledLink to={`/post/${id}`}>{title}</StyledLink>
                    </h4>
                </div>

                <p
                    className={`${displayName}__meta__body`}
                    style={{ WebkitBoxOrient: "vertical" }}
                >
                    <StyledLink to={`/post/${id}`}>{description}</StyledLink>
                </p>
                <div className={`${displayName}__meta__footer`}>
                    <div className={`${displayName}__meta__footer__column`}>
                        <Avatar src={User.avatar} size="30" userId={User.id} />
                        <span>{User.nickname}</span>
                        {renderType !== "timeline" && (
                            <>
                                <span>·</span>
                                <span>{timeForToday(createdAt)}</span>
                            </>
                        )}
                    </div>
                    <div className={`${displayName}__meta__footer__column`}>
                        <div>
                            <HeartFull />
                            <span>{Likers.length}</span>
                        </div>
                        {/* <div>
                            <Comment />
                            <span>{PostComments.length}</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostListTypeItem;
