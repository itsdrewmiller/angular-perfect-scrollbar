module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        // includes
        'Gruntfile.js',
        'src/**/*.js',
        // ignores
        '!src/**/*.min.js']
    },
    uglify: {
      all: {
        options: {
          mangle: false
        },
        files: {
          'src/angular-perfect-scrollbar.min.js': ['src/angular-perfect-scrollbar.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify']);
};
