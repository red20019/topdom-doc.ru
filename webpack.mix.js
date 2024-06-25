const mix = require('laravel-mix');
// const path = require('path');
// const TerserPlugin = require("terser-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//  mix.webpackConfig({
//     plugins: [
//         new BundleAnalyzerPlugin()
//     ]
// });

// mix.webpackConfig({
//     optimization: {
//         splitChunks: {
//             chunks: 'all',
//             minSize: 10000,
//             maxSize: 25000,
//         },
//         minimize: true,
//         minimizer: [new TerserPlugin()],
//     },
// });


mix.ts('resources/js/app.tsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');
