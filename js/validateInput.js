$(".form-control").blur(function() {
	$(this).parent("div").addClass("was-validated");
});
$(document).ready(function() {
	var msg="";	
	var elements = document.getElementsByClassName("form-control");
	var checks = document.getElementsByClassName("check-control");
	for (var i = 0; i < checks.length; i++) {
	   checks[i].oninvalid = function(e) {
	    	e.target.setCustomValidity("Polje mora biti ispravno");
	   }
	    
	   checks[i].oninput = function(e) {
	        e.target.setCustomValidity(msg);
	    };
	} 
	for (var i = 0; i < elements.length; i++) {
	   elements[i].oninvalid = function(e) {
	    	e.target.setCustomValidity("Polje mora biti ispravno");
	   }
	    
	   elements[i].oninput = function(e) {
	        e.target.setCustomValidity(msg);
	    };
	} 
});

$('form').submit(function (e) {
	e.preventDefault();
});

$("#sendNewsLetter").click(function(e){
	let flag = true;
	$(".newsInput").each(function(i, v) {
		if($(this).is(":invalid")) {
			flag = false;
		}
	});
	if(flag) {
		$('#newsForm').hide();
		$('#newsLetterSent').show();
		$('.newsInput').val("");
	}
});

$("#registerBtn").click(function(e){
	let flag = true;
	$(".regInput").each(function(i, v) {
		if($(this).is(":invalid")) {
			flag = false;
		}
	});
	if(flag) {
		$('#regFrom').hide();
		$('#regSuccess').show();
		$('.regInput').val("");
	}
});

