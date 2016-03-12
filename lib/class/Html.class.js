
window[LHH_NAMESPACE_20150715_].main([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Dom','Html');

	var __this__=null;
	function Html(){
		System.Basis.extends.call(this.System.Dom);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		this.symbol=[];


	}

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-25
	 * 修改日期：2015-8-25
	 * 名称： Html.tag
	 * 功能：动态返回指定的标签
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)tag             NO NULL : 标签名称
	 * @param 	(Boolean)single         NO NULL : 成对标签还是单一标签，false 是成对标签
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String)content            NULL : 内容
	 * @return (String) 返回标签字符串 可用document.write();输出
	 * Example：
	 *
	 */
	Html.tag=function(tag,single,D,content){
		return System.Basis.printTag(tag,single,D,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-1-15
	 * 名称： getFile
	 * 功能：返回指定的文件
	 * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
	 * 注意：
	 * @param 	(jQuery)$dom             	   NO NULL :
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String)  	D.url         	      NULL :请求地址
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @param 	(Function)	D.callBack       	  NULL :返回到会调函数里的内容
	 * @return ()
	 * Example：
	 *
	 */
	var getFile=function($dom,D,
					 	  type,
					      dataType,
					      url,
					      data,
					 	  async,
					 	  cache,
					 	  callBack){

		data  		= $dom && $dom.attr('data')  	|| D&&D.data  	 || {};
		dataType 	= $dom && $dom.attr('dataType') || D&&D.dataType ||"html";
		url  		= $dom && $dom.attr('file')  	|| D&&D.url;
		type  		= $dom && $dom.attr('type')  	|| D&&D.type  	 || "GET";
		async 		= $dom && $dom.attr('async') 	|| D&&D.async ;
		cache 		= $dom && $dom.attr('cache') 	|| D&&D.cache ;
		callBack 	= D&&D.callBack || 0;

		$.ajax({
			type :    type,
			url  :    System.template(url),
			data :    data,
			async:    async ? true : false,
			cache:    cache ? true : false,
			dataType: dataType,
			error:function(){
				throw new Error("Warning :没有取到数据！！！note:也许是file属性的参数错了哦...");
			},
			success: function(content){
				if(callBack && System.isFunction(callBack)){
					callBack(content);
				}else{
					$dom.after(content).remove();
				}

			}
		});
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-3-12
	 * 修改日期：2016-3-12
	 * 名称： getFile
	 * 功能：返回指定的文件
	 * 说明：
	 * 注意：
	 * @param 	(String)  	D.url         	      NULL :请求地址
	 * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @return (void | Number)
	 * Example：
	 *
	 */
	Html.getFile=function(url,callBack,D){
		if(!System.isString(url)){
			throw new Error("Warning :url 必须是请求文件的路径");
			return 0;
		}
		getFile(null,{
			'url'  : url,
			'type' : D.type,
			'data' : D.data,
			'async': D.async,
			'cache': D.cache,
			'dataType': D.dataType,
			'callBack':function(content){
				callBack(content);
			}
		});

	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-1-15
	 * 名称： Html.include
	 * 功能：html文件里包含另一个文件
	 * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @param 	(Object)D                NO NULL :json 数据
	 * @param 	(String)type             	NULL :
	 * @param 	(Boolean)async           	NULL :是否异步加载
	 * @param 	(Boolean)cache           	NULL :是否缓存默认true
	 * @param 	(Function)callBack       	NULL :返回到会调函数里的内容:this: 当前include 节点;content:include 的文件
	 * @return ()
	 * Example：
	 *
	 */
	Html.include=function($dom,D,type,async,cache,callBack){
		callBack = D && D.callBack || 0;
		$dom.each(function(){
			var dom =this;
			if(callBack && System.isFunction(callBack)){
				D.callBack =function(content){
					callBack.call(dom,content);
				};

			}

			getFile($(dom),D);

		});

	};


	Html.prototype = {
		'contructor':Html,
		'__constructor':function(){},
		'render':function(content){
			System.print(content);
		},

		'html':function(obj){
			/**
			 {
                'content':'内容',
                'select':'list'

            }

			 */
			var content=[],html='';

			switch(obj['select']){
				case 'content':

					content.push(html);
					break;

				case 'list':

					content.push(html);
					break;

				case 'title':

					content.push(html);
					break;

				case 'form':

					content.push(html);
					break;

				case 'table':

					content.push(html);
					break;
				case 'box':

					content.push(html);
					break;


				default:

			}


			return content.join();
		},

		'empty':function(){},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Basis对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}

	};
	System.extends(Html,System.Dom,1);
	System['Html']=Html;

});
