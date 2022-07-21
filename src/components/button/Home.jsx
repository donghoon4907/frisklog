import React from "react";
import { Link } from "react-router-dom";

import { Home } from "../../assets/icon";

/**
 * 홈 아이콘 컴포넌트
 *
 */
const HomeBtn = () => (
    <div title="홈 버튼">
        <Link to="/" aria-label="홈으로 이동">
            <Home />
        </Link>
    </div>
);

export default HomeBtn;
