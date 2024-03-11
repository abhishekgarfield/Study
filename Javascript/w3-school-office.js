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

// Start https://www.w3schools.com/jsref/ after completing docs

// ********** JS OBJECTS ***************
let obj1 = {name: "Testuser", roll: 23 , print:function(){console.log(this,"----",this.name,"-----",this.roll)}}
obj1.print()

// ************ JS STRINGS **************

let str56 = "";
let templateString = `Hello user` //introduced in es6 called TEMPLATE STRINGS  , enclosed in backticks
console.log("-------template string -------",templateString)
var MultiString = `hello multiline
string using templates `            // templates allow multiline strings
console.log("---multiline template string---",MultiString)

// ******************** JS STRING METHODS **************

// --------     Extracting string charachters
/*
-- charAt(position);
-- at(position); // introduced in es2022 // allows use of negative values but charAt doesnt
-- charCodeAt(position) // returns the utf-16 code of a charachter at that index
*/

let str = "Testingmoveitpro";
// console.log(str.at(-2)) ; // we can give it negative values and it starts searching from last index of string
console.log(str.charAt(str.length -2))
console.log(str.charCodeAt(0))


// ------------ Property access

console.log("------property access ------",str[0]) // property access is read only

// ------------ Extract substrings form string

console.log("----- substr --takes start and length----",str.substr(1,2));
console.log("--------substring ---start and end ----",str.substring(1,3));
console.log("-------string original value -------",str);

//  Slice method
console.log("--------slice --start and end-----",str.slice(1,3)); // returns extrated string in new string
console.log("---- imitting secong parameter that is end from slice ----",str.slice(1));
console.log("----- negative values in slice ----",str.slice(-14)) // starts counting from end of string

// Upper and lower case
console.log("------- ste uppercase ----",str.toUpperCase(),"-------to lower case ----",str.toLowerCase())


// JS joining strings

console.log("-----concat strings --------",str.concat("hello conacat"));

// JS trim methods
// trim methods are used to remove white spaces from string
console.log("----- trim method ------","     helllo    asdasd   asdasd       ".trim())
console.log("------ trim start -----","    helo trim start    ".trimStart(),"-------trim end ------","   ----  ----  trim end ---  ".trimEnd())
// trimstart and end were added in 2019 and remove white spaces from start and end respectively

// JS string padding ------ Es2017 features -----
console.log("----- pad start =-----","h4".padStart(4,"0")) // adds particular charachter at start of string until it reaches specified length
console.log("------- pad end ------","0".padEnd(5,"3"));

// JS string repeat
console.log("------- repeat is es6 feature -----","test".repeat(4))

// JS string replace

console.log("------- replace ----","test hello test".replace(/hello/g,""));

// JS string to array

console.log("-----string to array-----","test hello abhishek".split(" "));
console.log("----- split with no params -----","test hello abhsihek".split("")) // gives single single charachter


// ******************** JS string search ***************
console.log("------- index of -----------","test hello".indexOf("sfsd"),"-----lastindex of ---","hello".lastIndexOf("l"))
console.log("test abhishek  el".indexOf("test",4),"----- index of accepts second param where in we can specify to start searching from position")
console.log("------ search method of strings ------","test hello tasd".search(" st")) // returns index f search string and -1 if that doesnot exist
console.log("------ includes ------","test hello".includes("hello")) // returns a boolean value

// indexOf cannot take regular expression and search method can take regular expressions

console.log("---- string match method ----","test hello test test".match(/test/g)) // returns all instances of matched value

console.log("------- includes of string -----","test test hello".includes("test",10)) // takes second argument as where to start from searching


// starts with endswith -----

console.log("------ startwith is an es6 feature -----","test hello test".startsWith("test"))

// JS string templates

let teststring23 = `hello "user"`;
let y = 10;
console.log(`hello this is string interpolation ------${teststring23}`) // string interpolation adding variables inside a string

// *************** JS numbers ******
// NAN is a reserved word for indicationg that a number is not a number

let testNum89 = 23/"a";
console.log("----NAN -----",testNum89,"---isNAN()--",isNaN(testNum89))

// Infinity

console.log("----- inifinity ----",Infinity) // initializ a loop for infinity no ending value

// ********** JS number methods *******
var num34= 9
console.log("-------- to String ----",num34.toString());

console.log("---- to exponential -----",num34.toExponential(2));
let num67 = 8.9898;
console.log("----- to fixed -----",num67.toFixed(2),num67.toFixed(3));
console.log("------ number.isInteger -----",Number.isInteger(32)); // Can be accesed with number only


// ************* array methods *********

var arr45 = [1,2,3,4];
console.log("----push--pushed element at end of arr---",arr45.push(5),"----- pop remove element from end of list-------",arr45.pop(),"-----original arr -----",arr45)
console.log("------ unshift adds element to first index and shifts others----",arr45.unshift("first"),"---- shift method pops first elemnt and shifts others to prev index ---",arr45.shift(),"----orignal arr ----",arr45)


