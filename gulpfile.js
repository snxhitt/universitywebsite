const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Define File Paths
const paths = {
    html: {
        src: '*.html',
        dest: 'dist/'
    },
    styles: {
        src: '*.css',
        dest: 'dist/'
    },
    scripts: {
        src: ['*.js', '!gulpfile.js'], // Grabs script.js and sw.js, ignores gulpfile
        dest: 'dist/'
    },
    images: {
        src: 'images/**/*.{jpg,jpeg,png,svg,gif}', // Assuming you create an 'images' folder locally
        dest: 'dist/images/'
    }
};

// 1. Minify HTML
function optimizeHtml() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// 2. Minify CSS
function optimizeStyles() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// 3. Minify JavaScript
function optimizeScripts() {
    return gulp.src(paths.scripts.src)
        .pipe(terser())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// 4. Optimize Images
function optimizeImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// 5. Live Reload Server & File Watcher
function serve() {
    browserSync.init({
        server: {
            baseDir: './dist' // Serve the optimized files
        }
    });

    gulp.watch(paths.html.src, optimizeHtml);
    gulp.watch(paths.styles.src, optimizeStyles);
    gulp.watch(paths.scripts.src, optimizeScripts);
    gulp.watch(paths.images.src, optimizeImages);
}

// Define Export Tasks
const build = gulp.parallel(optimizeHtml, optimizeStyles, optimizeScripts, optimizeImages);

// The default task (runs when you type `gulp` in the terminal)
exports.build = build;
exports.default = gulp.series(build, serve);
