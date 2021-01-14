angular.module('app').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home',
            {
            url: "/home",
            templateUrl: "app/templates/home.html"

        })
        /*========================
         ABOUT
         ========================*/

        .state('about', {
            url: "/about",
            templateUrl:'app/templates/about.html',


        })
        /*========================
         CONTENIDO
         ========================*/

        .state('content', {
            url: "/content",
            templateUrl:'app/templates/content.html',
            controller:'contentController'

        })
        /*========================
         GALERY
         ========================*/

        .state('gallery', {
            url: "/gallery",
            templateUrl:'app/templates/gallery.html',
            controller:'galleryController'

        })
        /*========================
         Videos
         ========================*/

        .state('videos', {
            url: "/videos",
            templateUrl:'app/templates/videos.html',
            controller:'galleryController'

        })
        /*========================
         Flash
         ========================*/

        .state('flash', {
            url: "/flash",
            templateUrl:'app/templates/flash.html',
            controller:'galleryController'

        })
        /*========================
         AUTORES
         ========================*/

        .state('author', {
            url: "/author",
            templateUrl:'app/templates/author.html',
            controller:'contentController'

        })
        /*========================
         CREDITOS
         ========================*/
        .state('credits', {
            url: "/credits",
            templateUrl:'app/templates/credits.html',
            controller:'contentController'

        })
        /*========================
         FORMULARIO
         ========================*/

        .state('form', {
            url: "/form",
            templateUrl:'app/templates/formulario.html',
            controller:'contentController'

        })
        /*========================
         CREDITOS
         ========================*/
        .state('salir', {
            url: "/salir",
            templateUrl:'app/templates/salir.html',
            controller:'menuController'

        })

          /*========================
         Busqueda
         ========================*/
        .state('buscar', {
            url: "/buscar",
            templateUrl:'app/templates/results.html',
            controller:'menuSearchController'

        })
;


})
;