window[GRN_LHH].run([window,document,jQuery],function(window,document,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Dom');

	var __this__=null;
	function Dom(tag,D){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;
		this.node=null;
		this.attributes=[];
		//构造有参数时
		if(arguments.length){
			this.create(tag,D);
		}
		this.fragment = document.createDocumentFragment();
	}

	Dom.getStyle=function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	};

	Dom.prototype = {
		'constructor':Dom,
		'__constructor':function(){},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2016-7-15
		 * 名称： create
		 * 功能：创建节点元素
		 * 说明：
		 * 注意：下面俩个参数是必须的
		 * @param 	(String)tag             NO NULL : 标签名称
		 * @param 	(Object)D             	NO NULL : 标签的属性
		 * @return (Dom)
		 * Example：
		 *
		 */
		'create':function(tag,D){
			tag = tag || "div";
			if(!System.isString(tag)){
				throw new Error('Warning 缺少标签名称');
				return false;
			}
			this.node=document.createElement(tag);
			this.attributes = this.node.attributes;
			var k;
			for(k in D){
				this.attr(k,D[k]);
			}

			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2016-7-13
		 * 名称： get
		 * 功能：获取节点元素
		 * 说明：
		 * 注意：
		 * @return (node)
		 * Example：
		 *
		 */
		'get':function(){
			return this.node;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-6-15
		 * 修改日期：2016-7-13
		 * 名称： getType
		 * 功能：获取元素的节点类型
		 * 说明：
		 * 注意：
		 * @return (Number)
		 * Example：
		 *
		 */
		'getType':function(node){
			node = node || this.node;
			return node.nodeType;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2015-12-08
		 * 名称： createFragment
		 * 功能：documentFragment 节点
		 * 说明：
		 * 注意：
		 * @param 	(String)tag             NULL : 标签名称
		 * @return (Dom)
		 * Example：
		 *
		 */
		'createFragment':function(){
			if(!this.fragment) {
				this.fragment = document.createDocumentFragment();
			}
			if(this.node){
				this.appendTo(this.fragment);
			}

			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-16
		 * 修改日期：2016-1-16
		 * 名称： getFragment
		 * 功能：获取文档碎片
		 * 说明：
		 * 注意：
		 * @return (Dom)
		 * Example：
		 *
		 */
		'getFragment':function(){
			if(this.fragment){
				this.fragment
			}else{
				return this;
			}


		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2015-12-08
		 * 名称： innerHTML
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param 	(String)html             NO NULL : html 内容
		 * @param 	(String)tag              	NULL : html 标签名
		 * @return (DocumentFragment)
		 * Example：
		 *
		 */
		'innerHTML':function(html,tag) {
			tag = tag || "div";
			this.create(tag).node.innerHTML = html;
			for (this.createFragment(); this.node.firstChild; ) {
				this.fragment.appendChild(this.node.firstChild);
			}
			return this.fragment.childNodes.length > 1 ? this.fragment : this.fragment.removeChild(this.fragment.firstChild);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2015-12-08
		 * 名称： innerHTML
		 * 功能：克隆节点
		 * 说明：logic true:下面的子孙节点一块克隆下来 ；false:只克隆当前节点 (默认)
		 * 注意：
		 * @param node
		 * @param logic
		 * @returns {Node}
		 */
		'clone':function(logic,node){
			node = node || this.node;
			if(logic)
				return node.cloneNode(true);
			else
				return node.cloneNode(false);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2016-7-13
		 * 名称： removeAttr
		 * 功能：node 中删除指定的属性名及值
		 * 说明：
		 * 注意：
		 * @param name	NO NULL:属性名字
		 * @param node	   NULL:节点
		 * @returns {Dom}
		 */
		'removeAttr':function(name,node){
			node = node || this.node;
			node.removeAttribute(name);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-7-20
		 * 名称： hasAttr
		 * 功能：node 中是否有指定的属性名
		 * 说明：
		 * 注意：
		 * @param name	NO NULL:属性名字
		 * @param node	   NULL:节点
		 * @returns {boolean}
		 */
		'hasAttr':function(name,node,
						   attributes){
			node = node || this.node;
			if(node.hasAttribute){
				return node.hasAttribute(name);
			}else{
				attributes =node && node.attributes || this.attributes;
				for(var i=0,len=attributes.length;i<len;i++){
					if(attributes[i].nodeName === name)
						return true;
				}
				return false;
			}

		},
		/**
		 *
		 * @param newNode
		 * @param oldNode
		 * @returns {Dom}
		 */
		'append':function(newNode,oldNode){
			oldNode = oldNode || this.node;
			oldNode.appendChild(newNode);
			return this;

		},
		/**
		 *
		 * @param oldNode
		 * @param newNode
		 * @returns {Dom}
		 */
		'appendTo':function(oldNode,newNode){
			newNode = newNode || this.node;
			oldNode.appendChild(newNode);
			return this;
		},
		/**
		 *
		 * @param node
		 * @returns {string}
		 */
		'getNodeName':function(node){
			node = node || this.node;
			return node.nodeName;
		},
		/**
		 *
		 * @param node
		 * @returns {Dom}
		 */
		'delNode':function(node){//在它的父节点调用removeChild 然后把它自身移除
			node = node || this.node;
			this.getParent(node).removeChild(node);
			return this;
		},
		/**
		 *
		 * @param node
		 * @returns {Node}
		 */
		'getParent':function(node){//获取当前节点的父节点
			node = node || this.node;
			return node.parentNode;
		},
		/**
		 *
		 * @param newNode
		 * @param current
		 * @returns {Dom}
		 */
		'replaceNode':function(newNode,current){//替换节点
			newNode = newNode || this.node;
			this.getParent(current).replaceChild(newNode , current);
			return this;
		},
		/**
		 *
		 * @param newNode
		 * @param current
		 * @returns {Dom}
		 */
		'insertBefore':function(newNode , current){//在oldNode的父节点上调用insertBefore燃后把新节点插入它自身前面
			newNode = newNode || this.node;
			this.getParent(current).insertBefore(newNode , current);
			return this;

		},
		/**
		 *
		 * @param node
		 * @param newNode
		 * @returns {*}
		 */
		'insertAfter':function(node,newNode){
			newNode = newNode || this.node;
			if(node.nextSibling){//如果node有下一个节点的话
				this.insertBefore(newNode,node.nextSibling);
			}else{
				this.append(this.getParent(node),newNode);
			}
			return node;
		},
		/**
		 *
		 * @returns {Dom}
		 */
		'delNodeMore':function(){//删除多个节点
			var __this___ = this;
			System.each(arguments,function(k,v){
				__this___.delNode(this);
			});
			return this;

			//var node;
			//for(var i=0;i<arguments.length;i++){
			//	node = arguments[i];
			//	this.delNode(node);
			//}
		},



		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2016-8-20
		 * 名称： attr
		 * 功能：节点元素属性的获取或设置操作
		 * 说明：
			 3: 添加(node,String,String)
			 2:两个参数String类型：添加；否则获取(String,String)
			 1:参数String类型：获取 ；参数Object类型 设置(String|{})
		 * 注意：
		 * @returns {*}
		 * Example：
		 *
		 */
		'attr':function(){
			var node,name,value,
				len=arguments.length;
			switch (len){
				case 1:
					var D= arguments[0];
					if(System.isObject(D)){
						var k;
						for(k in D){
							this.attr(this.node,k,D[k]);
						}
					}else if(System.isString(D)){
						return this.attr(null,D);
					}

					break;
				case 2:
					if(System.isString(arguments[0])){
						this.attr(this.node,arguments[0],String(arguments[1]));
						break;
					}

					if(!arguments[0].getAttribute){
						arguments[0] = null;
					}

					node=arguments[0] || this.node;
					name=arguments[1];
					try{
						return node.getAttribute(name);
					}catch(e){
						throw new Error("Warning without the method of getAttribute "+e.name);
					}

					break;
				case 3:
					node=arguments[0] || this.node;
					name=arguments[1];
					value=arguments[2];
					try{
						node.setAttribute(name,value);
					}catch(e){
						throw new Error("Warning without the method of setAttribute "+e.name);
					}
					break;

				default:
			}

			return this;

		},
		/**
		 *
		 * @param (String)s		NO NUll:
		 * @returns {*}
		 */
		'find':function(s){

		},
		/**
		 *
		 * @param node
		 * @returns {*}
		 */
		'firstChild':function(node){//查找下面的元素是不是节点元素
			node = node || this.node;
			if(node.firstChild){//有子节点的话
				var n=node.firstChild;
				if(n.nodeType==1) return n;
				return this.nextSibling(n);
			}
			return null;
		},


		/**
		 *
		 * @param node
		 * @returns {*}
		 */
		'lastChild':function(node){//查找元素最后节点是不是节点元素
			node = node || this.node;
			if(node.lastChild){//有子节点的话
				var n=node.lastChild;
				if(n.nodeType==1) return n;
				return this.previousSibling(n);
			}
			return null;
		},
		/**
		 *
		 * @param node
		 * @returns {*}
		 */
		'previousSibling':function(node){//查找前一个节点是否是元素节点排除所有非元素节点
			node = node || this.node;
			if(node.previousSibling){
				var n=node.previousSibling;
				if(n.nodeType==1) return n;
				while(n=n.previousSibling){//查找上一个节点----->上一个节点------->上一个节点.........直到没有节点为止
					if(n.nodeType==1) return n;
				}
			}
			return null;
		},
		/**
		 *
		 * @param node
		 * @returns {*}
		 */
		'nextSibling':function(node){
			node = node || this.node;
			if(node.nextSibling){
				var n=node.nextSibling;
				if(n.nodeType==1) return n;
				while(n=n.nextSibling){//查找下一个节点----->下一个节点------->下一个节点.........直到没有节点为止
					if(n.nodeType==1) return n;
				}
			}
			return null;
		},
		/**
		 *
		 * @param nodes
		 * @returns {Array}
		 */
		'filterSpaceNode':function(nodes){//过滤元素中包含的所有空白节点
			var ret=[];
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].nodeType===3 && /^\s+$/.test(nodes[i].nodeValue)) continue;//查找是否是文本节点且有空格
				ret.push(nodes[i]);
			}
			return ret;
		},
		'empty':function(){},
		/**
		 *
		 * @param str
		 * @returns {*}
		 */
		'$':function(str){
			if(document.getElementById(str)){
				return document.getElementById(str);
			}else if(document.getElementsByTagName(str)){
				return document.getElementsByTagName(str);
			}else{
				return this.getElementsByClass(str,document,'*');
			}

		},


		/**
		 * 取消HTML代码
		 * @param $string
		 * @returns {*}
		 */
		'shtmlspecialchars':function($string) {
			var $p;
			var $unallowed = {
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


		/**
		 *
		 * @param node
		 * @param className
		 * @returns {*}
		 */
		'addClass':function(node,className){//给指定元素添加类名
			var names = node.className || this.attr(node,'class');
			names = names.split(/\s+/);
			names.push(className);
			this.attr(node,'class',names.join(" "));
			return node;
		},
		/**
		 *
		 * @param node
		 * @param className
		 * @returns {*}
		 */
		'delClass':function(node,className){
			var names = node.className || this.attr(node,'class');
			names = names.split(/\s+/);
			for(var i=0,len=names.length;i<len;i++){
				if(names[i] === className) {
					delete names[i];
				}
			}


			if(node.className){
				node.className=names.join(" ");
			}else{
				this.attr(node,'class',names.join(" "));
			}
			return node;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：[] hasClass
		 * 功能：查找指定的阶段中的是否有匹配的class 名称
		 * 说明：
		 * 注意：
		 * @param   (Dom)node 			NO NULL :dom节点
		 * @param   (String)className 		NO NULL :要查找的类名称
		 * @return  (Boolean)
		 * Example：
		 */
		'hasClass':function(node,className){
			var names = node.className || this.attr(node,'class');
			names = names.split(/\s+/);
			for(var i=0,len=names.length;i<len;i++){
				if(names[i] === className) {
					return true;
				}
			}
			return false;
		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：getElementsByClass
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   (String)searchClass 		NO NULL :要查找的类名称
		 * @param   (Dom)node 					   NULL :父级dom节点
		 * @param   (String)tag 				   NULL :标签名称
		 * @return  (Array)					返回匹配的节点集合
		 * Example：
		 */
		'getElementsByClass':function(searchClass,node,tag){//获取类名集合
			node   = node || document,
				tag    = tag  || "*";
			if(node.getElementsByClassName){
				return node.getElementsByClassName(searchClass);
			}
			var tags=node.getElementsByTagName(tag);
			var ret=[];
			for(var i=0,len = tags.length; i < len;i++){
				if(this.hasClass(tags[i],searchClass)){
					ret.push(tags[i]);
				}
			}

			// if (1 === ret.length){//如果只有一个就直接返回节点元素
			//   return ret[0];
			// }

			return ret;
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：getByClass
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   (String)s			NO NULL :class 名称
		 * @param   (String)p 			NO NULL :
		 * @param   (String)t 			NO NULL :
		 * @return  (Array)				返回匹配的节点集合
		 * Example：
		 */
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

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：setStyle
		 * 功能：对多个节点元素批量设置同一个样式
		 * 说明：
		 * 注意：
		 * @param   (Array)nodes 			NO NULL :dom节点集合
		 * @param   (String)attr 			NO NULL :要设置样式属性
		 * @param   (String)value 			NO NULL :要设置样式属性的值
		 * @return  (*)
		 * Example：
		 */
		'setStyle':function(nodes,attr,value){
			if(System.empty(nodes) || System.isString(nodes)) return 0;
			for(var i=0,len=nodes.length;i<len;i++){
				nodes[i].style[attr]=value;
			}
			return this;
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：css
		 * 功能：设置
		 * 说明：
		 * 注意：
		 * @param   (Array)nodes 			NO NULL :dom节点集合
		 * @param   ({})D 			        NO NULL :多个样式数据 {k:v[,k:v[,...]]}
		 * @return  (void)
		 * Example：
		 */
		'css':function(nodes,D){
			for(var prop in D){
				if(!D.hasOwnProperty(prop)) continue;
				this.setStyle(nodes,prop,D[prop]);
			}
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-6-16
		 * 修改日期：2016-6-16
		 * 名称：css
		 * 功能：设置或获取 z-index
		 * 说明：
		 * 注意：
		 * @param   (jQuery Object)$node 	NULL :jQuery object
		 * @param   (Number)zIndex 			NULL :设置z-index
		 * @return  (Number)
		 * Example：
		 */
		zIndex: function( $node,zIndex ) {
			$node = $node || $(this.node);
			if ( zIndex !== undefined ) {
				return this.css( "zIndex", zIndex );
			}

			if ( $node.length ) {
				var elem = $( $node[ 0 ] ), position, value;
				while ( elem.length && elem[ 0 ] !== document ) {
					// Ignore z-index if position is set to a value where z-index is ignored by the browser
					// This makes behavior of this function consistent across browsers
					// WebKit always returns auto if the element is positioned
					position = elem.css( "position" );
					if ( position === "absolute" || position === "relative" || position === "fixed" ) {
						// IE returns 0 when zIndex is not specified
						// other browsers return a string
						// we ignore the case of nested elements with an explicit value of 0
						// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
						value = parseInt( elem.css( "zIndex" ), 10 );
						if ( !isNaN( value ) && value !== 0 ) {
							return value;
						}
					}
					elem = elem.parent();
				}
			}

			return 0;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Dom对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}

	};
	System.extends(Dom,System.Browser,1);
	System['Dom']=Dom;

});