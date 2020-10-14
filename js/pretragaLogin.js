$("#signIn").click(function(event) {
  if($("#uname").val() == "admin" && $("#pwd").val() == "admin") {
    window.location.replace("pretragaLogin.html");
  } else {
    $("#loginFail").show();
  }
});

$(".checkbox :checkbox").change(function (event) {
  let temp = 0;
  if (this.checked) {
    temp = 1;
    // the checkbox is now checked 
    $("#parameters").append($(this).parent().parent().clone().addClass('addedCheckBox col-lg-6 col-sm-12'));
  } else {
    // the checkbox is now no longer checked
    $(".addedCheckBox :checkbox[name='" + this.name + "']").parent().parent().remove();
  }
  if($(".addedCheckBox").length + temp != 0) {
    $("#none").css('display', 'none');
    $("#reset").css('display', '');
    $('#saveSearchInitial').removeAttr("disabled");
  } else {
    $("#none").css('display', '');
    $("#reset").css('display', 'none');
    $('#saveSearchInitial').attr("disabled", "true");
  }
});


$("#parameters").on('change', ':checkbox', function (event) {
  let temp = 0;
  if (!($(this).is(':checked'))) {
    // the checkbox is now no longer checked
    $(".checkbox :checkbox[name='" + this.name + "']").click();
    $(".checkbox :checkbox[name='" + this.name + "']").change();
    $(this).parent().parent().remove();
  } else {
    temp = 1;
  }
  if($("#parameters :checkbox").length + temp != 0) {
    $("#none").css('display', 'none');
    $("#reset").css('display', '');
    $('#saveSearchInitial').removeAttr("disabled");
  } else {
    $("#none").css('display', '');
    $("#reset").css('display', 'none');
    $('#saveSearchInitial').attr("disabled", "true");
  }
});

$("#reset").click(function(e){
  $(".checkbox :checked").click();
   $(".checkbox :checked").change();
});





var searches = {};

$("#saveSearch").click(function(e) {
  let flag = true;
  if($("#searchName").is(":invalid") && !($("#searchName").is(":valid"))) {
    flag = false;
  }
  if(!flag) {
    $("#searchFail").show();
  } else {
    $("#searchFail").hide();
    $("#saveInput").hide();
    $("#searchSucc").show();
    $('#saveSearchInitial').attr("disabled", "true");
    appendSearch();
  }
});


function appendSearch() {
  let name = $("#searchName").val();
  let item = document.createElement("li");
  let a = document.createElement("a");
  let div = document.createElement("div");
  a.name = name;
  a.innerHTML = name;
  a.href = "#";
  item.appendChild(a);
  div.style.width = "100%";
  div.className += ' loadSearch';
  div.appendChild(item);
  $("#lista").append(div);
  $("#deleteAllContainer").show();
  let names = [];
  $("#accordion .checkbox :checked").each(function(i, v) {
    names.push(this.name);
  });
  searches[name] = names;
}

$("#loginToSaveModal").on('hidden.bs.modal', function() {
  $("#searchName").val("");
  $("#searchName").attr("class", "form-control");
  $("#searchFail").hide();
  $("#saveInput").show();
  $("#searchSucc").hide();
});

$(document).on('click','.loadSearch',function(){
  $(".checkbox :checked").click();
  let name = this.children[0].children[0].name;
  $(".checkbox :checkbox").each(function(i, v) {
    if(searches[name].includes(this.name)) {
      this.click();
    }
  });
});

$("#deleteAll").click(function() {
  searches = {};
  $("#lista").html("");
  $("#deleteAllContainer").hide();
});




















/*
//search accordion
//Darko randic - "ima internet" 10.01.2020
(function(){
  var searchTerm, panelContainerId;
  // Create a new contains that is case insensitive
  $.expr[':'].containsCaseInsensitive = function (n, i, m) {
    return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };
  
  $('#myInput').on('change keyup paste click', function () {
    searchTerm = $(this).val();
    $('#accordion > .card').each(function () {
      panelContainerId = '#' + $(this).attr('id');
      $(panelContainerId + ':not(:containsCaseInsensitive(' + searchTerm + '))').hide();
      $(panelContainerId + ':containsCaseInsensitive(' + searchTerm + ')').show();
    });
  });
}());


//autocomplete
function autocomplete(inp, arr) {
  //the autocomplete function takes two arguments,
  //the text field element and an array of possible autocompleted values:
  var currentFocus;
  //execute a function when someone writes in the text field:
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      //close any already open lists of autocompleted values
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      //create a DIV element that will contain the items (values):
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      //append the DIV element as a child of the autocomplete container:
      this.parentNode.appendChild(a);
      //for each item in the array...
      for (i = 0; i < arr.length; i++) {
        //check if the item starts with the same letters as the text field value:
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


var keywords = ["Usluge", "Tura grada", "Parking", "Autopraonica", "Benzinska pumpa", "Pranje veša", "Hoteli i smještaj", "Prodavnice", "Supermarketi", "Namještaj i kućne stvari",
 "Nakit", "Alkohol", "Tržni centri", "Hrana i piće", "Restaurani", "Barovi", "Cafe", "Pekare", "Noćni klubovi", 
 "Mjesta", "Banke", "Automati", "Ambasade", "Teretane", "Biblioteke", "Zoološki vrt", "Muzeji", "Transport", "Busevi", "Tramvaji", "Taksi", "Rent a car", "Aerodromi"];
autocomplete(document.getElementById("myInput"), keywords);
*/
/*
 $("#refreshBtn").click(function() {
  alert("clicked");
    var checkBoxes = $(".checkbox input[type=checkbox]:checked").get();
    //refreshBtn.disabled = true;
    for (var i = checkBoxes.length - 1; i >= 0; i--) {
      console.log(checkBoxes[i].name);
      /*request = {
        bounds:map.getBounds(),
        types: [checkBoxes[i].name],
        language : 'bs'
      };
      service.nearbySearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          let markerTypeTemp = checkBoxes[i].name;
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(place);
          }
        }
      });
    }
  });*/

  