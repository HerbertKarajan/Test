;(function($){
/**ʱ��������
 * @author Karajan
 * @param gap �������
 * @param {cT:��ǰʱ��(����),eT:��ֹʱ�䣨���룩,gap:���(����),aEven:���㴥�����¼�function,iEven:��ʼ����������ʼ��ʱ������,lEven:����ʱ������������}
 * 
 */
	function dateGap(gap){
		var di=[],dCt=[1000*60*60*24,1000*60*60,1000*60,1000,1];
		for(i=0;i<dCt.length;i++){
			di[i]=Math.floor(gap/dCt[i]);gap=gap%dCt[i];
		}
		this.format=function(fmt){
			var o = {"\\$d+":di[0],"\\$h+":di[1],"\\$m+":di[2],"\\$s+":di[3],"\\$S+":di[4]};
			for ( var k in o) {
				if (new RegExp("("+k+")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)?(o[k]):(("00" + o[k]).substr(("" + o[k]).length>2?2:("" + o[k]).length)));
				};
			}
			return fmt;
		}
		this.getD=function(){return di;}
	}
	$.gTimer=function(param){
		var opt={ct:null,et:null,gap:1000,aEven:null,iEven:null,lEven:null,Tindex:null};
		$.extend(opt,param);
		if(opt.ct==null||opt.et==null||opt.aEven==null)return;
		if(opt.iEven)opt.iEven.apply(opt);
		var t=setInterval(function(){
			$.extend(opt,{dt:new dateGap(opt.et-opt.ct)});
			if(opt.ct>=opt.et){opt.ct=opt.et;clearInterval(t);opt.dt=new dateGap(opt.et-opt.ct);if(opt.lEven)opt.lEven.apply(opt);};
			opt.aEven.apply(opt);
			opt.ct=opt.ct+opt.gap;
		},opt.gap);
		return t;
	};
})(jQuery);