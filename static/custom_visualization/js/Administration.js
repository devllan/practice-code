// var data=[{username:'harvey',email:'10@10.com',is_permissions:'1'}]
var app=new Vue();
// var url='../Administration.json';
var url='/mob_user/';
var updata_user,user_code=localStorage.user_code;
var name,pass,email,inputValue;
// var checkbox='<div class="layui-form layui-form-item" pane="">' +
//     ' <div class="layui-input-block">' +
//     ' <input type="checkbox" name="like1[write]" lay-skin="primary" title="门诊" checked="">' +
//     ' <input type="checkbox" name="like1[read]" lay-skin="primary" title="住院">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="PDF文件上传">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="发票（北京）">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="处方单">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="化验单">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="病案首页">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="体检报告">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="影像检查报告">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="出、入院记录">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="费用清单（住院）">' +
//     ' <input type="checkbox" name="like1[game]" lay-skin="primary" title="病理报告">' +
//     ' </div> </div>';
layui.use('table', function(){
    var table = layui.table;
    var form = layui.form;
    function init() {
        app.$http.post(url,JSON.stringify({user_code:'shumei'}))
            .then(function (data) {
                try
                {
                    table.render({
                        elem: '#demo'
                        ,cols: [[ //标题栏
                            // {type:'checkbox', fixed: 'left'}
                            {field:'username', title:'用户名', sort: true,edit:true}
                            ,{field:'password', title:'密码',edit:true}
                            ,{field:'email',title:'邮箱',edit:true}
                            // ,{fixed:'',align:'center', title:'权限管理',toolbar:'#AuthorityManagement'}
                            ,{fixed:'right',  align:'center', toolbar: '#barDemo'}
                        ]]
                        // ,data: data.data
                        ,data: data.data.successResult
                        ,skin: 'line' //表格风格
                        ,even: true
                        ,page: true //是否显示分页
                        //,limits: [5, 7, 10]
                        //,limit: 5 //每页默认显示的数量
                    });
                    parent.closeALL_layer();
                }
                catch(err)
                {
                    console.log(err);
                }
            });
    }
    init()
    //监听工具条
    table.on('tool(demo)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('确认删除该条数据？', function(index){
                var objs=new Object();
                objs['user_code']=user_code;
                objs['id']=data.id;
                app.$http.post('/mob_user/del_mob_user/',JSON.stringify(objs)).then(function (data) {
                    if(data.data.ret_cd===500){
                        layer.msg('错误：500');
                        return
                    }if(data.data.ret_cd===104){
                        layer.msg('错误：104');
                        return
                    } if(data.data.ret_cd===200){
                        layer.msg('删除成功');
                        obj.del();
                    }
                },function (err) {
                    console.log(err);
                });
                layer.close(index);
            });
        }if(obj.event === 'updata'){

            var objs=new Object();
            objs['user_code']=user_code;
            objs['id']=obj.data.id;
            obj.data.username===inputValue?'':objs['username']=obj.data.username;
            objs['password']=obj.data.password;
            objs['email']=obj.data.email;
            app.$http.post('/mob_user/update_mob_user/',JSON.stringify(objs)).then(function (data) {
                if(data.data.ret_cd===500){
                    layer.msg('错误：500');
                    return
                }if(data.data.ret_cd===104){
                    layer.msg('错误：104');
                    return
                }
                if(data.data.ret_cd===200){
                    layer.msg('修改成功');
                }
            },function (err) {
                layer.msg('修改失败');
            })
        }
        // if(obj.event === 'edit'){
        //     layer.open({
        //         type: 1,
        //         skin: 'layui-layer-rim', //加上边框
        //         area: ['500px', '300px'], //宽高
        //         content:
        //         ' <div class="layui-form layui-form-item" style="position: relative">' +
        //         '<div style="padding-left:80px;width:200px;position: absolute;left: 0">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="门诊">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="住院">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="PDF文件上传">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="发票（北京）">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="处方单">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="化验单">' +
        //         ' </div>' +
        //         ' <div style="width:220px;position: absolute;left: 50%">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="病案首页">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="体检报告">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="影像检查报告">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="出、入院记录">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="费用清单（住院）">' +
        //         ' <input style="display: block" type="checkbox" lay-skin="primary" title="病理报告">' +
        //         ' </div></div>'
        //     });
        //     form.render()
        // }
    });

    updata_user=function() {

        var index=layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['500px', '270px'], //宽高
            btn:['确认','取消'],
            btn1:function () {
                var re=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(updata_userList.username===''||updata_userList.password===''||updata_userList.email===''){
                    layer.msg('请填入完整数据');
                    return
                }else if(!re.test(updata_userList.email)){
                    layer.msg('邮箱格式错误');
                    return
                }
                updata_userList['user_code']=user_code;
                app.$http.post('/mob_user/add_mob_user/',JSON.stringify(updata_userList)).then(function (data) {
                    if(data.data.ret_cd===102){
                        layer.msg('用户名重复');
                        return
                    }
                    layer.msg('添加成功');
                    init();
                },function (err) {
                    layer.msg('添加失败');
                    console.log(err);
                });
                layer.close(index)
            },
            content:
            ' <div class="layui-form layui-form-item">' +
            '<br><div class="layui-form-item" style="width: 90%;margin:0 auto;"> ' +
            '<label class="layui-form-label"><span style="color: red;">*</span>用户名</label> ' +
            '<div class="layui-input-block"> ' +
            '<input type="text" placeholder="请输入用户名" class="layui-input" onchange="updata_userList.init(\'username\',this.value)">' +
            '</div><br>' +
            ' </div>' +
            '<div class="layui-form-item" style="width: 90%;margin:0 auto;"> ' +
            '<label class="layui-form-label"><span style="color: red;">*</span>密码</label> ' +
            '<div class="layui-input-block"> ' +
            '<input type="text" placeholder="请输入密码" class="layui-input" onchange="updata_userList.init(\'password\',this.value)">' +
            '</div><br>' +
            '</div>' +
            '<div class="layui-form-item" style="width: 90%;margin:0 auto;"> ' +
            '<label class="layui-form-label">邮箱</label> ' +
            '<div class="layui-input-block"> ' +
            '<input type="text" placeholder="请输入邮箱" class="layui-input" onchange="updata_userList.init(\'email\',this.value)">' +
            ' </div>' +
            ' </div>' +
            '</div>'
        });
        form.render()
    }
});
var updata_userList={username:'', password:'', email:''};
updata_userList['init']=function (name,value) {
    this[name]=value
};
function tableClick(eve) {
    if(eve.path[1].nodeName==='TD'){
        inputValue=eve.path[2].firstChild.firstChild.innerText;
    }else if(eve.path[1].nodeName==='TR'){
        inputValue=eve.path[1].firstChild.firstChild.innerText;
    }
}