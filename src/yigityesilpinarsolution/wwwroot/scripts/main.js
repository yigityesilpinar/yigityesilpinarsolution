require.config({
    baseUrl: 'scripts/',
    paths: {
        jquery: 'jquery/dist/jquery.min',
        bootstrapSwitch: 'bootstrap-switch.min',
        bootstrap: 'bootstrap/dist/js/bootstrap.min.js',
        datetimepicker: 'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        moment: 'moment/moment',
        underscore: 'underscore/underscore-min',
        canvas: 'canvasjs.min',
        graphWithDate: 'graphWithDate',
        app: 'app',
        viewModel: 'viewModel',
        toastr: 'toastr/toastr.min',
        validator: 'validator',
        accounting:'accounting'
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
        'canvas': {
            deps: ['jquery'],
            exports: '$'
        },
        'graphWithDate': {
            deps: ['jquery'],
            exports: '$'
        },
        'app': {
            deps: ['jquery', 'bootstrapSwitch', 'datetimepicker'],
            exports: '$'
        },
        'viewModel': {
            deps: ['jquery', 'canvas'],
            exports: '$'
        }
        ,
        'toastr': {
            deps: ['jquery'],
            exports: '$'
        },
        'validator': {
            deps: ['jquery','toastr'],
            exports: '$'
        }

    }
});


require(["app", "viewModel"], function (app, viewModel) {


})

