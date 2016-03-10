
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

window[LHH_NAMESPACE_20150715_].main([window,jQuery],function(window,$,undefined){
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
        console.log(items);
        return items;

    };
    function Controller(){
        System.Basis.extends.call(this,System.Component);
        __this__=this;



    }

    Controller.getFile =function(async){
        $.ajax({
            type: "GET",
            url: get_url_Param('file')+'.html',
            async: async ? true : false,
            dataType: 'html',
            success: function(content){
                document.write(content);
            }
        });
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




