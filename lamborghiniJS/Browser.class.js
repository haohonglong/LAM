
/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：浏览器兼容类
 * 功能：服务于基于jQuery 的类
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[REGISTERNAMESPACE].main([window,window['document'],jQuery],function(window,document,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Helper','Browser');

	var __this__=null;
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-30
	 * 修改日期：2014-12-30
	 * 名称：private (int) getExplorer
	 * 功能：判断浏览器种类
	 * 说明：返回值对照：1:chrome;
	 * 					 2:Firefox;
	 * 					 3:ie;
	 * 					 4:Safari;
	 * 					 5:Opera
	 * 					 0:Other
	 * 注意：
	 * @param   (void)
	 * Example：
	 */
	var getExplorer=function() {
		var explorer = window.navigator.userAgent ;
		//ie
		if (explorer.indexOf("MSIE") >= 0) {
			return 3;
		}
		//firefox
		else if (explorer.indexOf("Firefox") >= 0) {
			return 2;
		}
		//Chrome
		else if(explorer.indexOf("Chrome") >= 0){
			return 1;
		}
		//Opera
		else if(explorer.indexOf("Opera") >= 0){
			return 5;
		}
		//Safari
		else if(explorer.indexOf("Safari") >= 0){
			return 4;
		}else{
			return 0;
		}
	};
	function Browser(){
		System.Basis.extends.call(this,System.Helper);
		__this__=this;
		this.window=null;
	}

	Browser.getExplorer=function(){
		return getExplorer();
	};
	Browser.isIE=function(){
		return !!window.ActiveXObject;
		//简短
		//return !-[1,];
		//浏览器检测
		//return /MSIE/.test(navigator.userAgent);
	};
	Browser.isIE6=function(){
		//if(!-[1,] && !window.XMLHttpRequest){
		if(Browser.isIE() && !window.XMLHttpRequest){
			return true;
		}else{
			return false;
		}
	};
	Browser.isIE8=function(){
		if(Browser.isIE() && !!document.documentMode){
			return true;
		}else{
			return false;
		}
	};
	Browser.isIE7=function(){
		if(Browser.isIE() && !Browser.isIE6() && !Browser.isIE8()){
			return true;
		}else{
			return false;
		}
	};

	Browser.isFirefox=function(){
		return (2===getExplorer());
	};
	Browser.isChrome=function(){
		return (1===getExplorer());
	};
	Browser.isSafari=function(){
		return (4===getExplorer());
	};
	Browser.isOpera=function(){
		return (5===getExplorer());
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-1-15
	 * 修改日期：2015-1-15
	 * 名称：Browser.fixEvt
	 * 功能：解决事件兼容问题
	 * 说明：
	 * 注意：
	 * @param   (event)event 			NO NULL :
	 * Example：
	 */
	Browser.fixEvt=function(event){//解决事件兼容问题
		//var e = event || window.event || arguments.callee.caller.arguments[0];
		var e = event || window.event;
		//解决mouseover与mouserout事件不停切换的问题（问题不是由冒泡产生的）
		if("mouseover" == e.type){
			e.relatedTarget = e.fromElement;
		}else if("mouseout" == e.type){
			e.relatedTarget = e.toElement;
		}
		if(!e.target){//IE下没有下面的属性和方法，需要自定义下
			e.target = e.srcElement;
			e.layerX = e.offsetX;
			e.layerY = e.offsetY;
			e.pageX  = e.clientX+document.documentElement.scrollLeft;
			e.pageY  = e.clientY+document.documentElement.scrollTop;
			e.stopPropagation=function(){//停止事件冒泡方法
				e.cancelBubble=true;
			};
			e.preventDefault=function(){//阻止事件的默认行为，例如click <a>后的跳转
				e.returnValue=false;
			};
		}
		return e;
	};


	/**
	 * 创建日期：2014/8/29
	 * 修改日期：2014/8/29
	 * 名称： getBodySize
	 * 功能：获取网页的宽度和高度
	 * @param 	String get   	需要的宽（w）或高（h）
	 * @param 	Numver n   		获取哪种方式 默认不用输入
	 * @param 	Boolean show   	是否在console.log()中打印出数据值调试 默认不打印，如要打印设为true
	 * @return  (Number | Array) 如果参数get存在，则返回相应宽或高，如果get没有写则返回数组
	 */
	Browser.getBodySize=function(get,n,show) {
		var bodySize = [];
		switch(n){
			case 1:
				if($(document.body).width()>$(window).width() && $(document.body).width()>$(document).width()){
					bodySize['w']=$(document.body).width();
				}else if($(window).width()>$(document).width()){
					bodySize['w']=$(window).width();
				}else{
					bodySize['w']=$(document).width();
				}


				if($(document.body).height()>$(window).height() && $(document.body).height()>$(document).height()){
					bodySize['h']=$(document.body).height();
				}else if($(window).height()>$(document).height()){
					bodySize['h']=$(window).height();
				}else{
					bodySize['h']=$(document).height();
				}

				break;
			default:
				bodySize['w']=($(document.body).width()>$(window).width())? $(document.body).width():$(window).width();
				bodySize['h']=($(document.body).height()>$(window).height())? $(document.body).height():$(window).height();


		}
		if(show){
			console.log('window:'+$(window).height() +'|document.body:'+$(document.body).height() +'|document:'+$(document).height()+'|bodySize[h]:'+bodySize['h']+'|bodySize:'+bodySize)
		}
		return get?bodySize[get]:bodySize;
	};



	/**
	 * 创建日期：
	 * 修改日期：
	 * 名称：getViewWH
	 * 功能：了解两个名词：BackCompat 标准兼容模式关闭（怪异模式）CSS1Compat 标准兼容模式开启
	 *		这个方法为获取页面可视区域的高度，普通情况下，window.innerHeight 即可获取，如果是正常模式，并且有clientHeight的情况下，
	 *		document.documentElement.clientHeight 获取的就是可视区域高度。在怪异模式下，是使用document.body获取。
	 * @param   (voide)
	 * @return  (Object)
	 *
	 */
	Browser.getViewWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=window["inner".concat(a)] || document.compatMode ==="CSS1Compat" && document.documentElement["client".concat(a)] || document.body["client".concat(a)];
		});
		return wh;
	};

	/**
	 * 创建日期：
	 * 修改日期：
	 * 名称： getBodyWH
	 * 功能： 这个为获取页面的高度，用于iframe的自适应时候获取。
	 * @param   (voide)
	 * @return  (Object)
	 */
	Browser.getBodyWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=document.compatMode ==="CSS1Compat" && document.documentElement["scroll".concat(a)] || document.body["scroll".concat(a)];
		});
		return wh;
	};
	Browser.befor_scrollTop = 0;
	/**
	 * 创建日期：
	 * 修改日期：
	 * 名称： fixed_element
	 * 功能： 固定元素 （模拟css fixed 功能）
	 * @param (jQuery)$elem 被fixed 的元素
	 * @param (jQuery)$context 出现滚动条的容器，默认是窗口
	 * @param (Boolean)animate 是否有缓冲效果 默认没有
	 */
	Browser.fixed_element=function($elem,$context,animate){
		$context = $context || $(document);
		var befor_scrollTop = Browser.befor_scrollTop;
		var scrollTop = $context.scrollTop();
		var top = $elem.offset().top;

		if(scrollTop > 0 || befor_scrollTop < scrollTop){
			top+=scrollTop;
		}else if(scrollTop < 0 || befor_scrollTop > scrollTop){
			top-=scrollTop;
		}
		if(animate){
			$elem.animate({'top':top});

		}else{
			$elem.css({'top':top});
		}

		Browser.befor_scrollTop = scrollTop;

		console.log(scrollTop);
	};



	Browser.addFavorite_2=function(address,name){//添加到收藏夹（地址，关键字）
		if(window.external && ("addFavorite" in window.external)){//IE
			window.external.addFavorite(address,name);
		}else if(window.sidebar && window.sidebar.addPanel){//FF
			window.sidebar.addPanel(name,address,name);
		}else{
			alert("加入收藏失败，请按Ctrl+D进行添加");
		}
	};

	/**
	 * 名称：addFavorite
	 * 功能：加入到收藏夹
	 *
	 */
	Browser.addFavorite=function(name,url){
		var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd': 'CTRL';
		if(document.all){
			window.external.addFavorite(url,name);
		}else if(window.sidebar){
			window.sidebar.addPanel(name,url, "");
		}else{
			alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
		}
	};

	//绑定事件的句柄
	Browser.handler=function(Event,functions){//哪个事件发生了？
		var evt=Browser.fixEvt(Event);
		//evt.type :当前 Event 对象表示的事件的名称
		var functions=functions[evt.type];//
		for(var i=0,len=functions.length;i<len;i++){
			if(functions[i])
				functions[i].call(this,evt);//call的方法起到一个对象冒充的作用（把指向window对象变成指向当前对象）
		}
	};
	//添加事件
	Browser.addEvent=function(obj,evt,fn){
		if("[object Opera]"===String(window.opera)){
			obj.addEventListener(evt,function(evt){
				evt.layerX=evt.offsetX;
				evt.layerY=evt.offsetY;
				fn.call(this,evt);
			},false);
		}else if(obj.addEventListener){
			obj.addEventListener(evt,fn,false);
		}else if(obj.attachEvent){
			obj.attachEvent("on"+evt,function(){
				fn.call(this);
			});
		}else{
			if(!obj.functions) obj.functions={};
			//检测有没有存储事件名的数组
			if(!obj.functions[evt]) obj.functions[evt] = [];
			var functions=obj.functions[evt];
			for(var i=0,len=functions.length;i < len; i++){
				if(functions[i] === fn) return obj;//判断之前是否有添加过要添加的事件监听函数
			}
			//没添加就把函数保存到数组中
			functions.push(fn);
			//fn.index=functions.length-1;
			if(System.Basis.isFunction(obj["on"+evt])){//检测是否已经注册过事件监听函数
				if(obj["on"+evt] !== Browser.handler)
					functions.push(obj["on"+evt]);//
			}
			obj["on"+evt]=function(){
				Browser.handler.call(this,functions);
			};
		}
		return obj;
	};
	Browser.getDPI=function() {
		var arrDPI = [];
		if (window.screen.deviceXDPI) {
			arrDPI[0] = window.screen.deviceXDPI;
			arrDPI[1] = window.screen.deviceYDPI;
		}
		else {
			var tmpNode = document.createElement("DIV");
			tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
			document.body.appendChild(tmpNode);
			arrDPI[0] = parseInt(tmpNode.offsetWidth);
			arrDPI[1] = parseInt(tmpNode.offsetHeight);
			tmpNode.parentNode.removeChild(tmpNode);
		}
		return arrDPI;
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-25
	 * 修改日期：2014-12-25
	 * 名称：(Number) getScrollTop
	 * 功能：获取滚动条距离顶端的距离
	 * 说明：支持IE6
	 * 注意：
	 * Example：
	 */
	Browser.getScrollTop=function(){
		var scrollPos;
		if (window.pageYOffset){
			scrollPos = window.pageYOffset;
		}else if (document.compatMode && document.compatMode != 'BackCompat'){
			scrollPos = document.documentElement.scrollTop;
		}else if (document.body) {
			scrollPos = document.body.scrollTop;
		}
		return scrollPos;
	};

	Browser.getDocument_body=function(){
		return document.documentElement || document.body;
	};

	Browser.bind=function(obj,evt,fn){//给某个对象添加多个事件监听函数
		return Browser.addEvent(obj,evt,fn);
	};
	Browser.unbind =function(obj,evt,fn){//删除事件监听
		if(obj.functions){
			var fns = obj.functions;
			if(fns != null){
				fns = fns[evt];
				if(fns != null){
					for(var i=0,len=fns.length; i<len ; i++){
						if(fns[i] === fn){
							delete fns[i];
						}
					}
				}
			}
		}
		return obj;
	};
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-22
	 * 修改日期：2014-12-23
	 * 名称：Browser.mousewheel
	 * 功能：鼠标滚轮事件注册
	 * 说明：dom 是滚动的范围区域
	 * 注意：这个功能只能在鼠标滚动时返回滚动的方向,和滚轮滚动判断方向的值
	 * @param   (Dom)dom 			NO NULL :dom节点对象
	 * @param   (Function)fn 		NO NULL :返回滚动方向和滚轮滚动的值
	 * Example：
	 */
	Browser.mousewheel=function(dom,fn){
		//鼠标滚轮事件处理函数
		//direction
		if(!dom) alert("dom 参数必填");
		var fnMouseWheel=function(e) {
			e = Browser.fixEvt(e);
			var wheelDelta = e.wheelDelta || e.detail; //鼠标滚动值，可由此判断鼠标滚动方向
			if (wheelDelta === -120 || wheelDelta === 3 || wheelDelta < 0){
				fn.call(e,{'direction':'down','wheelDelta':wheelDelta});
			}else if (wheelDelta === 120 || wheelDelta === -3 || wheelDelta > 0){
				fn.call(e,{'direction':'up','wheelDelta':wheelDelta});
			}
		};

		//if (dom.addEventListener) {  //for firefox
		//dom.addEventListener("DOMMouseScroll", fnMouseWheel);
		Browser.bind(dom,"DOMMouseScroll",fnMouseWheel);
		//}

		dom.onmousewheel = fnMouseWheel; // for other browser
	};

	/**
	 * 创建日期：2014/12/1
	 * 修改日期：2014/12/1
	 * 名称：(vido) Browser.setFixed
	 * 功能：给元素设置固定样式
	 * @param	$div(jQuery obj) NO NULL : //被设置的元素
	 * @param 	fn(Function)        NULL : callBack 在scroll 时要执行的行为
	 * @return  (Function)
	 *
	 *
	 */
	Browser.setFixed=function($div,fn){
		if('fixed' != $div.css('position')){
			$div.css('position','absolute');
			var scroll=function(){
				System.isFunction(fn) && fn();
				Browser.fixed_element($div);
			};
			return scroll;
		}

	};
	/**
	 *
	 * @author lhh
	 * 功能：窗口重新调整大小
	 * 名称：Browser.resize
	 * 创建日期：2014-11-28
	 * 修改日期：2014-11-28
	 * @param	        $div(jQuery obj) NO NULL : //被居中的容器
	 * @param(Object) 	fn(Function)        NULL : callBack
	 * @return  (Function) 时时计算垂直水平居中的函数原型
	 * 调用方式：
		 Browser.resize($('div'),function(){
							 var size=window.System.autoCenter($(window).width(),this.width(),
															   $(window).height(),this.height(),100);
								this.css({'top':size.y+'px',
										 'left':size.x+'px'
										});
						});
	 *
	 */
	Browser.resize=function($div,fn){
		if(!System.isFunction(fn)) {
			throw new Error("缺少回调函数");
			return null;
		}
		return function(){
			fn.call($div,{'w':$(window).width(),'h':$(window).height()});
		};
	};


	/**
	 * 创建日期：2014/8/26
	 * 修改日期：2014/8/26
	 * 名称：(vido) setIEfixed
	 * 功能：IE 6,7固定位置
	 * 参数： $elem (jQuery obj)
	 * @return  (Function)
	 *
	 */
	Browser.setIEfixed=function($elem){
		if(Browser.isIE6()){
			$elem.css('position','absolute');
			var scroll=function(){
				$elem.animate({'top': $(document).scrollTop()},10);
			};
			return scroll;
		}
	};
	Browser.innerSize=function(){//获取浏览器窗口视口宽度和高度
		return{
			width  : window.innerWidth  || document.documentElement.clientWidth,
			height : window.innerHeight || document.documentElement.clientHeight
		};
	};
	
	/**
	 *
	 * @author lhh
	 * 功能：滚动
	 * 名称：Browser.scroll
	 * 创建日期：2015-11-06
	 * 修改日期：2015-11-06
	 * @param()
	 * @return
	 * 调用方式：

	 *
	 */
	Browser.scroll = function(){};

	Browser.prototype = {
		'constructor':Browser,
		'__constructor':function(){},
		'resize_super':function(){},
		'scroll_super':function(){},
		'where':function(){},

		/**
		 * 创建日期：2014/11/28
		 * 修改日期：2015/11/10
		 * 名称：autoScreenCenter
		 * 功能：自动居中屏幕，回调函数可以不传，传过回调函数后就能在一个指定范围中垂直居中对齐
		 * @param	$div(jQuery obj) NO NULL : //被居中的容器
		 * @param 	padding(intger)     NULL : callBack
		 * @param 	fn(Function)        NULL : callBack 自定义居中外围的容器
		 * @return  (Browser)
		 *
		 *
		 */
		'autoScreenCenter':function($div,pandding,fn){
			pandding = pandding || 0;
			if('fixed' != $div.css('position')){
				$div.css('position','absolute');

			}

			this.resize_super = Browser.resize($div,function($window){
				if(System.isFunction(fn)){
					fn.call($div,$window);
				}else{
					var size=System.autoCenter($window.w,this.width(),
						$window.h,this.height(),pandding);
					this.css({'top':size.y+'px',
						'left':size.x+'px'
					});
				}
			});
			this.setFixed($div);
			return this;

		},
		/**
		 * 创建日期：2014/12/1
		 * 修改日期：2015/11/10
		 * 名称：(vido) setFixed
		 * 功能：给元素设置固定样式
		 * @param	$div(jQuery obj) NO NULL : //被设置的元素
		 * @return  (Browser)
		 *
		 *
		 */
		'setFixed':function($div){
			if('fixed' != $div.css('position')){
				$div.css('position','absolute');
				this.scroll_super = function(){
					this.resize_super();
					Browser.fixed_element($div);
				};
			}
			return this;
		},
		'showDialog':function(url){
			var feature;
			if(document.all){//IE
				feature="dialogWidth:300px;dialogHeight:200px;status:no;help:no";
				this.window=window.showModalDialog(url,null,feature);
			}else{
				//modeBrowserDialog可以将modal换成dialog=yes
				feature ="width=300,height=200,menubar=no,toolbar=no,location=no,";
				feature+="scrollbars=no,status=no,modal=yes";
				this.window=window.open(url,null,feature);
			}
		},
		'showDialog_close':function(){
			if(this.window){
				this.window.close();
			}

		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Browser对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Browser,System.Helper,1);
	System['Browser']=Browser;

});