<script type="text/javascript">
// �Ƿ�������ק
var drag = false;
// target: Ŀ��Ԫ�أ�mousex/mousey: �������
// diffx: ���Ŀ��Ԫ��ʱ��������Ŀ��Ԫ�����Ͻ�����Ĳ�ֵ
var target, mousex, mousey, diffx, diffy;
     
// ��갴��
function mouse_down(e) {
    // ��ȡ event
    e = e || window.event;
    // ��ȡ�������
    mousex = e.pageX || e.clientX;
    mousey = e.pageY || e.clientY;
    // ��ȡĿ��Ԫ�� (�����Ԫ��)
    var t = e.target || e.srcElement;
    // ���Ŀ��Ԫ�ص� class Ϊ move_out
    if(t.className === "move_out") {
        // �����ֵ
        diffx = mousex - t.offsetLeft;
        diffy = mousey - t.offsetTop;
        // ����Ŀ��
        target = t;
        // ����Ԫ��λ��Ϊ ����
        target.style.position = "absolute";
        // ������ʾ������ק
        drag = true;
    }
}
     
// ����ƶ�
function mouse_move(e) {
    e = e || window.event;
    mousex = e.pageX || e.clientX;
    mousey = e.pageY || e.clientY;
    // ���������ק
    if(drag) {
        // ����Ŀ��Ԫ�ص�����
        target.style.left = mousex - diffx + "px";
        target.style.top = mousey - diffy + "px";
    }
}
     
// ���̧��
document.onmouseup = function() {
    // ֹͣ��ק
    drag = false;
};
// ��갴��
document.onmousedown = mouse_down;
// ����ƶ�
document.onmousemove = mouse_move;
</script>