export const getBreakpoint = (innerWidth) => {
    let breakpoint = "wd";
    const slidesToShow = 1;

    if (innerWidth <= 1200) {
        breakpoint = "lg";
    }

    if (innerWidth <= 992) {
        breakpoint = "md";
        // slidesToShow = 2;
        // slidesToShow = 1;
    }

    if (innerWidth <= 768) {
        breakpoint = "sm";
        // slidesToShow = 1;
    }

    if (innerWidth <= 576) {
        breakpoint = "xs";
    }

    return {
        breakpoint,
        slidesToShow
    };
};
