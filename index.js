'use strict';

var promisify = require('function-promisify');
var event = require('simple-event');

function observable(initialState) {
 var state = initialState;
 var changeEvent = event();

 function onChange(callback, context) {
   changeEvent.subscribe(callback, context);
 }

 function unsubscribe(callback, context) {
   changeEvent.unsubscribe(callback, context);
 }

 function getState() {
   return state;
 }

 function setState(newData) {
   var oldData = state;

   state = newData;
   changeEvent.emit(newData, oldData);
 };

 function updateState(mutator) {
   setState(mutator(state));
 };

 return {
   onChange: onChange,
   unsubscribe: unsubscribe,
   getState: getState,
   setState: promisify(setState),
   updateState: promisify(updateState)
 };
}

module.exports = observable;