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
if(!_ROOT_){
    var _ROOT_ = '.';

}


var common = _ROOT_+'/common';
var plugins = _ROOT_+'/plugins';


if(!LHH_CONFIG_20150717_){
    var LHH_CONFIG_20150717_={
        'vendorPath':_ROOT_+'/lamborghiniJS',
        'Public':{
            'ROOT':_ROOT_
        },
        //hashcode 随机种子
        'random':10000,
        //定义模版标签
        'templat':{
            'leftLimit':'{{',
            'rightLimit':'}}'
        },
        //标签的渲染方式
        'render':{
            //输出标签的方式 ()
            'fragment':null,
            //true : document.createElement(); false :document.write();
            'create':false,
            'append':'after',
            'default':{
                'script':{
                    'Attribute':{
                        'type':'text/javascript',
                        //'async':true,
                        //'defer':'defer',
                        'charset':'utf-8'
                    }
                },
                'css':{
                    'Attribute':{
                        'type':'text/css',
                        'rel':'stylesheet'
                    }
                }
            },
            'H':function(){
                return {
                    'html'    : document.getElementsByTagName('html')[0],
                    'head'    : document.getElementsByTagName('head')[0],
                    'body'    : document.getElementsByTagName('body')[0],
                    'meta'    : document.getElementsByTagName('meta'),
                    'script'  : document.getElementsByTagName('script'),
                    'link'    : document.getElementsByTagName('link')
                };
            },
            'bulid':function(tag,D){
                tag = tag || "div";
                var node;
                var k;
                var fragment;
                var Config = LHH_CONFIG_20150717_;
                node=document.createElement(tag);

                for(k in D){
                    node[k] = D[k];
                }

                if(!Config.render.fragment){
                    Config.render.fragment = document.createDocumentFragment();
                }
                fragment = Config.render.fragment;

                Config.render.fragment.appendChild(node);

                return fragment;
            }

        },
        'init':{},
        /**
         * 用createElement 创建标签并且设为异步
         */
        'use':function(){
            this.render.create=true;
            this.render.default.script.Attribute.async=true;
            this.render.default.script.Attribute.defer='defer';
        },
        /**
         * 用document.write() 创建标签并且设为非异步
         */
        'unuse':function(){
            this.render.create=false;
            this.render.default.script.Attribute.async=false;
            this.render.default.script.Attribute.defer='';
        },
        'getClassPath':function(){
            return this.vendorPath;
        }
    };
}


(function(Config){
    var tag = "script";
    var scriptAttribute = Config.render.default.script.Attribute;
    var i = 0;
    var len;
    var data;
    var classPath=Config.getClassPath();

    //加载基础类
    var srcs =[
        classPath+'/jQuery/jquery.js',
        classPath+'/Basis.class.js',
        classPath+'/BiObject.class.js',
        classPath+'/loadcommon.class.js',
        classPath+'/Component.class.js',
        classPath+'/Helper.class.js',
        classPath+'/Browser.class.js',
        classPath+'/Dom.class.js',
        classPath+'/Html.class.js',
        classPath+'/Template.class.js',
        classPath+'/Controller.class.js'
    ];

    if(Config.render.create){
        var H=Config.render.H();
        for(i=0,len = srcs.length;i < len; i++){
            var data = scriptAttribute;
            data.src = Config.getClassPath()+srcs[i],
                Config.render.bulid(tag,data);
        }
        console.log(H.body)
        console.log(Config.render.fragment)
        H.body.appendChild(Config.render.fragment);



    }else{
        var attrs=[];
        for(var k in scriptAttribute){
            attrs.push(k,'=','"',scriptAttribute[k],'"',' ');
        }
        for(i=0,len = srcs.length;i < len; i++){
            document.write('<',tag,' ',attrs.join(''),'src=','"',srcs[i],'"','>','<','/',tag,'>');

        }
    }





    //=================================================================================================================================
    //5秒之后检测lamborghiniJS基础类文件是否加载成功
    //=================================================================================================================================
    window.setTimeout(function(){
        if(!window[LHH_NAMESPACE_20150715_]) {
            alert('cannot find Basis class! the lamborghiniJS\' path is :{'+LHH_CONFIG_20150717_.getClassPath()+'}');
        }else{
            window[LHH_NAMESPACE_20150715_].main(function(){
                var System=this;
            });
        }
    },5000);
    //=================================================================================================================================


})(LHH_CONFIG_20150717_);








