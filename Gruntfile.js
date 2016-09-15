'use strict';


module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Project settings
        config: {
            // configurable paths
            app: 'app',
            styles: 'css',
            images: 'img',
            scripts: 'js',
            temp: '.tmp',
            dist: 'www'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            scripts: {
                files: ['<%= config.app %>/<%= config.scripts %>/{,*/}*.js'],
                tasks: ['jshint']
            }
        },

        browserSync: {
            options: {
                notify: false,
                background: true,
                watchOptions: {
                    ignored: ''
                }
            },
            livereload: {
                options: {
                    files: [
                        '<%= config.app %>/{,*/}*.html',
                        '<%= config.app %>/{,*/}*.css',
                        '<%= config.app %>/img/{,*/}*',
                        '<%= config.app %>/js/{,*/}*.js'
                    ],
                    port: 9006,
                    server: {
                        baseDir: ['<%= config.app %>'],
                        routes: {
                            '/bower_components': './bower_components',
                            '/src': './src'
                        }
                    }
                }
            },
            release: {
                options: {
                    background: false,
                    port: 9008,
                    server: {
                        baseDir: ['<%= config.dist %>']
                    }
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= config.app %>/<%= config.scripts %>/**/*.js'
            ]
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.temp %>',
                        '<%= config.dist %>/*'
                    ]
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            rstyles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.temp %>',
                src: [
                    '<%= config.styles %>/*'
                ]
            },
            release: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '<%= config.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '*.html'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/ionic/release',
                    src: 'fonts/*',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            options: {
                devDependencies: true
            },
            app: {
                src: ['<%= config.app %>/index.html'],
                //exclude: ['bootstrap.js'],
                ignorePath: /^(\.\.\/)*\.\./
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/js/{,*/}*.js',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/img/{,*/}*.*',
                    '<%= config.dist %>/css/fonts/{,*/}*.*',
                    '<%= config.dist %>/*.{ico,png}'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/img',
                    '<%= config.dist %>/css'
                ],
                patterns: {
                    js: [
                        [/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
                    ]
                }
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css'],
            js: ['<%= config.dist %>/js/{,*/}*.js'],
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.images %>/',
                    src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
                    dest: '<%= config.temp %>/img/'
                }]
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: 'WorkStationTV',
                    //htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'js/scripts.js'
                },
                cwd: '<%= config.app %>',
                src: 'tpls/{,*/}*.html',
                dest: '.tmp/templateCache.js'
            }
        }
    });

    grunt.registerTask('release', [
        'clean',
        'wiredep', 
        'useminPrepare',
        'jshint',
        'copy:rstyles',
        'ngtemplates',
        'concat',
        'cssmin',
        'uglify',
        //'imagemin',
        'copy:release',
        //'filerev',
        'usemin'
    ]);

    grunt.registerTask('serve', 'start the server and preview your app', function (target) {
        if (target === 'release') {
            return grunt.task.run(['release', 'browserSync:release']);
        }

        grunt.task.run([
            'clean',
            'wiredep',
            'jshint',
            'browserSync:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['serve']);
};
