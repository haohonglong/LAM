//加载基础类

LAMJS.run(function() {
    'use strict';
    var System=this;
    System.Loader
        .load({
            'baseUrl':System.Config.Public.Lib.css,
            'suffix':'.css',
            'rel':'stylesheet',
            'css':[
                '/bootstrap',
                //'/global',
                '/lib'
            ]
        })
        .print();
    System
        .import([
        ],System.classPath);
});