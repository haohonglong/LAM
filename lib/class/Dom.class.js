window[LHH_NAMESPACE_20150715_].main([window,document],function(window,document,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser');

	var __this__=null;
	function Dom(){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;
		this.node=null;
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
		 * 修改日期：2015-8-26
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
			this.node=document.createElement(tag);
			var k;
			for(k in D){
				this.attr(this.node,k,D[k]);
			}

			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2016-1-8
		 * 名称： getNode
		 * 功能：获取节点元素
		 * 说明：
		 * 注意：
		 * @return (node)
		 * Example：
		 *
		 */
		'getNode':function(){
			return this.node;
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
			return this;
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
		'cloneNode':function(node,logic){
			node = node || this.node;
			if(logic)
				return node.cloneNode(true);
			else
				return node.cloneNode(false);
		},
		'removeAttr':function(node,attrName){
			node = node || this.node;
			node.removeAttribute(attrName);
		},
		'append':function(oldNode,newNode){
			newNode = newNode || this.node;
			oldNode.appendChild(newNode);
		},
		'getNodeName':function(node){
			node = node || this.node;
			return node.nodeName;
		},
		'delNode':function(node){//在它的父节点调用removeChild 然后把它自身移除
			node = node || this.node;
			this.getParent(node).removeChild(node);
		},
		'getParent':function(node){//获取当前节点的父节点
			node = node || this.node;
			return node.parentNode;
		},
		'replaceNode':function(newNode,current){//替换节点
			this.getParent(current).replaceChild(newNode , current);
		},
		'insertBefore':function(newNode , current){//在oldNode的父节点上调用insertBefore燃后把新节点插入它自身前面
			this.getParent(current).insertBefore(newNode , current);

		},
		'insertAfter':function(node,newNode){
			newNode = newNode || this.node;
			if(node.nextSibling){//如果node有下一个节点的话
				this.insertBefore(newNode,node.nextSibling);
			}else{
				this.append(this.getParent(node),newNode);
			}
			return node;
		},
		'delNodeMore':function(){//删除多个节点
			for(var i=0;i<arguments.length;i++){
				this.delNode(auguments[i]);
			}
		},



		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2015-8-26
		 * 名称： attr
		 * 功能：节点元素属性的获取或设置操作
		 * 说明：3: 添加 2:获取
		 * 注意：
		 * @return (String | void)
		 * Example：
		 *
		 */
		'attr':function(){
			var node,name,value,
				len=arguments.length;
			switch (len){
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
				case 2:
					node=arguments[0] || this.node;
					name=arguments[1];
					try{
						return node.getAttribute(name);
					}catch(e){
						throw new Error("Warning without the method of setAttribute "+e.name);
					}

					break;
				default:
			}

		},
		'firstChild':function(node){//查找下面的元素是不是节点元素
			node = node || this.node;
			if(node.firstChild){//有子节点的话
				var n=node.firstChild;
				if(n.nodeType==1) return n;
				return this.nextSibling(n);
			}
			return null;
		},
		'lastChild':function(node){//查找元素最后节点是不是节点元素
			node = node || this.node;
			if(node.lastChild){//有子节点的话
				var n=node.lastChild;
				if(n.nodeType==1) return n;
				return this.previousSibling(n);
			}
			return null;
		},
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
		'filterSpaceNode':function(nodes){//过滤元素中包含的所有空白节点
			var ret=[];
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].nodeType===3 && /^\s+$/.test(nodes[i].nodeValue)) continue;//查找是否是文本节点且有空格
				ret.push(nodes[i]);
			}
			return ret;
		},
		'empty':function(){},

		'$':function(str){
			if(document.getElementById(str)){
				return document.getElementById(str);
			}else if(document.getElementsByTagName(str)){
				return document.getElementsByTagName(str);
			}else{
				return this.getElementsByClass(str,document,'*');
			}

		},

		'findClass':function(node,attName){
			node = node || this.node;
			for(var i=0,len=node.attributes.length;i<len;i++){
				if(node.attributes[i].nodeName==attName)
					return true;
			}
			return false;
		},
		//取消HTML代码
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




		'addClass':function(node,className){//给指定元素添加类名
			var names = node.className || this.attr(node,'class');
			names = names.split(/\s+/);
			names.push(className);
			this.attr(node,'class',names.join(" "));
			return node;
		},
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
		 * @param   (Dom)node 					   NULL :dom节点
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
		 * @return  (void)
		 * Example：
		 */
		'setStyle':function(nodes,attr,value){
			if(System.empty(nodes) || System.isString(nodes)) return 0;
			for(var i=0,len=nodes.length;i<len;i++){
				nodes[i].style[attr]=value;
			}
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
		 * @param   ({})D 			        NO NULL :多个样式数据 {k:v[,...]}
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
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Basis对象时调用此方法
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