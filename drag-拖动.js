<script type="text/javascript">
// 是否正在拖拽
var drag = false;
// target: 目标元素，mousex/mousey: 鼠标坐标
// diffx: 点击目标元素时鼠标坐标和目标元素左上角坐标的差值
var target, mousex, mousey, diffx, diffy;
     
// 鼠标按下
function mouse_down(e) {
    // 获取 event
    e = e || window.event;
    // 获取鼠标坐标
    mousex = e.pageX || e.clientX;
    mousey = e.pageY || e.clientY;
    // 获取目标元素 (被点击元素)
    var t = e.target || e.srcElement;
    // 如果目标元素的 class 为 move_out
    if(t.className === "move_out") {
        // 计算差值
        diffx = mousex - t.offsetLeft;
        diffy = mousey - t.offsetTop;
        // 设置目标
        target = t;
        // 设置元素位置为 绝对
        target.style.position = "absolute";
        // 点击后表示可以拖拽
        drag = true;
    }
}
     
// 鼠标移动
function mouse_move(e) {
    e = e || window.event;
    mousex = e.pageX || e.clientX;
    mousey = e.pageY || e.clientY;
    // 如果可以拖拽
    if(drag) {
        // 设置目标元素的坐标
        target.style.left = mousex - diffx + "px";
        target.style.top = mousey - diffy + "px";
    }
}
     
// 鼠标抬起
document.onmouseup = function() {
    // 停止拖拽
    drag = false;
};
// 鼠标按下
document.onmousedown = mouse_down;
// 鼠标移动
document.onmousemove = mouse_move;
</script>