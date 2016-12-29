/*
            ������˵������Ϊ��һ��������Ϊһ��Բ,Ȼ��ָ�Ϊ���,������ƽ�ֺ�ĽǶȼ��㻡�ȴӶ���������Բ�ĵ�ƫ����,�ﵽ��λ
         */
        var len;//С�������
        var showerObj;//��������
        var listObj;//����С����
        var showerWidth = 800;//������
        var showerHeight = 400;//����߶�
        var r;//ÿ������Ļ��ȱ�׼
        var cR = 0;
        var ccR = 0;
        //
        var timer = 0;
        window.onload = function () {
            //��ȡ��������
            showerObj = document.getElementById("show");
            //��ȡ����������С����
            listObj = showerObj.getElementsByTagName("div");
            //��ȡ�������
            len = listObj.length;
            //���ݷ������ÿ������Ļ��ȱ�׼
            r = Math.PI / 180 * 360 / len;
            //ѭ������С����
            for (var i = 0; i < len; i++) {
                //��ȡ��ǰС����
                var item = listObj[i];
                //���ݻ�����Ǳ���������������������ĵ�ƫ����(����ƫ��)
                item.style.top = showerHeight / 2 + Math.sin(r * i) * showerWidth / 2 - 20 + "px";
                //����ƫ��
                item.style.left = showerWidth / 2 + Math.cos(r * i) * showerWidth / 2 - 30 + "px";
                //���������ԭ���ƫ����
                item.rotate = (r * i + 2 * Math.PI) % (2 * Math.PI);
                //��Ӧ�ĵ���¼�
                item.onclick = function () {
                    //���ݵ�ǰԪ�ص�ƫ����,�������Ҫת���Ĵ���,�ж��ٴ�����ö��ٴ�rotate����
                    cR = Math.PI / 2 - this.rotate;
                    //����ѭ������ת��ʱ�Ķ���Ч��,���Ϊ10����,���趨timer����,����ת����ָ��λ��ʱ(cR��������)ֹͣ
                    timer || (timer = setInterval(rotate, 10));
                }
            }
            //������������������λ��(X��)
            var rX = showerObj.offsetLeft + showerWidth / 2;
            //(Y��)
            var ry = showerObj.offsetTop + showerHeight / 2;
            //���ʱ����Ч��(�������Ǻ�������,�Ͳ�ϸд��)
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