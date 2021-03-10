const path = require('path');
const copyPlugin = require('copy-webpack-plugin');

const config = {
    devServer: {
        lazy: true,
        filename: 'index.js',
        contentBase: path.join(__dirname, 'devbuild'),
        historyApiFallback: true,
        port: 3000,
        open: true,
    },
    target: 'web',
    entry: [path.join(__dirname, 'src', 'index.tsx')],
    resolve: {
        symlinks: false,
        extensions: [
            '.ts',
            '.js',
            '.tsx',
            '.jsx',
        ],
    },
    output: {
        filename: 'index.js',
    },
    plugins: [
        new copyPlugin({
            patterns: [
                {from: 'src/index.html', to: 'index.html'},
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/u,
                exclude: '/node_modules/',
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                }],
            }, {
                test: /\.scss$/u,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    watchOptions: {
        ignored: ['node_modules'],
    },
};

module.exports = process.env.BUILD_ENV === 'production' ? {
    ...config,
    mode: 'production',
    output: {
        filename: config.output.filename,
        path: path.resolve(__dirname, 'docs'),
        libraryTarget: config.output.libraryTarget,
    },
} : {
    ...config,
    mode: 'development',
    output: {
        filename: config.output.filename,
        path: path.resolve(__dirname, 'devbuild'),
        libraryTarget: config.output.libraryTarget,
    },
    devtool: 'source-map',
};