// array concatination ------
var arr56 = [1,2,34,56];
var arr67 = [32,345,43];
console.log("---- cocat method ----",arr56.concat(arr67));

var flattenArr = [[1,2,3],[[4,5]]];
console.log("------flatten an array ----",flattenArr.flat(2)) // flattems an array

// splice method
var arrFruits = ["banana","aple"];
console.log("-------splice arr.splice(start,removed,...elements)",arrFruits.splice(1,1,"kiwi"),"original arr---------",arrFruits)

// slice method accepts start and end and if only one parameter is given it slices complete arr

console.log("---arr.alice(0,1)",arrFruits.slice(0,1)) // slices arr from first till secong index

// ******* JS array search **************

// array indexOf , lastIndexOf, includes , find , findLast , findIndex , findLastIndex
var arr = [2,4,3,4,2];
console.log("--indexOf--",arr.indexOf(2),"-----last index -----",arr.lastIndexOf(2),"------includes(ele, start)----",arr.includes(2,2));
console.log("-------find--1st instance-",arr.find(num=> num >2),"--------findIndex-----",arr.findIndex(num => num >2))

//******************    JS ARRAY SORT ********* */

//sORT METHOD mutation methhods because changes original array

var arr578 = [3,2,5,1];
let arr90 = ["banana","apple","kiwi"]
console.log("-----sort()-----",arr578.sort(),"----alphabateical sort -----",arr90.sort());

// Reverse method

console.log("original array ------",arr90,"---",arr578,"----- reverse numeric arr ----",arr578.reverse(),"------alphabetical arr reverse -----",arr90.reverse())

// toSorted was introduces in 2023
// sort alters the given array and toSorted gives a new array without canging original array

// console.log("-----[1,3,4,5]---tosorted-",[1,3,4,5].toSorted());

// toReversed was also introduces in 2023 so that to preserve original array

//console.log("--------[1,3,2,4].toReversed()----",[1,3,2,4].toReversed());


// Numeric sort
//by default sort function sorts values as strings
// if numbers are sorted as strings "25" is bigger than 100 because 2 is greatr tahn 1

// giving compare function to sort method returs 3 values positive , negative , zero and sorts them according to there values;

// max and min from array

console.log("--------math max from array -------",Math.max.apply(null,arr),"-----array min ----",Math.min.apply(null,arr))

// ******** JS Array iterations *************
// map filter some , foreach , flatMap

console.log("----- flat map -- first flattens the result arr then shows resultes ----",arr.flatMap(num => [num*2]),"------- map results for flattened results -----",arr.map(num=>[num*2]))

// reduce method runs from  left to right and takes initial argument

console.log("original arr ----",arr,"----reduce method with initial =200",arr.reduce((total,num)=> total-num))

// reduce right starts from right to left

console.log("-----reduce rught ----",arr.reduceRight((total,num)=>total-num))

// every checks for every ele to pass the scenario and some watches for only one or more cases to pas teh case

console.log("----original arr = ---",arr,"------every--->3-",arr.every((num)=>num>3),"-----some >3----",arr.some((num)=>num>3))

// keys and entries
// var ty= arr.entries()
// console.log("------arr entries -----",ty.forEach((num)=>console.log("------num===",num)))

// with method is used to update arrays without altering original array ES2023

// console.log("------with to alter array without destroying prev array ----",arr.with(2,100));

// ************ JS Dates **********

//new Date(year,month,day,hour,minute,second,ms)
new Date();

// ***************** JS date get methods ------

let d = new Date();
console.log("----getDate------",d.getDate(),"-----getDay----",d.getDay(),"----getFullYear-----",d.getFullYear(),"----getMilliseconds----",d.getMilliseconds())

// **************** JS Date set methods ************
console.log("-------date 000000-----",d,"----set methods -----",d.setMonth(11),"-------d----",d);

// JS MATH **************

console.log("---- math.pi -----",Math.PI, "----- math.ceil(4.6)----",Math.ceil(4.6),"------math.floor(4.8)",Math.floor(4.8),"----math.round(4.5) -----",Math.round(4.5))


// JS RANDOM *****************

console.log("------- random generates digits betwen 0 to 1 ---",Math.random());
console.log("---- generate random number in 0-9----",Math.floor(Math.random() * 10));

// method to get random number sin a range

function getRandom(start,end){return Math.floor(Math.random() * (end-start) + start)}

console.log("---- getRandom(10,30)----",getRandom(10,30));

// ********* JS Booleans ******************

console.log("----- falsy values ------",Boolean(""),Boolean(null),Boolean(undefined),Boolean(0),Boolean(-0),Boolean(-23)); // anything without value is false

// *************** JS COMPARISIONS ************
// === CHECK FOR TYPE AND VALUE
console.log("---- COMPARING WITHOUT TYPES ---- 5",5=="5",5==5,5==="5")

//------ nil coelescing operator -------
// if there is a null value  it assigns the optional value ;
let yuo = null;
let test678 = yuo ?? 10
yuo = 100;
let test567 = yuo ?? 20;
console.log("------- nil coelescing -----with null ---", test678 ,"-----without null ------",test567);

