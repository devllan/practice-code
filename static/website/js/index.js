/**
 * Created by Administrator on 2018/5/16.
 */
window.onload=function () {
    $('#moti').click(function (e) {
        var thenEve;
        try {
            thenEve=event.target;
        }catch (err){
            thenEve=e.currentTarget;
        }
        if(thenEve===this){
            $('#moti').slideUp(200);
        }
    });
};
var ExpFun=function () {
    this.data={
        name:'',//姓名
        tel_no:'',//电话
        e_ml:'',//邮箱
        position:'',//职位
        the_company:'',//公司
        company_scale:'',//规模
        countries:'中华人民共和国',//国家
        post_os:1,//新闻信息
        contact:1//联系
    };
};
ExpFun.prototype.Sub=function () {
    var _this=this;
    var num_height=$('#from_content_box')[0].offsetHeight;
    for(ja in _this.data){
        if(_this.data[ja]===''){
            switch (ja){
                case 'name':
                    _this.ExAlert('请输入姓名');
                    return;
                case 'e_ml':
                    _this.ExAlert('请输入邮箱');
                    return;
                case 'tel_no':
                    _this.ExAlert('请输入手机号码');
                    return;
                case 'the_company':
                    _this.ExAlert('请输入公司名称');
                    return;
                case 'company_scale':
                    _this.ExAlert('请选择公司规模');
                    return;
                case 'countries':
                    _this.ExAlert('请选择国家');
                    return;
                case 'position':
                    _this.ExAlert('请选择职位');
                    return;
            }
        }else if(ja=='e_ml'){
            var rg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!rg.test(_this.data[ja])){
                _this.ExAlert('请输入正确邮箱地址');
                return;
            }
        }
    }
    $('.from_content_box')[0].style.height=num_height+'px';
    $('.from_content_box')[0].style.padding=''+num_height/2.7+'px 20px';
    $('.from_content_box>h4')[0].innerText='正在提交，请稍后...';
    $('.from_content_box')[0].style.display='block';
    $('#from_content_box')[0].style.display='none';
    $.ajax({
        url:'/index/ad/',
        data:JSON.stringify(_this.data),
        type:'POST',
        success:function (data){
            $('.from_content_box>h4')[0].innerText='试用申请已提交，我们会尽快安排工作人员与您联系！';
            $('.from_content_box>p')[0].innerText='本窗口3秒后将自动关闭';
            setTimeout(function () {
                $('#moti').slideUp(200);
                setTimeout(function () {
                    $('.from_content_box')[0].style.display='none';
                    $('#from_content_box')[0].style.display='block';
                    $('.from_content_box>p')[0].innerText='';
                },300)
            },3000);
        }
    })
};
ExpFun.prototype.ExAlert=function (str) {
    var setIimes=null;
    $('#alert_ii').slideUp(10);
    clearTimeout(setIimes);
    $('#alert_ii_text')[0].innerText=str+'！';
    $('#alert_ii').slideDown(200);
    setIimes=setTimeout(function () {
        $('#alert_ii').slideUp(200);
    },3000)
};
ExpFun.prototype.ExpS=function (str,val) {
    var _this=this;
    switch (str){
        case 'name':
            _this.data.name=val;
            break;
        case 'e_ml':
            _this.data.e_ml=val;
            break;
        case 'tel_no':
            _this.data.tel_no=val;
            break;
        case 'the_company':
            _this.data.the_company=val;
            break;
        case 'company_scale':
            _this.data.company_scale=val;
            break;
        case 'countries':
            _this.data.countries=val;
            break;
        case 'position':
            _this.data.position=val;
            break;
    }
    if(str=='e_ml'){
        var rg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!rg.test(val)){
            _this.ExAlert('请输入正确邮箱地址');
        }
    }
    $('#xing_' + str)[0].innerText='';
//          $('#inp_' + str)[0].style.marginRight='21px'
    console.log($('#inp_' + str)[0].className='add_padding_right');
};
var expS=new ExpFun();
submit_shiyong=function () {
    if($('#moti')[0].style.display==='none'||$('#moti')[0].style.display===''){
        $('#moti').slideDown(300);
    }else{
        $('#moti').slideUp(300);
    }
}

window.onload=function () {
    var bfb=56.481481481481474;
    var ife = document.getElementById('swf_id');
    var hei=ife.offsetWidth/100*bfb;
    ife.height=hei;
    ife.style.marginTop='15%'
}