/**
 * Created by Administrator on 2018/1/24.
 */
var table_Rendering=function () {

}
table_Rendering.prototype.table_search=function (datas,clos,url) {
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
            var data = obj.data;
            layer.load(2);
            var obj_=new Object();
            var url_='';
            switch (purpose.GetQueryString('type'))
            {
                case 'search_hospital'://医院
                    obj_['hospital_idx_id']=obj.data['hospital_idx_id'];
                    url='/dev/search_hospital_dict/';

                    break;
                case 'search_disease'://疾病
                    obj_['disease_id']=obj.data['disease_id'];
                    url='/dev/search_disease_dict/';
                    break;
                case 'search_Drugs_alias'://药品
                    obj_['drug_id']=obj.data['drug_id'];
                    url='/dev/search_Drugs_dict/';
                    break;
                case 'search_medical_alias'://检查检验指标
                    obj_['test_idx_id']=obj.data['test_idx_id'];
                    url='/dev/search_medical_dict/';
                    break;
                default:
                    console.log('无');
            }
            var datas=JSON.stringify(obj_);
            //请求数据详情
            app.$http.post(url,datas).then(
                function(data){
                    //请求数据成功
                    var Datas_last=data.data.data.data[0];
                    //创建数据文本
                    var div_str='<div style="padding: 50px; line-height: 22px; background-color:#393D49 ; color: #fff; font-weight: 300;">';
                    var span_='';
                    for(msg in Datas_last){
                        span_+='<span>'+Datas_last[msg]+'</span><br>';
                    }
                    div_str+=span_+'</div>'
                    var index=layer.open({
                        type: 1
                        ,shade: 0.8
                        ,title: false //不显示标题栏
                        ,id: 'LAY_layuipro'
                        ,content:div_str
                        ,btn: ['关闭']
                        ,btnAlign: 'c' //按钮居中
                        ,btn1: function(){
                            layer.close(index);
                        }
                    });
                    layer.closeAll('loading');
                },
                function(err){
                    //请求数据失败
                    alert('请求出错');
                })
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
            ,limits: [5, 10, 20]
            ,limit: 5 //每页默认显示的数量
        });
    })
}
