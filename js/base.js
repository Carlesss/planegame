//根据id获取元素
function $(id) {
	return document.getElementById(id);
}
//根据标签名获取元素的伪数组
function $tagName(name) {
	return document.getElementsByTagName(name);
}

//能力检测

//设置任意一个元素的文本内容
function setInnerText(element, text) {
	//如果该属性在浏览器中不支持
	if(typeof element.textContent == "undefined") {
		//使用innerText
		element.innerText = text;
	} else {
		//该属性在浏览器中支持,使用textContent
		element.textContent = text;
	}
}

//获取任意一个元素的文本内容
function getInnerText(element) {
	//如果该属性在浏览器中不支持
	if(typeof element.textContent == "undefined") {
		//返回innerText
		return element.innerText;
	} else {
		//该属性在浏览器中支持,使用textContent
		return element.textContent;
	}
}
//获取任意一个元素中的第一个子元素
function getFirstElement(element) {
	if(element.firstElementChild) {
		return element.firstElementChild;
	} else {
		var node = element.firstChild;
		while(node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}
//获取任意一个元素中的最后一个子元素
function getLastElement(element) {
	if(element.lastElementChild) {
		return element.lastElementChild;
	} else {
		var node = element.lastChild;
		while(node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}

var evtTools = {
	getEvent: function(e) {
		return window.event || e;
	},
	getClientX: function(e) {
		return this.getEvent(e).clientX;
	},
	getClientY: function(e) {
		return this.getEvent(e).clientY;
	},
	getScrollLeft: function() {
		return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
	},
	getScrollTop: function() {
		return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
	},
	getPageX: function(e) {
		return this.getEvent(e).pageX ? this.getEvent(e).pageX : this.getScrollLeft() + this.getClientX(e);
	},
	getPageY: function(e) {
		return this.getEvent(e).pageY ? this.getEvent(e).pageY : this.getScrollTop() + this.getClientY(e);
	}
};

function getAttrValue(element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : window.getComputedStyle(element, null)[attr] || 0;
}

function animate(element, json, fn) {
	clearInterval(element.timeId);
	element.timeId = setInterval(function() {
		var flag = true; //假设都达到了目标
		for(var attr in json) {
			if(attr == "opacity") { //判断属性是不是opacity
				var current = getAttrValue(element, attr) * 100;
				//每次移动多少步
				var target = json[attr] * 100; //直接赋值给一个变量,后面的代码都不用改
				var step = (target - current) / 10; //(目标-当前)/10
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current = current + step;
				element.style[attr] = current / 100;
			} else if(attr == "zIndex") { //判断属性是不是zIndex
				element.style[attr] = json[attr];
			} else { //普通的属性
				//获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
				var current = parseInt(getAttrValue(element, attr)) || 0;
				//每次移动多少步
				var target = json[attr]; //直接赋值给一个变量,后面的代码都不用改
				var step = (target - current) / 10; //(目标-当前)/10
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current = current + step;
				element.style[attr] = current + "px";
			}
			if(current != target) {
				flag = false; //如果没到目标结果就为false
			}
		}
		if(flag) { //结果为true
			clearInterval(element.timeId);
			if(fn) { //如果用户传入了回调的函数
				fn(); //就直接的调用,
			}
		}
		//console.log("target:" + target + "current:" + current + "step:" + step);
	}, 10);
}

//function getStyle(element, attr) {
//	if(window.getComputedStyle) {
//		return window.getComputedStyle(element, null)[attr];
//	} else {
//		return element.currentStyle[attr];
//	}
//}
function getStyle(element, attr) {
	return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}