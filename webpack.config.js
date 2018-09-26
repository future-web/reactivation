import path from "path";
import { EnvironmentPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import PreloadWebpackPlugin from "preload-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssnanoPlugin from "@intervolga/optimize-cssnano-plugin";
import PostCSSAssetsPlugin from "postcss-assets-webpack-plugin";
import Autoprefixer from "autoprefixer";
import cssvariables from "postcss-css-variables";
import ImageminPlugin from "imagemin-webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const mode = process.env.NODE_ENV;
const isProduction = mode === "production";
const ASSET_NAME_TEMPLATE = "[name]-[contenthash].[ext]";
const localIdentName = isProduction ? "[hash:6]" : "[path]-[local]_[hash:6]";
const context = path.resolve(__dirname, "src");
const buildDirectory = path.resolve("build");
const entry = ".";
const publicPath = "/";

const extractCss = new MiniCssExtractPlugin({
  filename: ASSET_NAME_TEMPLATE.replace("[ext]", "css")
});

const cssPipeline = isProduction
  ? (...use) => [MiniCssExtractPlugin.loader, ...use]
  : (...use) => ["style-loader", ...use];

const styleNameConfig = {
  context,
  webpackHotModuleReloading: true,
  handleMissingStyleName: "ignore",
  generateScopedName: localIdentName
};

const rules = [
  {
    // js pipeline
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "thread-loader"
      },
      {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          highlightCode: true,
          plugins: [["react-css-modules", styleNameConfig]]
        }
      }
    ]
  },
  {
    // css pipeline
    test: /\.css$/,
    exclude: /node_modules/,
    use: cssPipeline({
      loader: "css-loader",
      options: {
        modules: true,
        sourceMap: true,
        localIdentName
      }
    })
  },
  {
    // third party css pipeline
    test: /\.css$/,
    include: /node_modules/,
    use: cssPipeline({
      loader: "css-loader"
    })
  },
  {
    // svg icon pipeline
    test: /\.svg$/,
    use: [
      {
        loader: "file-loader"
      },
      {
        loader: "svg-fill-loader"
      }
    ]
  },
  {
    // any other assets
    exclude: /\.(js|css|svg|html)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: ASSET_NAME_TEMPLATE
        }
      }
    ]
  }
];

const plugins = [
  new CaseSensitivePathsPlugin(),
  new EnvironmentPlugin(["API_BASE_URI"]),
  new PostCSSAssetsPlugin({
    plugins: [cssvariables, Autoprefixer],
    log: false
  }),
  new HtmlWebpackPlugin({
    template: "index.html",
    minify: {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeScriptTypeAttributes: true
    }
  }),
  new PreloadWebpackPlugin()
];

if (isProduction) {
  plugins.push(
    extractCss,
    new OptimizeCssnanoPlugin({ sourceMap: true }),
    new ImageminPlugin()
  );
}

const devtool = isProduction ? "hidden-source-map" : "cheap-module-source-map";

const optimization = {
  splitChunks: {
    chunks: "all"
  }
};

export default {
  mode,
  entry,
  context,
  plugins,
  optimization,
  module: {
    rules
  },
  devtool,
  output: {
    path: buildDirectory,
    filename: ASSET_NAME_TEMPLATE.replace("[ext]", "js"),
    publicPath
  }
};
