import React, { Component } from "react";
import Loader from "./Loader";

/**
 * 스크롤 이벤트 컴포넌트
 *
 * @param {boolean}  props.loading   요청 중 여부
 * @param {function} props.onBottom  조건부 실행 함수
 */
class Scroll extends Component {
    // 스크롤 핸들러
    handleScroll = () => {
        const { loading, onBottom } = this.props;

        if (!loading) {
            const $main = document.querySelector("#main");

            const { scrollHeight, clientHeight, scrollTop } = $main;

            if (scrollTop + clientHeight === scrollHeight) {
                onBottom();
            }
        }
    };

    componentDidMount() {
        const $main = document.querySelector("#main");

        $main.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        const $main = document.querySelector("#main");

        $main.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        const { loading } = this.props;

        return loading ? <Loader /> : null;
    }
}

export default Scroll;
