// Grunt build script for Framework
// Methods.
//
// Grunt
//   builds a local copy for debugging int FOLDER_BUILD_ROOT
// 
// Grunt dist
//   Builds a distributable copy (uglified etc) into FOLDER_DIST_ROOT
//
// Grunt run
//   Launches a local webserver using the FOLDER_BUILD_ROOT as root of the server

module.exports = function(grunt) {
	// Build Output Folder
	var FOLDER_BUILD_ROOT = 'build/';
	
	// Distribution output folder (includes dist tasks)
	var FOLDER_DIST_ROOT = 'dist/';
	
	// Assets Folder
	var FOLDER_ASSETS_ROOT = 'assets/';

	// Calculate build folders
	var FOLDER_BUILD_GAME = FOLDER_BUILD_ROOT + 'game/';
	var FOLDER_DIST_GAME = FOLDER_DIST_ROOT + 'game/';
	var FOLDER_DIST_REPORT_FILE = FOLDER_DIST_ROOT + 'reports.txt'
	
	// Phaser Lib
	var FOLDER_LIBS_ROOT  = 'libs/';
	var FOLDER_LIBS_PHASER = FOLDER_LIBS_ROOT + 'phaser.io/';
	
	// Console Lib Location
	var CONSOLE_LIB_ROOT = '../';
	var FOLDER_LIBS_CONSOLE = CONSOLE_LIB_ROOT + 'minified/';
		
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                force: true,
                src: [ FOLDER_BUILD_ROOT, FOLDER_DIST_ROOT ]
            }
        },	
        copy: {
            build: {
                files: [ {
                        cwd: (FOLDER_LIBS_PHASER + 'build/'),
                        src: 'phaser.min.js',           // copy all files and subfolders
                        dest: FOLDER_BUILD_GAME,    // destination folder
                        expand: true,
                        flatten: true
                    }, {
                        cwd: 'src/',
                        src: [ '**.js', '**.html', '**.json', '**.css' ],
                        dest: FOLDER_BUILD_GAME,
                        expand: true,
                        flatten: true
                    }, {
						cwd: FOLDER_LIBS_CONSOLE,
						src: [ 'index.html', 'iconsole.js', 'console-js/**', 'site-console/**'],
						dest: FOLDER_BUILD_ROOT,
						expand: true
					}
                ]
            }, 
            dist: {
                files: [ {
                        cwd: FOLDER_BUILD_GAME,
                        src: [ 'game_details.json', 'levels.json', '**.png', '**.jp*', '**.css' ],
                        dest: FOLDER_DIST_GAME,
                        expand: true,
                        flatten: true
                    }, {
						cwd: FOLDER_BUILD_ROOT,
						src: [ 'index.html', 'iconsole.js', 'console-js/**', 'site-console/**'],
						dest: FOLDER_DIST_ROOT,
						expand: true
					}
                ]
            }
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: (FOLDER_BUILD_GAME + '**.js'),
            dest: (FOLDER_DIST_GAME + '<%= pkg.name %>.min.js')
          }
        },
        processhtml: {
            dist: {
				options: {
					process: true
				},
				files: [ {
						expand: true,     
						cwd: FOLDER_BUILD_GAME,   
						src: ['**/*.html'],
						dest: FOLDER_DIST_GAME,  
						ext: '.html'
					}
				]
            }		
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'build',
                    keepalive: true
                }
            }
        },
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true,
				browser: true			
			},
			all: [FOLDER_BUILD_GAME + '**/*.js', '!' + FOLDER_BUILD_GAME + 'phaser.min.js']
		},
		svn: { 
		},
		gitinfo: {
			options: {
				cwd: FOLDER_LIBS_CONSOLE
			}
		},
		reports: {
			dist: {
				file: FOLDER_DIST_REPORT_FILE
			}
		},
		imagemin: {
			assets: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
					cwd: FOLDER_ASSETS_ROOT,
                    src: ['*.jp*', '*.png'],
					dest: FOLDER_BUILD_GAME
                }]
			}
		}
    });

    // Load the Basic tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
	
	// Server task
    grunt.loadNpmTasks('grunt-contrib-connect');
	
	// Reporting Tasks
	grunt.loadNpmTasks('grunt-svn');
	grunt.loadNpmTasks('grunt-gitinfo');
	
	// Reporting task
	grunt.registerMultiTask('reports', function() {
		var oFile = this.data.file;
		var done = this.async();
		var tasks = {'svninfo': 0, 'gitinfo': 0};
		grunt.util.async.forEachSeries(Object.keys(tasks), function(task, next) {
			grunt.util.spawn({
				grunt: true,  // use grunt to spawn
				args: [task], // spawn this task
				opts: { stdio: 'inherit' } // print to the same stdout
			}, function(err, result, code) {
				tasks[task] = code;
				next();
			});
		}, function() {
			// Create output
			var out = "Report:\n";
			if(grunt.config.svninfo) {
				out += "SVN: " + grunt.config.svninfo.rev;
			}
			if(grunt.config.gitinfo) {
				out += "GIT: " + grunt.config.gitinfo.local.branch.current.SHA;
			}
			grunt.file.write(oFile, out);
		});	
	
	});
	
	
	// Default task(s).
    grunt.registerTask('default', ['clean', 'copy:build', 'imagemin:assets', 'jshint']);
      
    // Dist Task, build final distribution (Used by Jenkins)
    grunt.registerTask('dist', ['default', 'uglify', 'copy:dist', 'processhtml', 'reports:dist']);
      
    // Run Server Task
    grunt.registerTask('run', ['connect']);
};