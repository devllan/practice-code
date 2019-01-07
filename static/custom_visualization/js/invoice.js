var url = './zuobiao2.json';
// var srceach_details=JSON.parse(localStorage.srceach_details)  
// var url='/api/ocr/validation/the_case_all/?business_id='+srceach_details.business_id+'&user_code='+localStorage.user_code;
var dir = 0,
    der = 1;
var app = new Vue({
    el: '#app',
    data: {
        inData: {},
        RenderingData: {
            exihibitpic: ''
        } //最终渲染数据
        ,
        documentTypeList: {
            medical_report: false //影像报告，出入院报告
                ,
            medical_record_home: false //病案首页
                ,
            cost_listing: false //费用清单
                ,
            invoice: false //发票
                ,
            laboratory: false //化验单
                ,
            pres: false //处方单
                ,
            other: false //未知
        },
        Flag: []
    },
    created: function () {
        console.log('created');
        var _this = this;
        // var srceach_details=JSON.parse(localStorage.srceach_details)  
        // var url='/api/ocr/validation/the_case_all/?business_id='+srceach_details.business_id+'&user_code='+localStorage.user_code;
        this.$http.get(url).then(function (data) {
            var DataMsg = data.data.data;
            for (i in DataMsg) {
                if (DataMsg[i].length === 0) {
                    continue
                }
                _this.documentTypeList[i] = true;
                _this.RenderingData = DataMsg[i][0];
                switch (i) {
                    case 'invoice':
                        _this.flagCutting(_this.RenderingData.flag);
                        break;
                    case 'cost_listing':
                        for (var i = 0; i < _this.RenderingData.cos_project_list.length; i++) {
                            _this.Flag.push(_this.RenderingData.cos_project_list[i].project_check_str.split('')[6]);
                        }
                        break;
                }
                break;
            }
            if (data.data.ret_cd !== 200) {
                alert('请求出错，代码：' + data.data.ret_cd)
                return;
            }
            _this.inData = data.data.data;
        }, function (err) {
            console.log(err);
        })
    },
    mounted: function () {
        console.log('mounted');
    },
    methods: {
        init: function () {},
        flagCutting: function (flag) {
            this.Flag = flag.split('');
            return true
        },
        // 旋转效果

        direction: function (data) {
                var ImaGes = document.getElementsByClassName('imgButBox')[0];
                console.log(ImaGes);
                var wid = ImaGes.offsetHeight;
                var hei = ImaGes.offsetWidth;
                if (data) {
                    dir -= 90;
                    ImaGes.style.transition = 'ease .5s';
                    if (!((dir / 90) % 2 === 0)) {
                        ImaGes.style.width = '100%';
                    }
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                } else {
                    dir += 90;
                    ImaGes.style.transition = 'ease .5s';
                    if (!((dir / 90) % 2 === 0)) {
                        ImaGes.style.width = '100%';
                    }
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                }
            }
            //点击列表
            ,
        ListClick: function (Type, data) {
                var _this = this;
                for (var i in _this.documentTypeList) {
                    _this.documentTypeList[i] = false
                }
                _this.documentTypeList[Type] = true;
                _this.RenderingData = data;
                console.log(data);
                if (Type === 'invoice') {
                    _this.flagCutting(data.flag);
                }
            }
            // 放大效果
            ,
        enlarge: function (data) {
                var ImaGes = document.getElementsByClassName('imgButBox')[0];
                if (data) {
                    der += 0.3;
                    if (der > 3) {
                        der = 3
                    }
                    ImaGes.style.transition = 'ease .5s';
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                } else {
                    der -= 0.3;
                    if (der < 0.3) {
                        der = 0.3
                    }
                    ImaGes.style.transition = 'ease .5s';
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                }
            }
            //鼠标 滑过 按钮组 效果
            ,
        suspensionTitle_block: function (e, bur, data, s) {
                var dom = document.getElementById('suspensionTitle');
                if (e === 'mot') {
                    dom.style.display = 'block';
                    if (bur === false) {
                        dom.style.display = 'none';
                    }
                }
                if (data === undefined) {
                    return
                }
                if (!bur) {
                    dom.style.display = 'none';
                }
                dom.firstElementChild.innerText = '姓名：' + data + ',医院：' + s;
                dom.style.left = e.clientX + 'px';
                dom.style.top = e.clientY + 'px';
                dom.style.display = 'block';
            }
            //删除
            ,
        dataDel: function (data) {
            console.log(data);
        }
    }
});
app.init();
//拖拽效果
function mos(event) {
    var movDom = document.getElementsByClassName('imgButBox')[0],
        _thisDom = event.path[0];
    var disL = movDom.offsetLeft,
        disT = movDom.offsetTop,
        X = event.clientX,
        Y = event.clientY;
    movDom.style.transition = '';
    document.onmousemove = function (eve) {
        movDom.style.left = disL + eve.clientX - X + 'px';
        movDom.style.top = disT + eve.clientY - Y + 'px';
    };
    document.onmouseup = function (eve) {
        document.onmousemove = function (eve) {
            return false;
        };
    };
    console.log(movDom.style.left)
}

