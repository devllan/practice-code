/**
 * Created by Administrator on 2018/7/11.
 */
var cost_name//项目名称
    , cost_data;//金额
var project_name=''//药品名称
    , project_unit_price=''//单价
    , project_count=''//数量
    , project_total=''//金额
    , project_regulation=''//规格
    , project_class=''//类别  甲乙类
    , parent_project_name=''//项目所属类别  中西药费

layui.use('table', function(){
    var table = layui.table;
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
function fyqd_del_data(data){
    app.msg['cos_project']=new Array();
    app.msg['cos_project'].push(data);
    modify_data();
}
function updata_fyxx(data) {
    //添加 处方信息
    var index=layer.open({
        type: 1,
        title:'费用信息',
        skin: 'layui-layer-rim', //加上边框
        btn:['确认','取消'],
        content: '<div id="open" class="layui-form-item"> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">名称</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input" onchange="project_name=this.value"> ' +
        '</div>' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">单价</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="project_unit_price=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">数量</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="project_count=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">金额</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="project_total=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">规格</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="project_regulation=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">类别</label> ' +
        '<div class="layui-input-inline"> ' +
        '<select id="open_select" name="interest" lay-filter="aihao"  onchange="project_class=this.value"> ' +
        '<option value=""></option>' +
        '<option value="甲">甲类</option> ' +
        '<option value="乙">乙类</option> ' +
        '<option value="丙">丙类</option> ' +
        '</select> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">所属种类</label> ' +
        '<div class="layui-input-inline"> ' +
        '<select id="open_select" name="interest" lay-filter="aihao"  onchange="parent_project_name=this.value"> ' +
        '<option value="9">未知</option> ' +
        '<option value="1">西药费</option> ' +
        '<option value="2">中成药费</option> ' +
        '<option value="3">床位费</option> ' +
        '<option value="4">检查费</option> ' +
        '<option value="5">治疗费</option> ' +
        '<option value="6">护理费</option> ' +
        '<option value="7">手术费</option> ' +
        '<option value="8">接生费</option> ' +
        '<option value="10">保健品</option> ' +
        '</select> ' +
        '</div> ' +
        '</div> ' +
        '</div>',
        btn1:function (obj,n){
            if(project_name!==''
                &&project_name!==undefined){
                var obj=new Object();
                obj['project_name']=project_name;
                obj['project_unit_price']=project_unit_price;
                obj['project_count']=project_count;
                obj['project_total']=project_total;
                obj['project_regulation']=project_regulation;
                obj['project_class']=project_class;
                obj['parent_project_name']=parent_project_name;
                obj['drug_id']='';
                app.msg['medicine']=new Array();
                app.msg.medicine.push(obj);
                modify_data();
                return;
            }
            layer.msg('请填入完整信息')
        }
    })
}
function fyqd_click(event){
    if(event.target.nodeName==='INPUT'){
        event.path[1].classList.add('th_table_edit')
        event.target.onblur=function () {
            event.path[1].classList.remove('th_table_edit')
        }
    }
}