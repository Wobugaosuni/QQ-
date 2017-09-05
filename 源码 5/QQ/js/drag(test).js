// 通过class获取元素：document.getElementsByClassName()：
// 在IE10以下浏览器不支持，解决方法：封装函数
// 参数：第一个必须：类名；第二个可选：父函数
function getByClass(clsName,parent){
	var oparent=parent?document.getElementById(parent):document;
	var eles=[];//定义数组
	var elements=oparent.getElementsByTagName("*");
//遍历elements数组，找到类名为clsName的元素
    for(var i=0;i<elements.length;i++){
    	if(elements[i].className==clsName){
    		eles.push(elements[i]);//往数组的末尾添加元素，并返回新的长度
    	}
    }
    return eles;
}
window.onload=drag;
    function drag(){
    	var oDrag=getByClass("login_logo_webqq","loginPanel")[0];
    	// var oDrag=document.getElementById("login_logo_webqq");
    	var ui_boxyClose=document.getElementById("ui_boxyClose");
    	//窗口拖曳
    	oDrag.onmousedown=fndown;//鼠标按下时调用fndown函数
    	//窗口关闭
    	ui_boxyClose.onclick=function(){
    	    oDrag.style.display="none";
    	}

    	//状态切换
    	var loginState=document.getElementById("loginState");
        var stateList=document.getElementById("loginStatePanel");
        var lis=stateList.getElementsByTagName("li");
        var stateIcon=document.getElementById("loginStateShow");
        var stateTxt=document.getElementById("login2qq_state_txt");
        loginState.onclick=function(e){
        	e=event||window.event;
        	if(event.stopPropagation){
        		event.stopPropagation();
        	}else if(event.cancleBubble){
        		event.cancleBubble=true;
        	}
        	stateList.style.display="block";
        	for(var i=0;i<lis.length;i++){
        		lis[i].onclick=function(event){
                    event=event||window.event;
        			//stateIcon.className=null;
        			stateIcon.className="login-state-show "+this.id;
        			//alert(stateIcon.className);
        			stateTxt.innerHTML=document.getElementById(this.id).getElementsByClassName("stateSelect_text")[0].innerHTML;
        			stateList.style.display="none";//事件冒泡：35行代码将stateList显示了。解决方法：阻止事件冒泡
                    if(event.stopPropagation){
                    	event.stopPropagation();
                    }else if(event.cancleBubble){
                    	event.cancleBubble=true;
                    }
        		}

        	}
        }
        document.onclick=function(){
        	stateList.style.display="none";
        }
    }



    // function fndown(){
//光标在整个页面中移动。坐标：clientX,clientY（不包括页面滚动的距离）
//鼠标事件都是在浏览器窗口中的特定位置上发生的。这个位置的信息保存在事件的clientX和clientY属性中
    // 	document.onmousemove=function(event){//event参数接收mousemove事件的对象
    // 		var odrag=document.getElementById("loginPanel");
    // 		event=event||window.event;
    // 		document.title=event.clientX+","+event.clientY;//测试横纵坐标，在标题栏中显示
    // 		odrag.style.left=event.clientX+"px";
    // 		odrag.style.top=event.clientY+"px";
    // 	}
    // }

//     测试上述，发现bug：鼠标按下后光标移动到左上角，解决：
    function fndown(es){//es接收鼠标按下时按下时的事件对象
        es=event||window.event;
        var oDrag=document.getElementById("loginPanel");
        //光标按下时光标和面板之间的距离（是按下时的距离，不是移动时的距离）
        var disX=event.clientX-oDrag.offsetLeft;
        var disY=event.clientY-oDrag.offsetTop;
        //移动
        document.onmousemove=function(event){//event接收鼠标移动时移动时的参数
        	event=event||window.event;
        	fnMove(event,disX,disY)//函数接收三个参数
        }
        //释放鼠标
        document.onmouseup=function(){
        	document.onmousemove=null;
        	document.onmouseup=null;
        }
    }
    function fnMove(e,posX,posY){
    	var I=e.clientX-posX;
    	var t=e.clientY-posY;
    	//让弹窗走起来
    	var oDrag=document.getElementById("loginPanel");	
        //document.title=I+","+t;
    	//测试完后，发现bug：移动范围超出界限。解决：左侧：让负数强制＝0；右侧：拖动的距离小于（窗口的宽－面板的宽）；上下侧同理
    	var winW=document.documentElement.clientWidth||document.body.clientWidth;//窗口的宽。解决浏览器不兼容问题
    	var winH=document.documentElement.clientHeight||document.body.clientHeight;//窗口的高
        // alert(winW);
        // alert(oDrag.offsetWidth);
    	var maxW=winW-oDrag.offsetWidth;//-10是因为关闭按钮的top=-10;right=-10的溢出
    	var maxH=winH-oDrag.offsetHeight;
    	if(I<0){
    		I=0;
    	}else if(I>maxW){
    		I=maxW;
    	}
    	if(t<0){
    		t=0;
    	}else if(t>maxH){
    		t=maxH;
    	}
    	oDrag.style.left=I+"px";
    	oDrag.style.top=t+"px";
    }