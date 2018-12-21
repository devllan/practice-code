var window_files=new Object();
function getImgURL() {
    var imgURL;
    try{
        var file = null;
        if(window_files && window_files[0]){
            file = window_files[0];
        }else if(window_files && window_files.item(0)){
            file = window_files.item(0);
        }
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
        try{
            //Firefox7.0
            imgURL =  file.getAsDataURL();
            //alert("//Firefox7.0"+imgURL);
        }catch(e){ //Firefox8.0以上
            imgURL = window.URL.createObjectURL(file);//alert("//Firefox8.0以上"+imgURL);
        }
    }catch(e){//这里不知道怎么处理了，如果是遨游的话会报这个异常//支持html5的浏览器,比如高版本的firefox、chrome、ie10
        if (window_files && window_files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(window_files[0]);
        }
    }
    imgurl = imgURL;
    return imgURL;
}