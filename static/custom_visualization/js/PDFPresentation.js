var doc = new jsPDF('p','px','a4');

/*
 * 利用VUR渲染界面
 * */
var app=new Vue({
    el:'#app',
    data:{
        pdf_width:447,
        msg:null,
        num:2,
        img_onload_number:0,
        str_s:null,
        boxNumbers:0
    },
    methods:{
        /*
         * 获取数据处理数据
         * */
        init:function () {
            _this=this;
            var url='/api/ocr/validation/pdf_all/';
            var obj=new Object();
            obj['case_id']=localStorage.case_id;
            obj['user_code']=localStorage.user_code;
            var data=JSON.stringify(obj);
            this.$http.post(url,data).then(function (data) {
                $('.loading_mote_text').text('正在初始化图像数据');
                this.msg=data.data;
            },function (err) {
            });
        },
        /*
         * 图像全部加载完成后 触发 相当于入口程序
         * */
        img_onload:function () {
            this.img_onload_number++;
            if (this.img_onload_number === this.msg.data.pres_data.length) {
                $('.loading_mote_text').text('正在初始化PDF');
                _this.addBox();
            }
        },
        addBox:function () {
            var _this=this;
            // 获取所有需要渲染的 DOM
            var title_boxs = $('.title_boxs');
            var positions=$('#positions')[0];
            var position_PDF=document.getElementById('position_PDF');
            if(_this.boxNumbers<title_boxs.length){
                if(title_boxs[_this.boxNumbers].offsetHeight+positions.offsetHeight<1600){
                    var nodes = title_boxs[_this.boxNumbers].cloneNode(true);
                    if(_this.boxNumbers === title_boxs.length-1){
                        doc.addHTML(positions,function () {
                            for(var i=0;i<position_PDF.children.length;){
                                position_PDF.removeChild(position_PDF.firstChild);
                            }
                            $('#loading_mote').hide();
                            _this.addBox();
                        })
                    }
                    nodes.classList.remove('title_boxs');
                    position_PDF.appendChild(nodes);
                    _this.boxNumbers+=1;
                    _this.addBox()
                }else{
                    doc.addHTML(positions,function () {
                        for(var i=0;i<position_PDF.children.length;){
                            position_PDF.removeChild(position_PDF.firstChild);
                        }
                        doc.addPage();
                        _this.addBox();
                    })
                }
            }
        }
    }
});
app.init();
/*
 * 延迟启用 PDF下载模块
 * */
function fors_img_PDF() {
    $('.loading_mote_text').text('正在下载PDF');
    $('#loading_mote').show();
    setTimeout(function () {
        print_PDF();
    }, 500)
}
/*
 * 下载PDF
 */
function print_PDF() {
    // 下载PDF
    doc.save('分析报告.pdf');
    $('#loading_mote').hide();
}
