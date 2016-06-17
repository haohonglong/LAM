
/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：Widget
 * 功能：
 * 说明 : 小部件，
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[GRN_LHH].main([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Helper','Widget');

	var __this__=null;
	System.merge(null,[{
		'Widget':function(){

		}
	}]);

	function Widget(){
		System.Basis.extends.call(this,System.Helper);
		__this__=this;

		this.super = System.merge(System.super,[this]);


	}
	/*static mothed
	 ----------------------------------------*/




	Widget.prototype = {
		'constructor':Widget,


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Widget对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Widget,System.Helper,1);
	System['Widget']=Widget;

});


