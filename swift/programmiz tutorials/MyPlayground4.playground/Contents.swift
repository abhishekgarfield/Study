import UIKit

var greeting = "Hello, playground"

print("Helllo abhishek !")

// var test  comment
/* hello multiline comment */


var test:Int = 01 ; // value can be changed
let test1 = 10 ; // constant variable and automatic assigning
var site:String;
site = "abhishek";
print("Hello \(site)"); // Interpolation


/* naming conventions for variables */
var a:Int ; // type annotation missing if not assigning
var _b = 30;
// var $a = "hello" gives issue

// Swift uses camelCase
// cannot declare a constant without initializing it let name:String // throws error

let name:String = "abhi"; //abhi is a literal // literal is value assigned to a variable
print("------\(name)")

// int float/Double(percision upto 15 decimal points) bool charachter string optionals

//string operations
var str:String = "Hello abhishek";
str.count // length of string
str.append(" hello"); // CHANGES STRING
print("doing interpolation \(str)")
str == "helo abhishek" // comparison
str.isEmpty // checks for empty string
str.capitalized //capitalize first word
str.lowercased()
str.uppercased()
print("doing interpolation \(str)")
str.hasPrefix("H")
str.hasSuffix("o")

var multiLine:String = """
hello "abhsihek"
thsi is a multiline string
"""
// multiline string must start and end on new line with """
print(multiLine)

var newStr = "hello \"abhsihek\" \ntgis" // escape \charachter + new line \n
print(newStr)
