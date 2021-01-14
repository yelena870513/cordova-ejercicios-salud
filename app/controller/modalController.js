angular.module('app')
    .controller('modalController',function ($scope, $uibModalInstance,searchString,items)
    {
           $scope.items = items;
           $scope.searchString = searchString;


        $scope.setItem=function (item) {

            Finish({item:item,searchString:searchString});
        }
        ;

        $scope.Close= function () {
            Close();
        }
        ;

        $scope.ExitApp = function()
        {
            //Preguntar primero desde que dispositivo se navega
            if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
            {
                try
                {
                    var gui = require('nw.gui');
                    var win = gui.Window.get();
                    win.close(true);
                }
                catch (reason){
                    window.close();

                }

            }
            else
            {
                window.close();
                window.plugins.appMinimize.minimize();


            }

        };

        function Close() {
            $uibModalInstance.dismiss('cancel');
        }

        function Finish(data) {
            $uibModalInstance.close(data == undefined ? 'close' : data);
        }
    })
;