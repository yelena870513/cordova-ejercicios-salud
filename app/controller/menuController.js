angular.module('app')
    .controller('menuController', function ($scope, $location,$uibModal , $localStorage, $state, $stateParams, $window, $sce,$timeout, Content, Videos, Flash) {
        var criteria;
        $scope.movil = false;
        $scope.busqueda = false;
        $scope.searchString = false;
        $localStorage.searchString =undefined;
        $scope.state = 'home';
        $scope.footer  = true;
        $scope.criteria = "";
        $scope.videos=[];
        $scope.flashes=[];
        $scope.chooseVideo = undefined;
        $scope.assets = undefined;

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|KFAPWI )/)) {
            $scope.movil = true;
            $scope.assets = "file:///android_asset/www/";
        }
        $scope.menuVideo=[
            {
                title:'Anatomía y movimiento',
                img: '1.jpg',
                filter:'.anatomia'

            },
            {
                title:'Ejercicios para los tobillos',
                img: '4.6.jpg',
                filter:'.tobillo'
            },
            {
                title:'Ejercicios para las rodillas',
                img: '4.3.jpg',
                filter:'.rodilla'
            }

        ];


        // alert($scope.movil)
        $scope.content= [];
        $scope.current = "home";
        $scope.menu = [
            {
                title:'Inicio',
                url: 'home'
            },
            {
                title:'Ejercicios',
                url: 'content'
            },
            {
                title:'Galería',
                url: 'gallery'
            },
            {
                title:'Autores',
                url: 'author'
            },
            {
                title:'Créditos',
                url: 'credits'
            }


        ]
        ;

        /*Custom slide configuration*/
        $scope.customize = {};


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
                    document.getElementById('search').value='Al menos tres caracteres.';
                    // $timeout(function () {
                    //     document.getElementById('search').value='';
                    // },200)
                    
                }

               


            }
            else
            {
                $scope.busqueda = false;
                $scope.error = false;
                $scope.searchString = undefined;
                $localStorage.searchString =undefined;
                if (searchString) {$state.go('home');};
            }
        }
        ;


        /**
         * Establece el item seleccionado
         * @param item
         * @param searchString
         */
        $scope.goItemPage=function(item,searchString){

            $scope.busqueda = false;
            $scope.searchString = searchString;
            $localStorage.searchString =searchString;
            $localStorage.hash =item.url;
            $state.go('content',{},{reload:true});
            // $state.transitionTo('yourState', params, {notify: false});
            // $location.path('/content');
            //$location.hash(item.url);

        };

        $scope.ClearSearch = function(esconder){
            $scope.searchString = false;
            $localStorage.searchString =undefined;
            $localStorage.hash =undefined;
            $scope.busqueda = false;
            $scope.footer = true;
            $scope.esconder = esconder;
            $scope.criteria = "";
            $scope.chooseVideo = '.anatomia';
            return true;

            
        };

        $scope.ClearSearchExit = function(esconder){
            $scope.ClearSearch(esconder);
            $scope.footer = false;
            $state.go('salir');


        }

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
         *Actualiza el filtro segun la seccion a actualizar
         **/
        $scope.UpdateFilter=function (filter) {
            $scope.chooseVideo = filter;

        };


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

        $scope.GoBack = function () {
            $window.history.back();
        };

        $scope.Exit = function () {
            $scope.footer = false;
            //$state.go('salir',{},{reload:false});
        };

        /**
         * Inicializa los datos
         */
        function init()
        {
            // $localStorage.state = 'home';
            Content.get().then(function (response) {
                $scope.content = response.data.data;
                $scope.current = $scope.content[0];
            });

            Videos.get().then(function (response)
            {
                $scope.videos = response.data.data;
                $scope.videos = $scope.videos.map(function (v) {
                    if (!$scope.movil)
                    {

                        v.url = "assets/webm/"+$sce.trustAsResourceUrl(v.url);
                    }
                    else{
                        v.url = $scope.assets+ "assets/webm/"+$sce.trustAsResourceUrl(v.url);

                    }
                    return v;
                });
                $scope.chooseVideo = '.anatomia';




            });
            ;

            $scope.customize = {
                sliderid:1,

                jsfolder:jsFolder,

                width:900,

                height:360,

                skinsfoldername:"",

                loadimageondemand:false,

                videohidecontrols:false,

                donotresize:false,

                enabletouchswipe:true,

                fullscreen:false,

                autoplayvideo:false,

                addmargin:true,

                transitiononfirstslide:false,

                forceflash:false,

                isresponsive:true,

                forceflashonie11:true,

                forceflashonie10:true,

                pauseonmouseover:false,

                playvideoonclickthumb:true,

                slideinterval:5000,

                fullwidth:true,

                randomplay:false,

                scalemode:"fill",

                loop:0,

                autoplay:true,

                navplayvideoimage:"play-32-32-0.png",

                navpreviewheight:60,

                timerheight:2,

                descriptioncssresponsive:"font-size:12px;",

                shownumbering:false,

                navthumbresponsivemode:"samesize",

                skin:"Classic",

                textautohide:true,

                lightboxshowtwitter:true,

                addgooglefonts:false,

                navshowplaypause:true,

                initsocial:false,

                navshowplayvideo:true,

                navshowplaypausestandalonemarginx:8,

                navshowplaypausestandalonemarginy:8,

                navbuttonradius:0,

                navthumbcolumn:5,

                navthumbnavigationarrowimageheight:32,

                navradius:0,

                navthumbsmallcolumn:3,

                lightboxshownavigation:false,

                showshadow:false,

                navfeaturedarrowimagewidth:16,

                lightboxshowsocial:false,

                navpreviewwidth:120,

                googlefonts:"",

                navborderhighlightcolor:"",

                navcolor:"#999999",

                lightboxdescriptionbottomcss:"{color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}",

                lightboxthumbwidth:80,

                navthumbnavigationarrowimagewidth:32,

                navthumbtitlehovercss:"text-decoration:underline;",

                navthumbmediumheight:64,

                texteffectresponsivesize:600,

                arrowwidth:32,

                texteffecteasing:"easeOutCubic",

                texteffect:"slide",

                lightboxthumbheight:60,

                navspacing:8,

                navarrowimage:"navarrows-28-28-0.png",

                ribbonimage:"ribbon_topleft-0.png",

                navwidth:16,

                navheight:16,

                arrowimage:"arrows-32-32-0.png",

                timeropacity:0.6,

                titlecssresponsive:"font-size:12px;",

                navthumbnavigationarrowimage:"carouselarrows-32-32-4.png",

                navshowplaypausestandalone:false,

                texteffect1:"slide",

                navpreviewbordercolor:"#fff",

                texteffect2:"slide",

                customcss:"",

                ribbonposition:"topleft",

                navthumbdescriptioncss:"display:block;position:relative;padding:2px 4px;text-align:left;font:normal 12px Arial,Helvetica,sans-serif;color:#333;",

                lightboxtitlebottomcss:"{color:#333; font-size:14px; font-family:Armata,sans-serif,Arial; overflow:hidden; text-align:left;}",

                arrowstyle:"mouseover",

                navthumbmediumsize:800,

                navthumbtitleheight:20,

                navpreviewarrowheight:8,

                textpositionmargintop:24,

                navshowbuttons:false,

                buttoncssresponsive:"",

                texteffectdelay:500,

                navswitchonmouseover:false,

                playvideoimage:"playvideo-64-64-0.png",

                arrowtop:50,

                textstyle:"static",

                playvideoimageheight:64,

                navfonthighlightcolor:"#666666",

                showbackgroundimage:false,

                showpinterest:true,

                navpreviewborder:4,

                navshowplaypausestandaloneheight:28,

                navdirection:"horizontal",

                navbuttonshowbgimage:true,

                navbuttonbgimage:"navbuttonbgimage-28-28-0.png",

                textbgcss:"display:block; position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:#333333; opacity:0.6; filter:alpha(opacity=60);",

                playvideoimagewidth:64,

                buttoncss:"display:block; position:relative; margin-top:8px;",

                navborder:4,

                navshowpreviewontouch:false,

                bottomshadowimagewidth:96,

                showtimer:true,

                navmultirows:false,

                navshowpreview:true,

                navmarginy:16,

                navmarginx:16,

                navfeaturedarrowimage:"featuredarrow-16-8-0.png",

                texteffectslidedirection1:"right",

                showribbon:false,

                navstyle:"bullets",

                textpositionmarginleft:24,

                descriptioncss:"display:block; position:relative; font:12px \"Lucida Sans Unicode\",\"Lucida Grande\",sans-serif,Arial; color:#fff; margin-top:8px;",

                navplaypauseimage:"navplaypause-28-28-0.png",

                backgroundimagetop:-10,

                timercolor:"#015cb7",

                numberingformat:"%NUM/%TOTAL ",

                navthumbmediumwidth:64,

                navfontsize:12,

                navhighlightcolor:"#333333",

                texteffectdelay1:1000,

                navimage:"bullet-16-16-0.png",

                texteffectdelay2:1500,

                texteffectduration1:600,

                navshowplaypausestandaloneautohide:false,

                texteffectduration2:600,

                navbuttoncolor:"#999999",

                navshowarrow:true,

                texteffectslidedirection:"left",

                navshowfeaturedarrow:false,

                lightboxbarheight:64,

                showfacebook:true,

                titlecss:"display:block; position:relative; font:bold 14px \"Lucida Sans Unicode\",\"Lucida Grande\",sans-serif,Arial; color:#fff;",

                ribbonimagey:0,

                ribbonimagex:0,

                texteffectresponsive:true,

                navthumbsmallheight:48,

                texteffectslidedistance1:120,

                texteffectslidedistance2:120,

                navrowspacing:8,

                navshowplaypausestandaloneposition:"bottomright",

                lightboxshowpinterest:true,

                lightboxthumbbottommargin:8,

                lightboxthumbtopmargin:12,

                arrowhideonmouseleave:1000,

                navshowplaypausestandalonewidth:28,

                showsocial:false,

                navthumbresponsive:false,

                navfeaturedarrowimageheight:8,

                navopacity:0.8,

                textpositionmarginright:24,

                backgroundimagewidth:120,

                bordercolor:"#199eb8",

                border:0,

                navthumbtitlewidth:120,

                navpreviewposition:"top",

                texteffectseparate:false,

                arrowheight:32,

                arrowmargin:8,

                texteffectduration:600,

                bottomshadowimage:"bottomshadow-110-100-5.png",

                lightboxshowfacebook:true,

                lightboxshowdescription:false,

                timerposition:"bottom",

                navfontcolor:"#333333",

                navthumbnavigationstyle:"arrow",

                borderradius:0,

                navbuttonhighlightcolor:"#333333",

                textpositionstatic:"bottom",

                texteffecteasing2:"easeOutCubic",

                navthumbstyle:"imageonly",

                texteffecteasing1:"easeOutCubic",

                textcss:"display:block; padding:12px; text-align:left;",

                navthumbsmallwidth:48,

                navbordercolor:"#ffffff",

                navthumbmediumcolumn:4,

                navpreviewarrowimage:"previewarrow-16-8-0.png",

                showbottomshadow:true,

                texteffectslidedistance:30,

                shadowcolor:"#aaaaaa",

                showtwitter:true,

                textpositionmarginstatic:0,

                backgroundimage:"",

                navposition:"bottom",

                navthumbsmallsize:480,

                navpreviewarrowwidth:16,

                textformat:"Bottom bar",

                texteffectslidedirection2:"right",

                bottomshadowimagetop:95,

                textpositiondynamic:"bottomleft",

                shadowsize:5,

                navthumbtitlecss:"display:block;position:relative;padding:2px 4px;text-align:left;font:bold 14px Arial,Helvetica,sans-serif;color:#333;",

                textpositionmarginbottom:24,

                lightboxshowtitle:true,

                socialmode:"mouseover",

                slide: {

                    duration:1000,

                    easing:"easeOutCubic",

                    checked:true,

                    effectdirection:0

                },

                transition:"slide",

                scalemode:"fill",

                isfullscreen:false,

                textformat: {



                }

            }
            $scope.footer  = true;
        }

        init();


    })
