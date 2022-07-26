import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { useMutation } from "@apollo/client";

import Header from "./components/header";
import AuthModal from "./components/modal/Auth";
import PostModal from "./components/modal/SetPostContainer";
import UserModal from "./components/modal/SetUserContainer";
import { useSelector } from "./context";
// import { SIGN_IN_GITHUB } from "./graphql/mutation/user";
// import { SET_BREAKPOINT } from "./context/action";
// import { useResize } from "./hooks";

import "./sass/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "highlight.js/styles/atom-one-dark.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "github-markdown-css/github-markdown.css";
// page
const Feed = loadable(() => import("./pages/feed"));
const SearchPostPage = loadable(() => import("./pages/search/SearchPostPage"));
const SearchCategoryPage = loadable(() =>
    import("./pages/search/SearchCategoryPage")
);
const User = loadable(() => import("./pages/user"));
const Follow = loadable(() => import("./pages/follow"));
const NoMatch = loadable(() => import("./pages/404"));
// aside
const AsideMypage = loadable(() => import("./components/aside/Mypage"));
const AsideRecommend = loadable(() => import("./components/aside/Recommend"));
const AsideFollow = loadable(() => import("./components/aside/Follow"));

const App = () => {
    const displayName = "fr-app";

    // const [githubLogin] = useMutation(SIGN_IN_GITHUB);

    const {
        isShowLoginModal,
        isShowPostModal,
        isShowUserModal
    } = useSelector();

    // const [breakpoint] = useResize();

    // useEffect(() => {
    //     dispatch({
    //         type: SET_BREAKPOINT,
    //         breakpoint
    //     });
    // }, [breakpoint]);

    // useEffect(async () => {
    //     const url = new URL(window.location.href);

    //     const code = url.searchParams.get("code");

    //     if (code) {
    //         const { data } = await githubLogin({
    //             variables: {
    //                 code
    //             }
    //         });

    //         console.log(data);
    //     }
    // }, []);

    return (
        <div className={`${displayName}__wrapper`}>
            <Header />
            <div className={`${displayName}`} id="main">
                <div className={`${displayName}__body`}>
                    <div className="fr-main__wrapper">
                        <main className="fr-main">
                            <Switch>
                                <Route exact path="/" component={Feed} />
                                <Route
                                    exact
                                    path="/follow"
                                    component={Follow}
                                />
                                <Route
                                    exact
                                    path="/user/:id"
                                    component={User}
                                />
                                <Route
                                    exact
                                    path="/search/:query"
                                    component={SearchPostPage}
                                />
                                <Route
                                    exact
                                    path="/category/:content"
                                    component={SearchCategoryPage}
                                />
                                <Route component={NoMatch} />
                            </Switch>
                        </main>
                    </div>
                    <div className="fr-aside__wrapper">
                        <aside className="fr-aside">
                            <Switch>
                                <Route
                                    exact
                                    path="/follow"
                                    component={AsideFollow}
                                />
                                <Route
                                    exact
                                    path="/user/:id"
                                    component={AsideMypage}
                                />
                                <Route component={AsideRecommend} />
                            </Switch>
                        </aside>
                    </div>
                </div>
            </div>
            {isShowLoginModal && <AuthModal />}
            {isShowPostModal && <PostModal />}
            {isShowUserModal && <UserModal />}
        </div>
    );
};

export default App;
