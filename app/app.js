(function(){
	'use strict';
	var module = angular.module('design', ['ui.router','ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial']).config(routeConfig);
	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider){
		$stateProvider
		.state('home', {
			url: '',
			templateUrl: '/templates/home.html',
			controller: 'MainController',
			controllerAs: 'vm'
		});
	}

	angular.element(document).ready(function(){
		angular.bootstrap(document,['design']);
	});

}())