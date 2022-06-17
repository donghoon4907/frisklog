import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../context";
import ProfileBtn from "./button/ProfileBtn";
import SearchBtn from "./button/SearchBtn";
import HeaderSearchBar from "./HeaderSearchBar";
import CreatePostBtn from "./button/CreatePostBtn";
// import HeaderNotice from "./HeaderNotice";
import { Home } from "../assets/icon";

/**
 * 공통 헤더 컴포넌트
 *
 */
const Header = () => {
    const displayName = "fr-header";
    // selector
    const { isShowSearchBar } = useSelector();

    return (
        <div className={`${displayName}__wrapper`}>
            <header className={`${displayName}`}>
                <div className={`${displayName}__column`}>
                    <Link to="/">
                        <Home />
                    </Link>
                    {/* <HeaderNotice /> */}
                </div>
                <div className={`${displayName}__column`}>
                    <SearchBtn />
                    <CreatePostBtn />
                    <ProfileBtn />
                </div>
            </header>
            {isShowSearchBar && (
                <div className={`${displayName}__search-wrapper`}>
                    <HeaderSearchBar />
                </div>
            )}
        </div>
    );
};

export default Header;
