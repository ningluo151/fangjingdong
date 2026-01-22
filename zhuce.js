window.onload = function(){
    var item = document.getElementsByClassName('item');
    var it = item[0].getElementsByTagName('div');//标签选择器，返回数组，全部div

    var content = document.getElementsByClassName('content');
    var con = content[0].getElementsByTagName('div');

    for(let i=0; i<it.length; i++){
        it[i].onclick = function(){
            //先清除所有div 及隐藏其内容
            for(let j=0; j<it.length; j++){
                //所有标签的类均设置为空
                it[j].className = '';
                con[j].style.display = 'none';
            }
            //将自己标签的类名设置成选中的
            this.className = 'active';
            //为当前表头div添加自定义属性index
            it[i].index = i;
            con[i].style.display = 'block';
        }
    }
}