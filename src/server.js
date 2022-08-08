import path from "path";
import express from "express";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { renderToString } from "react-dom/server";
import { ApolloProvider } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { Helmet } from "react-helmet";
import cookieParser from "cookie-parser";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import SSRProvider from "react-bootstrap/SSRProvider";
import jwt from "jsonwebtoken";
import { ContextProvider } from "./context";
import { initializeApollo } from "./lib/apollo";
import App from "./App";
import { TOKEN_KEY, THEME_KEY } from "./lib/cookie";

// const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
/** init express */
const server = express();
/** init cookie parser */
server.use(cookieParser());
// 접근 허용 폴더 설정
server.use("/", express.static("src/public"));

server
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get("/*", async (req, res) => {
        const location = req.url;

        const context = {};

        const theme = req.cookies[THEME_KEY];

        context.theme = theme ? JSON.parse(theme) : "light";

        // const collapse = req.cookies[COLLAPSE_KEY];

        // context.isCollapseNav = collapse ? JSON.parse(collapse) : "contract";

        const token = req.cookies[TOKEN_KEY];

        if (token) {
            try {
                const { id, nickname, avatar, isMaster } = jwt.verify(
                    JSON.parse(token),
                    process.env.RAZZLE_JWT_SECRET
                );

                context.id = id;

                // context.email = email;

                context.nickname = nickname;

                context.avatar = avatar;

                context.isMaster = isMaster;
            } catch (err) {
                res.clearCookie(TOKEN_KEY);
            }
        }

        const extractor = new ChunkExtractor({
            statsFile: path.resolve("build/loadable-stats.json"),
            entrypoints: ["client"]
        });
        /** Init apollo client */
        const client = initializeApollo();

        const Root = () => (
            <ChunkExtractorManager extractor={extractor}>
                <ApolloProvider client={client}>
                    <ContextProvider context={context}>
                        <StaticRouter location={location} context={{}}>
                            <SSRProvider>
                                <App />
                            </SSRProvider>
                        </StaticRouter>
                    </ContextProvider>
                </ApolloProvider>
            </ChunkExtractorManager>
        );

        try {
            /** get query in pages */
            await getDataFromTree(<Root />);
        } catch (e) {
            console.log(e);
        }
        /** Get apollo cache */
        const initialApolloState = client.extract();

        /** When the app is rendered collect the styles that are used inside it */
        const markup = renderToString(extractor.collectChunks(<Root />));

        const helmet = Helmet.renderStatic();

        // const html = helmet.htmlAttributes.toString();

        res.status(200).send(`
                <!DOCTYPE html lang="ko-KR">
                <html data-theme="${context.theme}">
                    <head>
                        <meta charset="utf-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta http-equiv="cache-control" content="no-store" />
                        <meta
                            name="viewport"
                            content="width=device-width,initial-scale=1"
                        />
                        <meta name="google-site-verification" content="aoZxIt3H-7OsxSv1vl4eS_NrxGE2_3y6S9XzTGoLg2o" />
                        ${helmet.title.toString()}
                        ${helmet.meta.toString()} ${helmet.link.toString()}
                        ${extractor.getLinkTags()}
                        ${extractor.getStyleTags()}
                        ${extractor.getScriptTags()}
                    </head>
                    <body ${helmet.bodyAttributes.toString()}>
                        <div id="root">${markup}</div>
                        <script>
                            window.__APOLLO_STATE__ = ${JSON.stringify(
                                initialApolloState
                            ).replace(/</g, "\\u003c")};
                            window.__CONTEXT_STATE__ = ${JSON.stringify(
                                context
                            )}
                        </script>
                    </body>
                </html>
            `);
    });

export default server;
