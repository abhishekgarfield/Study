import { db } from "../config/application.js";

export const membershipModal = {
  getMembershipfromcustomer: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select membership.total_amount, name, description,membership.id ,pic_url from shops inner join membership on membership.shop_id = shops.id inner join customers on customers.id = membership.customer_id where customers.id = ?;",
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            {
              resolve(result);
            }
          }
        }
      );
    });
  },
  getMembershipfromshop: (shop_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select membership.total_amount, customers.first_name , profile_pic, membership.id from customers  inner join membership on membership.shop_id = customers.id inner join shops on shops.id = membership.shop_id where shops.id = ?;",
        [shop_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  createMemberShip: (email, shop_id, total_amount) => {
    console.log("-----hello-----",total_amount);
    return new Promise((resolve, reject) => {
      db.query(
        "select id from customers where email = ? ",
        [email],
        (err, result1) => {
          if (err) {
            console.log("---er-r----", err);
            reject(err);
          } else {
            console.log(
              "------------ result 1 -----------",
              result1,
              result1.length
            );
            if (result1.length > 0) {
              db.query(
                `INSERT INTO membership (shop_id, customer_id, total_amount)
                SELECT ?, ?, ?
                WHERE NOT EXISTS (
                 SELECT 1 FROM membership WHERE shop_id = ? AND customer_id = ?
                );
                `,
                [shop_id, result1[0].id, total_amount, shop_id,result1[0].id ],
                (err, result2) => {
                  if (err) {
                    console.log("---err----", err);
                    reject(err);
                  } else {
                    console.log("-------result ----", result2);

                    if(result2.insertId > 0){
                        db.query("select membership.total_amount, customers.first_name , profile_pic, membership.id from customers  inner join membership on membership.shop_id = customers.id inner join shops on shops.id = membership.shop_id where shops.id = ? and customers.id = ?",[shop_id,result2.insertId],(err, resul3)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(resul3)
                            }

                        })
                    }else{
                        reject('Membership already exists')
                    }
                  }
                }
              );
            } else {
              resolve(result1);
            }
          }
        }
      );
    });
  },
};
