import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import fetch from "isomorphic-unfetch";
import { relayStylePagination } from "@apollo/client/utilities";

import { TOKEN_KEY, getStorage, deleteStorage } from "./cookie";

/**
 * 아폴로 클라이언트 객체
 * @type {object|null}
 */
let apolloClient = null;

/**
 * 노드 환경에 fetch 추가
 */
if (!process.browser) {
    global.fetch = fetch;
}

/**
 * 아폴로 클라이언트 객체 생성 함수
 * @author frisk
 */
function createApolloClient() {
    /**
     * http 연결을 통해 GraphQL 요청 및 응답 처리 활성화
     */
    const httpLink = createHttpLink({
        uri: process.env.RAZZLE_BACKEND_GRAPHQL
    });

    /**
     * 서버 오류, 네트워크 오류 및 GraphQL 오류 포착 및 처리
     */
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, path, extensions, ...props }) => {
                console.log(`[GraphQL error] Query: ${path}, ${message}`);

                if (extensions) {
                    const { status } = extensions;

                    if (status === 401) {
                        deleteStorage(TOKEN_KEY);
                    }
                }
            });
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    });

    /**
     * 요청 컨텍스트를 설정
     */
    const authLink = setContext((_, { headers }) => {
        const token = getStorage(TOKEN_KEY);

        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        };
    });

    const typePolicies = {
        Query: {
            fields: {
                posts: relayStylePagination(),
                postsByCategory: relayStylePagination(),
                followings: relayStylePagination()
            }
        }
    };

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: ApolloLink.from([errorLink, authLink, httpLink]),
        cache: process.browser
            ? new InMemoryCache({ typePolicies }).restore(
                  window.__APOLLO_STATE__
              )
            : new InMemoryCache({ typePolicies })
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient || createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }
    // For SSG and SSR always create a new Apollo Client
    if (!process.browser) return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}
