/**
  * jQuery TAH Plugin
  * Using for Textarea-Auto-Height
  * @Version: 0.4
  * @Update: December 13, 2011
  * @Author: Phoetry (http://phoetry.me)
  * @Url: http://phoetry.me/archives/tah.html
  **/
~function($){
$.fn.tah=function(opt){
	opt=$.extend({
		moreSpace:10,
		maxHeight:600,
		animateDur:200
	},opt);
	return this.each(function(i,t){
		if(!$.nodeName(t,'textarea'))return;
		var ta=$(t).css({resize:'none',overflowY:'hidden'}),
			_ta=ta.clone().attr({id:'',name:'',tabIndex:-1}).css(function(css){
				$.each('width fontSize fontFamily lineHeight wordWrap wordBreak whiteSpace letterSpacing'.split(' '),function(i,t){css[t]=ta.css(t)});
				return $.extend(css,{
					width:ta.width()*1.5,
					position:'absolute',
					left:-9e5,
					height:0
				});
			}({})),
			valCur,stCur,stCache,defHeight=ta.height(),
			autoHeight=function(){
				_ta.val(valCur=ta.val()).scrollTop(9e5);
				stCur=Math.max(defHeight,_ta.scrollTop())+(valCur&&opt.moreSpace);
				stCur==stCache?0:(stCache=stCur)<opt.maxHeight?ta.stop().animate({height:stCur},opt.animateDur):ta.css({overflowY:''});
			};
		ta.after(_ta).on('blur focus input change propertychange',autoHeight);
	});
};
}(jQuery);