/// <reference path=".js" />
    require.config({
        baseUrl: 'scripts/',
        paths:{
            jquery: 'jquery/dist/jquery.min',
            bootstrapSwitch: 'bootstrap-switch.min',
            bootstrap: 'bootstrap/dist/js/bootstrap.min.js',
            datetimepicker: 'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
            moment: 'moment/moment',
            underscore: 'underscore/underscore-min',
            app: 'app'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'bootstrap': {
                deps: ['jquery'],
                exports: '$'
            },
            'datetimepicker': {
                deps: ['jquery'],
                exports: '$'
            },
            'bootstrapSwitch': {
                deps: ['jquery'],
                exports: '$'
            },
            'moment': {
                deps: ['jquery'],
                exports: '$'
            },
            'underscore': {
                exports: '_'
            },
        }
    });


    require(["app"], function (app) {

       
    })

 