
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Dom','Linklist');

	var __this__=null;
	function Linklist(){
		System.Basis.extends.call(this,System.Dom);
		__this__=this;


	}

	Linklist.prototype = {
		'constructor':Linklist,
		'__constructor':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Linklist对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	};
	System.extends(Linklist,System.Dom,1);
	System['Linklist']=Linklist;

});




