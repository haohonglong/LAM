/**
 *
 * @author lhh
 * 产品介绍：创建一个XMLHTTP 对象
 * 创建日期：2016-10-17
 * 修改日期：2017-3-17
 * 名称：LAMJS.Xhr
 * 功能：
 * 说明：
 * 注意：
 * @return  ()						:
 * Example：
 */
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



	var Xhr = System.Browser.extend({
		constructor: function () {
			__this__ = this;
			this.xhr =null;
		},
		'_className':'Xhr',
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
		 * 创建日期：2016-10-7
		 * 修改日期：2016-10-7
		 * 名称：destructor
		 * 功能：在注销Xhr对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
	Xhr.getXMLHttpRequest=function() {
		if (window.XMLHttpRequest && !("file:" === window.location.protocol && ("ActiveXObject" in window))){
			return createStandardXHR();
		}
		try {
			return createActiveXHR();
		} catch (e) {
			throw new Error("browser doesn't support AJAX."+e.name);
		}
	};
	var myAjax = {
		// XMLHttpRequest IE7+, Firefox, Chrome, Opera, Safari ；  ActiveXObject IE6, IE5
		xhr: Xhr.getXMLHttpRequest(),
		get: function (url, callback) {
			this.xhr.open('get', url);
			this.onreadystatechange(callback);
			this.xhr.send(null);
		},
		post: function (url, data, callback) {
			this.xhr.open('post', url);
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			this.onreadystatechange(callback);
			this.xhr.send(data);
		},
		onreadystatechange: function (callback, xhr) {
			xhr = xhr || this.xhr;
			xhr.onreadystatechange = function () {
				if (4 === xhr.readyState && 200 === xhr.status) {
					callback(xhr.responseText);
				}
			}
		}
	};
	Xhr.ajax = myAjax;

	System['Xhr']=Xhr;

});

