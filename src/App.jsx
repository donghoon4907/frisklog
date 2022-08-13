import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

import Header from "./components/header";
import Footer from "./components/footer";
import AuthModal from "./components/modal/Auth";
import PostModal from "./components/modal/SetPostContainer";
import UserModal from "./components/modal/SetUserContainer";
import { useSelector } from "./context";

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
const Message = loadable(() => import("./pages/message"));
const NoMatch = loadable(() => import("./pages/404"));
// aside
const AsideMypage = loadable(() => import("./components/aside/Mypage"));
const AsideRecommend = loadable(() => import("./components/aside/Recommend"));
const AsideFollow = loadable(() => import("./components/aside/Follow"));
const AsideMessage = loadable(() => import("./components/aside/Message"));

const App = () => {
    const displayName = "fr-app";

    const {
        isShowLoginModal,
        isShowPostModal,
        isShowUserModal
    } = useSelector();

    return (
        <div className={`${displayName}__wrapper`}>
            <Header />
            <div className={`${displayName}`} id="main">
                <div className={`${displayName}__body`}>
                    <div className="fr-main__wrapper">
                        <main className="fr-main">
                            <Switch>
                                <Route exact path="/" component={Feed} />
                                <Route path="/follow" component={Follow} />
                                <Route path="/user/:id" component={User} />
                                <Route
                                    path="/search/:query"
                                    component={SearchPostPage}
                                />
                                <Route
                                    path="/category/:content"
                                    component={SearchCategoryPage}
                                />
                                <Route path="/message" component={Message} />
                                <Route component={NoMatch} />
                            </Switch>
                        </main>
                    </div>
                    <div className="fr-aside__wrapper">
                        <aside className="fr-aside">
                            <div className="fr-aside__body">
                                <Switch>
                                    <Route
                                        path="/follow"
                                        component={AsideFollow}
                                    />
                                    <Route
                                        path="/user/:id"
                                        component={AsideMypage}
                                    />
                                    <Route
                                        path="/message"
                                        component={AsideMessage}
                                    />
                                    <Route component={AsideRecommend} />
                                </Switch>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
            {isShowLoginModal && <AuthModal />}
            {isShowPostModal && <PostModal />}
            {isShowUserModal && <UserModal />}
        </div>
    );
};

export default App;
