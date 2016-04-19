
/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：组件类
 * 功能：服务于应用层类
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[REGISTERNAMESPACE].main([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'BiObject','Component');

	var __this__=null;

	function Component(){
		System.Basis.extends.call(this,System.BiObject);
		__this__=this;

		this.super = System.merge(System.super,[this]);


	}
	/*---------------------------------
	 static mothed
	 -------*/




	Component.prototype = {
		'constructor':Component,
		'swap':function(A,B){
			var C;
			C = A;
			A = B;
			B = C;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-31
		 * 修改日期：2015-12-31
		 * 名称：bubbleSort
		 * 功能：冒泡排序
		 * 说明：反序用reverse()方法
		 * 注意：在原数组上排序
		 * @param 	([])arr             			NO NULL :要排序的数组
		 * @param 	(String)key             		NO NULL :排序关键字
		 * @return  ([])
		 * Example：
		 *
		 *
		 */
		'bubbleSort':function(arr,key){
			for(var i= 0, j,len=arr.length;i < len;i++){
				for (j = i+1; j < len; j++) {
					if(arr[i][key]>arr[j][key]){
						var tmp = arr[i];
						arr[i] = arr[j];
						arr[j] = tmp;
					}
				}
			}
			return arr;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2015-10-9
		 * 名称：sort
		 * 功能：排序功能
		 * 说明：反序用reverse()方法
		 * 注意：
		 * @param 	([])arr             			NO NULL :
		 * @param 	(String)key             		NO NULL :
		 * @param 	(Function)sortFn             	   NULL :排序函数
		 * @param 	(Function)error       	   		   NULL :
		 * @return  ([])
		 * Example：
		 *
		 *
		 */
		'sort':function(arr,key,sortFn,error){
			var sorts=function(a, b){
				if(System.isNumber(a) && System.isNumber(b)) {
					if (System.isFloat(a) || System.isFloat(b)) {
						return parseFloat(a) - parseFloat(b);
					} else {
						return parseInt(a) - parseInt(b);
					}
				}else{
					throw new Error('排序元素不是数字型');
					return;
				}
			};

			sortFn = sortFn || sorts;

			var n1,n2;
			arr.sort(function(x,y){
				if(System.isObject(x) && System.isObject(y)){
					n1 = x[key];
					n2 = y[key];
				}else{
					n1 = x;
					n2 = y;
				}

				return sortFn(n1,n2);
			});

			return arr;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-14
		 * 修改日期：2015-8-14
		 * 名称：merge
		 * 功能：合并多个对象方法到当前的类里
		 * 说明：默认同名方法名不会被覆盖
		 * 注意：除了语法错误外，如果合并的方法没起作用，是因为与原有方法重名了
		 * @param  (Array)args   		NO NULL :要合并对象的集合
		 * @param  (Boolean)override 	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (Object) 当前对象
		 *		merge([A[,...]],override);
		 * Example：
		 */
		'merge':function(args,override){
			if(!System.isArray(args)){
				throw new Error('args 不适一个数组');
				return false;
			}
			var len  = args.length;
			if(len < 1){
				throw new Error('没有传参数');
				return false;
			}
			var key;
			var i=0;
			override = override || false;

			for(; i<len; i++){
				for(key in args[i]){
					if(!override && (key in this)) {continue;}
					this[key] = args[i][key];
				}
			}

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
		 * @param   (Object)sub 			NO NULL :
		 * @param   (Object)_super 			NO NULL :
		 * @return  (Object)						:返回继承完父类后的子类对象
		 * Example：
		 */
		'extends': function( sub,_super) {
			return System.merge(sub,[_super]);

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


