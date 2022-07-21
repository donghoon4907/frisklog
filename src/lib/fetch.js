/**
 * Custom fetch more
 *
 * @param  {function}               fetchMore
 * @param  {object}                 variables
 * @param  {string}                 type
 * @return {(function) => function}
 */
export const handleFetchMore = ({ fetchMore, variables, type }) => (callback) =>
    fetchMore({
        variables,
        updateQuery: (prev, next) => {
            const { fetchMoreResult } = next;

            if (!fetchMoreResult || fetchMoreResult[type].length === 0) {
                return prev;
            }

            callback();

            return {
                [type]: [...prev[type], ...fetchMoreResult[type]]
            };
        }
    });
