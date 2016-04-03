/*
 * 标准 : 类及成员名称一旦定义不能轻易修改，如若修改就要升级版本！如若在遇到与第三方插件发生冲突要修改，请参考基类里的说明文档。
 *		
 * 
 */

/**
 * LamborghiniJS 0.3 pre
 * @author：lhh
 * 创建日期:2015/3/20	
 * 修改日期:2015/7/15	
 * 名称：基类
 * 功能：服务于派生类
 * 命名空间接口定义: var LHH_NAMESPACE_20150715_='interfaceName';
 * 命名空间接口调用: window[LHH_NAMESPACE_20150715_]  或者 W['interfaceName']
 * 说明 : 成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
 *        命名空间接口的设计是灵活的，修改接口名不影响库文件里的内核代码及类接口。
 *        命名空间接口设计的宗旨是:只要修改一处就可搞定一切与第三方插件的冲突。
 *        与第三方插件发生冲突时解决方法:  修改变量 'LHH_NAMESPACE_20150715_' 里的值 即可。'LHH_NAMESPACE_20150715_' 是命名空间接口的密钥 作用是定义命名空间。
 * 	      调用基类的静态成员方法:(调用接口.静态成员)。
 * 	      这个基类不允许被直接实例化，要实例化它的派生类。
 * 	      页面中要引入'config.js'这个文件,因为这个文件里已经引入了'Basis.class.js'文件,所以不用在页面中再引入'Basis.class.js'文件了。
 * 	      'LHH_NAMESPACE_20150715_' 的设定也在'config.js'里设定,不要修改这里的 'LHH_NAMESPACE_20150715_' 的值。
 * 	      window['interfaceName'].app :这个对象代表当前实例化后的对象
 * 	      
 * note : 
 * 		  
 *		
 * 
 */


