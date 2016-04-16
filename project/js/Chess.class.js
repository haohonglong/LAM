/**
 * 五子棋
 */
window[LHH_NAMESPACE_20150715_].main([
	window
],function(window){
	var System=this;
	System.is(System.Html5,'CanvasForm','Chess');
	var __this__=null;
	function Chess(dom){
		System.Basis.extends.call(this,System.Html5.CanvasForm,2,[dom]);
		__this__=this;

	}

	Chess.prototype = {
		'constructor':Chess,
		'__constructor':function(){},
		'init':function(){

		},
		/**
		 * 绘制棋盘(15*15)
		 * @param color 棋盘线的颜色
		 * @returns {Chess}
		 */
		'draw':function(color){
			color = color || '#bfbfbf';
			for(var i=0;i<15;i++){
				this
					.strokeStyle(color)
					.moveTo(15 + i*30, 15)
					.lineTo(15 + i*30, 435)
					.stroke()
					.moveTo(15, 15 + i*30)
					.lineTo(435, 15 + i*30)
					.stroke();
			}
			return this;
		},
		/**
		 * 生成棋子
		 * @param D
		 * @returns {Chess}
		 */
		'draw_chess':function(D){
			var defaults={
				'position':{'x':100,'y':75},
				'color':'white'
			};

			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			D.r = 10;

			this.arc(D).fillStyle(this.createRadialGradient({
				'params':{
					'x0':100,
					'y0':75,
					'r0':10,
					'x1':100,
					'y1':75,
					'r1':1
				},
				'colors':[
					{'stop':0,'color':'#0A0A0A'},
					{'stop':1,'color':'#ccc'}
				]
			})).fill();

			return this;
		},
		/**
		 * 添加水印要有个等待时间，如果放在水印的上面要等待水印加载完成后调用别的，
		 * @param img
		 * @param callback
		 * @returns {*|Object}
		 */
		'add_watermark':function(img,callback){
			var self=this;
			var D={
				'src':img,
				'position':{'x':0,'y':0},
				'size':{
					'w':self.theCanvas.width,
					'h':self.theCanvas.width
				},
				'clip':null
			};
			D.callback=function(){
				callback();
			};
			return this.image(D);
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Chess对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	};
	System.extends(Chess,System.Html5.CanvasForm,1);
	System['Html5']['Chess'] = Chess;

});

