/**
  * jQuery TAH Plugin Beta v0.2
  * Using for Textarea-Auto-Height
  * @Update: August 23, 2011
  * @Author: Phoetry (http://phoetry.me)
  * @Url: http://phoetry.me/archives/tah.html
  **/
~function($){
$.fn.tah=function(opt){
	opt=$.extend({
		moreSpace:15,
		maxHeight:600,
		animateDur:200
	},opt);
	return this.each(function(){
		if(!$.nodeName(this,'textarea'))return;
		var ta=$(this).css({resize:'none',overflowY:'hidden'}),
			css=(function(){
				var css={},i=8,
					z='width fontSize fontFamily lineHeight wordWrap wordBreak whiteSpace letterSpacing'.split(' ');
				while(i--)css[z[i]]=ta.css(z[i]);
				return $.extend(css,{
					width:ta.width()*1.5,
					position:'absolute',
					left:-9999,
					top:0
				});
			})(),
			_ta=ta.clone().css(css).attr({id:'',name:'',tabIndex:-1}),
			stCache,stCur,valCur,defHeight=ta.height(),
			both=$([ta[0],_ta[0]]),
			autoHeight=function(){
				valCur=ta.val();
				_ta.val(valCur).height(0).scrollTop(9999);
				stCur=Math.max(defHeight,_ta.scrollTop())+(valCur?opt.moreSpace:0);
				stCache===stCur||(
					stCache=stCur,
					opt.maxHeight>stCur?both.stop().animate({height:stCur},opt.animateDur):ta.css({overflowY:''})
				);
			};
		ta.after(_ta).bind('blur focus input change propertychange',autoHeight);
	});
};
}(jQuery);