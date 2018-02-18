$( document ).ready(function() {
	var processTable = function (error, options, response) {
		if (!error) {
			var $email, $webpage, $researchDetails;
			
			$('#results-table tr:gt(0)').each(function() {
				$email = $(this).find('td:eq(1)');
				$webpage = $(this).find('td:eq(2)');
				$email.html($email.text().trim() ? '<a href="mailto:' + $email.text().trim() + '" class="btn btn-info"><i class="glyphicon glyphicon-envelope"></i></a>' : '');
				$email.append($webpage.text().trim() ? '<a href="' + $webpage.text().trim() + '" target="_blank" class="btn btn-info"><i class="glyphicon glyphicon-user"></i></a>' : '');
				$webpage.hide();
				$research = $(this).find('td:eq(6)');
				$forDomain = $(this).find('td:eq(7)');
				$forModalidies = $(this).find('td:eq(8)');
				$forMethods = $(this).find('td:eq(9)');
				
				$research.html('<dl class="researchDetails dl-horizontal"><dt>Brain Area</dt><dd>' + $research.text() + '</dd></dl>');
				$researchDetails = $(this).find('td:eq(6) .researchDetails');
				$researchDetails.append('<dt>Domain</dt><dd>' + $(this).find('td:eq(7)').text() + '</dd>');
				$(this).find('td:eq(7)').hide();
				$researchDetails.append('<dt>Modalities</dt><dd>' + $(this).find('td:eq(8)').text() + '</dd>');
				$(this).find('td:eq(8)').hide();
				$researchDetails.append('<dt>Methods</dt><dd>' + $(this).find('td:eq(9)').text() + '</dd>');
				$(this).find('td:eq(9)').hide();

			});
			
			
			// Rename headers
			$('#results-table tr th:eq(0)').text('Name');
			$('#results-table tr th:eq(1)').text('');
			$('#results-table tr th:eq(6)').text('Field of Research');
			$('#results-table tr th:eq(10)').text('Keywords');
			// Hide unnecessary headers
			$('#results-table tr th:eq(2)').hide();
			$('#results-table tr th:eq(7)').hide();
			$('#results-table tr th:eq(8)').hide();
			$('#results-table tr th:eq(9)').hide();
			
			// Update count
			$('#search-message').text( $('#results-table tr:gt(0):visible').length + ' entries found');
		}
	};
	
	$('#results-table').sheetrock({
	  url: "https://docs.google.com/spreadsheets/d/1j8CCqajpvbPWM3yjuJLaOvEPy5P2BuhfWNZDsWnahCw/edit#gid=0",
	  query: "SELECT B,E,G,C,D,F,I,J,K,L,M",
	  callback: processTable
	});
	
});

$('#search').keyup(function() {
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join(')(?=.*\\b') + ').*$',
		text;
	
	try {
		reg = RegExp(val, 'i');

		$('#results-table tr:gt(0)').show().filter(function(index) {
			text = "";
			$(this).find('td').each(function() {
				text += " " + $(this).text();
			});
			<!-- $(this).text(); -->
			return !reg.test(text);
		}).hide();
		$('#form-container').removeClass('has-error');
		// Update count
		$('#search-message').text( $('#results-table tr:gt(0):visible').length + ' entries found');
	}
	catch (e) {
		// alert(e);
		$('#search-message').text('Error - please enter a valid string');
		$('#form-container').addClass('has-error');
	}

});