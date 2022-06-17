import React, { memo } from "react";
import RecommandUserItem from "./RecommandUserItem";
import { GET_USERS } from "../../graphql/query/user";
import Query from "../Query";

/**
 * 추천 사용자 목록 컴포넌트
 *
 * @Component
 * @author frisk
 */
const RecommandUserList = () => (
    <ul>
        <Query
            query={GET_USERS}
            variables={{
                limit: 5
            }}
        >
            {({ data: { users } }) =>
                users.rows.map((user) => (
                    <RecommandUserItem key={user.id} {...user} />
                ))
            }
        </Query>
    </ul>
);

export default memo(RecommandUserList);
