angular.module('app')
    .controller('galleryController', function ($scope, $location, $sce,$state, $stateParams, $localStorage, $rootScope, Gallery, Videos, Flash ) {

        $scope.movil = false;
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|KFAPWI)/))
        {
            $scope.movil = true;
        }
        $scope.carousel={};
        $scope.content=[];
        $scope.videos=[];
        $scope.flashes=[];
        $rootScope.footer = false;
        $scope.menuGallery=[
        {
            title:'Anatomía y fisiología en la pareja',
            filter:'.anatomia'
        },
        {
            title:'La infertilidad. ¿De ella o de él?',
            filter:'.parte2'
            },
        {
            title:'Mitos, realidades y curiosidades sobre la infertilidad',
            filter:'.mitos'
            },
        {
            title:'Videos',
            filter:'.videos'
        }


        ];

        $scope.videoGallery=[
            {
                title:'Tobillo',
                filter:'.tobillo'
            },
            {
                title:'Rodilla',
                filter:'.rodilla'
            }


        ];
        $scope.menuVideo=[
            {
                title:'Anatomía y movimiento',
                img: '1.png',
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

        $scope.chooseVideo = '.tobillo';


        /**
        * Actualizar el paginador 
        */
        $scope.Update=function(paginator){
            $scope.carousel.index = paginator-1;
        };

         /**
         *Actualiza el filtro segun la seccion a actualizar
         **/
        $scope.UpdateFilter=function (filter) {
            if(filter=='.anatomia')
            {
                $state.go('flash',{'#':filter},{reload:true}); 
            }
            else
            {
              $scope.chooseVideo = filter;    
            }
            
        };


         /**
         *Regresa a la seccion de los videos
         **/
        $scope.switchTo = function(path){
            if(path!='.anatomia'){
                $state.go('videos',{'#':path});
            }
        };

        /*Custom slide configuration*/
        $scope.customize = {};





        /**
         * Inicializa los datos
         */
        function init()
        {
            $scope.carousel.index = 0;
            $scope.carousel.locked = true;
            $localStorage.state = 'gallery';

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
            Flash.get().then(function (response) {
                $scope.flashes = response.data.data;
                $scope.flashes = $scope.flashes.map(function (v) {
                    v.url = "assets/swf/"+$sce.trustAsResourceUrl(v.url);
                    return v;
                })
                ;
                $scope.chooseVideo = $location.hash();


            });

            /*Slide Configuration*/
            $scope.customize = {

                sliderid:1,

                jsfolder:jsFolder,

                width:900,

                height:360,

                skinsfoldername:"",

                loadimageondemand:false,

                videohidecontrols:false,

                fullwidth:false,

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

                randomplay:false,

                scalemode:"fill",

                loop:0,

                autoplay:false,

                navplayvideoimage:"play-32-32-0.png",

                navpreviewheight:60,

                timerheight:2,

                descriptioncssresponsive:"font-size:12px; ",

                shownumbering:false,

                navthumbresponsivemode:"samesize",

                skin:"Events",

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

                navwidth:120,

                navheight:60,

                arrowimage:"arrows-32-32-0.png",

                timeropacity:0.6,

                titlecssresponsive:"font-size:12px;",

                navthumbnavigationarrowimage:"carouselarrows-32-32-0.png",

                navshowplaypausestandalone:true,

                texteffect1:"slide",

                navpreviewbordercolor:"#199EB8",

                texteffect2:"slide",

                customcss:"",

                ribbonposition:"topleft",

                navthumbdescriptioncss:"display:block;position:relative;padding:2px 4px;text-align:left;font:normal 12px Arial,Helvetica,sans-serif;color:#333;",

                lightboxtitlebottomcss:"{color:#333; font-size:14px; font-family:Armata,sans-serif,Arial; overflow:hidden; text-align:left;}",

                arrowstyle:"mouseover",

                navthumbmediumsize:800,

                navthumbtitleheight:18,

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

                navshowplaypausestandaloneheight:48,

                navdirection:"horizontal",

                navbuttonshowbgimage:true,

                navbuttonbgimage:"navbuttonbgimage-28-28-0.png",

                textbgcss:"display:none;",

                playvideoimagewidth:64,

                buttoncss:"display:block; position:relative; margin-top:8px;",

                navborder:2,

                navshowpreviewontouch:false,

                bottomshadowimagewidth:96,

                showtimer:true,

                navmultirows:false,

                navshowpreview:false,

                navmarginy:16,

                navmarginx:16,

                navfeaturedarrowimage:"featuredarrow-16-8-0.png",

                texteffectslidedirection1:"right",

                showribbon:false,

                navstyle:"thumbnails",

                textpositionmarginleft:24,

                descriptioncss:"display:block; position:relative; font:15px \"Lucida Sans Unicode\",\"Lucida Grande\",sans-serif,Arial;  margin-top:8px; color:#fff; background-color: #333; opacity: 0.8;",

                navplaypauseimage:"navplaypause-48-48-0.png",

                backgroundimagetop:-10,

                timercolor:"#199EB8",

                numberingformat:"%NUM/%TOTAL ",

                navthumbmediumwidth:64,

                navfontsize:12,

                navhighlightcolor:"#333333",

                texteffectdelay1:1000,

                navimage:"bullet-24-24-5.png",

                texteffectdelay2:1500,

                texteffectduration1:600,

                navshowplaypausestandaloneautohide:true,

                texteffectduration2:600,

                navbuttoncolor:"",

                navshowarrow:false,

                texteffectslidedirection:"left",

                navshowfeaturedarrow:true,

                lightboxbarheight:64,

                showfacebook:true,

                titlecss:"display:block; position:relative; font: 14px \"Lucida Sans Unicode\",\"Lucida Grande\",sans-serif,Arial; color: transparent; ",

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

                navshowplaypausestandalonewidth:48,

                showsocial:false,

                navthumbresponsive:false,

                navfeaturedarrowimageheight:8,

                navopacity:0.8,

                textpositionmarginright:24,

                backgroundimagewidth:120,

                bordercolor:"#ffffff",

                border:6,

                navthumbtitlewidth:120,

                navpreviewposition:"top",

                texteffectseparate:false,

                arrowheight:32,

                arrowmargin:8,

                texteffectduration:600,

                bottomshadowimage:"bottomshadow-110-95-4.png",

                lightboxshowfacebook:true,

                lightboxshowdescription:false,

                timerposition:"bottom",

                navfontcolor:"#333333",

                navthumbnavigationstyle:"arrow",

                borderradius:0,

                navbuttonhighlightcolor:"",

                textpositionstatic:"bottom",

                texteffecteasing2:"easeOutCubic",

                navthumbstyle:"imageandtitle",

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

                textformat:"Bottom left",

                texteffectslidedirection2:"right",

                bottomshadowimagetop:98,

                textpositiondynamic:"bottomleft",

                shadowsize:5,

                navthumbtitlecss:"display:block;position:relative;padding:2px 4px;text-align:center;font:bold 12px Arial,Helvetica,sans-serif;color:#333;",

                textpositionmarginbottom:24,

                lightboxshowtitle:true,

                socialmode:"mouseover",

                blinds: {

                    // duration:2000,
                    //
                    // easing:"easeOutCubic",
                    //
                    // checked:true,
                    //
                    // effectdirection:0,
                    //
                    // slicecount:3

                },

                threed: {

                    checked:true,

                    effectdirection:0,

                    bgcolor:"#222222",

                    perspective:1000,

                    slicecount:5,

                    duration:1500,

                    easing:"easeOutCubic",

                    fallback:"slice",

                    scatter:5,

                    perspectiveorigin:"right"

                },

                transition:"blinds,threed",

                scalemode:"fill",

                isfullscreen:false,

                textformat: {



                }

            };

        }

        init();


    })
;