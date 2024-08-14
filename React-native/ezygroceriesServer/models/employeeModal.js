import { db } from "../config/application.js";

const employeeModal = {
  getAllemployees:  () => {
    return new Promise((resolve, reject)=>{
        db.query("SELECT * from user_roles;", [], (err, result) => {
            if (err){
                reject(err);
            }else{
                resolve(result)
            }
          })
    })
  },
  checkLogin: (email, password)=>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM EMPLOYEES WHERE email = ?",[email], (err, result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result)
            }
        })
    })

  }
};

export default employeeModal;
