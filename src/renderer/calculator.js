console.log('loading calculator renderer...');

//get all controls
var plusBtn = document.querySelector('#opPlus');
var minusBtn = document.querySelector('#opMinus');
var multipleBtn = document.querySelector('#opMultiple');
var divideBtn = document.querySelector('#opSlash');
var powerBtn = document.querySelector('#opPower');
var paramA = document.querySelector('#paramA');
var paramB = document.querySelector('#paramB');
var result = document.querySelector('#result');

//add event for operations
plusBtn.addEventListener('click',       function () { onChooseOperation( plusBtn ); }, false);
minusBtn.addEventListener('click',      function () { onChooseOperation( minusBtn ); }, false);
multipleBtn.addEventListener('click',   function () { onChooseOperation( multipleBtn ); }, false);
divideBtn.addEventListener('click',     function () { onChooseOperation( divideBtn ); }, false);
powerBtn.addEventListener('click',      function () { onChooseOperation( powerBtn ); }, false);

// //bind event for parameters
paramA.addEventListener("keypress", onParameterChanged, false);
paramB.addEventListener("keypress", onParameterChanged, false);
paramA.addEventListener("keyup", function () { calculate(); }, false);
paramB.addEventListener("keyup", function () { calculate(); }, false);
//TODO aim for a purer funcion ?
function onParameterChanged(e){
    //prevent key press that is not number
    var keyCode = e.keyCode;
    if( e.charCode < 48 || e.charCode > 57 ) {
        e.preventDefault();
    }
};

var operations = [ plusBtn, minusBtn, multipleBtn, divideBtn, powerBtn ]; 

function onChooseOperation( button ) { 
    //clear all button state
    for (var i = 0; i < operations.length; i++) {
        operations[i].removeAttribute( "class" );
    }
    //render the clicked button elegently 
    button.className = "selected";

    calculate();
   
  }
  
  function calculate() {

    //00 validate
    if( !validateNumber( paramA ) | !validateNumber( paramB ) ) {
        result.value = '';
        return;
    }

    var operation = getActiveOperation();
    if( operation == null ) {
        result.value = '';
        return;
    }

    //01 calculation
    var a = eval( paramA.value );
    var b = eval( paramB.value );

    switch(operation) {
        case '+':
            result.value = a + b;
            break;
        case '-':
            result.value = a - b;
            break;
        case '*':
            result.value = a * b;
            break;
        case '/':
             result.value = a / b;
            break;
        case '^':
            result.value = Math.pow( a, b );
            break;
        default:
           break;
    }


  }

  function getActiveOperation() {
    var selectedOperation = null;
    for (var i = 0; i < operations.length; i++) {
        var btnClass = operations[i].getAttribute( "class" );
        if( btnClass == "selected" ) {
            selectedOperation = operations[i].value;
        }
    }
    return selectedOperation;
  }

  
function validateNumber( textbox ){
    var result = true;
    if( textbox.value.length == 0 || isNaN( textbox.value ) ) {
        textbox.value = '';
        result = false;
    }
    return result;
}