// load 页面加载完成再执行
window.addEventListener('load', function () {
    // 获取元素
    var prev = document.querySelector('.prev');//左侧按钮
    var next = document.querySelector('.next');//右侧按钮
    var lunbotupromo = document.querySelector('.lunbotu-promo');//整个轮播盒子
    var lunbotuWidth = lunbotupromo.offsetWidth;//获取图片宽度
    // console.log(lunbotuWidth,lunbotupromo.style.width)
    // mouseover和mouseenter都是鼠标移到元素身上就触发，区别是
    // 1、mouseover经过自身盒子触发，经过子盒子也触发，拥有冒泡特性
    // 2、mouseenter只经过自身盒子触发，没有冒泡特性
    // mouseenter不会冒泡，搭配鼠标离开事件mouseleave同样不会冒泡
    // 鼠标经过整个轮播盒子显示按钮
    lunbotupromo.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
    })
    lunbotupromo.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
    })
    // 动态生成小圆圈，在轮播盒子的基础上选择
    var ul = lunbotupromo.querySelector('ul');//图片
    var ol = lunbotupromo.querySelector('.pormo-nav');//小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');// 创建li
        li.setAttribute('index', i);// 自定义属性，记录当前小圆圈的索引号
        ol.appendChild(li);// 把li插入到ol里面
        // 创建的同时绑定点击事件，排他思想
        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = ''; //清楚所有小圆圈类名
            }
            this.className = 'current'; //给当前小圆圈赋予类名
            // 移动图片就是ul向右移动，负值，小圆圈的索引号*图片宽度=移动距离
            var index = this.getAttribute('index');//getAttribute(name)：获取节点的属性
            num = index; // 获得小圆圈当前索引号，赋值图片
            circle = index; //获得小圆圈当前索引号，赋值小圆圈
            // animate(obj,target,callback)
            // console.log(lunbotuWidth,index*lunbotuWidth)
            animate(ul, -index * lunbotuWidth)// ul移动

        })
    }
    ol.children[0].className = 'current'; // 给第一个小圆圈添加current类名
    //  把第一个li添加到最后一个图片后边
    ul.appendChild(ul.children[0].cloneNode(true))

    var num = 0; // 控制图片播放
    var circle = 0; // 控制小圆圈播放
    var flag = true; // 节流阀，防止轮播图按钮连续点击造成播放过快

    // 右侧按钮
    next.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果图片滚动到最后复制的一张，就让ul的left值为0，快速跳转到第一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            // 图片改变,ul向左移动为负值
            num++;
            animate(ul, -num * lunbotuWidth, function () {
                flag = true;// 打开节流阀
            });
            // 小圆圈改变，排他思想清除类名current
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ' ';
            }
            ol.children[circle].className = 'current';
        }
    })

    // 左侧按钮
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            // console.log(ul.children.length)
            // 如果图片滚动到第一张，就让ul的left值为 最后第二张索引号*图片宽度，快速跳转到最后一张，ul向左移动为负值
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = - num * lunbotuWidth + 'px';
            }
            // 图片改变
            num--;
            animate(ul, -num * lunbotuWidth,function(){  //ul向左移动为负值
                flag = true;// 打开节流阀
            });
            // 小圆圈改变，排他思想清除类名current
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ' ';
            }
            ol.children[circle].className = 'current';
        }
    })

    // 自动轮播
    var timer = setInterval(function () {
        next.click();// 手动调用点击事件s
    }, 2000)
})