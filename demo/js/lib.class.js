/*
 * my_libs 0.1 pre
 * 创建人：龙昊宏
 * 名称：基类
 * 功能：服务于调用类
 *			
 *	修改日期：2014/12/19	
 *
 * Copyright Software 
 * 
 * 
 */



/**
*
* 对Date的扩展，将 Date 转化为指定格式的String 
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* 例子： 
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
*
*
*/
Date.prototype.Format = function(fmt) { //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}


String.prototype.trim=function(){//替换所有前后空格！
	return this.replace(/(^\s+)|\s+$/g,"");
};

/**
 * 返回一个数组元素的下标，返回下标
 * @param val
 * @returns {Number}
 */
Array.prototype.indexOf=function(o){
	for(var i=0,len=this.length;i < len;i++){
		if(this[i] == o)
			return i;
	}
	return-1;
};

/**
 * 返回一个数组元素的下标，返回下标
 * @param val
 * @returns {Number}
 */
Array.prototype.lastIndexOf=function(o){
	for(var i=this.length-1;i>=0;i--){
		if(this[i]==o)
			return i;
	}
	return-1;
};

/**
 * 根据内容删除一个元素，返回数组
 * @param val
 */
Array.prototype.remove = function(val) {    
	var index = this.indexOf(val);      
	if (index > -1)          
		this.splice(index, 1);    
}; 
/**
 * 数组根据下标删除一个元素，返回一个删除后的数组
 * @param n
 * @returns
 */
Array.prototype.del=function(n) {  //n表示第几项，从0开始算起。
    //prototype为对象原型，注意这里为对象增加自定义方法的方法。
      if(n<0)  //如果n<0，则不进行任何操作。
        return this;
      else
        return this.slice(0,n).concat(this.slice(n+1,this.length));
        /*
          concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
          　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
         　　　　　　组成的新数组，这中间，刚好少了第n项。
          slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
        */
}
 
//添加一个数组包含的方法
// Array.prototype.contains = function(obj) {
//         var i = this.length;
//         while(i--)
// 			if (this[i] === obj)
// 				return true;
// 		return false;
// } ;

Array.prototype.contains=function(o){
	return this.indexOf(o) != -1;
};

Array.prototype.copy=function(o){
	return this.concat();
};
Array.prototype.insertAt=function(o,i){
	this.splice(i,0,o);
};
Array.prototype.insertBefore=function(o,o2){
	var i=this.indexOf(o2);
	if(i== -1)
		this.push(o);
	else 
		this.splice(i,0,o);
};


Array.prototype.removeAt=function(i){
	this.splice(i,1);
};
Array.prototype.remove=function(o){
	var i=this.indexOf(o);
	if(i!= -1)
		this.splice(i,1);
};



Function.READ=1;
Function.WRITE=2;
Function.READ_WRITE=3;
//添加属性
Function.prototype.addProperty=function(sName,nReadWrite){
	nReadWrite=nReadWrite||Function.READ_WRITE;
	var capitalized=sName.charAt(0).toUpperCase()+sName.substr(1);
	if(nReadWrite&Function.READ)
		this.prototype["get"+capitalized]=new Function("","return this._"+sName+";");
	if(nReadWrite&Function.WRITE)
		this.prototype["set"+capitalized]=new Function(sName,"this._"+sName+" = "+sName+";");
};
//函数在原型里定义一个方法
Function.prototype.method=function(name,fn){
	this.prototype[name] = fn;
};


window.System={
	/**
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2015-3-18
	 * 名称：window.System.main
	 * 功能：程序主方法
	 * 说明：
	 * 注意：
	 * @param   (Function)fn 			NO NULL :调用main 方法要执行的操作
	 * @param   (Object)Obj 			   NULL :改变回掉方法中的this对象，默认为System 对象
	 * @return  (Object)						:返回Obj对象
	 * Example：
	 */
	'main':function(fn,Obj){
		if(!fn) return this;
		var Obj=Obj||this;
		if(fn){
			fn.call(Obj);
		}
		return Obj;
	},

	/**
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2015-3-18
	 * 名称：window.System.obj_len
	 * 功能：返回指定对象下面成员数量
	 * 说明：
	 * 注意：
	 * @param   (Object)Obj 			   NULL :指定的对象
	 * @return  (Number)						:返回成员数量
	 * Example：
	 */

	'obj_len':function(obj){
		obj=obj||this;
		var n=0,i;
		for(i in obj) 
			n++;
		return n;
	},


	/**
	 * 
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-3-18
	 * 修改日期：2015-3-19
	 * 名称：window.System.extends
	 * 功能：子类继承父类对象
	 * 说明：System类范围内
	 * 注意： 
	 * @param   (Object)this 			NO NULL :子类对象
	 * @param   (Function)o_sub 		   NULL :子类名称
	 * @param   (Function)o_super   	NO NULL :父类名称
	 * @param   (String)type 			NO NULL :1:原型链继承;默认2:对象冒充方式继承 
	 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
	 * @return  (void)
	 * Example：
	 *		对象冒充方式继承:window.System.extends.call(this,o_sub,o_super,type,[a,b,c,...]);
	 *		原型链继承:window.System.extends(o_sub,o_super,type);
	 */
	'extends':function(o_sub,o_super,type,arg){
		type=type || 2;
		arg = arg || null;
		switch(type){
			case 1:
				var _super=o_super.prototype;
				var _sub=o_sub.prototype;
				for(var v in _super){
					if(!_sub[v]){
						_sub[v]=_super[v];
					}
				}
			break;
			case 2:
				if(arg && arg.length > 0){
					o_super.apply(this,arg);
				}else{
					o_super.call(this);
				}
			break;
			

			default:
				alert('error： type 非法类型');

		}
		
		
	},

	 /**
	 * 
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-3-18
	 * 修改日期：2015-3-18
	 * 名称：window.System.extends
	 * 功能：在指定对象的原型链上动态扩充方法
	 * 说明：调用call方法改变this指针
	 * 注意：调用必须用call方法
	 * @param   (Object)this 			NO NULL :指定对象
	 * @param   (String)name   			NO NULL :扩充的方法名称
	 * @param   (Function)fn 			NO NULL :方法原型
	 * @return  (void)
	 * Example：在window.System.Basis 的原型上扩充一个set方法
	 *		window.System.extends_f.call(window.System.Basis,'set',function(){});
	 */
	'extends_f':function(name,fn){
		this.prototype[name]=fn;
	},



	/**
	 * 
	 * @author lhh
	 * 产品介绍：覆写方法
	 * 创建日期：
	 * 修改日期：
	 * 名称： 
	 * 功能：
	 * 说明： 
	 * 注意： 
	 * @param   (Function)old_fn 	 NO NULL : 
	 * @param 	(Function)new_fn     NO NULL :
	 * Example：
	 *		
	 */
	'override_f':function(old_fn,new_fn){
		old_fn=new_fn;

	},




	 /**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-27
	 * 修改日期：2014-11-27
	 * 名称：autoCenter
	 * 功能：元素自定垂直居中容器中间
	 * 说明：
	 * 注意：
	 * @param(Number) 		NO NULL : W  容器宽
	 * @param(Number) 		NO NULL : w  元素宽
	 * @param(Number) 		NO NULL : H  容器高
	 * @param(Number) 		NO NULL : h  元素高
	 * @param(Number) 		NULL 	: p  有padding值时 
	 * @return (Object) 返回居中位置的xy 坐标 	
	 * Example：
	 *		window.System.autoCenter(500,10,500,10,0);
	 */
	'autoCenter':function(W,w,H,h,p){
		p=p || 0;
		W=parseInt(W);
		w=parseInt(w);
		H=parseInt(H);
		h=parseInt(h);
		p=parseInt(p);
		if(!W || !w || !H || !h) return 0;
		return {'x':parseInt((W-w-p)/2),'y':parseInt((H-h-p)/2)};
	}
};

//Documentation:
/*--------------------------------------------------------------------------------------------------
	//要继承System.Basis这个类都要加这么一段
	//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
	if(window.System && window.System.Basis ) {
		if(!this.setBrowser){
			window.System.Basis.call(this);
		}
		//如果它下面的子类已经设置了浏览器就不再设置浏览器
		if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
		
	}else{
		alter("Error: without System.Basis class");
		return 0;
	}
	var __this__=this;
--------------------------------------------------------------------------------------------------*/
	


(function(window, undefined){
	if(!window.System) {
		alert('without nothing the class of window.System');
	}
	
	/**
	 * 
	 * @author lhh
	 * 创建日期：2014/12/10
	 * 修改日期：2014/12/10
	 * 名称：private (Number) contains
	 * 功能：检查一个对象是否包含在另外一个对象中的方法，contains方法。MSIE和FireFox分别提供了检查的方法
	 * 注意：这个函数在IE中不支持,但文档上却写在在FF中原本为4的结果,在IE中为2
	 * 说明：ExtJS的源码用到的方法 
	 * @param   parentNode() 	NO NULL : 
	 * @param 	childNode()     NO NULL :  
	 * Example：
	 *		
	 */
	var contains=function(parentNode, childNode){
	    if (parentNode.contains) {
	        return parentNode != childNode && parentNode.contains(childNode);
	    } else {
	        return !!(parentNode.compareDocumentPosition(childNode) & 16);
	    }
	};
	/**
	 *----------------------------------
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014.9.28
	 * 修改日期：2014.9.28
	 * 名称：private isType
	 * 功能：判断数据是什么类型的
	 * 说明：
	 * 注意：
	 * @param   (var)type 			NO NULL :
	 * 调用方式：this.isString('aaaa');
	 * Example：
	 *----------------------------------*/
	var isType=function(type) {
	  return function(obj) {
	    return Object.prototype.toString.call(obj) === "[object " + type + "]";
	  }
	};

	var __this__=null;
	function Basis(){
		__this__=this;
		this._super ={};
		this.reg={
			'email'   : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			'email_2' : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        	'phone'   : /^(13[0-9]{9})|(15[89][0-9]{8})$/
		};
		this.Browser=null;
		this.setBrowser=function(Browser){
			if(Browser && !this.Browser){
				this.Browser=Browser;
			}
		};

		

		
		this.isObject   	= isType("Object");
		this.isString   	= isType("String");
		this.isArrayI    	= Array.isArray || isType("Array");
		this.isFunction 	= isType("Function");

		/*-------------------------------------------------------------------------------------------------*/

	}



	/*-------------------------------------------------------------------
	static mothed
	---------------------------------------------------------------------------*/
	Basis.jQuery=function(url){
		!window.jQuery && document.write('<script js="'+url+'" type="text/javascript"><\/script>');
	};

	Basis.addFavorite=function(address,name){//添加到收藏夹（地址，关键字）
		if(window.external && ("addFavorite" in window.external)){//IE
			window.external.addFavorite(address,name);
		}else if(window.sidebar && window.sidebar.addPanel){//FF
			window.sidebar.addPanel(name,address,name);
		}else{
			alert("加入收藏失败，请按Ctrl+D进行添加");
		}
	};
	

	Basis.changeBgColor=function(dom_table,color){//(节点对象)表格每行鼠标移上去变色，移出恢复
		var table=dom_table;
		var tr=table.rows;
		for(var i=0,len=tr.length;i<len;i++){
			tr[i].onmouseover=function(){
				this.style.backgroundColor=color;
			};
			tr[i].onmouseout=function(){
				this.style.backgroundColor="";
			};
		}
	};

	/**
	 *----------------------------------
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-1-15
	 * 修改日期：2015-1-15
	 * 名称：window.System.Basis.fixEvt
	 * 功能：解决事件兼容问题
	 * 说明：
	 * 注意：
	 * @param   (event)event 			NO NULL :
	 * Example：
	 *----------------------------------*/
	Basis.fixEvt=function(event){//解决事件兼容问题
		var e = event || window.event || arguments.callee.caller.arguments[0];
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
	Basis.fixed_element=function($elem){
		if(!window.lly_befor_scrollTop) window.lly_befor_scrollTop=0;
		var scrollTop = $(document).scrollTop(),
			top=$elem.offset().top;
		
		if(scrollTop>0 || lly_befor_scrollTop<scrollTop){
			top=top+scrollTop;
			$elem.css('top',top);
			lly_befor_scrollTop=scrollTop;
		}else if(scrollTop<0 || lly_befor_scrollTop>scrollTop){
			top=top-scrollTop;
			$elem.css('top',top);
			lly_befor_scrollTop=scrollTop;
		}
	};


	//绑定事件的句柄
	Basis.handler=function(Event,functions){//哪个事件发生了？
		var evt=System.Basis.fixEvt(Event);
		//evt.type :当前 Event 对象表示的事件的名称
		var functions=functions[evt.type];//
		for(var i=0,len=functions.length;i<len;i++){
			if(functions[i]) 
				functions[i].call(this,evt);//call的方法起到一个对象冒充的作用（把指向window对象变成指向当前对象）
		}
	};
	//添加事件
	Basis.addEvent=function(obj,evt,fn){
		if("[object Opera]"==String(window.opera)){
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
			if(__this__.isF(obj["on"+evt])){//检测是否已经注册过事件监听函数
				if(obj["on"+evt] != Basis.handler) 
					functions.push(obj["on"+evt]);//
			}
			obj["on"+evt]=function(){
				Basis.handler.call(this,functions);
			};
		}
		return obj;
	};
	
	
	 /**
	 * 
	 * @author lhh
	 * 创建日期：2014/12/10
	 * 修改日期：2014/12/10
	 * 名称：public (Number) System.Basis.contains
	 * 功能：检查一个对象是否包含在另外一个对象中的方法，contains方法。MSIE和FireFox分别提供了检查的方法
	 * 注意：这个函数在IE中不支持,但文档上却写在在FF中原本为4的结果,在IE中为2
	 * 说明：ExtJS的源码用到的方法 
	 * @param   parentNode() 	NO NULL : 
	 * @param 	childNode()     NO NULL :  
	 * Example：
	 *		
	 */
	Basis.contains=function(parentNode, childNode){
	    return contains(parentNode, childNode);
	};

	Basis.getRealStyle=function(o,key){//（对象，属性名）获取当前的style元素里的css属性值
		// var style;
		// if(window.getComputedStyle){//W3C
		// 	Style=window.getComputedStyle(obj,null);
		// }else if(obj.currentStyle){//IE
		// 	Style=obj.currentStyle;
		// }
		// return sytle[s];

		return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];     
    	//document.defaultView.getComputedStyle 这是w3c标准方法，取得元素的样式信息，因为有些样式是在外部css文件定义的，所以用element.style是取不到的 如果是IE,可以用 element.currentStyle["name"] 
	};
	Basis.addRule=function(sheet,selector,cssText,i){//向指定样式表中添加一个CSS规则
		if(sheet.insertRule){//W3c
			sheet.insertRule(selector+"{"+cssText+"}",i);
		}else if(sheet.addRule){//IE
			sheet.addRule(selector,cssText,i);
		}
	};
	Basis.delRule=function(sheet,index){
		if(sheet.deleteRule){
			sheet.deleteRule(index);
		}else if(sheet.removeRule){
			sheet.removeRule(index);
		}
	};
	Basis.setLinkStyle=function(arg){//动态切换样式表
		/**
		{
			csslink:document.getElementById('dom'),
			url:"skin/style/css/",
			event:'onclick',
			color:
			...
		}
		*/
		for(i in arg){
			if("csslink"===i || "url"===i || "event"===i) {continue;}
			(function(i){
				arg[i][arg['event']]=function(){
					arg["csslink"].setAttribute("href",arg["url"]+i+".css");
				};
			})(i);
		}
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
	Basis.getBodySize=function(get,n,show) {
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
	Basis.getViewWH=function(){
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
	Basis.getBodyWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=document.compatMode ==="CSS1Compat" && document.documentElement["scroll".concat(a)] || document.body["scroll".concat(a)];
		});
		return wh;
	};

	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) inputSizeGetProportion
	 * 功能：输入宽和高返回尺寸的比例
	 * 参数：Number $a
	 * 		 Number $b
	 * Example:
	 *		window.System.Basis.inputSizeGetProportion(1280,720);
	 *		w = 1280;
	 *		h = 720;
	 *		n = gcd(w, h);
	 *		echo w/n, ':', h/n; 
	 * 
	 */
	Basis.inputSizeGetProportion=function(w, h) {
	  var gcd=function($a,$b){
	  	if($a%$b){
		   return gcd($b, $a%$b);
		}else{
		   return $b;
		}
	  };
	  
	  var n=gcd(w,h);
	  return w/n+' : '+h/n;
	};
	
	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) forSizeforSize
	 * 功能：输入1280px 参考尺寸返回一个什么样的宽度符合被平均分成3份并且符合 4:6 的一个尺寸
	 * 参数：Number a 
	 * 		 Number b
	 * 		 Number size
	 * 		 Number n
	 * Example:
	 *		window.System.Basis.forSize(4,6,1280,3);
	 *		return :1280被平分3份后能被4整除，width,height
	 * 
	 */
	Basis.forSize=function(a, b,size,n) {
	  	var w=h=0;
	  	while(true){
	  		if(0 === size%n && size !=0){
	  			//求出符合几比几的宽度
	  			w=size/n;
	  			if(0 === w%a){
	  				//求出符合几比几的高度
	  				h=(w/a)*b;
	  				return size+'被平分'+n+'份后能被'+a+'整除,得出最适合尺寸是：\
 						 W: ('+size+'/'+n+')='+w+'  \
						 H: ('+size+'/'+n+'/'+a+'*'+b+')='+h;
	  			}

	  		}
	  		size++;
	  	}

  	};

  	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(Array) getToSize 
	 * 功能：输入开始尺寸到结束尺寸范围内获取几比几的一个比例下有多少组尺寸符合
	 * 参数：Number a 
	 * 		 Number b 
	 * 		 Number s 开始值
	 * 		 Number e 结束值
	 *
	 * Example:
	 *		window.System.Basis.getToSize(4,6,1280,15000);
	 * 
	 */
	Basis.getToSize=function(a, b,s,e) {
	  	if(!s) return;
	  	var arry=[];
	  	while(true){
	  		if(0 === s%a && s !=0){
	  			//arry.push({'w':s,'h':s/a*b});
	  			arry.push('{w:'+s+', h:'+(s/a*b)+'}');
	  		}
	  		if(s>e){
	  			return arry;
	  		}
	  		s++;
	  	}

  	};

  	/**
	 *----------------------------------
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-3-18
	 * 修改日期：2015-3-19
	 * 名称：window.System.Basis.extends
	 * 功能：继承Basis类
	 * 说明：Basis类静态方法。 调用call方法改变this指针
	 * 注意：调用必须用call方法
	 * @param   (Object)this 			NO NULL :子类对象
	 * @param   (Function)o_super   	NO NULL :父类名称 
	 * @param   (String)type 			NO NULL :1:原型链继承;默认2:对象冒充方式继承 
	 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
	 * @return  (void)
	 * Example：
	 *		window.System.Basis.extends.call(this,o_super,type,[a,b,c,...]);
	 */
	Basis.extends=function(o_super,type,arg) {
		o_super = o_super  || window.System.Basis;
		type 	  = type || 2;
		arg = arg || null;
	  /*--------------------------------------------------------------------------------------------------*/
		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && o_super ) {
			if(!this.setBrowser){
				window.System.extends.call(this,null,o_super,type,arg);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			// if(Browser && (typeof Browser  !='undefined') && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without "+o_super);
			return 0;
		}
	  /*--------------------------------------------------------------------------------------------------*/
		 
	};


	Basis.prototype={
		'constructor': Basis,
		'each':function(a,fun){
			if(!a || !this.isF(fun)) 
				return;
			for(var i=0,len=a.length;i<len;i++)
				fun.call(a[i],i,a[i]);
		},
		
		/**
		 * 如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象位置
		 * @ Obj : 对象
		 * @ fn : 回调的方法
		 */
		'list':function(Obj,fn){
			var k,v;
			if(!this.isO(Obj)) 
				return Obj;
			for(k in Obj){
				this.list(Obj[k],fn);
				if(this.isF(fn)){v=Obj[k];fn.call(Obj,k,v);}
			}
		},
		/**
		 * 
		 * 创建人：lhh
		 * 功能：输入一个下标索引返回对象的 value
		 * 名称：putIndexGetObjectTheValue
		 * 创建日期：2014.6.15
		 * 修改日期：2014.6.15
		 * @param(Object) 		NO NULL : Obj 
		 * @param(int) 			NO NULL : n 
		 * @return (var) 	
		 */
		'putIndexGetObjectTheValue':function(obj,n){
			//输入的一定是对象和数字
			if(this.isO(obj) && this.isNum(n)){
				//防止输入的下标大于对象的长度
				if(window.System.obj_len(obj) < n){
					return false;
				}else{
					var i=0;
					for(var key in obj){
						
						if(i==n){
							return obj[key];
						}else{
							i++;
						}
					}
				}

			}else{
				return false;
			}
			return false;
		},
		'$':function(id){return document.getElementById(id);},
		'isS':function(s){
			return !this.is_numeric(s) && ('string' === typeof s);
		},
		'isF':function(fn){return ('function'=== typeof fn);},
		'isO':function(obj){
			if(obj instanceof Object) return true;
			var flag=false;
			if('object'===typeof obj){
				for(var i in obj)
					return true;
			}else{
				flag=false;
			}
			return flag;
		},

		'isEmptyObject':function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
		},

		'error':function( msg ) {
			throw new Error( msg );
		},

		'isset':function(s){return (typeof s != "undefined");},
		//检测是否是数字
		'is_numeric':function(n){
			return !isNaN(n);
		},
		'isArray':function(arr){
			return (arr.constructor === Array) || (arr instanceof Array) || (Object.prototype.toString.call(arr) === '[object Array]');
		},
		
		'empty':function(s) {
		    return !(this.isset(s) && String(s).trim() != '' && s != null);
		},
		
		'arr_isEmpty':function(arr){
		    if(this.isArray(arr)){
		    	if(!arr.length){
			    	return true
			    }else{
			    	return false; 
			    } 
		    }else{
		    	alert('这不是数组');
		    }
		    
		},
		'findClass':function(node,attName){
			for(var i=0,len=node.attributes.length;i<len;i++){
				if(node.attributes[i].nodeName==attName)
					return true;
			}
			return false;
		},
		//取消HTML代码
		'shtmlspecialchars':function($string) {
	        $unallowed = {
	                '&': '&',
	                '"': '"',
	                '<': '<',
	                '>': '>'
	        };
	        for($p in $unallowed){
	                 $string = $string.replace(eval('/'+$p+'/g'), $unallowed[$p]);
	        }
	        return $string;
		},
		
		'getStyle':function(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		},

		
		'addClass':function(obj,className){//给指定元素添加类名
			obj.className+=" "+className;
			return obj;
		},
		'delClass':function(obj,className){
			var s=obj.className.split(/\s+/);
			for(var i=0,len=s.length;i<len;i++){
				if(s[i]==className) {
					delete s[i];
				}
			}
			obj.className=s.join(" ");
			return obj;
		},

		'hasClass':function(node,classNames){//测试一个元素是否有多个类名
			var names=node.className.split(/\s+/);
			for(var i=0,len=names.length;i<len;i++){
				if(names[i]==classNames) {
					return true;
				}
			}
			return false;
		},


		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：[] getElementsByClass
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   (Dom)object 			NO NULL :dom节点
		 * @param   (String)tag 			NO NULL :标签名称
		 * @param   (String)className 		NO NULL :要查找的类名称
		 * Example：
		 *----------------------------------*/
		'getElementsByClass':function(object, tag, className){//获取类名集合
			var object = object || document,
				tag    = tag    || "*";
			if(object.getElementsByClassName)
				return object.getElementsByClassName(className);
			var tags=object.getElementsByTagName(tag);
			var ret=[];
			for(var i=0,len = tags.length; i < len;i++){
				if(this.hasClass(tags[i],className))
					ret.push(tags[i]);
			}
			if (1 === ret.length) 
				return ret[0];
			return ret;
		},

		
		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：[] getByClass
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   (String)s			NO NULL :class 名称
		 * @param   (String)p 			NO NULL :
		 * @param   (String)t 			NO NULL :
		 * Example：
		 *----------------------------------*/
		'getByClass':function(s,p,t){//使用class获取元素
			var reg=new RegExp('\\b'+s+'\\b');
			var aResult=[];
			var aElement=(p||document).getElementsByTagName(t || '*');

			for(var i=0;i<aElement.length;i++)
			{
				if(reg.test(aElement[i].className))
				{
					aResult.push(aElement[i])
				}
			}
			return aResult;
		},


		'css':function(obj,attr,value){//多个同名元素设置用同一样式
			if(undefined==obj.length){
				obj.style[attr]=value;
			}else{
				for(var i=0,len=obj.length;i<len;i++)
					obj[i].style[attr]=value;
			}
		},
		
		
		'getCookie':function(name){//获取Cookie
			var cookies=document.cookie.split("; ");
			for(var i=0,c,len=cookies.length;i<len;i++){
				c=cookies[i].split('=');
				if(c[0]==name) 
					return decodeURIComponent(c[1]);
			}
			return '';
		},
		/*----------------------------------
		filter all string return number of them
		过滤所有字符串返回数字
		Number filter_char(String s);
		---------------------------------*/
		'filter_char':function(s){return String(s).replace(/[^\d]*/ig,"");},
		

		'find_str':function(s){
			if(""===s) 
				return;
			return String(s).match(/[^\d]*/i);
		},
		
		'compare_two_str':function(s1,s2){
			if(s1=="" || s2=="") 
				return false;
			s1=String(s1).match(/[^\d]*/i);
			s2=String(s2).match(/[^\d]*/i);
			if(s1==s2)
				return true;
			else
				return false;
		},
		'swap':function(A,B){
			return [B,A];
		},
		
		
		'sort':function(a,b,fn){},

		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2014-12-22
		 * 名称：每隔规定的时间数再去调用传进来的函数
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param   (Function)fn 			NO NULL :
		 * @param   (Number)time 			NO NULL :
		 * Example：
		 *----------------------------------*/
		'sleep':function(fn,time){
		   
		   	if(this.isF(fn)) {
			   	time=time || 30;
			   	if(fn.timer){
			      clearTimeout(fn.timer);
			    }
			    fn.timer = setTimeout(fn, time);
			}else{
				return -1;
			}
		},

		/**
         *----------------------------------
         * @author lhh
         * 产品介绍：
         * 创建日期：2014-12-20
         * 修改日期：2014-12-20
         * 名称：queues
         * 功能：队列 
         * 说明：
         * 注意：
         * @param   (Array)arr          NO NULL :
         * @param   (Number)n           NO NULL :算时间差的值
         * @param   (Function)fn        NO NULL :
         * Example：
         *----------------------------------*/
        'queues':function(arr,n,fn){
           if(!this.isF(fn)) return -1;
           var time=0;
           for(var i=0,len=arr.length; i<len; i++){
                time = n*i;
                fn.call(arr[i],time,i);
                
            }
        },
		
		'getDocument_body':function(){
			return document.documentElement || document.body;
		},

		/**
         *----------------------------------
         * @author lhh
         * 产品介绍：
         * 创建日期：2014-12-25
         * 修改日期：2014-12-25
         * 名称：(Number) getScrollTop
         * 功能：获取滚动条距离顶端的距离
         * 说明：支持IE6 
         * 注意：
         * Example：
         *----------------------------------*/
		'getScrollTop':function(){
		        var scrollPos;  
		        if (window.pageYOffset){  
			        scrollPos = window.pageYOffset; 
			    }else if (document.compatMode && document.compatMode != 'BackCompat'){
				    scrollPos = document.documentElement.scrollTop; 
				}else if (document.body) {
					scrollPos = document.body.scrollTop;
				}   
		        return scrollPos;
		},
		/**
		 * 
		 * @author lhh
		 * 功能：窗口重新调整大小
		 * 名称：winResize 
		 * 创建日期：2014-11-28
		 * 修改日期：2014-11-28
		 * @param	        $div(jQuery obj) NO NULL : //被居中的容器
		 * @param(Object) 	fn(Function)        NULL : callBack 
		 * 调用方式：var lib=new  window.System.Basis();
		 				 lib.winResize($('div'),function(){
			             var size=window.System.autoCenter($(window).width(),this.width(),
																  $(window).height(),this.height(),100);
								this.css({'top':size.y+'px',
										 'left':size.x+'px'
										});
			        });
		 * 
		 */
		'winResize':function($div,fn){
			var run=function(){
				if(__this__.isF(fn)){
					fn.call($div,{'w':$(window).width(),'h':$(window).height()});
				}else{
					alert('缺少回调函数');
				}
				
			};
			$(window).resize(function() {
				run();
			});
			run();
			return run;
			

		},
		/**
		 * 创建日期：2014/12/1
		 * 修改日期：2014/12/1
		 * 名称：(vido) setFixed
		 * 功能：给元素设置固定样式
		 * @param	$div(jQuery obj) NO NULL : //被设置的元素
		 * @param 	fn(Function)        NULL : callBack 在scroll 时要执行的行为
		 * 		  
		 *			
		 */
		'setFixed':function($div,fn){
			if('fixed' != $div.css('position')){
				$div.css('position','absolute');
				$(window).scroll(function() {
					__this__.isF(fn) && fn();
					Basis.fixed_element($div);
				});
			}

		},

		/**
		 * 创建日期：2014/8/26
		 * 修改日期：2014/8/26
		 * 名称：(vido) setIEfixed
		 * 功能：IE 6,7固定位置
		 * 参数： $elem (jQuery obj)
		 *			
		 */
		'setIEfixed':function($elem){
			if(this.Browser != null && this.Browser != undefined && this.Browser.isIE6()){
				$elem.css('position','absolute');
				$(window).scroll(function() {
					$elem.animate({'top': $(document).scrollTop()},10);
					
						
				});
			}
		},
		'bind':function(obj,evt,fn){//给某个对象添加多个事件监听函数
			return Basis.addEvent(obj,evt,fn);
		},
		
		'unbind':function(obj,evt,fn){//删除事件监听
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
		},

		/**
		 * 创建日期：2014/11/28
		 * 修改日期：2014/11/28
		 * 名称：(vido) autoScreenCenter
		 * 功能：自动居中屏幕，回调函数可以不传，传过回调函数后就能在一个指定范围中垂直居中对齐
		 * @param	$div(jQuery obj) NO NULL : //被居中的容器
		 * @param 	padding(intger)     NULL : callBack 
		 * @param 	fn(Function)        NULL : callBack 自定义居中外围的容器
		 * 		  
		 *			
		 */

		'autoScreenCenter':function($div,pandding,fn){
			pandding=pandding || 0;
			if(!('fixed' === $div.css('position'))){
				$div.css('position','absolute');

			}
			var run=this.winResize($div,function($window){
				if(__this__.isF(fn)){
					fn.call($div,$window);
				}else{
					var size=window.System.autoCenter($window.w,this.width(),
												 $window.h,this.height(),pandding);
					this.css({'top':size.y+'px',
							 'left':size.x+'px'
							});
				}
				
			});
			
			if('fixed' != $div.css('position')){
				this.setFixed($div,run);
			}else{
				run=null;
			}
		},

		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2014-12-23
		 * 名称：mousewheel
		 * 功能：鼠标滚轮事件注册
		 * 说明：dom 是滚动的范围区域
		 * 注意：这个功能只能在鼠标滚动时返回滚动的方向,和滚轮滚动判断方向的值
		 * @param   (Dom)dom 			NO NULL :dom节点对象
		 * @param   (Function)fn 		NO NULL :返回滚动方向
		 * Example：
		 *----------------------------------*/
		'mousewheel':function(dom,fn){
			//鼠标滚轮事件处理函数
			//direction 
			if(!dom) return "dom 参数必填";
			var fnMouseWheel=function(e) {
			    var evt = System.Basis.fixEvt(e);
			    var wheelDelta = evt.wheelDelta || evt.detail; //鼠标滚动值，可由此判断鼠标滚动方向
			    if (wheelDelta == -120 || wheelDelta == 3 || wheelDelta < 0){
			    	fn.call(evt,{'direction':'down','wheelDelta':wheelDelta});
			    }else if (wheelDelta == 120 || wheelDelta == -3 || wheelDelta > 0){
			       fn.call(evt,{'direction':'up','wheelDelta':wheelDelta});
			    }
			};

			//if (dom.addEventListener) {  //for firefox
			    //dom.addEventListener("DOMMouseScroll", fnMouseWheel);
			    this.bind(dom,"DOMMouseScroll",fnMouseWheel);
			//}
			
			dom.onmousewheel = fnMouseWheel; // for other browser
		},




		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：extends
		 * 功能：动态继承对象
		 * 说明：
		 * 注意：在实例化Basis对象时调用此方法
		 * @param   (Object)sub 			NO NULL :
		 * @param   (Object)_super 			NO NULL :
		 * @return  (Object)						:返回继承完父类后的子类对象
		 * Example：
		 *----------------------------------*/
		'extends': function( sub,_super) {
		  var key, value;
		  for (key in _super ) {
		    value = _super[key];
		    if (null == sub[key]) {
		      sub[key] = value;
		    }
		  }
		  return sub;
		}
	};

	

	window.System.Basis=Basis;
})(window);





