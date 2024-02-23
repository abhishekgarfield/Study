var num1:Int = 13 // variable
let num2:Int = 14 // constant 14 == literals are representing constant values assigned to variables

//types of variables
var num3:Int = 1;
var num4:Float = 2.3;
var str1:String = "test";
var str2:Character = "c";
var bool1:Bool = true;
var num5:Int? = 12; // optionals

// Strings are always represented with ""
/* Multiline comment */

var multString1:String = """
hi this is
a multiline string
"""

print("---------\(multString1)--------") //string interpolation
var num6 = readLine();
print("-----------\(num6!) ----------readline is used to get user input-----");
print("--Empty----\(multString1.isEmpty) -----Count-----\(multString1.count)--------");

print("============\"----print escape sequence----\"------\n----next line -------");

//creating instances

var str3 = String();
var num7 = Int();
var num8 = Float();
// var char1 = Character();

print("------ default values -------\(str3)--- \(num7)--- \(num8) --- ");


var opt1:Int? = 45
print("------- opt1 -----\(opt1!)")

if(opt1 == nil){
    print("----- opt 1 is nil -----")
}else{
    print("------- opt1 = \(opt1!)-----")
}

if let a = opt1{
    print("-------\(a)=====")
}else{
    print("------opt1 is null ")
}

func testGuard(){
    guard let a = opt1 else{
      return  print("------opt1 is nil---")
    }
    print("-----opt is --\(a)--")
}

testGuard();

var num9 = opt1 ?? 1 //nil coelscing operator

print("----- nu 9 ---- \(num9)")

var opt2:Int! = 2;
var opt3:Int? = 2;

print("----- optionals --- opt2--\(opt2!) -----opt 3-----\(opt3!)")


var arr = [1,2,3,4];

for i in arr{
    print("----- arra i ---\(i)--\n")
}

for i in arr where i != 3{
    print("----- where i for loop ------\(i) --\n")
}

for i in 1...10{
    print("----- i in range -----\(i)--\n")
}

for i in stride(from: 1, to: 10, by: 2){
    print("----- i in stride -----\(i)---\n")
}



// for loop is used when number of iterations are known
// while and repeat whilw are used when number of iterations are not known

var num10:Int = 10
while(num10 > 1){
    print("----- while ------\(num10)");
    num10-=1;
}

var num11 = 1
repeat{
    print("----num 11 repeat while --- \(num11)-\n");
    num11+=2;
}while(num11 < 10)

// switch statement

var day:Int = 1

switch(day){
    case 1:
    print("--sunday--");
    fallthrough; //used to excecute current statement and also execute next case;
    case 2:
    print("--monday--");
    default:
    print("=== other seven days==")
}

var tup1 = (1,"test") // tuples

switch(tup1){ // tuples with switch statements
    case(1,"test2"):
    print("--- exec first ---");
    case(1,"test"):
    print("---- exec second ----");
    default:
    print("--- no tuple matched===")
}


// break statements

for i in 1...3{
    if(i==2)
    {
        print("---- breaking loop on -- \(i)")
        break;
    }
     print("----- executing break loop \(i)")
}

// labelled break and unlabelled break
// with abelled break we can exit any loop we want to
// with unlabbled break we can only exit loop in which break is used


/* example of unlabeled break */

for i in 1...3{
    for j in 1...3{

        if(j==2){
            break;
        }
        print("---00--- i ----\(i) -----j -----\(j)")
    }
}

/* example of labeled break */

firstLoop: for i in 1...3{
   secondLoop: for j in 1...3{

        if(i==2){
            break firstLoop;
        }
        print("------ i ----\(i) -----j -----\(j)")
    }
}
// continue statement
/* example of unlabeled continue */

for i in 1...3{
    for j in 1...3{

        if(j==2){
            continue;
        }
        print("---00--- i ----\(i) -----j -----\(j)")
    }
}

/* example of labeled continue */

