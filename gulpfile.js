var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var babel = require('gulp-babel');






gulp.task('default', function() {
  // place code for your default task here
});

// Watch CSS
gulp.task('watch', function() {
	gulp.watch('./css/*.scss', ['sass']);
});

gulp.task("sass", function(){
	return gulp.src(['./css/main.scss'])
	.pipe(sass())
	.pipe(rename("styles.min.css"))
	.pipe(cleanCSS())
	.pipe(gulp.dest("./css"))
});

gulp.task('babel', () => {
    return gulp.src('./javascript/test.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename("test1.js"))
        .pipe(gulp.dest('./javascript'));
});

