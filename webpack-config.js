const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
//   entry: 'index.js', // Update with your actual entry file path
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist') // Update with your desired output directory
//   },
  target: 'node', // Set the target to node if you're building for Node.js
  externals: [nodeExternals()],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify')
    }
  }
};
