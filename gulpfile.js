
const gulp = require('gulp');
const sass = require('gulp-sass');
const haml = require('gulp-ruby-haml');
const prefixer = require('gulp-autoprefixer');
const beautify = require('gulp-html-beautify');

// var uglify = require('gulp-uglify');
// var cssnano = require('gulp-cssnano');
// var imagemin = require('gulp-imagemin');

// // Para juntar media queries similares en una sola *
// var mqpacker = require('css-mqpacker')
// // Crear tamaños responsivos para las fuentes *
// var rucksack = require('rucksack-css')
// // Permite trabajar con parciales de HTML *
// var fileinclude = require('gulp-file-include')
// // Optimizar imágenes png y jpg *
// var tinypng = require('gulp-tinypng')
// // Minificar CSS *
// var csswring = require('csswring')
// // Minificar HTML *
// var htmlmin = require('gulp-htmlmin')
// // Inicializar critical css *
// var critical = require('critical')



let browserSync = require('browser-sync').create();
let directory = 'docs'; 
//var directory = 'docs';

gulp.task('browser', function () {
  browserSync.init({
    server: {
      baseDir: directory
    }
  })
});

var source_paths = {
    haml: ['src/*.haml', 'src/partials/*.haml'],  
    //haml:  'src/*.haml',     //for production
     css:  'src/css/**/*',  
      js:  'src/js/**/*', 
    sass:  'src/scss/**/*.scss',  
   fonts:  'src/fonts/**/*',
  images:  'src/img/**/*',
 scripts:  'src/scripts/**/*', 
}

gulp.task('haml', function(){
  return gulp.src(source_paths.haml)
    .pipe(haml({doubleQuote: true})) 
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest(directory))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('css', function() {
  return gulp.src(source_paths.css)
  .pipe(gulp.dest(directory + '/assets/css'))
});

gulp.task('js', function() {
  return gulp.src(source_paths.js)
  .pipe(gulp.dest(directory + '/assets/js'))
});

gulp.task('sass', function () {
  return gulp.src(source_paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('last 5 version'))
    .pipe(gulp.dest(directory + '/assets/css'));
});

gulp.task('fonts', function() {
  return gulp.src(source_paths.fonts)
  .pipe(gulp.dest(directory + '/assets/fonts'))
});

gulp.task('images', function() {
  return gulp.src(source_paths.images)
  .pipe(gulp.dest(directory + '/assets/img'))
});

gulp.task('scripts', function() {
  return gulp.src(source_paths.scripts)
  .pipe(gulp.dest(directory + '/assets/js'))
});

gulp.task('watch', ['haml','css','js','sass','fonts','images','scripts'], function() {
    gulp.watch(source_paths.haml, ['haml']).on('change', browserSync.reload);
    gulp.watch(source_paths.sass, ['sass']).on('change', browserSync.reload);
    gulp.watch(source_paths.scripts, ['scripts']).on('change', browserSync.reload);
    gulp.watch(source_paths.images, ['images']).on('change', browserSync.reload);
});

gulp.task('default', ['watch','browser']);