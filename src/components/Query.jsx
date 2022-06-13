import React from "react";
import { Query } from "@apollo/react-components";
import Loader from "./Loader";

/**
 * * 공통 요청 쿼리 컴포넌트
 *
 * @Component
 * @author firsk
 */
const CommonQuery = ({ children, ...props }) => {
    return (
        <Query {...props}>
            {({ loading, error, data, fetchMore, client }) => {
                if (error) {
                    return `Error!: ${error}`;
                }

                if (!data) {
                    return <Loader />;
                }

                return children({
                    data,
                    loading,
                    fetchMore,
                    client
                });
            }}
        </Query>
    );
};

export default CommonQuery;
