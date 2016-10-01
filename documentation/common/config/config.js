/**
 * 创建人：lhh
 * 创建日期:2015-3-20
 * 修改日期:2016-9-19
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 System.Config里的属性 和 GRN_LHH; 的值；
 *
 * note :
 *
 *
 *
 */

'use strict';

//基础类的设置
if(!GRN_LHH){
    var GRN_LHH='System';
}

(function(global,namespace,System,Config){
    'use strict';
    //js获取项目根路径，如： http://localhost:8083/uimcardprj
    function getRootPath(){
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        return(localhostPaht+projectName);
    }

    if(!global._ROOT_){
        global._ROOT_ = getRootPath();

    }




    Config = System.Config = {
        'vendorPath':_ROOT_+'/../lamborghiniJS',
        'Public':{
             'ROOT':_ROOT_
            ,'COMMON':_ROOT_+'/common'
            ,'PLUGINS':_ROOT_+'/plugins'
            ,'Lib':{
                'css':_ROOT_+'/../lib/css'
            }
        },
        //hashcode 随机种子
        'random':10000,
        //定义模版标签
        'templat':{
            'custom_attr':'LAM-VAR=template',
            'leftLimit':'{#',
            'rightLimit':'#}'
        },
        'files':[],
        //配置基础文件
        'autoLoadFile':function(){
            var ROOT = this.Public.ROOT;
            var classPath=this.getClassPath();
            return [
                classPath+'/jQuery/jquery.js',
                classPath+'/Basis.class.js',
                //classPath+'/Base.class.js',
                classPath+'/BiObject.class.js',
                classPath+'/Loader.class.js',
                classPath+'/Component.class.js',
                classPath+'/Helper.class.js',
                classPath+'/Event.class.js',
                classPath+'/Browser.class.js',
                classPath+'/Dom.class.js',
                classPath+'/Html.class.js',
                classPath+'/Template.class.js'
                //classPath+'/Controller.class.js'
            ];
        },

        //标签的渲染方式
        'render':{
            //输出标签的方式 ()
            'fragment':null,
            //true : document.createElement(); false :document.write();
            'create':false,
            //加载后是否要移除添加过的script 节点
            'remove':true,
            'append':'after',
            'default':{
                'script':{
                    'Attribute':{
                        'type':'text/javascript',
                        //'async':'async',
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
                tag = tag || "script";
                var node;
                var k;
                var fragment;
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
            },
            /**
             * 用createElement 创建标签并且设为异步
             */
            'use':function(){
                this.create=true;
                this.default.script.Attribute.async='async';
                this.default.script.Attribute.defer='defer';
            },
            /**
             * 用document.write() 创建标签并且设为非异步
             */
            'unuse':function(){
                this.create=false;
                this.default.script.Attribute.async='false';
                this.default.script.Attribute.defer='';
            }
        },
        'init':{},
        'params':{},
        'getClassPath':function(){
            return this.vendorPath;
        }
    };

    global[namespace] = System;

})(window,GRN_LHH,{});

//加载初始化文件
(function(System,Config){
    'use strict';
    Config=System.Config;
    Config.files = Config.files || [];
    var tag = "script";
    var scriptAttribute = Config.render.default.script.Attribute;
    var i = 0;
    var len;
    var data = scriptAttribute;
    var classPath=Config.getClassPath();
    var ROOT=Config.Public.ROOT;
    var files=[];

    //加载基础类
    var srcs =Config.autoLoadFile();
    //=================================================================================================================================
    if(Config.render.create){
        window.setTimeout(function(){
            var H=Config.render.H();
            for(i=0,len = srcs.length;i < len; i++){
                data.src = srcs[i];
                Config.render.bulid(tag,data);
            }
            console.log(H.body);
            console.log(Config.render.fragment);
            H.body.appendChild(Config.render.fragment);
        },3000);
    }else{
        var attrs=[];
        for(var k in scriptAttribute){
            attrs.push(k,'=','"',scriptAttribute[k],'"',' ');
        }
        for(i=0,len = srcs.length;i < len; i++){
            //确保每个文件只加载一次
            if(!(-1 === Config.files.indexOf(srcs[i]))){
                continue;
            }
            files.push('<',tag,' ',attrs.join(''),'src=','"',srcs[i],'"','>','<','/',tag,'>');
            Config.files.push(srcs[i]);

        }
        document.write(files.join(''));
        document.close();
    }

    //=================================================================================================================================


    //=================================================================================================================================
    //5秒之后检测lamborghiniJS基础类文件是否加载成功
    //=================================================================================================================================
    window.setTimeout(function(){
        if(!LAMJS){
            alert('cannot find Basis class! the lamborghiniJS\' path is :{'+classPath+'}');
        }else{
            LAMJS.run(function() {
                'use strict';
                var System=this;
                var ROOT = System.Config.Public.ROOT;
            });
        }
    },5000);
    //=================================================================================================================================


})(window[GRN_LHH]);








