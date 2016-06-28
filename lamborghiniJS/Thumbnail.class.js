
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
	 * 			(Number)baseWidth		      				:NO NULL	最大的宽度
	 * 			(Number)baseHeight		      				:NO NULL	最大的高度
	 * 			(Number)vcount		      				   	:NO NULL	视图区限制显示多少张图片
	 * 			(Number)count		      				   	:NO NULL	总共多少张图片
	 * 			(Number)number		      				   	:NULL		$view／vcount－number
	 * 			(Number)margin		      				   	:NULL		每个图片的额外加入的间距
	 * 			(Number)current		      					:NULL		默认或当前图片的在第几张
	 * 			(Function)befor_fn		      				:NULL		resize之前
	 * 			(Function)after_fn		      				:NULL		resize之后
	 * 			(String)position		    			   	:NO NULL
	 * 			(Thumbnail)parent		    			   	:NULL		关联的父包裹层
	 * 			(Drag)drag		    			   			:NULL		拖拽的类
	 *
	 *  Example：


	 */
	function Thumbnail(D){
		System.Basis.extends.call(this,System.AutoLayout,2,[D]);
		__this__ = this;
		var defaults={
			'$ul':null,
			'$view':null,
			'$li':null,
			'count':1,
			'vcount':1,
			'baseWidth':200,
			'baseHeight':150,
			'position':'left',
			'unit':'px',
			'margin':0,
			'befor_fn':null,
			'after_fn':null,
			'number':0
		};

		var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

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