(function(window,undefined){
	function Browser(){
		window.System.Basis.extends.call(this);
		var __this__=this;
		this.close=null;
		/*--------------------------------------------------------------------------------------------------*/
		
		/**
		 *----------------------------------
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
		 *----------------------------------*/
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
		this.getExplorer=function(){
			return getExplorer();
		};
		this.where=function(){};
		this.isIE=function(){
			return !!window.ActiveXObject;
			//简短
			//return !-[1,];
			//浏览器检测
			//return /MSIE/.test(navigator.userAgent);
		};
		this.isIE6=function(){
			//if(!-[1,] && !window.XMLHttpRequest){
			if(this.isIE() && !window.XMLHttpRequest){
				return true;
			}else{
				return false;
			}
		};
		this.isIE7=function(){
			if(this.isIE() && !this.isIE6() && !this.isIE8()){
				return true;
			}else{
				return false;
			}
		};

		this.isIE8=function(){
			if(this.isIE() && !!document.documentMode){
				return true;
			}else{
				return false;
			}
		};

		this.isFirefox=function(){
			return (2===getExplorer());
		};
		
		this.isChrome=function(){
			return (1===getExplorer());
		};

		this.isSafari=function(){
			return (4===getExplorer());
		};

		this.isOpera=function(){
			return (5===getExplorer());
		};

		this.innerSize=function(){//获取浏览器窗口视口宽度和高度
			return{
				width  : window.innerWidth  || document.documentElement.clientWidth,
				height : window.innerHeight || document.documentElement.clientHeight
			};
		};

		
		this.fixEvt=function(e){//解决事件兼容问题
			return System.Basis.fixEvt(e);
		};

		this.fixed=function(elem){//IE实现 css fixed
			var style = elem.style,
				dom = document.documentElement || document.body,
				top = parseInt(style.top);
			if(dom.scrollTop > 0 || old < dom.scrollTop){
				top=top+dom.scrollTop;
				style.top=top+"px";
				old=dom.scrollTop;
			}else if(dom.scrollTop < 0 || old > dom.scrollTop){
				top=top-dom.scrollTop;
				style.top=top+"px";
				old=dom.scrollTop;
			}
		};

		this.auto_center=function(pad,elem){
			var pad=pad||0,
				style=elem.style,
				height=parseInt(elem.offsetHeight),
				width=parseInt(elem.offsetWidth),
				h=parseInt(this.innerSize().height),
				w=parseInt(this.innerSize().width);
			

			var size=window.System.autoCenter(w,width,
											  h,height,pad);
			style.top =size.y+'px';
			style.left=size.x+'px';
			if(this.isIE6()){
				this.fixed(elem);
			}else{
				style.position="fixed";
			}
		};

		/**
         *----------------------------------
         * @author lhh
         * 产品介绍：
         * 创建日期：2015-2-13
         * 修改日期：2015-2-13
         * 名称：showDialog
         * 功能：新建窗口
         * 说明：
         * 注意：
         * @param   (Object)  init           NO NULL :
         *                                           {
         *                                             'url': ,
         *                                             'title':, 
         *                                             'width': ,
         *                                             'height': ,
         *                                             'scrollbars': 'no',
         *                                             'modal': 'yes',
         *                                             'status': 'no',
         *                                             'help': 'no',
         *                                             'menubar': 'no',
         *                                             'toolbar': 'no',
         *                                             'location': 'no'
         *                                           }
         * Example：
         *----------------------------------*/
		this.showDialog=function(init){
			var feature='',
				url 		=init.url,
				title 		=init.title,
				width 		=init.width,
				height 		=init.height,
				scrollbars 	=init.scrollbars || 'no',
				modal 		=init.modal 	 || 'yes',
				status 		=init.status 	 || 'no',
				help 		=init.help 		 || 'no',
				menubar 	=init.menubar 	 || 'no',
				toolbar 	=init.toolbar 	 || 'no',
				location 	=init.location 	 || 'no';
			
			if(document.all){//IE   
			   feature= "dialogWidth:"+width+"px;dialogHeight:"+height+"px;status:"+status+";help:"+help;
			   this.close=window.showModalDialog(url,title,feature);
		   	}else{  
			 //modelessDialog可以将modal换成dialog=yes  
			   feature ="width="+width+",height="+height+",menubar="+menubar+",toolbar="+toolbar+",location="+location+",scrollbars="+scrollbars+",status="+status+",modal="+modal;    
			   this.close=window.open(url,title,feature);  
		   	}  
		};

		this.showDialog_close=function(){
			if(this.close){
			   this.close.close();
		   	}  
			
		};


	}

	Browser.prototype={
		'constructor':Browser
	};

	window.System.extends(Browser,window.System.Basis,1);
	window.System.Browser=Browser;
})(window);


