import React, { useCallback, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Header from "./components/Header";
import AuthModal from "./components/modal/Auth";
import PostModal from "./components/modal/SetPostContainer";
import { useDispatch, useSelector } from "./context";
import { SET_BREAKPOINT } from "./context/action";
import { getBreakpoint } from "./lib/responsive";
import Query from "./components/Query";
import { GET_RECOMMEND_CATEGORIES } from "./graphql/query/history";
import CategoryBtn from "./components/button/CategoryBtn";

import "./sass/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "highlight.js/styles/atom-one-dark.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "github-markdown-css/github-markdown.css";

const Feed = loadable(() => import("./pages/feed"));
const SearchPostPage = loadable(() => import("./pages/search/SearchPostPage"));
const SearchCategoryPage = loadable(() =>
    import("./pages/search/SearchCategoryPage")
);
const Post = loadable(() => import("./pages/post"));
const CreatePostPage = loadable(() => import("./pages/post/CreatePostPage"));
const UpdatePostPage = loadable(() => import("./pages/post/UpdatePostPage"));
const User = loadable(() => import("./pages/user"));
const NoMatch = loadable(() => import("./pages/404"));

const App = () => {
    const displayName = "fr-app";

    const dispatch = useDispatch();

    const { isShowLoginModal, isShowAddPostModal } = useSelector();

    // 리사이징 핸들러
    const handleResize = useCallback((e) => {
        const { innerWidth } = e.target;

        const { breakpoint, slidesToShow } = getBreakpoint(innerWidth);
        // breakpoint 설정
        dispatch({
            type: SET_BREAKPOINT,
            breakpoint,
            slidesToShow
        });
    }, []);

    useEffect(() => {
        // 리사이징 이벤트 바인딩
        window.addEventListener("resize", handleResize);
        // 리사이징 이벤트 실행
        window.dispatchEvent(new Event("resize"));
        // 리사이징 이벤트 언바인딩
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`${displayName}__wrapper`}>
            <Header />
            <section className={`${displayName}`} id="main">
                <div className={`${displayName}__body`}>
                    <div className="fr-main__wrapper">
                        <main className="fr-main">
                            <Switch>
                                <Route exact path="/" component={Feed} />
                                <Route
                                    exact
                                    path="/create_post"
                                    component={CreatePostPage}
                                />
                                <Route
                                    exact
                                    path="/update_post/:id"
                                    component={UpdatePostPage}
                                />
                                <Route
                                    exact
                                    path="/post/:id"
                                    component={Post}
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
                            <div className="fr-recommend__wrapper">
                                <div className="fr-recommend__title">
                                    추천 카테고리
                                </div>
                                <ul
                                    className="fr-recommend"
                                    aria-label="추천 카테고리"
                                >
                                    <Query
                                        query={GET_RECOMMEND_CATEGORIES}
                                        variables={{
                                            limit: 5
                                        }}
                                    >
                                        {({ data: { recommendCategories } }) =>
                                            recommendCategories.map(
                                                ({ category }) => (
                                                    <CategoryBtn
                                                        key={`recCat${category}`}
                                                        content={category}
                                                        isGap={true}
                                                    />
                                                )
                                            )
                                        }
                                    </Query>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            {isShowLoginModal && <AuthModal />}
            {isShowAddPostModal && <PostModal />}
        </div>
    );
};

export default App;
