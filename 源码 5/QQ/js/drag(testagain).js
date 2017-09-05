window.onload=drag;
function drag(){
    var box=document.getElementById("loginPanel");
    box.onmousedown=fndown;
}
function fndown(e){
    e=event||window.event;
    var box=document.getElementById("loginPanel");
    var offsetw=e.clientX-box.offsetLeft;
    var offseth=e.clientY-box.offsetTop;
    document.onmousemove=function(event){
        event=event||window.event;
        var I=event.clientX-offsetw;
        var T=event.clientY-offseth;
        var maxW=(document.documentElement.clientWidth||document.body.clientWidth)-box.offsetWidth;
        var maxH=(document.documentElement.clientHeight||document.body.clientHeight)-box.offsetHeight;
        if(I<0){
            I=0;
        }else if(I>maxW){
            I=maxW;
        }
        if(T<0){
            T=-8;
        }else if(T>maxH){
            T=maxH;
        }
        box.style.width=I+"px";
        box.style.height=T+"px";
    }   
}