//运动框架
(function(window,jQuery,undefined){
	
	var $=jQuery;
	function Sport(Browser){
		window.System.Basis.extends.call(this);
		var __this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		function Move(obj,oTarget,fn){
			var iCur=0;
			var arr="";
			var bStop=true;
			for(arr in oTarget){
				if(arr=="opacity"){
					iCur=parseInt(parseFloat(__this__.getStyle(obj, 'opacity'))*100);
				}else{
					iCur=parseInt(__this__.getStyle(obj,arr));
				}
				if(isNaN(iCur)){iCur=0;}
				var speed=(oTarget[arr]-iCur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(oTarget[arr]!=iCur){bStop=false;}
				if(arr=="opacity"){
					obj.style.filter="alpha(opacity:"+(iCur+speed)+")";
					obj.style.opacity=(iCur+speed)/100;
				}else{
					obj.style[arr]=iCur+speed+"px";
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				obj.timer=null;
			}
			if(fn){fn();}
		}

		this.doMove=function (obj,oTarget,time,fn){
			var time=time||30;
			if(obj.timer){clearInterval(obj.timer);}
			obj.timer=setInterval(function(){Move(obj,oTarget,fn)},time);
		};


		this.startMove=function (obj,oTarget,time,fn){
			var time=time||30;
			if(obj.timer){clearInterval(obj.timer);}
			obj.timer=setInterval(function(){fn(obj,oTarget)},time);
		};




		/**
		 * 动画（对象，增量用对象方式传经来，开始值用对象方式传经来，时间）
		 * 
		 * 
		 */
	　　this.animation=function(obj,start,alter,dur){
			var linear=this.linear;
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
				for(var i in start){
					obj.style[i]=linear(start[i],alter[i],curTime,dur)+"px";
				}
				curTime+=50;
			},50);	
		};

		/**
		 * 优先用这个方法
		 * 
		 * 
		 */

		this.Animate=function(obj, json,time){
		   	time=time || 30;
		   	if(obj.timer){
		      clearInterval(obj.timer);
		    }
		    obj.timer = setInterval(function(){
		      for(var attr in json){
		        var iCur = parseInt(__this__.getStyle(obj, attr));
		        iCur = iCur ? iCur : 0;
		        var iSpeed = (json[attr] - iCur) / 3;
		        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		        obj.style[attr] = iCur + iSpeed + 'px';
		        if(iCur == json[attr]){
		          clearInterval(obj.timer);
		        }
		      }
		    }, time);
		};

		/**
		 * 动画（对象，{增量用对象方式传经来}，{开始值用对象方式传经来}，时间,函数）
		 * 
		 * 
		 */
		this.animation_A=function(obj,start,alter,dur,fx){
			/**
			参数说明：
			curTime:当前时间，即动画已经进行了多长时间，开始时间为0
			start:开始值
			dur:动画持续多长时间
			alter:总的变化量
			*/
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
				for(var i in start){
					obj.style[i]=fx(start[i],alter[i],curTime,dur)+"px";
				}
				curTime+=50;
			},50);	
			return t;
		};
		this.opacity=function(obj,opacity){//透明度（对象，透明度值）
			//var linear=this.linear;
			var setOpacity=this.setOpacity;
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
					obj.style=__this__.linear(start,alter,curTime,dur)+"px";
				curTime+=50;
			},50);	
		};
		this.setOpacity=function(obj,opacity){
			if(typeof obj.style.opacity=="string"){//FF
					obj.style.opacity=opacity/100;
			}else {//IE
				obj.style.filter="alpha(opacity="+opacity+")";
			}	
		};
		this.linear=function(start,alter,curTime,dur){//最简单的线性变化，即匀速运动
			return start+curTime/dur*alter;
		};
		this.quad=function(start,alter,curTime,dur){//加速变化
			return start+Math.pow(curTime/dur,2)*alter;
		};
		/**
		 * 动画（对象，样式属性，增量，开始值，结束值，时间）
		 * 
		 * 
		 */
		this.animation_B=function(obj,arrt,add,start,end,t){
			var saved=start;
			setInterval(function(){
				if(saved>=end) return;
				saved+=add
				obj.style[arrt]=saved+"px";					 
			},t);	
		};

	}

	Sport.prototype={
		'constructor':Sport
	};

	window.System.extends(Sport,window.System.Basis,1);
	window.System.Sport=Sport;
})(window,jQuery);


