/**
 * Created by Administrator on 2018/1/24.
 */
var uploadDate=function () {
    this.list_Datas=null;
};
uploadDate.prototype.list=function (datas,clos,url) {
    var _this=this;
    layui.config({
    }).use(['table','form','layer','layedit','jquery','laypage'],function(){
        var form = layui.form,table = layui.table,
            layer = parent.layer === undefined ? layui.layer : parent.layer,
            laypage = layui.laypage,
            $ = layui.jquery;
        var localObj = window.location;
        var contextPath = localObj.pathname.split("/")[1];
        basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;
        //监听列表数据
        table.on('tool(test)', function(obj){
            var data=obj.data;
            if(data.separation_state==='处理中'||data.separation_state==='未知'||data.state==="处理中"){
                return;
            }
            localStorage['cliInfo']=JSON.stringify(data);
            layer.open({
                type: 2,
                title: '案件详情',
                shadeClose: true,
                shade: 0.5,
                maxmin: true, //开启最大化最小化按钮
                area: ['893px', '600px'],
                content: '/api/ocr/val_invoice/'
            });
        });
        //方法级渲染
        //展示已知数据
        table.render({
            elem: '#test'
            ,cols: clos
            ,data: datas
            ,skin: 'line' //表格风格
            ,even: true
            ,page: true //是否显示分页
            ,limits: [ 10, 15, 20 , 25, 30]
            ,limit: 10 //每页默认显示的数量
        });
    })
};