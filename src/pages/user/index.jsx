import React, { useState, useCallback } from "react";
import { GET_POSTS } from "../../graphql/query/post";
import { Select } from "../../components/Form";
import searchOptions from "../../json/search_options.json";
import ScrollList from "../../components/ScrollList";
import PostItem from "../../components/PostItem";
import { useSelector } from "../../context";

/**
 * 사용자 화면 컴포넌트
 *
 */
const User = ({
    match: {
        params: { id }
    }
}) => {
    const { searchPostOption, id: userId } = useSelector();
    // 정렬
    const [order, setOrder] = useState("createdAt_DESC");
    // 정렬 변경 핸들러
    const handleChangeOrder = useCallback((e) => {
        setOrder(e.target.value);
    }, []);

    const isMe = id == userId;

    return (
        <>
            <div className="fr-main__title">
                <span>{isMe ? searchPostOption.title : "모든 포스트"}</span>
                <div>
                    <Select
                        value={order}
                        onChange={handleChangeOrder}
                        title="정렬"
                    >
                        {searchOptions.sort
                            .filter(({ enable }) => enable === true)
                            .map(({ text, value, id }) => (
                                <option value={value} key={id}>
                                    {text}
                                </option>
                            ))}
                    </Select>
                </div>
            </div>
            <ScrollList
                type="posts"
                query={GET_POSTS}
                fetchPolicy="network-only"
                variables={{
                    limit: 12,
                    userId: id,
                    isLike: isMe ? searchPostOption.isLike : false,
                    isFollowing: isMe ? searchPostOption.isFollowing : false,
                    order: [order.split("_")]
                }}
                Item={PostItem}
            />
        </>
    );
};

export default User;
