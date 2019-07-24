
$(document).on("click", ".calculator__option-variant  input", function (e) {

		//Базовые параметры
		var operation_type=$('input[name=operation-type]:checked').val();
		var build_type=$('input[name=build-type]:checked').val();
		var price_type=$('input[name=price-type]:checked').val();
		var base_marker=$(this).attr("name");
		//Продажа - Квартира
		var build_state=$('input[name=build-state]:checked').val();
		var build_strategy=$('input[name=build-strategy]:checked').val();
		var geopos=$('input[name=geopos]:checked').val();
		var second_marketplace=$('input[name=second-marketplace]:checked').val();
		//Продажа - Дом
		var build_state_house=$('input[name=build-state-house]:checked').val();
		var build_strategy_house=$('input[name=build-strategy-house]:checked').val();
		var geopos_house=$('input[name=geopos-house]:checked').val();
		var documents_state_house=$('input[name=documents-state-house]:checked').val();
		//Продажа - Участок
		var build_state_stead=$('input[name=build-state-stead]:checked').val();
		var build_strategy_stead=$('input[name=build-strategy-stead]:checked').val();
		var geopos_stead=$('input[name=geopos-stead]:checked').val();
		var documents_state_stead=$('input[name=documents-state-stead]:checked').val();
		//Продажа - Таунхаус
		var build_state_town=$('input[name=build-state-town]:checked').val();
		var build_strategy_town=$('input[name=build-strategy-town]:checked').val();
		var geopos_town=$('input[name=geopos-town]:checked').val();
		var documents_state_town=$('input[name=documents-state-town]:checked').val();
		
		//Покупка - Квартира
		var money=$('input[name=money]:checked').val();
		var calc_search=$('input[name=calc-search]:checked').val();
		var geosearch=$('input[name=geosearch]:checked').val();
		var selling=$('input[name=selling]:checked').val();
		//Покупка - Дом
		var money_house=$('input[name=money-house]:checked').val();
		var calc_search_house=$('input[name=calc-search-house]:checked').val();
		var geosearch_house=$('input[name=geosearch-house]:checked').val();
		var selling_house=$('input[name=selling-house]:checked').val();
		//Покупка - Участок
		var money_stead=$('input[name=money-stead]:checked').val();
		//var calc_search_stead=$('input[name=calc-search-stead]:checked').val();
		var geosearch_stead=$('input[name=geosearch-stead]:checked').val();
		var selling_stead=$('input[name=selling-stead]:checked').val();
		//Покупка - Таунхаус
		var money_town=$('input[name=money-town]:checked').val();
		//var calc_search_town=$('input[name=calc-search-town]:checked').val();
		var geosearch_town=$('input[name=geosearch-town]:checked').val();
		var selling_town=$('input[name=selling-town]:checked').val();
		
		if(parseInt(operation_type)==1 && parseInt(build_type)==1){
			hideAllCalc();
			$('#state_apart').show();
			$('#strategy_apart').show();
			$('#geo_apart').show();
			$('#second_apart').show();
		}
		if(parseInt(operation_type)==1 && parseInt(build_type)==2){
			hideAllCalc();
			$('#state_house').show();
			$('#strategy_house').show();
			$('#geo_house').show();
			$('#docs_house').show();
		}
		if(parseInt(operation_type)==1 && parseInt(build_type)==3){
			hideAllCalc();
			$('#state_stead').show();
			$('#strategy_stead').show();
			$('#geo_stead').show();
			$('#docs_stead').show();
		}
		if(parseInt(operation_type)==1 && parseInt(build_type)==4){
			hideAllCalc();
			$('#state_town').show();
			$('#strategy_town').show();
			$('#geo_town').show();
			$('#docs_town').show();
		}
		
		if(parseInt(operation_type)==2 && parseInt(build_type)==1){
			hideAllCalc();
			$('#money_apart').show();
			$('#calc_search_apart').show();
			$('#geosearch_apart').show();
			$('#selling_apart').show();
		}
		if(parseInt(operation_type)==2 && parseInt(build_type)==2){
			hideAllCalc();
			$('#money_house').show();
			$('#calc_search_house').show();
			$('#geosearch_house').show();
			$('#selling_house').show();
		}
		if(parseInt(operation_type)==2 && parseInt(build_type)==3){
			hideAllCalc();
			$('#money_stead').show();
			//$('#calc_search_stead').show();
			$('#geosearch_stead').show();
			$('#selling_stead').show();
		}
		if(parseInt(operation_type)==2 && parseInt(build_type)==4){
			hideAllCalc();
			$('#money_town').show();
			//$('#calc_search_town').show();
			$('#geosearch_town').show();
			$('#selling_town').show();
		}
		
		if(parseInt(operation_type)==1 && parseInt(build_type)==1 && parseInt(build_state)==5){
			$('#second_apart').hide();
		}
		
		$.ajax({
			type: 'POST',
			url: '/local/ajax/calc.php',
			data: {
				base_marker: base_marker,
				operation_type: operation_type,
				build_type: build_type,
				price_type: price_type,
				build_state: build_state,
				build_strategy: build_strategy,
				geopos: geopos,
				second_marketplace: second_marketplace,
				build_state_house: build_state_house,
				build_strategy_house: build_strategy_house,
				geopos_house: geopos_house,
				documents_state_house: documents_state_house,
				build_state_stead: build_state_stead,
				build_strategy_stead: build_strategy_stead,
				geopos_stead: geopos_stead,
				documents_state_stead: documents_state_stead,
				build_state_town: build_state_town,
				build_strategy_town: build_strategy_town,
				geopos_town: geopos_town,
				documents_state_town: documents_state_town,
				 money:money,
				 calc_search:calc_search,
				 geosearch:geosearch,
				 selling:selling,
				 money_house:money_house,
				 calc_search_house:calc_search_house,
				 geosearch_house:geosearch_house,
				 selling_house:selling_house,
				 money_stead:money_stead,
				 //calc_search_stead:calc_search_stead,
				 geosearch_stead:geosearch_stead,
				 selling_stead:selling_stead,
				 money_town:money_town,
				 //calc_search_town:calc_search_town,
				 geosearch_town:geosearch_town,
				 selling_town:selling_town,
			},
			dataType: 'json',
			success: function(result)
			{
				if(result.percent){
					if(parseInt(price_type)==1){
						var base_percent_text='Стоимость услуг';
						var base_percent_info='Выберите нужные параметры чтобы изменить стоимость';
						var base_percent_sumb=' &#8381;';
					}
					if(parseInt(price_type)==2){
						var base_percent_text='Стоимость услуг';
						var base_percent_info='Выберите нужные параметры чтобы изменить процент';
						var base_percent_sumb='%';
					}
					$('#base_percent_text').html(base_percent_text);
					$('#base_percent_info').html(base_percent_info);
					if(result.percent == 'Бесплатно') {
						$('#base_percent').html(result.percent);
						$('#base_percent').css("color", "red");
					}else{
						$('#base_percent').html(result.percent+base_percent_sumb);
						$('#base_percent').css("color", "#7e89a1");
					}
				}	
				if(result.sale_apartment){
					var res_sale_apartment = result.sale_apartment.split("#");
					cleanRadios();
					$('#build-state-'+res_sale_apartment[1]).prop('checked',true);
					$('#build-strategy-'+res_sale_apartment[0]).prop('checked',true);
					$('#geopos-'+res_sale_apartment[2]).prop('checked',true);
					$('#second-marketplace-'+res_sale_apartment[3]).prop('checked',true);	
				}	
				if(result.sale_house){
					var res_sale_house = result.sale_house.split("#");
					cleanRadios();
					$('#build-state-house-'+res_sale_house[1]).prop('checked',true);
					$('#build-strategy-house-'+res_sale_house[0]).prop('checked',true);
					$('#geopos-house-'+res_sale_house[3]).prop('checked',true);
					$('#documents-state-house-'+res_sale_house[2]).prop('checked',true);
				}
				if(result.sale_stead){
					var res_sale_stead = result.sale_stead.split("#");
					cleanRadios();
					$('#build-state-stead-'+res_sale_stead[1]).prop('checked',true);
					$('#build-strategy-stead-'+res_sale_stead[0]).prop('checked',true);
					$('#geopos-stead-'+res_sale_stead[3]).prop('checked',true);
					$('#documents-state-stead-'+res_sale_stead[2]).prop('checked',true);
				}	
				if(result.sale_town){
					var res_sale_town = result.sale_town.split("#");
					cleanRadios();
					$('#build-state-town-'+res_sale_town[1]).prop('checked',true);
					$('#build-strategy-town-'+res_sale_town[0]).prop('checked',true);
					$('#geopos-town-'+res_sale_town[3]).prop('checked',true);
					$('#documents-state-town-'+res_sale_town[2]).prop('checked',true);
				}	
				if(result.buy_apartment){
					var res_buy_apartment = result.buy_apartment.split("#");
					cleanRadios();
					$('#money-'+res_buy_apartment[1]).prop('checked',true);
					$('#calc-search-'+res_buy_apartment[0]).prop('checked',true);
					$('#geosearch-'+res_buy_apartment[2]).prop('checked',true);
					$('#selling-'+res_buy_apartment[3]).prop('checked',true);	
				}	
				if(result.buy_house){
					var res_buy_house = result.buy_house.split("#");
					cleanRadios();
					$('#money-house-'+res_buy_house[1]).prop('checked',true);
					$('#calc-search-house-'+res_buy_house[0]).prop('checked',true);
					$('#geosearch-house-'+res_buy_house[3]).prop('checked',true);
					$('#selling-house-'+res_buy_house[2]).prop('checked',true);
				}
				if(result.buy_stead){
					var res_buy_stead = result.buy_stead.split("#");
					cleanRadios();
					$('#money-stead-'+res_buy_stead[1]).prop('checked',true);
					$('#calc-search-stead-'+res_buy_stead[0]).prop('checked',true);
					$('#geosearch-stead-'+res_buy_stead[3]).prop('checked',true);
					$('#selling-stead-'+res_buy_stead[2]).prop('checked',true);
				}	
				if(result.buy_town){
					var res_buy_town = result.buy_town.split("#");
					cleanRadios();
					$('#money-town-'+res_buy_town[1]).prop('checked',true);
					$('#calc-search-town-'+res_buy_town[0]).prop('checked',true);
					$('#geosearch-town-'+res_buy_town[3]).prop('checked',true);
					$('#selling-town-'+res_buy_town[2]).prop('checked',true);
				}				
			}
		});
		
});

