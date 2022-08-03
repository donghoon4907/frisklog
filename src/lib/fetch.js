export const fetchThen = (fetchMore, { type, variables }) => async (
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
