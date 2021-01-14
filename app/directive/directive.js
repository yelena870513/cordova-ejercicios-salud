angular.module('app')

/**
 * Utilizar el flex slide dentro de angular
 */
    .directive('flexslider',function () {
    return {
        restrict: "A",
        link:function (scope, element, attrs, controller, transcludeFn) {
            $(element).flexslider({
                // Primary Controls
                controlNav          : true,              //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                directionNav        : true,              //Boolean: Create navigation for previous/next navigation? (true/false)
                prevText: "",           //String: Set the text for the "previous" directionNav item
                nextText: "",               //String: Set the text for the "next" directionNav item
                // Special properties
                controlsContainer   : "",                //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
                manualControls      : "",                //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
                sync                : "",                //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
                asNavFor            : "",                //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
            });

        }
    }
})

    /**
     * Utilizar el cubeportfolio
     */
    .directive('cubeportfolio',function ($timeout) {
    return {
        restrict: "A",
        link:function (scope, element, attrs, controller, transcludeFn) {
            $timeout(function () {
                var gridContainer=$(element);
                var filtersContainer=$('#'+attrs.filter);
                gridContainer.cubeportfolio({

                    defaultFilter: '.'+attrs.selected,

                    animationType: 'flipOutDelay',

                    gapHorizontal: 60,

                    gapVertical: 60,

                    gridAdjustment: 'responsive',

                    caption: 'overlayBottomReveal',

                    displayType: 'lazyLoading',

                    displayTypeSpeed: 100,

                    // lightbox
                    lightboxDelegate: '.cbp-lightbox',
                    lightboxGallery: true,
                    lightboxTitleSrc: 'data-title',
                    lightboxShowCounter: true

                });
                filtersContainer.on('click', '.cbp-filter-item', function (e) {

                    var me = $(this), wrap;

                    // get cubeportfolio data and check if is still animating (reposition) the items.
                    if ( !$.data(gridContainer[0], 'cubeportfolio').isAnimating ) {

                        if ( filtersContainer.hasClass('cbp-l-filters-dropdown') ) {
                            wrap = $('.cbp-l-filters-dropdownWrap');

                            wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

                            wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

                            me.addClass('cbp-filter-item-active');
                        } else {
                            me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
                        }

                    }

                    // filter the items
                    gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

                });
                gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));
               /* var firstItem = $('.first-item');
                firstItem.trigger('click');*/
               $('.cbp-item').height(196);


            },500);
        }
    }
})

    /**
     * Directiva para ir hacia arriba
     */
    .directive('goUp',function($anchorScroll){
    return {
        restrict:'A',
        link:function(scope, element, attrs, controller, transcludeFn)
        {

            element.on('click',function () {
                $anchorScroll("wrapper");
            });

           $(window).scroll(function(){
                if ($(this).scrollTop() > 100) {
                    $(element).fadeIn();
                } else {
                    $(element).fadeOut();
                }
            })

           ;



        }
    }
})
    /**
     * Directiva para ir al inicio del panel de lectura
     */
    .directive('goFirst',function () {
        return {
            restrict:'A',
            link:function (scope, element, attrs, controller, transcludeFn) {
                element.on('click',function () {
                    var article = document.getElementById('section');
                    article.scrollIntoView(false);
                    article.scrollTop = 0;
                    var campo = document.getElementById('s');
                    campo.blur();
                })
                ;
            }
        }
    })

    .directive('toTop',function ($anchorScroll,$location,$timeout) {
        return {
            restrict:'A',
            link:function (scope, element, attrs, controller, transcludeFn) {
                $timeout(function(){
                    // $anchorScroll('wrapper');
                    // var article = document.getElementById('wrapper');
                    // // article.scrollIntoView(false);
                    // article.scrollTop = 0;
                    $anchorScroll();
                },500)
            }
        }
    })

    /**
     * Directiva para la navegacion por los resultados de la busqueda
     */
    .directive('goResult', function($anchorScroll,$localStorage) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller, transcludeFn) {
                element.bind('click', function(event) {
                    if (!scope.searchString) {
                        scope.buffer = [];
                        scope.cursor = undefined;
                        return;
                    }

                    if (scope.buffer == undefined) {
                        scope.buffer = [];
                    }

                    var span = document.querySelector('.article span.highlightedText');
                    if (span != undefined && scope.cursor != undefined) {
                        if (span.innerText != scope.cursor.innerText) {
                            scope.cursor = undefined;
                            scope.buffer = [];
                        }

                    };

                    if (scope.cursor != undefined) {
                        angular.element(scope.cursor).removeClass('cursor');
                    }


                    if (scope.buffer.length == 0) {
                        var obje = angular.element(document.querySelectorAll('.article span.highlightedText'));
                        scope.buffer = obje.toArray();

                    }

                    scope.cursor = scope.buffer.shift();
                    if (scope.cursor != undefined) {
                        angular.element(scope.cursor).addClass('cursor');
                        var cursor = angular.element(scope.cursor);
                        cursor[0].id = new Date().getTime();
                        console.log(document.getElementById(cursor[0].id));
                        var cursor_el = document.getElementById(cursor[0].id);
                        try {
                            if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {

                                console.log(cursor_el.offsetLeft);
                                console.log(cursor_el.offsetTop);
                                window.scrollTo(cursor_el.offsetLeft, cursor_el.offsetTop);
                            } else {
                                var $cel = $('#' + cursor_el.id);
                                var container = $('.article');
                                console.log($cel.offset().top - container.offset().top + container.scrollTop());
                                $anchorScroll(cursor_el.id);
                                // cursor_el.scrollTop = 0;
                                window.scrollTo(cursor_el.offsetLeft, cursor_el.offsetTop);


                            }




                        } catch (err) {
                            console.warn(err);
                        }
                    }




                });

                angular.element(document).on('keyup', function(event) {
                    if (!scope.searchString) {
                        scope.buffer = [];
                        scope.cursor = undefined;
                        return;
                    }

                    if (event.keyCode == 13) {
                        if (!scope.searchString) {
                            return;
                        }

                        if (scope.buffer == undefined) {
                            scope.buffer = [];
                        }

                        var span = document.querySelector('.article span.highlightedText');
                        if (span != undefined && scope.cursor != undefined) {
                            if (span.innerText != scope.cursor.innerText) {
                                scope.cursor = undefined;
                                scope.buffer = [];
                            }

                        };

                        if (scope.cursor != undefined) {
                            angular.element(scope.cursor).removeClass('cursor');
                        }


                        if (scope.buffer.length == 0) {
                            var obje = angular.element(document.querySelectorAll('.article span.highlightedText'));
                            scope.buffer = obje.toArray();

                        }

                        scope.cursor = scope.buffer.shift();
                        if (scope.cursor != undefined) {
                            angular.element(scope.cursor).addClass('cursor');
                            var cursor = angular.element(scope.cursor);
                            cursor[0].id = new Date().getTime();
                            console.log(document.getElementById(cursor[0].id));
                            var cursor_el = document.getElementById(cursor[0].id);
                            try {
                                if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {

                                    console.log(cursor_el.offsetLeft);
                                    console.log(cursor_el.offsetTop);
                                    window.scrollTo(cursor_el.offsetLeft, cursor_el.offsetTop);
                                } else {
                                    var $cel = $('#' + cursor_el.id);
                                    var container = $('.article');
                                    console.log($cel.offset().top - container.offset().top + container.scrollTop());
                                    $anchorScroll(cursor_el.id);
                                    // cursor_el.scrollTop = 0;
                                    window.scrollTo(cursor_el.offsetLeft, cursor_el.offsetTop+700);


                                }




                            } catch (err) {
                                console.warn(err);
                            }
                        }

                    }

                });
            }
        }
    })
    /*
    Directiva para inicializar el owl carousel
     */
    .directive('owlCarousel', function(){
        return{
            restrict:'A',
            link:function (scope, element, attrs, controller, transcludeFn){
                //Owl Carousel
                setTimeout(function(){
                    $(element).owlCarousel({
                        autoPlay: 5000,
                        items:3,
                        itemsTablet:3,
                        margin:90,
                        stagePadding:90,
                        smartSpeed:450,
                        itemsDesktop : [1199,4],
                        itemsDesktopSmall : [980,3],
                        itemsTablet: [768,3],
                        itemsTablet: [767,2],
                        itemsTabletSmall: [480,2],
                        itemsMobile : [479,1],
                    });
                },500);

            }

        }
    })

    /**
     * Directiva para inicializar el campo de texto de busqueda
     */
    .directive('uiSearch', function(){
        return{
            restrict:'A',
            link:function (scope, element, attrs, controller, transcludeFn){
                new UISearch( document.getElementById( 'sb-search' ) );
            }

        }
    })

    /**
     * Directiva para inicializar el amazingslider
     */
    .directive('amazingslider',function ($timeout) {
        return{
            restrict:'AE',
            link:function (scope,element,attrs,controllers,transcludeFn) {
                    $timeout(function () {

                         var customize = JSON.parse(attrs.amconf);
                         jQuery("#amazingslider-1").amazingslider(customize);
                    },200)
                ;

            }
        }
    })

    /**
     * Directiva para inicializar el html5lightbox
     */
    .directive('html5lightbox',function ($timeout) {
        return {
            restrict:'AE',
            link:function (scope, element, attrs) {
                $timeout(function () {
                    html5Lightbox = undefined;

                    var scripts = document.getElementsByTagName("script");
                    var jsFolder = ""; for(var i = 0; i<scripts.length; i++)if(scripts[i].src&&scripts[i].src.match(/html5lightbox\.js/i))jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/")+1);
                    var loadjQuery = false; if(typeof jQuery=="undefined")loadjQuery = true; else {var jVersion = jQuery.fn.jquery.split("."); if(jVersion[0]<1||jVersion[0]==1&&jVersion[1]<6)loadjQuery = true}if(loadjQuery) {var head = document.getElementsByTagName("head")[0];
                        var script = document.createElement("script");
                        script.setAttribute("type", "text/javascript");
                        if(script.readyState)
                            script.onreadystatechange = function() {
                            if(script.readyState=="loaded"||script.readyState=="complete") {script.onreadystatechange = null; loadHtml5LightBox(jsFolder)}};
                            else
                                script.onload = function() {loadHtml5LightBox(jsFolder)};
                                script.setAttribute("src", jsFolder+"jquery.js");
                        head.appendChild(script)}else loadHtml5LightBox(jsFolder);

                    loadHtml5LightBox(jsFolder);

                },500)
            }
        }
    })

    /**
     * Directiva para redibujar el amazing slider cuando cambia su modelo
     */
    .directive('chooseRender',function () {
        return {
            restrict:'A',
            link:function (scope, element, attrs) {
                element.on('click',function (ev)
                {
                    var $container = $('#amazingslider-wrapper-123');
                    var $parent;
                    $container.remove();
                    $('.empujador').remove();


                    //Rebuilding
                    var jsdata = JSON.parse(attrs.repeater).filter(function (sel) {
                        return sel.section==attrs.filter;
                    });
                    var $ulSlides = $(' <ul class="amazingslider-slides" style="display:none;"></ul>');
                    var $ulThumbnail = $(' <ul class="amazingslider-thumbnails" style="display:none;"></ul>');

                    $parent = $('<div id="amazingslider-wrapper-123" style="display:block;position:relative;max-width:900px;margin:0px auto 98px;"></div>');
                    $container = $(' <div id="amazingslider-123" style="display:block;position:relative;margin:0 auto;"></div>');
                    $container.append($ulSlides).append($ulThumbnail);
                    $parent.append($container);
                    $('#testimonial').append($parent);
                    //Refilling
                    if (jsdata.length>0)
                    {
                        jsdata.forEach(function (video) {
                            var $lis= $('<li></li>');
                            var $lit= $('<li></li>');
                            var $img =$('<img src="assets/'+attrs.type+'/'+video.poster+'" alt="'+video.title+'"  title="'+video.title+'" />');
                            var $anchor = $('<a href="'+video.url+'" class="html5lightbox" data-thumbnail="assets/'+attrs.type+'/'+video.poster+'" data-group="'+attrs.type+'" data-width="800" data-height="600" title="'+video.title+'"></a>');
                            $lis.append($anchor.append($img));
                           // $lis.append($('<video preload="none" src="'+video.url+'" data-webm="'+video.url+'" ></video>'));
                            $lit.append($('<img class="thumbnail" src="assets/'+attrs.type+'/'+video.poster+'" alt="'+video.title+'"  title="'+video.title+'" />'));
                            $ulSlides.append($lis);
                            $ulThumbnail.append($lit);

                        });
                        dom_helper.renderSlider('#amazingslider-wrapper-123');
                    }

                })
            }
        }
    })
    .directive('sliderBuilder',function ($timeout) {
        return {
            restrict:'A',
            link:function (scope, element, attrs) {
                $timeout(function () {
                    var $container = $('#'+attrs.idp);
                   $('.empujador').remove();
                    var $parent;
                    $container.remove();
                    //Rebuilding
                    var jsdata = JSON.parse(attrs.repeater).filter(function (sel) {
                        return sel.section==attrs.filter;
                    });
                    var $ulSlides = $(' <ul class="amazingslider-slides" style="display:none;"></ul>');
                    var $ulThumbnail = $(' <ul class="amazingslider-thumbnails" style="display:none;"></ul>');

                    $parent = $('<div id="'+attrs.idp+'" style="display:block;position:relative;max-width:900px;margin:0px auto 98px;"></div>');
                    $container = $(' <div id="'+attrs.slider+'" style="display:block;position:relative;margin:0 auto;"></div>');
                    $container.append($ulSlides).append($ulThumbnail);
                    $parent.append($container);
                    $('#testimonial').append($parent);
                    //Refilling
                    if (jsdata.length>0)
                    {
                        jsdata.forEach(function (video) {
                            var $lis= $('<li></li>');
                            var $lit= $('<li></li>');
                            var $anchor = $('<a href="'+video.url+'" class="html5lightbox" data-thumbnail="assets/'+attrs.type+'/'+video.poster+'" data-group="'+attrs.type+'" data-width="800" data-height="600" title="'+video.title+'"></a>');
                            var $imgSlide = $('<img src="assets/'+attrs.type+'/'+video.poster+'"  title="'+video.title+'"  class="img-responsive" />');
                            $anchor.append($imgSlide);
                            $lis.append($anchor);
                            $lit.append($('<img class="thumbnail" src="assets/'+attrs.type+'/'+video.poster+'" alt="'+video.title+'"  title="'+video.title+'" />'));
                            $ulSlides.append($lis);
                            $ulThumbnail.append($lit);

                        });

                        dom_helper.renderSlider('#amazingslider-wrapper-123');
                        dom_helper.renderVideo();
                                            }



                },200);
            }

        }
    })
    .directive('lightMobile',function ($timeout) {
        return {
            restrict:'E',
            link:function () {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
                {
                    $timeout(function () {
                     
                        var lightOff = jQuery('a.html5lightbox'); 
                        lightOff.each(function ()
                        {
                            jQuery(this).off('click');
                            jQuery(this).click(function (event) {
                                try{
                                    var assets = "file:///android_asset/www/";
                                    var url = jQuery(this).attr('href');
                                    VideoPlayer.play(assets+url);
                                    event.stopPropagation();
                                }
                                catch (err){
                                    console.log(err);
                                }
                            });
                        });

                    },300)
                }

            },
            template:'<span class="light-mobile"></span>',
            replace:true
        }
    })



;