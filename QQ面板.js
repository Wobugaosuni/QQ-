window.onload=drag;
function drag(){
	var box=document.getElementById("logog");
	var statebox1=document.getElementById("statebox1");
//面板拖曳
	box.onmousedown=fndown;
//状态切换
	statebox1.onclick=ocdown;
}

//状态切换函数
function ocdown(e){
	e=event||window.event;
	var statelist=document.getElementById("statelist");
	var lis=document.getElementById("ulli").getElementsByTagName("li");
	var pdf=statebox1.getElementsByClassName("pdf")[0];
	var imgdf=statebox1.getElementsByClassName("imgdf")[0];
	statelist.style.display="block";
	if(e.stopPropagation){
		e.stopPropagation();
	}else if(e.cancleBubble){
		e.cancleBubble=true;
	}
	for(var i=0;i<lis.length;i++){
		lis[i].id=i; //为li增加索引
		lis[i].onclick=function(event){
			pdf.innerHTML=document.getElementById(this.id).getElementsByClassName("txt")[0].innerHTML;
			var at=document.getElementById(this.id).getElementsByClassName("icon")[0].getAttribute("src");
            imgdf.setAttribute("src",at);
            statelist.style.display="none";
            if(event.stopPropagation){
            	event.stopPropagation();
            }else if(event.cancleBubble){
            	event.cancleBubble=true;
            }
		}
	}
}
document.onclick=function(){
		statelist.style.display="none";
	}


//面板拖曳函数
function fndown(e){
	e=event||window.event;
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
			I=maxW-8;
		}
		if(T<0){
			T=8;
		}else if(T>maxH){
			T=maxH;
		}
		box.style.left=I+"px";
		box.style.top=T+"px";
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}	
}
