
window[GRN_LHH].main([window],function(window,undefined){
    'use strict';
    var System=this;
    System.is(System,'Helper','Event');

    var __this__=null;
    function Event(e){

        System.Basis.extends.call(this,System.Helper);
        __this__=this;
        /*--------------------------------------------------------------------------------------------------*/

        var _e  = null;
        this._e = _e =System.Basis.fixEvt(e);
        var ie = (_e.stopPropagation == undefined);
        this.event = _e;
        this.type  = _e.type;
        this.timeStamp = new Date();

        this.altKey    = _e.altKey   || false;
        this.ctrlKey   = _e.ctrlKey  || false;
        this.shiftKey  = _e.shiftKey || false;
        this.metaKey   = _e.metaKey  || false;

        this.keyCode   = ie ? _e.keyCode : _e.which;

        // left:1, right:2, middle:4
        switch(_e.button){
            case 0:
                this.button = 1;
                break;
            case 1:
                this.button = ie ? 1 : 4;
                break;
            default:
                this.button = _e.button;
                break;
        }

        switch(_e && _e.keyCode){
            case Event.keyCode.ESCAPE:// 按 Esc

                break;
            case 113:// 按 F2

                break;
            case Event.keyCode.ENTER:// enter 键
                _e.keyCode=9;
                return false;
                break;
            case Event.keyCode.TAB:// Tab 键

                break;


        }

        this.clientX    = ie ? (_e.clientX + document.documentElement.scrollLeft - document.body.clientLeft) : _e.pageX;
        this.clientY    = ie ? (_e.clientY + document.documentElement.scrollTop  - document.body.clientTop ) : _e.pageY;
        this.offsetX    = ie ? _e.offsetX : _e.layerX;
        this.offsetY    = ie ? _e.offsetY : _e.layerY;
        this.srcElement = ie ? _e.srcElement : _e.target;

        this.fromElement= ie ? _e.fromElement :  ((this.type == "mouseover")? _e.relatedTarget : (this.type == "mouseout"  ? _e.target : undefined));

        this.toElement  = ie  ? _e.toElement   : ((this.type == "mouseout")  ? _e.relatedTarget : (this.type == "mouseover" ? _e.target : undefined));



    }
    Event.keyCode= {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };

    Event.prototype = {
        'constructor':Event,
        '__constructor':function(){},
        'cancelBubble': function(){
            if(this._e.stopPropagation){
                this._e.stopPropagation();
            }else{
                this._e.cancelBubble = true;
            }
        },
        'getEventXY':function(){
            return {x:this.clientX, y:this.clientY};
        },
        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Event对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){

        }

    };
    System.extends(Event,System.Helper,1);
    System['Event']=Event;

});

