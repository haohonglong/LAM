/**
 * 创建人：lhh
 * 创建日期:2015/3/20
 * 修改日期:2015/8/02
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 'LHH_CONFIG_20150717_'里的属性 和 'LHH_NAMESPACE_20150715_'; 的值；
 *
 * note :
 *
 *
 *
 */

'use strict';

//基础类的设置
if(!LHH_NAMESPACE_20150715_){
    var LHH_NAMESPACE_20150715_='System';
}

if(!LHH_CONFIG_20150717_){
    var LHH_CONFIG_20150717_={
        'vendorPath':'./lib/',
        'classPath':'class',
        //hashcode 随机种子
        'random':10000,
        //标签的渲染方式
        'render':{
            //输出标签的方式 ()
            'fragment':null,
            //true : document.createElement(); false :document.write();
            'create':null,
            'append':'after',
            'script':{
                'Attribute':{
                    'type':'text/javascript',
                    'charset':'utf-8'
                    //'defer':'defer',
                    //'async':true
                }
            },
            'css':{
                'Attribute':{
                    'type':'text/css',
                    'rel':'stylesheet'
                }
            },
            'H':{
                'html'    : document.getElementsByTagName('html')[0],
                'head'    : document.getElementsByTagName('head')[0],
                'body'    : document.getElementsByTagName('body')[0],
                'meta'    : document.getElementsByTagName('meta'),
                'script'  : document.getElementsByTagName('script'),
                'link'    : document.getElementsByTagName('link')
            },
            'bulid':function(tag,D){
                tag = tag || "div";
                var node;
                var k;
                var fragment;
                node=document.createElement(tag);

                for(k in D){
                    node[k] = D[k];
                }

                if(!LHH_CONFIG_20150717_.render.fragment){
                    LHH_CONFIG_20150717_.render.fragment = document.createDocumentFragment();
                }
                fragment = LHH_CONFIG_20150717_.render.fragment;

                LHH_CONFIG_20150717_.render.fragment.appendChild(node);

                return fragment;
            }

        },
        'init':{},
        'getClassPath':function(){
            return this.vendorPath+this.classPath;
        }
    };
}

//加载基础类
(function(Config){
    var tag = "script";
    var scriptAttribute = Config.render.script.Attribute;
    var i = 0;
    var len;
    var data;
    var srcs =[
        '/Basis.class.js',
        '/loadcommon.js',
        '/init.js'];

    if(Config.render.create){
        for(i=0,len = srcs.length;i < len; i++){
            var data = scriptAttribute;
            data.src = Config.getClassPath()+srcs[i],
            Config.render.bulid(tag,data);
        }
        Config.render.H.body.appendChild(Config.render.fragment);



    }else{
        for(i=0,len = srcs.length;i < len; i++){
            document.write('<'+tag+' src="'+Config.getClassPath()+srcs[i]+'" type="text/javascript"><\/'+tag+'>');
        }
    }
})(LHH_CONFIG_20150717_);






setTimeout(function(){
    if(!window[LHH_NAMESPACE_20150715_]) {
        alert("cannot find Basis class");
    }
},1800);