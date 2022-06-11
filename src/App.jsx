import React, { useCallback, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Header from "./components/Header";
// import Nav from "./components/Nav";
import AuthModal from "./components/modal/Auth";
// import SetNoticeModal from "./components/modal/SetNoticeContainer";
import { useDispatch, useSelector } from "./context";
import { CONTRACT_NAVIGATION, SET_IS_MOBILE } from "./context/action";
import { COLLAPSE_KEY, setStorage } from "./lib/cookie";

import "./sass/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "highlight.js/styles/atom-one-dark.css";

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

    const {
        isShowLoginModal,
        // isShowNoticeModal,
        isCollapseNav
    } = useSelector();

    // 리사이징 핸들러
    const handleResize = useCallback(
        (e) => {
            const { innerWidth } = e.target;

            if (innerWidth <= 922) {
                // 네비게이션이 확장된 경우
                if (isCollapseNav !== "contract") {
                    // 네비게이션 축소
                    dispatch({
                        type: CONTRACT_NAVIGATION
                    });
                    setStorage(COLLAPSE_KEY, "contract");
                }
            }
            // 모바일 설정
            if (innerWidth <= 576) {
                dispatch({
                    type: SET_IS_MOBILE,
                    payload: true
                });
            } else {
                dispatch({
                    type: SET_IS_MOBILE,
                    payload: false
                });
            }
        },
        [isCollapseNav]
    );

    useEffect(() => {
        // 리사이징 이벤트 바인딩
        window.addEventListener("resize", handleResize);

        const { innerWidth } = window;
        // 모바일 설정
        if (innerWidth <= 576) {
            dispatch({
                type: SET_IS_MOBILE,
                payload: true
            });
        }

        // 리사이징 이벤트 언바인딩
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`${displayName}__container`}>
            <Header />
            <section className={`${displayName}__section`}>
                {/* <Nav /> */}
                <main className={`${displayName}`} id="main">
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
                        <Route exact path="/post/:id" component={Post} />
                        <Route exact path="/user/:id" component={User} />
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
                {isShowLoginModal && <AuthModal />}
                {/* {isShowNoticeModal && <SetNoticeModal />} */}
            </section>
        </div>
    );
};

export default App;
