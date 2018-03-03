$( document ).ready(function() {
	var processTable = function (error, options, response) {
		if (!error) {
			var cols, $tdEmail, $tdWebpage, $tdBrain, $tdDomain, $tdModalities, $tdMethods, $researchDetails;
			
			$('#results-table tr:gt(0)').each(function() {
				var $this = $(this);
				$tdEmail = $this.find('td:eq(1)');
				$tdWebpage = $this.find('td:eq(2)');
				$tdBrain = $this.find('td:eq(6)');
				$tdDomain = $this.find('td:eq(7)');
				$tdModalities = $this.find('td:eq(8)');
				$tdMethods = $this.find('td:eq(9)');
				
				// Place email address & link to personal page in buttons
				$tdEmail.html($tdEmail.text() ? '<a href="mailto:' + $tdEmail.text() + '" class="btn btn-info"><i class="glyphicon glyphicon-envelope"></i></a>' : '');
				$tdEmail.append($tdWebpage.text() ? '<a href="' + $tdWebpage.text() + '" target="_blank" class="btn btn-info"><i class="glyphicon glyphicon-user"></i></a>' : '');
				$tdWebpage.hide();
				
				// Merge all Fields of Research in one column
				$('<td><dl class="researchDetails dl-horizontal"></dl></td>').insertBefore($tdBrain);
				$researchDetails = $this.find ('td dl.researchDetails');
				$researchDetails.append('<dt>Brain Area</dt><dd>' + $tdBrain.text() + '</dd>');
				$tdBrain.hide();
				$researchDetails.append('<dt>Domain</dt><dd>' + $tdDomain.text() + '</dd>');
				$tdDomain.hide();
				$researchDetails.append('<dt>Modalities</dt><dd>' + $tdModalities.text() + '</dd>');
				$tdModalities.hide();
				$researchDetails.append('<dt>Methods</dt><dd>' + $tdMethods.text() + '</dd>');
				$tdMethods.hide();

			});
			
			// Rename headers
			$('#results-table tr:eq(0) th:eq(0)').text('Name');
			$('#results-table tr:eq(0) th:eq(1)').text('');
			$('<th>Field of Research</td>').insertBefore($('#results-table tr:eq(0) th:eq(6)'));
			$('#results-table tr:eq(0) th:eq(11)').text('Keywords');
			// Hide unnecessary headers
			$('#results-table tr:eq(0) th:eq(2)').hide();
			$('#results-table tr:eq(0) th:eq(7)').hide();
			$('#results-table tr:eq(0) th:eq(8)').hide();
			$('#results-table tr:eq(0) th:eq(9)').hide();
			$('#results-table tr:eq(0) th:eq(10)').hide();
			
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

$('#search').keyup($.debounce(400, function() {
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join(')(?=.*\\b') + ').*$',
		text;
	
	try {
		reg = RegExp(val, 'i');

		$('#results-table tr:gt(0)').show().filter(function(index) {
			text = "";
			$(this).find('td').each(function() {
				text += " " + $(this).text();
			});
			return !reg.test(text);
		}).hide();
		
		$('#search-container').removeClass('has-error');
		$('#search-message').text( $('#results-table tr:gt(0):visible').length + ' entries found');
	}
	catch (e) {
		$('#search-message').text('Error - please enter a valid string');
		$('#search-container').addClass('has-error');
	}

}));

if ($('#back-to-top').length) {
    var scrollTrigger = 600, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