if(!LHH_NAMESPACE_20150715_){
	var LHH_NAMESPACE_20150715_='System';
	
}
(function(global,namespace,factory,undefined){
	'use strict';
	if(global[namespace]){
		return;
	}
	global['LAMJS'] = global['LamborghiniJS_20150910123700_'] = global[namespace] = factory(global,namespace);

})(typeof window !== "undefined" ? window : this,LHH_NAMESPACE_20150715_,function(W,namespace,undefined){
	'use strict';
	var version="1.0.9";

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.9.28
	 * 修改日期：2014.9.28
	 * 名称：private isType
	 * 功能：判断数据是什么类型的
	 * 说明：
	 * 注意：
	 * @param   (var)type 			NO NULL :
	 * 调用方式：isType(type)(value);
	 * @return  (Function)
	 * Example：isType('Array')(['aaa']);
	 */
	function isType(type) {
		return function(obj) {
			return {}.toString.call(obj) == "[object " + type + "]";
		};
	}

	var isObject = isType("Object");
	var isString = isType("String");
	var isArray = Array.isArray || isType("Array");
	var isFunction = isType("Function");

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.10.28
	 * 修改日期：2015.10.28
	 * 名称：isFloat
	 * 功能：判断是否是浮点数
	 * 说明：
	 * 注意：
	 * @param   (void)
	 * 调用方式：
	 * @return  (Boolean)
	 * Example：isFloat(2.5)
	 */
	var isFloat=function(n){
		if(n.toString().indexOf('.') != -1){
			return true;
		}
		return false;
	};




	if(!alert){
		alert=console.log;
	}
	var Interface;
	var MySystem = {};
	var Function;
	//对象里禁用的关键字
	var arr_Object_key=['length','list'];

	if(window){
		Function = window.Function;
		Date     = window.Date	;
		String   = window.String;
		Array    = window.Array	;

	}else{
		Function = {};
		Date     = {};
		String   = {};
		Array    = {};
	}





	//函数在原型里定义一个方法
	Function.prototype.method=function(name,fn){
		if(!this.prototype[name]){
			this.prototype[name] = fn;
		}
		return this;
	};


	/**
	 *
	 * 对Date的扩展，将 Date 转化为指定格式的String
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * 例子：
	 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	 * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	 *
	 *
	 */

	if(!Date.prototype.format){
		Date.method('format',function(fmt){
			var o = {
				"M+" : this.getMonth()+1,                 //月份
				"d+" : this.getDate(),                    //日
				"h+" : this.getHours(),                   //小时
				"m+" : this.getMinutes(),                 //分
				"s+" : this.getSeconds(),                 //秒
				"q+" : Math.floor((this.getMonth()+3)/3), //季度
				"S"  : this.getMilliseconds()             //毫秒
			};
			if(/(y+)/.test(fmt))
				fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("("+ k +")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			return fmt;
		});
	}



	if(!String.prototype.trim){
		String.method('trim',function(){
			return this.replace(/(^\s+)|\s+$/g,'');
		});
	}


	/**
	 *
	 * @author：lhh
	 * 创建日期：2014-12-22
	 * 修改日期：2015-10-28
	 * 名称：filterChar
	 * 功能：过滤所有字符串返回数字
	 * 说明：
	 * 注意：
	 * @param(void)
	 * @return (Number)
	 * Example：String.filterChar()
	 */
	if(!String.prototype.filterChar){
		String.method('filterChar',function(){
			return Number(this.replace(/[^\d]*/ig,""));
		});
	}

	/**
	 *
	 * @author：lhh
	 * 创建日期：2014-12-22
	 * 修改日期：2015-10-28
	 * 名称：findStr
	 * 功能：查找匹配的字符
	 * 说明：
	 * 注意：
	 * @return (String)
	 * Example：String.findStr()
	 */
	if(!String.prototype.findStr){
		String.method('findStr',function(){
			if(" " === this) {
				return false;
			}
			return this.match(/[^\d]*/i);
		});
	}

	/**
	 *
	 * @author：lhh
	 * 创建日期：2016-3-28
	 * 修改日期：2016-3-28
	 * 名称：firstToUpperCase
	 * 功能：首字母大写
	 * 说明：
	 * 注意：
	 * @return (String)
	 * Example：String.firstToUpperCase()
	 */
	if(!String.prototype.firstToUpperCase){
		String.method('firstToUpperCase',function(){
			return this.replace(/(\w)/,function(v){return v.toUpperCase()});
		});
	}



	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-12-22
	 * 修改日期：2015-10-28
	 * 名称：compareTwoStr
	 * 功能：比较俩个字符是否相等
	 * 说明：
	 * 注意：
	 * @param   (String)s 			NO NULL :要比较的字符串
	 * @param   (Boolean)
	 * Example：String.compareTwoStr('aaa')
	 */
	if(!String.prototype.compareTwoStr){
		String.method('compareTwoStr',function(s){
			if(" " === this || " " === s) {
				return false;
			}
			var s1,s2;
			s1=this.match(/[^\d]*/i);
			s2=s.match(/[^\d]*/i);
			if(s1.length === s2.length && s1 === s2) {
				return true;
			}else {
				return false;
			}
		});
	}


	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-12-22
	 * 修改日期：2015-10-28
	 * 名称：indexOf
	 * 功能：返回一个数组元素的下标，返回下标
	 * 说明：
	 * 注意：
	 * @param   (val)d
	 * @returns   (Number)
	 * Example：
	 */
	if(!Array.prototype.indexOf){
		Array.method('indexOf',function(d){
			for(var i=0,len=this.length;i < len;i++){
				if(this[i] === d)
					return i;
			}
			return -1;
		});
	}

	/**
	 * 返回一个数组元素的下标，返回下标
	 * @param val
	 * @returns {Number}
	 */

	if(!Array.prototype.lastIndexOf){
		Array.method('lastIndexOf',function(d){
			for(var i=this.length-1;i>=0;i--){
				if(this[i] === d)
					return i;
			}
			return -1;
		});
	}
	/**
	 * 根据内容删除一个元素，返回数组
	 * @param val
	 */
	if(!Array.prototype.remove){
		Array.method('remove',function(d){
			var index = this.indexOf(d);
			if (index > -1) {
				this.splice(index, 1);
			}
		});
	}


	/**
	 * 数组根据下标删除一个元素，返回一个删除后的数组
	 * @param n
	 * @returns
	 */
	if(!Array.prototype.del){
		Array.method('del',function(n){//n表示第几项，从0开始算起。
			//prototype为对象原型，注意这里为对象增加自定义方法的方法。
			if(n<0) {  //如果n<0，则不进行任何操作。
				return this;
			}else {
				return this.slice(0, n).concat(this.slice(n + 1, this.length));
			}
			/*
			 concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
			 　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
			 　　　　　　组成的新数组，这中间，刚好少了第n项。
			 slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
			 */
		});
	}



	if(!Array.prototype.contains){
		Array.method('contains',function(d){
			return this.indexOf(d) != -1;
		});
	}

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.10.27
	 * 修改日期：2015.10.27
	 * 名称：clone
	 * 功能：克隆数组
	 * 说明：跟copy 是等效的 推荐用clone
	 * 注意：
	 * @param   (void)
	 * 调用方式：
	 * @return  (Array)返回克隆后的数组
	 * Example：[].clone();
	 */

	if(!Array.prototype.clone){
		Array.method('clone',function(){
			if(this.concat){
				return this.concat();
			}
			return this.copy();

		});
	}

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.2.28
	 * 修改日期：2015.2.28
	 * 名称：copy
	 * 功能：复制数组
	 * 说明：跟clone 是等效的
	 * 注意：
	 * @param   (void)
	 * 调用方式：
	 * @return  (Array)返回复制后的数组
	 * Example：[].copy();
	 */
	if(!Array.prototype.copy){
		Array.method('copy',function(){
			var arr=[];
			for(var i=0,l=this.length;i<l;i++){
				arr.push(this[i]);
			}
			return arr;
		});
	}

	if(!Array.prototype.insertAt){
		Array.method('insertAt',function(d,i){
			this.splice(i,0,d);
		});
	}



	if(!Array.prototype.insertBefore){
		Array.method('insertBefore',function(d,d2){
			var i=this.indexOf(d2);
			if(i== -1)
				this.push(d);
			else
				this.splice(i,0,d);
		});
	}



	if(!Array.prototype.removeAt){
		Array.method('removeAt',function(i){
			this.splice(i,1);
		});
	}


	if(!Array.prototype.remove){
		Array.method('remove',function(d){
			var i=this.indexOf(d);
			if(i!= -1)
				this.splice(i,1);
		});
	}

	if(!Array.prototype.each){
		Array.method('each',function(arr,fn){
			if(1 === arguments.length){
				arr = this;
				fn = arguments[0]
			}else{
				arr = arr || this;
			}

			if(!isFunction(fn)){
				return arr;
			}

			var item;
			for(var i=0,len=arr.length;i<len;++i) {
				item=arr[i];
				if(item && fn.call(item, i, item)){
					break;
				}
			}

			return arr;
		});
	}

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.2.28
	 * 修改日期：2015.2.28
	 * 名称：merge
	 * 功能：合并数组
	 * 说明：
	 * 注意：
	 * @param   (Array)arr				NO NULL : //要被合并的数组
	 * @param   (Boolean)override 		   NULL : //是否覆盖相同的值,true : 覆盖；false : 不覆盖；默认不覆盖
	 * 调用方式：
	 * @return  (Array)返回复制后的数组
	 * Example：下面俩种方式任选其一
	 * 		a.merge(b).merge(c).merge(e).merge(f);
	 * 		a.merge(b.merge(c.merge(d.merge(e.merge(f)))));
	 */
	if(!Array.prototype.merge){
		Array.method('merge',function(arr,override){

			if(!isArray(arr)){
				throw new Error(['Warning',arr,'不是数组'].join(' '));
				return;
			}
			if(!override && this.concat){
				return this.concat(arr);
			}
			var i=0;
			var a   = this.clone();
			var len = arr.length;
			//被合并的数组里是否与当前数组重复了
			var find =function(v){
				var i = a.length;
				if(i > 0){
					while ( --i ) {
						if(a[i] === v){
							return true;
						}
					}
				}

				return false;
			};

			while ( i< len ) {
				if(override && find(arr[i])){
					i++;
					continue;
				}
				a.push(arr[i]);
				i++;
			}
			return a;
		});
	}



	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.2.28
	 * 修改日期：2015.2.28
	 * 名称：filter
	 * 功能：根据回调条件过滤数组里的数据
	 * 说明：
	 * 注意：
	 * @param   (Function)fn 		NO NULL :
	 * @param   (Object)D			NO NULL :
	 * 调用方式：
	 * @return  (Array)返回过滤后符合条件的元素
	 * Example：
	 */
	if(!Array.prototype.filter){
		Array.method('filter',function(fn,D){
			if(!isFunction(fn)){
				return this;
			}
			D = D || W;
			var a=[];
			for(var i=0,len=this.length;i<len;++i) {
				if(!fn.call(D, this[i], i, this)){
					continue;
				}
				a.push(this[i]);
			}
			return a;
		});
	}
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.11.12
	 * 修改日期：2015.11.12
	 * 名称：arrayMin
	 * 功能：找出数组里最小的数字
	 * 说明：
	 * 注意：
	 * 调用方式：
	 * @return  (Number)
	 * Example：
	 */
	if(!Array.prototype.arrayMin){
		Array.method('arrayMin',function(){
			var i = this.length,
				min = this[0];

			while (i--) {
				if (this[i] < min) {
					min = this[i];
				}
			}
			return min;
		});
	}

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.11.12
	 * 修改日期：2015.11.12
	 * 名称：arrayMax
	 * 功能：找出数组里最大的数字
	 * 说明：
	 * 注意：
	 * 调用方式：
	 * @return  (Number)
	 * Example：
	 */
	if(!Array.prototype.arrayMax){
		Array.method('arrayMax',function(){
			var i = this.length,
				max = this[0];

			while (i--) {
				if (this[i] > max) {
					max = this[i];
				}
			}
			return max;
		});
	}














	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-27
	 * 修改日期：2015-8-27
	 * 名称：getObjectLength
	 * 功能：获取对象成员的长度
	 * 说明：
	 * 注意：这里的this是调用时改变成指定的对象
	 * @return  (Number) 返回对象里成员数量
	 * Example：
	 */
	var getObjectLength=function(){
		if(Object.keys){
			return Object.keys(this).length;
		}

		var n=0;
		var k;
		for(k in this){
			n++;
		}
		return n-1;
	};


	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-9-1
	 * 修改日期：2015-9-1
	 * 名称： arr_Object_key_has
	 * 功能：检查 arr_Object_key 这个数组里是否有相同的关键字。有返回true 否则 false;
	 * 说明：
	 * 注意：
	 * @param 	(String)key             	NO NULL : 关键字
	 * @return (Boolean)
	 * Example：
	 *
	 */
	var arr_Object_key_has=function(key){
		arr_Object_key = MySystem.arr_Object_key || arr_Object_key;
		if(arr_Object_key.indexOf(key) != -1){
			return true;
		}else{
			return false;
		}
	};



	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.8.26
	 * 修改日期：2015.8.26
	 * 名称：length
	 * 功能：Object 原型上添加 length 方法
	 * 说明：
	 * 注意：与jQuery 有冲突
	 * 调用方式：
	 * @return  (Number) 返回对象里的成员个数
	 * Example：
	 */
	//if(!Object.prototype.length){
	//	Object.method('length',function(){
	//		return getObjectLength.call(this);
	//	});
	//}


	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-26
	 * 修改日期：2015-8-26
	 * 名称： list
	 * 功能：递归对象
	 * 说明：如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象位置
	 * 注意：与jQuery 有冲突
	 * @param 	(Object)D             	NO NULL : 对象
	 * @param 	(Funtion)fn             NO NULL : 回调方法
	 * @return ()
	 * Example：
	 *
	 */
	//if(!Object.prototype.list){
	//	Object.method('list',function(fn){
	//		if(!isObject(this)){
	//			return this;
	//		}
	//		for(var k in this){
	//			if(this[k] && this[k].list){
	//				this[k].list(fn);
	//			}
	//			if(isFunction(fn)){
	//				if(arr_Object_key_has(k)){
	//					continue;
	//				}else{
	//					fn.call(this,k,this[k]);
	//				}
    //
    //
	//			}
	//		}
	//	});
	//}







	// Used for trimming whitespace
	var trimLeft = /^\s+/,
		trimRight = /\s+$/,

	// Save a reference to some core methods

		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		push = Array.prototype.push,
		slice = Array.prototype.slice,
		trim = String.prototype.trim,
		indexOf = Array.prototype.indexOf;





	(function(){
		var READ=1;
		var WRITE=2;
		var READ_WRITE=3;
		//添加属性
		Function.method('addProperty',function(sName,nReadWrite){
			nReadWrite=nReadWrite || READ_WRITE;
			var capitalized=sName.charAt(0).toUpperCase()+sName.substr(1);
			if(nReadWrite & READ)
				this.prototype["get"+capitalized]=new Function("","return this._"+sName+";");
			if(nReadWrite & WRITE)
				this.prototype["set"+capitalized]=new Function(sName,"this._"+sName+" = "+sName+";");
		});
	})();







	/**
	 *
	 * @author: lhh
	 * 创建日期：2014/12/10
	 * 修改日期：2014/12/10
	 * 名称：private (Number) contains
	 * 功能：检查一个对象是否包含在另外一个对象中的方法，contains方法。MSIE和FireFox分别提供了检查的方法
	 * 注意：这个函数在IE中不支持,但文档上却写在在FF中原本为4的结果,在IE中为2
	 * 说明：ExtJS的源码用到的方法
	 * @param   parentNode() 	NO NULL :
	 * @param 	childNode()     NO NULL :
	 * Example：
	 *
	 */
	function contains(parentNode, childNode){
		if (parentNode.contains) {
			return parentNode != childNode && parentNode.contains(childNode);
		} else {
			return !!(parentNode.compareDocumentPosition(childNode) & 16);
		}
	}
	function isEmptyObject( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;

	}
	function arr_isEmpty(arr){
		if(!isArray(arr)){
			throw new Error('Warning arr 不是一个数组');
		}else{

			if(!arr.length){
				return true
			}else{
				return false;
			}
		}

	}
	function error( msg ) {
		//try {
		throw new Error(msg);
		//} catch (e) {
		//	alert(e.name + ": " + e.message );
		//}

	}
	//检测是否是数字
	function isNumeric(n){
		return !isNaN(n);
	}
	function isset_(s){
		return (typeof s != "undefined" &&  s != null);
	}

	function empty_(s) {
		return !(isset(s) && s.toString().trim() != '');
	}

	function isset() {
		//  discuss at: http://phpjs.org/functions/isset/
		// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// improved by: FremyCompany
		// improved by: Onno Marsman
		// improved by: Rafał Kukawski
		//   example 1: isset( undefined, true);
		//   returns 1: false
		//   example 2: isset( 'Kevin van Zonneveld' );
		//   returns 2: true

		var a = arguments,
			l = a.length,
			i = 0,
			undef;

		if (l === 0) {
			throw new Error('Warning Empty isset');
		}

		while (i !== l) {
			if (a[i] === undef || a[i] === null) {
				return false;
			}
			i++;
		}
		return true;
	}
	function empty(mixed_var) {
		//  discuss at: http://phpjs.org/functions/empty/
		// original by: Philippe Baumann
		//    input by: Onno Marsman
		//    input by: LH
		//    input by: Stoyan Kyosev (http://www.svest.org/)
		// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// improved by: Onno Marsman
		// improved by: Francesco
		// improved by: Marc Jansen
		// improved by: Rafal Kukawski
		//   example 1: empty(null);
		//   returns 1: true
		//   example 2: empty(undefined);
		//   returns 2: true
		//   example 3: empty([]);
		//   returns 3: true
		//   example 4: empty({});
		//   returns 4: true
		//   example 5: empty({'aFunc' : function () { alert('humpty'); } });
		//   returns 5: false

		var undef, key, i, len;
		var emptyValues = [undef, null, false, 0, '', '0'];

		for (i = 0, len = emptyValues.length; i < len; i++) {
			if (mixed_var === emptyValues[i]) {
				return true;
			}
		}

		if (typeof mixed_var === 'object') {
			for (key in mixed_var) {
				//if (mixed_var.hasOwnProperty(key)) {
				return false;
				//}
			}
			return true;
		}

		return false;
	}

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-9-16
	 * 修改日期：2015-9-16
	 * 名称：prints
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param   (Array)arguments    NO NULL :传入的参数
	 * @return  (Array)						:
	 * Example：
	 *
	 */
	function prints(){
		var i,arg=arguments,len=arg.length,arr=[];
		for(i=0;i<len;i++){
			arr.push(arg[i]);
		}
		return arr;
	}



	/**
	 * @author: lhh
	 * 产品介绍：所有类的接口
	 * 创建日期：2015-9-6
	 * 修改日期：2015-9-6
	 * 名称：Interface
	 * 功能：

	 * 说明：
	 * 注意：
	 */
	Interface= {
		'Basis': {},
		'Component': {},
		'Helper': {},
		'Controller': {},
		'Model': {},
		'View': {},
		'Validation':{},
		'Html': {},
		'Browser': {},
		'Template': {},
		'Event': {},
		'Dom': {},
		'BiObject': {},
		'Cookie': {},
		'Drag': {},
		'Drag_xy': {},
		'Error': {},
		'FakeSelect': {},
		'Fsc': {},
		'Linklist': {},
		'PopupLayer': {},
		'Roll': {},
		'Layout': {},
		'AutoLayout': {},
		'Slider': {},
		'Sport': {},
		'Tab': {},
		'Tools': {},//(single)
		'Css': {},
		'FindParentObject': {},
		'Widget': {},
		'Tree': {},
		'Sort': {},
		'EditTables': {},
		'Html5': {
			'Svg': {},
			'Canvas': {},
			'CanvasForm': {}//基本形
		}
	};

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2015-7-10
	 * 名称：MySystem
	 * 功能：
	 * 属性列表:
	 *			guid
	 *			app
	 *			classes
	 * 方法列表:
	 *			isset
	 *			empty
	 *			isNumeric
	 *			error
	 *			isType
	 *			isObject
	 *			isString
	 *			isArray
	 *			isFunction
	 *			contains
	 *			main
	 *			config
	 *			define
	 *			print
	 *			import
	 *			length
	 *			proxy
	 *			isEmptyObject
	 *			arr_isEmpty
	 *			wait
	 *			queues
	 *			putIndexGetObjectTheValue
	 *			list
	 *			is
	 *			log
	 *			defined
	 *			merge
	 *			clone
	 *			extends
	 *			extend
	 *			extends_f
	 *			override
	 *			autoCenter
	 *			isClassFile
	 *			template
	 *			findTpl
	 *			replaceTpl
	 * 对象列表:
	 *			Function
	 *			Date
	 *			String
	 *			Array
	 * 说明：MySystem对象已继承了上面定义对象里的所有方法
	 * 注意：
	 */
	MySystem={
		"version": version,
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-5-27
		 * 名称：MySystem.main
		 * 功能：程序主方法
		 * 说明：可传多个参数第一个必须是数组，在回调里接收的参数跟传来的参数一一对应
		 * 注意：
		 * @param   (Array)args 			NO NULL :传入的参数
		 * @param   (Function)callback 		NO NULL :调用main 方法要执行的操作
		 * @return  (MySystem | )						:
		 * Example：
		 */
		'main':function(args,callback){
			if(1 === arguments.length){
				if (isFunction(arguments[0]) ) {
					return arguments[0].call(this);
				}else{
					throw new Error('Warning 参数必须要有一个 Function 类型');
					return this;
				}
			}


			if(!isArray(args)){
				throw new Error('Warning args 不是一个数组');
				return this;
			}
			if (!isFunction(callback) ) {
				throw new Error('Warning callback 不是一个函数');
				return this;
			}

			return callback.apply(this,args);




		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-21
		 * 修改日期：2016-1-21
		 * 名称：MySystem.run
		 * 功能：在main方法功能上,扩充改变创建标签机制的功能, 用document.createElement()
		 * 说明：可传多个参数第一个必须是数组，在回调里接收的参数跟传来的参数一一对应
		 * 注意：
		 * @param   (Array)args 			NO NULL :传入的参数
		 * @param   (Function)callback 		NO NULL :调用main 方法要执行的操作
		 * @return  (MySystem | )						:
		 * Example：
		 */
		'run':function(args,callback){
			if(1 === arguments.length){
				return this.use().main(arguments[0]);
			}else{
				return this.use().main(args,callback);
			}

		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-18
		 * 修改日期：2016-3-22
		 * 名称：MySystem.use
		 * 功能：用createElement 创建标签并且设为异步
		 * 说明：
		 * 注意：
		 * @return  (MySystem)						:
		 * Example：
		 */
		'use':function(){
			this.Config.use();
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-18
		 * 修改日期：2016-3-22
		 * 名称：MySystem.unuse
		 * 功能：用document.write() 创建标签并且设为非异步
		 * 说明：
		 * 注意：
		 * @return  (MySystem)						:
		 * Example：
		 */
		'unuse':function(){
			this.Config.unuse();
			return this;
		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-11-22
		 * 修改日期：2015-11-24
		 * 名称：MySystem.modules
		 * 功能：模块
		 * 说明：
		 * 注意：
		 * Example：
		 */
		'modules':{
			/**
			 * @author: lhh
			 * 产品介绍：
			 * 创建日期：2015-11-22
			 * 修改日期：2015-11-24
			 * 名称：MySystem.modules.exports
			 * 功能：
			 * 说明：
			 * 注意：
			 * Example：
			 */
			'exports':{}
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-15
		 * 修改日期：2015-9-15
		 * 名称：MySystem.config
		 * 功能：配置类加载文件
		 * 说明：
		 * 注意：
		 * @param   (Object)D 			NO NULL :传入的参数
		 * @return  (voide)						:
		 * Example：
		 */
		'config':function(D){},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-21
		 * 修改日期：2015-9-21
		 * 名称：MySystem.define
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param   (Object)D 			NO NULL :传入的参数
		 * @return  (voide)						:
		 * Example：
		 */
		'define':function(D){},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-16
		 * 修改日期：2016-2-23
		 * 名称：MySystem.print
		 * 功能：输出
		 * 说明：
		 * 注意：
		 * @param   (Object)D 			NO NULL :传入的参数
		 * @return  (voide)						:
		 * Example：
		 * 		MySystem.print('s'[,1,'a',...])
		 */
		'print':function(){
			var arr=prints.apply(Array,arguments);

			document.write(arr.join(' '));
		},



		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-27
		 * 修改日期：2015-8-27
		 * 名称：import
		 * 功能：导入指定的js文件
		 * 说明：System 参数不用传
		 * 注意：
		 * @param   (Array)url 			    NO NULL :要加载js文件
		 * @param   (String)baseUrl 		       NULL :文件路径
		 * @param   (String)suffix 		       NULL :文件后缀名
		 * @param   (Object)System 			   NULL :命名空间
		 * @return  (Object) this 返回当前对象可以链式调用import方法
		 * Example：
		 */
		'import':function(url,baseUrl,suffix,System){
			suffix = suffix || '.js';
			try {
				if(importScripts){
					url.each(function(){
						var e=this;
						e+=suffix;
						baseUrl ? importScripts(baseUrl+e) : importScripts(e);
					});
				}


			} catch (e) {
				//throw new Error(e.message);
				System = System || this;
				System.Loadcommon.load({
					'baseUrl':baseUrl || null,
					'js':url,
					'suffix':suffix
				}).print();
			}
			return this;
		},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2014-12-22
		 * 名称：wait
		 * 功能：每隔规定的时间数再去调用传进来的函数
		 * 说明：
		 * 注意：
		 * @param   (Function)fn 			NO NULL :
		 * @param   (Number)time 			NO NULL :
		 * Example：
		 */
		'wait':function(fn,time){

			if(isFunction(fn)) {
				time=time || 3000;
				if(fn.timer){
					clearTimeout(fn.timer);
				}
				fn.timer = setTimeout(fn, time);
			}
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-20
		 * 修改日期：2014-12-20
		 * 名称：queues
		 * 功能：队列
		 * 说明：
		 * 注意：
		 * @param   (Array)arr          NO NULL :
		 * @param   (Number)n           NO NULL :算时间差的值
		 * @param   (Function)fn        NO NULL :
		 * Example：
		 */
		'queues':function(arr,n,fn){
			if(!isFunction(fn)) return -1;
			var time=0;
			for(var i=0,len=arr.length; i<len; i++){
				time = n*i;
				fn.call(arr[i],time,i);

			}
		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：length
		 * 功能：获取对象成员的长度
		 * 说明：
		 * 注意：
		 * @param   (Object)D 			   NULL :指定的对象
		 * @return  (Number) 返回成员数量
		 * Example：MySystem.length(D)
		 */

		'length':function(D){
			return getObjectLength.call(D);
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：proxy
		 * 功能：改变指定对象里的this指向
		 * 说明：
		 * 注意：
		 * @param   (Function)fn       NO NULL :将要被改变作用域的函数
		 * @param   (Object)context    NO NULL :一个object，那个函数的作用域会被设置到这个object上来。
		 * @return  ()
		 * Example：
		 */
		'proxy': function( fn, context ) {
			if (isString(context)){
				var tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			var args = slice.call( arguments, 2 ),
				proxy = function() {
					return fn.apply( context, args.concat( slice.call( arguments ) ) );
				};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || proxy.guid || MySystem.guid++;

			return proxy;
		},
		/**
		 *
		 * @author：lhh
		 * 功能：输入一个键值对应的个数返回对应的值
		 * 名称：putIndexGetObjectTheValue
		 * 创建日期：2014.6.15
		 * 修改日期：2016.2.25
		 * @param (Object)D 		NO NULL :
		 * @param (int)n 			NO NULL :
		 * @return ()
		 */
		'putIndexGetObjectTheValue':function(D,n){
			var i= 0,k;
			//输入的一定是对象和数字
			if(isObject(D) && isNumeric(n)){
				//防止输入的下标大于对象的长度
				if(getObjectLength.call(D) >= n){
					for(k in D){
						if(i==n){
							return D[k];
						}else{
							i++;
						}
					}
				}

			}
			return false;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2015-8-26
		 * 名称： list
		 * 功能：递归对象
		 * 说明：如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象位置
		 * 注意：
		 * @param 	(Object)D             	NO NULL : 对象
		 * @param 	(Funtion)fn             NO NULL : 回调方法
		 * @return ()
		 * Example：
		 *
		 */
		'list':function(D,fn){
			if(!isObject(D)){
				return D;
			}
			for(var k in D){
				if(D[k]){
					this.list(D[k],fn);
				}
				if(isFunction(fn)){
					fn.call(D,k,D[k]);
				}
			}
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-2-29
		 * 修改日期：2016-2-29
		 * 名称： each
		 * 功能：遍历数组或对象
		 * 说明：
		 * 注意：
		 * @param 	(Array | Object)arr     NO NULL :
		 * @param 	(Funtion)fn             NO NULL : 回调方法
		 * @return ()
		 * Example：
		 *
		 */
		'each':function(arr,fn){
			if(!isFunction(fn)){
				return arr;
			}
			var item;
			for(var i=0,len=arr.length;i<len;i++) {
				item=arr[i];
				if(item && fn.call(item, i, item)){
					break;
				}
			}

			return arr;
		},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-20
		 * 名称：MySystem.extends
		 * 功能：子类继承父类对象
		 * 说明：MySystem类范围内
		 * 注意：这里的this指向的不是 MySystem 对象
		 * @param   (Object)this 			NO NULL :子类对象
		 * @param   (Function)subClass 		   NULL :子类名称
		 * @param   (Function)superClass   	NO NULL :父类名称
		 * @param   (String)type 			NO NULL :1:原型链反射继承;2(默认):对象冒充方式继承
		 * @param   ([])args 			   	   NULL :继承父类时传的构造参数
		 * @return  (void)
		 * Example：
		 *		对象冒充方式继承:MySystem.extends.call(this,subClass,superClass,type,[,extraParameters]);
		 *		原型链继承:MySystem.extends(subClass,superClass,type);
		 */
		'extends':function(subClass,superClass,type,args){
			type=type || 2;
			args = args || [];
			switch(type){
				case 1:
					for(var key in superClass.prototype){
						if(!subClass.prototype[key]){
							subClass.prototype[key]=superClass.prototype[key];
						}
					}
					break;
				case 2:
					if(args && isArray(args) && args.length > 0){//传构造参数
						superClass.apply(this,args);
					}else{//无构造参数
						superClass.call(this);
					}
					break;


				default:
					throw new Error('Warning type 非法类型');
					return false;

			}


		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-7-23
		 * 修改日期：2015-7-23
		 * 名称：MySystem.extend
		 * 功能：Extends a child object from a parent object using classical inheritance
		 * pattern.
		 * 说明：
		 * 注意：
		 * @param   (Object)subClass 			NO NULL :子类
		 * @param   (Object)superClass 			NO NULL :父类
		 * @return  (Function) 函数原型
		 * Example：

		 *
		 */
		'extend': function() {
			// proxy used to establish prototype chain
			var F = function() {};
			// extend subClass from superClass
			return function(subClass, superClass) {
				F.prototype = superClass.prototype;
				subClass.prototype = new F();
				subClass.prototype.constructor = subClass;

				subClass.superClass = superClass.prototype;
				if(superClass.prototype.constructor === Object.prototype.constructor){
					superClass.prototype.constructor = superClass;
				}

			};
		}(),
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-3-27
		 * 修改日期：2015-3-27
		 * 名称：merge
		 * 功能：一个或多个对象合并成一个指定的对象
		 * 说明：默认同名的键值前面的不会被覆盖
		 * 注意：
		 * @param  (Object)target  		NO NULL :target 合并后的对象。null 代表合并到命名空间这个对象里
		 * @param  (Array)args   		NO NULL :要合并对象的集合
		 * @param  (Boolean)override 	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (target ｜ this) 返回合并后的对象
		 * Example：
		 *		MySystem.merge({},[A[,...]],false);
		 */
		'merge':function(target,args,override){
			if(!isArray(args)){
				throw new Error('Warning args 不是一个数组');
				return false;
			}
			var len  = args.length;
			if(arguments.length < 2){
				throw new Error('Warning 最少要传2个参数');
				return false;
			}

			override = override || false;
			target   = target   || this;
			var key;
			var i=0;
			if(0 === len){
				throw new Error('Warning args不能为空');
				return false;
			}


			for(;i<len; i++){
				for(key in args[i]){
					if(!override && (key in target)) {continue;}
					target[key] = args[i][key];
				}
			}

			return target;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：clone
		 * 功能：对象克隆
		 * 说明：
		 * 注意：
		 * @param   (Object)className 		NO NULL : 要克隆的类
		 * @return  (Object)				:返回克隆后的新对象
		 * Example：
		 */
		'clone': function(className) {
			return this.merge({},[className]);

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-02-17
		 * 修改日期：2016-02-17
		 * 名称：checkout
		 * 功能：
		 * 说明：
		 * 注意：
		 * Example：
		 */
		'checkout': function() {},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-18
		 * 名称：MySystem.extends_f
		 * 功能：在指定对象的原型链上动态扩充方法
		 * 说明：调用call方法改变this指针
		 * 注意：不调用call方法，就是在W.MySystem对象上扩充方法
		 * @param   (Object)this 			NO NULL :指定对象
		 * @param   (String)name   			NO NULL :扩充的方法名称
		 * @param   (Function)fn 			NO NULL :方法原型
		 * @return  (Object) 返回扩充的对象
		 * Example：
		 *		在Basis 的原型上扩充一个set方法
		 *		MySystem.extends_f.call(Basis,'set',function(){});
		 *
		 *		在W.MySystem 的原型上扩充一个set方法
		 *		MySystem.extends_f('set',function(){});
		 *
		 */
		'extends_f':function(name,fn){
			if(!this.prototype[name]){
				this.prototype[name] = fn;
			}
			return this;
		},





		/**
		 *
		 * @author: lhh
		 * 产品介绍：覆写方法
		 * 创建日期：
		 * 修改日期：
		 * 名称： MySystem.override
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param   (Function)old_fn 	 NO NULL :
		 * @param 	(Function)new_fn     NO NULL :
		 * Example：返回原有的方法原型
		 *
		 */
		'override':function(old_fn,new_fn){
			var old=old_fn;
			old_fn=new_fn;
			return old;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍： class文件检验器
		 * 创建日期：2015-8-18
		 * 修改日期：2015-8-21
		 * 名称： MySystem.is
		 * 功能：检测System是否合法，检测要使用的类是否已加载过；检测要定义的类名称之前是否已注册过。
		 * 说明：子类继承父类之前调用此方法检测父类之前是否有加载过，如果填写第三参数可检测当前的类是否跟之前的类重名了
		 * 注意：
		 * @param  (Object)System 	       		NO NULL : 命名空间
		 * @param 	(String)useClassName     	NO NULL : 要使用的类名称
		 * @param 	(String)className         	　　NULL : 当前类的名称
		 * @return (Boolean)
		 * Example：
		 *
		 */
		'is':function(System,useClassName,className){
			if(!(useClassName in System)){

				throw new Error(["Warning ",System," is not a legitimate object or ","'",useClassName,"'"," is not a legitimate"].join(''));
				return false;
			}
			className = className || null;
			if(!isFunction (System[useClassName])){
				throw new Error(["Warning cannot find the class file ","'/",useClassName,".class'"].join(''));
				return false;
			}
			if(!empty(className) && isFunction (System[className])) {
				throw new Error(["Warning Class name ","'",className,"'"," already exists"].join(''));
				return false;
			}

			return true;


		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-11-09
		 * 修改日期：2015-11-09
		 * 名称： MySystem.defined
		 * 功能：检查变量名是否已定义了
		 * 说明：
		 * 注意：
		 * @param  (Object)System 	       		NO NULL : 命名空间
		 * @param  (String)name         	　　	NO NULL : 变量名
		 * @param  (Object)M	         	　　	NO NULL : 提示出错信息
		 * @return (Boolean)
		 * Example：
		 *
		 */
		'defined':function(System,name,M){
			var defaults={
				'line':'行号',
				'message':'message'
			};


			if(arguments.length !== 3) {
				throw new Error("Warning 缺少参数。");
				return false;
			}
			if(!isObject(M)) {
				throw new Error("Warning 缺少错误提示信息");
				return false;
			}
			M = isObject(M) ? this.merge({},[M,defaults]) : defaults;

			if(!empty(name) && System[name]) {
				throw new Error(["Warning the name ","'",name,"'"," is already defined, at ","'",M.line,"'"," line tip: ","-> ",M.message].join(''));
				return true;
			}

			return false;


		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-11-09
		 * 修改日期：2015-11-09
		 * 名称： MySystem.log
		 * 功能：调试工具
		 * 说明：
		 * 注意：
		 * @param  (Object)M	         	　　	NO NULL : 提示出错信息
		 * @return (Boolean)
		 * Example：
		 *
		 */
		'log':function(M){
			var defaults={
				'line':'行号',
				'message':'message'
			};
			M = isObject(M) ? this.merge({},[M,defaults]) : defaults;
			throw new Error(["Warning: at ","'",M.line,"'"," line tip: -> ",M.message].join(''));
		},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-11-27
		 * 修改日期：2014-11-27
		 * 名称：MySystem.autoCenter
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
		 *		MySystem.autoCenter(500,10,500,10,0);
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
	};

	MySystem.isset 	 		= isset_;
	MySystem.empty 	 		= empty_;
	MySystem.error 	 		= error;
	MySystem.isEmptyObject 	= isEmptyObject;
	MySystem.arr_isEmpty 	= arr_isEmpty;
	MySystem.isType 	= isType;
	MySystem.isObject 	= isObject;
	MySystem.isString 	= isString;
	MySystem.isArray 	= isArray;
	MySystem.isFunction = isFunction;

	MySystem.arr_Object_key_has = arr_Object_key_has;
	MySystem.contains = contains;
	//check Number
	MySystem.isNumber = MySystem.isNumeric 	= isNumeric;
	MySystem.isFloat 	= isFloat;

	MySystem.Config=null;
	MySystem.random=10000;
	MySystem.guid=0;
	MySystem.classPath='./';
	MySystem.files=[];
	MySystem.classes=[];
	MySystem.super={};
	MySystem.app=null;
	MySystem.Object=Object.prototype;
	MySystem.Function=Function.prototype;
	MySystem.Date=Date.prototype;
	MySystem.String=String.prototype;
	MySystem.Array=Array.prototype;

	MySystem.printf=prints;




	MySystem.merge(null,[Interface]);



	return MySystem;

});

/*
 ===========================================================================================
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 ///////////////////////////////////////////////////////////////////////////////////////////

 			*			**	   		**	        **
 			*	   	   *  *    	   *  *        *  *
 			*		  *	   *   	  *	   *      *    *
 			*		 * **** *  	 *	    *    *      *
 			*		*        * 	*        *  *        *
 			********          **          **          *

 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 //////////////////////////////////////////////////////////////////////////////////////////
 ==========================================================================================
*/

window[LHH_NAMESPACE_20150715_].main([window,LHH_CONFIG_20150717_],function(W,Config){
	'use strict';
	var System=this;
	var _ROOT_ = '.';
	var defaultConfig={
		'vendorPath':_ROOT_+'/lamborghiniJS',
		'Public':{
			'ROOT':_ROOT_
		},
		//hashcode 随机种子
		'random':10000,
		//定义模版标签
		'templat':{
			'leftLimit':'{{',
			'rightLimit':'}}'
		},
		//标签的渲染方式
		'render':{
			//输出标签的方式 ()
			'fragment':null,
			//true : document.createElement(); false :document.write();
			'create':false,
			'append':'after',
			'default':{
				'script':{
					'Attribute':{
						'type':'text/javascript',
						//'async':true,
						//'defer':'defer',
						'charset':'utf-8'
					}
				},
				'css':{
					'Attribute':{
						'type':'text/css',
						'rel':'stylesheet'
					}
				}
			},
			'H':function(){
				return {
					'html'    : document.getElementsByTagName('html')[0],
					'head'    : document.getElementsByTagName('head')[0],
					'body'    : document.getElementsByTagName('body')[0],
					'meta'    : document.getElementsByTagName('meta'),
					'script'  : document.getElementsByTagName('script'),
					'link'    : document.getElementsByTagName('link')
				};
			},
			'bulid':function(tag,D){
				tag = tag || "div";
				var node;
				var k;
				var fragment;
				var Config = defaultConfig;
				node=document.createElement(tag);

				for(k in D){
					node[k] = D[k];
				}

				if(!Config.render.fragment){
					Config.render.fragment = document.createDocumentFragment();
				}
				fragment = Config.render.fragment;

				Config.render.fragment.appendChild(node);

				return fragment;
			}

		},
		'init':{},
		/**
		 * 用createElement 创建标签并且设为异步
		 */
		'use':function(){
			this.render.create=true;
			this.render.default.script.Attribute.async=true;
			this.render.default.script.Attribute.defer='defer';
		},
		/**
		 * 用document.write() 创建标签并且设为非异步
		 */
		'unuse':function(){
			this.render.create=false;
			this.render.default.script.Attribute.async=false;
			this.render.default.script.Attribute.defer='';
		},
		'getClassPath':function(){
			return this.vendorPath;
		}
	};


	System.merge(Config,[defaultConfig]);

	System.Config 	 = Config;
	System.classPath = Config.getClassPath();
	//hashcode 随机种子
	System.random 	 = Config.random || 10000;

	var CMyDom=function(){//创建Dom 对象
		System.is(System,'Dom');
		return new System.Dom();
	};


	System.arr_Object_key=['length','list'];
	var __this__=null;




	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-02
	 * 修改日期：2015-8-02
	 * 名称：MySystem.isClassFile
	 * 功能：检查是否是类文件
	 * 说明：
	 * 注意：
	 * @param   (String)path 			NO NULL :路径名称
	 * @return  (Boolean)
	 * Example：
	 *
	 */
	System.isClassFile=function(path) {
		var arr,path,className;
		//查找是否有.class这个关键字
		if(path.search(/.class/g) != -1){
			if(path.indexOf("/") != -1){
				arr=path.split("/");
				path =arr[arr.length-1];

			}
			if(path.indexOf(".") != -1){
				arr=path.split(".");
				className=arr[0];
				//这个类文件已经加载过了
				if(System.isFunction(System[className])){
					return true;
				}
			}
		}



		//这个类文件没有加载过
		return false;
	};


	function Basis(D){
		__this__=this;
		System.app=this;
		this.Browser=null;
		this.setBrowser=function(Browser){
			if(Browser && !this.Browser){
				this.Browser=Browser;
			}
		};

	}



	/*---------------------------------
	 static mothed
	 -------*/


	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-9
	 * 修改日期：2016-1-9
	 * 名称： createTag
	 * 功能：动态创建指定的标签
	 * 说明：
	 * 注意：
	 * @param 	(String)tag             NO NULL : 标签名称
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @return (Dom)
	 * Example：
	 *
	 */
	Basis.createTag=function(tag,D){
		tag = tag || null;

		if(!System.isString(arguments[0])){
			throw new Error('Warning 缺少标签名称');
			return false;
		}

		return CMyDom().create(tag,D);

	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-25
	 * 修改日期：2016-2-25
	 * 名称： printTag
	 * 功能：动态返回指定的标签
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)name             NO NULL : 标签名称
	 * @param 	(Boolean)single         NO NULL : 成对标签还是单一标签，false 是成对标签
	 * @param 	(Object)D             	NO NULL : 标签的属性
	 * @param 	(String)content            NULL : 内容
	 * @return (String | Object) 返回标签字符串 可用document.write(); 或一个自定义Dom的对象
	 * Example：
	 *
	 */
	Basis.printTag=function(name,single,D,content){
		single = single || false;

		if(!System.isString(arguments[0])){
			throw new Error('Warning 缺少标签名称');
			return false;
		}
		name = arguments[0];

		var attrs=[],key,tag,i= 0,len = System.length(D);
		for(key in D){
			if(System.arr_Object_key_has(key)){
				continue;
			}
			attrs.push(key,'=','"',D[key],'"');

			if(single || len-1!=i){
				attrs.push(' ');
			}
			i++;
		}
		if(single){
				tag=['<',name,' ',attrs.join(''),'/','>'];
		}else{
			if(content){
				tag=['<',name,' ',attrs.join(''),'>',content,'<','/',name,'>'];
			}else{
				tag=['<',name,' ',attrs.join(''),'>',		 '<','/',name,'>'];
			}

		}
		return tag.join('');

	};

	Basis.printScript=function(D){

		return Basis.printTag('script',false,D);
		//<script src="aa.js" type="text/javascript"></script>
	};


	Basis.printLink=function(D){

		return Basis.printTag('link',true,D);

		//<link href="aa.css" type="text/css" rel="stylesheet" />

	};





	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-3-18
	 * 修改日期：2015-3-19
	 * 名称：Basis.extends
	 * 功能：继承Basis类
	 * 说明：Basis类静态方法。 调用call方法改变this指针
	 * 注意：调用必须用call方法
	 * @param   (Object)this 			NO NULL :子类对象
	 * @param   (Function)superClass   	NO NULL :父类名称
	 * @param   (String)type 			NO NULL :1:原型链继承;默认2:对象冒充方式继承
	 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
	 * @return  (void)
	 * Example：
	 *		Basis.extends.call(this,superClass,type,[a,b,c,...]);
	 */
	Basis.extends=function(superClass,type,arg) {
		superClass = superClass  || Basis;
		type 	  = type || 2;
		arg = arg || null;
		/*------------------------------*/
		//要继承Basis这个类都要加这么一段
		//如果有Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(System && superClass ) {
			if(!this.setBrowser){
				System.extends.call(this,null,superClass,type,arg);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			// if(Browser && (typeof Browser  !='undefined') && !this.Browser) this.setBrowser(Browser);

		}else{
			throw new Error(["Warning nothing the",superClass].join(' '));
			return 0;
		}
		/*------------------------------*/

	};

	Basis.prototype={
		'constructor': Basis,
		'__constructor':function(){},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Basis对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	};

	System['Basis']=Basis;

	//System.print(Basis.printScript({'src':System.classPath+'/loadcommon.js'}));

});