function cleanRadios() {
	//Продажа
	$('#state_apart').find('input').prop('checked',false);
	$('#strategy_apart').find('input').prop('checked',false);
	$('#geo_apart').find('input').prop('checked',false);
	$('#second_apart').find('input').prop('checked',false);
	$('#state_house').find('input').prop('checked',false);
	$('#strategy_house').find('input').prop('checked',false);
	$('#geo_house').find('input').prop('checked',false);
	$('#docs_house').find('input').prop('checked',false);
	$('#state_stead').find('input').prop('checked',false);
	$('#strategy_stead').find('input').prop('checked',false);
	$('#geo_stead').find('input').prop('checked',false);
	$('#docs_stead').find('input').prop('checked',false);
	$('#state_town').find('input').prop('checked',false);
	$('#strategy_town').find('input').prop('checked',false);
	$('#geo_town').find('input').prop('checked',false);
	$('#docs_town').find('input').prop('checked',false);
	//Покупка
	$('#money_apart').find('input').prop('checked',false);
	$('#calc_search_apart').find('input').prop('checked',false);
	$('#geosearch_apart').find('input').prop('checked',false);
	$('#selling_apart').find('input').prop('checked',false);
	$('#money_house').find('input').prop('checked',false);
	$('#calc_search_house').find('input').prop('checked',false);
	$('#geosearch_house').find('input').prop('checked',false);
	$('#selling_house').find('input').prop('checked',false);
	$('#money_stead').find('input').prop('checked',false);
	//$('#calc_search_stead').find('input').prop('checked',false);
	$('#geosearch_stead').find('input').prop('checked',false);
	$('#selling_stead').find('input').prop('checked',false);
	$('#money_town').find('input').prop('checked',false);
	//$('#calc_search_town').find('input').prop('checked',false);
	$('#geosearch_town').find('input').prop('checked',false);
	$('#selling_town').find('input').prop('checked',false);
}
function hideAllCalc() {
	//Продажа
	$('#state_apart').hide();
	$('#strategy_apart').hide();
	$('#geo_apart').hide();
	$('#second_apart').hide();
	$('#state_house').hide();
	$('#strategy_house').hide();
	$('#geo_house').hide();
	$('#docs_house').hide();
	$('#state_stead').hide();
	$('#strategy_stead').hide();
	$('#geo_stead').hide();
	$('#docs_stead').hide();
	$('#state_town').hide();
	$('#strategy_town').hide();
	$('#geo_town').hide();
	$('#docs_town').hide();
	//Покупка
	$('#money_apart').hide();
	$('#calc_search_apart').hide();
	$('#geosearch_apart').hide();
	$('#selling_apart').hide();
	$('#money_house').hide();
	$('#calc_search_house').hide();
	$('#geosearch_house').hide();
	$('#selling_house').hide();
	$('#money_stead').hide();
	//$('#calc_search_stead').hide();
	$('#geosearch_stead').hide();
	$('#selling_stead').hide();
	$('#money_town').hide();
	//$('#calc_search_town').hide();
	$('#geosearch_town').hide();
	$('#selling_town').hide();
}

$(function () {
	$( "#operation-type-1" ).click();
	var load_more = false;
	$(window).scroll(function () {
		if ($("#ajax_next_page").length && !load_more) {
			var url = $("#ajax_next_page").attr("href");
			var offset_button = $("#ajax_next_page").offset();
			if ($(this).scrollTop() >= offset_button.top - $(window).height()) {
						load_more = true;
						$.ajax({
							url: url,
							type: "POST",
							data: {IS_AJAX: 'Y'},
							timeout:1000,
							success: function (data) {
								$("#ajax_next_page").after(data);
								$("#ajax_next_page").remove();
								load_more = false;
							}
						});
			}
		}
	});
});

function whatsapp_shaker(){
	$('.whatsapp_call').show();
	$('.whatsapp_img').addClass('whatsapp_shake')
	setTimeout(function () {
		$('.whatsapp_img').removeClass('whatsapp_shake')
	}, 4000);
}

$(document).ready(function(){
	setTimeout(function () {
		whatsapp_shaker()
	}, 5000);
});