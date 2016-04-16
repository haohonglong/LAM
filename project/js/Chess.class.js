/**
 * 五子棋
 */
window[LHH_NAMESPACE_20150715_].main([
	window
],function(window){
	var System=this;
	System.is(System.Html5,'CanvasForm','Chess');
	var __this__=null;
	var chessBoard;
	function Chess(dom){
		System.Basis.extends.call(this,System.Html5.CanvasForm,2,[dom]);
		__this__=this;
		chessBoard=[];
		for(var i=0;i<15;i++){
			chessBoard[i] = [];
			for(var j=0;j<15;j++){
				chessBoard[i][j] = 0;
			}
		}

	}

	Chess.prototype = {
		'constructor':Chess,
		'__constructor':function(){},
		'click':function(){
			var self = this;
			var color =true;
			var flag =true;
			$(this.theCanvas).on('click',function(event){
				System.wait(function(){
					flag = !flag;
				},500);
				if(flag){
					var event = $.event.fix(event);
					var x = event.offsetX;
					var y = event.offsetY;
					var i = Math.floor(x/30);
					var j = Math.floor(y/30);
					if(0 === chessBoard[i][j]){
						self.chess(i,j,color);
						if(color){
							chessBoard[i][j] = 1;
						}else{
							chessBoard[i][j] = 2;
						}
					}
					color = !color;
					flag = !flag;
				}

			});

			return this;
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
		 *生成棋子
		 * @param (int)i
		 * @param (int)j
		 * @param (Blooean)color
		 * @returns {Chess}
		 */
		'chess':function(i,j,color,D){
			var defaults={
					'position':{
						'x':15+ i*30,
						'y':15 +j*30
					}
				};

			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			D.r = 13;
			var G ={
				'params':{
					'x0':15 + i*30 +2,
					'y0':15 + j*30 -2,
					'r0':13,
					'x1':15 + i*30 +2,
					'y1':15 + j*30 -2,
					'r1':0
				},
				'colors':[]
			};
			if(color){
				G.colors.push({'stop':0,'color':'#0A0A0A'});
				G.colors.push({'stop':1,'color':'#636766'});
			}else{
				G.colors.push({'stop':0,'color':'#D1D1D1'});
				G.colors.push({'stop':1,'color':'#F9F9F9'});
			}

			this
				.arc(D)
				.closePath()
				.fillStyle(this.createRadialGradient(G))
				.fill();

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
			this.image(D);

			return this;
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

