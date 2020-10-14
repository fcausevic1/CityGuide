//function to open register form when register is clicked instead of login form
$('.regLog').click(function(e){
    var tab = e.target.hash; 
    $('li > a[href="' + tab + '"]').tab("show");
});

$(".loginFormLink").click(function(e){
	$(".log").click();
});

$(".regFormLink").click(function(e){
	$(".reg").click();
});

$("#resetPass").click(function(e){
	$(".res").click();
});

$(".sent").click(function(e){
	if($(".mail").css("display")!="none") {
		$('.alert').show();	
	}
});

$(".closeAlert").click(function(e){
	$('.alert').hide();
});

$( ".passRecover" ).submit(function( event ) {
  event.preventDefault();
});
