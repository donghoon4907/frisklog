import React from "react";
import Pagination from "react-bootstrap/Pagination";

/**
 * Bootstrap 페이지네이션 컴포넌트
 *
 * @param {number}   props.totalCount    리스트 총 개수
 * @param {number}   props.pageSize      페이지 별 리스트 수
 * @param {number}   props.currentPage   현재 페이지
 * @param {function} props.setCurrentPage
 * @param {boolean}  props.isShowFirst
 * @param {boolean}  props.isShowLast
 */
const BootstrapPagination = ({
    totalCount,
    pageSize,
    currentPage,
    setCurrentPage,
    isShowFirst = true,
    isShowLast = true
}) => {
    const pageCount = Math.ceil(totalCount / pageSize);

    const setPage = (pageNo) => {
        if (currentPage === pageNo) {
            return;
        }

        setCurrentPage(pageNo);
    };

    let isPageNoOutOfRange;

    const pages = Array.from({ length: pageCount }).map((_, index) => {
        const pageNo = index + 1;
        const isFirst = pageNo === 1;
        const isLast = pageNo === pageCount;
        const isCurPageWithinTwoPageNo = Math.abs(pageNo - currentPage) <= 2;

        if (isFirst || isLast || isCurPageWithinTwoPageNo) {
            isPageNoOutOfRange = false;

            return (
                <Pagination.Item
                    key={`pageItem${pageNo}`}
                    onClick={() => setPage(pageNo)}
                    active={pageNo === currentPage}
                >
                    {pageNo}
                </Pagination.Item>
            );
        }

        if (!isPageNoOutOfRange) {
            isPageNoOutOfRange = true;

            return <Pagination.Ellipsis key={`pageEllipsis${pageNo}`} />;
        }

        return null;
    });

    return (
        <Pagination>
            {isShowFirst && (
                <Pagination.First
                    onClick={() => setPage(1)}
                    disabled={currentPage === 1}
                />
            )}

            <Pagination.Prev
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {pages}
            <Pagination.Next
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === pageCount}
            />
            {isShowLast && (
                <Pagination.Last
                    onClick={() => setPage(pageCount)}
                    disabled={currentPage === pageCount}
                />
            )}
        </Pagination>
    );
};

export default BootstrapPagination;