firstLoop: for i in 1...3{
   secondLoop: for j in 1...3{

        if(i==2){
            continue firstLoop;
        }
        print("------ i ----\(i) -----j -----\(j)")
    }
}
// guard statement

var num12:Int = 10
while(num12 > 1){
    // num12 = num12 - 1;
    // print("--asd-a-sd-as-d-")
    // num12+=1
    guard num12%2 == 0 else{
      print("---- odd number ----- \(num12)--\n")
      num12 = num12-1;
      continue; // we need to use continue to submit it to use next iteration
    }
    print("------ even number -----\(num12)");
    num12 = num12-1;

}

// collectiona

// 1 Arrays

var arr2:[Int] = [1,2,3,4]; // can only store numeric values

print("-------\(arr2[1])");

arr2.append(6);
arr2.remove(at: 1)
arr2.insert(32,at: 2)
print("-----arr2 ----\(arr2)")

var arr3 = [Int]() //create empty array
print("-----\(arr3)")

arr3.insert(2,at: 0);
print("-------arr3 -----\(arr3)")
arr3.append(contentsOf: arr2);
print("------arr3---\(arr3),---- length ----\(arr3.count) ----- is empty -----\(arr3.isEmpty) ----- SORT -----\(arr3.sort())----");

arr3.forEach {print("-----\($0)")}

arr3.forEach({(i) in
print("--i--\(i)")})

var arr4 = [Any]() // create empty array which can have any data type value

arr4 = [1,2,3,"test",5.5];
print("----arr4 -----\(arr4)")

var set1: Set = [1,2,3,4]

print("-----set1 ----\(set1)");
set1.remove(3);
set1.insert(2);

print("------set 1 ----\(set1)")

var set2: Set<String> = ["test3","test"]

print("------set2 ----\(set2)")

set2.remove("test")

print("------set2 ----\(set2)")

var set3: Set<Int> = [1,2,3,4];
var set4: Set<Int> = [2,4,5,6];
print("-----set3 -----\(set3) -----set4 ----\(set4)")
print("------ union -----\(set3.union(set4))-----\n ------ intersection ----\(set3.intersection(set4)) ---\n -------difference ----\(set3.subtracting(set4))----\n -----symmetric differnce----\(set4.symmetricDifference(set3))")

var set5:Set<Int> = [1,2];
print("------set 5 0000 ----\(set5.isSubset(of: set3)) ----- set 4  -----\(set4.isSubset(of: set3))----- equality ----\(set3 == set5)")

var set6 = Set<Int>();
var arr7 = [Int]();
var num13 = Int();
var flt1 = Float();

print("---default values -----\(set6) -----\(arr7) ----\(num13) ------\(flt1)")

/* ---------- dictionary values are stored in pair of key value ------ */


var dict1 = [1:"a",2:"b",3:"c"];

dict1[4] = "d";
dict1.removeValue(forKey: 2);

print("---------\(dict1)----")

var dict2:[Int:Int] = [1:2,3:4];
print("-------\(dict2)");


for (key,value) in dict1 {
    print("=======key \(key) -----value ----\(value)--")
}

// creating empty dictionary

var dict3 = [Int:String]();
print("------ empty dict ----- \(dict3)")

var dict4:[String:Int] = ["b":2];

print("-----dict4 \(dict4)")

// tuples -- are used to store differnet type of values

var tup2 = (1,"macbook");
print("------tuple ----\(tup1) ------\(tup1.1)--------\(tup1.0)")

tup2.0 = 59 ;

print("------ tup update. \(tup2.0)")
// nested tuples

var tup3 = (3,4,5,(6,7,8));


print("-------\(tup3)------\(tup3.3.2)")

//named tuples like dictionary

var tup4 = (test:"a",test2:"3");


print("-------tup4------\(tup4) -------\(tup4.test)");


var tup5 = (1,2,3,[1:"a",2:"b"]);

print("------- tup5 -------\(tup5) -------");

tup5.3[3] = "test56";
print("---------updated tuple 5 ------\(tup5)")


//  function

import Foundation //library imorted for math functions

