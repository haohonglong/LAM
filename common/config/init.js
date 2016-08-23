//加载基础类

LAMJS.run([
    LAMJS.Config.Public.ROOT
],function(ROOT) {
    'use strict';
    var System=this;
    System.root={
        'path':ROOT
    };
    System.import([
        '/BiObject.class',
        '/Component.class',
        '/Helper.class',
        '/Template.class'
    ],System.classPath);
});