import React from "react";
import Slider from "react-slick";
import { useSelector } from "../context";
import { Arrow } from "../assets/icon";

const PrevArrow = ({ onClick }) => {
    return (
        <button className="fr-carousel__prev" onClick={onClick}>
            <Arrow style={{ opacity: 0.5 }} />
        </button>
    );
};

const NextArrow = ({ onClick }) => {
    return (
        <button className="fr-carousel__next" onClick={onClick}>
            <Arrow style={{ opacity: 0.5 }} />
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
        className: "fr-carousel__slider",
        infinite: true,
        speed: 500,
        slidesToShow,
        centerMode: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };

    return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
