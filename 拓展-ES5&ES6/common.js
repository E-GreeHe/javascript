/**
 * [获取随机颜色]
 * @return [返回16进制的颜色]
 */
function randomColor(){
	var str = '0123456789abcdef';
	var res = '#';
	for(var i=0;i<6;i++){
		var idx = parseInt(Math.random()*str.length);
		res += str[idx];
	}

	return res;
}

// 封装一个兼容所有浏览器的方法getStyle
// 用于获取css样式
function getStyle(ele,attr){
	// 支持getComputedStyle的浏览器
	if(window.getComputedStyle){
		return getComputedStyle(ele)[attr];
	}
	// 支持currentStyle的浏览器
	else if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return ele.style[attr];
	}
}
// var ele = document.getElementById('box')
// getStyle(ele,'width');//'200px';

/**
 * [给元素添加事件，兼容IE8-]
 * @param ele    [元素节点]
 * @param type   [事件类型]
 * @param handle [事件处理函数]
 * @param capture [是否捕获]
 */
function addEvent(ele,type,handle,capture){
	if(ele.addEventListener){
		ele.addEventListener(type,handle,capture);
	}else if(ele.attachEvent){
		ele.attachEvent('on' + type,handle);
	}else{
		ele['on' + type] = handle;
	}
}
// addEvent(ele,type,fn)
// addEvent(pop,'click',function(){
// })


/*
	cookie的增删改查
 */

function getCookie(name){
	var cookie = document.cookie.split('; ');
	var res;

	for(var i=0;i<cookie.length;i++){
		var arr = cookie[i].split('=');
		if(arr[0] === name){
			res = arr[1];
			break;
		}
	}

	return res;
}
//getCookie('carlist');//=>[]

/**
 * [设置cookie]
 * @param name    [cookie名]
 * @param val     [cookie值]
 * @param expires [有效期]
 * @param path    [cookie保存的路径]
 */
function setCookie(name,val,expires,path){
	var cookieStr = name + '=' + val;

	if(expires){
		cookieStr += ';expires=' + expires;
	}

	if(path){
		cookieStr += ';path=' + path;
	}

	// 写入cookie
	document.cookie = cookieStr;//'name=laoxie'
}
//setCookie('name','laoxie',expires,path)
//setCookie('carlist',[{}])

function removeCookie(name){
	var now = new Date();
	now.setDate(now.getDate()-1);
	// document.cookie = name + '=null;expires='+ now
	setCookie(name,'null',now);
}


/*
	去除首尾空格
	'   abc' ==>'abc'
	'   abc123  ' =>'abc123'
	'abc d  '=>'abc d'
 */
function trim(str){
	str = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	return str;
}
// trim('   abc')

/**
 * [动画函数]
 * @param  ele    [执行动画的元素节点]
 * @param  attr   [执行动画的属性]
 * @param  target [属性改变的目标值]
 */
function animate(ele,attr,target){
	ele.timer = setInterval(()=>{
		var current = getStyle(ele,attr);//10px,30deg,15,0.3;

		// 提取单位
		var unit = current.match(/[a-z]+$/i);
		unit = unit ? unit[0] : '';

		current = parseFloat(current);

		// 计算速度
		var speed = (target - current)/10;

		if(attr === 'opacity'){
			speed = speed>0 ? 0.05 : -0.05;
		}else{
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);//0.1=>1,-0.1=>-1
		}


		console.log(current,target,speed);

		// 当current达到target值时，停止定时器
		if(current == target){
			clearInterval(ele.timer);
			current = target - speed;
		}

		ele.style[attr] = current + speed + unit;
	},50);
}
//animate(ele,'left',100)