/**
 * 创建日期：2014-10-18
 * 修改日期：2014-12-15
 * 修改说明：添加partial属性可以指定某个区域可以拖到，不填默认拖到出入的dom
 * 			 添加a_valuesOfMouseDrag属性可以存储鼠标拖动的距离集合
 *			 在move方法中执行f_move这个回调方法传递一个参数，是时时返回每次拖拽时上下移动的数值
 *			 2014-12-15
 *			 添加了not_overflow方法用来限制拖拽时不能溢出限定范围外
 *			 添加了limit属性用来限定拖拽范围，如果不设默认是拖拽的区域
 * 名称：Drag
 * 功能：1.自由拖拽
 *		 2.鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
 *		 (Object)	init
 * Example:
 *			getElementById('node'),{
 *					 			//拖拽方向
 *								(String)	'coord':'x'
 *								//允许拖拽的区域
 *								(dom_node)	'arear': getElementById('node')
 *								}
 *		
 * 
 */

(function(window,undefined){
	
	function Drag(dom,init){//实现鼠标拖动元素
		
		if(!dom) return this;

		window.System.Basis.extends.call(this);
		var __this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		var set_postion=function(dom){
			dom.style.position='absolute';
		};


		
		//初始化
		this.L=this.T=this.disX=this.disY=0;
		this.dom=dom;
		this.drag_=false;

		set_postion(this.dom);
		init = init || {};
		if(!this.isEmptyObject(init)){
			this.arear		= init.arear 		|| null;
			this.coord		= init.coord 		|| null;
			this.noText		= init.noText 		|| null;
			this.sport		= init.sport 		|| null;
			this.f_start 	= init.f_start		|| null;
			this.f_end   	= init.f_end		|| null;
			this.f_move   	= init.f_move		|| null;
			this.partial  	= init.partial		|| this.dom;
			//限定拖拽的范围
			var limit  		= init.limit		|| this.dom;
			//限定一个范围内不让溢出,true 是溢出
			var b_ovf  		= init.b_ovf		|| false;
		}
		//记录鼠标拖动的距离集合
		a_valuesOfMouseDrag = [];
		//事件兼容类方法
		var fixEvt = System.Basis.fixEvt;
		var a_valueOfMouseDrag=null;
		//初始化限制范围左边和上边的溢出检测变量
		var L=T=0;
		
		this.partial.onmousedown=function(e){
			__this__.drag_=true;
			__this__.fnDown(e);
			
			if(__this__.noText){//拖动时不选择里面的文字
				return false;
			}
			
		};


		

		this.fnDown=function(e){
			e = fixEvt(e);
			this.disX = e.clientX - this.dom.offsetLeft;
			this.disY = e.clientY - this.dom.offsetTop;

			//保存鼠标点击下的xy坐标
			
			//设置捕获范围
			if(this.dom.setCapture){//鼠标按下去的时候全局捕获，兼容非标准浏览器
			  this.dom.setCapture();
			}else if(window.captureEvents){
			  window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			}
			e.stopPropagation(); 
			
			document.onmousemove=function(e){
				
				if(!__this__.drag_) return false;
				__this__.move(e);
			};
			document.onmouseup=function(){
				__this__.fnUp();

			};
		};

		
		//当鼠标移动时做的操作
		this.move=function(e){
            e = fixEvt(e);
            L=this.L=e.clientX-this.disX;
            T=this.T=e.clientY-this.disY;
            
            a_valueOfMouseDrag=[L,T];


            //时时返回每次按住不松开移动时x,y数值(返回的是数组)
            if(this.isF(this.f_move)){
                this.f_move.call(this,a_valueOfMouseDrag);
            }
            
            //存储记录鼠标拖动的距离集合(这个数组长度非常大，取消下面注释启用这个功能)
            if(a_valueOfMouseDrag){
                //a_valuesOfMouseDrag.push(a_valueOfMouseDrag);
            }
            switch(this.coord){
                case 'x':
                    return this.move_level(e);
                break;
                case 'y':
                    return this.move_vertical(e);
                break;
                default://自由拖拽
                    this.free();
            }

            
        };
		//拖拽不要溢出到现在范围外
		this.not_overflow=function(){
			if(L < 0){
				L = 0;
			}else if(L > document.documentElement.clientWidth  - limit.offsetWidth){
				L 	=	 document.documentElement.clientWidth  - limit.offsetWidth;
			}

			if(T < 0){
				T = 0;
			}else if(T > document.documentElement.clientHeight - limit.offsetHeight){
				T 	=	 document.documentElement.clientHeight - limit.offsetHeight;
			}
			return this;
		};
		this.free=function(){
			if(!b_ovf){
				this.not_overflow();
			}
          	
          	this.dom.style.left = L+'px';
			this.dom.style.top  = T+'px';
			return this;
		};

		this.move_level=function(){
			__this__.dom.style.left = L+'px';
			return this;
			
		};

		this.move_vertical=function(){
			__this__.dom.style.top = T+'px';
			return this;
		};

		this.fnUp=function(){
			__this__.drag_=false;
			
			//取消捕获范围
			//鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
           if(this.dom.releaseCapture){
              this.dom.releaseCapture();
           }else if(window.captureEvents){
              window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
           }

			document.onmousemove=null;
			document.onmouseup=null;

		};
		this.get_mouse_moveto_value=function(){
			if(!a_valueOfMouseDrag){

			}
		};
		//获取每次拖拽时上下移动的数值集合,返回数组类型
		this.a_getValuesOfMouseDrag=function(){
			return a_valuesOfMouseDrag;
		};

		
	}

	Drag.prototype={
		'constructor':Drag
	};

	window.System.extends(Drag,window.System.Basis,1);
	
	window.System.Drag=Drag;
	
})(window);