func add(num1: Int, num2: Int) -> Int{
    return num1 + num2
}
// if we are returning something from function we need to sepcift returntype otherwise it throws error

var test = add(num1:1,num2:2)

print("--------- sum of 2 numbers -------\(test)")


print("----- power -----\(pow(2, 2))--\n---square root----\(sqrt(25))")


func Double(num1:Int) -> Int{
    return num1*num1
}

for i in  1...4{
    print("-------\(Double(num1: i))")
}

// function with defualt arguments

func test2(num1:Int = 2, num2:Int = 4) -> Int{
    return num1+num2
};

print("------with vaues given ------\(test2(num1:1,num2:3))------with one given arguments -----\(test2(num1: 5)) ----- with no arguments given ----\(test2()))")

// argument labels

func test3(a num1:Int, b num2:Int) -> Void {
    print(num1*num2)
}

test3(a: 12, b: 2)

// omit srgument labels

func test4( _ num1:Int, _ num2: Int){
    print("----- omitted vals ----\(num1*num2)")
}

test4(2,2);

// we cannot change arguments of a function once function is called // gives error error: cannot assign to value: 'num1' is a 'let' constant

// we use inout to do change arguments values

func test5(num1:inout String){
    num1 = "testing change"
}

var str12 = "test"
test5(num1: &str12);
print("------str12 -----\(str12)")


// function with variadic params

func test6(numbers: Int... ) -> Int{
    var sum = 0 ;
    for i in numbers {
        sum+=i
    }
    return sum;
}

print("-----------\(test6(numbers: 1,2,3,4))------")

//return multiple values from function

func test(_ num1:Int) -> (Int,Int,Int){
    return(num1,num1*num1,num1*num1*num1);
}
print("----------multiple return values ---------\(test(2))")


// Nested functions : swift can have function inside function
// if we try to call inner function from outside of outer function we will get error use of unreslolved identifier

func Test7(){
    print("---- good morning ----")
    func test8(){
        print("------ test users -------")
    }
    test8();
}

Test7()

// passing arguments to inner function from outer function

func test9(num1:Int)->Int{
let dub = num1*num1;
let t = cube(num2: num1, dobule: dub)
func cube(num2:Int, dobule:Int)->Int{
    return num2*dobule
}
return t
}

print("-------test 9 ---\(test9(num1:2))")

// returning a function from outer function

func Test11(_ oper:String) -> (Int,Int) -> Int {
    func add(_ num1:Int, _ num2:Int) -> Int {
        return num1 + num2;
    }
    func sub(_ num1:Int, _ num2:Int) -> Int {
        return num1 - num2
    }

    let operation = oper == "+" ? add : sub

    return operation;
}

let operation = Test11("-")
print("---returning complete add subtract function from outer function----\(operation(4,2))=--------")

// recursive functions -- functions that call itself

// countdown with recursion

func countDown(num1:Int) -> Void {
    if(num1 == 0 ){
        print("----- count down stops-----")
    }else{
        print("-------- \(num1)");
        countDown(num1: num1 - 1);
    }
}
countDown(num1: 5)

// factorial series

func fac(_ num:Int) -> Int {
    if(num == 1){
        return 1;
    }else{
        print("-----  num -----\(num)")
        return num * fac(num - 1)
    }
}

print("------ factorial of 4 -----\(fac(4))")


// swift ranges

/*
... is s range operator
1...2 constains value 1 2 3 4
1 is lowerlound
2 is upperbound
*/

/*
types of range operators
1) closed range
2) half open range
3) one-sided range
*/

// closed range

for i in 1...4{
    print("------closed range ------\(i)")
}

for i in 1..<5{
    print("---- half open range right operand ----\(i)")
}

var range = 2...
var range2 = ..<3

print("----- one sided range ----\(range.contains(2))------\(range2.contains(-1))")

var arr = [1,2,3,4]

print("---- print array elements using range -----\(arr[2...])")

// function overloading ... swift can have multiple functions with sam ename
// function overloading depends on paramneter typesnot return type

