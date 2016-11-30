
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};




var api_link = 'https://atlas.ru/api2/bf/update';


var atlas_token = getUrlParameter('atlas_token');
var access_token = getUrlParameter('access_token');
var post_id = getUrlParameter('post_id');




var price_tag = $('.price'),
	amount_tag = $('.sold');




setInterval(function(){

	$.getJSON('https://graph.facebook.com/v2.8/?ids='+post_id+'&fields=reactions.type(LIKE).limit(0).summary(total_count).as(react_like),reactions.type(LOVE).limit(0).summary(total_count).as(react_heart),reactions.type(HAHA).limit(0).summary(total_count).as(react_smile)&access_token=' + access_token + '',function(res){

		$.ajax({
			headers: {
				'X-Access-Token': atlas_token
			},
			url: api_link,
			method: "POST",
			data: {
				likes: res[post_id].react_like.summary.total_count,
				hearts: res[post_id].react_heart.summary.total_count,
				smiles: res[post_id].react_smile.summary.total_count
			},
			success: function(data) {
				var price = data.price.toString();
				var amount = data.amount;

				if(price.length > 3) price = price.substr(-7,2) + ' ' + price.substr(price.length - 3);
				price += ' ₽';

				if(amount == 30) $('body').addClass('over');

				price_tag.text(price);
				amount_tag.text(amount);

			}
		});

	});

}, 1000);