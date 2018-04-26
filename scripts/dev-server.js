/* eslint import/no-extraneous-dependencies: off  */
import express from "express";
import webpack, { HotModuleReplacementPlugin } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import jsonServer from "json-server";
import errorOverlayMiddleware from "react-dev-utils/errorOverlayMiddleware";
import DashboardPlugin from "./dashboard-plugin";

const MOCK_API_PATH = "/__mockapi";

process.env.NODE_ENV = "development";
process.env.API_BASE_URI = process.env.API_BASE_URI || MOCK_API_PATH;

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const rawConfig = require("../webpack.config").default;

const entry = ["react-dev-utils/webpackHotDevClient", rawConfig.entry];

const plugins = [
  ...rawConfig.plugins,
  new HotModuleReplacementPlugin(),
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
  quiet: true,
  historyApiFallback: true,
  before(app) {
    app.use(errorOverlayMiddleware());
    app.use(MOCK_API_PATH, express.static("mockapi"));
    app.use(MOCK_API_PATH, jsonServerRouter);
  }
};

const devServer = new WebpackDevServer(webpack(config), serverConfig);
devServer.listen(port, host);
