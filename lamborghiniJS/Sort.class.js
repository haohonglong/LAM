
window[REGISTERNAMESPACE].main([window],function(window,undefined){
	var System=this;
	System.is(System,'Helper','Sort');

	var __this__=null;


	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-9
	 * 修改日期：2015-10-9
	 * 名称：sort
	 * 功能：排序的参数是对象时
	 * 说明：影响当前数组，不会返回新数组 排序方式 默认从小到大 ,要从大到小用 reverse()方法
	 * 注意：
	 * @param 	([])arr            				NO NULL :
	 * @param 	(String)key             		NO NULL :
	 * @return  ([])
	 * Example：
	 *
	 *
	 */
	function sort(arr,key){

		var sorts=function(a, b){
			if(System.isFloat(a) || System.isFloat(b)){
				return parseFloat(a) - parseFloat(b);
			}else{
				return parseInt(a) 	 - parseInt(b);
			}

		};

		arr.sort(function(x,y){

			if(System.isObject(x) && System.isObject(y)){
				return sorts(x[key],y[key]);

			}else{
				return sorts(x,y);
			}


		});
		return arr;
	}


	function Sort(D){
		System.Basis.extends.call(this,System.Helper);
		__this__=this;
		var defaults={
			'data':null,
			'sortKey':null
		};

		var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

		this.init = init;

		this.data 		= init.data 		|| null;
		this.sortKey 	= init.sortKey  	|| null;
		this.arr=[];





	}

	Sort.prototype = {
		'constructor':Sort,

		'setData':function(s){this.arr.push(s);},
		'getData':function(){return this.arr.join('');},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2015-10-9
		 * 名称：reconstructed
		 * 功能：初始化自动分类
		 * 说明：
		 * 注意：
		 * @param 	([])data            				NO NULL :
		 * @return  (Sort)
		 * Example：
		 *
		 */
		'reconstructed':function(){



			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2015-10-9
		 * 名称：html
		 * 功能：输出html内容
		 * 说明：
		 * 注意：
		 * @param 	([])arr            				NULL :
		 * @return  (Sort)
		 * Example：
		 *
		 */
		'html':function(arr){
			var __this__ = this;
			arr = arr || this.data;

			arr.each(function(){
				__this__.setData('<a href="'+this['url']+'" target="_blank" title="'+this['url']+'" class="before">{'+this.name+' ｜ '+this.pice+'}</a>');

			});
			return this;
		},



		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2015-10-9
		 * 名称：sorts
		 * 功能：初始化状态
		 * 说明：排序方式 默认从小到大
		 * 注意：
		 * @param 	(String)keyword             	NO NULL : 关键字
		 * @return  ([]) 返回克隆后的新数组
		 * Example：
		 *
		 */
		'sorts':function(sortKey){

			if(!System.isArray(this.data)){return this;}

			sortKey   = sortKey 	|| this.sortKey;

			var arr = this.data.clone();

			sort(arr,sortKey);//排序后


			return arr;
		},



		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Sort对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	};

	System.extends(Sort,System.Helper,1);
	System['Sort'] = Sort;



});




