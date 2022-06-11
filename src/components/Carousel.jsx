import React, { useState, useRef, useEffect } from "react";
import { tween, transform, css, value } from "popmotion";
// import { Arrow } from "../assets/icon";

/**
 * 공통 버튼 컴포넌트
 *
 */
const Carousel = (items) => {
    const sliderEl = useRef(null);
    // 현재 위치
    const [currentX, setCurrentX] = useState(0);
    // item 너비
    const [itemWidth, setItemWidth] = useState(null);
    // item gap
    const [itemGap, setItemGap] = useState(null);
    // slider width
    const [sliderWidth, setSliderWidth] = useState(null);

    // 마우스 휠 핸들러
    const handleWheel = (e) => {
        // e.stopPropagation();

        // e.preventDefault();
        console.log(e.deltaY);
        move(e.deltaY > 0 ? 0.05 : -0.1);
    };
    // 가까운 item의 offset
    const findClosestItemOffset = (targetX, delta) => {
        const totalItems = Math.abs(targetX) / (itemWidth + itemGap);

        const totalCompleteItems =
            delta === 1 ? Math.floor(totalItems) : Math.ceil(totalItems);

        return 0 - totalCompleteItems * (itemWidth + itemGap);
    };
    // 슬라이더 전체 너비
    const getSliderWidth = (items) => {
        // 첫 번째 아이템의 left offset
        const { left } = items[0].getBoundingClientRect();
        // 마지막 아이템의 right offset
        const { right } = items[items.length - 1].getBoundingClientRect();

        return right - left;
    };

    // 이동 애니메이션
    const move = (delta) => {
        // 옮겨질 위치
        let targetX = currentX + -sliderEl.current.offsetWidth * delta;

        const maxXOffset = 0;

        const minXOffset = -(sliderWidth - sliderEl.current.offsetWidth);

        const clampXOffset = transform.clamp(maxXOffset, minXOffset);

        const clampedX = clampXOffset(targetX);
        // 처음과 끝처리
        targetX =
            targetX === clampedX
                ? findClosestItemOffset(targetX, delta)
                : clampedX;

        // console.log(delta);
        // fire animation
        tween({
            from: currentX,
            to: targetX,
            onUpdate: (v) => {
                console.log(v);
                const sliderRenderer = css(sliderEl.current);
                sliderRenderer.set("x", targetX);
                setCurrentX(targetX);
                // console.log(v);
                // sliderEl.current.style += `translateX(${v}px)`;
            }
        }).start();
    };

    useEffect(() => {
        const $slider = sliderEl.current;

        const items = $slider.querySelectorAll(".item");

        const totalItemsWidth = getSliderWidth(items);

        setSliderWidth(totalItemsWidth);

        const { right, width } = items[0].getBoundingClientRect();

        setItemWidth(width);

        setItemGap(items[1].getBoundingClientRect().left - right);

        const maxXOffset = 0;

        const minXOffset = -(totalItemsWidth - $slider.offsetWidth);

        // setClampXOffset(transform.clamp(minXOffset, maxXOffset));

        // const t = transform.clamp(minXOffset, maxXOffset);
        // console.log(t);

        // $slider.addEventListener("scroll", handleWheel, { passive: true });

        // return () =>
        //     $slider.removeEventListener("scroll", handleWheel, {
        //         passive: true
        //     });
    }, []);

    return (
        <div className="fr-carousel">
            <ul
                className="fr-carousel__slider"
                onWheel={handleWheel}
                ref={sliderEl}
            >
                <li className="fr-carousel__item item">1</li>
                <li className="fr-carousel__item item">2</li>
                <li className="fr-carousel__item item">3</li>
                <li className="fr-carousel__item item">4</li>
                <li className="fr-carousel__item item">5</li>
                <li className="fr-carousel__item item">6</li>
                <li className="fr-carousel__item item">7</li>
                <li className="fr-carousel__item item">8</li>
                <li className="fr-carousel__item item">9</li>
                <li className="fr-carousel__item item">1</li>
                <li className="fr-carousel__item item">1</li>
                <li className="fr-carousel__item item">1</li>
                <li className="fr-carousel__item item">1</li>
            </ul>
        </div>
    );
};

export default Carousel;
