console.log('loading calculator renderer...');


const dataHandler = require('../DataHandler.js');

//get all controls
var plusBtn = document.querySelector('#opPlus');
var minusBtn = document.querySelector('#opMinus');
var multipleBtn = document.querySelector('#opMultiple');
var divideBtn = document.querySelector('#opSlash');
var powerBtn = document.querySelector('#opPower');
var paramA = document.querySelector('#paramA');
var paramB = document.querySelector('#paramB');
var result = document.querySelector('#result');
var btnLoad = document.querySelector('#btnLoad');
var btnSave = document.querySelector('#btnSave');

//add event for operations
plusBtn.addEventListener('click',       function () { onChooseOperation( plusBtn ); }, false);
minusBtn.addEventListener('click',      function () { onChooseOperation( minusBtn ); }, false);
multipleBtn.addEventListener('click',   function () { onChooseOperation( multipleBtn ); }, false);
divideBtn.addEventListener('click',     function () { onChooseOperation( divideBtn ); }, false);
powerBtn.addEventListener('click',      function () { onChooseOperation( powerBtn ); }, false);

btnLoad.addEventListener('click', function () { loadData(); }, false);
btnSave.addEventListener('click', function () { saveData(); }, false);

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
    highlightOperation( button.value );
    calculate();
  }

  function highlightOperation( selectedOperation ) {

    //clear all button state - except it is the one being highlighted
    for (var i = 0; i < operations.length; i++) {
        var btnValue = operations[i].getAttribute( "value" );
        if( btnValue == selectedOperation ) {
            //render the clicked button elegently 
            operations[i].className = "selected";
        }
        else {
            operations[i].removeAttribute( "class" );
        }
    }
  }

  function saveData() {
    var dataJson = {
        paramA: paramA.value,
        paramB: paramB.value,
        operator: getActiveOperation(),
        result: result.value
    };
    dataHandler.saveData( dataJson );
  }

  function loadData() {
    dataHandler.loadData( ( loadedData ) => {
        paramA.value = loadedData.paramA;
        paramB.value = loadedData.paramB;
        result.value = loadedData.result;
        highlightOperation( loadedData.operator );
    });
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