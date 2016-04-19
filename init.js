//加载基础类

window[GRN_LHH].main(function(){
    'use strict';
    var System=this;
    System.root={
        'path':__root__
    };
    System.import([
        '/BiObject.class',
        '/Component.class',
        '/Helper.class',
        '/Template.class'
    ],System.classPath);
});