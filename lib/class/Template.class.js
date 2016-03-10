
/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：css类
 * 功能：服务于基于jQuery 的类
 * 说明 : 
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[LHH_NAMESPACE_20150715_].main([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Template');


	var __this__=null;
	var document=window.document;




	function Template(){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;



	}
	Template.prototype = {
		'constructor':Template,
		'find':function(){},
		'replace':function(){},
		'analysis':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Template对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Template,System.Browser,1);
	System['Template']=Template;

});