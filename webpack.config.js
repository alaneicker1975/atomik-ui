const path = require('path');
const AutoPrefixer = require('autoprefixer');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';
const buildEvent = process.env.npm_lifecycle_event;

let buildDir;
let cssBuildPath;

if (buildEvent === 'build:styles') {
  buildDir = './dist/styles';
  cssBuildPath = '[name].min.css';
} else {
  buildDir = './styles';
  cssBuildPath = 'styles/[name].css';
}

module.exports = {
  mode: !prod ? 'development' : 'production',
  entry: {
    main: path.resolve(__dirname, 'src/styles/main.scss'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, buildDir),
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/,
      },
      {
        test: /\.(s?css|sass)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !prod,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return AutoPrefixer;
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin()],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: cssBuildPath,
      chunkFilename: cssBuildPath,
    }),
  ],
};
