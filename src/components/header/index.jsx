import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../../context";
import ProfileBtn from "../button/Profile";
import SearchBtn from "../button/Search";
import HeaderSearchBar from "./SearchBar";
import CreatePostBtn from "../button/CreatePost";
// import HeaderNotice from "./Notice";
import { Home } from "../../assets/icon";

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
                <div className={`${displayName}__column`} title="Home">
                    <Link to="/" aria-label="Home">
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