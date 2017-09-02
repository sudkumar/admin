let mix = require('laravel-mix');


// update the default module resolver to include the resources/assets path
mix.webpackConfig({
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'resources/assets')
        ]
    }
});

// to fix the issue of bootstrap dependency on jquery and throwing error
mix.autoload({
   jquery: ['$', 'window.jQuery',"jQuery","window.$","jquery","window.jquery"]
});

mix.js('resources/assets/js/app.js', 'public/js')
    // exclude the vendor folder
    .extract(["vue", "jquery", "bootstrap-sass", "axios", "lodash"])
    .sass('resources/assets/sass/app.scss', 'public/css');

if (mix.inProduction()) {
    mix.version(); // add the version in the production
    mix.disableNotifications(); // disable the notification in production
} else {
    // sync any changes with browser by proxying the created server by php artisan
    mix.browserSync({
        proxy: 'http://localhost:8000',
        notify: false
    });
}