// function overloading with differner argument data types

func test12(num1:Int) -> Int{
        print("---numeric fxn---")

    return num1;
}
func test12(num1:Double) -> Double{
    print("---double fxn---")
    return num1;
}

print("------ numeric ---- \(test12(num1: 12)) ---- Double -----\(test12(num1: 12.23))")

// function overloading with different number of parameter

func test13(num1:Int,num2:Int)->Int{
    return num1+num2
}
func test13(num1:Int)->Int{
    return num1
}

print("------- test 13 qith 2 arguments ----\(test13(num1:2,num2: 3))-------- with one arg ---\(test13(num1: 34))")

// function overloading with different argument labels

func test14( _ num1: Int) -> Void{
    print("----- in omit of label ----\(num1)")
}
func test14(a num1: Int) -> Void{
    print("----- in a of argument label --- \(num1)")
}
test14(1);
test14(a: 34);

func test15(num1: Int) -> Void{
    print("----- in omit of label ----\(num1)")
}
func test15(num2: Int) -> Void{
    print("----- in a of argument label --- \(num2)")
}
test15(num1: 58);test15(num2: 67)

// closures -- is a special type of function without a functiona name

var print2 = {
    print("---- hello world ------")
}
print("------- closure first ------\(print2())")

var test16 = {(num1:Int) -> Int in
    print("-----test 16 num in closure with arguments ----\(num1)");
    return num1;
}

print("----- test 16 with args ----- \(test16(15))")


// send closures as fxn arguments

var cl1 = {
    print("---------passing closure----")
}

func goCheck(clos: ()->())->Void{
    clos();
}

goCheck(clos: cl1)

// trailing closure

func goCheck(message: String, clsr: ()->()) -> Void {
    print("---- message ------\(message)");
    clsr()
}

goCheck(message: "hello tester -----", clsr: {
    print("----- hello world 12323 ----")
})

//autocloser
// auto closer is used so that we dont have to use culry braces // it automatically adds curly braces

func goCheck(clsr: @autoclosure ()->()) -> Void {
    clsr()
}

goCheck(clsr: print("----- helo mike 12345 ---"))


// ****** ***** **** CLASSES AND OBJECTS

//class is a blueprint

class Cls{
    var name="test";
    var model=234
}
// object is called an instance of a class
var obj = Cls();
print("-----\(obj.name)--\(obj.model)---")

var obj2 = Cls()

obj2.name = "test234";
print("--obj2 changes ----\(obj2.name)---")
var arr:[Int] = [1,2,3,4];

print("-----\(arr[0...2])-")
var test1000:Int = 34

// class to check area of room and store dimensions

class Room{
    // properties of class
    var height:Int = 0;
    var width:Int = 0;

    // calculate area method of class

    func calArea()->Void{
        print("---arae of study room -----\(height*width)-----")
        height = height + 30;
        print("----- height change ********* ------\(height)-----\(self.height)")
        }

}

var studyRoom = Room();
studyRoom.height = 10;
studyRoom.width = 10;
studyRoom.calArea()

// initializers for initializing properties with object

class Bike{
    var name="";
    var gear:Int = 0

    init(_ name:String,_ gear:Int){
        self.name = name;
        self.gear = gear
    }

    func printBikeDetails(){
        print("----- bike name is \(name) ----- gears are \(gear)");
    }
}


var bike1 = Bike("Ktm" ,6);
bike1.printBikeDetails()

// struct vs class

/* classes are refrence types and concept of oops */

class Car{
    var color:String = ""

    init(_ color: String){
        self.color = color;
    }
}

var car1 = Car("red");
var car2 = car1 ;
car2.color = "blue";

print("----- car1 ----\(car1.color) ---- car 2 ----\(car2.color)") // here we can see on changing color of car 1 the color of car 2 is also changes because they share same copy of data



struct Carstruct{
    var color:String = "";
    init(_ color: String){
        self.color = color
    };
}

