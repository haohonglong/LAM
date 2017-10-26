
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Basis','Object');

	var __this__=null;
	function Object(){
		System.Basis.extends.call(this);
		__this__=this;
		this._hashCode=Object.generate();
	}
	Object._hashCodeCounter=1;
	Object._hashCodePrefix='hc'+System.timestamp();
	Object.generate=function(){
		return Object._hashCodePrefix+Math.round(Math.random()*System.random)+Object._hashCodeCounter++;
	};
	Object.toHashCode=function(o){
		if(o._hashCode!=null)
			return o._hashCode;
		return o._hashCode=Object.generate();
	};

	Object.prototype={
		'constructor':Object,
		'__constructor':function(){},
		'_className':'Object',
		'_disposed':false,
		'_id':null,
		'getDisposed':function(){
			return this._disposed;
		},
		/**
		 *
		 * @returns {*}
		 */
		'hashCode':function(){
			return this._hashCode;
		},


		'getId':function(){
			return this._id;
		},
		'equals':function(o){
			if(!o._hashCode) {Object.toHashCode(o);}
			return (this._hashCode === o._hashCode);
		},

		'setId':function(v){
			this._id=v;
		},
		'getUserData':function(){
			return this._userData;
		},
		'setUserData':function(v){
			this._userData=v;
		},
		'toHashCode':function(){
			return Object.toHashCode(this);
		},
		'dispose':function(){
			this._disposed=true;
			delete this._userData;
		},
		'toString':function(){
			if(this._className)
				return"[object "+this._className+"]";
			return"[object Object]";
		},
		'getProperty':function(sPropertyName){
			var getterName="get"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
			if(System.isFunction(this[getterName]))
				return this[getterName]();
			throw new Error("No such property, "+sPropertyName);
		},
		'setProperty':function(sPropertyName,oValue){
			var setterName="set"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
			if(System.isFunction(this[setterName]))
				this[setterName](oValue);
			else throw new Error("No such property, "+sPropertyName);
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Object对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}


	};
	System.extends(Object,System.Basis,1);
	System['Object']=Object;

});


