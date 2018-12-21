/**
 * Created by Administrator on 2018/1/22.
 */
var purpose=function () {};
purpose.prototype.GetQueryString=function(name) {//从HTMLurl上摘取数据的函数
    var r = decodeURI(window.location.search.substr(1));
    var arr=r.split('&');
    for(var i=0;i<arr.length;i++){
        var arr1=arr[i].split('=');
        if(arr1[0]===name){
            return arr1[1];
        }
    }
}