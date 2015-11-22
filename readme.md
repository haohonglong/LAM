	version ： LamborghiniJS(OOPJS) 1.0
	author  ：lhh
	创建日期 ：2015-8-19
	修改日期 ：2015-11-22


产品介绍：

	LamborghiniJS 不是插件，是一种javascript OOP的思想实现的类库，类库的目的是为应用框架的搭建做更好的基础服务。
	LamborghiniJS 的诞生初衷是自2013年起,为解决自己工作方便写的小工具,发展到现在的一个类库思想实现.
	LamborghiniJS 的目的是:少写重复性的代码,封装已通过测试功能的成熟代码,便于以后开发中复用.
	LamborghiniJS 里有接口的概念,每一个类都是通过接口去调用.每定义一个类名,都要先定义一个同名的接口名(参考 二、开发约定 类结构)
	
	现有选项卡、拖拽、常用工具、弹出层、幻灯、html5绘图基础类的实例．
	如要根据项目需求要修改或扩展现有的这些实例，正确的方法是：
	1.创建一个子类继承父类(现有的实例的类)
	2.覆写父类里的成员
	(继承参考 六、继承)
	错误的方法是:在原有的类库实例上修改!!!

类库声明：

类库说明：

	一、配置
		
		一次配置即可搞定!
		'config.js'文件到你的项目中并引用到页面里，只有这个文件是跟项目绑定的。
		<script type="text/javascript" src="./js/config.js"></script>
		然后修改下面信息 (参考 二、开发约定)


		if(!LHH_NAMESPACE_20150715_){
        	var LHH_NAMESPACE_20150715_='interfaceName';
        }

        if(!LHH_CLASSPATH_20150717_){
            var LHH_CLASSPATH_20150717_={
                'path':'../',
                'classpath':'LamborghiniJS',
                'getClasspath':function(){
                    return this.path+this.classpath;
                }
            };
        }


        根据下面三条修改上面对应的参数
			1.修改 LHH_NAMESPACE_20150715_ 的值
			2.修改 LHH_CLASSPATH_20150717_.path 的值
			3.修改 LHH_CLASSPATH_20150717_.classpath 的值


		'config.js'文件里做的事情是：
			1.配置类库文件的路径信息及别的相关信息
			2.加载基础类文件
			3.加载加载器工具
			4.加载初始化init.js文件
			5.检测框架文件路径加载是否正确

		'init.js'文件里做的事情是：加载通用框架类

		具体应用类加载都在页面里进行设置 (参考五、应用 里的 文件引入方式)


	二、开发约定
	
		'LHH_NAMESPACE_20150715_' 在'config.js'里设定,变量名: LHH_NAMESPACE_20150715_ 是框架里定死的禁止改动，可以修改变量的值。
		禁止修改'Basis.class.js'里的 'LHH_NAMESPACE_20150715_' 的值。
		成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
		调用基类的静态成员方法:(调用接口.类名称.静态成员)。
        基类不允许被直接实例化，要实例化它的派生类。

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
        		'Component'      	:function(){},
        		'Helper'     		:function(){},
        		'Browser'    		:function(){},
        		'Event'      		:function(){},
        		'Dom'        		:function(){},
        		'BiObject'   		:function(){},
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
		命名空间接口设计的宗旨是:只要修改一处就可搞定一切与第三方插件的冲突。
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
				window[LHH_NAMESPACE_20150715_]['Loadcommon'].
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
				System.import(['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js']);

				System.import([
					'/Browser.class',
					'/Drag.class',
					'/Dom.class',
					'/Tools.class',
					'/PaintBase.class'
				],classPath);

				或者像下面这样可以添加自定义参数
				System.import([
					{'src':'/Browser.class','data-main':'scripts/main.js'},
					{'src':'/Drag.class','attr':2},
					{'src':'/Drag_xy.class','attr':3},
					{'src':'/Dom.class','attr':4},
					{'src':'/PaintBase.class','attr':5}
				],classPath);
				
				也可以链式调用
				System.import(['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js']).import([
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
			Object.length();
			Object.list();

	八、框架里的方法说明
			LAMJS.main();
			LAMJS.config();
			LAMJS.print();
			LAMJS.import();
			LAMJS.arr_isEmpty();
			LAMJS.wait();
			LAMJS.queues();
			LAMJS.length();
			LAMJS.proxy();
			LAMJS.putIndexGetObjectTheValue();
			LAMJS.list();
			LAMJS.extends();
			LAMJS.extend();
			LAMJS.merge();
			LAMJS.clone();
			LAMJS.is();
			LAMJS.autoCenter();
			
			LAMJS.Basis.printTag();
			LAMJS.Basis.printScript();
			LAMJS.Basis.printLink();
			LAMJS.Basis.extends();
		
		
	九、错误机制
			throw new Error(msg);
	十、检测机制
			LAMJS.is(); 	
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
		
	







