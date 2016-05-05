
/**
 * 创建人：lhh
 * 创建日期:2015/7/22
 * 修改日期:2015/7/23
 * 名称：助手类
 * 功能：
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */

window[GRN_LHH].main([window,jQuery],function(window,$,undefined){
    'use strict';
    var System=this;
    System.is(System,'Component','Controller');

    var __this__=null;
    var document=window.document;
    /**
     * @author lhh
     * 产品介绍：
     * 创建日期：2015-6-25
     * 修改日期：2015-6-25
     * 名称：get_url_Param
     * 功能：根据指定的url参数获取相对应的参数值
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
        console.log(items);
        return items;

    };
    function Controller(file){
        System.Basis.extends.call(this,System.Component);
        __this__=this;

        if(file){
            this[Controller.get_url_name(file)+'Action']();
            this.file = file;
        }


    }


    /**
     *
     * @author lhh
     * 产品介绍：
     * 创建日期：2016-3-27
     * 修改日期：2016-3-27
     * 名称：get_url_name
     * 功能：根据url参数获取方法名称
     * @param name
     * @returns {String}渲染对应视图文件的方法名
     * Example: eval(Controller.get_url_name('file'))()
     */
    Controller.get_url_name =function(name){
        return get_url_Param(name);
    };

    Controller.prototype = {
        'constructor':Controller,


        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Controller对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    };
    System.extends(Controller,System.Component,1);
    System['Controller']=Controller;

});




