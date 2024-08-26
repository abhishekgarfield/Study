import { db } from "../config/application.js";

const employeeModal = {
  getAllemployees: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from user_roles;", [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  checkLogin: (email, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM EMPLOYEES WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log("------res---111--",result)
            resolve(result);
          }
        }
      );
    });
  },
  employeeSignup: (
    first_name,
    last_name,
    password,
    dob,
    phone_no,
    email,
    shop_id
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO EMPLOYEES (first_name,last_name,password,dob,phone_no,email,shop_id) VALUES (?, ? , ?, ?,?, ? , ?);",
        [
          first_name,
          last_name,
          password,
          dob,
          phone_no,
          email,
          shop_id
        ],
        (err, result)=>{
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        }
      );
    });
  },
  saveotpSecret: (secret, user_id) => {
    console.log("-------hello-------")
    return new Promise((resolve, reject) => {
      db.query('UPDATE employees SET otp = ? where id = ?',[secret, user_id], (err, result)=>{
        if(err){
          console.log("---err--",err)
          reject(err);
        }else{
          console.log("---RESULT--",result)
          resolve(result);
        }
      } )
    })
  },
  getOtpSecret: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query('select otp from  employees  where id = ?',[user_id], (err, result)=>{
        if(err){
          console.log("---err--",err)
          reject(err);
        }else{
          console.log("---RESULT--",result)
          resolve(result);
        }
      } )
    })
  },
  saveAuthtoken: (authToken, user_id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE employees SET auth_token = ?, is_verified = ? where id = ?',[authToken, true, user_id], (err, result)=>{
        if(err){
          console.log("---err--",err)
          reject(err);
        }else{
          db.query('select * from  employees  where id = ?',[user_id],(err, result)=>{
            console.log("---RESULT-66666666-",result)
            resolve(result);
          })

        }
      } )
    })
  },
  getEmployeeData: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query('select * from  employees  where id = ?',[user_id], (err, result)=>{
        if(err){
          console.log("---err--",err)
          reject(err);
        }else{
          console.log("---RESULT--",result)
          resolve(result);
        }
      } )
    })
  },
  getEmployeeWithEmail : (email) => {
    return new Promise((resolve, reject) => {
      db.query('select * from  employees  where email = ?',[email], (err, result)=>{
        if(err){
          console.log("---err--",err)
          reject(err);
        }else{
          resolve(result);
        }
      } )
    })
  }

};

export default employeeModal;