/**
 * 创建日期：2014-10-18
 * 修改日期：2014-10-22
 * 名称：Drag_xy
 * 功能：鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
         (Object)   init
 * Example:
            new window.System.Drag_xy(document.getElementById("first"),{
                                                       'coord':'y',
                                                       'that':F,
                                                       'window_h':window_h,
                                                       'arear':$sidebar[0],//
                                                       'sport':sport//运动对象
                                                     });
 *      
 * 
 */
(function(window,$,undefined){
    
    function Drag_xy(dom,init){//实现鼠标拖动元素
        
        if(!dom  && !init.coord) return this;

        window.System.Basis.extends.call(this,window.System.Drag,2,[dom,init]);
        var __this__=this;
        /*--------------------------------------------------------------------------------------------------*/
        var fixEvt = System.Basis.fixEvt;
        if(init.that) this.X=init.that;
        if(init.window_w) this.window_w=init.window_w;
        if(init.window_h) this.window_h=init.window_h;
        //是否到最后了
        var whetherToLast=function(coord,that){
            switch(coord){
                case 'x':
                    if(that.dom.width <= that.window_w+Math.abs(that.dom.offsetLeft)){
                        return true;
                    }else{
                        return false;
                    }
                break;
                case 'y':
                    if(that.dom.height <= that.window_h+Math.abs(that.dom.offsetTop)){
                        return true;
                    }else{
                        return false;
                    }
                break;
                default:
                    
            }
            
        };
        //对横纵向判读：如果头部没东西了就把区域拉到开始位置，如果末尾没东西了就拉到最后一个的位置
        var backTo=function(coord,that){
            switch(coord){
                case 'x':
                    if(that.dom.offsetLeft>0){
                        that.sport.Animate(that.dom,{
                                                'left':0
                                            },30);

                        
                        that.dom.style.left=0;
                    }else if(whetherToLast('x',that)){
                        //如果容器的宽度小于屏幕的宽度就把left 的值为0
                        if(that.dom.width > that.window_w){
                            that.sport.Animate(that.dom,{
                                                 'left':-(that.dom.width-that.window_w)
                                             },30);

                        

                            that.dom.style.left=-(that.dom.width-that.window_w)+'px';
                        }else{
                            that.dom.style.left=0;
                            return false;
                        }

                        
                         
                    }
                break;
                case 'y':
                    if(that.dom.offsetTop>0){
                          that.sport.Animate(that.dom,{
                                                 'top':0
                                             },30);

                        that.dom.style.top=0;
                    }else if(whetherToLast('y',that)){
                        var window_h=that.window_h;
                        if(that.dom.height > window_h){
                            that.sport.Animate(that.dom,{
                                                 'top':-(that.dom.height-window_h)
                                             },30);

                            that.dom.style.top=-(that.dom.height-window_h)+'px';
                        }else{
                            that.dom.style.top=0;
                            return false;
                        }
                        
                    }
                break;
                default:
                    
            }

        };
        
        this.fnDown=function(e){
            e = fixEvt(e);
            this.disX = e.clientX - this.dom.offsetLeft;
            this.disY = e.clientY - this.dom.offsetTop;
            //设置捕获范围
			if(this.dom.setCapture){//鼠标按下去的时候全局捕获，兼容非标准浏览器
			  this.dom.setCapture();
			}else if(window.captureEvents){
			  window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			}
			e.stopPropagation(); 
            
            document.onmousemove=function(e){
                __this__.move(e);
            };
            
            document.onmouseup=function(){
               if(__this__.dom.width){
                   backTo('x',__this__);
                }

                if(__this__.dom.height){
                    backTo('y',__this__);
                   //竖向拖的横向操作防止移除窗口时的位置出现回不去的问题
                   var X=__this__.X;
                   if(X.dom.width){
                       backTo('x',X);
                    }
                       
                }
                __this__.fnUp();
            };
        };

        //垂直拖拽要做的事
        this.move_vertical=function(e){
            var X=this.X;
            X.dom.disX = e.clientX - X.dom.offsetLeft;
            document.onmousemove=function(e){
                var t=e.clientY-__this__.disY;
                __this__.dom.style.top = t+'px';
                var l=e.clientX-X.dom.disX;
                X.dom.style.left = l+'px';
                

                var mouseup=function(){
                	if(X.dom.width){
                        backTo('x',X);
                        X.dom.onmouseup=null;
                        
                        //取消捕获范围
						//鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
			           if(X.dom.releaseCapture){
			              X.dom.releaseCapture();
			           }else if(window.captureEvents){
			              window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			           }

                       
                    }

                   if(__this__.arear){
                   		__this__.arear.onmouseup = null;
                   }

                    //取消捕获范围
					//鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
                    if(__this__.arear && __this__.arear.releaseCapture){
		              __this__.arear.releaseCapture();
		            }else if(window.captureEvents){
		              window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
		            }

                };

                if(__this__.arear){
                	__this__.arear.onmouseup = mouseup;	
                }
                
                X.dom.onmouseup=mouseup;

            };
        };
        
        
        
        
    }

    Drag_xy.prototype={
		'constructor':Drag_xy
	};

	window.System.extends(Drag_xy,window.System.Drag,1);
    
    window.System.Drag_xy=Drag_xy;
    
})(window,jQuery);




 /**
 * 
 * @author lhh
 * 名称：弹出层 
 * 功能：可自动居中且兼容IE6
 * 创建日期：2014-12-1
 * 修改日期：2014-12-1
 * @param	        popLayout(node) NO NULL : //弹出层
 * @param	        mask 	 (node)    NULL : //弹出层下的蒙版
 * @param 			padding(intger)    NULL : callBack 有padding值时 
 * @param 			Browser(Object)    NULL : 传浏览器对象用于处理兼容问题 (一般不用这个参数)
 * Example:
			pop=new System.PopupLayer('.sectionFixed-A1','.sectionMask-A2','1');
			$dom=$(pop.popLayout);
			$mask=$(pop.mask);
			pop.isIE().resize().setCenter().closed($('.sectionBox-B7 .icon'),function(){
				$mask.hide();
				$dom.hide();
			});
 * 
 */
