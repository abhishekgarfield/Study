// nested functions
func Operator(_ opt:String) -> (Int,Int) -> Int {


    // add number

    func add(n1 num1:Int, n2 num2:Int) -> Int {
        return num1 + num2;
    }

    func sub(n1 num1:Int, n2 num2:Int) -> Int {
        return num1-num2
    }

    return opt == "+" ? add : sub
}

let func1 = Operator("-");
print("------output-----",func1(2,4));

var arr = [1,3,2,4];
print("----array with range ----",arr[1..<3])

// swift closures

var greet = {() in
print("---- hello human !")
}

greet();

arr.forEach({(n1:Int) -> Void in
    print("----n1-----",n1);
})

var rs = arr.filter({(n1:Int) in
    return n1>2
})

print("----mapmresult s-------",rs)

struct Person{
    var name:String;
    var roll:Int;
    var compu: String{
        get{
            self.name;
        }
        set(mod){
            name = mod
        }
    }
    mutating func modify(nam: String){
        self.name = nam;
    }
}
var objStrct = Person(name: "abhishek", roll: 153)
print("-----------",objStrct.compu);
objStrct.compu = "hello change name";
print("-------",objStrct.name)
objStrct.modify(nam: "sadasdasd");
print("------mutating -----",objStrct.name)
