/**
 * 创建人：lhh
 * 创建日期:2015/3/20
 * 修改日期:2015/8/02
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 'LHH_CLASSPATH_20150717_'里的属性 和 'LHH_NAMESPACE_20150715_'; 的值；
 *
 * note :
 *
 *
 *
 */


'use strict';
//基础类的设置
if(!LHH_NAMESPACE_20150715_){
    var LHH_NAMESPACE_20150715_='System211';
}


if(!LHH_CONFIG_20150717_){
    var LHH_CONFIG_20150717_={
        'vendorPath':'../lib/',
        'classPath':'class',
        //hashcode 随机种子
        'random':10000,
        //标签的渲染方式
        'render':{
            //输出标签的方式 ()
            'fragment':null,
            //true : document.createElement(); false :document.write();
            'create':false,
            'append':'after',
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
        'getClassPath':function(){
            return this.vendorPath+this.classPath;
        }
    };
}


(function(Config){
    var tag = "script";
    var scriptAttribute = Config.render.script.Attribute;
    var i = 0;
    var len;
    var data;
    //加载基础类
    var srcs =[
        '/jQuery/jquery.js'
    ];

    if(Config.render.create){
        for(i=0,len = srcs.length;i < len; i++){
            var data = scriptAttribute;
            data.src = Config.getClassPath()+srcs[i],
                Config.render.bulid(tag,data);
        }
        console.log(Config.render.H.body)
        console.log(Config.render.fragment)
        Config.render.H.body.appendChild(Config.render.fragment);



    }else{
        var attrs=[];
        for(var k in scriptAttribute){
            attrs.push(k+'="'+scriptAttribute[k]+'"');
        }
        for(i=0,len = srcs.length;i < len; i++){
            //document.write('<'+tag+' src="'+Config.getClassPath()+srcs[i]+'" type="text/javascript"><\/'+tag+'>');
            document.write('<'+tag+' src="'+Config.getClassPath()+srcs[i]+'" '+attrs.join('')+'><\/'+tag+'>');
        }
    }


})(LHH_CONFIG_20150717_);

/**
 * @author lhh
 * 产品介绍：
 * 创建日期：2015-6-25
 * 修改日期：2015-6-25
 * 名称：get_url_Param
 * 功能：获取url指定的参数
 * 说明：
 * 注意：
 * @param   (String)name            NO NULL :参数名称
 * @return  String
 *
 */
var get_url_Param=function(name){
    var search = document.location.search;
    var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if(null != matcher){
        try{
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        }catch(e){
            try{
                items = decodeURIComponent(matcher[1]);
            }catch(e){
                items = matcher[1];
            }
        }
    }
    console.log(items)
    return items;

};



console.log(2222222)


setTimeout(function(){
    function getFile(async){
        $.ajax({
            type: "GET",
            url: get_url_Param('file')+'.html',
            async: async ? true : false,
            dataType: 'html',
            success: function(content){
                document.write(content);
            }
        });
    }

    getFile();
},1800);