(function(){
    'use strict';
    //var url='./../lib/class';
    //document.write('<script type="text/javascript" src="'+url+'/jQuery/jquery.js"><\/script>');
    //document.write('<script type="text/javascript" src="'+url+'/Controller.js"><\/script>');

    setTimeout(function(){
        if(!window[LHH_NAMESPACE_20150715_]) {
            alert("cannot find Basis class");
        }else{
            window[LHH_NAMESPACE_20150715_].main(function(){
                'use strict';
                var System=this;
                System.Controller.getFile();

            });
        }
    },5000);
})();

