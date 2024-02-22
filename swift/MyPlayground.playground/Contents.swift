import UIKit


// var = for declaring variable
// let for declaring constants

var greeting = "Hello, playground";
let first_variable = 6 ; //type interfrence  swift automatocally chooses variable type by seeing default value assigned by us
var first_var = 10;
print("---------\(first_var + first_variable)");
var another_variable_1: Int = 32;
let another_constant_2: String = "Hello abhishek";
/* 4 variable types
 
 1) Int
 2) Double
 3) String
 4) Bool
 
 */

let first_string1 = "Hello"
let second_string2 = " Abhishek"
print("------------\(first_string1.lowercased()+second_string2.uppercased())-------------count = \(first_string1.count)") // This is called string interpolation " \() "

// String.uppercased - is used to convert string onto upper case
// String.lowercased - is used to convert string onto lower case


// small program on tring concatination below

let book_price = 10;
let bookCount = 20;
let totalPrice = bookCount * book_price;
let printVar = "Total price of books is " + String(totalPrice);

// swift is a type safe language which means u need to declare variable type before using it


// Control flow basics

let wakeUpTime: Int = 7;
if wakeUpTime == 6{
    print("cook breakfast !")
}else if wakeUpTime == 7 {
    print("Go for break fast outside !")
}else {
    print("U r too late for breakfast !")
}

switch wakeUpTime{
case 6:
    print("switch cook breakfast!");
case 7:
    print("switch go out for breakfast");
default:
    print("switch U r late");
}


// range operatorz 1000...5000 1000 to 5000

var bonus = 10020;
switch bonus{
case 10000...:
    // greater than or equal to 10000
    print("I will travel to dubai !");
case 2000...4000:
    // less than or equal to 4000 or greater than or equla to 20000
    print("I will travel to paris!");
case ...1000:
    // less than or equal to 1000
    print("I will stay home!")
default:
    print("I am going to bangkok!");
}


// arrays all elements in ana array should be of same type

var books = ["hall of fame", "story pf titans"];
books[0] = "hall";
books.append("Hello history");
print("------------\(books[2])--------length---\(books.count)");
for i in 0...books.count-1{
    print("------in loop --- book name - \(books[i])");
}

// for in loops
let arr2 = [1,2,3]; // constant arrays cannot be changed

// for in iterates through whole array
for num in arr2{
    print("number is \(num)");
}


// Dictionary stores items in an unordered list
var books_shelf = [1: "abhsihek", 2: "sharma"];
books_shelf[1]

for (key, value) in  books_shelf  {
    print("-----key---\(key)---------value-------\(value)")
}

// ctrl + cmnd + spacce for inserting an emoji

var emojiDict: [String: String] = ["💩": "poop", "🤓": "happy face", "🤨": "angry", "😍": "funny", "😔": "Not intrested"]

for (key, value) in emojiDict {
    print("-----------emoji = \(key) ------ value = \(value)");
}

var wrodToLookup = "💩";
if let emoji = emojiDict[wrodToLookup] {
    print("--------------------\(emoji)"); // We need to do optional binding here because it os possible that dictory does not have any value for teh key provided;
}
// before accessing a variable taht may not have a value  swift encourages us to verify it first

// Understanding optionals

var testOptional: String? // indivcates taht varOptional can have a value or no value
// explicitly type the typ eof an optional
// for any optional with no value a " nil " is assigned to it
// nil indicates variable doesnot have a value


var jobTitle: String?
jobTitle = "iOS developer";
// var result = "Hello i am a " + jobTitle  ** this give an error
// we need to do forced unwrapping for optionals that means we need to check if value is nil or not;
if jobTitle != nil {
    var result = "Hello i am a " + jobTitle! // the exclamation mark is special indicator telling xcode taht you ensure optional variable has a value
    print("----------\(result)");
}

// Optional binding is preffered way of dealing with Optionals

if let jobTitle = jobTitle {
    var result = "Hello i am a " + jobTitle // we need not to use exclamation and a new temp constant variabl eis created to check nil value;
}


// A view is a basic UI element in iOS

let containerView = UIView(frame: CGRect(x: 0 , y: 0 , width: 300, height: 300));
containerView.backgroundColor = UIColor.red
var containerLabel = UILabel(frame: CGRect(x:95, y: 50, width: 200, height: 200));
containerLabel.text = wrodToLookup;
containerLabel.font = UIFont.systemFont(ofSize: 100.0); // uifONT is inbuilf
containerView.addSubview(containerLabel);
var meanaingLabel = UILabel(frame: CGRect(x:125, y: 100, width: 200 , height: 200));
meanaingLabel.font = UIFont.systemFont(ofSize: 20.0);
meanaingLabel.textColor = UIColor.blue;
if let emoji = emojiDict[wrodToLookup]{
    meanaingLabel.text = emoji
}
containerView.addSubview(meanaingLabel)


// Xcode provides a interface wher ein we can drag and drop elements to design UI
