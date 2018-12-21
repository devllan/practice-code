try
{
    //关闭loading层
    parent.closeALL_layer();
}
catch(err)
{
    console.log(err);
}
var app=new Vue({
    el: '#supp'
    ,data:{
        list:[],
        show: false,
        business_id: null,
        ssss:1111
    }
    ,mounted(){
        var _this=this;
        var url='/api/ocr/validation/supporting/?user_code='+localStorage.user_code;
        this.$http.post(url).then(function (res) {
            _this.list=res.data.successResult;
            console.log(_this.list)
        },function (err) {
            console.log(err);
        })
    }
    ,methods:{
        imgClick:function (data) {
            var _this=this;
            _this.show=true;
            setTimeout(function () {
                document.getElementById('demo2').innerHTML=''
            },0);
            _this.business_id=data.business_id;
        }
    }
})
let sss;
let upData=new Object();
upData['type']='100005';
upData['user_code']=localStorage.user_code;
layui.use('upload', function(){
    var upload_Url='/api/ocr/validation/async_analysis/';

    var $ = layui.jquery
        ,upload = layui.upload;
    sss=upload
    //多图片上传
    upload.render({
        elem: '#test2'
        ,url: upload_Url
        ,auto:false
        ,data:upData
        ,multiple: true
        ,accept:'img'
        ,bindAction: '#test9'
        ,field:'im_id'
        ,choose: function (obj) {
            var str;
            obj.preview(function(index, file, result){
                upData['business_id']=app.$data.business_id
                if ((file.size/1024)/1024<1){
                    str='文件大小：'+parseInt(file.size/1024)+'KB';
                } else{
                    str='文件大小：'+((file.size/1024)/1024).toFixed(2)+'M';
                }
                var img='<div class="imgBox">' +
                    '<img style="width:100px;height:100px;" src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">' +
                    '<p>'+'文件名称：'+file.name+'</p>' +
                    '<p>'+str+'</p>' +
                    '</div>'
                $('#demo2').append(img)
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
    });

});