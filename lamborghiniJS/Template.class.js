
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
	var guid=0;

	function Template(){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;
		this.guid=0;
		guid++;
		this.html=[];
		this.leftLimit =System.Config.templat.leftLimit;
		this.rightLimit=System.Config.templat.rightLimit;



	}
	Template.getGuid=function(){
		return guid;
	};

	Template.prototype = {
		'constructor':Template,
		'create':function(){},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-9
		 * 修改日期：2016-03-9
		 * 名称：find
		 * 功能：查找模版标签
		 * 说明：
		 * 注意：
		 * @param (String)S NO NULL:要查找的字符串
		 * @param (Object)D NO NULL:对象模板中的数据
		 * @returns {Array}
		 */
		'find':function(S,D){
			var self=this;
			var ss=[],arr=[],v=[],$1,$2,
				L=this.leftLimit,
				R=this.rightLimit;
			//没找到模版分隔符就返回传入的字符串
			if(S.indexOf(L) !== -1){
				ss=S.split(L);
				ss.each(function(){
					if(-1 === this.indexOf(R)){
						arr.push(this);
					}else{//如果每个里有模版标签
						v=this.split(R);
						$1=v[0];
						$2=v[1].trim();

						arr.push([self.analysis($1,D),self.find($2,D)].join('').trim());

					}

				});
			}else{
				return S ||'';
			}

			return arr;
		},
		'replace':function(){},
		'analysis':function(vars,D,
							k,
							v,
							root){
			if(-1 !== vars.indexOf('.')){
				v=vars.split('.');
				if((k=v[0]) in D ){
					root=D[k];
					v.each(function(i){
						if(i!=0){
							root=root[this];
						}
					});

					return root;
				}
			}else{
				if((k=vars) in D){
					return D[k];

				}
			}

			throw new Error(['Warning: 数据里没有分配',vars,'这个值'].join(' '));


		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-10
		 * 修改日期：2016-03-28
		 * 名称：render
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param (String)view 			NO NULL:指定渲染的页面路径
		 * @param (Object)D	    		NO NULL:渲染到模版中的数据
		 * @param (Object)Cajax	    	NO NULL:设置Ajax参数
		 * @param 	(Function)callBack NULL :参数：(解析后模板字符串)
		 * @returns {void}
		 */
		'render':function(view,D,callBack,Cajax){
			var self=this,S;
			System.Html.getFile(view,function(content){
				S=self.find(content,D);
				if(System.isArray(S)){
					S=S.join('');
				}
				if(System.isFunction(callBack)){
					callBack(S);
				}else{
					System.print(S);
				}

			},Cajax);
			this.guid++;
		},

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