(function(window,$){
	
	function PopupLayer(popLayout,mask,padding,Browser){
		
		window.System.Basis.extends.call(this);
		var __this__=this;
		/*--------------------------------------------------------------------------------------------------*/
		if(this.empty(popLayout)) return this;

		this.popLayout  = popLayout;
		this.padding	= padding || 0;
		this.mask 		= mask 	  || null;
	}


	PopupLayer.prototype={
		'constructor': PopupLayer,
		'setCenter':function(fn){//fn 传回调方法 可自定义居中方式
			fn = fn || null;
			this.autoScreenCenter($(this.popLayout),this.padding,fn);
			return this;
		},
		'isIE':function(){return this;},
		'resize':function(){return this;},

		'create':function(obj){
			/**
				{
					'div_class_PopupLayer_wrap_name':'section sectionPopupLayer-A1',
					'div_class_colose_name':'close',
					'div_title_name':'sectionBox sectionTitle',
					'div_content_name':'content',
					'more':'更多>>',
					'title':'标题',
					'content':'内容',
					'select':0

				}

			*/
			var container='';
			switch(obj['select']){
				case 0:
				  	container ='<div class="'+obj["div_class_PopupLayer_wrap_name"]+'"> \
									<div class="'+obj["div_class_colose_name"]+'"></div> \
									<div class="p10"> \
										<div class="content"> \
											<div class="'+obj["div_title_name"]+'"> \
												<h2>'+obj["title"]+'</h2>';
					if(obj["more"]){
						container +=			'<div class="more">'+obj["more"]+'</div>';
					}
						container +=		'</div> \
											<div class="'+obj["div_content_name"]+'"><div class="p15">'+obj["content"]+'</div></div> \
										</div> \
									</div> \
								</div>' ;
				  break;


				default:
				 
			}
			
			
			return container;
		},
		'closed':function($div,fn){
			$div.on('click',function(){
				fn.call(this);
			});
		},

		'close':function(close,fn){
			var $popLayout=$(this.popLayout);
			var $close=$popLayout.find(close);
			$close.on('click',function(){
				$popLayout.hide();
				fn.call(this);
			});
		},
		'show':function(){
			$(this.popLayout).show();
			$(this.mask).show();
		},
		'hide':function(){
			$(this.popLayout).hide();
			$(this.mask).hide();
		},

		'append':function($div,nodes){$div.append(nodes);},
		'empty':function(){$(this.popLayout).empty();},
		'remove':function(){$(this.popLayout).remove();}

	};



	window.System.extends(PopupLayer,window.System.Basis,1);

	window.System.PopupLayer=PopupLayer;
	
})(window,jQuery);




