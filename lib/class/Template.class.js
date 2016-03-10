
/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：模版类
 * 功能：用于对模版标签里内容操作，模版渲染
 * 说明 : 
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[LHH_NAMESPACE_20150715_].main(function(undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Template');
	var __this__=null;

	function Template(){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;



	}
	Template.prototype = {
		'constructor':Template,
		'create':function(){},
		'find':function(){},
		'replace':function(){},
		'analysis':function(){},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-10
		 * 修改日期：2016-03-10
		 * 名称：render
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param (String)view NO NULL:指定渲染的试图
		 * @param (Object)D	   NO NULL:渲染到模版中的数据
		 * @returns {void}
		 */
		'render':function(view,D){},

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