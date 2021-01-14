angular.module('app')
    .controller('contentController', function ($scope,$sce,$uibModal,$anchorScroll,$location,$localStorage,$stateParams, $rootScope,$state,Content) {

        $scope.movil = false;
        $scope.searchString = $localStorage.searchString!=undefined?$localStorage.searchString:undefined;
        $scope.content= [];
        $scope.current = {};
        $scope.isbn = "ISBN 978-959-237-740-0";
        $rootScope.footer  = true;

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
        {
            $scope.movil = true;
        }


        var criteria;
        /**
         * Selecciona un item para mostrar
         * @param item
         * @constructor
         */
        $scope.Read = function (item)
        {
            $scope.current = item;
            $scope.searchString = undefined;
            $scope.criteria = "";

        }
        ;

        $scope.setCredit = function (current) {

            $scope.credit = current;

        }
        ;

        $scope.Actualizar = function (item) {
            SetURI(item.url);
        };

        $scope.setURL = function (url) {
            SetURI(url);
        };

        function SetURI(uri) {
            $scope.current = uri;
        }

        /**
         * Componente de busqueda
         * @param $event
         * @param searchString
         * @param size
         */
        $scope.searchComponent = function ($event,searchString,size)
        {

            if ($event.which == 13)
            {

                criteria = searchString.replace(/<\/?[^>]+(>|$)/g, "");

                if (criteria.length>=3)
                {
                    $scope.searchString = searchString;
                    $localStorage.searchString = searchString;
                    $scope.busqueda = true;
                    $scope.error = false;
                    $state.go('buscar');

                }
                else 
                {
                    $scope.criteria = 'Al menos tres caracteres.';
                    document.getElementById('search').value='Al menos tres caracteres.'
                    
                }

               


            }
            else
            {
                $scope.busqueda = false;
                $scope.error = false;
                $scope.searchString = undefined;
                $localStorage.searchString =undefined;
                //if (searchString) {$state.go('home');};
            }
        }
        ;


        /**
         * Inicializa los datos
         */
        function init()
        {
            $localStorage.state = 'content';
            Content.get().then(function (response) {
                $scope.content = response.data.data;

                var hash;
                if ($localStorage.hash) {
                    hash = $localStorage.hash;
                }
                else{
                    hash = $location.hash();
                }

                $scope.current = _($scope.content).find(function (puntero) {
                   return puntero.url==hash;
                });

            });

            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|KFAPWI)/)){
                $scope.isbn = "ISBN 978-959-237-698-6";
            }
                    }

        function Subir() {
            var article = document.getElementById('article');
            article.scrollIntoView(false);
            article.scrollTop = 0;
        }

        init();

    })
;