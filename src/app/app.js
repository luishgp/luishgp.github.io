'use strict';

var app = angular.module('main', ['ui.router']);    

app.config(function($stateProvider, $urlRouterProvider) { 

    $stateProvider
        .state('main', {
        url: "/main",
        templateUrl: "/app/partials/header.html"
    });

});