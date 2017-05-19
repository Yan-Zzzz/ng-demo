'use strict';
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        //$stateProvider ：配置路由
        $stateProvider.state('home',{
            url: '/home',
            templateUrl: 'view/main.html',
            controller: 'mainCtrl'
        });
        //如果都没有匹配到就走默认
         $urlRouterProvider.otherwise('/home')
       //$urlRouterProvider.when('/', '/main')
    }])