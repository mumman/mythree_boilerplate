/**
 * Created by Administrator on 2017/5/3.
 */
import $ from "jquery";
import {TweenMax} from "gsap";


var $ul=$("#view>ul");
for(var i=0;i<GOT.currentViewLength;i++){
    var view="view"+i;
    var liHTML="<li><p>"+GOT[view].name+"</p><p>"+(GOT[view].index+1)+"</p></li>";
    $ul.append(liHTML);

}

var $controlBtn=$("#view>div").last();
var $li=$("#view li");
var $conlection=$("#view>div").first().add($li);

$li.first().addClass("active");



$controlBtn.click(function(event){
    $conlection.slideToggle("slow");
    if($controlBtn.text()==="关闭菜单"){
        $controlBtn.text("打开菜单");
        console.log($controlBtn.text());
    }else{
        $controlBtn.text("关闭菜单");
        console.log($controlBtn.text());
    }
});

function switchViewGUI(){
    var $li=$("#view li");
    var index=GOT[GOT.currentViewName].index;
    $li.removeClass("active");
    $li.eq(index).addClass("active");
}

$li.click(function(event){
    var index=$li.index(this);
    GOT.currentViewName="view"+index;
    document.dispatchEvent(GOT.eventSwitchView);
    //console.log(GOT.currentViewName);
});
//鼠标在li上样式切换,没有使用:hover的方式,因为第一人称的原因
var $liactive=$("li.active");
$li.on("mouseenter",function(){
    //console.log(this);

    $li.not($liactive).removeClass("active");
    $(this).addClass("active");
    $li.css({"cursor":"pointer"})
});
$li.on("mouseleave",function(){
    //console.log(this);
    $li.not($liactive).removeClass("active");
});


//info操作说明
var $info=$("#info");
var $closeBtn=$(".closeBtn");

$closeBtn.click(function(){
    $info.hide();

});

//控制菜单按钮
//显示info菜单
var $infoBtn=$(".infoBtn");
$infoBtn.click(function(){
    if($info.css("display")==="none"){
        $info.show();
    }else{
        $info.hide();
    }

});

//全屏
function launchFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
var isFullscreen=false;
var $fullScreen=$(".fullScreen");
//由于只是一个单独canvas占满屏幕,无法使用全屏api判断是否全屏
$fullScreen.click(function(){
    if(!isFullscreen){
        launchFullscreen(document.documentElement);
        isFullscreen=true;
    }else{
        exitFullscreen();
        isFullscreen=false;
    }
});









export {switchViewGUI};














