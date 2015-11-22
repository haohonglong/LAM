/**
 * 
 * @author: lhh
 * 创建日期：2014.9.9     
 * 修改日期：2015.7.17
 * 名称：Loadcommon (加载公共文件)
 * 功能：动态引入js;css;less 文件
 * 说明 :
 *        
 *  注意：这个没有服务器的情况下做静态页用，方便与公共文件路径的转移好一次性修改路径地址。
 *
 * Example：
 *
 */


window[LHH_NAMESPACE_20150715_].main([window,document],function(window,document,undefined){
    'use strict';
    var System=this;
    System.is(System,'Basis','Loadcommon');

    var dom=null;
    var CMyDom=function(){
        if(dom) return dom;
        System.is(System,'Dom','MyDom');

        var __this__=null;

        var MyDom=function(){
            System.Basis.extends.call(this,System.Dom);
            __this__=this;
        };

        MyDom.prototype = {
            'constructor':MyDom,
            '__constructor':function(){},

            'empty':function(){},
            /**
             *
             * @author: lhh
             * 产品介绍：析构方法
             * 创建日期：2015-4-2
             * 修改日期：2015-4-2
             * 名称：destructor
             * 功能：在注销Basis对象时调用此方法
             * 说明：
             * 注意：
             * @return  ()                      :
             * Example：
             */
            'destructor':function(){

            }

        };
        System.extends(MyDom,System.Dom,1);
        // System['MyDom']=MyDom;
        return new MyDom();
    };




    var head, m, s,l;

    var initDom=function(){
        if(!dom){
            dom = CMyDom();
        }
        head=document.getElementsByTagName('head')[0];
        m=document.getElementsByTagName('meta');
        s=document.getElementsByTagName('script');
        l=document.getElementsByTagName('link');
    };

    var __this__=null;
    var files = [];

    function Loadcommon(){
        System.Basis.extends.call(this);
        __this__=this;



    }

    Loadcommon.prototype={
        'constructor':Loadcommon,
        '__constructor':function(){},
        'js'     :[],
        'css'    :[],
        /**
         *
         * @author: lhh
         * 名称：(void) replace_tpl
         * 功能：把{global}替换成预设公共文件夹的路径
         * 注意：getPath() 方法要放在模板标签的下面
         *  创建日期：2014.9.10
         *  修改日期：2014.9.10
         *  Example：
         *          <script type="text/javascript" src="{global}/js/lib.class.js"></script>
         *          <link href="{global}/css/global.css" type="text/css" rel="stylesheet" />
         */
        'replace_tpl':function(D){
            var baseUrl=D.baseUrl;
            var reg=/{global}/;
            var i=0;
            for(i=0;i<s.length;i++){
                dom.attr(s[i],'src',dom.attr(s[i],'src').replace(reg,baseUrl));

            }

            for(i=0;i<l.length;i++){
                dom.attr(l[i],'href',dom.attr(l[i],'href').replace(reg,baseUrl));
            }
        },
        /**
         *
         * @author: lhh
         * 名称：(void) getPath
         * 功能：开启替换成预设公共文件夹的路径功能
         *  创建日期：2014.9.10
         *  修改日期：2015.8.01
         *  @param 	(Object)D             NO NULL :
         *  Example：
         *
         *
         *
         *
         */
        'getPath':function(D){
            initDom();
            this.replace_tpl(D);

        },
        /**
         *
         * @author: lhh
         * 名称：(void) classisexist
         * 功能：检查类文件是否已加载过
         *  创建日期：2015.8.01
         *  修改日期：2015.8.01
         *  Example：
         *
         *
         *
         *
         */
        'classisexist':function(path){
            return System.isClassFile(path);
        },
        /**
         *
         * @author: lhh
         * 名称： load
         * 功能：动态创建js,css 标签引入公共文件
         *  创建日期：2014.9.9
         *  修改日期：2014.9.9
         *  说明：js 和 css 也可任选其一
         *  * @params   (Object)D 			NO NULL :初始化参数
         *
         * 			(Array)js		  	     NO NULL:js文件集合
         * 			(Array)css		  	     NO NULL:css文件集合
         * 			(String)baseUrl		  	    NULL:文件路径
         * 			(String)suffix		  	    NULL:文件后缀名
         * 			(String)rel		  	        NULL:
         * 注意：
         * @return  (Object) 返回当前对象
         */
        'load':function(D){
            var suffix;
            var rel;
            var baseUrl=D.baseUrl || null;
            var len;
            var src="";
            var href="";
            var i=0;
            if(D.js){
                suffix = D.suffix || '.js';
                for (i=0,len=D.js.length;i<len;i++){
                    /*
                     var src=baseUrl+D.js[i]+'.js';
                     var script=dom.create('script',{'src':src,type:'text/javascript'});
                     if(0 === i){
                     dom.insertBefore(script,head.firstChild);
                     }else{
                     dom.insertAfter(s[i-1],script);
                     }
                     */
                    var js=D.js[i];
                    if(System.isString(js)){
                        if(this.classisexist(js)){continue;}
                        src = baseUrl ? baseUrl+js+suffix : js+suffix;
                        if(System.classes.indexOf(js) != -1 || System.files.indexOf(src) != -1){
                            continue;
                        }else{
                            files.push(System.Basis.printScript({'src':src}));
                            System.classes.push(js);
                            System.files.push(src);
                        }



                    }else if(System.isObject(js)){
                        if(this.classisexist(js.src)){continue;}
                        js.src = baseUrl ? baseUrl+js.src+suffix : js.src+suffix;

                        if(System.classes.indexOf(js.src) != -1 || System.files.indexOf(js.src) != -1){
                            continue;
                        }else{

                            files.push(System.Basis.printScript(js));
                            System.classes.push(js);
                            System.files.push(js.src);
                        }



                    }


                }
            }

            if(D.css){
                suffix = D.suffix || '.css';
                rel = D.rel || 'stylesheet';
                for (i=0,len=D.css.length;i<len;i++){
                    /*
                     var href=baseUrl+D.css[i]+suffix;
                     var css=dom.create('link',{'href':href,'type':'text/css','rel':rel});
                     if(0 === i){
                     dom.insertAfter(s[s.length-1],css);
                     }else{
                     dom.insertAfter(l[i-1],css);
                     }
                     */
                    var css=D.css[i];

                    if(System.isString(css)){
                        href = baseUrl ? baseUrl+css+suffix : css+suffix;
                        if(System.files.indexOf(href) != -1){continue;}
                        files.push(System.Basis.printLink({'href':href,'rel':rel}));
                        System.files.push(href);

                    }else if(System.isObject(css)){
                        css.rel = css.rel || rel;
                        css.href = baseUrl ? baseUrl+css.href+suffix : css.href+suffix;
                        if(System.files.indexOf(css.href) != -1){continue;}
                        files.push(System.Basis.printLink(css));
                        System.files.push(css.href);

                    }




                }
            }

            return this;
        },
        /**
         *
         * @author: lhh
         * 名称：print
         * 功能：显示load() 里的文件
         * 创建日期：2015-9-2
         * 修改日期：2015-9-2
         * 说明：
         * 调用方式：
         */
        'print':function(){
            if(files.length){
                files.each(function(){
                    System.print(this);
                });
            }
            files = [];
        },
        /**
         *
         * @author: lhh
         * 名称：get_files
         * 功能：
         * 创建日期：2015-9-2
         * 修改日期：2015-9-2
         * 说明：
         * 调用方式：
         */
        'get_files':function(){
            return files;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Basis对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){

        }

    };
    System['Loadcommon']=new Loadcommon();

});


 
