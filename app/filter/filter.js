angular.module('app')

/**
 * Retorna marcado simple
 */
    .filter('liteSearch',function ($sce) {
        return function (text, criteria) {
            return marquee(text,criteria,$sce);
            // return marquee(text,$localStorage.searchString,$sce);
        }
    })
    /**
     * Retorna el marcado complejo y reutilizacion de la busqueda, retorna el html truncado
     */
    .filter('highlights',function ($sce) {
        return function (html, criteria)
        {
            if (!criteria) {
                return $sce.trustAsHtml(html);
            }
            var exp = criteria;

            var html2 = html.replace(/<\/?[^>]+(>|$)/g, "");

            exp = exp.replace(/a/gi, "[a|á]");
            exp = exp.replace(/e/gi, "[e|é]");
            exp = exp.replace(/i/gi, "[i|í]");
            exp = exp.replace(/o/gi, "[o|ó]");
            exp = exp.replace(/u/gi, "[u|ú]");

            /* case-insensitive search */

            var regEx = new RegExp(exp, 'gi');

            var pos = html2.search(regEx);

            var wordLength = criteria.length;

            var ini = pos - 30;
            var fini = pos + wordLength + 100;

            if (ini < 0) {
                ini = 0;
                var beforeSearch = html2.slice(ini, pos);
            } else {
                var test = html2.slice(ini, pos);
                var space = test.indexOf(" ");
                var nextToSpace = 0;

                if (space != -1) {
                    nextToSpace = space + 1;
                }

                var beforeSearch = test.substr(nextToSpace, test.length);

            }

            if (fini > html2.length) {
                fini = html2.length;
            }

            var afterSearch = html2.substring(pos + wordLength, fini);

            var dword = html2.substr(pos, wordLength);

            var todo = beforeSearch + dword + afterSearch;

            var last = todo.substr(0, Math.min(todo.length, todo.lastIndexOf(" ")));

            last = last + " ...";


            var res = last.replace(new RegExp(exp, 'gi'), '<span class="highlightedText">$&</span>');

            return $sce.trustAsHtml(res);
        }
    })

    /**
     * Reutilizacion de la busqueda
     */
    .filter('searchFor', function(){
        return function(arr, searchString){
            if(!searchString){
                //return arr;  to return the whole array
                return [];
            }
            var result = [];
            searchString = searchString.toLowerCase();

            searchString = searchString.replace(/a/gi, "[a|á]");
            searchString = searchString.replace(/e/gi, "[e|é]");
            searchString = searchString.replace(/i/gi, "[i|í]");
            searchString = searchString.replace(/o/gi, "[o|ó]");
            searchString = searchString.replace(/u/gi, "[u|ú]");

            angular.forEach(arr, function(item){

                temp = item.content.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "");


                if(temp.search(searchString) !== -1){
                    result.push(item);
                }

            });

            if (result.length > 0) {
                return result;
            } else {

            }

        };
    })

    /**
     * Escapado simple de HTML
     */
    .filter('safeHTML',function ($sce) {
        return function (html) {
            return $sce.trustAsHtml(html);
        }
    })

    /**
    *Recorta el texto para crear el enlace de ver mas
    */
    .filter('more',function ($sce) {
        return function (html) {
            var wordLength = 20;
            var pos = 0;

            var ini = pos - 30;
            var fini = pos + wordLength + 100;

            if (ini < 0) {
                ini = 0;
                var beforeSearch = html.slice(ini, pos);
            } else {
                var test = html.slice(ini, pos);
                var space = test.indexOf(" ");
                var nextToSpace = 0;

                if (space != -1) {
                    nextToSpace = space + 1;
                }

                var beforeSearch = test.substr(nextToSpace, test.length);

            }

            if (fini > html.length) {
                fini = html.length;
            }
            var afterSearch = html.substring(pos + wordLength, fini);

            var dword = html.substr(pos, wordLength);

            var todo = beforeSearch + dword + afterSearch;

            var last = todo.substr(0, Math.min(todo.length, todo.lastIndexOf(" ")));

            last = last + " ...";
            return $sce.trustAsHtml(last);
        }

    })

     /**
     *
     *Devuelve el listado segun la secccion de seleccionada
     */
    .filter('chooser',function () {
        return function (list, criteria) {            
            return _(list).where({section:criteria.split('.')[1]});
        }
    })


    /**
    *
    *Alternador de videos con flash interactivos
    *
    **/
    .filter('path',function(){
        return function(path){
            return path!='.anatomia'?'#/videos#'+path:'#/flash#'+path;
        }
    })

    /**
     * Cuenta la cantidad de elementos segun filtro
     */
    .filter('counterFilter',function () {
        return function (list, filter) {
            return list.reduce(function (memo, vector) {
                return memo + vector.filter(function (l) {
                        return l.section.indexOf(filter)!=-1 ||filter.indexOf(l.section)!=-1;
                    }).length;
            },0);

        }
    })
;



/**
 * Retorna el texto con hightlight en la palabra buscada, retorna el texto completo
 * @param text
 * @param $sce
 * @param search
 * @returns {*}
 */
function marquee(text, search,$sce) {
    if (!text){
        return;
    }
    if (!search) {
        return $sce.trustAsHtml(text);
    }
    var exp = search;

    exp = exp.replace(/a/gi, "[a|á]");
    exp = exp.replace(/e/gi, "[e|é]");
    exp = exp.replace(/i/gi, "[i|í]");
    exp = exp.replace(/o/gi, "[o|ó]");
    exp = exp.replace(/u/gi, "[u|ú]");

    /* case-insensitive search */

    var regEx = new RegExp(exp, 'gi');

    var full = text.replace(new RegExp(exp, 'gi'), '<span class="highlightedText">$&</span>');

    return $sce.trustAsHtml(full);
}
