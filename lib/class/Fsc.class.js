
window[LHH_NAMESPACE_20150715_].main([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Fsc');


	var __this__=null;

	// Functions to create xhrs
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}

	function createActiveXHR() {
		try {
			return new window.ActiveXObject( "Microsoft.XMLHTTP" );
		} catch( e ) {}
	}


	function Fsc(){

		System.Basis.extends.call(this,System.Browser);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		this.fso =null;
		this.file=null;
		this.xhr =null;
	}
	Fsc.getXMLHttpRequest=function() {
		if (window.XMLHttpRequest && !("file:" === window.location.protocol && "ActiveXObject" in window)){
			return createStandardXHR();
		}
		try {
			return createActiveXHR();
		} catch (e) {
			throw new Error("browser doesn't support AJAX."+e.name);
		}
	};

	Fsc.prototype = {
		'constructor':Fsc,
		'__constructor':function(){},
		'cFsc':function(){
			var __this__=this;
			if(ActiveXObject){//IE
				this.fso = new ActiveXObject("Scripting.FileSystemObject");
			}else{

			}
			return this.fso;
		},
		'getXHR':function(){
			this.xhr = Fsc.getXMLHttpRequest();
		},

		'createTextFile':function(fso,file){
			fso = fso || this.fclose;
			this.file=fso.CreateTextFile(file, true);
			return this.file;
		},
		'writeLine':function(file,str,n){
			file =file || this.file;
			file.WriteLine(str);
			if(n){
				file.WriteBlankLines(n); //换行
			}
		},
		'fclose':function(file){
			file = file || this.file;
			file.close();
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
	System.extends(Fsc,System.Browser,1);
	System['Fsc']=Fsc;

});

