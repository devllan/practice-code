/**
 * Created by Administrator on 2018/7/11.
 */
for(var i=0;i<document.getElementsByTagName('td').length;i++){
    document.getElementsByTagName('td')[i].style.height='45px'
}
layui.use('table', function(){
    var table = layui.table;
});
function modify_data() {
    var index = layer.load(1, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    });
    var url='/api/ocr/validation/updata_data/?' +
        'case_id='+srceach_l.case_id+'' +
        '&image_name='+srceach_l.image_name+'' +
        '&user='+localStorage.user_code+'&type='+srceach_l.separation_state;
    app.$http.post(url,app.msg).then(function (data) {
        layer.closeAll();
        layer.msg('成功');
        //无论修改是否成功都会渲染界面
        app.init();
    },function (err) {
        layer.closeAll();
        layer.msg('失败，错误代码：'+err.status);
        app.init();
    })
}
function bysy_click(event){
    if(!(event.path[0].nodeName=='TD'&&event.path[0].innerHTML.indexOf('span')===-1)&&event.path[0].nodeName!=='TEXTAREA'&&event.path[0].lastChild.nodeName!=='TEXTAREA'&&event.path[0].nodeName!=='TH'&&event.path[0].nodeName!=='DIV'&&event.path[0].nodeName!=='TBODY'&&event.path[0].nodeName!=='TABLE'){
        var table_td=event.path[0].nodeName=='TD'?event.path[0]:event.path[1];
        var table_width=table_td.offsetWidth;
        var textarea_td=document.createElement('textarea');
        textarea_td.style.width='99%';
        textarea_td.className='textarea_inp';
        table_td.firstChild.style.display='none';//隐藏 SPAN 标签
        textarea_td.value=app.msg[table_td.firstChild.className.split(' ')[0]];//为动态生成的textarea设置内容
        table_td.appendChild(textarea_td);//将textarea添加进表格
        table_td.style.width=100+'px';
        autoTextarea(textarea_td);//设置textarea高度
        textarea_td.focus();//获取焦点
        textarea_td.onblur=function () {//失去焦点事件
            if(!textarea_td.value.split('')[0]==="'"){
                !isNaN(textarea_td.value)?textarea_td.value="'"+textarea_td.value:textarea_td.value;
            }
            app.msg[table_td.firstChild.className.split(' ')[0]]=textarea_td.value;
            table_td.removeChild(table_td.lastChild);
            table_td.firstChild.style.display='block';//显示 SPAN 标签
        }
    }
}
/*
 *.textarea高度
 */
function autoTextarea(elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };

            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};