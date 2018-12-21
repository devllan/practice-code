
var dir=0,der=1;
var app=new Vue({
    el:'#app'
    ,data:{
        inData:{
            medical_report:[]//影像报告，出入院报告
            ,medical_record_home:[]//病案首页
            ,cost_listing:[]//费用清单
            ,invoice:[]//发票
            ,laboratory:[]//化验单
            ,pres:[]//处方单
            ,other:[]//未知
        }
        ,RenderingData:{
            exihibitpic:''
        }//最终渲染数据
        ,documentTypeList:{
            medical_report:false//影像报告，出入院报告
            ,medical_record_home:false//病案首页
            ,cost_listing:false//费用清单
            ,invoice:false//发票
            ,laboratory:false//化验单
            ,pres:false//处方单
            ,other:false//未知
        }
        ,Flag:[]
        // ,srceach_details:null
        ,elect:null
        ,cos_list_he:{
            a1:''
            ,a2:''
            ,a3:''
            ,a4:''
            ,a5:''
            ,a6:''
            ,a7:''
            ,a8:''
            ,a9:''
            ,a10:''
            ,a11:''
            ,a12:''
            ,a13:''
            ,rodi:''
        }
    }
    ,created:function () {
        console.log('created');
        var _this=this;
        // var srceach_details=JSON.parse(localStorage.cliInfo);
        // this.srceach_details=srceach_details;
        var url='./json.json';
        // console.log(srceach_details.business_id);
        console.log(localStorage.user_code);
        // var url='/api/ocr/validation/the_case_all/?business_id='+srceach_details.business_id+'&user_code='+localStorage.user_code;
        this.$http.get(url).then(function (data) {
            console.log(data);
            var DataMsg=data.data.data;
            for(i in DataMsg){
                if(DataMsg[i].length===0){
                    continue
                }
                _this.documentTypeList[i]=true;
                _this.RenderingData=DataMsg[i][0];
                setTimeout(function () {
                    console.log(document.getElementsByClassName(i)[0].className=i+' '+'layui-this');
                },0);
                switch (i){
                    case 'invoice':
                        _this.flagCutting(_this.RenderingData.flag);
                        break;
                    case 'cost_listing':
                        for (var i=0;i<_this.RenderingData.cos_project_list.length;i++){
                            _this.Flag.push(_this.RenderingData.cos_project_list[i].project_check_str.split('')[6]);
                        }
                        break;
                }
                break;
            }
            if(data.data.ret_cd != 200){
                alert('请求出错，代码：'+data.data.ret_cd);
                return;
            }
            _this.inData=data.data.data;
            console.log(_this.inData)
        },function (err) {
            console.log(err);
        })
    }
    ,mounted:function (){
        console.log('mounted');
    }
    ,methods: {
        agianUpload:function (ele) {
            let that=this;
            if(that.elect){
                layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                let url='/api/ocr/validation/other_request/';
                let data={
                    image_name: that.RenderingData.image_url
                    ,type:  that.elect
                    ,uuid:  that.RenderingData.uuid
                    ,username:  that.RenderingData.username
                    ,business_id:  that.RenderingData.business_id
                };
                that.$http.get(url,data).then(function (data) {
                    console.log('成功');
                    let idName=['cost_listing','invoice','laboratory','medical_record_home','medical_report','pres','other']
                    that.inData.other.map(function (p1,p2) {
                        if(p1.image_url==that.RenderingData.image_url){
                            that.inData.other.splice(p2,1);
                            if(that.inData.other.length>0){
                                that.RenderingData=that.inData.other[0];
                            }else {
                                that.documentTypeList.other=false;
                                for (let i=0;i<idName.length;i++){
                                    let dom=document.getElementById(idName[i]);
                                    if(dom){
                                        dom.click();
                                        break;
                                    }
                                }
                            }
                        }
                    });
                    layer.closeAll();
                    layer.alert('重传成功', {
                        skin: 'layui-layer-lan' //样式类名
                        ,closeBtn: 0
                    });

                },function (err) {
                    console.log('失败');
                    layer.closeAll();
                    layer.alert('重传失败', {
                        skin: 'layui-layer-lan' //样式类名
                        ,closeBtn: 0
                    });
                })
            }
        },
        textClick:function(e){
            console.log(e.top);
            var domStyle=document.getElementById('Tips').style;
            domStyle.top=e.top+'%';
            domStyle.left=e.left+'%';
            domStyle.width=e.width+'%';
            domStyle.height=e.height+'%';
        },
        /*
         * 关于费用清单的增删改
         * */
        cos_operation: function (type,cos) {
            let that=this;
            let pathUrl='user='+localStorage.user_code+'&image_name='+that.RenderingData.image_name+'&case_id='+JSON.parse(localStorage.cliInfo).case_id+'&type=1006';
            if(type === 'del'){
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                let obj={
                    preject_id:cos.preject_id
                }
                var data=that.RenderingData;
                data['cos_project']=[];
                data['cos_project'].push(obj);
                that.operation(data,pathUrl)
            }else if(type === 'edit'){
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                let rendData=that.RenderingData
                rendData.type_list=[]
                that.operation(rendData,pathUrl)
            }else if('new'){
                layer.open({
                    type: 1,
                    btn:['确定','取消']
                    ,content: '<div class="layui-form" style="padding-right:30px;">' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">名称</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a1\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">单价</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a2\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">数量</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a3\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">金额</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a4\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">规格</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a5\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div style="padding-left:65px;">' +
                    '<div style="float: left">类别</div>' +
                    '<div style="float: left;padding-left:20px ">' +
                    '<span class="radio_box"> ' +
                    '甲<input  onchange="chenges(\'rodi\',this.value)" value="甲" type="radio" id="radio_1" name="radio"> ' +
                    '<label for="radio_1"></label> ' +
                    '<em>甲</em> ' +
                    '</span> <br><br>' +
                    '<span class="radio_box"> ' +
                    '乙<input  onchange="chenges(\'rodi\',this.value)" value="乙" type="radio" id="radio_2" name="radio"> ' +
                    '<label for="radio_2"></label> ' +
                    '<em>乙</em> ' +
                    '</span> <br><br>' +
                    '<span class="radio_box"> ' +
                    '丙<input onchange="chenges(\'rodi\',this.value)" value="丙" type="radio" id="radio_3" name="radio"> ' +
                    '<label for="radio_3"></label> ' +
                    '<em>丙</em> ' +
                    '</span> ' +
                    '</div>' +
                    '</div>' +
                    '</div>' //这里content是一个普通的String
                    ,btn1:function () {
                        let list=that.cos_list_he;
                        if(!(list.a1=='')){
                            let data=that.RenderingData
                            data['medicine']=[{
                                project_name:list.a1
                                ,project_unit_price:list.a2
                                ,project_count:list.a3
                                ,project_total:list.a4
                                ,project_regulation:list.a5
                                ,project_class:list.rodi
                                ,parent_project_name: '9'
                                ,drug_id:''
                            }];
                            that.operation(data,pathUrl);
                        }else {
                            layer.msg('请输入名称');
                        }
                    }
                });
            }
        },
        /*
         * 关于发票的增删改
         * */
        inv_operation: function (type,cos,typ) {
            let that=this;
            let pathUrl='user='+localStorage.user_code+'&image_name='+that.RenderingData.image_name+'&case_id='+JSON.parse(localStorage.cliInfo).case_id+'&type=1000';
            if(type === 'del'){
                let data;
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                data=that.RenderingData;
                if(typ=='药品'){
                    data['medical_arr']=[];
                    data.medical_arr.push(cos.medical_id);

                }else {
                    data['cost_arr']=[];
                    data.cost_arr.push(cos.cost_id);

                }
                that.operation(data,pathUrl)
            }else if(type === 'edit'){
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                let rendData=that.RenderingData;
                that.operation(rendData,pathUrl)
            }else if('new'){
                if (cos=='费用'){

                    layer.open({
                        type: 1,
                        btn:['确定','取消']
                        ,content: '<div class="layui-form" style="padding-right:30px;">' +
                        '<div class="layui-form-item"> ' +
                        '<label class="layui-form-label">项目名称</label>' +
                        ' <div class="layui-input-block">' +
                        ' <input onchange="chenges(\'a1\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                        ' </div> ' +
                        '</div>' +
                        '<div class="layui-form-item"> ' +
                        '<label class="layui-form-label">金额</label>' +
                        ' <div class="layui-input-block">' +
                        ' <input onchange="chenges(\'a2\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                        ' </div> ' +
                        '</div></div>'
                        ,btn1:function () {
                            let list=that.cos_list_he;
                            if(!(list.a1=='')){
                                let data=that.RenderingData
                                data['cost']=[{
                                    medical_name:list.a1
                                    ,medical_count:list.a2
                                    ,medical_specifications:list.a3
                                    ,medical_price:list.a4
                                    ,medical_class:list.a5
                                    ,medical_unit:list.a6
                                }];
                                that.operation(data,pathUrl);
                            }else {
                                layer.msg('请输入名称');
                            }
                        }
                    });
                    return
                }
                layer.open({
                    type: 1,
                    btn:['确定','取消']
                    ,content: '<div class="layui-form" style="padding-right:30px;">' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品名称</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a1\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品数量</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a2\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品规格</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a3\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品价格</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a4\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品等级</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a5\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>'+
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品单位</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a5\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div></div>'
                    ,btn1:function () {
                        let list=that.cos_list_he;
                        if(!(list.a1=='')){
                            let data=that.RenderingData
                            data['medical']=[{
                                project_name:list.a1
                                ,project_unit_price:list.a2
                                ,project_count:list.a3
                                ,project_total:list.a4
                                ,project_regulation:list.a5
                                ,project_class:list.rodi
                                ,drug_id:''
                            }];
                            that.operation(data,pathUrl);
                        }else {
                            layer.msg('请输入名称');
                        }
                    }
                });
            }
        },
        /*
         * 关于处方单
         * 的增删改
         * */
        pres_operation: function (type,cos,typ) {
            let that=this;
            let pathUrl='user='+localStorage.user_code+'&image_name='+that.RenderingData.image_name+'&case_id='+JSON.parse(localStorage.cliInfo).case_id+'&type=1001';
            if(type === 'del'){
                let data;
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                data=that.RenderingData;
                data['medical_arr']=[];
                data.medical_arr.push(cos.drug_id);
                console.log(data);
                that.operation(data,pathUrl)
            }else if(type === 'edit'){
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                let rendData=that.RenderingData;
                that.operation(rendData,pathUrl)
            }else if('new'){
                layer.open({
                    type: 1,
                    btn:['确定','取消']
                    ,content: '<div class="layui-form" style="padding-right:30px;">' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品名称</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a1\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品品规</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a2\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品剂型</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a3\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">使用方式</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a4\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">使用剂量</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a5\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>'+
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">使用频次</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a6\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +'<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">付费类型</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a7\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品单价</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a8\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品小计</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a9\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品数量</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a10\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">药品类型</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a11\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>'+
                    '<div style="padding-left:65px;">' +
                    '<div style="float: left">药品等级</div>' +
                    '<div style="float: left;padding-left:20px ">' +
                    '<span class="radio_box"> ' +
                    '<input  onchange="chenges(\'rodi\',this.value)" value="医保" type="radio" id="radio_1" name="radio"> ' +
                    '<label for="radio_1"></label> ' +
                    '<em style="padding-left:40px;">医保</em> ' +
                    '</span> <br><br>' +
                    '<span class="radio_box"> ' +
                    '<input  onchange="chenges(\'rodi\',this.value)" value="非医保" type="radio" id="radio_2" name="radio"> ' +
                    '<label for="radio_2"></label> ' +
                    '<em style="padding-left:40px;">非医保</em> ' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    ,btn1:function () {
                        let list=that.cos_list_he;
                        if(!(list.a1=='')){
                            let data=that.RenderingData;
                            data['medical']=[{
                                drug_name:list.a1
                                ,drug_regulation:list.a2
                                ,drug_dosage:list.a3
                                ,mode_of_use:list.a4
                                ,mode_of_use_dosage:list.a5
                                ,usage_method:list.a6
                                ,pay_type:list.a7
                                ,drug_unit_price:list.a8
                                ,drug_free:list.a9
                                ,drug_count:list.a10
                                ,drug_class:list.a11
                                ,drug_type:list.rodi
                                ,drug_id:''
                            }];
                            that.operation(data,pathUrl);
                        }else {
                            layer.msg('请输入名称');
                        }
                    }
                });
            }
        },
        /*
         * 关于影像报告，出入院报告
         * 的增删改
         * */
        med_operation: function (type,cos,typ) {
            let that=this;
            console.log('user='+localStorage.user_code+'&image_name='+that.RenderingData.image_name+'&case_id='+JSON.parse(localStorage.cliInfo).case_id+'&type=1004')
            let pathUrl='user='+localStorage.user_code+'&image_name='+that.RenderingData.image_name+'&case_id='+JSON.parse(localStorage.cliInfo).case_id+'&type=1004';
            if(type === 'del'){
                let data;
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                data=that.RenderingData;
                data['medicals_list']=[];
                data.medical_arr.push(cos.drug_id);
                that.operation(data,pathUrl)
            }else if(type === 'edit'){
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                that.operation(that.RenderingData,pathUrl,'影像报告')
            }else if('new'){
                layer.open({
                    type: 1,
                    btn:['确定','取消']
                    ,content: '<div class="layui-form" style="padding-right:30px;">' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">检验信息名称</label>' +
                    ' <div class="layui-input-block">' +
                    ' <input onchange="chenges(\'a1\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">' +
                    ' </div> ' +
                    '</div>' +
                    '<div class="layui-form-item"> ' +
                    '<label class="layui-form-label">检验信息内容</label>' +
                    ' <div class="layui-input-block">' +
                    ' <textarea style="height:200px;" onchange="chenges(\'a2\',this.value)" type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"></textarea>' +
                    ' </div> ' +
                    '</div>' +
                    '</div>'
                    ,btn1:function () {
                        let list=that.cos_list_he;
                        if(!(list.a1=='')){
                            let data=that.RenderingData;
                            let obj={
                                key:list.a1
                                ,value:list.a2
                                ,id:''
                            }
                            data['medicals_data'].push(obj)
                            that.operation(data,pathUrl);
                        }else {
                            layer.msg('请输入名称');
                        }
                    }
                });
            }
        },
        /*
         * 关于病案首页
         * 的增删改
         * */
        rec_operation: function (type,cos,typ) {
            let that=this;
            let pathUrl='user='+localStorage.user_code+'&image_name='+that.RenderingData.image_name+'&case_id='+JSON.parse(localStorage.cliInfo).case_id+'&type=1005';
            if(type === 'del'){

            }else if(type === 'edit'){
                layer.load(1, {
                    shade: [0.1,'#000']
                });
                let rendData=that.RenderingData;
                that.operation(rendData,pathUrl)
            }else if('new'){

            }
        }
        /*
         * 各类单证增删改的提交
         * */
        ,operation:function (data,pathUrl,type) {
            console.log(pathUrl)
            let url='/api/ocr/validation/updata_data/?'+pathUrl,that=this;
            this.$http.post(url,JSON.stringify(data)).then(function (res) {
                layer.closeAll();
                console.log(res.data)
                if(res.data.ret_cd == 200){
                    if(type=='影像报告'){
                        that.RenderingData=res.data.successResult.indicators[0];
                        that.RenderingData['medicals_data']=res.data.successResult.medicals_data
                        console.log(that.RenderingData)
                    }else{
                        that.RenderingData=res.data.successResult[0]
                    }
                    setTimeout(() => {
                        layer.msg('成功');
                    }, 0);
                    return false;
                }
                layer.msg('失败,'+res.data.errorMsg);
            },function (err) {
                layer.closeAll();
                layer.msg('失败');
            })
        }
        ,flagCutting:function (flag) {
            this.Flag=flag.split('');
            return true
        }
        // 旋转效果
        ,direction:function (data) {
            var ImaGes=document.getElementsByClassName('imgButBox')[0];
            console.log(ImaGes);
            var wid=ImaGes.offsetHeight;
            var hei=ImaGes.offsetWidth;
            if(data){
                dir-=90;
                ImaGes.style.transition='ease .5s';
                if(!((dir / 90)%2===0)){
                    ImaGes.style.width='100%';
                }
                ImaGes.style.transform='rotate('+dir+'deg) scale('+der+')';
            }else{
                dir+=90;
                ImaGes.style.transition='ease .5s';
                if(!((dir / 90)%2===0)){
                    ImaGes.style.width='100%';
                }
                ImaGes.style.transform='rotate('+dir+'deg) scale('+der+')';
            }
        },
        navClick:function (str) {
            if(str==1){
                layer.closeAll()
                return false
            }
            var index = layer.load(2, {
                shade: [0.4,'#000'] //0.1透明度的白色背景
            });
            var _this=this;
            for(var i in _this.documentTypeList){
                _this.documentTypeList[i]=false
            }
            _this.documentTypeList[str]=true;
            _this.RenderingData=_this.inData[str][0];
            Hei()

        }
        //点击列表
        ,ListClick:function (Type,data) {
            var _this=this;
            for(var i in _this.documentTypeList){
                _this.documentTypeList[i]=false
            }
            _this.documentTypeList[Type]=true;
            _this.RenderingData=data;
            console.log(data);
            if (Type==='invoice'){
                _this.flagCutting(data.flag);
            }
        }
        // 放大效果
        ,enlarge:function (data) {
            var ImaGes=document.getElementsByClassName('imgButBox')[0];
            if(data){
                der+=0.3;
                if(der>3){der=3}
                ImaGes.style.transition='ease .5s';
                ImaGes.style.transform='rotate('+dir+'deg) scale('+der+')';
            }else{
                der-=0.3;
                if(der<0.3){der=0.3}
                ImaGes.style.transition='ease .5s';
                ImaGes.style.transform='rotate('+dir+'deg) scale('+der+')';
            }
        }
        //鼠标 滑过 按钮组 效果
        ,suspensionTitle_block:function (e,bur,data,s) {
            var dom=document.getElementById('suspensionTitle');
            if(e==='mot'){
                dom.style.display='block';
                if(bur===false){
                    dom.style.display='none';
                }
            }
            if(data===undefined){
                return
            }
            if(!bur){
                dom.style.display='none';
            }
            dom.firstElementChild.innerText='姓名：'+data+',医院：'+s;
            dom.style.left=e.clientX+'px';
            dom.style.top=e.clientY+'px';
            dom.style.display='block';
        }
        //删除
        ,dataDel:function (data) {
            console.log(data);
        }
    }
});

function chenges(key,value) {
    app.cos_list_he[key]=value;
}
//拖拽效果
function mos(event) {
    var movDom=document.getElementsByClassName('imgButBox')[0]
        ,_thisDom=event.path[0];
    var disL=movDom.offsetLeft,disT=movDom.offsetTop,X=event.clientX,Y=event.clientY;
    movDom.style.transition='';
    document.onmousemove = function (eve) {
        movDom.style.left=disL+eve.clientX-X+'px';
        movDom.style.top=disT+eve.clientY-Y+'px';
    };
    document.onmouseup = function (eve) {
        document.onmousemove = function (eve) {
            return false;
        };
    };
}
//不可删除 删除后 面包屑依赖于该事件
layui.use('element', function(){
    var $ = layui.jquery
        ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    //触发事件
    var active = {
        tabAdd: function(e){
            console.log(e)
        }
    };
});
function Hei() {
    let el;
    setTimeout(function () {
        el=document.getElementsByTagName('textarea');
        for (let i=0;i<el.length;i++){
            autoTextarea(el[i])
        }
    },100)
}
window.onload=function () {
    Hei()
}