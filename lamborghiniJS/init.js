//加载基础类

window[LHH_NAMESPACE_20150715_].main(function(){
    'use strict';
    var System=this;
    System.root={
        'path':_ROOT_
    };
    System.import([
        '/BiObject.class',
        '/Component.class',
        '/Helper.class',
        '/Browser.class',
        '/Dom.class',
        '/Html.class',
        '/Template.class',
        '/Controller.class'
    ],System.classPath);
});