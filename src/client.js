import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { loadableReady } from "@loadable/component";
import { ContextProvider } from "./context";
import App from "./App";
import { initializeApollo } from "./lib/apollo";

const apolloClient = initializeApollo(
    window !== "undefined" ? window.__APOLLO_STATE__ : null
);

const container = document.getElementById("root");
/**
 * Wait for all loadable components to be loaded before rendering.
 * Beacuse Loadable components loads all our scripts asynchronously.
 */
loadableReady(() => {
    hydrate(
        <ApolloProvider client={apolloClient}>
            <ContextProvider
                context={window !== "undefined" ? window.__CONTEXT_STATE__ : {}}
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ContextProvider>
        </ApolloProvider>,
        container
    );
});

if (module.hot) {
    module.hot.accept();
}
