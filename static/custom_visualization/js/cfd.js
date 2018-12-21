/**
 * Created by Administrator on 2018/7/11.
 */
var drug_name=''//药品名称
    , drug_regulation=''//药品品规
    , drug_dosage=''//药品剂型
    , mode_of_use=''//使用方式
    , mode_of_use_dosage=''//使用剂量
    , usage_method=''//使用频次
    , pay_type=''//付费类型
    , drug_unit_price=''//药品单价
    , drug_free=''//药品小计
    , drug_count=''//药品数量
    , drug_type=''//药品类型
    , drug_class='';//药品等级

layui.use('table', function(){
    var table = layui.table;

    //方法级渲染
    table.render({
        elem: '#cfd_table_user'
        ,data:app.msg.medicine
        ,cols: [[
            {field:'drug_name', title: '药品名称', width:280, edit: 'text'}
            ,{field:'drug_regulation', title: '药品品规',width:90, edit: 'text' }
            ,{field:'drug_dosage', title: '药品剂型',width:90, edit: 'text' }
            ,{field:'mode_of_use', title: '使用方式',width:90, edit: 'text' }
            ,{field:'mode_of_use_dosage', title: '使用剂量',width:90, edit: 'text' }
            ,{field:'usage_method', title: '使用频次',width:90, edit: 'text' }
            ,{field:'pay_type', title: '付费类型',width:90, edit: 'text' }
            ,{field:'drug_unit_price', title: '药品单价',width:90, edit: 'text' }
            ,{field:'drug_free', title: '药品小计',width:90,edit: 'text' }
            ,{field:'drug_count', title: '药品数量',width:90, edit: 'text' }
            ,{field:'drug_type', title: '药品类型',width:90, edit: 'text' }
            ,{field:'drug_class', title: '药品等级',width:90, edit: 'text' }
            ,{fixed: 'right', width:80, align:'center', toolbar: '#cfd_barDemo'}
        ]]
        ,id: 'testReload'
    });

    table.on('edit(user)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        // layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
    });
});
function funcss(data,this_type) {
    layer.confirm('真的删除行么', function(index){
        if(this_type=='medicine'){
            var obj=new Object();
            obj['drug_id']=app.msg[this_type][data.getAttribute('data-Index')].drug_id;
            app.msg['medical_arr']=new Array()
            app.msg['medical_arr'].push(obj);
        }
        modify_data();
        layer.close(index);
    });
}
function modify_data() {
    var index = layer.load(1, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    });
    for(var i=0;i<app.msg.medicine.length;i++){
        if(app.msg.medicine[i].drug_class=='非医保'){
            app.msg.medicine[i].drug_class='0'
        }else if(app.msg.medicine[i].drug_class=='医保'){
            app.msg.medicine[i].drug_class='1'
        }
    }
    var url='/api/ocr/validation/updata_data/?' +
        'case_id='+srceach_l.case_id+'' +
        '&image_name='+srceach_l.image_name+'' +
        '&user='+localStorage.user_code+'&type='+srceach_l.separation_state;
    app.$http.post(url,app.msg).then(function (data) {
        layer.closeAll();
        layer.msg('成功');
        app.init();
    },function (err) {
        layer.closeAll();
        layer.msg('失败，错误代码：'+err.status);
        app.init()
    })
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
        '<label class="layui-form-label">药品名称</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input" onchange="drug_name=this.value"> ' +
        '</div>' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品品规</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="drug_regulation=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品剂型</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="drug_dosage=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">使用方式</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="mode_of_use=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">使用剂量</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="mode_of_use_dosage=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">使用频次</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="usage_method=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">付费类型</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="pay_type=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品单价</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="drug_unit_price=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品小计</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="drug_free=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品数量</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="drug_count=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品类型</label> ' +
        '<div class="layui-input-inline"> ' +
        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input"  onchange="drug_type=this.value"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="layui-inline"> ' +
        '<label class="layui-form-label">药品等级</label> ' +
        '<div class="layui-input-inline"> ' +
        '<select id="open_select" name="interest" lay-filter="aihao"  onchange="drug_class=this.value"> ' +
        '<option value=""></option>' +
        '<option value="0">非医保</option> ' +
        '<option value="1">医保</option> ' +
        '</select> ' +
        '</div> ' +
        '</div> ' +
        '</div>',
        btn1:function (obj,n) {
            if(drug_name!==''
                &&drug_name!==undefined){
                for(var i=0;i<app.msg.medicine.length;i++){
                    if(app.msg.medicine[i].drug_class=='非医保'){
                        app.msg.medicine[i].drug_class='0'
                    }else if(app.msg.medicine[i].drug_class=='医保'){
                        app.msg.medicine[i].drug_class='1'
                    }
                }
                var obj=new Object()
                obj['drug_name']=drug_name;
                obj['drug_regulation']=drug_regulation;
                obj['drug_dosage']=drug_dosage;
                obj['mode_of_use']=mode_of_use;
                obj['mode_of_use_dosage']=mode_of_use_dosage;
                obj['usage_method']=usage_method;
                obj['pay_type']=pay_type;
                obj['drug_unit_price']=drug_unit_price;
                obj['drug_free']=drug_free;
                obj['drug_count']=drug_count;
                obj['drug_type']=drug_type;
                obj['drug_class']=drug_class;
                obj['drug_id']='';
                app.msg.medicine.push(obj);
                modify_data();
                return;
            }
            layer.msg('请填入完整信息')
        }
    })
}