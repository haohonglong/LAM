
/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2017-1-5
 * 名称：Cache类
 * 功能：缓存
 * 说明 : 
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Cache');
	var __this__=null;

	function Cache(){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;
		this.caches = [];
	}
	Cache.prototype = {
		'constructor':Cache,
		'cache':function(key,value,callback){
			var index = this.exist(key,value);
			if($.isFunction(callback)){
				callback.call(this,index);
			}
			return index;
		},
		'set':function(Obj,key,value){
			Obj[key] = value;
			this.caches.push(Obj);

		},
		'update':function(index,Obj){
			this.caches[index] = Obj;
		},
		'get':function(index){
			return this.caches[index];
		},
		'exist':function(key,value){
			var caches = this.caches;
			for(var i=0,len=caches.length;i<len;i++){
				if((key in caches[i]) && (value == caches[i][key])){
					return i;
				}
			}
			return -1;
		},
		'getAll':function(){//clone and return the array
			return $.merge([],this.caches);
		},
		'remove':function(index){
			if(index){
				if (index > -1 && index < this.caches.length-1) {
					this.caches.splice(index, 1);
					// delete caches[index];
				}
			}else{
				this.caches = [];
			}
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Cache对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Cache,System.Browser,1);
	System['Cache'] = Cache;

});