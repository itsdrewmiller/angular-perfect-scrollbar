module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	
	var globalConfig = {
		build: 'dist',
		src: 'src',
	};

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		global: globalConfig,
		
		clean: {
			options: { force: true },
			dist: {
				src: [
					'<%= global.build %>/**/*.*',
					'<%= global.build %>/*'
				]
			}
		},
		
		uglify: {
			js: {
				files: [{
					expand: true,
					cwd: '<%= global.src %>',
					src: ['**/*.js'],
					dest: '<%= global.build %>',
					ext: '.min.js'
				}]
			}
		},
		
		jshint: {
		  allFiles: ['gruntfile.js', '<%= global.src %>/**/*.js']
		}
	});

	grunt.registerTask('default', ['jshint']);
	
	grunt.registerTask('build', [
		'clean',
		'uglify'
	]);

};