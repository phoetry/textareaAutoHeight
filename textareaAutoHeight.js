/**
  * jQuery TAH Plugin Beta v0.3
  * Using for Textarea-Auto-Height
  * @Update: October 18, 2011
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
				var css={};
				'width fontSize fontFamily lineHeight wordWrap wordBreak whiteSpace letterSpacing'
				.replace(/[^ ]+/g,function(s){css[s]=ta.css(s)});
				return $.extend(css,{
					width:ta.width()*1.5,
					position:'absolute',
					left:-9999,
					height:0
				});
			}()),
			_ta=ta.clone().css(css).attr({id:'',name:'',tabIndex:-1}),
			stCache,stCur,valCur,defHeight=ta.height(),
			autoHeight=function(){
				valCur=ta.val();
				_ta.val(valCur).scrollTop(9999);
				stCur=Math.max(defHeight,_ta.scrollTop())+(valCur?opt.moreSpace:0);
				stCur==stCache||(
					stCache=stCur,
					stCur<opt.maxHeight?ta.stop().animate({height:stCur},opt.animateDur):ta.css({overflowY:''})
				);
			};
		ta.after(_ta).bind('blur focus input change propertychange',autoHeight);
	});
};
}(jQuery);