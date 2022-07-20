import { Component } from "react";

/**
 * 스크롤 이벤트 컴포넌트
 *
 * @param {function} props.onBottom  조건부 실행 함수
 */
class Scroll extends Component {
    handleScroll = () => {
        const { onBottom } = this.props;

        const $main = document.querySelector("#main");

        const { scrollHeight, clientHeight, scrollTop } = $main;
        // 스크롤 위치 저장
        const { state = {} } = window.history;

        window.history.replaceState(
            {
                ...state,
                scrollTop
            },
            "",
            window.location.pathname
        );

        if (scrollTop + clientHeight > scrollHeight - 600) {
            this.disabledEvent();

            onBottom(this.activeEvent);
        }
    };

    activeEvent = () => {
        const $main = document.querySelector("#main");

        $main.addEventListener("scroll", this.handleScroll);
    };

    disabledEvent = () => {
        const $main = document.querySelector("#main");

        $main.removeEventListener("scroll", this.handleScroll);
    };

    componentDidMount() {
        const { state } = window.history;

        // 스크롤 위치 불러오기
        if (state && state.scrollTop) {
            const $main = document.querySelector("#main");

            $main.scrollTo(0, state.scrollTop);

            window.history.replaceState(
                {
                    ...state,
                    scrollTop: 0
                },
                "",
                window.location.pathname
            );
        }

        this.activeEvent();
    }

    componentWillUnmount() {
        this.disabledEvent();
    }

    render() {
        return null;
    }
}

export default Scroll;
