import React from "react";
import Slider from "react-slick";
import { useSelector } from "../context";
import { Arrow } from "../assets/icon";

const PrevArrow = ({ onClick }) => {
    return (
        <button
            type="button"
            className="fr-carousel__prev"
            onClick={onClick}
            aria-label="이전 컨텐츠 보기"
        >
            <Arrow />
        </button>
    );
};

const NextArrow = ({ onClick }) => {
    return (
        <button
            type="button"
            className="fr-carousel__next"
            onClick={onClick}
            aria-label="다음 컨텐츠 보기"
        >
            <Arrow />
        </button>
    );
};
/**
 * 공통 버튼 컴포넌트
 *
 */
const Carousel = ({ children }) => {
    const { slidesToShow } = useSelector();

    const settings = {
        className: "fr-carousel",
        infinite: true,
        speed: 500,
        slidesToShow,
        centerMode: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
