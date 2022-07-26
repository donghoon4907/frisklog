import React from "react";
import { NavLink } from "react-router-dom";

/**
 * 공통 버튼 링크 컴포넌트
 *
 * @param props.to 이동할 url
 */
const BtnLink = ({ to, children }) => (
    <NavLink to={to} className="fr-btn fr-link">
        {children}
    </NavLink>
);
export default BtnLink;
