import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import Meta from "../../components/Meta";
import { GET_POSTS } from "../../graphql/query/post";
import PostItem from "../../components/PostItem";
import ScrollList from "../../components/ScrollList";
import { SIGN_IN_GITHUB } from "../../graphql/mutation/user";
import { useDispatch } from "../../context";
import { SET_ME } from "../../context/action";
import { TOKEN_KEY, getStorage, setStorage } from "../../lib/cookie";

/**
 * 메인 화면 컴포넌트
 *
 */
const Feed = () => {
    const dispatch = useDispatch();
    // Github 로그인
    const [githubLogin] = useMutation(SIGN_IN_GITHUB);

    useEffect(async () => {
        const token = getStorage(TOKEN_KEY);

        if (!token) {
            const url = new URL(window.location.href);

            const code = url.searchParams.get("code");

            if (code) {
                const {
                    data: { logInWithGithub }
                } = await githubLogin({
                    variables: {
                        code
                    }
                });

                const {
                    token,
                    id,
                    nickname,
                    avatar,
                    isMaster
                } = logInWithGithub;
                // 토큰 설정
                setStorage(TOKEN_KEY, token);
                // 로컬 상태에 내 정보 저장
                dispatch({
                    type: SET_ME,
                    id,
                    nickname,
                    avatar,
                    isMaster
                });
            }
        }
    }, []);

    return (
        <>
            <Meta title="frisklog" />
            <div className="fr-main__title">
                <h2>최신 포스트</h2>
            </div>
            <ScrollList
                type="posts"
                fetchPolicy="cache-first"
                query={GET_POSTS}
                variables={{
                    limit: 10
                }}
                Item={PostItem}
            />
        </>
    );
};

export default Feed;
