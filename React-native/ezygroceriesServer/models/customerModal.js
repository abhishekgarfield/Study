import { db } from "../config/application.js";

const customerModal = {
  getAllcustomers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from customers;", [], (err, result) => {
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
        "SELECT * FROM customers WHERE email = ?",
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
  customerSignup: (
    first_name,
    last_name,
    password,
    dob,
    phone_no,
    email,
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO customers (first_name,last_name,password,dob,phone_no,email) VALUES (?, ? , ?, ?,?, ?);",
        [
          first_name,
          last_name,
          password,
          dob,
          phone_no,
          email
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
      db.query('UPDATE customers SET otp = ? where id = ?',[secret, user_id], (err, result)=>{
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
      db.query('select otp from  customers  where id = ?',[user_id], (err, result)=>{
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
    console.log("-------hello-------")
    return new Promise((resolve, reject) => {
      db.query('UPDATE customers SET auth_token = ? where id = ?',[authToken, user_id], (err, result)=>{
        if(err){
          console.log("---err--",err)
          reject(err);
        }else{
          db.query('select * from  customers  where id = ?',[user_id],(err, result)=>{
            console.log("---RESULT-66666666-",result)
            resolve(result);
          })

        }
      } )
    })
  },
  getCustomerData: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query('select * from  customers  where id = ?',[user_id], (err, result)=>{
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
  getCustomerWithEmail : (email) => {
    return new Promise((resolve, reject) => {
      db.query('select * from  customers  where email = ?',[email], (err, result)=>{
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

export default customerModal;
