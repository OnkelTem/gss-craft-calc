var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    lib: './src/lib.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'AppLib'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-private-methods"
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  "corejs": "3"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      'src/api.js',
      'appsscript.json',
      '.clasp.json'
    ])
  ]
};
