//防止缓存 通过 js进行加载js文件
var pCg=function () {
    this.num=0;
};
pCg.prototype.Load=function (arrAy) {
    var _this=this;
    if(typeof arrAy[_this.num]==='undefined'){
        return
    }
    var path="../../../static/custom_visualization/js/";
    new_element=document.createElement("script");
    new_element.setAttribute("type","text/javascript");
    new_element.setAttribute("src",path+arrAy[_this.num]+'?t='+new Date().getTime());
    document.body.appendChild(new_element);
    _this.num++;
    new_element.onload=function () {
        _this.Load(arrAy)
    }
};