const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const PostCSSAssetsPlugin = require("postcss-assets-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const isDebug = process.env.NODE_ENV !== "production";
const ASSET_NAME_TEMPLATE = "[name]-[hash:6].[ext]";
const localIdentName = isDebug ? "[path]-[local]_[hash:6]" : "[hash:6]";
const context = path.resolve(__dirname, "src");
const buildDirectory = path.resolve("build");
const entry = ".";

const extractCss = new ExtractTextPlugin({
  filename: ASSET_NAME_TEMPLATE.replace("[ext]", "css")
});

const cssPipeline = isDebug
  ? (...use) => ["style-loader", ...use]
  : (...use) => extractCss.extract({ use });

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
          highlightCode: true
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
        module: true,
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
    // svg icon bundling
    test: /\.svg$/,
    use: [
      {
        loader: "svg-sprite-loader",
        options: {
          esModule: false,
          spriteFilename: ASSET_NAME_TEMPLATE.replace("[ext]", "svg")
        }
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
  new webpack.EnvironmentPlugin(["NODE_ENV", "BABEL_ENV", "API_BASE_URI"]),
  new SpriteLoaderPlugin(),
  new PostCSSAssetsPlugin({
    plugins: [Autoprefixer],
    log: false
  }),
  new HtmlWebpackPlugin({
    template: "index.html",
    minify: { collapseWhitespace: true, collapseBooleanAttributes: true }
  })
];

if (isDebug !== true) {
  plugins.push(
    new MinifyPlugin(),
    new OptimizeCssAssetsPlugin(),
    new ImageminPlugin(),
    extractCss
  );
}

module.exports = {
  context,
  entry,
  plugins,
  module: {
    rules
  },
  output: {
    path: buildDirectory,
    publicPath: "/",
    filename: ASSET_NAME_TEMPLATE.replace("[ext]", "js"),
    chunkFilename: ASSET_NAME_TEMPLATE.replace("[hash:6]", "[chunkhash:6]")
  }
};
