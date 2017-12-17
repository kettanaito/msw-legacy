import path from 'path';
import packageJson from './package';

export default {
  entry: path.resolve(__dirname, packageJson.module),
  output: {
    path: __dirname,
    filename: packageJson.main,
    library: 'MockeryClient',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        /* Compile TypeScript */
        test: /\.ts$/i,
        exclude: /node_modules/,
        loaders: ['awesome-typescript-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', './index.ts']
  }
};
