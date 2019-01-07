//取后台坐标信息，实现随动展示框         //化验单的
window.onload = function () {
    $.ajax({
        url: url,
        type: "get",
        data: "",
        dataType: "json",
        //请求成功时的回调函数，info为后端返回的数据
        success: function (info) {
            let ShowInput = document.getElementsByClassName("show");
            var coordinate = info;
            var coordinate_data = coordinate.data.laboratory;
            var Top_arr = [];
            var Width_arr = [];
            var Left_arr = [];
            var Height_arr = [];
            //取源图像的大小值
            var
                YWidth = document.getElementById('ImaGes').naturalWidth,
                YHeight = document.getElementById('ImaGes').naturalHeight,
                ImaGes = document.getElementById("ImaGes");
                console.log(YWidth)
                console.log(YHeight)
            //页面内展示图像的div大小
            console.log()
            var NHeight =ImaGes.offsetHeight || ImaGes.clientHeight;
            console.log(NWidth)
            var NWidth = ImaGes.clientWidth || ImaGes.offsetWidth;
            console.log(NHeight)
            // 缩放比例   动态比例 根据比例调整展示框大小
            var Wproportion = YWidth / NWidth; //X轴缩放比例
            // console.log(Wproportion);
            var Yproportion = YHeight / NHeight; //Y轴缩放比例
            console.log(Yproportion);
            for (var i = 0; i < coordinate_data.length; i++) {
                var codte_data = coordinate_data[i].index_arr;
                for (let j = 0; j < codte_data.length; j++) {
                    Top_arr.push(codte_data[j].top);
                    Left_arr.push(codte_data[j].left);
                    Width_arr.push(codte_data[j].width);
                    Height_arr.push(codte_data[j].height);
                    //鼠标进入显示展示框
                    ShowInput[j].addEventListener("mouseover", function show() {
                        var Newdiv = document.createElement("div");
                        Newdiv.setAttribute("id", "ShowDiv");
                        Newdiv.style.left = Left_arr[j] / Wproportion + 'px';
                        // Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                        Newdiv.style.width = Width_arr[j] / Wproportion + 'px';
                        Newdiv.style.height = Height_arr[j] / Yproportion + 'px';
                        Newdiv.style.top = Top_arr[j] / Yproportion + 'px';            
                        // console.log((parseInt(Top_arr[j]) - parseInt(Height_arr[j])) / Yproportion);
                        // console.log((parseInt(Top_arr[j])/ Yproportion - parseInt(Height_arr[j])/ Yproportion) );
                        console.log(Height_arr[j])
                        console.log(parseInt(Top_arr[j]))
                        // Newdiv.style.top = (parseInt(Top_arr[j]) - parseInt(Height_arr[j])) / Yproportion + 'px';
                        // Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                        $(".imgButBox").append(Newdiv);
                    });
                    //鼠标离开删除展示框
                    ShowInput[j].addEventListener("mouseleave", function leave() {
                        $("div").remove("#ShowDiv");
                    });
                }
            }
        }
    });
}