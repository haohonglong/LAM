
window[GRN_LHH].main([window,jQuery],function(window,$,undefined){
	'use strict';
	var System=this;

	System.is(System,'AutoLayout','Thumbnail');
	var __this__=null;
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-25
	 * 修改日期：2015-10-26
	 * 名称：
	 * 功能：自适应布局
	 * 说明：
	 * 注意：position 必须添 top 或 left ;
	 * @params   (Object)init 			NO NULL :初始化参数
	 *
	 * 			(jQuery)$ul   								:NO NULL	ul
	 * 			(jQuery)$li									:NO NULL	li
	 * 			(String)unit :'px | % | em [|...]',	  		:NO NULL	单位
	 * 			(jQuery)$view		      				   	:NO NULL	视图区显示的范围层
	 * 			(Number)baseWidth		      				:NO NULL	设定的宽度
	 * 			(Number)baseHeight		      				:NO NULL	设定的高度
	 *
	 *  Example：


	 */
	function Thumbnail(D){
		__this__ = this;
		var defaults={
			'$ul':null,
			'$view':null,
			'$li':null,
			'baseWidth':200,
			'baseHeight':150,
			'position':'left',
			'unit':'px'
		};

		var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
		System.Basis.extends.call(this,System.AutoLayout,2,[init]);

		this.baseWidth  		= init.baseWidth;
		this.baseHeight  		= init.baseHeight;



		//check

	}
	Thumbnail.prototype = {
		'constructor':Thumbnail,
		'__constructor':function(){},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：resize
		 * 功能：重新计算各图片的尺寸并根据移动前与移动后的差值跳转移动的位置
		 * 说明：
		 * 注意：
		 * @param:
		 * @return (Thumbnail)
		 * Example：
		 */
		'resize':function(){

			var baseWidth  = this.baseWidth;
			var baseHeight = this.baseHeight;

			var fullWidth = this.getViewWidth();
			var width = ( fullWidth / ( Math.ceil( fullWidth / baseWidth ) * baseWidth ) ) * baseWidth;
			var height = ( width / baseWidth ) * baseHeight;
			this.setAllLiWidth(width).setAllLiHeight(height);
			return this;

		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Thumbnail对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Thumbnail,System.AutoLayout,1);
	System['Thumbnail'] = Thumbnail;

});

