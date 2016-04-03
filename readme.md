	name    ：LamborghiniJS(OOPJS)
	version ：1.0.9
	author  ：lhh
	创建日期 ：2015-8-19
	修改日期 ：2016-4-2


产品介绍：

	LamborghiniJS 不是插件，是一种javascript OOP的思想实现的类库，它可以为应用框架的搭建做更好的基础服务。
	LamborghiniJS 的诞生初衷是自2013年起,为解决自己工作方便写的小工具,发展到现在的一个类库思想实现.
	LamborghiniJS 的目的:少写重复性的代码,封装已通过测试功能的成熟代码,便于以后开发中复用.
	LamborghiniJS 里有接口的概念,每一个类都要通过接口去调用.每定义一个类名,都要先定义一个同名的接口名(参考 二、开发约定 类结构)
	LamborghiniJS 里有沙箱机制(参考 十四、沙箱)
	LamborghiniJS 里有hashcode概念（参考 十五、hashcode）
	LamborghiniJS 里有模版标签概念（参考 十八、模版标签）
	LamborghiniJS 里有MVC概念（参考 十九、MVC）

	现有选项卡、拖拽、常用工具、弹出层、幻灯、html5绘图基础类的实例．
	如要根据项目需求要修改或扩展现有的这些实例，正确的方法是：
		1.创建一个子类继承父类(现有的实例的类)
		2.覆写父类里的成员(属性和方法)
	(继承参考 六、继承)


文件说明：
		
	文件夹结构：
			|-LAM      		 #项目根目录
				|-demo 		 #
				|-lib  		 #
					|-class  #类文件
					|-css  	 #样式文件
				|-config.js  #项目配置文件
				|-project  	 #项目文件
					|-common #公共文件
					|-controllers #控制器渲染对应的页面
					|-views   #项目中所有页面
					|-plugins #插件存放地
					|-doc #文档说明
					|-css #
					|-js #
					|-images #公共文件

	类成员属性：
		 class:
			 |-Basis.class
				|-
			 |-BiObject.class
				|-
			 |-Component.class
				|-
         
            
         


类库声明：

