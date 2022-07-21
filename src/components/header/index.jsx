import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../../context";
import ProfileBtn from "../button/Profile";
import SearchBtn from "../button/Search";
import HeaderSearchBar from "./SearchBar";
import CreatePostBtn from "../button/CreatePost";
import HomeBtn from "../button/Home";

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
                    <SearchBtn />
                    <CreatePostBtn />
                    <ProfileBtn />
                </div>
            </header>
            {isShowSearchBar && <HeaderSearchBar />}
        </div>
    );
};

export default Header;
