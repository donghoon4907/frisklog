import React from "react";
import { Helmet } from "react-helmet";

import { useSelector } from "../context";

/**
 * 메타 컴포넌트
 *
 */
const Meta = ({ title, description }) => {
    const { theme } = useSelector();

    return (
        <Helmet>
            <html lang="en" data-theme={theme || "light"} />
            <title>{title || "none"}</title>
            <meta name="description" content={description || "none"} />
            {/* <script src="https://accounts.google.com/gsi/client" async defer /> */}
        </Helmet>
    );
};

export default Meta;
