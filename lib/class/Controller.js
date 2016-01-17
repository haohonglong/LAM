'use strict';

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
