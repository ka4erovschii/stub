module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [
                    {
                        src: './dist'
                    }
                ]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            javascript: {
                files: [
                    './app/**/*.js'
                ],
                tasks: ['jshint']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true
            },
            all: [
                './app/**/*.js'
            ]
        },

        useminPrepare: {
            html: [
                './index.html',
                './app/**/*.html'
            ],
            options: {
                dest: './dist/'
            }
        },

        uglify: {
            options: {
                compress: false
            }
        },

        usemin: {
            html: [
                './dist/index.html',
                './dist/**/*.html'
            ],
            css: [
                './dist/css/*.css'
            ],
            options: {
                dirs: ['./dist/']
            }
        },

        copy: {
            res: {
                files: [
                    {
                        expand: true,
                        cwd: './',
                        dest: './dist',
                        src: [
                            'images/**',
                            'index.html',
                            'app/**/*.html'
                        ]
                    },
                    {
                        expand: true,
                        cwd: './bower_components/bootstrap/dist/fonts',
                        dest: './dist/fonts',
                        src: [
                            '*'
                        ]
                    }
                ]
            }
        },

        connect: {
            server: {
                options: {
                    protocol: 'http',
                    port: 9000,
                    base: './'
                }
            }
        },

        war: {
            target: {
                options: {
                    war_dist_folder: '.',
                    war_verbose: true,
                    war_name: 'stub-client',
                    webxml_welcome: 'index.html',
                    webxml_display_name: 'Stub Projects'
                },
                files: [
                    {
                        expand: true,
                        cwd: './dist/',
                        src: ['**']
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-war');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('server', ['connect:server:keepalive']);
    grunt.registerTask('prepare', ['clean:dist', 'useminPrepare', 'copy:res', 'concat', 'uglify', 'cssmin', 'usemin']);
    grunt.registerTask('dist', ['prepare', 'war']);
};
