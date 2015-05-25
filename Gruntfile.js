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
		},
		requirejs: {
		  compile: {
		    options: {
			baseUrl: "Scripts/",
			mainConfigFile: "Scripts/app.js",
			name: "app",
			out: "Dist/scripts.js"
		    }
		  }
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-requirejs");

	grunt.registerTask("default", ['jshint']);
};