类库说明：

	一、配置
		
		一次配置即可搞定!
		<script type="text/javascript" src="./config.js"></script>
		config.js 分为两个，一个是当前配置文件，一个是主配置文件。
		当前配置文件是跟视图文件或者控制器文件在同级目录里，
		当期配置文件的作用：
			1.配置项目主目录路径（_ROOT_ 变量）
			2.引入主配置文件
		当期配置文件的配置：这里只修改_ROOT_ 变量值其余都不用动
		内容如下：
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			if(!_ROOT_){
	            var _ROOT_ = '../..';
	        
	        }
	        (function(){
	            var tag = "script",attrs=[],src;
	            attrs.push('type="text/javascript"');
	            src=_ROOT_+'/config.js';
	        
	            document.write('<',tag,' ',attrs.join(' '),'src=','"',src,'"','>','<','/',tag,'>');
	        })();
		<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	    主配置文件在项目的根目录里，（只有这个文件是跟项目绑定的）
	    主配置文件配置： 参考 二、开发约定
	    内容如下：

		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		//基础类的设置
		if(!LHH_NAMESPACE_20150715_){
			var LHH_NAMESPACE_20150715_='System';
		}
		if(!_ROOT_){
			var _ROOT_ = '.';

		}


		var common = _ROOT_+'/common';
		var plugins = _ROOT_+'/plugins';


		if(!LHH_CONFIG_20150717_){
			var LHH_CONFIG_20150717_={
				'vendorPath':_ROOT_,
				'Public':{
					'ROOT':_ROOT_
				},
				'classPath':'/lamborghiniJS',
				//hashcode 随机种子
				'random':10000,
				//定义模版标签
				'templat':{
					'leftLimit':'{{',
					'rightLimit':'}}'
				},
				//标签的渲染方式
				'render':{
					//输出标签的方式 ()
					'fragment':null,
					//true : document.createElement(); false :document.write();
					'create':false,
					'append':'after',
					'default':{
						'script':{
							'Attribute':{
								'type':'text/javascript',
								//'async':true,
								//'defer':'defer',
								'charset':'utf-8'
							}
						},
						'css':{
							'Attribute':{
								'type':'text/css',
								'rel':'stylesheet'
							}
						}
					},
					'H':function(){
						return {
							'html'    : document.getElementsByTagName('html')[0],
							'head'    : document.getElementsByTagName('head')[0],
							'body'    : document.getElementsByTagName('body')[0],
							'meta'    : document.getElementsByTagName('meta'),
							'script'  : document.getElementsByTagName('script'),
							'link'    : document.getElementsByTagName('link')
						};
					},
					'bulid':function(tag,D){
						tag = tag || "div";
						var node;
						var k;
						var fragment;
						var Config = LHH_CONFIG_20150717_;
						node=document.createElement(tag);

						for(k in D){
							node[k] = D[k];
						}

						if(!Config.render.fragment){
							Config.render.fragment = document.createDocumentFragment();
						}
						fragment = Config.render.fragment;

						Config.render.fragment.appendChild(node);

						return fragment;
					}

				},
				'init':{},
				/**
				 * 用createElement 创建标签并且设为异步
				 */
				'use':function(){
					this.render.create=true;
					this.render.default.script.Attribute.async=true;
					this.render.default.script.Attribute.defer='defer';
				},
				/**
				 * 用document.write() 创建标签并且设为非异步
				 */
				'unuse':function(){
					this.render.create=false;
					this.render.default.script.Attribute.async=false;
					this.render.default.script.Attribute.defer='';
				},
				'getClassPath':function(){
					return this.vendorPath+this.classPath;
				}
			};
		}


		(function(Config){
			var tag = "script";
			var scriptAttribute = Config.render.default.script.Attribute;
			var i = 0;
			var len;
			var data;
			var classPath=Config.getClassPath();

			//加载基础类
			var srcs =[
				classPath+'/jQuery/jquery.js',
				classPath+'/Basis.class.js',
				classPath+'/loadcommon.class.js',
				classPath+'/init.js'
			];

			if(Config.render.create){
				var H=Config.render.H();
				for(i=0,len = srcs.length;i < len; i++){
					var data = scriptAttribute;
					data.src = Config.getClassPath()+srcs[i],
						Config.render.bulid(tag,data);
				}
				console.log(H.body)
				console.log(Config.render.fragment)
				H.body.appendChild(Config.render.fragment);



			}else{
				var attrs=[];
				for(var k in scriptAttribute){
					attrs.push(k,'=','"',scriptAttribute[k],'"',' ');
				}
				for(i=0,len = srcs.length;i < len; i++){
					document.write('<',tag,' ',attrs.join(''),'src=','"',srcs[i],'"','>','<','/',tag,'>');

				}
			}


		})(LHH_CONFIG_20150717_);






		setTimeout(function(){
			if(!window[LHH_NAMESPACE_20150715_]) {
				alert("cannot find Basis class");
			}else{
				window[LHH_NAMESPACE_20150715_].main(function(){
					var System=this;
				});
			}
		},5000);

		<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
		
        根据下面三条修改上面对应的参数
			1.修改 LHH_NAMESPACE_20150715_ 的值
			2.修改 LHH_CONFIG_20150717_.vendorPath 的值


		'config.js'文件里做的事情是：
			1.配置类库文件的路径信息及别的相关信息
			2.加载基础类文件
			3.加载加载器工具
			4.加载初始化文件(或是init.js)
			5.检测框架文件路径加载是否正确

		'init.js'文件里做的事情是：加载通用框架类

		具体应用类加载都在页面里进行设置 (参考五、应用 里的 文件引入方式)


	二、开发约定
	
		'LHH_NAMESPACE_20150715_' 在'config.js'里设定,变量名: LHH_NAMESPACE_20150715_ 是框架里定死的禁止改动，可以修改变量的值,
		也就是说框架的命名空间可以用户自定义（参考 四、命名空间灵活 与其他插件无冲突）。
		禁止修改'Basis.class.js'里的 'LHH_NAMESPACE_20150715_' 的值。
		成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
		调用基类的静态成员方法:(调用接口.类名称.静态成员)。
        基类不允许被直接实例化，要实例化它的派生类。
        
        全局变量
            1._ROOT_  设置项目的根目录

        不能被直接实例化的类：
        	{
        		'Basis'      		:function(){},
        		'Component'      	:function(){},
        		'Helper'     		:function(){},
        		'Browser'    		:function(){}
        	}

        所有类列表
        	{}代表单例对象
        all classes：
        	{
        		'Basis'      		:function(){},
        		'BiObject'   		:function(){},
        		'Component'      	:function(){},
        		'Helper'     		:function(){},
        		'Controller'     	:function(){},
        		'Browser'    		:function(){},
        		'Template'    		:function(){},
        		'Event'      		:function(){},
        		'Dom'        		:function(){},
        		'Cookie'     		:function(){},
        		'Html'        		:function(){},
        		'Drag'       		:function(){},
        		'Drag_xy'    		:function(){},
        		'Error'      		:function(){},
        		'FakeSelect' 		:function(){},
        		'Fsc'        		:function(){},
        		'Less'       		:function(){},
        		'Linklist'   		:function(){},
        		'PopupLayer' 		:function(){},
        		'Roll'       		:function(){},
        		'Slider'     		:function(){},
        		'Sport'      		:function(){},
        		'Tab'        		:function(){},
        		'Tools'      		:{},
        		'Css'        		:function(){},
        		'FindParentObject'	:function(){},
        		'Widget'			:function(){},
                'Tree'				:function(){},
        		'Html5':{
        			'Svg'		:function(){},
        			'Canvas'	:function(){},
        			'CanvasForm':function(){}
        		}
        	}

			类结构:(继承参考 六、继承)

				window[LHH_NAMESPACE_20150715_].main([window],function(window,undefined){
                        'use strict';
                        var System=this;
                        System.import([class]).import([class],System.classPath);

                });
				上面的是类框架代码块
				System是一个对象,用来向外提供模块接口
				

			Example:
				window[LHH_NAMESPACE_20150715_].main([window],function(window,undefined){
					'use strict';
					var System=this;
					System.is(System,'superName','className');
					System.className={};
					//如要定义一个类首先要定义一个同名的接口名, 定义的接口名是一个对象,像上面这样方式定义
					var __this__=null;

					function className(){
						//无构造参数的方法
						System.Basis.extends.call(this,System.superName);
						//有构造参数的方法
						System.Basis.extends.call(this,System.superName,2,[dom,init]);
						__this__=this;



					}

					静态方法：
					className.functionName=function(){};


					className.prototype = {
							'constructor':className,
							/**
							 *
							 * @author lhh
							 * 产品介绍：析构方法
							 * 创建日期：2015-4-2
							 * 修改日期：2015-4-2
							 * 名称：destructor
							 * 功能：在注销className对象时调用此方法
							 * 说明：
							 * 注意：
							 * @return  ()						:
							 * Example：
							 */
							'destructor':function(){}
						};

					System.extends(className,System.superName,1);
					System['className']=className;

				});


	三、功能模块扩充
		功能独立 易于扩充 不影响原有功能
		1.接口里的merge方法
			window['interfaceName'].merge(target,args,override);
			上面这个方法作用是：一个或多个对象合并成一个指定的对象,默认同名的键值前面的不会被覆盖。
			参数说明：
				@param :(Object)target   合并后的对象。null 代表给命名空间本身进行扩展，
				@param :(Array)args   	 要合并对象的集合
				@param :(Boolean)override 是否覆盖同名键名值,默认 false 是不覆盖
			返回合并后的类
		2.克隆对象(clone)
			window['interfaceName'].clone(target);
		3.实例化后，晚期扩充成员的方法
			var obj=new window['interfaceName'].classNme();
			obj.merge(args,override);
			参数说明：
					@param :(Array)args   	 要合并对象的集合
					@param :(Boolean)override 是否覆盖同名键名值,默认 false 是不覆盖
			上面的方法是在当前实例中扩充成员

	四、命名空间灵活 与其他插件无冲突
		命名空间接口设计的宗旨是:只要修改一处即可搞定一切与第三方插件的冲突，命名空间的命名权限提供给用户，用户可以随意命名。
		命名空间接口定义: var LHH_NAMESPACE_20150715_='interfaceName';
        命名空间接口调用: window[LHH_NAMESPACE_20150715_]  或者 window['interfaceName'] 或者 LamborghiniJS_20150910123700_ 或者 LAMJS
		命名空间接口的设计是灵活的，修改接口名不影响库文件里的内核代码及类接口。
        与第三方插件发生冲突时解决方法:  修改变量 'LHH_NAMESPACE_20150715_' 里的值 即可。'LHH_NAMESPACE_20150715_' 是命名空间接口的密钥 作用是定义命名空间。


	五、应用
		window['interfaceName'].app :这个对象代表当前实例化后的对象 (window['interfaceName'] 参考 四、里的 命名空间接口调用)

		文件引入方式:有两种方式
			多个同名文件只会被加载一次。因为每个被加载的类文件都会被注册到系统类文件加载器里保存，所以在每次加载时先检测系统类文件加载器里的文件是否已存在了，如果不存在才加载。
			系统类文件加载器里的文件一直保存到页面关闭；要查看里面的文件可通过 window['interfaceName'].classes访问，这是一个数组。
			之前在别的地方引入的文件它也能会检测到是否是同名文件，这个是通过对文件名解析做出的判断。但只检测带.class的关键字文件名称。

			1.下面这种不仅适合脚本文件和样式文件的引入还适合less文件的引入。load方法是加载指定的文件到加载器中，load方法可以链式调用多个不同类型文件，当调用到print方法的时候才会一次性从加载器里输出到页面中
				LAMJS['Loadcommon'].
					load({
						'baseUrl':jsPath,
						'suffix':'.js',
						'js':[
							'/Helper.class',
							'/Browser.class',
							'/Drag.class',
							'/Dom.class',
							'/Tools.class',
							'/PaintBase.class'
						]
					}).
					load({
						'baseUrl':cssPath,
						'suffix':'.css',
						'rel':'stylesheet',
						'css':[
							{'href':'/Browser','class':'c1'},
							{'href':'/Drag','id':'t2'},
							'/reset',
							'/global',
							'/lib'
						]
					}).
					load({
						'baseUrl':lessPath,
						'suffix':'.less',
						'rel':'stylesheet/less',
						'css':[
							'/reset',
							'/global',
							'/lib'
						]
					}).print();
				上面依次输出的是js、css、less文件
				用对象的方式可以传自定义参数






			2.下面这种仅适合脚本文件的引入（只引入脚本时推荐使用这种方式）
				System.import(['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js'],' ',' ');

				System
					.import([
						'/Browser.class',
						'/Drag.class',
						'/Dom.class',
						'/Tools.class',
						'/PaintBase.class'
					],classPath);

				或者像下面这样可以添加自定义参数
				System
					.import([
						{'src':'/Browser.class','data-main':'scripts/main.js'},
						{'src':'/Drag.class','attr':2},
						{'src':'/Drag_xy.class','attr':3},
						{'src':'/Dom.class','attr':4},
						{'src':'/PaintBase.class','attr':5}
					],classPath);
				
				也可以链式调用
				System
					.import(['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js'])
					.import([
	                    '/Browser.class',
	                    '/Drag.class',
	                    '/Dom.class',
	                    '/Tools.class',
	                    '/PaintBase.class'
	                ],classPath);



	六、继承
		在类继承之前要先进行检测。
		每一个组件除了继承基类中的配置属性以外, 还会根据需要增加自己的配置属性, 另外 子类中有的时候还会把父类的一些配置属性的含义及用途重新定义
		System.is方法是检测的作用。检测父类是否已注册过。检测子类名称是否与已注册的类名重名了。这句话必须放在第一行。
		继承的两种方式：
		1.构造器式继承
			System.Basis.extends.call(this);
			上面这句必须放在构造函数中
		2.原型链式继承
			System.extends(className,superName,1);
			上面这句必须放在类框架代码块末尾；(参考 二、开发约定 里的 类结构)

	七、原始对象的原型链上扩充的方法列表
			Function.method();
			Date.format();
			String.trim();
			String.filterChar();
			String.findStr();
			String.compareTwoStr(s);
			Array.indexOf();
			Array.lastIndexOf();
			Array.remove();
			Array.del();
			Array.contains();
			Array.copy();
			Array.insertAt();
			Array.insertBefore();
			Array.removeAt();
			Array.remove();
			Array.each();
			Array.filter();

	八、框架里的方法
			1.LAMJS.main();
			2.LAMJS.import();
			3.LAMJS.config();
			4.LAMJS.print();
				LAMJS.print('s'[,1,'a',...]);
				可以像python 的print 方法一样 ,会依次打印每个字符串，遇到逗号“,”会输出一个空格
			
			5.LAMJS.arr_isEmpty();
			6.LAMJS.wait();
			7.LAMJS.queues();
			8.LAMJS.length();
			9.LAMJS.proxy();
			10.LAMJS.putIndexGetObjectTheValue();
			11.LAMJS.list();
			12.LAMJS.extends();
			13.LAMJS.extend();
			14.LAMJS.merge();
			15.LAMJS.clone();
			16.LAMJS.is();
			17.LAMJS.log();
			18.LAMJS.autoCenter();
			19.LAMJS.template();
			20.LAMJS.replaceTpl();
			
			21.LAMJS.Basis.printTag();
			22.LAMJS.Basis.printScript();
			23.LAMJS.Basis.printLink();
			24.LAMJS.Basis.extends();
		
		
	九、错误机制
			throw new Error(msg);
	十、检测机制
			1.数据类型检测
				LAMJS.isset(); 	
				LAMJS.empty();
				LAMJS.error(); 	 	
				LAMJS.isEmptyObject(); 
				LAMJS.isType();
				LAMJS.isObject();	 
				LAMJS.isString();	 
				LAMJS.isArray();
				LAMJS.isFunction(); 
				LAMJS.isNumber(); 	 
				LAMJS.isFloat(); 
        	
        	2.文件类型检测
        		LAMJS.is();
        		LAMJS.isClassFile(); 

	十一、基础类非独立浏览器环境（浏览器有专用的类）， 可应用服务器nodejs 。
	十二、说明格式
		
			/**
			 * @author: lhh
			 * 产品介绍：
			 * 创建日期：2014-11-28
			 * 修改日期：2014-11-28
			 * 名称：
			 * 功能：
			 * 说明：
			 * 注意：
			 * @param   (String)param 			NO NULL :
			 * @return   :
			 * Example：
			 */

	十三、组件的配置属性
	
	十四、沙箱(Sandbox)
		
		LAMJS.main()是LamborghiniJS 的沙箱机制 
		LAMJS.run() 是改变创建标签机制 用document.createElement() 
		沙箱的作用防止全局变量污染
		
	
	十五、hashcode
		this.equals(Object) 方法
		equals()方法的作用是比较俩对象是否是同一个对象。
		 _hashCode 属性值, 这个值是一个字符串 是new 一个对象时随机生成的，不同的对象的_hashCode 是不同的，由此根据这个原理可以比对两个对象是否相等。
		给对象创建_hashCode属性有两种方式
		1.实例化时自动生成
		2.调用静态的 BiObject.toHashCode()方法生成(如果检查对象里已有_hashCode 就返回,不会重新生成新的值)
		当前实例的对象的toHashCode()方法可以返回_hashCode 如果没有就创建并返回
		
	十六、标签创建方式(在配置文件中设置)
			标签创建方式有两种：
				1.document.createElement()
				2.document.write()
		
	十七、页面里包含另一个页面(.html include 另一个.html文件)
        功能：
			1.设定一个占位符标签
			2.根据占位符里file参数请求另一个页面，然后替换掉当前占位符
		警告:有些浏览器要支持跨域才可以!!!，解决方法：在服务器环境里运行
		步骤：
			1.自定义标签:<include file="./include/header.html" 
								  beforeSend="function(a,b){
		                              this.dataType="html" 
                                      this.async=true;
                         }"></include>
                 note:beforeSend 属性是可选的，这里的this就是Ajax的settings,在发送之前设置jQuery Ajax提供的所有参数，
                                     这里就可以设置一个beforeSend回调函数，其余的参数都可以在这个函数里设置,
                                     在beforeSend回调函数里设置file 参数 要换成 url 参数。
                                     函数里的两个参数请参考jQuery Ajax API。
                
			2.先要加载Html.class 类文件
				//run方法可以修改创建tag方式 
				LAMJS.run(function(){
						var System=this;
						3.调用include 方法 根据include 标签里的file 找到指定的html 文件替换当前的include 标签
						System.Html.include($('include'));

				 });
				 
	十八、模版标签
				 查找解析指定元素属性里的模板标签
					 1.定义元素属性值里的模板标签 
					    <link rel="stylesheet" type="text/css" href="{{_ROOT_}}/project/common/css/bootstrap.css"/>
					 2.解析模板标签 (模板标签就是js 变量名称)
					    LAMJS.replaceTpl('link','href');
					    
				 
				 note:  用MVC方式渲染页面就不用这种方式，MVC渲染请参考 十九、MVC。
				        修改模板标签分隔符参考 二十、配置参数 一、模板标签分隔符
	
	十九、MVC (详细demo看project目录里)
				
				访问url格式：
					localhost/project/controllers/controllerName.html?file=view
						controllers:控制器文件夹
						controllerName:控制器文件名称（对应视图文件的文件夹，如：index）
						file:接收控制器中的方法名的参数。file关键字可以在控制器中自定义
						view：调用对应控制器中的方法（对应着视图文件名）
				controllers/index.html:
						    LAMJS.main([
									LAMJS.Config.Public.ROOT,
									LAMJS.Config.Public.ROOT+'/project/views/index'
								],function(ROOT,views) {
									'use strict';
									var System = this;
									eval('action'+System.Controller.get_url_name('file').firstToUpperCase())();
			
									function actionIndex(){
										new System.Template().render(views+'/index.html',{
											'ROOT':ROOT,
											'title':'Bootstrap Template',
											'D':{
												'title':'hello word！',
												'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
											}
			
										},function(content){
											System.print(content);
											//注1
											 System.Html.include($('include'));
										},{
											'async':true,
											//注2
											beforeSend:function(a,b){
			                                    //this：就是Ajax的settings
			                                    //下面的意思是发送之前把async属性设置为false,等于把上面的相同设置给覆盖掉，上面的设置就无效了
			                                    this.async=false;
			                                }
										});
									}
			
			                });
			                
			           render参数：
		                        参数1：请求视图的路径
		                        参数2：替换视图中模板标签的数据（这里就是MVC中的M ）
		                        参数3：视图路径请求成功后返回视图文件(String) 
		                        参数4：设置请求Ajax 的参数(必须是json类型)
                          
	                   note:
	                          不要忘了方法名称前缀action
	                          注1： System.Html.include($('include'))是可选的， 要放在渲染视图的下面。
	                                MVC方式的include标签的file属性值是请求的控制器，而后通过控制器请求视图，而不是直接去请求视图。
	                                错误的方式：System.Html.include($('include'))放在视图里。
	                                    
	                          注2：beforeSend函数里的this就是Ajax的settings,在发送之前设置jQuery Ajax提供的所有参数。
	                                                            render方法参数4就可以设置一个beforeSend回调函数，其余的参数都可以在这里设置。
	                                                            函数里的两个参数请参考jQuery Ajax API。
	                
	            views/index/index.html:
		                <!DOCTYPE html>
	                    <html>
	                    <head>
	                        <title>{{title}}</title>
	                        <link rel="stylesheet" type="text/css" href="{{ROOT}}/project/common/css/bootstrap.css"/>
	                        <!--[if lt IE 8]>
	                        <script>
	                            alert('请使用谷歌、火狐浏览器！');
	                        </script>
	                        <![endif]-->
	                    
	                    
	                    </head>
	                    <body>
		                    <div class="container">
		                        <div class="jumbotron">
		                            <h1>{{D.title}}</h1>
		                            <p>{{D.content}}</p>
		                            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
		                        </div>
		                    </div>
	                    </body>
	                    </html>
                
               
                
    二十、配置参数
            一、模板标签分隔符设置与修改
                1.设置模板分隔符： 
                     在配置文件 的templat里配置左右分隔符分别是：leftLimit , rightLimit
                     也可在单独视图里定义，只匹配当前页面里的分隔符与别的页面没关系，不会改变全局配置
                 2.修改模板分隔符：(用MVC方式：设置在控制器方法里)
                     LAMJS.Config.templat.leftLimit  = '${{';
                     LAMJS.Config.templat.rightLimit = '}}$';
                     
                     

                   


	






