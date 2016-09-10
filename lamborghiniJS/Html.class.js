
window[GRN_LHH].run([window],function(window,undefined){
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
	 * 创建日期：2016-1-15
	 * 修改日期：2016-8-26
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

		data  		= $dom && System.eval($dom.attr('data'))			|| D&&D.data  	 	||	{};
		dataType 	= $dom && $dom.attr('dataType') 					|| D&&D.dataType 	||	"html";
		contentType = $dom && $dom.attr('contentType') 					|| D&&D.contentType ||	"application/x-www-form-urlencoded; charset=UTF-8";
		url  		= $dom && $dom.attr('file')  						|| D&&D.url;
		type  		= $dom && $dom.attr('type')  						|| D&&D.type  	 	||	"POST";
		async 		= $dom && eval($dom.attr('async'))					|| D&&D.async ;
		cache 		= $dom && eval($dom.attr('cache')) 					|| D&&D.cache ;
		beforeSend 	= $dom && System.eval($dom.attr('beforeSend'))		|| D&&D.beforeSend	||	0 ;
		capture 	= $dom && System.eval($dom.attr('capture'))			|| D&&D.capture		||	0 ;
		callBack 	= $dom && System.eval($dom.attr('callBack'))		|| D&&D.callBack	||	0 ;

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
					if($dom){
						callBack.call($dom,content);
					}else{
						callBack(content);
					}
				}else{
					if($dom){
						$dom.after(content).remove();
					}
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
	 * @return {*}
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
	 * 创建日期：2016-9-9
	 * 修改日期：2016-9-9
	 * 名称： Html.analysisTpl
	 * 功能：只能在 link,a,img 这几种标签范围内查找，并解析带自定义属性'LAM-VAR=TPL=template'元素的标签
	 * 说明：
	 * 注意：
	 * @return {void}
	 * Example：
	 *
	 */
	Html.analysisTpl=function(){
		var value ='[LAM-VAR=template]';
		var $value = $(value);
		if($value){
			$value.each(function(){
				var $this=$(this);
				var attr=null;
				var tag = this.nodeName;
				switch(tag){
					case "LINK":
					case "A":
						attr = attr || 'href';
					case "IMG":
						attr = attr || 'src';

						value=System.template($this.attr(attr));
						$this.attr(attr,value);



				}

			});
		}

		
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
	 * @return {void}
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
	 * 说明：跟Html.include方法不一样的地方是 这里调用的是jQuery load方法
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
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： Html.renderTagAttributes
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @return (String) 返回属性符串
	 * Example：
	 *
	 */
	Html.renderTagAttributes = function(D){
		var attrs=[];
		for(var key in D){
			if(System.arr_Object_key_has(key)){
				continue;
			}
			attrs.push(' ',key,'="',D[key],'"');
		}
		return attrs.join('');
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-25
	 * 修改日期：2016-9-4
	 * 名称： tag
	 * 功能：动态返回指定的标签
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)name            NO NULL : 标签名称
	 * @param 	(Boolean)single            NULL : 成对标签还是单一标签，false 是成对标签
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String|Array)content      NULL : 内容
	 * @return (String) 返回标签字符串
	 * Example：
	 *
	 */
	Html.tag = function(name,single,D,content){

		if(!System.isString(arguments[0])){
			throw new Error('Warning 缺少标签名称');
			return false;
		}

		if(System.isObject(arguments[1])){
			content = arguments[2];
			D = arguments[1];
			single = false;
		}

		single = single || false;
		D = D || {};

		var tag=[];
		tag.push('<',name);
		//拼接属性
		tag.push(Html.renderTagAttributes(D));

		if(single){
			tag.push(' />');
		}else{
			tag.push('>');
			if(content){
				if(System.isArray(content)){
					tag.push(content.join(''));
				}else{
					tag.push(content);
				}
			}
			tag.push('</',name,'>');
		}
		return tag.join('');
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： scriptFile
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(Object)D        NO NULL : 标签的属性
	 * @param 	(String)src      NO NULL : 路径
	 * @return (String)
	 * Example：
	 *
	 */
	Html.scriptFile=function(D,src){
		if(!D){
			D = {};
		}
		if(src){
			D.src = src;
		}
		D.type = D.type || 'text/javascript';
		return Html.tag('script',D);
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： a
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String)href   			NO  NULL : 连接地址
	 * @return (String)
	 * Example：
	 *
	 */
	Html.linkFile=function(D,href){
		if(!D){
			D = {};
		}
		if(href){
			D.href = href;
		}
		return Html.tag('link',true,D);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： script
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String|Array)content      NULL : 内容
	 * @return (String)
	 * Example：
	 *
	 */
	Html.script=function(D,content){
		D.type = D.type || 'text/javascript';
		return Html.tag('script',D,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： style
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String|Array)content      NULL : 内容
	 * @return (String)
	 * Example：
	 *
	 */
	Html.style=function(D,content){
		D.type = D.type || 'text/css';
		return Html.tag('style',D,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： a
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)href   			NO  NULL : 连接地址
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String|Array)content      NULL : 内容
	 * @return (String)
	 * Example：
	 *
	 */
	Html.a=function(href,D,content){
		D.href = href;
		return Html.tag('a',D,content);
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-4
	 * 名称： img
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)src      NO NULL : 图片 路径
	 * @param 	(Object)D        NO NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.img=function(src,D){
		D.src = src;
		return Html.tag('img',true,D);
	};




	Html.prototype = {
		'contructor':Html,
		'__constructor':function(){},
		'render':function(content){
			System.print(content);
		},

		'html':function(obj){

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
