import React, { useCallback } from "react";

import Button from ".";
import { Github } from "../../assets/icon";

/**
 * Github 로그인 버튼 컴포넌트
 *
 */
const GithubLoginBtn = () => {
    const handleClick = useCallback(async () => {
        const url = `https://github.com/login/oauth/authorize?client_id=${process.env.RAZZLE_GITHUB_CLIENTID}`;

        window.location.assign(url);
    }, []);

    return (
        <Button type="button" onClick={handleClick} className="fr-btn--github">
            <Github style={{ fill: "white", width: 20, height: 20 }} />
            <span>Github 로그인</span>
        </Button>
    );
};

export default GithubLoginBtn;
