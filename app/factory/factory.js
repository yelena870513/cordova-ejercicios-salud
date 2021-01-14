angular.module('app')
/**
 * Para obtener los datos desde ficheros json
 */
    .factory('Content',function ($http) {
    var service = {};
    service.get=function () {
        return $http.get('json/data.json')
    };

    return service;

})

    .factory('Gallery',function ($http) {
        var service = {};
        service.get=function () {
            return $http.get('json/gallery.json')
        };

        return service;

    })
    .factory('Videos',function ($http) {
        var service = {};
        service.get=function () {
            return $http.get('json/video.json')
        };

        return service;

    })
    .factory('Flash',function ($http) {
        var service = {};
        service.get=function () {
            return $http.get('json/flash.json')
        };

        return service;

    })

;
