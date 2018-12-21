/**
 * Created by Administrator on 2018/7/11.
 */
var cost_name//项目名称
    , cost_data;//金额
var medical_name=''//药品名称
    , medical_count=''//药品数量
    , medical_specifications=''//药品规格
    , medical_price=''//药品价格
    , medical_class=''//药品等级
    , medical_unit='';//药品单位

layui.use('table', function(){
    var table = layui.table;

    //方法级渲染
    table.render({
        elem: '#LAY_table_user1'
        ,data:app.msg.cost
        ,cols: [[
            {field:'cost_name', title: '项目名称' , edit: 'text'}
            ,{field:'cost_data', title: '金额', edit: 'text' }
            ,{fixed: 'right', width:80, align:'center', toolbar: '#barDemo'}
        ]]
        ,id: 'testReload'
        ,done:function () {
            if(app.msg.cost.length>app.msg.medical.length){
                table.render({
                    elem: '#LAY_table_user1'
                    ,data:app.msg.cost
                    ,cols: [[
                        {field:'cost_name', title: '项目名称' , edit: 'text'}
                        ,{field:'cost_data', title: '金额', edit: 'text' }
                        ,{fixed: 'right', width:80, align:'center', toolbar: '#barDemo'}
                    ]]
                    ,id: 'testReload'
                });
            }else {
                table.render({
                    elem: '#LAY_table_user2'
                    ,data:app.msg.medical
                    ,cols: [[
                        {field:'medical_name', title: '药品名称', edit: 'text'}
                        ,{field:'medical_count', title: '药品数量', edit: 'text' }
                        ,{field:'medical_specifications', title: '药品规格', edit: 'text' }
                        ,{field:'medical_price', title: '药品价格', edit: 'text' }
                        ,{field:'medical_class', title: '药品等级', edit: 'text' }
                        ,{field:'medical_unit', title: '药品单位', edit: 'text' }
                        ,{fixed: 'right', width:80, align:'center', toolbar: '#barDemo1'}
                    ]]
                    ,id: 'testReload'
                });
            }
        }
    });
    table.render({
        elem: '#LAY_table_user2'
        ,data:app.msg.medical
        ,cols: [[
            {field:'medical_name', title: '药品名称', edit: 'text'}
            ,{field:'medical_count', title: '药品数量', edit: 'text' }
            ,{field:'medical_specifications', title: '药品规格', edit: 'text' }
            ,{field:'medical_price', title: '药品价格', edit: 'text' }
            ,{field:'medical_class', title: '药品等级', edit: 'text' }
            ,{field:'medical_unit', title: '药品单位', edit: 'text' }
            ,{fixed: 'right', width:80, align:'center', toolbar: '#barDemo1'}
        ]]
        ,id: 'testReload'
        ,done:function () {
            if(app.msg.cost.length>app.msg.medical.length){
                table.render({
                    elem: '#LAY_table_user1'
                    ,data:app.msg.cost
                    ,cols: [[
                        {field:'cost_name', title: '项目名称' , edit: 'text'}
                        ,{field:'cost_data', title: '金额', edit: 'text' }
                        ,{fixed: 'right', width:80, align:'center', toolbar: '#barDemo'}
                    ]]
                    ,id: 'testReload'
                });
            }else {
                table.render({
                    elem: '#LAY_table_user2'
                    ,data:app.msg.medical
                    ,cols: [[
                        {field:'medical_name', title: '药品名称', edit: 'text'}
                        ,{field:'medical_count', title: '药品数量', edit: 'text' }
                        ,{field:'medical_specifications', title: '药品规格', edit: 'text' }
                        ,{field:'medical_price', title: '药品价格', edit: 'text' }
                        ,{field:'medical_class', title: '药品等级', edit: 'text' }
                        ,{field:'medical_unit', title: '药品单位', edit: 'text' }
                        ,{fixed: 'right', width:80, align:'center', toolbar: '#barDemo1'}
                    ]]
                    ,id: 'testReload'
                });
            }
        }
    });
    table.on('edit(user)', function(obj){
        var data = obj.data;
        if(obj.field== "cost_name"||obj.field== "cost_data"){
            app.msg.cost[obj.data.LAY_TABLE_INDEX][obj.field]=obj.value;
        }
    });
    table.on('edit(user1)', function(obj){
        var data = obj.data;
        if(obj.field!== "cost_name"||obj.field!== "cost_data"){
            app.msg.medical[obj.data.LAY_TABLE_INDEX][obj.field]=obj.value;
        }
    });
});
function funcss(data,this_type) {
    layer.confirm('真的删除行么', function(index) {
        if (this_type == 'medical') {
            var obj = new Object();
            obj['medical_id'] = app.msg[this_type][data.getAttribute('data-Index')].medical_id;
            app.msg['medical_arr'] = new Array()
            app.msg['medical_arr'].push(obj);
        } else {
            var obj = new Object();
            obj['cost_id'] = app.msg[this_type][data.getAttribute('data-Index')].cost_id;
            app.msg['cost_arr'] = new Array()
            app.msg['cost_arr'].push(obj);
        }
        modify_data();
    });
}
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
function updata_fyxx(data) {
    var _this=app;
    if(data==='Cost'){
        //添加费用信息
        var index=layer.open({
            type: 1,
            title:'费用信息',
            skin: 'layui-layer-rim', //加上边框
            btn:['确认','取消'],
            content: '<div id="open" class="layui-form-item"> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">项目名称</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input" onchange="cost_name=this.value"> ' +
            '</div>' +
            '</div> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">金额</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="cost_data=this.value"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
            btn1:function (obj,n) {
                if(cost_name!==''&&cost_name!==undefined&&cost_data!==''&&cost_data!==undefined){
                    var obj=new Object()
                    obj['cost_name']=cost_name;
                    obj['cost_data']=cost_data;
                    obj['cost_id']='';
                    _this.msg.cost.push(obj);
                    modify_data();
                    return;
                }
                layer.msg('请填入完整信息')
            }
        })
    }else if (data==='Drug'){
        //添加药品信息
        var index=layer.open({
            type: 1,
            title:'费用信息',
            skin: 'layui-layer-rim', //加上边框
            btn:['确认','取消'],
            content: '<div id="open" class="layui-form-item"> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">药品名称</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input" onchange="medical_name=this.value"> ' +
            '</div>' +
            '</div> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">药品数量</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="medical_count=this.value"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">药品规格</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="medical_specifications=this.value"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">药品价格</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="medical_price=this.value"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">药品等级</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="medical_class=this.value"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="layui-inline"> ' +
            '<label class="layui-form-label">药品单位</label> ' +
            '<div class="layui-input-inline"> ' +
            '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="medical_unit=this.value"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
            btn1:function (obj,n) {
                if(medical_name!==''
                    &&medical_name!==undefined){
                    var obj=new Object()
                    obj['medical_name']=medical_name;
                    obj['medical_count']=medical_count;
                    obj['medical_specifications']=medical_specifications;
                    obj['medical_price']=medical_price;
                    obj['medical_class']=medical_class;
                    obj['medical_unit']=medical_unit;
                    obj['medical_id']='';
                    _this.msg.medical.push(obj);
                    modify_data();
                    return;
                }
                layer.msg('请填入完整信息')
            }
        })
    }

}