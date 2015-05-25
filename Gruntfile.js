'use strict';

module.exports = function (grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
		        force: true,
		        maxerr: 30000,
				"ignores": ['Scripts/lib/**/*.js']
			},
			files: ['Scripts/**/*.js']
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask("default", ['jshint']);

};