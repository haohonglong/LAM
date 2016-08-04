
window[GRN_LHH].main([window],function(window,undefined){
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


	Html.tag = System.Basis.printTag;
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-7-8
	 * 名称： getFile
	 * 功能：返回指定的文件
	 * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
	 * 注意：
	 * @param 	(jQuery)$dom             	   NO NULL :
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String)  	D.contentType      	  NULL :设置编码等
	 * @param 	(String)  	D.url         	      NULL :请求地址
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @param 	(Function)	D.beforeSend       	  NULL :在发送数据之前执行的方法
	 * @param 	(Function)	D.capture       	  NULL :可以在第一时间捕获返回的数据字符串，处理修改后返回
	 * @param 	(Function)	D.callBack       	  NULL :返回到回调函数里的内容
	 * @return ()
	 * Example：
	 *
	 */
	var getFile=function($dom,D,
						 type,
						 dataType,
						 contentType,
						 url,
						 data,
						 async,
						 cache,
						 beforeSend,
						 capture,
						 callBack){
		//如果第一个是对象且不是jQuery对象
		if ($dom && System.isObject($dom) && !$dom.each) {
			D = $dom;
			$dom = undefined;
		}

		data  		= $dom && $dom.attr('data')  			|| D&&D.data  	 	||	{};
		dataType 	= $dom && $dom.attr('dataType') 		|| D&&D.dataType 	||	"html";
		contentType = $dom && $dom.attr('contentType') 		|| D&&D.contentType ||	"application/x-www-form-urlencoded; charset=UTF-8";
		url  		= $dom && $dom.attr('file')  			|| D&&D.url;
		type  		= $dom && $dom.attr('type')  			|| D&&D.type  	 	||	"POST";
		async 		= $dom && eval($dom.attr('async'))			|| D&&D.async ;
		cache 		= $dom && eval($dom.attr('cache')) 			|| D&&D.cache ;
		beforeSend 	= $dom && eval('('+$dom.attr('beforeSend')+')')	|| D&&D.beforeSend	||	0 ;
		capture 	= $dom && eval('('+$dom.attr('capture')+')')	|| D&&D.capture		||	0 ;
		callBack 	= $dom && eval('('+$dom.attr('callBack')+')')	|| D&&D.callBack	||	0 ;

		$.ajax(System.template(url),{
			type : 	  type,
			data :    data,
			async:    async ? true : false,
			cache:    cache ? true : false,
			contentType:contentType,
			dataType: dataType,
			beforeSend:function(jqXHR,PlainObject){
				if(System.isFunction(beforeSend)){
					beforeSend.call(this,jqXHR,PlainObject);
				}
			},
			error:function(){
				throw new Error("Warning :没有取到数据！！！note:也许是file属性的参数错了哦...");
			},
			success: function(content){
				if(System.isFunction(capture)){
					content = capture(content);
				}
				if(callBack && System.isFunction(callBack)){
					callBack.call($dom,content);
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

		getFile(System.merge({
			'url':url,
			'callBack':callBack
		},[D || {}]));

	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-4-7
	 * 名称： Html.include
	 * 功能：html文件里包含另一个文件
	 * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @param 	(Object)D                NO NULL :json 数据
	 * @param 	(Function)D.callBack       	NULL :返回到会调函数里的内容:this: 当前include 节点;content:include 的文件
	 * @return ()
	 * Example：
	 *
	 */
	Html.include=function($dom,D,
						  callBack){
		callBack = D && D.callBack || 0;
		$dom.each(function(){
			var dom =this;
			var file = $(this).attr('file');
			if(file.indexOf('?') != -1){
				location.href = file;
			}
			if(callBack && System.isFunction(callBack)){
				D.callBack =function(content){
					callBack.call(dom,content);
				};

			}

			getFile($(dom),D);

		});

	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-4-7
	 * 修改日期：2016-4-7
	 * 名称： Html.load
	 * 功能：html文件里包含另一个文件,扩充jQuery load方法
	 * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象,跟Html.include方法不一样的地方是 Html.include 调用的是jQuery Ajax方法
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @return ()
	 * Example：
	 *
	 */
	Html.load=function($dom){
		$dom.each(function(){
			var dom =this;
			var $dom =$(this);
			$dom.load(System.template($dom.attr('file')));
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
