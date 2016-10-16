
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2016-9-10
 * 名称：组件类
 * 功能：服务于应用层类
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */

window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'BiObject','Component');
	System.merge(null,[{
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-27
		 * 修改日期：2016-10-16
		 * 名称：import
		 * 功能：导入指定的js文件
		 * 说明：System 参数不用传
		 * 注意：
		 * @param   (Array)url 			    NO NULL :要加载js文件
		 * @param   (String)baseUrl 		   NULL :文件路径
		 * @param   (String)suffix 		       NULL :文件后缀名
		 * @param   (Object)X 		       NULL :是否异步加载配置参数
		 * @param   (Boolean)X.xhr 		       NULL :是否异步加载，默认异步
		 * @param   (Object)X.params 		       NULL :异步加载参数
		 * @return  {System} 返回当前对象可以链式调用import方法
		 * Example：
		 */
		'import':function(url,baseUrl,suffix,X){
			suffix = suffix || '.js';
			baseUrl = baseUrl || System.ROOT;
			var xhr =X && System.isPlainObject(X) && System.isBoolean(X.xhr) ? X.xhr : true;
			try {
				if(System.isset(importScripts) && System.isFunction(importScripts)){
					url.each(function(){
						var src=this;
						src+=suffix;
						src = baseUrl ? baseUrl+src : src;
						if(!System.fileExisted(src)){
							importScripts(src);
							if(System.isClassFile(src)){
								System.classes.push(src);
							}
							System.files.push(src);
						}
					});
				}

			} catch (e) {
				if(System.Html.getFiles && System.isFunction(System.Html.getFiles) && xhr){//异步方式加载 script 脚本文件
					var arr=[];
					url.each(function(){
						var src=this;
						src+=suffix;
						src = baseUrl ? baseUrl+src : src;
						arr.push(src);

					});
					System.Html.getFiles(arr,null,System.merge(X && System.isPlainObject(X.params) ? X.params : {},[{
						 'type': 'GET'
						,'dataType':'script'
					}]));
				}else{
					System.Loader.load({
						'baseUrl':baseUrl,
						'js':url,
						'suffix':suffix
					}).print();
				}


			}
			return System;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-6-25
		 * 修改日期：2015-6-25
		 * 名称：get_url_param
		 * 功能：根据指定的url参数获取相对应的参数值
		 * 说明：
		 * 注意：
		 * @param   (String)name            NO NULL :参数名称
		 * @return  {String}
		 *
		 */
		'get_url_param':function(name){
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

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-04-18
		 * 修改日期：2016-04-18
		 * 名称：getRootPath
		 * 功能：获取项目根路径，如： http://localhost:8083/uimcardprj
		 * 说明：
		 * 注意：
		 * @param (void)
		 * @returns {string}
		 */
		'getRootPath':function(){
			//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
			var curWwwPath=window.document.location.href;
			//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			var pathName=window.document.location.pathname;
			var pos=curWwwPath.indexOf(pathName);
			//获取主机地址，如： http://localhost:8083
			var localhostPaht=curWwwPath.substring(0,pos);
			//获取带"/"的项目名，如：/uimcardprj
			var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
			return(localhostPaht+projectName);
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-11-27
		 * 修改日期：2014-11-27
		 * 名称：System.autoCenter
		 * 功能：元素自定垂直居中容器中间
		 * 说明：
		 * 注意：
		 * @param(Number) 		NO NULL : W  容器宽
		 * @param(Number) 		NO NULL : w  元素宽
		 * @param(Number) 		NO NULL : H  容器高
		 * @param(Number) 		NO NULL : h  元素高
		 * @param(Number) 		NULL 	: p  有padding值时
		 * @return (Object) 返回居中位置的xy 坐标
		 * Example：
		 *		System.autoCenter(500,10,500,10,0);
		 */
		'autoCenter':function(W,w,H,h,p){
			p=p || 0;
			W=parseInt(W);
			w=parseInt(w);
			H=parseInt(H);
			h=parseInt(h);
			p=parseInt(p);
			if(!W || !w || !H || !h) return 0;
			return {'x':parseInt((W-w-p)/2),'y':parseInt((H-h-p)/2)};
		}
	}]);

	var __this__=null;

	function Component(){
		System.Basis.extends.call(this,System.BiObject);
		__this__=this;

	}
	/*static mothed
	 ----------------------------------------*/





	Component.prototype = {
		'constructor':Component,


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-14
		 * 修改日期：2016-8-23
		 * 名称：merge
		 * 功能：合并多个对象方法到当前的类里
		 * 说明：默认同名方法名不会被覆盖
		 * 注意：除了语法错误外，如果合并的方法没起作用，是因为与原有方法重名了
		 * @param  (Boolean)deep  		   NULL :是否要深度拷贝对象
		 * @param  (Array)args   		NO NULL :要合并对象的集合
		 * @param  (Boolean)override 	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (Object) 当前对象
		 *		merge([A[,...]],override);
		 * Example：
		 */
		'merge':function(args,override){
			var deep;
			if(System.isBoolean(args)){
				deep = args;
				args = arguments[1];
				override = arguments[2];
			}
			System.merge(deep || false,this,args,override || false);
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：extends
		 * 功能：动态继承对象
		 * 说明：
		 * 注意：
		 * @param  (Boolean)deep  		   NULL :是否要深度拷贝对象
		 * @param   (Object)sub 			NO NULL :
		 * @param   (Object)_super 			NO NULL :
		 * @param  (Boolean)override 	   	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (Object)						:返回继承完父类后的子类对象
		 * Example：
		 */
		'extends': function( sub,_super,override) {
			var deep;
			if(System.isBoolean(sub)){
				deep = sub;
				_super = arguments[1];
				override = arguments[2];
			}
			return System.merge(deep || false,sub,[_super],override || false);

		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：clone
		 * 功能：克隆当前对象
		 * 说明：
		 * 注意：
		 * @return  (Object)				:返回克隆后的新对象
		 * Example：
		 */
		'clone': function() {
			return System.clone(this);

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：isclone
		 * 功能：当前对象是克隆对象吗
		 * 说明：
		 * 注意：
		 *
		 * @returns {boolean}
		 */
		'isclone': function() {
			return System.isclone(this);


		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：isitclone
		 * 功能：当前对象是从它克隆来的？
		 * 说明：
		 * 注意：
		 * @return  (Object)obj				:非克隆对象
		 * @param obj
		 * @returns {boolean}
		 */
		'isitclone': function(obj) {
			if(!this.isclone()){
				throw new Error("Warning: 当前对象不是克隆对象");

			}
			if(System.isclone(obj)){
				throw new Error("Warning: 参数是克隆对象");

			}
			if(obj._hashCode === this._hashCode.split('_')[0]){
				return true;
			}else{
				return false;
			}

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：iscurclone
		 * 功能：是从当前对象克隆过来的吗
		 * 说明：
		 * 注意：
		 * @return  (Object)obj				:克隆对象
		 * @param obj
		 * @returns {boolean}
		 */
		'iscurclone': function(obj) {
			if(this.isclone()){
				throw new Error("Warning: 当前对象是克隆对象");

			}
			if(!System.isclone(obj)){
				throw new Error("Warning: 参数不是是克隆对象");

			}
			if(this._hashCode === obj._hashCode.split('_')[0]){
				return true;
			}else{
				return false;
			}

		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Component对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Component,System.BiObject,1);
	System['Component']=Component;

});


