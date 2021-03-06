var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const cssLoaders = [{
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
    sourceMap: true
  }
}, {
  loader: 'postcss-loader'
}, {
  loader: 'less-loader',
  options: {
    sourceMap: true
  }
}];

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: cssLoaders})
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx', '.less', '.css']
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.css', disable: false, allChunks: true})
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