var car3 = Carstruct("red");
var car4 = car3
car4.color = "blue"
print("----- car1 ----\(car3.color) ---- car 2 ----\(car4.color)") // these are of value type they hold individual copy of data

// ********** ****** ***** SWIFT PROPERTIES

// A SWIFT VARIABLE OR CONSTAT DEFINED INSDE CLASS IS CALLED PROPERTY // ALSO called stored properties

// computed properties

class Sum{
    // defined 2 stored properties
    var num1:Int = 0;
    var num2:Int = 0;


    init(_ num1:Int, _ num2:Int){
        self.num1 = num1;
        self.num2 = num2;
    }


    // defined one coputed property
    var sum: Int {
        num1 + num2
    }

    var mult: Int {
        get {
            num1*num2
        }

        set(modify){
            num1 = (modify + 10);
            num2 = (modify + 20);
        }
    }

}

var obj45 = Sum(2,4);

print("------computed property sum ---- \(obj45.sum)");
print("--------mult ---- getter  ----\(obj45.mult)---------")
obj45.mult = 5;
print("-------------num1 and num2 mofdifed in setter of compute property --num1--\(obj45.num1)--- num2 ----\(obj45.num2)")
// including getter and setter in coputed properties
// getter is used to retrieve value from computed propety
// setter is used to change value of properties or to modify it


class University{
    static var  name:String = "";
    var founded:Int = 0;

    init(_ founded: Int){
        self.founded = founded
    }


}

var uni1 = University(1234);
University.name = "jaypee university";
var uni2 = University(3456);
University.name = "shitkara";

print("------uni1----\(University.name)")


// ****************** SWIFT METHODS ***************

// functions defined inside a class are called methods


class Calculator{
    func add(_ num1:Int, _ num2:Int)->Int{
        return num1+num2
    }

    static func multiply(_ num1:Int, _ num2:Int)->Int{
        return num1*num2
    }
}


var calc1 = Calculator();

print("---- multiplu using static method ----\(Calculator.multiply(2,5))----- add using non static method ----\(calc1.add(5,6))")

// mutating methods
// self is used to specify that this variabvle belobgs to object not method parameter
// we cannot change properties defined inside a struct using methods

struct Employee{
    var salary:Int = 0;

    init(_ salary:Int){
        self.salary = salary
    }

    mutating func increasSalary(inc:Int){
        salary += inc
    }

    func printSalary(){
        print("---- cureent salary is \(salary)")
    }
}

var emp1 = Employee(1000);
emp1.increasSalary(inc:4000);
emp1.printSalary();

// *************** SWIFT INITIALIZERS ******************

// INITIALIZER OVERLOADING

class Person{
    var age:Int = 0;

    init(){
        age = 20
    };

    init(_ age:Int){
        self.age = age
    }

    func getAge(){
        print("-----age --------\(age)")
    }
}


var person23 = Person();
person23.getAge();
var person56 = Person(56);
person56.getAge();



// primary initializers are called designated initializers

// convinience initializers are used to assign default values to stored properties

class University1{
    var name:String = "";
    var rank:String = ""

    init(name:String , rank:String){
        self.name = name;
        self.rank = rank
    }

    // define convinience init

    convenience init(){
        self.init(name: "juju", rank: "1st")
    }
}

var uniObj = University1();

print("----- uniobj1 -----\(uniObj.name)")

// DEINITIALIZATION **********************
// it is used when we want to deallocate memory given to class instances

class Race{
    var laps:Int;

    init(){
        laps = 5;
        print("Race completed");
        print("---- laps = \(laps)")
    }

    deinit {
        print("-- memory deallocated--");
    }
}



var r1:Race? = Race();

r1 = nil;


// deinitaializers can only be used with classes not structs --- deinitializers can only be used once per class --- swift automaticaaly does the deallocation


// ****************** INHERITANCE ******************

/* IS USED TO CREATE SUBCLASS CHILD CLASS OR derived class and parent class is also called superclass */

// subclass inherits all properties and methods of super class or parent class

