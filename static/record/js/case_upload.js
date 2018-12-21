 var fun1,type_id_txt
    ,purpose=new purpose()
    ,type_id=purpose.GetQueryString('type')
    ,data_list_obj=new Object()
    ,_this=null;
var Suffix='';
var files_type='img';
var upload_Url='/api/ocr/validation/async_analysis/';
var files;
try
{
    //关闭loading层
    parent.closeALL_layer();
}
catch(err)
{
    console.log(err);
}
/*
* layer上传方法
* */
let upData=new Object();
 upData['type']=100006;
 upData['user_code']=localStorage.user_code;
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test8'
        ,url: upload_Url
        ,auto:false
        ,accept:'file'
        ,exts:'ZIP'
        ,data:upData
        ,bindAction: '#test9'
        ,field:'im_id'
        ,choose: function (obj) {
            var str;
            obj.preview(function(index, file, result){
                if ((file.size/1024)/1024<1){
                    str='文件大小：'+parseInt(file.size/1024)+'KB'
                } else{
                    str='文件大小：'+((file.size/1024)/1024).toFixed(2)+'M'
                }
                $('#demo1').attr('src', '/static/record/img/zip.png'); //图片链接（base64）
                // $('#demo1').attr('src', result); //图片链接（base64）
                document.getElementById('demoText').innerText='文件名称：'+file.name;
                document.getElementById('demoSize').innerText=str;
                upData['business_id']=file.name.split('.')[0];
            });
        }
        ,before: function(obj){
            var index = layer.load(1, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.ret_cd === 200){
                setTimeout(function () {
                    location.reload()
                },1000)
                return layer.msg('上传成功');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });



});