// Optional chaing operator
// checks for null and undefined value and soesnt let statement proceed further if errors

var obj989 = {"arr":[1,2,3,4],arr2:[]};
console.log("------ optional chainging operator -------",obj989.arr5)

// JS SWITCH *********************
// switch cases use strict comparison

let day78 = 10;

switch(day78){
    case 1:
        console.log("----sunday");
        break;
    case 10:
        console.log("----mondya");
        break;
    default:
        console.log("---default--")
}

// JS LOOP FOR ***********
// expression 1 for initialization ,,, expresion 2 for comparison and helt ,,, expression 3 for incremensts
for(let i =0 ;i<10;i++){
    console.log("----- i-----",i);
}

// find sum of 2 numbrs = arr[ele]
function SumToArr(arr,total){
    arr.sort((a,b)=>a-b);
    for(i=0,j=arr.length-1;i<arr.legth,j>i;){
        if(arr[i]+arr[j] == total){
            return[arr[i],arr[j]];
        }else if(arr[i]+arr[j] > total){
            j--;
        }else{
            i++;
        }
    }
    return 0;
}
console.log("-----2 pointe rproblems ------",SumToArr([1,3,2,5],5))

// *********** JS LOOP for in ***********
// donot us efor in oop where index order is important

var arr234 = [1,2,3,4];
var obj234 = {name:"asdasd",test:"asdasd"}
for (x in arr234){
    console.log("----- for in loop arr -----",x)
}
for(key in obj234){
    console.log("------for in loop in obj-----",obj234[key])
}


// JS LOOP FOR OF **************
// used to loop through iteratable structures ,, arrays strings maps nodelists

for (let x of arr234){
    console.log("----foe of loop over arr ====",x);
}

// for(let x of obj234){
//     console.log("------for of on an object ---",x);
// }

let string234 = "testing mic check 1234";

for (let x of string234){
    console.log("----string for of loop -----",x);
}
// while and do while loop ***************

var ionoc = 0
while(i<5){
    console.log("----i in while ----",ionoc);
    i++;
}

do{
    console.log("-----i in do while ---",ionoc);
}while(ionoc<0);


// JS BREAK statement ***************
// it is used to jump out of loop

for(let i in arr234){
    if (i == 2){
        break;
    }
    console.log("----ioiii with break----",i)
}
// labelled or unlabeled continue can only be used to skip one iteration
// labelled break can be used to jump out of any code block;
var text = "";
const cars = [1,2,3,4];
list: {text+=cars[0];text+=cars[1];break list;text+=cars[2]}
console.log("----labeeled break to exit cod eblock----",text);

// JS ITERATABLES *************
// maps, arrays, sets, strings
var m = new Map([["asdasd",2,1],["asdsder",3]])
m.forEach((txt,index)=>console.log(txt,index))

var set657 = new Set([1,2,4,3,4,3]);

for (x of set657){
    console.log("---set iteration ----",x)
}

// js Maps ****************

var testMap = new Map();
testMap.set("a",1);
testMap.set("b",2);
console.log("------get metahod of maps -----",testMap.get("a"));
console.log("---- map has ------",testMap.has("b"));
for (x of testMap){
    console.log("---- test mao 0-----",x)
}
testMap.forEach((value,key)=>console.log("----key----",key,"value -----",value));

// ************ JS TYPE OF
/*
tHERE ARE 5 DIFFERNT TYP EOF DATA TYPES TAHT CAN CNTAIN VALUE
1) string
2) number
3) boolean
4) object
5) function

there are 6 type of objects
1) arrays
2) objects
3) dates
4) strings
5) number
6) boolean

there are 2 type of data type sthat cannot contain values
1) null
2) undefined

*/

console.log("-typeof 3.14,typeof 2 ,typeof 'asd', typeof function(){} , typeof {},typeof [] --",typeof 3.14,typeof 2 ,typeof "asd", typeof function(){} , typeof {},typeof [] );

// construcor property returns construction function for all js variables
console.log("-----constructor ---",[].constructor,{}.constructor,"".constructor,(3.14).construcor);

// instance of

// [] instanceof Array
// {} instanceof Object

// void operator ***************
// returns undefined after evaluating an expressin

// ********** JS REGEX **********

var pattern = /abhishek/;
var statement = "hello abhishek hie abhishek what is up"
console.log("----- match all instances of abhishek ----",statement.replace(/abhishek/gi,"tiwilio"));
console.log("---- test method for testing regex -----",pattern.test(statement));
console.log("----exec method -----",pattern.exec(statement)) // execute returns object with index and value of pattern

//**********JS PRECEDENCE ********* */

// * and / have higher precedence than =  and -

// operators with same presedence are calculated left to right

// *************** JS ERRORS ***************

function err(num){
    try{
        if(num <2){
            throw "too low";
        }else{
            num/0;
        }
    }catch(err){
        console.log("----err-----",err)
    }
}

err(2);


// js strict mode ************
// prevents us from  using undeclaed variables;

// ************** JS ARROW FUNCTIONS *****************
