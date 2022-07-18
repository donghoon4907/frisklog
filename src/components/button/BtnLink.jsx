import React from "react";
import { Link } from "react-router-dom";

/**
 * 공통 버튼 링크 컴포넌트
 *
 * @param props.to 이동할 url
 * @deprecated
 */
const BtnLink = ({ to, children }) => (
    <Link to={to} className="fr-btn fr-link">
        {children}
    </Link>
);
export default BtnLink;
