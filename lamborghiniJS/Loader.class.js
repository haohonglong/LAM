/**
 * 
 * @author: lhh
 * 产品介绍： 文件加载器
 * 创建日期：2014.9.9     
 * 修改日期：2016.9.4
 * 名称：Loader
 * 功能：动态引入js;css;less 文件
 * 说明 :
 * 注意：
 *
 * Example：
 *
 */


window[GRN_LHH].run([window,document],function(window,document,undefined){
    'use strict';
    var System=this;

    var html,head,body, m,meta, s,script, l,link;
    var create;
    var append;
    var sAttribute   = System.Config.render.default.script.Attribute;
    var cAttribute   = System.Config.render.default.css.Attribute;
    var ROOT         = System.Config.Public.ROOT;



    System.is(System,'Basis','Loader');

    /**
     *
     * @returns {*|Dom}
     * @constructor
     */
    function CMyDom(){//创建Dom 对象
        System.is(System,'Dom');
        return new System.Dom();
    }






    var initDom=function(){
        //var load = window.onload;
        //window.onload=function(){
        //    if(System.isFunction(load)){
        //        load();
        //    }
        //
        //};

        var H=System.Config.render.H();


        html        = H.html;
        head        = H.head;
        body        = H.body;
        m = meta    = H.meta;
        s = script  = H.script;
        l = link    = H.link;



    };

    var __this__=null;
    var files = [];

    function Loader(){
        System.Basis.extends.call(this);
        __this__=this;
        this.D = null;
    }

    Loader.prototype={
        'constructor':Loader,
        '__constructor':function(){},
        'js'     :[],
        'css'    :[],
        /**
         *
         * @author: lhh
         * 名称：(void) replace_tpl
         * 功能：替换模板标签
         *  创建日期：2014-9-10
         *  修改日期：2016-9-10
         *  Example：
         *          <link LAM-VAR="template" href="{{_ROOT_}}/css/global.css" type="text/css" rel="stylesheet" />
         *          <img LAM-VAR="template" src="{{_ROOT_}}/images/a.jpg"  />
         *          <a LAM-VAR="template" href="{{_ROOT_}}/xxx.html" ></a>
         */
        'replace_tpl':function(){
            $(function(){
                System.Html.analysisTpl();
            });

        },

        /**
         *
         * @author: lhh
         * 名称： load
         * 功能：动态创建js,css 标签引入公共文件
         * 创建日期：2014-9-9
         * 修改日期：2016.9-4
         * 说明：js 和 css 任选其一
         * @params   (Object)D 			NO NULL :初始化参数
         * @param(Array)D.js		  	     NO NULL:js文件集合
         * @param(Array)D.css		  	     NO NULL:css文件集合
         * @param(String)D.baseUrl		  	    NULL:文件路径
         * @param(String)D.suffix		  	    NULL:文件后缀名
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
            var baseUrl=D.baseUrl || ROOT;
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
                        src = baseUrl ? baseUrl+js+suffix : js+suffix;
                        //是否已加载过了
                        if(System.fileExisted(src)){
                            continue;
                        }else{

                            var attr = System.clone(sAttribute);
                            attr['src'] = src;
                            if(create){
                                node = CMyDom().create('script',attr);
                                node.script=true;
                            }else{
                                node = System.Html.scriptFile(src,attr);
                            }

                            files.push(node);
                            if(System.isClassFile(src)){
                                System.classes.push(src);
                            }
                            System.files.push(src);
                        }



                    }else if(System.isObject(js)){
                        js.src = baseUrl ? baseUrl+js.src+suffix : js.src+suffix;

                        //是否已加载过了
                        if(System.fileExisted(js.src)){
                            continue;
                        }else{
                            System.merge(js,[sAttribute]);
                            if(create){
                                node = CMyDom().create('script',js);
                                node.script=true;
                            }else{
                                node = System.Html.scriptFile(js.src,js);
                            }
                            files.push(node);
                            if(System.isClassFile(js.src)){
                                System.classes.push(js.src);
                            }
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
                        if(System.fileExisted(href)){
                            continue;
                        }else{
                            var attr = System.clone(cAttribute);
                            attr['href'] = href;
                            if(create){
                                node = CMyDom().create('link',attr);
                                node.style=true;
                            }else{
                                node = System.Html.linkFile(href,attr);
                            }

                            files.push(node);
                            System.files.push(href);
                        }


                    }else if(System.isObject(css)){
                        css.rel = css.rel || rel;
                        css.href = baseUrl ? baseUrl+css.href+suffix : css.href+suffix;
                        //是否已加载过了
                        if(System.fileExisted(css.href)){
                            continue;
                        }else{
                            System.merge(css,[cAttribute]);

                            if(create){
                                node = CMyDom().create('link',css);
                                node.style=true;
                            }else{
                                node = System.Html.linkFile(css.href,css);
                            }

                            files.push(node);
                            System.files.push(css.href);

                        }

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
         * 修改日期：2016-9-4
         * 说明：
         * 调用方式：
         */
        'print':function(){

            if(!System.Config.render.create){//document.write() 方式引入外部文件(.js|.css)
                System.print(files.join(''));
            }else{
                System.each(files,function(i){
                    if(System.isObject(this)){
                        this.timer = i*1000;
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
                            //加载后要依次移除添加的script 节点
                            if(System.Config.render.remove){
                                //3秒后依次移除添加的script 节点
                                System.wait([this],function(node){
                                    node.delNode();
                                },this.timer);
                            }


                        }else if(this.style){
                            if(0 === i){
                                this.insertAfter(s[s.length-1]);
                            }else{
                                this.insertAfter(l[i-1]);
                            }
                        }

                    }

                });
            }

            this.remove();

        },
        /**
         *
         * @author: lhh
         * 名称：remove
         * 功能：清空加载器里的数据
         * 创建日期：2016-3-21
         * 修改日期：2016-3-21
         * 说明：
         * 调用方式：
         */
        'remove':function(){
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
         * 功能：
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){

        }

    };
    System['Loadcommon'] = System['Loader'] =new Loader();


});


 
