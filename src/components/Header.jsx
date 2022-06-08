import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../context";
import ProfileBtn from "./ProfileBtn";
import SearchBtn from "./SearchBtn";
import HeaderSearchBar from "./HeaderSearchBar";
import CreatePostBtn from "./CreatePostBtn";
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
        <div className={`${displayName}-wrapper`}>
            <header className={`${displayName}`}>
                <div className={`${displayName}-column`}>
                    <Link to="/">
                        <Home />
                    </Link>
                    {/* <HeaderNotice /> */}
                </div>
                <div className={`${displayName}-column`}>
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
