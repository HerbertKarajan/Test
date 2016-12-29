/*
            总体来说可以认为把一个容器作为一个圆,然后分割为多份,根据其平分后的角度计算弧度从而计算出相对圆心的偏离量,达到定位
         */
        var len;//小方块个数
        var showerObj;//整体容器
        var listObj;//所有小方块
        var showerWidth = 800;//整体宽度
        var showerHeight = 400;//整体高度
        var r;//每个方块的弧度标准
        var cR = 0;
        var ccR = 0;
        //
        var timer = 0;
        window.onload = function () {
            //获取整体容器
            showerObj = document.getElementById("show");
            //获取容器内所有小方块
            listObj = showerObj.getElementsByTagName("div");
            //获取方块个数
            len = listObj.length;
            //根据方块个数每个方块的弧度标准
            r = Math.PI / 180 * 360 / len;
            //循环所有小方块
            for (var i = 0; i < len; i++) {
                //获取当前小方块
                var item = listObj[i];
                //根据弧度与角标计算出其距离整体容器中心的偏离量(上下偏移)
                item.style.top = showerHeight / 2 + Math.sin(r * i) * showerWidth / 2 - 20 + "px";
                //左右偏移
                item.style.left = showerWidth / 2 + Math.cos(r * i) * showerWidth / 2 - 30 + "px";
                //计算器相对原点的偏移数
                item.rotate = (r * i + 2 * Math.PI) % (2 * Math.PI);
                //对应的点击事件
                item.onclick = function () {
                    //根据当前元素的偏移数,计算出需要转动的次数,有多少次则调用多少次rotate方法
                    cR = Math.PI / 2 - this.rotate;
                    //设置循环调用转动时的动画效果,间隔为10毫秒,并设定timer变量,用于转动至指定位置时(cR变量控制)停止
                    timer || (timer = setInterval(rotate, 10));
                }
            }
            //计算整体容器的中心位置(X轴)
            var rX = showerObj.offsetLeft + showerWidth / 2;
            //(Y轴)
            var ry = showerObj.offsetTop + showerHeight / 2;
            //点击时动画效果(都是三角函数计算,就不细写了)
            var rotate = function () {
                ccR = (ccR + 2 * Math.PI) % (2 * Math.PI);
                if (cR - ccR < 0) cR = cR + 2 * Math.PI;
                if (cR - ccR < Math.PI) {
                    ccR = ccR + (cR - ccR) / 19;
                } else {
                    ccR = ccR - (2 * Math.PI + ccR - cR) / 19;
 
                }
 
                if (Math.abs((cR + 2 * Math.PI) % (2 * Math.PI) - (ccR + 2 * Math.PI) % (2 * Math.PI)) < Math.PI / 720) {
                    ccR = cR;
                    clearInterval(timer);
                    timer = 0;
                }
 
                for (var i = 0; i < len; i++) {
                    var item = listObj[i];
                    var w, h;
                    var sinR = Math.sin(r * i + ccR);
                    var cosR = Math.cos(r * i + ccR);
                    w = 60 + 0.6 * 60 * sinR;
                    h = (40 + 0.6 * 40 * sinR);
                    item.style.cssText += ";width:" + w + "px;height:" + h + "px;top:" + parseInt(showerHeight / 2 + sinR * showerWidth / 2 / 3 - w / 2) + "px;left:" + parseInt(showerWidth / 2 + cosR * showerWidth / 2 - h / 2) + "px;z-index:" + parseInt(showerHeight / 2 + sinR * showerWidth / 2 / 3 - w / 2) + ";";
 
                }
            }
 
            document.getElementById("l").onclick = function () {
                cR = (cR + r + 2 * Math.PI) % (2 * Math.PI);
                timer || (timer = setInterval(rotate, 10));
            }
            document.getElementById("r").onclick = function () {
                cR = (cR - r + 2 * Math.PI) % (2 * Math.PI);
                timer || (timer = setInterval(rotate, 10));
            }
            rotate();
        }