(function(window,$,undefined){
		

		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：tabs 功能可添加多个事件和对应事件添加不同的样式
		 * 创建日期：2014-10-28
		 * 修改日期：2014-11-10 
		 * 名称：toggle_menu
		 * 功能：表格每行鼠标移上去变色，移出恢复
		 * 说明：
		 * 注意：
		 * 参数： {	(jquery Object no null) 'list' :$('a'),
		 *			(String no null) 		'event':'hover', | 'hover,click' | ['hover','click'] | {'hover':'h_cur','click':'c_cur'} 
		 *			(jquery Object) 		'temp' :$('#first'),
		 *			(String no null) 		'live':'live | on',//如果是异步就选择
		 *			(String no null) 		'class':'cur', 	 | 'h_cur,c_cur' | ['h_cur','c_cur']  //对应事件加不同样式
		 *			(jquery Object) 		'block':$('sectionBlock-A1'),
		 *			(function null)			'fn'   :function(){}
		 *			}
		 * Example：
		 *----------------------------------*/
        function Tab(Browser){
			
			window.System.Basis.extends.call(this);
			var __this__=this;
			/*--------------------------------------------------------------------------------------------------*/

			var bind_eve=function(cur,eve,css){
				/**
				  *	创建日期：2014-11-10 
			 	  * 修改日期：2014-11-10 
				  *	名称：private (void) is_live
				  * 功能：执行异步时绑定的事件
				  * 参数：(Object no null) cur
				  *		  	
				  */
				
				if(cur['live']){
					cur['list'][cur['live']](eve,function(event){
						//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
						var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
						cur.cur_even_this=this;
						if(doif) __this__.doit(cur,css,event);
						event.stopPropagation(); 
					},eve=='hover' && !cur['hover']?function(){cur['temp'].removeClass(css)}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
				}else{
					cur['list']['unbind'](eve);
					cur['list'][eve](function(event){
					//cur['list']['bind'](eve,function(event){
					
						//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
						var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
						cur.cur_even_this=this;
						if(doif) __this__.doit(cur,css,event);
						event.stopPropagation(); 
					},eve=='hover' && !cur['hover']?function(){cur['temp'].removeClass(css)}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
				}

				
			},
			/**
			 *----------------------------------
			 * @author lhh
			 * 产品介绍：
			 * 创建日期：2014-5-29 
		 	 * 修改日期：2015-1-15 
			 * 名称：private (void) select_event
			 * 功能：选择相应的事件
			 * 说明：
			 * 注意：
			 * (Object no null) 	 cur,
			 * (String no null) 	'eve',//要绑定的事件
			 * (String no null) 	'css' //事件绑定时要添加的样式
			 * Example：
			 *----------------------------------*/
			select_event=function(cur,eve,css){
				switch(eve){
					case 'keydown'://判断键盘按下去的按键值
						cur['list'][eve](function(event){
							var e = window.System.Basis.fixEvt(event);
							switch(e && e.keyCode){
								case 27:// 按 Esc 
								
								break;
								case 113:// 按 F2 
								
								break;
								case 13:// enter 键
									e.keyCode=9;
									return false;
								break;
								case 9:// Tab 键
									
								break;


								
								default:
									

							}
						});
					
					break;
					case 'hover':
						cur['list'][eve](function(){
							$(this).addClass(css);
						},function(){
							//if(cur['temp'] && $(this)[0]!=cur['temp'][0]){//只有不是当前选中的才能做下面的事情
								$(this).removeClass(css);
							//}
						});

					break;
					
					default:
						

						bind_eve(cur,eve,css);

				}


			},multi_css=function(cur,arr_eve,arr_css,css){
				/**
				  *	创建日期：2014-11-10 
			 	  * 修改日期：2014-11-10 
				  *	名称：private (void) isArray_css
				  * 功能：对个事件匹配多个样式
				  * 参数： (Object no null) 	 cur,
				  *		   (Array no null) 	'arr_eve',//要绑定的事件集合
				  *		   (Array no null) 	'arr_eve' //事件绑定时要添加的样式的集合
				  *			
				  */
				var flag=false;
				if(arr_css.length > 1) flag=true;
				for(var i=0;i<arr_eve.length;i++){
					if(flag){//多个事件执行不同的选中状态样式 同传入的是对象执行的效果是一样的
						select_event(cur,arr_eve[i],arr_css[i]);
					}else{
						select_event(cur,arr_eve[i],css);

					}
				}

			},Excu_event=function(cur,css){
				/**
				  *	创建日期：
			 	  * 修改日期：2014-11-10 
				  *	名称：private (void) Excu_event
				  * 功能：执行传入的事件行为
				  * 参数：(Object no null) cur
				  *		  	
				  */
				if(__this__.isObject(cur['event'])){//传入的是对象目的多个事件执行不同的选中状态样式
					//{'k':v}
					var E=cur['event'];
					for(var k in E){
						select_event(cur,k,E[k]);
					}

				}else if(__this__.isArray(cur['event'])){//传入的数组
					if(0 === cur['event'].length) {
						alert('数组必须要有值');
						return 0;
					}
					var arr_eve=cur['event'],arr_css=css;
					multi_css(cur,arr_eve,arr_css);
				}else{//传入的是字符串用,号分割
					var arr_eve=cur['event'].split(","),arr_css=css.split(",");
					if(arr_eve.length > 1){
						multi_css(cur,arr_eve,arr_css,css);
					}else{
						bind_eve(cur,cur['event'],css);
						
					}
				}
			};

			this.doClass=function(cur,css){
				var cur=cur || this.cur;
				if(__this__.isS(css)){
					cur['temp'].removeClass(css);
					$(cur.cur_even_this).addClass(css);

				}
				
				
			};

			this.doit=function(cur,css,event){
				var cur=cur || this.cur;
				var temp=cur['temp'];
				if(css){
					__this__.doClass(cur,css);
				}
				cur['temp']=$(cur.cur_even_this);
				if(__this__.isF(cur['fn'])){
					cur['fn'].call(cur.cur_even_this,{
										'temp':temp,
										'temp_index':temp.index(),
										'current':cur,
										'event':event,
										'cur_even_this':$(cur.cur_even_this),
										'this_index':$(cur.cur_even_this).index()
									});
				}
			};
			this.run=function(cur){
				this.cur=cur;
				cur['temp']=cur['temp'] ? cur['temp'] : $(cur['list'][0]);
				if(cur['list']){
					if(cur['event']){//有事件时
						
						Excu_event(cur,cur['class']);
					}else{//没事件时
						
						cur['list']['each'](function(){
							cur.cur_even_this=this;
							__this__.doit(cur,cur['class']);

						});
						
					}
				}
				
				return cur;
			};

			this.slider=function(){};
			

			
			
		}
		Tab.prototype={
			'constructor':Tab
		};

		window.System.extends(Tab,window.System.Basis,1);
		
		window.System.Tab=Tab;
})(window,jQuery);



(function(window,jQuery,undefined){
	
	var $=jQuery;
	function Slider(init){
		/**
		 *
		 *
		 * 功能：自动轮播，next，pre,可以跳转到指定的位置
		 * (jQuery obj)	'$pre':$('#slidePre'), 			:NULL
		 * (jQuery obj)	'$next':$('#slideNext'),		:NULL
		 * (jQuery obj)	'$elem':$('#imgList'),//		:NO NULL
		 * (int)		'size':1800,//移动图片的宽度	:NO NULL
		 * (int)		'event':'click',//事件			:NULL
		 * (int)		'imglen':12,//图片长度			:NO NULL
		 * (int)		'number':6,//显示多少个			:NO NULL
		 * (int)		'flag':0,						:NO NULL
		 * (String)		'position':'left',				:NO NULL
		 * (jQuery obj)	'$autoHandler':$(""),//自动		:NULL
		 * (int)		'move_time':50,
		 * (int)		'time':5000,
		 * (Boolear)	'noLoop':false|true,			:NULL //不循环轮播默认循环状态(false)
		 * (Object)		'sport':Sport
		 * }
		 *
		*/
		
		window.System.Basis.extends.call(this);
		var __this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		this.init=init;
		this.slide=null;
		this.move=function(len,position){
			var elem=init.$elem[0];
			var position=position||init.position;
			var time=init.move_time || 50;
			
			if("left"===position || "right"===position || "top"===position || "bottom"===position){
				if(init.sport){
					var P={};
					P[position]=len;
					init.sport.Animate(elem,P,time);
				}else{
					elem.style[position]=len+"px";
				}
			}else{
				alert("错误!只能传('left' | 'right' | 'top' | 'bottom') 其中之一");
			}

		};
		
		this.click=function(eve,fn){
			var $pre=init.$pre,
				$next=init.$next;
			if($next){
				$next[eve](function(){
					if((init.imglen-init.number)>init.flag){
						__this__.next();
					}else{
						if(!init.noLoop){
							__this__.jump_start();
						}
					}
					
					if(fn) fn();
				});
			}
			if($pre){
				$pre[eve](function(){
					if(init.flag>0){
						__this__.pre();
					}else{
						if(!init.noLoop){
							__this__.jump_end();
						}
					}
					
					if(fn) fn();
				});
			}
		};
		this.next=function(){
			this.invoke(++init.flag);
			
		};
		this.pre=function(){
			if(init.flag>0){
				this.invoke(--init.flag);
			}
		};
		
		this.auto=function($elem,fn){
			var time=init.time || 5000;
			if($elem){
				$elem.hover(function(){
					__this__.clearAuto();
				},function(){
					__this__.auto(null);
				});				
			}
			this.slide=setInterval(function(){
				if((init.imglen-init.number)>init.flag){
					__this__.next();
				}else{
					__this__.jump_start();
				}
			},time);
			if(fn) fn();
		};
		this.start=function(){
			this.auto(null);
		};
		this.clearAuto=function(){
			clearInterval(this.slide);
		};
		this.stop=this.clearAuto;
		this.invoke=function(n){//跳转到第几步
			init.flag=n;
			if(init.flag>=0 && (init.imglen-init.number)>=init.flag){
				this.move(-(init.size)*init.flag);
				
			}else{
				return 0;
			}
			
		};
		this.jump_start=function(){
			this.invoke(0);
		};
		

		this.jump_end=function(){
			if(init.imglen < init.number) return;
			this.invoke(init.imglen-init.number);
		};
		this.run=function(fn){
			if(init.event){
				this.click(init.event,fn);	
			}
			if(init.$autoHandler){
				this.auto(init.$autoHandler);
			}
			return this;
		};
		this.getInit=function(){
			return init;
		};

		
	}

	Slider.prototype={
		'constructor':Slider
	};

	window.System.extends(Slider,window.System.Basis,1);
	window.System.Slider=Slider;
})(window,jQuery);











