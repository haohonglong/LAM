/**
 * 
 * @author: lhh
 * 产品介绍： 文件加载器
 * 创建日期：2014.9.9     
 * 修改日期：2015.11.23
 * 名称：Loadcommon
 * 功能：动态引入js;css;less 文件
 * 说明 :
 * 注意：
 *
 * Example：
 *
 */


window[LHH_NAMESPACE_20150715_].main([window,document],function(window,document,undefined){
    'use strict';
    var System=this;

    var dom=null;
    var html,head,body, m,meta, s,script, l,link;
    var create;
    var append;
    var sAttribute   = System.Config.render.script.Attribute;
    var cAttribute   = System.Config.render.css.Attribute;



    System.is(System,'Basis','Loadcommon');


    var CMyDom=function(){//创建Dom 对象
        if(dom) return dom;
        System.is(System,'Dom');
        dom = new System.Dom();
    };






    var initDom=function(){
        //var load = window.onload;
        //window.onload=function(){
        //    if(System.isFunction(load)){
        //        load();
        //    }
        //
        //};
        //
        html        = System.Config.render.H.html;
        head        = System.Config.render.H.head;
        body        = System.Config.render.H.body;
        m = meta    = System.Config.render.H.meta;
        s = script  = System.Config.render.H.script;
        l = link    = System.Config.render.H.link;

    };

    var __this__=null;
    var files = [];

    function Loadcommon(){
        System.Basis.extends.call(this);
        __this__=this;
        this.D = null;
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
            var len;
            for(i=0,len= s.length;i < len ; i++){
                dom.attr(s[i],'src',dom.attr(s[i],'src').replace(reg,baseUrl));

            }

            for(i=0,len=link.length;i < len ;i++){
                dom.attr(link[i],'href',dom.attr(link[i],'href').replace(reg,baseUrl));
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
            CMyDom();
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
            create = System.Config.render.create;
            append = System.Config.render.append;
            if(create){
                initDom();
            }
            var suffix;
            var rel;
            var baseUrl=D.baseUrl || null;
            var len;
            var src="";
            var href="";
            var i=0;
            var node = null;
            if(D.js){
                suffix = D.suffix || '.js';
                for (i=0,len=D.js.length;i<len;i++){
                    var js=D.js[i];
                    if(System.isString(js)){
                        //是否已加载过了
                        if(this.classisexist(js)){continue;}
                        src = baseUrl ? baseUrl+js+suffix : js+suffix;
                        if(System.classes.indexOf(js) != -1 || System.files.indexOf(src) != -1){
                            continue;
                        }else{

                            var A = System.clone(sAttribute);
                            A['src'] = src;
                            if(create){
                                node = System.Basis.createTag('script',A);
                                node.script=true;
                            }else{
                                node = System.Basis.printScript(A);
                            }

                            files.push(node);
                            System.classes.push(js);
                            System.files.push(src);
                        }



                    }else if(System.isObject(js)){
                        //是否已加载过了
                        if(this.classisexist(js.src)){continue;}
                        js.src = baseUrl ? baseUrl+js.src+suffix : js.src+suffix;

                        if(System.classes.indexOf(js.src) != -1 || System.files.indexOf(js.src) != -1){
                            continue;
                        }else{
                            System.merge(js,[sAttribute]);
                            if(create){
                                node = System.Basis.createTag('script',js);
                                node.script=true;
                            }else{
                                node = System.Basis.printScript(js);
                            }
                            files.push(node);
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
                    var css=D.css[i];

                    if(System.isString(css)){
                        href = baseUrl ? baseUrl+css+suffix : css+suffix;
                        //是否已加载过了
                        if(System.files.indexOf(href) != -1){continue;}
                        var A = System.clone(cAttribute);
                        A['href'] = href;
                        if(create){
                            node = System.Basis.createTag('link',A);
                            node.style=true;
                        }else{
                            node = System.Basis.printLink(A);
                        }

                        files.push(node);
                        System.files.push(href);

                    }else if(System.isObject(css)){
                        css.rel = css.rel || rel;
                        css.href = baseUrl ? baseUrl+css.href+suffix : css.href+suffix;
                        //是否已加载过了
                        if(System.files.indexOf(css.href) != -1){continue;}
                        System.merge(css,[cAttribute]);

                        if(create){
                            node = System.Basis.createTag('link',css);
                            node.style=true;
                        }else{
                            node = System.Basis.printLink(css);
                        }

                        files.push(node);
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
            var i = 0;
            if(files.length){
                files.each(function(){
                    if(System.isObject(this)){
                        if(this.script){
                            if('after' === append){
                                this.appendTo(body);
                            }else{
                                if(0 === i){
                                    this.insertBefore(null,head.firstChild);
                                }else{
                                    this.insertAfter(s[i-1]);
                                }
                            }

                        }
                        else if(this.style){
                            if(0 === i){
                                this.insertAfter(s[s.length-1]);
                            }else{
                                this.insertAfter(l[i-1]);
                            }
                        }
                    }else{
                        System.print(this);
                    }
                    i++;
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


 