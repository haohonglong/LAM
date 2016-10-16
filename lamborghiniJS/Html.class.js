
window[GRN_LHH].run([window,jQuery],function(window,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Dom','Html');
	var sAttribute   = System.Config.render.default.script.Attribute;
	var cAttribute   = System.Config.render.default.css.Attribute;

	var __this__=null;
	function Html(){
		System.Basis.extends.call(this,System.Dom);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		this.symbol=[];


	}


	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-10-1
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
		if ($dom && System.isObject($dom) && System.isPlainObject($dom) && !$dom.each) {
			D = $dom;
			$dom = null;
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
	 * 修改日期：2016-10-14
	 * 名称： Html.getFile
	 * 功能：返回指定的文件
	 * 说明：支持链式调用
	 * 注意：
	 * @param 	(String)  	D.url         	      NULL :请求地址
	 * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @returns {Html|*}
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

		return System.Html;

	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-10-14
	 * 修改日期：2016-10-14
	 * 名称： Html.getFiles
	 * 功能：返回指定的多个文件
	 * 说明：支持链式调用
	 * 注意：
	 * @param 	(Array)  	D.urls         	      NULL :请求地址
	 * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @returns {Html|*}
	 */
	Html.getFiles=function(urls,callBack,D){
		if(!System.isArray(urls)){
			throw new Error("Warning :url 必须是请求文件的路径(数组格式)");
			return;
		}
		System.each(urls,function(){
			if(!System.fileExisted(this)){
				if(System.isClassFile(this)){
					System.classes.push(this);
				}
				System.files.push(this);
				Html.getFile(this,callBack,D);
			}

		});
		return System.Html;

	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-9
	 * 修改日期：2016-10-4
	 * 名称： Html.analysisTpl
	 * 功能：只能在 link,a,img 这几种标签范围内查找，并解析带自定义属性'[data-var=tpl]'元素的标签 或自定义的
	 * 说明：
	 * 注意：
	 * @return {void}
	 * Example：
	 *
	 */
	Html.analysisTpl=function(){
		var custom_attr=System.Config.templat.custom_attr || '[data-var=tpl]';
		var value;
		if(-1 === custom_attr.indexOf('[')){
			value ='['+custom_attr+']';
		}else{
			value = custom_attr;
		}

		var $value = $(value);
		if(!$value){return;}
		$value.each(function(){
			var $this=$(this);
			var attr=null;
			var tag = this.nodeName;
			switch(tag){
				case "LINK":
				case "A":
					attr = attr || 'href';
				case "IMG":
				case "IFRAME":
					attr = attr || 'src';
					value=System.template($this.attr(attr));
					$this.attr(attr,value);



			}

		});


		
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-10-1
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
		//如果第一个是对象且不是jQuery对象
		if ($dom && System.isObject($dom) && System.isPlainObject($dom) && !$dom.each) {
			D = $dom;
			$dom = null;
			getFile(D);
			return;
		}

		if(!$dom) return;

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
	 * @param 	(Object)Attr             	NO NULL : 标签的属性
	 * @return (String) 返回属性符串
	 * Example：
	 *
	 */
	Html.renderTagAttributes = function(Attr){
		if(!Attr || !System.isPlainObject(Attr)) {
			return '';
		}
		var attrs=[];
		for(var key in Attr){
			if(System.arr_Object_key_has(key)){
				continue;
			}
			attrs.push(' ',key,'="',Attr[key],'"');
		}
		return attrs.join('');
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-25
	 * 修改日期：2016-9-11
	 * 名称： tag
	 * 功能：动态返回指定的标签
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)name            NO NULL : 标签名称
	 * @param 	(Boolean)single            NULL : 成对标签还是单一标签，false 是成对标签
	 * @param 	(Object)Attr               NULL : 标签的属性
	 * @param 	(String|Array)content      NULL : 内容
	 * @return (String) 返回标签字符串
	 * Example：
	 *
	 */
	Html.tag = function(name,single,Attr,content){
		var args = arguments;
		var len = args.length;
		if(0 == len || !System.isString(args[0])){
			throw new Error('Warning :缺少标签名称');
			return '';
		}

		switch (len){
			case 4:
				name	 = args[0];
				single 	 = args[1];
				Attr 		 = args[2];
				content  = args[3];
				break;
			case 3:
				if(System.isPlainObject(args[1])){//tag('div',{},'')
					name	 = args[0];
					single 	 = false;
					Attr 		 = args[1];
					content  = args[2];
				}else if(System.isBoolean(args[1])){//tag('img',true,{})
					name	 = args[0];
					single 	 = args[1];
					Attr 		 = args[2];
					content  = null;
				}else{
					throw new Error('Warning :第二参数类型非法！');
					return '';
				}

				break;
			case 2:
				if(System.isString(args[1]) || System.isArray(args[1])){//tag('div',String|Array)
					name	 = args[0];
					single 	 = false;
					Attr 	 = null;
					content  = args[1];
				}else if(System.isPlainObject(args[1])){//tag('div',{})
					name	 = args[0];
					single 	 = false;
					Attr 	 = args[1];
					content  = null;
				}else if(System.isBoolean(args[1])){//tag('img',true)
					name	 = args[0];
					single 	 = args[1];
					Attr 	 = null;
					content  = null;
				}else{
					throw new Error('Warning :第二参数类型非法！');
					return '';
				}

				break;
			case 1:
				name	 = args[0];
				single 	 = false;
				Attr     = null;
				content  = null;
				break;
			default:
				throw new Error('Warning :第二参数类型不合法！');
				return '';

		}

		if(name && !System.isString(name)){
			throw new Error('Warning :name数类型不合法！');
			return '';
		}
		if(single && !System.isBoolean(single)){
			throw new Error('Warning :single数类型不合法！');
			return '';
		}
		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning :Attr数类型不合法！');
			return '';
		}
		if(content && !System.isString(content) && !System.isArray(content)){
			throw new Error('Warning :content数类型不合法！');
			return '';
		}

		var tag=[];
		tag.push('<',name);
		//拼接属性
		if(Attr && System.isObject(Attr)){
			tag.push(Html.renderTagAttributes(Attr));
		}


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
	 * 修改日期：2016-9-11
	 * 名称： scriptFile
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)src      NO NULL : 路径
	 * @param 	(Object)Attr        NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.scriptFile=function(src,Attr){
		if(!System.isString(src)){
			throw new Error('Warning: src数类型不合法！');
			return '';
		}

		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning: Attr数类型不合法！');
			return '';
		}
		Attr = Attr || System.clone(sAttribute);
		Attr.src = src;
		Attr.type = Attr.type || 'text/javascript';
		return Html.tag('script',Attr);
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-11
	 * 名称： a
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)href   		NO  NULL : 连接地址
	 * @param 	(Object)Attr            NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.linkFile=function(href,Attr){
		if(!System.isString(href)){
			throw new Error('Warning: href数类型不合法！');
			return '';
		}

		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning: Attr数类型不合法！');
			return '';
		}
		Attr = Attr || System.clone(cAttribute);
		Attr.href = href;
		return Html.tag('link',true,Attr);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-11
	 * 名称： script
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)content      NO NULL : 内容
	 * @param 	(Object)Attr            NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.script=function(content,Attr){
		if(!System.isString(content)){
			throw new Error('Warning: content数类型不合法！');
			return '';
		}

		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning: src数类型不合法！');
			return '';
		}
		Attr = Attr || {};
		Attr.type = Attr.type || 'text/javascript';
		return Html.tag('script',Attr,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-11
	 * 名称： style
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String|Array)content     NO NULL : 内容
	 * @param 	(Object)Attr             	 NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.style=function(content,Attr){
		if(!System.isString(content)){
			throw new Error('Warning: content数类型不合法！');
			return '';
		}

		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning: src数类型不合法！');
			return '';
		}
		Attr = Attr || {};
		Attr.type = Attr.type || 'text/css';
		return Html.tag('style',Attr,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-11
	 * 名称： a
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)href   			NO  NULL : 连接地址
	 * @param 	(String|Array)content      NULL : 内容
	 * @param 	(Object)Attr               NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.a=function(href,content,Attr){
		var args = arguments;
		var len = args.length;
		if(0 == len || !System.isString(args[0])){
			throw new Error('Warning :路径参数必写');
			return '';
		}

		switch (len){
			case 3:
				href	 = args[0];
				content	 = args[1];
				Attr 	 = args[2];
				break;
			case 2:
				if(System.isString(args[1])){
					href	 = args[0];
					content	 = args[1];
					Attr 	 = {};
				}else if(System.isPlainObject(args[1])){
					href	 = args[0];
					content	 = '';
					Attr 	 = args[1];
				}else{
					throw new Error('Warning: 第二参数类型不合法！');
					return '';
				}

				break;

			default:

		}
		if(!System.isString(href)){
			throw new Error('Warning: href数类型不合法！');
			return '';
		}
		if(content && !System.isString(content) && !System.isArray(content)){
			throw new Error('Warning: content数类型不合法！');
			return '';
		}

		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning: src数类型不合法！');
			return '';
		}
		Attr = Attr || {};
		content = content || '';
		Attr.href = href;
		return Html.tag('a',Attr,content);
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-9-11
	 * 名称： img
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)src      NO NULL : 图片 路径
	 * @param 	(Object)Attr        NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.img=function(src,Attr){
		if(!System.isString(src)){
			throw new Error('Warning: src数类型不合法！');
			return '';
		}
		if(Attr && !System.isPlainObject(Attr)){
			throw new Error('Warning: src数类型不合法！');
			return '';
		}
		Attr = Attr || {};
		Attr.src = src;
		return Html.tag('img',true,Attr);
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
