/*var gui = require('nw.gui');
 var win = gui.Window.get();
win.showDevTools();*/
var jsFolder = "";
(function () {
    var scripts = document.getElementsByTagName("script");



    for (var i= 0; i< scripts.length; i++)

    {

        if( scripts[i].src && scripts[i].src.match(/initslider-1\.js/i))

            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);

    }
})();
var app = angular.module('app',
    ['ui.router', 'ngStorage', 'angularUtils.directives.dirPagination', 'ui.bootstrap','angular-carousel','angularjs.media.directives','ngAnimate','ngTouch']
    )
        .run(function ($timeout,$location,$localStorage) {


          $('a[target=_blank]').click(function(){
            require('nw.gui').Shell.openExternal(this.href);
            return false;
          });

            //Delegando los enlaces pre
            $(function() {

                var $body = $('body');
                $body.on('click','a[href*="#"]:not([href="#"])',function () {
                    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
                    {
                        if (this.hash.lastIndexOf('/')!=-1) {
                            return;
                        }
                        var target = $(this.hash);
                         var hashed =this.hash;
                        if (hashed=='#/salir') {hashed='#exit';};
                        var target = $(hashed);
                        var afterHash=this.hash;
                        var moving = function (target,context) {
                           try{
                               var $cmd = $("html, body");
                               // $(window).animate({scrollTop:target.offset().top },1000,'easeInOutExpo')
                               //no hacer esto en casa
                               var unde;
                               switch (context){
                                   case undefined:
                                       unde = -550;
                                       break;
                                   case '#home':
                                       unde = -5540;
                                       break;
                                   case '#team':
                                       unde = 250;
                                       break;
                                   default:
                                       unde=-100;
                                       break;
                               }


                               if (target.length>0) {
                                   $cmd.animate({
                                       scrollTop: target.offset().top + 250 + unde
                                   }, 1000, 'easeInOutExpo');

                               }

                               if (context==undefined)
                               {
                                   if ( $(this).parents('.nav-menu').length ) {
                                       $('.nav-menu .menu-active').removeClass('menu-active');
                                       $(this).closest('li').addClass('menu-active');
                                   }

                               }
                               else
                                   {
                                      // window.scrollTo(0,target.offset().top);

                                   var $context = $('a[href*="'+context+'"]');
                                   if ( $context.parents('.nav-menu').length ) {
                                       $('.nav-menu .menu-active').removeClass('menu-active');
                                       $context.closest('li').addClass('menu-active');
                                   }
                               }

                               if ( $('body').hasClass('mobile-nav-active') ) {
                                   $('body').removeClass('mobile-nav-active');
                                   $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                                   $('#mobile-body-overly').fadeOut();
                               }
                               return false;
                           }
                           catch (err){
                               console.warn(err);
                           }
                        };
                        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                        if (target.length) {
                           moving(target);
                        }
                        else{
                            $timeout(function () {
                                target = $(afterHash);
                                moving(target,afterHash);
                            },100)
                            ;
                        }
                    }

                });
                $body.on('click','#mobile-nav-toggle',function () {
                   //Cleaning globals
                    $localStorage.searchString=undefined;
                    $localStorage.hash = undefined;
                    var movil = false;
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|KFAPWI)/))
                    {
                        movil = true;
                    }
                    if (movil) {
                        $('.cbp-filter-item').each(function () {
                            if ($(this).hasClass('cbp-filter-item-active'))
                            {
                                $(this).removeClass('cbp-filter-item-active');
                            }
                            console.log($(this).data('filter'));
                            if ($(this).data('filter')=='.anatomia') {
                                $(this).addClass('cbp-filter-item-active');
                            }
                        });
                        $('.cbp-filter-item-active').trigger('click');
                    }
                    ;
                    //
                })

            });

        })



;