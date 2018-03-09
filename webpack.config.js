const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PostCSSAssetsPlugin = require("postcss-assets-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const mode = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV === "production";
const ASSET_NAME_TEMPLATE = "[name]-[hash:6].[ext]";
const localIdentName = isProduction ? "[hash:6]" : "[path]-[local]_[hash:6]";
const context = path.resolve(__dirname, "src");
const buildDirectory = path.resolve("build");
const entry = ".";
const publicPath = "/";

const extractCss = new ExtractTextPlugin({
  filename: ASSET_NAME_TEMPLATE.replace("[ext]", "css")
});

const cssPipeline = isProduction
  ? (...use) => extractCss.extract({ use })
  : (...use) => ["style-loader", ...use];

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
  new webpack.EnvironmentPlugin(["API_BASE_URI"]),
  new PostCSSAssetsPlugin({
    plugins: [Autoprefixer],
    log: false
  }),
  new HtmlWebpackPlugin({
    template: "index.html",
    minify: { collapseWhitespace: true, collapseBooleanAttributes: true }
  })
];

if (isProduction) {
  plugins.push(new OptimizeCssAssetsPlugin(), new ImageminPlugin(), extractCss);
}

const optimization = {
  splitChunks: {
    chunks: "all"
  }
};

module.exports = {
  mode,
  entry,
  context,
  plugins,
  optimization,
  module: {
    rules
  },
  output: {
    path: buildDirectory,
    filename: ASSET_NAME_TEMPLATE.replace("[ext]", "js"),
    chunkFilename: ASSET_NAME_TEMPLATE.replace("[ext]", "js").replace(
      "[hash:6]",
      "[chunkhash:6]"
    ),
    publicPath
  }
};
