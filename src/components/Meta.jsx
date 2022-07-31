import React from "react";
import { Helmet } from "react-helmet";

/**
 * 메타 컴포넌트
 *
 */
const Meta = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title || "none"}</title>
            <meta name="description" content={description || "none"} />
            {/* <script src="https://accounts.google.com/gsi/client" async defer /> */}
        </Helmet>
    );
};

export default Meta;
