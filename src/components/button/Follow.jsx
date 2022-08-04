import React, { useState, useCallback, useEffect, memo } from "react";
import { useMutation } from "@apollo/client";

import { FOLLOW_USER, UNFOLLOW_USER } from "../../graphql/mutation/user";
import { graphqlError } from "../../lib/error";
import { useDispatch, useSelector } from "../../context";
import { getStorage, TOKEN_KEY } from "../../lib/cookie";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import Button from ".";

/**
 * 팔로우 버튼 컴포넌트
 *
 * @param {string}   props.userId       사용자 ID
 * @param {object[]} props.followers    팔로워 목록
 */
const FollowBtn = ({ userId, followers, ...props }) => {
    const dispatch = useDispatch();

    const { id } = useSelector();
    // 팔로우
    const [follow, { loading: followLoading }] = useMutation(FOLLOW_USER);
    // 언팔로우
    const [unfollow, { loading: unfollowLoading }] = useMutation(UNFOLLOW_USER);
    // 팔로잉 여부
    const [isFollow, setIsFollow] = useState(!followers);
    // 클릭 핸들러
    const handleClick = useCallback(async () => {
        if (followLoading || unfollowLoading) {
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
            let willIsFollow;
            if (isFollow) {
                await unfollow({
                    variables: { id: userId }
                });
                willIsFollow = false;
            } else {
                await follow({
                    variables: { id: userId }
                });

                willIsFollow = true;
            }

            setIsFollow(willIsFollow);
        } catch (error) {
            graphqlError({ error, dispatch });
        }
    }, [userId, isFollow, followLoading, unfollowLoading]);

    useEffect(() => {
        if (followers !== null) {
            setIsFollow(followers.some((follower) => follower.id == id));
        }
    }, [id, followers]);

    return (
        <div title="팔로우 버튼">
            <Button
                {...props}
                type="button"
                onClick={handleClick}
                className={`fr-btn--${isFollow ? "danger" : "info"}`}
                aria-label={isFollow ? "언팔로우" : "팔로우"}
            >
                {isFollow ? "언팔로우" : "팔로우"}
            </Button>
        </div>
    );
};

export default memo(FollowBtn);
