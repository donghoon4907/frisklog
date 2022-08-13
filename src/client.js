import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { loadableReady } from "@loadable/component";
import SSRProvider from "react-bootstrap/SSRProvider";

import { ContextProvider } from "./context";
import App from "./App";
import { initializeApollo } from "./lib/apollo";
import { TOKEN_KEY, getStorage } from "./lib/cookie";

const token = getStorage(TOKEN_KEY);

const apolloClient = initializeApollo(
    window ? window.__APOLLO_STATE__ : null,
    token
);

const container = document.getElementById("root");
/**
 * Wait for all loadable components to be loaded before rendering.
 * Beacuse Loadable components loads all our scripts asynchronously.
 */
loadableReady(() => {
    hydrate(
        <ApolloProvider client={apolloClient}>
            <ContextProvider context={window ? window.__CONTEXT_STATE__ : {}}>
                <BrowserRouter>
                    <SSRProvider>
                        <App />
                    </SSRProvider>
                </BrowserRouter>
            </ContextProvider>
        </ApolloProvider>,
        container
    );
});

if (module.hot) {
    module.hot.accept();
}
