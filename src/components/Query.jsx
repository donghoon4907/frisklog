import React from "react";
import { Query } from "@apollo/react-components";

import Loader from "./Loader";

/**
 * 공통 요청 쿼리 컴포넌트
 *
 */
const CommonQuery = ({ children, ...props }) => {
    return (
        <Query {...props}>
            {({ error, data, ...others }) => {
                if (error) {
                    return `Error!: ${error}`;
                }

                if (!data) {
                    return <Loader />;
                }

                return children({
                    ...others,
                    data
                });
            }}
        </Query>
    );
};

export default CommonQuery;
