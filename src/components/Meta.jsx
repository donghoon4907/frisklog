import React from "react";
import { Helmet } from "react-helmet";

/**
 * * 검색엔진 최적화를 위한 메타 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.title Head title
 */
const Meta = ({ title, description }) => (
    <Helmet>
        <title>{title || "Frisklog"}</title>
        <meta
            name="description"
            content={description || "Blog made by frisk"}
        />
        <meta name="twitter:title" content={title || "Frisklog"} />
        <meta
            name="twitter:description"
            content={description || "Blog made by frisk"}
        />
        <meta name="twitter:image:alt" content="frisklog" />
        <script src="https://accounts.google.com/gsi/client" async defer />
    </Helmet>
);

export default Meta;
