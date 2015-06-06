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
				include: ["lib/almond", "app"],
				name: "app",
				out: "Dist/scripts.min.js"
		    }
		  }
		},
		cssmin: {
			min: {
				options: {
					"report":"gzip"
				},
				files:{
					"Dist/styles.min.css": ["Styles/app.css"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.registerTask("default", ['jshint', 'requirejs', 'cssmin']);
};