$(".loginToSaveBtn").click(function(e){
  $('#loginToSaveModal').modal('hide');
  $("#prijava").click();
});

$(".registerToSaveBtn").click(function(e){
  $('#loginToSaveModal').modal('hide');
    $("#registracija").click();
});

$("#signIn").click(function(event) {
  if($("#uname").val() == "admin" && $("#pwd").val() == "admin") {
    window.location.replace("objekatLogin.html");
  } else {
    $("#loginFail").show();
  }
});

//DOM elements
const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next' };


//remove class from a set of items
const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

//get active button step number
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

  //remove active state from all the state
  removeClasses(DOMstrings.stepsBtns, 'js-active');

  //set picked items to active
  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

//get active panel
const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {

    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel;

};

//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  //show active panel
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {

      elem.classList.add('js-active');

      setFormHeight(elem);

    }
  });

};

//set form height equal to current panel height
const formHeight = activePanel => {

  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

  //open active panel
  setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

  const eventTarget = e.target;

  //check if we clicked on `PREV` or NEXT` buttons
  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
  {
    return;
  }

  //find active panel
  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

  //set active step and active panel onclick
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
    activePanelNum--;

  } else {

    activePanelNum++;

  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);

});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);

function validateFirst() {
  let flag = true;
  $("#firstPanel").find(":input").each(function(i, v) {
    if($(this).is(":invalid") && !($(this).is(":valid"))) {
      flag = false;
    }
  });
  if(flag) {
    $('#form1').css("color", "green");
  } else {
    $('#form1').css("color", "red");
  }
}

function validateSecond() {
  let flag = true;
  $("#secondPanel").find(":input").each(function(i, v) {
    if($(this).is(":invalid") && !($(this).is(":valid"))) {
      flag = false;
    }
  });
  if(flag) {
    $('#form2').css("color", "green");
  } else {
    $('#form2').css("color", "red");
  }
}

function validateThird() {
  let flag = true;
  $("#thirdPanel").find(":input").each(function(i, v) {
    if($(this).is(":invalid") && !($(this).is(":valid"))) {
      flag = false;
    }
  });
  if(flag) {
    $('#form3').css("color", "green");
  } else {
    $('#form3').css("color", "red");
  }
}

function validateFourth() {
  let flag = true;
  $("#fourthPanel").find(":input").each(function(i, v) {
    if($(this).is(":invalid") && !($(this).is(":valid"))) {
      flag = false;
    }
  });
  if(flag) {
    $('#form4').css("color", "green");
  } else {
    $('#form4').css("color", "red");
  }
}

function validateAll() {
  validateFirst();
  validateSecond();
  validateThird();
  validateFourth();
  let flag = true;
  alert( $(".formContainer").find(":input").length);
  $(".formContainer").find(":input").each(function(i, v) {
    if($(this).is(":invalid") && !($(this).is(":valid"))) {
      flag = false;
    }
  });
  if(!flag) {
    $('#objectFail').show();
  } else {
    $(".formContainer").hide();
    $('#objectFail').hide();
    $('#objectSucc').show();
  }
}
