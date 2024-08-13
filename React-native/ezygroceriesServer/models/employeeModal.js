import { db } from "../config/application.js";

const employeeModal = {
  getAllemployees:  (callback) => {
    // const [result] = await db.execute("SELECT * from user_roles;", [], (err, result, fields) => {
    //     console.log("----result------",result,"---err---",err);
    //     if (err){

    //     }else{
    //         const [result] = result
    //         return result
    //     }
    //   })
    //   console.log("---resiluy---",result)
    //   return result
    // return new Promise((resolve, reject)=>{
try{

    db.execute(
        'SELECT * from user_roles;',
        [],
        function (err, results) {

          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
         return callback(err,results)
        }
      )
        console.log("-----s-s-s-----")
        // db.execute("SELECT * from user_roles;", [], (err, result, flields) => {
        //     console.log("-----a-s-a-s-a-sa-s-")
        //     console.log("----result------",result,"---err---",err);
        //     if (err){
        //         // reject(err);
        //     }else{
        //         const [result] = result
        //         // resolve(result)
        //     }
        //   }).catch((err)=>{
        //     console.log("---err---",err)
        //   })

        //   console.log("----hellooooo----",res)
        }catch(err){
            console.log("---err---",err)
        }

    // })

  }
};

export default employeeModal;
