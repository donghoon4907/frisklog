import React from "react";

import { useSelector } from "../../context";
import ProfileBtn from "../button/Profile";
import SearchBtn from "../button/Search";
import HeaderSearchBar from "./SearchBar";
import CreatePostBtn from "../button/CreatePost";
import HomeBtn from "../button/Home";
import FavoriteBtn from "../button/Favorite";
import ModeBtn from "../button/Mode";

/**
 * 공통 헤더 컴포넌트
 *
 */
const Header = () => {
    const displayName = "fr-header";

    const { isShowSearchBar } = useSelector();

    return (
        <div className={`${displayName}__wrapper`}>
            <header className={`${displayName}`}>
                <div className={`${displayName}__column`}>
                    <HomeBtn />
                </div>
                <div className={`${displayName}__column`}>
                    <ModeBtn />
                    <SearchBtn />
                    <FavoriteBtn />
                    <CreatePostBtn />
                    <ProfileBtn />
                </div>
            </header>
            {isShowSearchBar && <HeaderSearchBar />}
        </div>
    );
};

export default Header;
