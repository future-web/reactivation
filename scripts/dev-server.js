import express from "express";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import jsonServer from "json-server";
import errorOverlayMiddleware from "react-dev-utils/errorOverlayMiddleware.js";
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware.js';
import DashboardPlugin from "./dashboard-plugin.js";

const MOCK_API_PATH = "/__mockapi";

process.env.NODE_ENV = "development";
process.env.API_BASE_URI = process.env.API_BASE_URI || MOCK_API_PATH;

async function go() {
  const host = process.env.HOST || "0.0.0.0";
  const port = process.env.PORT || 3000;

  const { default: rawConfig } = await import("../webpack.config.js");

  const entry = ["react-dev-utils/webpackHotDevClient", rawConfig.entry];

  const plugins = [
    ...rawConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin({ host, port })
  ];

  const config = { ...rawConfig, entry, plugins };

  const jsonServerRouter = jsonServer.router("mockapi/db.json");

  function rewriteTemplates(obj) {
    const str = JSON.stringify(obj);
    const rewritten = str.replace(/<baseUrl>/g, MOCK_API_PATH);
    return JSON.parse(rewritten);
  }

  const superRender = jsonServerRouter.render;

  jsonServerRouter.render = function render(req, res) {
    res.locals.data = rewriteTemplates(res.locals.data, req, res);
    superRender.call(this, req, res);
  };

  const serverConfig = {
    host,
    hot: true,
    transportMode: 'ws',
    injectClient: false,
    historyApiFallback: true,
    quiet: true,
    overlay: false,
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());
      app.use(MOCK_API_PATH, express.static("mockapi"));
      app.use(MOCK_API_PATH, jsonServerRouter);
    }
  };

  const devServer = new WebpackDevServer(webpack(config), serverConfig);
  devServer.listen(port, host);
}

go();
