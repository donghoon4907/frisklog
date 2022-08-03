/**
 * Custom fetch more
 *
 * @param {function} fetchMore
 * @param {string}   type
 * @param {object}   variables
 */
export const handleFetchMore = (fetchMore, { type, variables }) => async (
    callback
) => {
    const { data } = await fetchMore({
        variables
    });

    const query = data[type];

    const { hasNextPage } = query.pageInfo;

    if (hasNextPage) {
        callback();
    }

    return true;
};
