console.log('loading calculator renderer...');

//bind event
document.querySelector('#opPlus').addEventListener('click',     function () { onChooseOperation( 'plus' ); }, false);
document.querySelector('#opMinus').addEventListener('click',    function () { onChooseOperation( 'minus' ); }, false);
document.querySelector('#opMultiple').addEventListener('click', function () { onChooseOperation( 'multiple' ); }, false);
document.querySelector('#opSlash').addEventListener('click',    function () { onChooseOperation( 'divide' ); }, false);
document.querySelector('#opPower').addEventListener('click',    function () { onChooseOperation( 'power' ); }, false);

function onChooseOperation( operation ) {
    console.log('ouch! for ' + operation );
  }