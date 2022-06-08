import React, { useState, useCallback } from "react";
import { GET_USER } from "../../graphql/query/user";
import Meta from "../../components/Meta";
import Avatar from "../../components/Avatar";
import Subject from "../../components/Subject";
import { Select } from "../../components/Form";
import PostList from "../../components/PostList";
import Query from "../../components/Query";
import searchOptions from "../../json/search_options.json";

/**
 * 사용자 상세 화면 컴포넌트
 * @Page
 * @author frist
 */
const User = ({
    match: {
        params: { id }
    }
}) => {
    const displayName = "fr-user";
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const [orderBy, setOrderBy] = useState("createdAt_DESC");
    /**
     * 정렬 변경 핸들러
     */
    const handleChangeOrderBy = useCallback((e) => {
        setOrderBy(e.target.value);
    }, []);

    return (
        <Query
            query={GET_USER}
            variables={{
                id
            }}
        >
            {({ data: { user } }) => {
                const { avatar, nickname, Posts } = user;
                return (
                    <>
                        <Meta title={`Frisklog - ${nickname}`} />
                        <div className={`${displayName}__info`}>
                            <Avatar src={avatar} size="200" userId={user.id} />
                            <div
                                className={`${displayName}__info__description`}
                            >
                                <h2>{nickname}</h2>
                                <em>{Posts.length} posts</em>
                            </div>
                        </div>
                        <Subject>
                            <span>게시물 목록</span>
                            <div>
                                <Select
                                    value={orderBy}
                                    onChange={handleChangeOrderBy}
                                    title="정렬"
                                >
                                    {searchOptions.sort.map((sort) => (
                                        <option
                                            value={sort.value}
                                            key={sort.id}
                                        >
                                            {sort.text}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </Subject>
                        <PostList
                            order={orderBy}
                            userId={user.id}
                            renderType="timeline"
                        >
                            {({ posts }) => posts}
                        </PostList>
                    </>
                );
            }}
        </Query>
    );
};

export default User;
