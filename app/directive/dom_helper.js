
var dom_helper = {};

/**
 * Redibuja el panel de video
 */
dom_helper.renderVideo = function () {



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
        head.appendChild(script)}else loadHtml5LightBox(jsFolder)

    loadHtml5LightBox(jsFolder);
}

/**
 * Redibuja el panel de audio
 */
dom_helper.renderSlider = function (id) {
    setTimeout(function () {
        var scripts = document.getElementsByTagName("script");

        var jsFolder = "";

        for (var i= 0; i< scripts.length; i++)

        {

            if( scripts[i].src && scripts[i].src.match(/initslider-1\.js/i))

                jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);

        }

        if (id==undefined) {
            id="#amazingslider-1";
        }

        jQuery(id).amazingslider({

            sliderid:1,

            jsfolder:jsFolder,

            width:900,

            height:360,

            skinsfoldername:"",

            loadimageondemand:false,

            videohidecontrols:true,

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

            navpreviewbordercolor:"#336699",

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

            showtimer:false,

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

            timercolor:"#336699",

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

            bordercolor:"#336699",

            border:0,

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

            showtwitter:false,

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

                duration:2000,

                easing:"easeOutCubic",

                checked:true,

                effectdirection:0,

                slicecount:3

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



            },
            lightboxshowtitleprefix:false,
            lightboxshowplaybutton:false

        });
    },200)
}

;