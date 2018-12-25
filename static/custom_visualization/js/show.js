// window.onload = function () {
//     // 鼠标随动展示框
//     var ShowInput = document.getElementsByClassName("show");
//     // function leave() {
//     //     $("div").remove("#ShowDiv");
//     // }
//     // function show() {
//     //     var Newdiv = document.createElement("div");
//     //     Newdiv.setAttribute("id", "ShowDiv");
//     //     Newdiv.style.left = '100px';
//     //     Newdiv.style.top = '100px';
//     //     $(".imgButBox").append(Newdiv);
//     // }
//     //鼠标进入显示展示框
//     for (var i = 0; i < ShowInput.length; i++) {
//         ShowInput[i].addEventListener("mouseover", function show() {
//             var Newdiv = document.createElement("div");
//             Newdiv.setAttribute("id", "ShowDiv");
//             Newdiv.style.left = '100px';
//             Newdiv.style.top = '100px';
//             $(".imgButBox").append(Newdiv);
//         })
//     };
//     //鼠标离开删除展示框
//     for (var i = 0; i < ShowInput.length; i++) {
//         ShowInput[i].addEventListener("mouseleave", function leave() {
//             $("div").remove("#ShowDiv");
//         })
//     }


// }
// window.onload = function () {


//     $.ajax({
//         url: "./zuobiao.json",
//         type: "get",
//         data: "",
//         dataType: "json",
//         //请求成功时的回调函数，info为后端返回的数据
//         success: function (info) {
//             let ShowInput = document.getElementsByClassName("show");
//             var coordinate = info;
//             // console.log(coordinate);
//             var coordinate_data = coordinate.data.cost_listing;
//             // console.log(coordinate_data);
//             var Top_arr = [];
//             var Width_arr = [];
//             var Left_arr = [];
//             var Height_arr = [];
//             for (var i = 0; i < coordinate_data.length; i++) {
//                 var codte_data = coordinate_data[i].cos_project_list;
//                 console.log(codte_data);
//                 for (let j = 0; j < codte_data.length; j++) {
//                     // console.log(codte_data[j].top);
//                     // var Height = codte_data[j].height;
//                     // var Top = codte_data[j].top;
//                     // var Left = codte_data[j].left;
//                     // var Width = codte_data[j].width; 
//                     Top_arr.push(codte_data[j].top);
//                     Left_arr.push(codte_data[j].left);
//                     Width_arr.push(codte_data[j].width);
//                     Height_arr.push(codte_data[j].heigth);
//                     //鼠标进入显示展示框
//                     ShowInput[j].addEventListener("mouseover", function show() {
//                         var Newdiv = document.createElement("div");
//                         //判断是否四个值为零   全图
                        
//                         Newdiv.setAttribute("id", "ShowDiv");
//                         // if (Left_arr[j] == 0 && Left_arr[j] == 0 && Left_arr[j] == 0 && Left_arr[j]) {
//                         //     // Newdiv.setAttribute("class", "NoShow");
//                         //     var classVal = Newdiv.getAttribute("id");
//                         //     classVal = classVal.replace("ShowDiv", "NotShow");
//                         //     Newdiv.setAttribute("id", classVal);
//                         // }
//                         Newdiv.style.left = Left_arr[j] / 10 + 'px';
//                         Newdiv.style.top = Top_arr[j] / 10 + 'px';
//                         Newdiv.style.width = Width_arr[j] / 10 + 'px';
//                         Newdiv.style.height = Height_arr[j] / 10 + 'px';
//                         $(".imgButBox").append(Newdiv);
//                         // console.log(j);
//                         // console.log(Top_arr[j]);
//                         // console.log(ShowInput[j]);
//                     });
//                     ShowInput[j].addEventListener("mouseleave", function leave() {
//                         $("div").remove("#ShowDiv");
//                         $("div").remove("#NotShow");
//                     });
//                 }
//             }
//         }
//     });
// }