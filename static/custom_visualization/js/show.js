window.onload = function () {
    // 鼠标随动展示框
    var ShowInput = document.getElementsByClassName("layui-input");
    // function leave() {
    //     $("div").remove("#ShowDiv");
    // }
    // 
    // function show() {
    //     var Newdiv = document.createElement("div");
    //     Newdiv.setAttribute("id", "ShowDiv");
    //     Newdiv.style.left = '100px';
    //     Newdiv.style.top = '100px';
    //     $(".imgButBox").append(Newdiv);
    // }
    //鼠标进入显示展示框
    for (var i = 0; i < ShowInput.length; i++) {
        ShowInput[i].addEventListener("mouseover", function show() {
            var Newdiv = document.createElement("div");
            Newdiv.setAttribute("id", "ShowDiv");
            Newdiv.style.left = '100px';
            Newdiv.style.top = '100px';
            $(".imgButBox").append(Newdiv);
        })
    };
    //鼠标离开删除展示框
    for (var i = 0; i < ShowInput.length; i++) {
        ShowInput[i].addEventListener("mouseleave", function leave() {
            $("div").remove("#ShowDiv");
        })
    }
}