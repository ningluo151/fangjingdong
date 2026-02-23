// 简单动画函数封装,obj动画对象,target移动到的距离，callback回调函数
function animate(obj,target,callback){
    //当不断点击按钮，动画速度越来越快，原因是不停开启定时器
    //解决方法就是让对象只有一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        // 步长值要写到定时器的里面
        var step = (target - obj.offsetLeft) / 10;
        // 步长值取整，不要出现小数， 正数向上取整，负数向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);//css要 清除margin、padding
        if(obj.offsetLeft == target){
            //停止动画，本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写到事件结束的地方，如果回调函数存在
            if(callback){
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step +'px';
    },30)
}