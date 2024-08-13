import employeeModal from "../models/employeeModal.js"

const employeeController = {
    allEmployees: (req, res) => {
        console.log("---hellooo--");
        // res.send("--------")
        console.log("---start----")
    employeeModal.getAllemployees((err,users)=>{
            if(err){
               return res.send("--err---")
            }else{
                console.log("---users--",users)

                return  res.send(users)
            }
        });
        console.log("---end----")

        //     res.status(200).send(res)
        // }).catch((err)=>{
        //     res.status(400).send(err);
        // })
    }
}

export default employeeController;
