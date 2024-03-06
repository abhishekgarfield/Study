// Javascript w3 school ***********

// Javascript advanced --- https://javascript.info/ ---- (Start with w3 school)

// **************** Filepaths ****************
/*
./ = to access files and folders in current folder
../ = 1 directory up from current foler
/ - root of the system
*/

// *************** difference in var let and const *******************

/*
        Reassign    Redeclare   Initialization     Binds-this   Hoisting    Scope
var     true        true        false               true        true        global/functional
let     true        false       false               false       false       block
const   false       false      true                false       false       block

*/


// ************** Hoisting *****************
// Is javascripts default behavior to move decalarations to top
// only variable decalartions are hoisted to top not there initializations
testVariable = 10; // can be used even before declared due to ** Hoisting **
var testVariable;
