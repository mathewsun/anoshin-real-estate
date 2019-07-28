Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		url  = 'https://vk.com/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	odnoklassniki: function(purl, title, desk, img) {
		url  = 'https://connect.ok.ru/offer?';
		url += 'url=' 		   + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(title);
		url += '&description=' + encodeURIComponent(desk);
		url += '&imageUrl=' + encodeURIComponent(img);
		Share.popup(url);
	},
	facebook: function(purl, ptitle, pimg, text) {
		url  = 'https://www.facebook.com/sharer/sharer.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	twitter: function(purl, ptitle) {
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.popup(url);
	},
	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};
function sendMail(article_id,element){
	var form = element.parents('li.mail').find('form');
	var input = form.find('input');
	input.removeClass('error');
	if((form.is(":visible") && form[0].checkValidity() && input.val().length) || form.is(":hidden")){
		$.ajax({
			dataType: 'json',
			url: "/local/ajax/mail_send.php",
			type : "POST",
			data: {
				id: article_id,
				mail:input.val(),
			},
			success: function(out) {
				switch (out.status){
					case 'Y':
						element.html(out.message);
						break;
					case 'N':
						if(out.message === 'email not found'){
							//показать инпут, отправить еще раз
							element.parents('li.mail').css({
								'flex-direction' : 'column',
								'align-items': 'baseline',
							}).find('form').toggle();
						}
						break;
				}
			}
		});
	}else{
		if(form.is(":visible") && !form[0].checkValidity()){
			input.addClass('error');
		}
	}
}