.controller('menuSearchController',function($scope, $location,$uibModal , $localStorage, $state, $stateParams, $window,$sce,Videos,Content){
     $scope.searchString = false;
     $scope.content = [];

      /**
         * Establece el item seleccionado
         * @param item
         * @param searchString
         */
        $scope.goItemPage=function(item,searchString){

            $scope.busqueda = false;
            $scope.searchString = searchString;
            $localStorage.searchString =searchString;
            $localStorage.hash =item.url;
            $state.go('content',{},{reload:true});


        };


     function init () 
     {
          Content.get().then(function (response) {
                $scope.content = response.data.data;
                $scope.current = $scope.content[0];
                $scope.searchString = $localStorage.searchString!=undefined?$localStorage.searchString:undefined;
            });

         Videos.get().then(function (response)
         {
             $scope.videos = response.data.data;
             $scope.videos = $scope.videos.map(function (v) {
                 if (!$scope.movil)
                 {

                     v.url = "assets/webm/"+$sce.trustAsResourceUrl(v.url);
                 }
                 else{
                     v.url = $scope.assets+ "assets/webm/"+$sce.trustAsResourceUrl(v.url);

                 }
                 return v;
             });

             $scope.chooseVideo = $location.hash();
             console.log( $scope.chooseVideo);


         });


     }

     init();
})
;