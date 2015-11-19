/**
 * 创建人：lhh
 * 创建日期:2015/3/20
 * 修改日期:2015/8/02
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 'LHH_CLASSPATH_20150717_'里的属性 和 'LHH_NAMESPACE_20150715_'; 的值；
 *
 * note :
 *
 *
 *
 */

'use strict';

//基础类的设置
if(!LHH_NAMESPACE_20150715_){
    var LHH_NAMESPACE_20150715_='System';
}

if(!LHH_CLASSPATH_20150717_){
    var LHH_CLASSPATH_20150717_={
        'vendorPath':'./',
        'classPath':'lib/js',
        'getClassPath':function(){
            return this.vendorPath+this.classPath;
        }
    };
}


//加载基础类
document.write('<script src="'+LHH_CLASSPATH_20150717_.getClassPath()+'/Basis.class.js" type="text/javascript"><\/script>');
document.write('<script src="'+LHH_CLASSPATH_20150717_.getClassPath()+'/init.js" type="text/javascript"><\/script>');


setTimeout(function(){
    if(!window[LHH_NAMESPACE_20150715_]) {
        alert("cannot find Basis class");
    }
},1800);