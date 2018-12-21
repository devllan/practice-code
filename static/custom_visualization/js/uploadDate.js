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
            if(data.separation_state==='处理中'||data.state==="处理中"){
                return;
            }
//***************************-------------------------------
            if(data.separation_state=="PDF文件"){
                var url='/api/ocr/validation/async_analysis_result/';
                // 上传的 附加参数
                var obj=new Object();
                obj['case_id']=data.case_id;
                obj['image_name']=data.image_name;
                obj['separation_state']='pdf';
                var datas=JSON.stringify(obj);
                var tds='';
                $.ajax({
                    type: "post",
                    url: url,
                    data: datas,
                    async: false,
                    success: function (data) {
                        _this.list_Datas = data.data;
                        localStorage['case_id']=data.case_id;
                        var Prescription_number=0;
                        for (var i = 0; i < _this.list_Datas.length; i++) {
                            switch (_this.list_Datas[i].separation_state) {
                                case 0:
                                    _this.list_Datas[i].separation_state = '处理中';
                                    break;
                                case 1:
                                    _this.list_Datas[i].separation_state = '发票';
                                    break;
                                case 2:
                                    _this.list_Datas[i].separation_state = '处方单';
                                    Prescription_number++;
                                    break;
                                case 4:
                                    _this.list_Datas[i].separation_state = '化验单';
                                    break;
                                case 5:
                                    _this.list_Datas[i].separation_state = '影像检查报告';
                                    break;
                                case 6:
                                    _this.list_Datas[i].separation_state = '出入院记录';
                                    break;
                                case 99:
                                    _this.list_Datas[i].separation_state = '体检报告';
                                    break;
                                case 1005:
                                    _this.list_Datas[i].separation_state = '病案首页';
                                    break;
                                case 1006:
                                    _this.list_Datas[i].separation_state = '费用清单';
                                    break;
                                case 1007:
                                    _this.list_Datas[i].separation_state = '病理报告';
                                    break;
                                case 'pdf':
                                    _this.list_Datas[i].separation_state = 'PDF文件';
                                    break;
                                default:
                                    _this.list_Datas[i].separation_state = '未知';
                                    break;
                            }
                            var str_case_id="'"+_this.list_Datas[i].case_id+"'";
                            var str_image_name="'"+_this.list_Datas[i].image_name+"'";
                            var str_separation_state="'"+_this.list_Datas[i].separation_state+"'";
                            tds += '<tr><td>' + _this.list_Datas[i].separation_state + '</td><td><button class="layui-btn layui-btn-sm" onclick="open_url('+str_case_id+','+str_image_name+','+str_separation_state+')">查看</button></td></tr>'
                        }
                        if(Prescription_number>0){
                            tds += '<tr><td>分析报告</td><td><button class="layui-btn layui-btn-sm" onclick="open_url(\'url\',\'/api/ocr/val_tion_pdf/\')">查看</button></td></tr>'
                        }
                        layer.open({
                            type: 1,
                            skin: 'layui-layer-demo', //样式类名
                            closeBtn: 0, //不显示关闭按钮
                            anim: 2,
                            shadeClose: true, //开启遮罩关闭
                            content: '<div class="layui-form">' +
                            '<table class="layui-table">' +
                            '<colgroup>' +
                            '<col width="150">' +
                            '<col width="150">' +
                            '</colgroup>' +
                            '<thead>' +
                            '<tr>' +
                            '<th>类型</th>' +
                            '<th>操作</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' + tds + '</tbody>' +
                            '</table>' +
                            '</div>'
                        })
                    }
                });
                return;
            }
            localStorage.srceach_details=JSON.stringify(obj.data);
            window.open('/api/ocr/val_tion_invoice/')
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