
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Xhr');


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

	var myAjax = {
		// XMLHttpRequest IE7+, Firefox, Chrome, Opera, Safari ；  ActiveXObject IE6, IE5
		xhr: window.XMLHttpRequest ? createStandardXHR() : createActiveXHR(),
		get: function (url, callback) {
			this.xhr.open('get', url);
			this.onreadystatechange(callback, this.xhr);
			this.xhr.send(null);
		},
		post: function (url, data, callback) {
			this.xhr.open('post', url);
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			this.onreadystatechange(callback, this.xhr);
			this.xhr.send(data);
		},
		onreadystatechange: function (callback, _xhr) {
			_xhr.onreadystatechange = function () {
				if (_xhr.readyState == 4 && _xhr.status == 200) {
					callback(_xhr.responseText);
				}
			}
		}
	};

	function Xhr(){
		System.Basis.extends.call(this,System.Browser);
		__this__=this;

		this.xhr =null;
	}
	Xhr.getXMLHttpRequest=function() {
		if (window.XMLHttpRequest && !("file:" === window.location.protocol && "ActiveXObject" in window)){
			return createStandardXHR();
		}
		try {
			return createActiveXHR();
		} catch (e) {
			throw new Error("browser doesn't support AJAX."+e.name);
		}
	};
	Xhr.ajax = myAjax;
	Xhr.prototype = {
		'constructor':Xhr,
		'__constructor':function(){},
		/**
		 *
		 * @returns {null|*}
		 */
		'getXHR':function(){
			this.xhr = Xhr.getXMLHttpRequest();
			return this.xhr;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Xhr对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}

	};
	System.extends(Xhr,System.Browser,1);
	System['Xhr']=Xhr;

});

