
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
	 * 说明：
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @param 	(String)type             NO NULL :
	 * @param 	(Boolean)async              NULL :是否异步加载
	 * @param 	(Function)callBack       	NULL :返回到会调函数里的内容
	 * @return ()
	 * Example：
	 *
	 */
	function getFile($dom,type,async,callBack){
		type = type || "GET";
		var dataType = $dom.attr('type') || "html";
		$.ajax({
			type: type,
			url: $dom.attr('file'),
			async: async ? true : false,
			dataType: dataType,
			error:function(){
				throw new Error("Warning :也许是file属性的参数错了哦...");
			},
			success: function(content){
				if(callBack && System.isFunction(callBack)){
					callBack(content);
				}else{
					$dom.after(content).remove();
				}

			}
		});
	}

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2016-1-15
	 * 名称： Html.include
	 * 功能：html文件里包含另一个文件
	 * 说明：
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @param 	(String)type             NO NULL :
	 * @param 	(Boolean)async           	NULL :是否异步加载
	 * @param 	(Function)callBack       	NULL :返回到会调函数里的内容:this: 当前include 节点;content:include 的文件
	 * @return ()
	 * Example：
	 *
	 */
	Html.include=function($dom,type,async,callBack){
		$dom.each(function(){
			var dom =this;
			if(callBack && System.isFunction(callBack)){
				getFile($(dom),type,async,function(content){
					callBack.call(dom,content);
				});
			}else{
				getFile($(dom),type,async);
			}

		});

	};

	Html.prototype = {
		'constructor':Html,
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
