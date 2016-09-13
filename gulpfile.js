var gulp		= require('gulp')
	uglify		= require('gulp-uglify'),
	sass		= require('gulp-sass'),
	livereload	= require('gulp-livereload'),
	server		= livereload(),
	imagemin	= require('gulp-imagemin'),
	concat		= require('gulp-concat');

function errorMessage(error){
	console.error.bind(error);
	this.emit('end');
};

// Default
gulp.task('default', ['scripts', 'styles', 'images'], function(){
	console.log('Gulp complete!');
});

// Scripts
gulp.task('scripts', ['concatjs', 'minjs', 'watchscripts'], function(){
	console.log('Scripts complete.');
});

// JS Concatenate
gulp.task('concatjs', function(){
	gulp.src(['./assets/scripts/*.js', '!./assets/scripts/bundle.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./assets/scripts'));
	console.log('- Node Modules bundled');
});

// JS Minifier
gulp.task('minjs', function(){
	gulp.src('./assets/scripts/bundle.js')
		.pipe(uglify())
		.on('error', errorMessage)
		.pipe(gulp.dest('./assets/scripts/min'))
		.pipe(server);
	console.log('- JS minified');
});

// Watch Scripts
gulp.task('watchscripts', function(){
	gulp.watch('./assets/scripts/*.js', ['scripts']);
});

// Styles
gulp.task('styles', ['sass', 'watchstyles'], function(){
	console.log('Styles complete.');
});

// Sass Compiler
gulp.task('sass', function(){
	gulp.src('./assets/styles/*.scss')
		.pipe(sass())
		.on('error', errorMessage)
		.pipe(gulp.dest('./assets/styles/css'))
		.pipe(server);
	console.log('- Sass compiled');	
});

// Watch Styles
gulp.task('watchstyles', function(){
	gulp.watch('assets/styles/*.scss', ['styles']);
});

// Images
gulp.task('images', ['compress'], function(){
	console.log('Images complete.');
});

// Image compress
gulp.task('compress', function(){
	gulp.src(['./assets/images/*', '!./assets/images/thumbnails'])
		.pipe(imagemin())
		.on('error', errorMessage)
		.pipe(gulp.dest('./assets/images/thumbnails'));
	console.log('- Images compressed');
});

// Watch Images
gulp.task('watchimages', function(){
	gulp.watch(['./assets/images/*', '!./assets/images/thumbnails'], ['images']);
});