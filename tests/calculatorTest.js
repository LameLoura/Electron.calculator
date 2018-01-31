console.log('running calculator.js test');
const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })
  

    it ('only selected button should have class = "selected"', function() {
        //track class of each button
        var plusClass, minusClass, multiplyClass, divideClass,powerClass;
        return this.app.client
                .waitUntilWindowLoaded() 
                .click('#opPlus')
                .getAttribute( '#opPlus', 'class' )
                .then( function ( attribute ) {
                    addBtnClass = attribute;
                })
                .getAttribute( '#opMinus', 'class' )
                .then( function ( attribute ) {
                    minusBtnClass = attribute;
                })
                .getAttribute( '#opMultiple', 'class' )
                .then( function ( attribute ) {
                    multiplyClass = attribute;
                })
                .getAttribute( '#opSlash', 'class' )
                .then( function ( attribute ) {
                    divideClass = attribute;
                })
                .getAttribute( '#opPower', 'class' )
                .then( function ( attribute ) {
                    powerClass = attribute;
                })
                .then( () => {
                    assert.equal(addBtnClass, 'selected');
                    assert.equal(minusBtnClass, '');
                    assert.equal(multiplyClass, '');
                    assert.equal(divideClass, '');
                    assert.equal(powerClass, '');
                });
      });

      it ('only numbers are typeable on parameter textboxes', function() {
        //track class of each button
        var plusClass, minusClass, multiplyClass, divideClass,powerClass;
        return this.app.client
                .waitUntilWindowLoaded() 
                .setValue('#paramA', 'abc1234zzz555')
                .getValue( '#paramA' )
                .then( function ( value ) {
                    assert.equal(value, '1234555' );
                })
                .setValue('#paramB', 'prayuthNoGood12345eiei')
                .getValue( '#paramB' )
                .then( function ( value ) {
                    assert.equal(value, '12345' );
                });
      });


})