$("#sendMsg").click(function(e){
	let flag = true;
	$(".msgInput").each(function(i, v) {
		if($(this).is(":invalid")) {
			flag = false;
		}
	});
	if(flag) {
		$('#msgSent').show();
		$('#formInputs').hide();
		$('#sendMsg').hide();
		/*$('.msgInput').val("");
		$("#contactForm").removeClass("was-validated");
		$(".msgInput").parent("div").removeClass("was-validated");*/
	}
});
$("#signIn").click(function(event) {
  if($("#uname").val() == "admin" && $("#pwd").val() == "admin") {
    window.location.replace("kontaktLogin.html");
  } else {
  	$("#loginFail").show();
  }
});
